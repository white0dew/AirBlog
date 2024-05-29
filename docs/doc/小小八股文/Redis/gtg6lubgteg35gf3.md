---
title: Redis源码阅读笔记
urlname: gtg6lubgteg35gf3
date: '2024-05-24 12:44:00'
updated: '2024-05-24 12:44:21'
cover: 'https://cdn.nlark.com/yuque/0/2021/png/22382235/1630549953915-4ba335be-d0ce-40d9-b622-35527e0631c4.png'
description: 源码阅读方式建议：VScode打开Redis源码，结合黄健宏老师的《Redis设计与实现》，先理解概念，再回归代码。在阅读到数据库的具体实现时，建议在Linux系统下编译并运行Redis，对其的理解将更为直观。源码阅读顺序：阅读数据结构的源码阅读内存编码数据结构实现阅读数据类型的实现阅读单机数...
---
> **源码阅读方式建议**：
> VScode打开Redis源码，结合黄健宏老师的《Redis设计与实现》，先理解概念，再回归代码。
> 在阅读到数据库的具体实现时，建议在Linux系统下编译并运行Redis，对其的理解将更为直观。
> **源码阅读顺序**：
> 1. 阅读数据结构的源码
> 2. 阅读内存编码数据结构实现
> 3. 阅读数据类型的实现
> 4. 阅读单机数据库相关代码
> 5. 阅读客户端和服务器相关代码
> 6. 阅读多机（Cluster）的实现代码
> 
[黄健宏老师的《Redis设计与实现》](https://www.w3cschool.cn/hdclil/)（第二版）
> 部分资料及图片摘抄自网上，并附有参考链接，侵删。

# 一、基本数据结构
学习Redis源码建议自底向上，从底层数据结构入手，一步一步感受Redis的设计之巧妙，源码之美妙。
## 动态字符串SDS
> 源码文件：sds.h 和 sds.c。

Redis 构建了一种名为**简单动态字符串（simple dynamic string，SDS）的抽象类型**，并用作默认字符串表示。而**传统的C语言字符串在Redis**中只用来**作为字符串字面量（常量）**，如打印日志等等。
### 结构定义
先来看看SDS结构的定义：
```cpp
// 类型别名，用于指向 sdshdr 的 buf 属性 
typedef char *sds; //保存字符串对象的结构 
struct sdshdr {     
    // buf 中已占用空间的长度     
    int len;     
    // buf 中剩余可用空间的长度     
    int free;     
    // 数据空间     
    char buf[]; 
}; 
```
由此观之，Redis的SDS其实是基于C语言传统的字符串数组进行封装。一个SDS实例的示意图如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/14c73876afc49825f7e50d0a1304cebe.png)
值得注意的是，SDS也遵循C字符串的空字符结尾，并不计入len中，这么做的好处就是**可以继续使用C相关的字符串库函数**。
如:`printf("%s", s->buf); `
### 对比C字符串 
接着我们思考一个问题：这么封装C字符串有什么好处呢？
**其一、快速获取字符串长度。**通过len属性可以在O(1)的时间复杂度下获取一个字符串的长度，而C字符串需要O（n）。
**其二、杜绝缓冲区溢出。**C字符串由于没有记录自身长度，很可能在一些操作（如strcat等）时，造成缓冲区溢出，见下图：
![image.png](https://oss1.aistar.cool/elog-offer-now/8144d2dce5609ce4388ca82b2f3364fa.png)
对s1执行拼接操作之后：
![image.png](https://oss1.aistar.cool/elog-offer-now/dd5b8c470f35d2dd8f65e5c98ccc2087.png)
而SDS的API在对SDS进行修改时，**会检查其空间是否充足**，如果不够，会先进行扩容，之后进行相应的操作。
**其三、减少修改字符串时带来的内存重分配次数。**对于一个包含了 N 个字符的C字符串来说，这个C字符串的底层实现总是一个**N+1个字符的数组**（额外一个字符用于存空字符）。
如果执行拼接操作（append），那么在执行这个操作之前，程序需要先通过**内存重分配来扩展底层数组的空间大小**——如果忘了这一步就会产生**缓冲区溢出**。
如果执行截断操作（trim），那么在执行这个操作之后，程序需要通过**内存重分配来释放字符串不再使用的那部分空间**——如果忘了这一步就会产生**内存泄漏**。
内存重分配可能会造成系统调用，一般程序很少进行字符串长度修改，但是Redis作为数据库，会进行大量的字符串修改。为了避免这种缺陷，SDS通过未使用空间解除了字符串长度和底层数组长度之间的关联： 在SDS中，**buf 数组的长度不一定就是字符数量加一**，数组里面**可以包含未使用的字节**，**而这些字节的数量就由 SDS 的 free 属性记录**。
**通过未使用空间，SDS 实现了空间预分配和惰性空间释放两种优化策略。**
**其四、空间预分配策略。**当API对SDS进行修改时，不仅会分配必要空间还会分配额外空间，具体策略如下：
当修改后SDS长度**小于1M**（默认最大长度），则**额外分配len长度**；
当大于1M，则额外分配1M；
这种预分配策略，将连续增长N 次字符串所需的内存重分配次数**从必定 N 次降低为最多 N 次**。
**其五、惰性空间释放。**当SDS的API需要缩短SDS保存的字符串时， **程序并不立即使用内存重分配来回收缩短后多出来的字节**，而是使用free属性将这些字节的数量记录起来，并等待将来使用。
**其六、支持二进制。**C字符串是以'\0'结尾的，这使得C字符串只能保存文本数据，而不能保存像图片、音频、视频、压缩文件这样的二进制数据。但是Redis需要、也具备这样的特点。
可以说正是诸如此类的小改进，造就了Redis的高效和稳定。
**总结一下：**
![image.png](https://oss1.aistar.cool/elog-offer-now/acd7c87e6cbc73d9bfecab4c27cc8d39.png)
**接口API**
挑几个API来看看源码实现。
**sdslen**
```cpp
/*  * 返回 sds 实际保存的字符串的长度  *  * T = O(1)  */ 
static inline size_t sdslen(const sds s) {     
    struct sdshdr *sh = (void*)(s-(sizeof(struct sdshdr)));     
    return sh->len; 
} 
```
请大家结合sds的结构体定义，先想想，为什么这个API可以获取SDS长度？
在结构体里面，** char* buf 和char buf[1]的效果差不多（对齐的情况）**，占4个字节；char buf[0] 和char buf[]是一样的，**不占内存**。[链接]()
所以(void*)(s-(sizeof(struct sdshdr)))其实就将内存地址转移到了**SDS结构体地址，于是就可以通过这个地址直接访问其成员变量**。

**sdsclear惰性删除策略**
```cpp
//以O（1)的时间完成字符串的“清空” 
//只需要将终止符放在0即可 
void sdsclear(sds s) { 
    // 取出 sdshdr     
    struct sdshdr *sh = (void*) (s-(sizeof(struct sdshdr)));      
    // 重新计算属性     
    sh->free += sh->len;     
    sh->len = 0;      
    // 将结束符放到最前面（相当于惰性地删除 buf 中的内容）     
    sh->buf[0] = '\0'; 
} 
```
**sdsMakeRoomFor**
这个函数对sds的free进行扩充，**2倍原大小或者加上1M的额外空间**。
```cpp
sds sdsMakeRoomFor(sds s, size_t addlen) {     
    struct sdshdr *sh, *newsh;          
    // 获取 s 目前的空余空间长度     
    size_t free = sdsavail(s);     
    size_t len, newlen;          
    // s 目前的空余空间已经足够，无须再进行扩展，直接返回     
    if (free >= addlen) return s;          
    // 获取 s 目前已占用空间的长度     
    len = sdslen(s);     
    sh = (void*) (s-(sizeof(struct sdshdr)));          
    // s 最少需要的长度     
    newlen = (len+addlen);          
    // 根据新长度，为 s 分配新空间所需的大小     
    if (newlen < SDS_MAX_PREALLOC)     
    	// 如果新长度小于 SDS_MAX_PREALLOC      
        // 那么为它分配两倍于所需长度的空间     
        newlen *= 2;     
    else     
        // 否则，分配长度为目前长度加上 SDS_MAX_PREALLOC     
        newlen += SDS_MAX_PREALLOC;     
    // T = O(N)     
    newsh = zrealloc(sh, sizeof(struct sdshdr)+newlen+1);          
    // 内存不足，分配失败，返回     
    if (newsh == NULL) return NULL;        
    // 更新 sds 的空余长度     
    newsh->free = newlen - len;      
    // 返回 sds     
    return newsh->buf; 
} 
```
## 链表List
> 源码文件：adlist.h 和 adlist.c。

Redis实现的是双端链表，其被广泛用于实现 Redis 的各种功能，比如列表键，发布与订阅等等。通过将链表的void *value**设置为不同的类型**，**Redis的链表可以用于保存各种不同类型的值。**
### 结构定义
```cpp
/*  * 双端链表结构定义  */ 
typedef struct list {     
    // 表头节点     
    listNode *head;     
    // 表尾节点     
    listNode *tail;          
    // 以下这些是函数指针，负责对应的功能     
    // 节点值复制函数     
    void *(*dup)(void *ptr);     
    // 节点值释放函数     
    void (*free)(void *ptr);     
    // 节点值对比函数     
    int (*match)(void *ptr, void *key);     
    // 链表所包含的节点数量     
    unsigned long len; 
} list; 
```
其中链表节点定义如下：
```cpp
// 双端链表节点 
typedef struct listNode {     
    // 前置节点     
    struct listNode *prev;     
    // 后置节点     
    struct listNode *next;     
    // 节点的值     
    void *value; 
} listNode; 
```
一个链表的实例如下图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/1e34c4f3fe163dcaa057e5a242ded4f3.png)
### 接口分析
来挑几个API看看其具体实现：
**listAddNodeHead：**插入节点到头部
```cpp
list *listAddNodeHead(list *list, void *value) {     
    listNode *node;     
    // 为节点分配内存     
    if ((node = zmalloc(sizeof(*node))) == NULL)     
        return NULL;     
    // 保存值指针     
    node->value = value;     
    // 添加节点到空链表     
    if (list->len == 0) {         
        list->head = list->tail = node;         
        node->prev = node->next = NULL;       
    }      
    // 添加节点到非空链表     
    else {         
        node->prev = NULL;         
        node->next = list->head;         
        list->head->prev = node;         
        list->head = node;     
    }        
    // 更新链表节点数     
    list->len++;     
    return list; 
} 
```
**listGetIterator：**产生一个迭代器
```cpp
/* 为给定链表创建一个迭代器，  
* 之后每次对这个迭代器调用 listNext 都返回被迭代到的链表节点  
* direction 参数决定了迭代器的迭代方向：  
*  AL_START_HEAD ：从表头向表尾迭代  
*  AL_START_TAIL ：从表尾想表头迭代  */ 
listIter *listGetIterator(list *list, int direction) {     
    // 为迭代器分配内存     
    listIter *iter;     
    if ((iter = zmalloc(sizeof(*iter))) == NULL) 
        return NULL;     
    // 根据迭代方向，设置迭代器的起始节点     
    if (direction == AL_START_HEAD)     
        iter->next = list->head;     
    else     
        iter->next = list->tail;        
    // 记录迭代方向     
    iter->direction = direction;      
    return iter; 
} 
```
其中，
```cpp
//双端链表迭代器 
typedef struct listIter {     
    // 当前迭代到的节点     
    listNode *next;     
    // 迭代的方向（前向还是后向）     
    int direction;
} listIter; 
```
**listSearchKey:**在链表中查找指定值的节点，其实就是利用迭代器遍历
```cpp
listNode *listSearchKey(list *list, void *key) {     
    listIter *iter;     
    listNode *node;          
    // 迭代整个链表     
    iter = listGetIterator(list, AL_START_HEAD);     
    while((node = listNext(iter)) != NULL) {         
        // 对比         
        if (list->match) {             
            if (list->match(node->value, key)) {                 
                listReleaseIterator(iter);                 
                // 找到                 
                return node;             
            }         
        } else {             
            if (key == node->value) {             
                listReleaseIterator(iter);             
                // 找到             
                return node;
            }            
        }     
    }      
    listReleaseIterator(iter);  
    // 未找到   
    return NULL; } 
```

- **话说list迭代器有什么用？**

从源码上来看，list的迭代器主要是为了方便**实现对list双向前进**。迭代器作为一种设计模式，可以使得list适应不同的算法。
## 字典Dict
> 源码文件dict.h 和 dict.c。

Redis中字典使用哈希表实现。同时，为了实现渐进式Rehash的操作，每一个字典都有两个hash表（新/旧）。
### 结构定义
Redis中字典使用哈希表实现。同时，为了实现**渐进式Rehash**的操作，每一个字典都有两个hash表（新/旧）。
```cpp
// 字典定义 
typedef struct dict {     
// 类型特定函数     
// 这一指针指向的结构体中存储了hash表常用的函数指针     
    dictType *type;     
    // 私有数据：保存了需要传给那些类型特定函数的可选参数（见后文）     
    void *privdata;     
    // 哈希表     
    dictht ht[2];     
    // 该值表示rehash进行到的下标索引位置     
    // 当 rehash 不在进行时，值为 -1     
    // 开始时值为0     
    // 正在进行中时，值处于0到size之间     
    int rehashidx;          
    int iterators; 
    // 目前正在运行的安全迭代器的数量 
} dict; 
```
其中的hash表定义如下：
```cpp
//每个字典都使用两个哈希表，从而实现渐进式 rehash 。 
typedef struct dictht {     
    // 哈希表数组(存储的是指向节点指针数组的指针)     
    // 都使用指针的方式可以节省空间     
    dictEntry **table;     
    // 哈希表大小     
    unsigned long size;     
    // 哈希表大小掩码，用于计算索引值     
    // 总是等于 size - 1     
    unsigned long sizemask;     
    // 该哈希表已有节点的数量     
    unsigned long used;
} dictht; 
```
hash表的节点（Entry）定义如下，Redis是采用开链法来处理hash冲突的：
```cpp
//哈希表节点 
typedef struct dictEntry {     
    // 键    
    void *key;   
    // 值     
    union {       
        void *val;    
        uint64_t u64;   
        int64_t s64;   
    } v;     
    // 指向下个哈希表节点，形成链表  
    struct dictEntry *next;
} dictEntry; 
```
一个hash表的实例见下：
![image.png](https://oss1.aistar.cool/elog-offer-now/5237cd5809d93d4773c798e78147dc7c.png)
> PS:在redis的hash表结构中，**如果出现hash冲突，新的key-value是在旧的key-value前面的**，这么做也很好理解：如果插入到链表最后，那么**还需要一个遍历链表的操作，O(N)的复杂度**。

一个普通状态下的**字典实例见下**：
![image.png](https://oss1.aistar.cool/elog-offer-now/26a36af4517ed759b11103f60c5420c9.png)
接下来我们看看其中的**重要API**，比如计算hash值、处理hash冲突或者是rehash。
### 接口分析
**dictAddRaw：**新增键值对
```cpp
dictEntry *dictAddRaw(dict *d, void *key)
{
    int index;
    dictEntry *entry;
    dictht *ht;

    // 如果条件允许的话，进行单步 rehash
    // T = O(1)
    if (dictIsRehashing(d)) _dictRehashStep(d); 
    
    // 计算键在哈希表中的索引值
    // 如果值为 -1 ，那么表示键已经存在
    if ((index = _dictKeyIndex(d, key)) == -1)
        return NULL;
    // 如果字典正在 rehash ，那么将新键添加到 1 号哈希表
    // 否则，将新键添加到 0 号哈希表
    ht = dictIsRehashing(d) ? &d->ht[1] : &d->ht[0];
    // 为新节点分配空间
    entry = zmalloc(sizeof(*entry));
    // 将新节点插入到链表表头
    entry->next = ht->table[index];
    ht->table[index] = entry;
    // 更新哈希表已使用节点数量
    ht->used++;
    // 设置新节点的键
    // T = O(1)
    dictSetKey(d, entry, key);
    return entry;
}
```
在其中有个函数：dictkeyindex()——**计算该字典中可以插入该键值对的index，如果标志符号dict_can_resize为正**，那么会在hash表的size和used比率**大于1（即负载因子）时(没有执行BGSAVE)进行rehash或者大于5（执行BGSAVE）时进行强制rehash**。
计算hash值时是这样的：`index = hash & dict->ht[0].sizemask `
即是利用计算出的hash值跟sizemask相与，这个hash算法被称为MurmurHash2（目前有3了，但是Redis没用），这种算法的优点在于，**即使输入的键是有规律的**，**算法仍能给出一个很好的随机分布性**，并且算法的计算速度也非常快。
> **为什么负载因子一个是1一个是5？**
> 根据 BGSAVE 命令或 BGREWRITEAOF 命令是否正在执行，服务器执行扩展操作所需的负载因子并不相同。
> 
> 这是因为在执行BGSAVE命令或BGREWRITEAOF 命令的过程中，**Redis 需要创建当前服务器进程的子进程， 而大多数操作系统都采用写时复制（copy-on-write）技术来优化子进程的使用效率**，所以在子进程存在期间，服务器会提高执行扩展操作所需的负载因子，**从而尽可能地避免在子进程存在期间进行哈希表扩展操作，这可以避免不必要的内存写入操作，最大限度地节约内存**。

```cpp
// 指示字典是否启用 rehash 的标识 
static int dict_can_resize = 1; 
// 强制 rehash 的比率(强制不可被上面的标志所阻止) 
static unsigned int dict_force_resize_ratio = 5; 
```
**Rehash**的具体操作见接下来的这个API。
```cpp
int dictRehash(dict *d, int n) {
    // 只可以在 rehash 进行中时执行
    if (!dictIsRehashing(d)) return 0;
    // 进行 N 步迁移
    // T = O(N)
    while(n--) {
        dictEntry *de, *nextde;
        
        // 如果 0 号哈希表为空，那么表示 rehash 执行完毕
        // T = O(1)
        if (d->ht[0].used == 0) {
        // 释放 0 号哈希表
        zfree(d->ht[0].table);
        // 将原来的 1 号哈希表设置为新的 0 号哈希表
        d->ht[0] = d->ht[1];
        // 重置旧的 1 号哈希表
        _dictReset(&d->ht[1]);
        // 关闭 rehash 标识
        d->rehashidx = -1;
        // 返回 0 ，向调用者表示 rehash 已经完成
        return 0;
        }
    // 确保 rehashidx 没有越界
    assert(d->ht[0].size > (unsigned)d->rehashidx);
    
    // 略过数组中为空的索引，找到下一个非空索引
    // hash表的entry中第一个就是void* key，所以可以直接访问其是否为空
    // 来判断该出是否存在键值对
    while(d->ht[0].table[d->rehashidx] == NULL) d->rehashidx++;
    // 指向该索引的链表表头节点
    de = d->ht[0].table[d->rehashidx];
    // 将链表中的所有节点迁移到新哈希表
    // T = O(1)
    while(de) {
            unsigned int h;    
            // 保存下个节点的指针
            nextde = de->next;           
            /* Get the index in the new hash table */
            // 计算新哈希表的哈希值，以及节点插入的索引位置
            h = dictHashKey(d, de->key) & d->ht[1].sizemask;
            // 插入节点到新哈希表
            de->next = d->ht[1].table[h];
            d->ht[1].table[h] = de;
            // 更新计数器
            d->ht[0].used--;
            d->ht[1].used++;            
            // 继续处理下个节点
            de = nextde;
            }
        // 将刚迁移完的哈希表索引的指针设为空
        d->ht[0].table[d->rehashidx] = NULL;
        // 更新 rehash 索引
        d->rehashidx++;
        }
    return 1;
}

```
通过上述源码我们可以得出：

- Redis的hash表采用**渐进式分步hash**的方法
- rehash的过程中字典的**两个hash表同时存在，并且在迭代、更新、删除键的时候都需要考虑这两个hash表，**值得注意的是：字典的删除（delete）、查找（find）、更新（update）等操作会在两个哈希表上进行，_**但插入只会在第二个表中**_，rehash完毕之后会重置第一个表。
- 在rehash时，如果扩展操作，那么ht[1]的大小为第一个大于等于 **ht[0].used*2的2^n**；如果收缩操作（**负载因子小于0.1**），**那么ht[1]的大小为第一个大于等于ht[0].used的2^n**。
- rehsh时，相关API会经常进行单步rehash，数据库操作主要是调用**int dictRehashMilliseconds(dict *d, int ms)，**即在指定时间内执行rehash，时间到了就返回已迭代到的index,这种方式能够尽可能利用好CPU的执行时间。
### 迭代器
跟链表一样，Redis字典中也存在迭代器，主要是为了实现遍历一个字典。
其定义如下：
**安全迭代器**
```cpp
dictIterator *dictGetSafeIterator(dict *d) {
    dictIterator *i = dictGetIterator(d);
    // 设置安全迭代器标识
    i->safe = 1;
    return i;
}
```
**非安全迭代器**
```cpp
dictIterator *dictGetIterator(dict *d)
{
    dictIterator *iter = zmalloc(sizeof(*iter));

    iter->d = d;
    iter->table = 0;
    iter->index = -1;
    iter->safe = 0;
    iter->entry = NULL;
    iter->nextEntry = NULL;
    return iter;
}
```
两种迭代器都共用同一个函数接口：`dictEntry *dictNext(dictIterator *iter)`
该接口返回迭代器指向的当前节点。
如果是安全迭代器调用该函数，会更新字典的iterator计数器（安全迭代器）；
如果是非安全迭代器调用该函数，会计算此时字典的fingerprint，**以确定用户没有违规操作**。有关**迭代器的重点函数是：dictScan（）**。**详见源码注释**。
## 跳跃表skiplist
> 源码文件：t_zset.c 中所有以 zsl 开头的函数。

Redis在两个地方用到了跳跃表，一个是**实现有序集合**，另一个是在**集群节点中用作内部数据结构（后文会将，见Redis多机数据库）**。 
跳跃表是一种可以对**有序链表进行近似二分查找的数据结构**，它通过在**每个节点中维持多个指向其他节点的指针**，从而达到快速访问节点的目的。
跳跃表支持**平均O(logN) 、最坏O(N)复杂度的节点查找**，还可以通过**顺序性操作来批量处理节点**。
在大部分情况下，**跳跃表的效率可以和平衡树相媲美**，并且因为跳跃表的**实现比平衡树要来得更为简单**，所以有不少程序都使用跳跃表来代替平衡树。
通过下面这个图，来看看跳表这个数据结构：
![image.png](https://oss1.aistar.cool/elog-offer-now/d116aaa1d3159ca2c6ae53607142c27f.png)
跳表其实是空间换时间的结构，因为每隔一定的点都需要建立一个链表索引。
它的**查询过程**如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/4a29ff9ef6a8ddd4e09f4fa18a86943b.png)
即**先同层查找，而后往下一层找**，**直到最后的找到节点，类似一个二分的过程**。
另外，我们想要为跳表插入或者删除数据，我们首先需要找到插入或者删除的位置，然后执行插入或删除操作，前边我们已经知道了，**跳表的查询的时间复杂度为 O(logn），因为找到位置之后插入和删除的时间复杂度很低，为 O(1)，所以最终插入和删除的时间复杂度也为 O(longn)**。
跳表的代码实现参考：[链接](https://zhuanlan.zhihu.com/p/68516038)
### 结构定义
跳跃表包含头尾节点、节点数目以及最大的层数，定义如下：
```cpp
typedef struct zskiplist {
    // 表头节点和表尾节点
    struct zskiplistNode *header, *tail;
    // 表中节点的数量
    unsigned long length;
    // 表中层数最大的节点的层数
    int level;
} zskiplist;
```
其中的**跳跃表节点定义如下**：
```cpp
typedef struct zskiplistNode {

    // 成员对象(存储的对象类型，见下)
    robj *obj;
    // 分值（按照这个大小，升序排列）
    double score;
    // 后退指针（用作链表的倒序遍历）
    struct zskiplistNode *backward;
    // 层
    struct zskiplistLevel {
        // 前进指针
        struct zskiplistNode *forward;
        // 跨度
        unsigned int span;
    } level[];
} zskiplistNode;
```
跳表每个节点都具有多个层标记，每一个层标记带有两个属性：**前进指针和跨度**，前进指针**表示访问其之后（score比它大）的其他节点**，跨度表示**当前节点跟后续节点的距离**。跳跃表 level 层级完全是随机的（插入节点时会随机生成1-32的数字）。一般来说，**层级越多，访问节点的速度越快**。
在跳跃表中，**节点按各自所保存的分值从小到大排列**。
obj是指向一个字符串对象，**而字符串对象则保存着一个SDS值**。
> 注意：在同一个跳跃表中，**各个节点保存的成员对象必须是唯一的**，但是**多个节点保存的分值却可以是相同的**：分值相同的节点将**按照成员对象的大小（见后）来进行排序**，成员对象较小的节点会排在前面(靠近表头的方向)，而成员对象较大的节点则会排在后面(靠近表尾的方向)。

其中的**Redis成员对象定义**如下：
```cpp
typedef struct redisObject {
    // 类型(日后会说)
    unsigned type:4;
    // 编码(日后会说)
    unsigned encoding:4;
    // 对象最后一次被访问的时间(日后会说)
    unsigned lru:REDIS_LRU_BITS; /* lru time (relative to server.lruclock) */
    // 引用计数(日后会说)
    int refcount;
    // 指向实际值的指针
    void *ptr;
} robj;
```
> 注：成员对象的有关知识，参考Redis源码阅读（三）。

### 查找、删除、添加
我们以一个实际例子，来展现在跳跃表中，究竟是以何种方式进行节点的查找、删除和添加的。

- 添加节点

假设一个跳跃表刚开始为空，那么其实它就是一个简单的空链表结构：
![image.png](https://oss1.aistar.cool/elog-offer-now/3626077fe5c3d6523aa4ccf56d68550e.png)
当需要插入一个key=3的节点，得到一个随机值level = 3（随机抛出来的），那么该节点就具有level3的属性，此时跳跃表的结构如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/0e1e351c09b3d77e642542d6b271e175.png)
·插入key = 2，随机的level = 1，如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/0fcec7f96a220ed49ecad30c6df28b8e.png)
···
·插入key = 100， 随机的level=2，如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/1ce9de497bcc61805121af7b3741c2e7.png)
okay，以上我们就完成了整个跳跃表的插入过程，那如果我们想**查找66这个值**，如何进行？
跳跃表的查询是**从顶层往下找**，那么**会先从第顶层（即最高的level）开始找**，查找方式就是一个二分查找，**如过该层找不到指定值，**就会跳到下一层，继续遍历，直到找到对应节点。查找具体过程如下：
level3）66比1大，那就往同层的右边走，5还是比66小，再往右走就倒表尾了，因此下沉，**从5的level3下沉到level2**。
level2）5的右边100比66大，所以从5的level2下沉到level1。
level1）5的右边66恰好等于，于是返回这个节点。

- **删除操作**呢？

其实跟查找操作差不多，找到删除节点之后，进行单向链表的删除操作，唯一的区别就是需要在多个level进行列表节点的删除。以上部分参考[链接](https://blog.csdn.net/weixin_41622183/article/details/91126155)。
### 接口分析
其中，Redis中的跳表最大层级及概率定义如下：
```cpp
#define ZSKIPLIST_MAXLEVEL 32 /* Should be enough for 2^32 elements */
#define ZSKIPLIST_P 0.25      /* Skiplist P = 1/4 */
```
**创建新跳跃表**如下：
```cpp
zskiplist *zslCreate(void) {
    int j;
    zskiplist *zsl;
    // 分配空间
    zsl = zmalloc(sizeof(*zsl));
    // 设置高度和起始层数
    zsl->level = 1;
    zsl->length = 0;

    // 初始化表头节点
    // T = O(1)
    zsl->header = zslCreateNode(ZSKIPLIST_MAXLEVEL,0,NULL);
    for (j = 0; j < ZSKIPLIST_MAXLEVEL; j++) {
        zsl->header->level[j].forward = NULL;
        zsl->header->level[j].span = 0;
    }
    zsl->header->backward = NULL;

    // 设置表尾
    zsl->tail = NULL;

    return zsl;
}
```
从上诉代码可以看出，**跳跃表的表头节点跟其他的跳跃表节点一样**，只不过忽略了BW指针和分值、成员对象等信息。
**创建新节点如下（请仔细思考源码的实现）**：
```cpp
/*
 * 创建一个成员为 obj ，分值为 score 的新节点，
 * 并将这个新节点插入到跳跃表 zsl 中。
 * 函数的返回值为新节点。
 * T_wrost = O(N^2), T_avg = O(N log N)
 */
zskiplistNode *zslInsert(zskiplist *zsl, double score, robj *obj) {
    zskiplistNode *update[ZSKIPLIST_MAXLEVEL], *x;
    unsigned int rank[ZSKIPLIST_MAXLEVEL];
    int i, level;
    redisAssert(!isnan(score));
    // 在各个层查找节点的插入位置
    x = zsl->header;
    for (i = zsl->level-1; i >= 0; i--) {
        // 如果 i 不是 zsl->level-1 层
        // 那么 i 层的起始 rank 值为 i+1 层的 rank 值
        // 各个层的 rank 值一层层累积
        // 最终 rank[0] 的值加一就是新节点的前置节点的排位
        // rank[0] 会在后面成为计算 span 值和 rank 值的基础
        rank[i] = i == (zsl->level-1) ? 0 : rank[i+1];
        // 沿着前进指针遍历跳跃表
        // T_wrost = O(N^2), T_avg = O(N log N)
        while (x->level[i].forward &&
            (x->level[i].forward->score < score ||
                // 比对分值
                (x->level[i].forward->score == score &&
                // 比对成员， T = O(N)
                compareStringObjects(x->level[i].forward->obj,obj) < 0))) {
            // 记录沿途跨越了多少个节点
            rank[i] += x->level[i].span;
            // 移动至下一指针
            x = x->level[i].forward;
        }
        // 记录将要和新节点相连接的节点
        update[i] = x;
    }
     /* 
     // zslInsert() 的调用者会确保同分值且同成员的元素不会出现，
     * 所以这里不需要进一步进行检查，可以直接创建新元素。
     */
    // 获取一个随机值作为新节点的层数level
    // T = O(N)
    level = zslRandomLevel();
    // 如果新节点的层数比表中其他节点的层数都要大
    // 那么初始化表头节点中未使用的层，并将它们记录到 update 数组中
    // 将来也指向新节点
    if (level > zsl->level) {
        // 初始化未使用层
        // T = O(1)
        for (i = zsl->level; i < level; i++) {
            rank[i] = 0;
            update[i] = zsl->header;
            update[i]->level[i].span = zsl->length;
        }
        // 更新表中节点最大层数
        zsl->level = level;
    }
    // 创建新节点
    x = zslCreateNode(level,score,obj);
    // 将前面记录的指针指向新节点，并做相应的设置
    // T = O(1)
    for (i = 0; i < level; i++) {
        // 设置新节点的 forward 指针
        x->level[i].forward = update[i]->level[i].forward;
        // 将沿途记录的各个节点的 forward 指针指向新节点
        update[i]->level[i].forward = x;
        /* update span covered by update[i] as x is inserted here */
        // 计算新节点跨越的节点数量
        x->level[i].span = update[i]->level[i].span - (rank[0] - rank[i]);
        // 更新新节点插入之后，沿途节点的 span 值
        // 其中的 +1 计算的是新节点
        update[i]->level[i].span = (rank[0] - rank[i]) + 1;
    }
    /* increment span for untouched levels */
    // 未接触的节点的 span 值也需要增一，这些节点直接从表头指向新节点
    // T = O(1)
    for (i = level; i < zsl->level; i++) {
        update[i]->level[i].span++;
    }
    // 设置新节点的后退指针
    x->backward = (update[0] == zsl->header) ? NULL : update[0];
    if (x->level[0].forward)
        x->level[0].forward->backward = x;
    else
        zsl->tail = x;
    // 跳跃表的节点计数增一
    zsl->length++;
    return x;
}

```
其中计算节点随机level的函数如下：
```cpp
int zslRandomLevel(void) {
    int level = 1;
    //ZSKIPLIST为0.25
    while ((random()&0xFFFF) < (ZSKIPLIST_P * 0xFFFF))
        level += 1;

    return (level<ZSKIPLIST_MAXLEVEL) ? level : ZSKIPLIST_MAXLEVEL;
}
```
返回值介乎 1 和 ZSKIPLIST_MAXLEVEL 之间（包含ZSKIPLIST_MAXLEVEL），根据随机算法所使用的幂次定律，**越大的值生成的几率越小**。
### 补充：有序集合
Redis的有序集合（Zset）数据结构是**结合字典跟跳跃表实现的**，其定义如下：
```cpp
/*
 * 有序集合
 */
typedef struct zset {

    // 字典，键为成员，值为分值
    // 用于支持 O(1) 复杂度的按成员取分值操作
    dict *dict;

    // 跳跃表，按分值排序成员
    // 用于支持平均复杂度为 O(log N) 的按分值定位成员操作
    // 以及范围操作
    zskiplist *zsl;

} zset;
```
ZSET同时使用**两种数据结构**来持有同一个元素，从而**提供 O(log(N)) **复杂度的**有序数据结构的插入和移除操作**。哈希表将 Redis 对象映射到分值上。**而跳跃表则将分值映射到 Redis 对象上，以跳跃表的视角来看，可以说 Redis 对象是根据分值来排序的**。更详细的介绍参见第三章。
## HyperLogLog
> 源码文件：hyperloglog.c。

Redis 在 2.8.9 版本添加了 HyperLogLog 结构。**HyperLogLog 是用来做基数统计的算法**，优点是，**在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定的、并且是很小的**。
在 Redis 里面，每个 HyperLogLog 键只需要花费 **12 KB 内存**，就可以**计算接近 2^64 个不同元素的基数**。这和计算基数时，元素越多耗费内存就**越多的集合形成鲜明对比**。
但是，因为 HyperLogLog **只会根据输入元素来计算基数**，而不会储存输入元素本身，**所以 HyperLogLog 不能像集合那样，返回输入的各个元素**。
> 什么是基数？
> 比如数据集 {1, 3, 5, 7, 5, 7, 8}， 那么这个数据集的基数集为 {1, 3, 5 ,7, 8}, 基数(不重复元素)为5个。
> 基数估计就是在误差可接受的范围内，快速计算基数。

### 算法细节
它内部维护了 **16384 个桶（bucket）**来记录各自桶的元素数量。当一个元素到来时，**它会散列到其中一个桶，以一定的概率影响这个桶的计数值**。因为是概率算法，所以单个桶的计数值并不准确，但是将所有的桶计数值进行调合均值累加起来，结果就会**非常接近真实的计数值**。
![image.png](https://oss1.aistar.cool/elog-offer-now/79ed7766115c31a75f12faf086d664a0.png)
为了便于理解HyperLogLog算法，我们先简化它的计数逻辑。因为是去重计数，如果是准确的去重，**肯定需要用到 set 集合**，使用集合来记录所有的元素，然后获取集合大小就可以得到总的计数。因为元素特别多，单个集合会特别大，**所以将集合打散成 16384 个小集合**。当元素到来时，**通过 hash 算法将这个元素分派到其中的一个小集合存储**，同样的**元素总是会散列到同样的小集合**。这样总的计数就是**所有小集合大小的总和**。使用这种**方式精确计数除了可以增加元素外**，还可以减少元素。
但是，**集合打散并没有什么明显好处，因为总的内存占用并没有减少。**HyperLogLog算法中每个桶所占用的**空间实际上只有 6 个 bit**，**这 6 个 bit 自然是无法容纳桶中所有元素的**，它记录的是桶中元素数量的对数值。
对数？怎么突然提到对数了？等等···Hyperloglog，log···难道对数才是这个数据结构的灵魂？！
先想想：一个随机的整数值，**这个整数的尾部有一个 0 的概率是 50%，要么是 0 要么是 1（这里说的是二进制）**。同样，尾部有两个 0 的概率是 25%，有三个零的概率是 12.5%，**以此类推，有 k 个 0 的概率是 2^(-k)**。如果我们随机出了很多整数，整数的数量我们并不知道，但是我们记录了**整数尾部连续 0 的最大数量 K**。我们就可以通过这个 K 来**近似推断出整数的数量，这个数量就是 2^K！！**
当然结果是非常不准确的，因为可能接下来**你随机了非常多的整数**，但是**末尾连续零的最大数量 K 没有变化**，**但是估计值还是 2^K**。你也许会想到要是这个** K 是个浮点数就好了**，**每次随机一个新元素**，它都可以稍微往上涨一点点，那么估计值应该会准确很多。
HyperLogLog通过分配 16384 个桶，然后对所有的桶的最大数量 K 进行**调合平均来得到一个平均的末尾零最大数量 K#** ，K# 是一个浮点数，**使用平均后的 2^K# 来估计元素的总量相对而言就会准确很多**。不过这只是简化算法，真实的算法还有很多修正因子，因为涉及到的数学理论知识过于繁多，这里就不再精确描述。
下面我们看看Redis HyperLogLog 算法的具体实现。
我们知道一个HyperLogLog实际占用的空间大约是** 16384 * 6bit / 8 = 12k 字节**。但是在计数比较小的时候，**大多数桶的计数值都是零**。如果 12k 字节里面太多的字节都是零，**那么这个空间是可以适当节约一下的**。
Redis 在计数值比较小的情况下采用了**稀疏存储**，**稀疏存储的空间占用远远小于 12k 字节**。相对于稀疏存储的就是**密集存储**，**密集存储会恒定占用 12k 字**节。
不论是稀疏存储还是密集存储，Redis 内部都是使用**字符串位图**来存储 HyperLogLog 所有桶的计数值。
### 密集存储
密集存储的结构非常简单，就是连续 16384 个 6bit 串成的字符串位图。
![image.png](https://oss1.aistar.cool/elog-offer-now/7dfcadee8bd5e6a7fd8501a64dee5b73.png)
那么给定一个桶编号，如何获取它的 6bit 计数值呢？这 6bit 可能在一个字节内部，也可能会跨越字节边界。我们需要对这一个或者两个字节进行适当的移位拼接才可以得到计数值。
假设桶的**编号为idx**，这个 6bit 计数值的起始字节位置偏移用 **offset_bytes表示**，它在这个字节的起始比特位置偏移用 offset_bits 表示。我们有：
offset_bytes = (idx * 6) / 8 offset_bits = (idx * 6) % 8 
需要注意的是**字节位序是左边低位右边高位**，而通常我们使用的字节都是**左边高位右边低位**，我们需要在脑海中进行倒置。
![image.png](https://oss1.aistar.cool/elog-offer-now/60aae6e9a25dd3702832a1cdf57f9d8c.png)

#### **稀疏存储**
稀疏存储适用于**很多计数值都是零的情况**。下图表示了一般稀疏存储计数值的状态。
![image.png](https://oss1.aistar.cool/elog-offer-now/5adc31baa180e8fea3643acb0d5e7649.png)
当多个连续桶的计数值都是零时，**Redis 使用了一个字节来表示接下来有多少个桶的计数值都是零**：00xxxxxx。前缀两个零表示接下来的 **6bit 整数值加 1 就是零值计数器的数量**，注意这里要加 1 是因为数量如果为零是没有意义的。比如 00010101表示连续 22 个零值计数器。**6bit 最多只能表示连续 64 个零值计数器**，所以 Redis 又设计了连续多个多于 64 个的连续零值计数器，**它使用两个字节来表示：01xxxxxx yyyyyyyy，后面的 14bit 可以表示最多连续 16384 个零值计数器**。这意味着 HyperLogLog 数据结构中 **16384 个桶的初始状**态，所有的计数器都是零值，**可以直接使用 2 个字节来表示**。
稀疏存储的一般状态如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/7a2f24f46ea7d41b9aaeaca04c746765.png)
回答上面的问题，何时从稀疏到非稀疏转换？
当稀疏存储的某个**计数值需要调整到大于 32 （如33）时**，Redis 就会立即转换 HyperLogLog 的存储结构，**将稀疏存储转换成密集存储**。
或者，**稀疏存储占用的总字节数超过 3000 字节**，这个阈值可以通过 hll_sparse_max_bytes 参数进行调整。
以上两种情况发生一种，就会触发稀疏到密集的转换，**且不可逆**。
#### **计数缓存**
前面提到 HyperLogLog 表示的总计数值是由 16384 个桶的计数值进行调和平均后再基于因子修正公式计算得出来的。**它需要遍历所有的桶进行计算才可以得到这个值，中间还涉及到很多浮点运算。这个计算量相对来说还是比较大的**。
所以 Redis 使用了一个额外的字段来缓存总计数值，这个字段有 **64bit**，最高位如果**为 1 表示该值是否已经过期，如果为 0**， 那么剩下的 **63bit 就是计数值**。
当 HyperLogLog 中任意一个桶的计数值发生变化时，就会将计数缓存设为过期，**但是不会立即触发计算（惰性计算）**。而是要等到用户显示**调用 pfcount 指令时才会触发重新计算刷新缓存**。缓存刷新在密集存储时需要**遍历 16384 个桶的计数值进行调和平均**，但是稀疏存储时没有这么大的计算量。也就是说只有当计数值比较大时才可能产生较大的计算量。**另一方面如果计数值比较大，那么大部分 pfadd 操作根本不会导致桶中的计数值发生变化**。
这意味着在一个**极具变化的 HLL 计数器中频繁调用 pfcount 指令可能会有少许性能问题**。关于这个性能方面的担忧在 Redis 作者 antirez 的博客中也提到了。**不过作者做了仔细的压力的测试，发现这是无需担心的，pfcount 指令的平均时间复杂度就是 O(1)**。

HHL数据结构暂时只需要理解其原理，**基本介绍**[链接](https://www.runoob.com/redis/redis-hyperloglog.html)
**文中具体算法细节转载自（强烈推荐）**[链接](https://cloud.tencent.com/developer/article/1349691)
# 二、内存编码数据结构的实现
> 这一部分主要介绍Redis特制的内存编码数据结构，建议结合图像来理解。

## 整数集合
> 源码：intset.h和intset.c。

整数集合（intset）是**集合键的底层实现之一**： **当一个集合只包含整数值元素**，并且这个集合的**元素数量（见后）不多时**，**Redis就会使用整数集合作为集合键的底层实现**。
### 结构定义
```cpp
typedef struct intset {

    // 编码方式
    uint32_t encoding;

    // 集合包含的元素数量
    uint32_t length;

    // 保存元素的数组
    int8_t contents[];

} intset;

```
其中，content是整数集合的底层实现，所有的元素都是该contents数组的一项，值得注意的是，**虽然该数组声明为int8_t类型，但是该数组中存储的数据类型由encoding来决定**：
encoding有三个选择：**INTSET_ENC_INT16/32/64**。
```cpp
//intset 的编码方式
#define INTSET_ENC_INT16 (sizeof(int16_t))
#define INTSET_ENC_INT32 (sizeof(int32_t))
#define INTSET_ENC_INT64 (sizeof(int64_t))
```
### 升级操作
当向当前的整数集合插入一个大于当前encodeing类型的数据时，必须先进行一次**不可逆的升级操作：即将所有的元素编码升级为足以容纳新元素的encoding。**
具体分为**三步**：
1.根据新元素的类型， **扩展整数集合底层数组的空间大小**。
2.将底层数组现有的所有元素都转换成与新元素相同的类型，并将类型转换后的元素放置到正确的位上，**而且在放置元素的过程中，需要继续维持底层数组的有序性质不变**。
3.将**新元素添加到底层数组里面**。

**举个例子：**
开始时，整数集合的contents数据类型为INT16，其中存储的元素如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/20f1f9410744bc10b101a8d66f4f05c8.png)
现在需要插入一个数字：65535，超过了INT16的数据范围，故需要进行升级操作，升级到32位。先进行空间的拓展，64*4=256位，现在只有48位，更新数组空间之后：
![image.png](https://oss1.aistar.cool/elog-offer-now/c605715006b719923c47741367072c9e.png)
空间分配完毕，现在需要对原有的元素进行转移（因为原有的数字是INT16位格式存储的），为了保证元素有序性，从最后一位3进行转移：
![image.png](https://oss1.aistar.cool/elog-offer-now/0195d5a368892e67bc4dc9f7d85fcfa1.png)
转移原有字符之后，插入新元素65535：
![image.png](https://oss1.aistar.cool/elog-offer-now/70782b48059db2219ee59a61af50990d.png)
升级操作的时间**复杂度为O（N）**。
而且值得注意的是，引起升级操作的**新元素**要么存在索引0位置（负的太离谱），要么在length-1（大的太离谱）。之所以Redis的整形数组采用这种升级的方式，**有两个好处**：
一是**节约内存**，如果想容纳INT64的数字，那么传统做法是直接声明INT64的数组，但有时其实并不需要INT64的格式存储，浪费内存；只有当真正需要INT64时，才会分配相应的内存空间。**并且使用整数集合时元素数量较少，不会造成太高的时间成本。**
二是**高灵活性**，整数集合可以通过自动升级底层数组来适应新元素， 所以我们可以随意地将 int16_t 、int32_t 或者int64_t类型的整数添加到集合中，**而不必担心出现类型错误，这种做法非常灵活**。
> 升级之后不可降级。

### 接口分析
比较好奇的是**从底层数组怎么返回我想要的值**：
```cpp
/*  
 * 根据给定的编码方式 enc ，返回集合的底层数组在 pos 索引上的元素。
 * T = O(1)
 */
static int64_t _intsetGetEncoded(intset *is, int pos, uint8_t enc) {
    int64_t v64;
    int32_t v32;
    int16_t v16;

    // ((ENCODING*)is->contents) 首先将数组转换回被编码的类型
    // 然后 ((ENCODING*)is->contents)+pos 计算出元素在数组中的正确位置
    // 之后 memcpy(&vEnc, ..., sizeof(vEnc)) 再从数组中拷贝出正确数量的字节
    // 如果有需要的话， memrevEncifbe(&vEnc) 会对拷贝出的字节进行大小端转换
    // 最后将值返回
    if (enc == INTSET_ENC_INT64) {
        memcpy(&v64,((int64_t*)is->contents)+pos,sizeof(v64));
        memrev64ifbe(&v64);
        return v64;
    } else if (enc == INTSET_ENC_INT32) {
        memcpy(&v32,((int32_t*)is->contents)+pos,sizeof(v32));
        memrev32ifbe(&v32);
        return v32;
    } else {
        memcpy(&v16,((int16_t*)is->contents)+pos,sizeof(v16));
        memrev16ifbe(&v16);
        return v16;
    }
}
/* 
 * 根据集合的编码方式，返回底层数组在 pos 索引上的值
 */
static int64_t _intsetGet(intset *is, int pos) {
    return _intsetGetEncoded(is,pos,intrev32ifbe(is->encoding));
}
```
不对，上述的操作只是在指定的pos插入，那么如何确定这个pos呢？其实整数集合中的**整数都是有序的，从小到大排列**，因此在插入或者查找某值时都是先使用二分查找的方式进行查找，以下是往整数集合中插入一个value的函数：
```cpp
intset *intsetAdd(intset *is, int64_t value, uint8_t *success) {
    // 计算编码 value 所需的长度
    uint8_t valenc = _intsetValueEncoding(value);
    uint32_t pos;

    // 默认设置插入为成功
    if (success) *success = 1;

    // 如果 value 的编码比整数集合现在的编码要大
    // 那么表示 value 必然可以添加到整数集合中
    // 并且整数集合需要对自身进行升级，才能满足 value 所需的编码
    if (valenc > intrev32ifbe(is->encoding)) {
        return intsetUpgradeAndAdd(is,value);
    } else {
        // 运行到这里，表示整数集合现有的编码方式适用于 value
        // 在整数集合中查找 value ，看他是否存在：
        // - 如果存在，那么将 *success 设置为 0 ，并返回未经改动的整数集合
        // - 如果不存在，那么可以插入 value 的位置将被保存到 pos 指针中
        //   等待后续程序使用
        if (intsetSearch(is,value,&pos)) {
            if (success) *success = 0;
            return is;
        }

        // 运行到这里，表示 value 不存在于集合中
        // 程序需要将 value 添加到整数集合中
        // 为 value 在集合中分配空间
        is = intsetResize(is,intrev32ifbe(is->length)+1);
        // 如果新元素不是被添加到底层数组的末尾
        // 那么需要对现有元素的数据进行移动，空出 pos 上的位置，用于设置新值
        // 举个例子
        // 如果数组为：
        // | x | y | z | ? |
        //     |<----->|
        // 而新元素 n 的 pos 为 1 ，那么数组将移动 y 和 z 两个元素
        // | x | y | y | z |
        //         |<----->|
        // 这样就可以将新元素设置到 pos 上了：
        // | x | n | y | z |
        // T = O(N)
        if (pos < intrev32ifbe(is->length)) intsetMoveTail(is,pos,pos+1);
    }

    // 将新值设置到底层数组的指定位置中
    _intsetSet(is,pos,value);
    // 增一集合元素数量的计数器
    is->length = intrev32ifbe(intrev32ifbe(is->length)+1);
    // 返回添加新元素后的整数集合
    return is;
}
```
**那么怎么插入一个数据呢？**
```cpp
/* 
 * 根据集合的编码方式，将底层数组在 pos 位置上的值设为 value 。
 */
static void _intsetSet(intset *is, int pos, int64_t value) {
    // 取出集合的编码方式
    uint32_t encoding = intrev32ifbe(is->encoding);
    // 根据编码 ((Enc_t*)is->contents) 将数组转换回正确的类型
    // 然后 ((Enc_t*)is->contents)[pos] 定位到数组索引上
    // 接着 ((Enc_t*)is->contents)[pos] = value 将值赋给数组
    // 最后， ((Enc_t*)is->contents)+pos 定位到刚刚设置的新值上 
    // 如果有需要的话， memrevEncifbe 将对值进行大小端转换
    if (encoding == INTSET_ENC_INT64) {
        ((int64_t*)is->contents)[pos] = value;
        memrev64ifbe(((int64_t*)is->contents)+pos);
    } else if (encoding == INTSET_ENC_INT32) {
        ((int32_t*)is->contents)[pos] = value;
        memrev32ifbe(((int32_t*)is->contents)+pos);
    } else {
        ((int16_t*)is->contents)[pos] = value;
        memrev16ifbe(((int16_t*)is->contents)+pos);
    }
}
```
看到其中有个memrev16/32/64ifbe函数，有些好奇，遂F12，找到了源码：
```cpp
/*将16位小端序转为大端序*/
void memrev16(void *p) {
    unsigned char *x = p, t;
    t = x[0];
    x[0] = x[1];
    x[1] = t;
}

/* 将32位小端序转为大端序 */
void memrev32(void *p) {
    unsigned char *x = p, t;
    t = x[0];
    x[0] = x[3];
    x[3] = t;
    t = x[1];
    x[1] = x[2];
    x[2] = t;
}
```
补充关于大端和小端序的转换，值得注意的是，**大端小端在内存的存储的顺序是按照字节，而不是按位！**
例如小端中的：**00000000 10000000**，好
在大端中存储不是：00000001 00000000 （即按位逆序）
而是按字节相反：**10000000 00000000。**
**示意图：**
![image.png](https://oss1.aistar.cool/elog-offer-now/f1028970f894ef9184187d1ae6d368e8.png)
**转换方式：**
![image.png](https://oss1.aistar.cool/elog-offer-now/ad0bf09dd5e616826e103714061f51b1.png)
所以现在来看memrev16/32就明白了，先用char*来获取单一字节的数据，**而后两两换位，即实现大端到小端的转变**。不妨试试不看源码，写写memrev64？
那么集合是怎么进行删除的呢？**盲猜是靠内存的拷贝，将后续的数据拷贝至要删除的位置，看了一下果然如此**：
```cpp
static void intsetMoveTail(intset *is, uint32_t from, uint32_t to) {
    void *src, *dst;

    // 要移动的元素个数
    uint32_t bytes = intrev32ifbe(is->length)-from;

    // 集合的编码方式
    uint32_t encoding = intrev32ifbe(is->encoding);

    // 根据不同的编码
    // src = (Enc_t*)is->contents+from 记录移动开始的位置
    // dst = (Enc_t*)is_.contents+to 记录移动结束的位置
    // bytes *= sizeof(Enc_t) 计算一共要移动多少字节
    if (encoding == INTSET_ENC_INT64) {
        src = (int64_t*)is->contents+from;
        dst = (int64_t*)is->contents+to;
        bytes *= sizeof(int64_t);
    } else if (encoding == INTSET_ENC_INT32) {
        src = (int32_t*)is->contents+from;
        dst = (int32_t*)is->contents+to;
        bytes *= sizeof(int32_t);
    } else {
        src = (int16_t*)is->contents+from;
        dst = (int16_t*)is->contents+to;
        bytes *= sizeof(int16_t);
    }
    // 进行移动
    // T = O(N)
    memmove(dst,src,bytes);
}
```
## 压缩列表
> 源码参见：ziplist.h和ziplist.c。

压缩列表是 Redis 为了**节约内存而开发的**，由一系列**特殊编码**的连续内存块组成的顺序型（sequential）数据结构。
Redis的**有序集合、哈希以及列表都直接或者间接使用了压缩列表**。
**当有序集合或哈希的元素数目比较少，且元素都是短字符串或整形时**，Redis便使用压缩列表作为其底层数据存储方式。**列表使用快速链表（quicklist）数据结构存储，而快速链表就是双向链表与压缩列表的组合(见后)。**
一个压缩列表可以包含**任意多个节点（entry）**， 每个节点可以保存一个**字节数组**或者一个**整数值**。以下就是一个压缩列表的结构：
![image.png](https://oss1.aistar.cool/elog-offer-now/3d405d563075eff56f87d1e898e9e288.png)
1、zlbytes：**压缩列表的字节长度**，占4个字节，因此压缩列表最长**(2^32)-1字节**；
2、zltail：**压缩列表尾元素**相对于**压缩列表起始地址的偏移量**，占4个字节；
3、zllen：**压缩列表的元素数目**，**占两个字节**；那么当压缩列表的元素数目**超过(2^16)-2怎么处理呢**？此时通过zllen字段无法获得压缩列表的元素数目，**必须遍历整个压缩列表才能获取到元素数目**；
4、entry：压缩列表存储的元素，**可以为字节数组或者整数**；
5、zlend：**压缩列表的结尾(不是尾元素的意思)，占一个字节，恒为0xFF**。
在Redis中，压缩列表定义如下：
```cpp
/*  
 * 创建并返回一个新的 ziplist 
 */
unsigned char *ziplistNew(void) {
    // ZIPLIST_HEADER_SIZE 是 ziplist 表头的大小
    // +1 字节是表末端 ZIP_END 的大小
    unsigned int bytes = ZIPLIST_HEADER_SIZE+1;

    // 为表头和表末端分配空间
    unsigned char *zl = zmalloc(bytes);

    // 初始化表属性
    ZIPLIST_BYTES(zl) = intrev32ifbe(bytes);
    ZIPLIST_TAIL_OFFSET(zl) = intrev32ifbe(ZIPLIST_HEADER_SIZE);
    ZIPLIST_LENGTH(zl) = 0;

    // 设置表末端
    zl[bytes-1] = ZIP_END;

    return zl;
}
```
为便于**快速操作压缩列表获取各字段的数据**，redis有以下宏定义(char * zl指向压缩列表首地址)：
```cpp
// 定位到bytes 属性，该属性记录了整个 ziplist 所占用的内存字节数
#define ZIPLIST_BYTES(zl)       (*((uint32_t*)(zl)))
// 定位到offset 属性，该属性记录了到达表尾节点的偏移量
#define ZIPLIST_TAIL_OFFSET(zl) (*((uint32_t*)((zl)+sizeof(uint32_t))))
// 定位到length 属性，该属性记录了 ziplist 包含的节点数量
#define ZIPLIST_LENGTH(zl)      (*((uint16_t*)((zl)+sizeof(uint32_t)*2)))
// 返回 ziplist 表头的大小
#define ZIPLIST_HEADER_SIZE     (sizeof(uint32_t)*2+sizeof(uint16_t))
// 返回指向 ziplist 第一个节点（的起始位置）的指针
#define ZIPLIST_ENTRY_HEAD(zl)  ((zl)+ZIPLIST_HEADER_SIZE)
// 返回指向 ziplist 最后一个节点（的起始位置）的指针
#define ZIPLIST_ENTRY_TAIL(zl)  ((zl)+intrev32ifbe(ZIPLIST_TAIL_OFFSET(zl)))
// 返回指向 ziplist 末端 ZIP_END （的起始位置）的指针
#define ZIPLIST_ENTRY_END(zl)   ((zl)+intrev32ifbe(ZIPLIST_BYTES(zl))-1)
```
### 结构定义
压缩列表的**节点信息定义**如下：
```cpp
// 保存 ziplist 节点信息的结构
typedef struct zlentry {
    // prevrawlen ：前置节点的长度
    // prevrawlensize ：编码 prevrawlen 所需的字节大小
    unsigned int prevrawlensize, prevrawlen;
    // len ：当前节点值的长度
    // lensize ：编码 len 所需的字节大小
    unsigned int lensize, len;
    // 当前节点 header 的大小
    // 等于 prevrawlensize + lensize
    unsigned int headersize;

    // 当前节点值所使用的编码类型
    unsigned char encoding;
    // 指向当前节点的指针
    unsigned char *p;
} zlentry;
```
### 节点细节
由上文节点定义代码可知，压缩节点信息可以分为三个部分：**previous_entry_length，encoding，content**，如下图：
![image.png](https://oss1.aistar.cool/elog-offer-now/cc031bc0d438dc600310ad6241b091df.png)
现在就来详细看看这三个部分。
1.previous_entry_lentry：记录前一个节点的长度，1或5字节——前一节点**小于254字节**，那么就用**1字节**保存前一节点信息否则用**五字节**表示（那么第一字节设置为0xFE（254）后四字节为长度）。
当前节点指针和previous字段可以实现快速访问上一节点，从而实现列表**节点回溯**。
![image.png](https://oss1.aistar.cool/elog-offer-now/f6aae66f2fbd629a1ccd8999af098dd4.png)
2.encoding字段：**表示content所保存的数据类型及长度。**可选1/2/5字节，分别表示**字节数组或整形**。详细编码可见下表：
字节数组编码如下：

| **编码** | **编码长度** | **content 属性保存的值** |
| --- | --- | --- |
| 00bbbbbb | 1 字节 | 长度小于等于 63 字节的字节数组。 |
| 01bbbbbb xxxxxxxx | 2 字节 | 长度小于等于 16383 字节的字节数组。 |
| 10______ aaaaaaaa bbbbbbbb cccccccc dddddddd | 5 字节 | 长度小于等于 4294967295 的字节数组。 |

整数编码如下：

| **编码** | **编码长度** | **content 属性保存的值** |
| --- | --- | --- |
| 11000000 | 1 字节 | int16_t 类型的整数。 |
| 11010000 | 1 字节 | int32_t 类型的整数。 |
| 11100000 | 1 字节 | int64_t 类型的整数。 |
| 11110000 | 1 字节 | 24 位有符号整数。 |
| 11111110 | 1 字节 | 8 位有符号整数。 |
| 1111xxxx | 1 字节 | 使用这一编码的节点没有相应的 content 属性， 因为编码本身的 xxxx 四个位已经保存了一个介于 0 和12 之间的值， 所以它无须 content 属性。 |

3.content：**负责保存节点的值，可以为一个字节数组或整数**。如下两个例子分别表示一个11字节的字节数组和一个保存int16的整数值，不妨猜猜看哪一个是表示11字节的字节数组呢？
![image.png](https://oss1.aistar.cool/elog-offer-now/91a82bd62680279abaf4629e7410e80a.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/251e072257db494487d612e662da3560.png)
有关压缩列表指针所指地址的示例如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/b4afe2eacdabdb4156ba9b40741d6f70.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/a36bbc268e40b8c98a5e3c896c627205.png)
### 接口分析
创建压缩列表
```cpp
unsigned char *ziplistNew(void);
/*创建空的压缩列表，只需要分配初始存储空间（11=4+4+2+1个字节），并对zlbytes、zltail、zllen和zlend字段初始化即可。*/
unsigned char *ziplistNew(void) {
    //ZIPLIST_HEADER_SIZE = zlbytes + zltail + zllen;
    //最后这个加1表示bytes本身
    unsigned int bytes = ZIPLIST_HEADER_SIZE+1;        
    unsigned char *zl = zmalloc(bytes);

    ZIPLIST_BYTES(zl) = intrev32ifbe(bytes);
    ZIPLIST_TAIL_OFFSET(zl) = intrev32ifbe(ZIPLIST_HEADER_SIZE);
    ZIPLIST_LENGTH(zl) = 0;

    //结尾标识0XFF
    zl[bytes-1] = ZIP_END;             
    return zl;
}
```
插入元素
函数输入参数zl表示压缩列表首地址，p指向新元素的插入位置，s表示数据内容，slen表示数据长度，返回参数为压缩列表首地址。
```cpp
unsigned char *ziplistInsert(unsigned char *zl, unsigned char *p,  unsigned char *s, unsigned int slen);
```
插入元素时，可以简要分为三个步骤：
第一步需要将元素内容**编码**为压缩列表的元素，
第二步**重新分配空间**，
第三步**拷贝数据**。
下面分别讨论每个步骤的实现逻辑。
1)编码
编码即计算previous_entry_length字段、encoding字段和content字段的内容。**如何获取前一个元素的长度呢？**这时候就需要根据插入元素的位置**分情况**讨论了，如图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/a1f753433d5313cd9489063d70018e67.png)
当压缩列表为空插入位置为P0时，此时不存在前一个元素，**即前一个元素的长度为0**；
当插入位置为P1时，此时需要获取entryX元素的长度，**而entryX+1元素的previous_entry_length字段存储的就是entryX元素的长度**，比较容易获取；
当插入位置为P2时，此时需要获取entryN元素的长度，entryN是压缩列表的尾元素，**计算其元素长度需要将其三个字段长度相加**，函数实现如下：
```cpp
unsigned int zipRawEntryLength(unsigned char *p) {
    unsigned int prevlensize, encoding, lensize, len;
    ZIP_DECODE_PREVLENSIZE(p, prevlensize);
    ZIP_DECODE_LENGTH(p + prevlensize, encoding, lensize, len);
    return prevlensize + lensize + len;
}
```
**encoding字段标识的是当前元素存储的数据类型以及数据长度**，编码时首先会尝试将**数据内容解析为整数**，如果解析成功则按照压缩列表整数类型编码存储，**解析失败的话按照压缩列表字节数组类型编码存储**。
```cpp
if (zipTryEncoding(s,slen,&value,&encoding)) {
    reqlen = zipIntSize(encoding);
} else {
    reqlen = slen;
}

reqlen += zipStorePrevEntryLength(NULL,prevlen);
reqlen += zipStoreEntryEncoding(NULL,encoding,slen);
```
2）重分配空间
空间大小是否是添加元素前的**压缩列表长度与新添加元素元素长度之和呢**？并不完全是，如图中所示的例子。
![image.png](https://oss1.aistar.cool/elog-offer-now/847180f71759b587406d56e6018b88cf.png)
插入元素前，entryX元素长度为128字节，entryX+1元素的previous_entry_length字段占1个字节；
添加元素entryNEW元素，元素长度为1024字节，此时entryX+1元素的previous_entry_length字段需要占5个字节；
即压缩列表的长度不仅仅是增加了1024字节，还有entryX+1元素扩展的4字节。
很容易知道，entryX+1元素长度可能增加4字节，也可能减小4字节，也可能不变。而由于重新分配空间，新元素插入的位置指针P会失效，因此**需要预先计算好指针P相对于压缩列表首地址的偏移量**，待分配空间之后再偏移即可。
```cpp
size_t curlen = intrev32ifbe(ZIPLIST_BYTES(zl));
int forcelarge = 0;
nextdiff = (p[0] != ZIP_END) ? zipPrevLenByteDiff(p,reqlen) : 0;
if (nextdiff == -4 && reqlen < 4) {
    nextdiff = 0;
    forcelarge = 1;
}
//存储偏移量
offset = p-zl;
//调用realloc重新分配空间
zl = ziplistResize(zl,curlen+reqlen+nextdiff);
//重新偏移到插入位置P
p = zl+offset;
```
**那么nextdiff与forcelarge在这里有什么用呢？**
分析ziplistResize函数的3个输入参数，curlen表示插入元素前压缩列表的长度，reqlen表示**插入元素元素的长度**，而nextdiff表示的是**entryX+1元素长度的变化**，取值可能为0（长度不变）、4（长度增加4）和-4（长度减小4）。
我们再思考下，当nextdiff等于-4，而reqlen小于4时会发生什么呢？没错，插入元素导致压缩列表所需空间减少了，即函数ziplistResize底层调用realloc重新分配的空间小于指针zl指向的空间。这可能会存在问题，我们都知道realloc重新分配空间时，返回的地址可能不变，当重新分配的空间大小反而减少时，realloc底层实现可能会将多余的空间回收，此时可能会导致数据的丢失。**因此需要避免这种情况的发生，即重新赋值nextdiff等于0，同时使用forcelarge标记这种情况**。
可以再思考下，nextdiff等于-4时，reqlen会小于4吗？答案是可能的，连锁更新可能会导致这种情况的发生。连锁更新将在之后介绍。
3）数据拷贝
重新分配空间之后，需要将位置P后的元素移动到指定位置，将新元素插入到位置P。我们假设entryX+1元素的长度增加4（即nextdiff等于4），此时数据拷贝示意图如图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/0ed2e5125e8ba1fe0b546845868e8876.png)
从图中可以看到，位置P后的所有元素都需要移动，移动的偏移量是插入元素entryNew的长度，移动的数据块长度是位置P后所有元素长度之和再加上nextdiff的值，数据移动之后还需要更新entryX+1元素的previous_entry_length字段。
```cpp
memmove(p+reqlen,p-nextdiff,curlen-offset-1+nextdiff); 
//更新entryX+1元素的previous_entry_length字段字段
if (forcelarge)
    //entryX+1元素的previous_entry_length字段依然占5个字节;
    //但是entryNEW元素长度小于4字节
    zipStorePrevEntryLengthLarge(p+reqlen,reqlen);
else
    zipStorePrevEntryLength(p+reqlen,reqlen);

//更新zltail字段
ZIPLIST_TAIL_OFFSET(zl) =
    intrev32ifbe(intrev32ifbe(ZIPLIST_TAIL_OFFSET(zl))+reqlen);

zipEntry(p+reqlen, &tail);
if (p[reqlen+tail.headersize+tail.len] != ZIP_END) {
    ZIPLIST_TAIL_OFFSET(zl) =
        intrev32ifbe(intrev32ifbe(ZIPLIST_TAIL_OFFSET(zl))+nextdiff);
}

//更新zllen字段
ZIPLIST_INCR_LENGTH(zl,1);
```
思考一下，第一次更新尾元素偏移量之后，为什么指向的元素可能不是尾元素呢？很显然，当entryX+1元素就是尾元素时，只需要更新一次尾元素的偏移量；但是当entryX+1元素不知尾元素，且entryX+1元素长度发生了改变，此时尾元素偏移量还需要加上nextdiff的值。
以上参考链接：[强烈推荐](https://segmentfault.com/a/1190000017328042)
### 连锁更新
当往ziplist中插入或删除节点时，**由于previous节点字节数可为1或5，保存的前置节点大小不一致，可能就会引发后续节点依次影响**，从而发生多次空间重分配，这就是连锁更新。
比如插入的new恰好大于254字节，而原本entry都是介于250-253之间：
![image.png](https://oss1.aistar.cool/elog-offer-now/e227c0373d9996ad2d023224d477c520.png)
那么插入是如何导致的呢？先想再看：
![image.png](https://oss1.aistar.cool/elog-offer-now/6096899f47a23c15771c75aa2254030e.png)
解释——当e1-en都是250-253字节时，big大于254，small小于254，那么删除small就会造成e1之后节点的连锁更新。
在最坏的情况下，需要执行N次重分配操作，所以每次空间重分配的**最坏复杂度为O(n^2）**。虽然有如此严重的性能损耗，但是实际场景中发生的概率极低，所以ziplistPush等命令平均复杂度为O(n)。
# **三、数据类型的实现**
在前面,我们陆续介绍了 Redis 用到的所有主要数据结构。
**Redis 并没有直接使用这些数据结构来实现键值对数据库，而是基于这些数据结构创建了一个对象系统**，这个系统包含**字符串对象、列表对象、哈希对象、集合对象和有序集合对象这五种类型的对象**。
> 对象类型及编码，源码文件：object.c

每次当我们在Redis的数据库中新创建一个键值对时，我们至少会创建两个对象，一个对象用作**键值对的键（键对象）**，另一个对象用作键值对的**值（值对象）**。
Redis中的每个对象都由一个redisObject结构表示：
```cpp
typedef struct redisObject {
    // 对象类型
    unsigned type:4;
    // 底层编码
    unsigned encoding:4;
    // 对象最后一次被访问的时间(日后会说)
    unsigned lru:REDIS_LRU_BITS; /* lru time (relative to server.lruclock) */
    // 引用计数
    int refcount;
    // 指向实际存储单元的指针
    void *ptr;
} robj;
```
之前在介绍跳表时也给出过该定义，不过当时没有详细说，接下来我们来仔细看看。

- **类型** **该属性记录对象的类型**，可选常量如下：
| **类型常量** | **对象的名称** |
| --- | --- |
| REDIS_STRING | 字符串对象 |
| REDIS_LIST | 列表对象 |
| REDIS_HASH | 哈希对象 |
| REDIS_SET | 集合对象 |
| REDIS_ZSET | 有序集合对象 |

> 注：对于Redis键值对来说，**键总是字符串对象**，**而值才是上述五种类型其中一种**。

- **编码** 对象的ptr指针**指向对象的底层实现数据结构**，而这些数据结构由对象的encoding属性决定。encoding属性**记录了对象所使用的编码**， **也即是说使用了什么数据结构作为对象的底层实现，**可选的对象编码如下。
| **编码常量** | **编码所对应的底层数据结构** |
| --- | --- |
| REDIS_ENCODING_INT | long 类型的整数 |
| REDIS_ENCODING_EMBSTR | embstr 编码的简单动态字符串 |
| REDIS_ENCODING_RAW | 简单动态字符串 |
| REDIS_ENCODING_HT | 字典 |
| REDIS_ENCODING_LINKEDLIST | 双端链表 |
| REDIS_ENCODING_ZIPLIST | 压缩列表 |
| REDIS_ENCODING_INTSET | 整数集合 |
| REDIS_ENCODING_SKIPLIST | 跳跃表和字典 |

每种对象都至少（除了Hyperloglog）可以使用两种不同的编码，见下图：
![image.png](https://oss1.aistar.cool/elog-offer-now/43e251107fa5bbe83fff24b75f058217.png)
通过encoding属性来设定对象所使用的编码，而不是为特定类型的对象关联一种固定的编码，**极大地提升了 Redis 的灵活性和效率**，因为 Redis可以根据不同的使用场景来为一个对象设置不同的编码，从而优化对象在某一场景下的效率。
> 举个例子，在列表对象包含的元素比较少时，Redis使用压缩列表作为列表对象的底层实现：
> 1）因为**压缩列表比双端链表更节约内存**，并且在元素数量较少时，压缩列表更合适；
> 2）元素数量增多或者单个元素过大时，对象就**会将底层实现从压缩列表转向功能更强**、也更适合保存大量元素的双端链表上面；

- **空转时长（lru）**：该属性记录了**对象最后一次被访问的时间。**该值在Redis的**内存过期值淘汰**时被用到。如果服务器用于回收内存的算法为 volatile-lru 或者 allkeys-lru ，那么当内存到上限值时，空转时长较高的那部分键对象会优先被服务器释放，从而回收内存。
- **引用计数** ：** Redis在自己的对象系统中构建了一个引用计数技术实现的内存回收机制**，通过这一机制，**程序可以通过跟踪对象的引用计数信息，在适当的时候自动释放对象并进行内存回收**。

对象的引用计数信息会随着对象的使用状态而不断变化：

   - 在**创建一个新对象**时， 引用**计数的值会被初始化为1**；
   - 当对象被一个新程序使用时，它的引用计数值会被**增一**；
   - 当对象**不再被一个程序使用时**，**它的引用计数值会被减一**；
   - 当对象的引用计数值变为0时，**对象所占用的内存会被释放**；

修改引用对象计数器有专门的API，如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/2619462220398e2c406c227a460d57fa.png)
对象的**整个生命周期可以划分为创建对象**、**操作对象**、**释放对象**三个阶段。释放之前最后调用的API即是decRefcount：
```cpp
void decrRefCount(robj *o) {
    if (o->refcount <= 0) redisPanic("decrRefCount against refcount <= 0");
    // 释放对象
    if (o->refcount == 1) {
        switch(o->type) {
        case REDIS_STRING: freeStringObject(o); break;
        case REDIS_LIST: freeListObject(o); break;
        case REDIS_SET: freeSetObject(o); break;
        case REDIS_ZSET: freeZsetObject(o); break;
        case REDIS_HASH: freeHashObject(o); break;
        default: redisPanic("Unknown object type"); break;
        }
        zfree(o);
    // 减少计数
    } else {
        o->refcount--;
    }
}
```

- ptr，**该指针指向实际存储的数据单元**。

对象的**引用计数属性**带有**对象共享（只对整数值）**的作用。举个例子，假设键A创建了一个**包含整数值100的字符串对象**作为值对象:
![image.png](https://oss1.aistar.cool/elog-offer-now/a49c22924a8c64c1b375e17391911332.png)
如果这时键B也要创建一个同样保存了整数值100的字符串对象作为值对象，**那么服务器有以下两种做法**：
·为键 B **新创建**一个包含整数值100的字符串对象；
·让键 A 和键 B **共享同一个字符串对象**；
以上**两种方法很明显是第二种方法更节约内存**。
在 Redis 中，**让多个键共享同一个值对象需要执行以下两个步骤**：
·将数据库键的**值指针指向一个现有的值对象**；
·将**被共享的值对象的引用计数增一**。
如果键A和键B指向同一对象，现如今的情况如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/914b68dccbb3104c66e48168625a0165.png)
共享对象机制对于节约内存非常有帮助，**数据库中保存的相同值对象越多，对象共享机制就能节约越多的内存**。
Redis会在初始化服务器时，创建一万个字符串对象，这些对象包含了从0到9999的所有整数值，当服务器需要用到值为0到9999的字符串对象时，服务器就会使用这些共享对象，而不是新创建对象。
为什么共享对象只对整数值，而不共享包含字符串的对象呢？
**因为需要有一个验证时间！只有当共享目标和想要建立的键一样时，才会共享，验证整数只需要O(1)，字符串需要O(n），列表或hash则需要O(n^2)，这将造成CPU资源浪费**。
## 字符串对象
> 源码文件：t_string.c。

字符串**对象是Redis数据库所有键值对的根本**，因为键都是字符串对象。如下是Redis中string对象SET、SETEX等命令的底层API：
```cpp
void setGenericCommand(redisClient *c, int flags, robj *key, robj *val, robj *expire, int unit, robj *ok_reply, robj *abort_reply) {
    long long milliseconds = 0; /* initialized to avoid any harmness warning */
    // 取出过期时间
    if (expire) {
        // 取出 expire 参数的值
        // T = O(N)
        if (getLongLongFromObjectOrReply(c, expire, &milliseconds, NULL) != REDIS_OK)
            return;

        // expire 参数的值不正确时报错
        if (milliseconds <= 0) {
            addReplyError(c,"invalid expire time in SETEX");
            return;
        }
        // 不论输入的过期时间是秒还是毫秒
        // Redis 实际都以毫秒的形式保存过期时间
        // 如果输入的过期时间为秒，那么将它转换为毫秒
        if (unit == UNIT_SECONDS) milliseconds *= 1000;
    }
    // 如果设置了 NX 或者 XX 参数，那么检查条件是否不符合这两个设置
    // 在条件不符合时报错，报错的内容由 abort_reply 参数决定
    if ((flags & REDIS_SET_NX && lookupKeyWrite(c->db,key) != NULL) ||
        (flags & REDIS_SET_XX && lookupKeyWrite(c->db,key) == NULL))
    {
        addReply(c, abort_reply ? abort_reply : shared.nullbulk);
        return;
    }
    // 将键值关联到数据库
    setKey(c->db,key,val);
    // 将数据库设为脏
    server.dirty++;
    // 为键设置过期时间
    if (expire) setExpire(c->db,key,mstime()+milliseconds);
    // 发送事件通知
    notifyKeyspaceEvent(REDIS_NOTIFY_STRING,"set",key,c->db->id);
    // 发送事件通知
    if (expire) notifyKeyspaceEvent(REDIS_NOTIFY_GENERIC,
        "expire",key,c->db->id);
    // 设置成功，向客户端发送回复
    // 回复的内容由 ok_reply 决定
    addReply(c, ok_reply ? ok_reply : shared.ok);
}
```
字符串对象的编码**可以是int、raw、embstr**。

- int编码，如果字符串对象的整数值可以被long类型表示，那么该**整数值会被保存在ptr指针中**（**编码格式跟实际参数类型不一样**）；
- raw编码，如果字符串对象保存的是字符串，**且大于39字节**，那就使用SDS字符串保存；
- embstr编码，如果该保存的字符串**小于等于39字节，就用**embstr格式保存。embstr是**专门用来保存短字符串的一种优化编码方式**，跟raw的区别在于，**它只需要调用一次内存分配一块连续的内存空间**，依次包含redisObject和sdshdr，**而raw是分别调用两次内存分配来存放redisObject和sdshdr**，embstr编码时实例如下图：

![image.png](https://oss1.aistar.cool/elog-offer-now/ad287c1adccff599fc45abcd66e8d062.png)
这样做有什么好处呢？

1. embstr 编码将创建字符串对象所需的**内存分配次数从 raw 编码的两次降低为一次**。
2. 释放embstr编码的字符串**对象只需要调用一次内存释放函数**，而释放raw编码的字符串对象需要调用两次内存释放函数。
3. 因为embstr编码的字符串对象的**所有数据都保存在一块连续的内存里面**，所以这种编码的字符串对象比起raw编码的字符串对象能够更好地利用缓存带来的优势。

若利用命令set msg “hello”，其值对象如下图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/ba739f53cfc3bfccea221a0a2c3d82a6.png)
值得注意，long double类型的浮点数在Redis中也是作为字符串来保存的，比如6.666，**那么会将其转换为字符串保存**。在需要用到该浮点数的时候又会先将其从字符串转成浮点数再计算。
**编码转换**
int/embstr在特定的情况下**会转换为raw编码**的对象，且不可逆。

- int编码的对象执行命令之后变成了字符串值，那就将从int转换为raw；
- **Redis没有为embstr编码的字符串对象编写任何相应的修改程序** （只有int编码的字符串对象和raw编码的字符串对象有这些程序），embstr**编码的字符串对象实际上是只读的**：当我们对embstr编码的字符串对象执行任何修改命令时，程序会先将对象的编码从embstr转换成raw，然后再执行修改命令；**因为这个原因，embstr编码的字符串对象在执行修改命令之后，总会变成一个raw编码的字符串对象**。

## 列表对象
> 源码文件：t_list.c。

**其底层编码是ziplist或linkedlist**。

- ziplist编码，底层是压缩列表，每个entry保存一个列表项，有两个条件：列表对象保存的所有字符串元素的**长度都小于 64 字节**；列表对象保存的**元素数量小于 512 个**；

下图是一个ziplist编码的实例：
![image.png](https://oss1.aistar.cool/elog-offer-now/8b85f0dfd47f2ba3d2d23e386e831bbf.png)
两个条件的任意一个不能被满足时，**对象的编码转换操作就会被执行，**从ziplist转为linkedlist。转换过程见该函数：
```cpp
void listTypeConvert(robj *subject, int enc) {
    listTypeIterator *li;
    listTypeEntry entry;
    redisAssertWithInfo(NULL,subject,subject->type == REDIS_LIST);
    // 转换成双端链表
    if (enc == REDIS_ENCODING_LINKEDLIST) {
        list *l = listCreate();
        listSetFreeMethod(l,decrRefCountVoid);
        // 遍历 ziplist ，并将里面的值全部添加到双端链表中
        li = listTypeInitIterator(subject,0,REDIS_TAIL);
        while (listTypeNext(li,&entry)) listAddNodeTail(l,listTypeGet(&entry));
        listTypeReleaseIterator(li);
        // 更新编码
        subject->encoding = REDIS_ENCODING_LINKEDLIST;
        // 释放原来的 ziplist
        zfree(subject->ptr);
        // 更新对象值指针
        subject->ptr = l;
    } else {
        redisPanic("Unsupported list conversion");
    }
}
```

- linkedlist编码，**底层是双端链表来保存SDS字符串对象**；

下图是一个双端链表编码的实例：
![image.png](https://oss1.aistar.cool/elog-offer-now/2b0fec29bc924a7f1a8daab3f6c30086.png)
> 注：字符串对象是 Redis 五种类型的对象中**唯一一种会被其他四种类型对象嵌套的对象**。

## 哈希对象
> 源码文件t_hash.c。

编码是**ziplist或者hashtable**。

- ziplist编码，底层是压缩列表，有两个条件，哈希对象保存的所有键值对的**键和值的字符串长度都小于 64 字节**；哈希对象保存的**键值对数量小于 512 个**；每当有**新的键值对要加入到哈希对象时**，保存了同一键值对的两个节点总是紧挨在一起，保存键的节点在前，保存值的节点在后；**且这些键值对遵循先来后到的原则**。
> 注：在使用ziplist编码的时候，**获取键对应值的时间复杂度不是O(1)**，**而是O(N^2)(先遍历键，在遍历值是否相等)**！**但由于使用ziplist的时候，长度和键的长度较小，对性能影响不是很大**。

- hashtable编码，当不满足上述的两个条件时，就使用字典作为底层实现。哈希对象中的每个键值对都使用一个**字典键值对来保存**：字典的**每个键和值都是一个字符串对象**；

以下是一个以字典为底层的哈希对象实例：
![image.png](https://oss1.aistar.cool/elog-offer-now/097d41f0a50cb856285f39e7f8f824ee.png)
> 注：当ziplist不满足两个条件其中之一时，原本保存在压缩列表里的所有键值对都会被转移并保存到字典里面。


## 集合对象
> 源码文件：t_set.c。

集合对象的编码可以是**intset或者hashtable** 。

- intset编码，使用整数集合作为集合对象的实现，有两个条件：集合对象保存的**所有元素都是整数值**；集合对象保存的**元素数量不超过512个**；

集合对象包含的所有元素都被保存在整数集合里面，见下：
![image.png](https://oss1.aistar.cool/elog-offer-now/a43f46ebbf80aba002977008ab358764.png)

- hashtable编码，当intset编码的两个条件不满足时，使用字典作为底层实现，**字典的每个键都是一个字符串对象，每个字符串对象包含了一个集合元素**，而字典的值则**全部被设置为 NULL（因为没有没有键就代表了值）**。
## 有序集合对象
> 源码文件t_zset.c。

有序集合的编码可以是**ziplist和skiplist**。

- ziplist 编码，使用**压缩列表作为底层实现有两个条件：**有序集合保存的**元素数量小于 128 个**；有序集合保存的**所有元素成员的长度都小于 64 字节**；
> 注：ziplist为了保证有序性，每次插入删除操作时，都可能需要对其中的数据进行移动。

每个集合元素使用**两个紧挨在一起的压缩列表节点来保存**，第一个节点保存元素的**成员**，而第二个元素则保存元素的**分值（score）（排序）**。
![image.png](https://oss1.aistar.cool/elog-offer-now/3fe427e75644ac2bf64117a1915b86ce.png)

- skiplist 编码，不满足上述条件时的有序集合对象**使用zset 结构作为底层实现**，一个**zset结构同时包含一个字典和一个跳跃表**：
```cpp
typedef struct zset {     
    zskiplist *zsl;     
    dict *dict; 
} zset; 
```
![image.png](https://oss1.aistar.cool/elog-offer-now/26cb33178f8bd4d18fd7703cd013c087.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/6c371e47f8bc8fd3f6c10c2d19924ace.png)
zset结构中的跳跃表按分值**从小到大保存了所有集合元素**，每个跳跃表节点都保存了一个集合元素：跳跃表节点的 **object 属性保存了元素的成员**，而跳跃表节点的** score 属性则保存了元素的分值**。** **

**通过这个跳跃表， 程序可以对有序集合进行范围型操作，比如 ZRANK 、ZRANGE 等命令就是基于跳跃表 API 来实现的**。
除此之外，zset结构中的**dict字典**为有序集合创建了一个从成员到分值的映射，**字典中的每个键值对都保存了一个集合元素：字典的键保存了元素的成员，而字典的值则保存了元素的分值**。

通过这个字典，程序可以用**O(1)复杂度查找给定成员的分值,ZSCORE命令就是根据这一特性实现的，而很多其他有序集合命令都在实现的内部用到了这一特性**。 
有序集合每个元素的成员**都是一个字符串对象**，而每个元素的分值**都是一个 double 类型的浮点数**。 值得一提的是，虽然zset结构同时使用跳跃表和字典来保存有序集合元素，**但这两种数据结构都会通过指针来共享相同元素的成员和分值**，所以同时使用跳跃表和字典来保存集合元素不会产生任何重复成员或者分值，也不会因此而浪费额外的内存。

**为什么需要这么做呢？**
在理论上来说，有序集合可以单独使用字典或者跳跃表的其中一种数据结构来实现，**但无论单独使用字典还是跳跃表，在性能上对比起同时使用字典和跳跃表都会有所降低**。
举个例子，如果我们只使用字典来实现有序集合，那么虽然以O(1)复杂度查找成员的分值这一特性会被保留，**但是，因为字典以无序的方式来保存集合元素**，所以每次在执行范围型操作一一一比如ZRANK、ZRANG等命令时，**程序都需要对字典保存的所有元素进行排序**，**完成这种排序需要至少O(NlogN)时间复杂度**，**以及额外的O(N)内存空间**（因为要创建一个数组来保存排序后的元素）

另一方面，如果我们只使用跳跃表来实现有序集合，那么跳跃表执行范围型操作的所有优点都会被保留，**但因为没有了字典，所以根据成员查找分值这一操作的复杂度将上升到到O(logn)**。

因为以上原因，为了让有序集合的**查找和范围型操作都尽可能快地执行**，Redis选择了同时使用字典和跳跃表两种数据结构来实现有序集合。 
注：常用命令
## Hyperloglog对象
源码文件：hyperloglog.c。
建议直接参考：[链接](https://blog.csdn.net/qq_39885372/article/details/104245363)
## 类型检查和多态
Redis中用于操作键的命令基本分为两种，一种是键共有操作，比如说DEL命令、EXPIRE命令、RENAME命令、TYPE 命令、OBJECT命令等。另一种是键特定操作，如SET、GET、APPEND、STRLEN等命令只能对字符串键执行。

**类型检查**
在执行一个类型特定的命令之前， Redis 会先检查输入键的类型是否正确， 然后再决定是否执行给定的命令。通过 redisObject 结构的 type 属性来实现的：
![image.png](https://oss1.aistar.cool/elog-offer-now/8b8cf4d50b900e27803ad7c78f207e42.png)
**多态命令**
这里指的是同一个对象一般具有两种编码方式，比如hash对象是hashtable和ziplist，那么执行命令的时候是怎么确定的呢？也是根据其对象的编码格式来的：
![image.png](https://oss1.aistar.cool/elog-offer-now/88b5447ad38461da781029e273f8ac54.png)
# 四、数据库实现
在Redis中，服务器中所有的数据库都保存在redis.h/redisServer结构中的db数组中：
```cpp
struct redisServer {
    // ……
    // 保存服务器中所有的数据库
    redisDb *db；
    //……
    // 决定服务器初始化时创建的数据库数量
    // 默认16
    int dbnum；
}
```
默认配置下的服务器启动之后的状态如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/7accd8aa66dbcc5d819bd4f23c0cc813.png)
对于redis的客户端而言，其结构中的db属性指向了当前正在操作的目标数据库，假设一个客户端的目标数据库为1，实例如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/8833b83c3f8a323ae336e58a0f9e09f8.png)
> 注：可以通过select指令进行数据库的切换（其实就是更改db的指向）。

## 数据库键空间
Redis服务器中的每个数据库都由redis.h/redisDb结构表示，如下：
```cpp
typedef struct redisDb {
    // 数据库键空间，保存着数据库中的所有键值对
    dict *dict;                 /* The keyspace for this DB */
    // 键的过期时间，字典的键为键，字典的值为过期事件 UNIX 时间戳
    dict *expires;              /* Timeout of keys with a timeout set */
    // 正处于阻塞状态的键
    dict *blocking_keys;        /* Keys with clients waiting for data (BLPOP) */
    // 可以解除阻塞的键
    dict *ready_keys;           /* Blocked keys that received a PUSH */
    // 正在被 WATCH 命令监视的键
    dict *watched_keys;         /* WATCHED keys for MULTI/EXEC CAS */
    struct evictionPoolEntry *eviction_pool;    /* Eviction pool of keys */
    // 数据库号码
    int id;                     /* Database ID */
    // 数据库的键的平均 TTL ，统计信息
    long long avg_ttl;          /* Average TTL, just for stats */
} redisDb;
```
其中dict字典保存了该数据库的所有键值对，我们就将其称为键空间。
键空间和用户所见的数据库是直接对应的：
·键空间的键**也就是数据库的键**，每个键都是一个字符串对象。
·键空间的**值也就是数据库的值**，每个值可以是字符串对象、列表对象、哈希表对象、集合对象和有序集合对象在内的任意一种 Redis 对象。
例如下图就是一个拥有一个字符串对象、哈希对象、列表对象的数据库键空间的实例：
![image.png](https://oss1.aistar.cool/elog-offer-now/996eca29abb82195a83a1d619b3ac562.png)
对一个数据库键进行添加、删除、更新、取值，其实都是先在键空间中取出键，而后再操作其对应的值对象。
另外，在读写键的时候，**需要进行一些维护操作**：

- 在读取一个键之后（读操作和写操作都要对键进行读取），服务器会根据键是否存在，**以此来更新服务器的键空间命中（hit）次数或键空间不命中（miss）次数**， 这两个值可以在 INFO stats 命令的 keyspace_hits 属性和 keyspace_misses 属性中查看。
- 在读取一个键之后，**服务器会更新键的 LRU （最后一次使用）时间**，**这个值可以用于计算键的闲置时间**，使用命令OBJECT idletime 命令可以查看键key的闲置时间。
- 如果服务器在读取一个键时，发现该键已经过期，**那么服务器会先删除这个过期键，然后才执行余下的其他操作**。
- 如果有客户端**使用WATCH命令监视了某个键**，那么服务器在对被监视的键**进行修改之后**， **会将这个键标记为脏（dirty）**， 从而让事务程序注意到这个键已经被修改过。
- 服务器每次修改一个键之后，**都会对脏（dirty）键计数器的值增一**， 这个计数器会**触发服务器的持久化以及复制操作执行**。
- 如果服务器**开启了数据库通知功能，那么在对键进行修改之后， 服务器将按配置发送相应的数据库通知**。
### 生存/过期时间
数据库redisDb结构中的expire字典保存过期时间，故称其为过期字典。
一个数据库的实例展示如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/ef2d93de73a0682537f84ec1cac840af.png)
注：过期**字典中存储的对象跟键空间的对象是共享的**！
**expire（秒）/pexpire（毫秒）**命令可以使得客户端以**秒或者毫秒**精度为**某个键设置生存时间（TTL）**，**经过指定时间之后**，服务器就会删除生存时间为0的键。
expireat/pexpireat命令可以设置过期时间，即到达那个时刻就删除。
四种命令如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/c4c0cdcaf50249cc676af7ce482fd9b2.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/5de964aa541a939dbac77dde3d1935a7.png)
注：其实这四种命令都可以看成**pexpireat,**它们之间的关系如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/1ea6403f26631cf11338c96506619307.png)
它们的底层代码如下**：**
```cpp
// 命令的第二个参数可能是绝对值，也可能是相对值。
//当执行 *AT 命令时， basetime 为 0 ，在其他情况下，它保存的就是当前的绝对时间。
//unit 用于指定 argv[2] （传入过期时间）的格式，
//它可以是 UNIT_SECONDS 或 UNIT_MILLISECONDS ，
// basetime 参数则总是毫秒格式的。
void expireGenericCommand(redisClient *c, long long basetime, int unit) {
    robj *key = c->argv[1], *param = c->argv[2];
    long long when; /* unix time in milliseconds when the key will expire. */

    // 取出 when 参数
    if (getLongLongFromObjectOrReply(c, param, &when, NULL) != REDIS_OK)
        return;

    // 如果传入的过期时间是以秒为单位的，那么将它转换为毫秒
    if (unit == UNIT_SECONDS) when *= 1000;
    when += basetime;

    /* No key, return zero. */
    // 取出键
    if (lookupKeyRead(c->db,key) == NULL) {
        addReply(c,shared.czero);
        return;
    }

    /* 在载入数据时，或者服务器为附属节点时，
     * 即使 EXPIRE 的 TTL 为负数，或者 EXPIREAT 提供的时间戳已经过期，
     * 服务器也不会主动删除这个键，而是等待主节点发来显式的 DEL 命令。
     * 程序会继续将（一个可能已经过期的 TTL）设置为键的过期时间，
     * 并且等待主节点发来 DEL 命令。
     */
    if (when <= mstime() && !server.loading && !server.masterhost) {

        // when 提供的时间已经过期，服务器为主节点，并且没在载入数据

        robj *aux;

        redisAssertWithInfo(c,key,dbDelete(c->db,key));
        server.dirty++;

        /* Replicate/AOF this as an explicit DEL. */
        // 传播 DEL 命令
        aux = createStringObject("DEL",3);

        rewriteClientCommandVector(c,2,aux,key);
        decrRefCount(aux);

        signalModifiedKey(c->db,key);
        notifyKeyspaceEvent(REDIS_NOTIFY_GENERIC,"del",key,c->db->id);

        addReply(c, shared.cone);

        return;
    } else {

        // 设置键的过期时间
        // 如果服务器为附属节点，或者服务器正在载入，
        // 那么这个 when 有可能已经过期的
        setExpire(c->db,key,when);

        addReply(c,shared.cone);

        signalModifiedKey(c->db,key);
        notifyKeyspaceEvent(REDIS_NOTIFY_GENERIC,"expire",key,c->db->id);
        server.dirty++;
        return;
    }
}
```
另外，可以使用**persist命令解除过期时间；TTL/PTTL**返回键的剩余生存时间。
### 过期删除策略
有三种常见的删除策略：

- **定时删除**：在设置键过期时间时，创建一个定时器，使得当定时器时间来临时，立即删除键；

该方法对内存友好，因为可以保证尽快删除过期的键并释放内存；缺点就是对CPU不友好，因为频繁的删除键会占用CPU时间，可能会影响吞吐量和响应时间。另外，定时器事件的时间复杂度为O(N)。

- **惰性删除**：过期键并不立即删除，而是每次取键时看它过期没有，过期就删除，没有就返回该键；

这种方式对CPU友好，因为仅在需要该键时才会检查，但缺点就是对内存不友好，过多的过期键会占用大量的内存，甚至可以看成内存泄漏——因为有的键所占用内存可能一直不会释放。

- **定时删除**：两者的一种折中方式，隔一段时间对数据库检查，删除其中过期的键，检查策略是重点：检查间隔跟检查数量。

Redis采用的是**惰性删除和定期删除策略**。
**惰性删除**
**源码在db.c/expireIfNeeded**，Redis在读写所有键的时候会检查其输入键是否过期：
```cpp
int expireIfNeeded(redisDb *db, robj *key) {
    // 取出键的过期时间
    mstime_t when = getExpire(db,key);
    mstime_t now;
    // 没有过期时间
    if (when < 0) return 0; /* No expire for this key */
    // 如果服务器正在进行载入，那么不进行任何过期检查
    if (server.loading) return 0;

    now = server.lua_caller ? server.lua_time_start : mstime();

    // 当服务器运行在 replication 模式时
    // 附属节点并不主动删除 key
    // 它只返回一个逻辑上正确的返回值
    // 真正的删除操作要等待主节点发来删除命令时才执行
    // 从而保证数据的同步
    if (server.masterhost != NULL) return now > when;

    // 运行到这里，表示键带有过期时间，并且服务器为主节点

    /* Return when this key has not expired */
    // 如果未过期，返回 0
    if (now <= when) return 0;
    /* Delete the key */
    server.stat_expiredkeys++;
    // 向 AOF 文件和附属节点传播过期信息
    propagateExpire(db,key);
    // 发送事件通知
    notifyKeyspaceEvent(REDIS_NOTIFY_EXPIRED,
        "expired",key,db->id);
    // 将过期键从数据库中删除
    return dbDelete(db,key);
}
```
![image.png](https://oss1.aistar.cool/elog-offer-now/93a8faeb4beb5359be7b3b94e7be4707.png)
**定期删除**
源码在redis.c/activeExpireCycle，该函数会在**规定时间内分多次遍历服务器的各个数据库，从expire字典中随机检查一部分键的过期时间，并删除其中的过期键**：
```cpp
 void activeExpireCycle(int type) {
    // 静态变量，用来累积函数连续执行时的数据
    static unsigned int current_db = 0; /* Last DB tested. */
    static int timelimit_exit = 0;      /* Time limit hit in previous call? */
    static long long last_fast_cycle = 0; /* When last fast cycle ran. */
    unsigned int j, iteration = 0;
    // 默认每次处理的数据库数量
    unsigned int dbs_per_call = REDIS_DBCRON_DBS_PER_CALL;
    // 函数开始的时间
    long long start = ustime(), timelimit;
    // 快速模式
    if (type == ACTIVE_EXPIRE_CYCLE_FAST) {
        // 如果上次函数没有触发 timelimit_exit ，那么不执行处理
        if (!timelimit_exit) return;
        // 如果距离上次执行未够一定时间，那么不执行处理
        if (start < last_fast_cycle + ACTIVE_EXPIRE_CYCLE_FAST_DURATION*2) return;
        // 运行到这里，说明执行快速处理，记录当前时间
        last_fast_cycle = start;
    }

    /* 一般情况下，函数只处理 REDIS_DBCRON_DBS_PER_CALL 个数据库
     *    除非：
     *    当前数据库的数量小于 REDIS_DBCRON_DBS_PER_CALL
     *     如果上次处理遇到了时间上限，那么这次需要对所有数据库进行扫描，
     *     这可以避免过多的过期键占用空间
     */
    if (dbs_per_call > server.dbnum || timelimit_exit)
        dbs_per_call = server.dbnum;
    // 函数处理的微秒时间上限
    // ACTIVE_EXPIRE_CYCLE_SLOW_TIME_PERC 默认为 25 ，也即是 25 % 的 CPU 时间
    timelimit = 1000000*ACTIVE_EXPIRE_CYCLE_SLOW_TIME_PERCrver.hz/100;
    timelimit_exit = 0;
    if (timelimit <= 0) timelimit = 1;
    // 如果是运行在快速模式之下
    // 那么最多只能运行 FAST_DURATION 微秒 
    // 默认值为 1000 （微秒）
    if (type == ACTIVE_EXPIRE_CYCLE_FAST)
        timelimit = ACTIVE_EXPIRE_CYCLE_FAST_DURATION; /* in microseconds. */
    // 遍历数据库
    for (j = 0; j < dbs_per_call; j++) {
        int expired;
        // 指向要处理的数据库
        redisDb *db = server.db+(current_db % server.dbnum);

        // 为 DB 计数器加一，如果进入 do 循环之后因为超时而跳出
        // 那么下次会直接从下个 DB 开始处理
        current_db++;
        do {
            unsigned long num, slots;
            long long now, ttl_sum;
            int ttl_samples;
            // 获取数据库中带过期时间的键的数量
            // 如果该数量为 0 ，直接跳过这个数据库
            if ((num = dictSize(db->expires)) == 0) {
                db->avg_ttl = 0;
                break;
            }
            // 获取数据库中键值对的数量
            slots = dictSlots(db->expires);
            // 当前时间
            now = mstime();

            // 这个数据库的使用率低于 1% ，扫描起来太费力了（大部分都会 MISS）
            // 跳过，等待字典收缩程序运行
            if (num && slots > DICT_HT_INITIAL_SIZE &&
                (num*100ots < 1)) break;

            /* The main collection cycle. Sample random keys among keys
             * with an expire set, checking for expired ones. 
             *
             * 样本计数器
             */
            // 已处理过期键计数器
            expired = 0;
            // 键的总 TTL 计数器
            ttl_sum = 0;
            // 总共处理的键计数器
            ttl_samples = 0;

            // 每次最多只能检查 LOOKUPS_PER_LOOP 个键
            if (num > ACTIVE_EXPIRE_CYCLE_LOOKUPS_PER_LOOP)
                num = ACTIVE_EXPIRE_CYCLE_LOOKUPS_PER_LOOP;

            // 开始遍历数据库
            while (num--) {
                dictEntry *de;
                long long ttl;

                // 从 expires 中随机取出一个带过期时间的键
                if ((de = dictGetRandomKey(db->expires)) == NULL) break;
                // 计算 TTL
                ttl = dictGetSignedIntegerVal(de)-now;
                // 如果键已经过期，那么删除它，并将 expired 计数器增一
                if (activeExpireCycleTryExpire(db,de,now)) expired++;
                if (ttl < 0) ttl = 0;
                // 累积键的 TTL
                ttl_sum += ttl;
                // 累积处理键的个数
                ttl_samples++;
            }

            /* Update the average TTL stats for this database. */
            // 为这个数据库更新平均 TTL 统计数据
            if (ttl_samples) {
                // 计算当前平均值
                long long avg_ttl = ttl_suml_samples;

                // 如果这是第一次设置数据库平均 TTL ，那么进行初始化
                if (db->avg_ttl == 0) db->avg_ttl = avg_ttl;
                /* Smooth the value averaging with the previous one. */
                // 取数据库的上次平均 TTL 和今次平均 TTL 的平均值
                db->avg_ttl = (db->avg_ttl+avg_ttl)/2;
            }

            // 我们不能用太长时间处理过期键，
            // 所以这个函数执行一定时间之后就要返回
            // 更新遍历次数
            iteration++;
            // 每遍历 16 次执行一次
            if ((iteration & 0xf) == 0 && /* check once every 16 iterations. */
                (ustime()-start) > timelimit)
            {
                // 如果遍历次数正好是 16 的倍数
                // 并且遍历的时间超过了 timelimit
                // 那么断开 timelimit_exit
                timelimit_exit = 1;
            }

            // 已经超时了，返回
            if (timelimit_exit) return;

            // 如果已删除的过期键占当前总数据库带过期时间的键数量的 25 %
            // 那么不再遍历
        } while (expired > ACTIVE_EXPIRE_CYCLE_LOOKUPS_PER_LOOP/4);
    }
} 
```
### AOF、RDB、复制对过期键的处理

- 若是生成RDB文件，即SAVE、BGSAVE命令，在保存过程中会对数据库中的键进行检查，过期的键将不保存；

**若是载入RDB文件，当以主服务器运行时，只会载入未过期的键；若以从服务器运行，所有键都会载入**；

- 若是写入AOF，某个键过期还未删除不会造成影响，只有当惰性删除/定期删除策略将其删除时，AOF会显式追加DEL命令，提示已删除；

若是载入AOF，会检查是否过期，过期的就不载入；

- 若是复制操作时，**从服务器不会在意该键时是过期还是不过期**，它的过期删除操作由主服务器控制，也就是说当主服务器删除一个过期键后，它会通知所有从服务器删除；若是主服务器没有发送，**那么从服务器依旧像是处理未过期键一样；这样做主要是为了保证主从服务器的数据一致性**。
### 通知与订阅
Redis2.8版本中新增了数据库的通知功能：客户端可以订阅指定的频道/模式来获取**数据库中键的变化及命令执行情况**。
下面的指令展示了一个客户端订阅0号数据库中针对**message键的命令（键空间通知：某个键执行了什么命令）**
![image.png](https://oss1.aistar.cool/elog-offer-now/722033e6cd64fdbd707c6bf190e77437.png)
还有一种是键事件通知（某个命令被什么键执行了），如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/3dc173075acfe139888fba5f8eebe201.png)
通知与订阅功能的源码文件为notify.c及pubsub.c，具体而言：
发布通知API：
```cpp
// notify.c
/* 
 * type 参数表示该通知类型
 * event 参数是一个字符串表示的事件名
 * key 参数是一个 Redis 对象表示的键名
 * dbid 参数为键所在的数据库ID
 */
void notifyKeyspaceEvent(int type, char *event, robj *key, int dbid) ;
```
每当一个Redis命令需要发送数据库通知时，**该命令的实现函数就会调用notifyKeyspaceEvent函数，并向函数传递相关信息**。例如执行SADD命令，其实现函数进行通知的部分代码如下：
```cpp
void saddCommand(redisClient *c){
    ...
    // 当至少有一个元素被成功添加
    if(added){
        ...
        // 传递该命令的相关信息
        notifyKeyspaceEvent(REDIS_NOTIFY_SET,"sadd",c->argv[1].c->db->id);
        }
    ...
}
```
## 持久化
为了避免因服务器宕机或错误造成数据严重丢失的问题，Redis提供了两种持久化（即将数据保存至磁盘）的方式，分别是RDB和AOF。
### RDB持久化
RDB持久化是将当前数据库状态**生成快照，即一个二进制文件**。通过该文件可以还原数据库状态。有两个命令可以生成RDB文件，一个是SAVE，另一个是BGSAVE。其实后者跟前者的区别主要在于BackGround，即后台保存。

- 使用SAVE时，当前服务器进程阻塞，直到RDB文件完全生成；
- 使用BGSAVE时，当前进程派生一个子进程完成RDB文件的生成，原服务器进程照常工作。
> 注：子进程与父进程写时复制，所以字典dict的负载因子此时才为5，尽量减少此时rehash的可能性。

现在结合源码分析一下，RDB持久化的源码文件为**rdb.c**，主要函数为**rdbSave（char *filename）**，并且SAVE和BGSAVE命令底层都是通过它实现的，我们先来看看代码：
```cpp
/*  
 * 将数据库保存到磁盘上。
 * 保存成功返回 REDIS_OK ，出错/失败返回 REDIS_ERR 。
 */
int rdbSave(char *filename) {
    dictIterator *di = NULL;
    dictEntry *de;
    char tmpfile[256];
    char magic[10];
    int j;
    long long now = mstime();
    FILE *fp;
    rio rdb;
    uint64_t cksum;

    // 创建临时文件
    snprintf(tmpfile,256,"temp-%d.rdb", (int) getpid());
    fp = fopen(tmpfile,"w");
    if (!fp) {
        redisLog(REDIS_WARNING, "Failed opening .rdb for saving: %s",
            strerror(errno));
        return REDIS_ERR;
    }

    // 初始化 I/O
    rioInitWithFile(&rdb,fp);

    // 设置校验和函数
    if (server.rdb_checksum)
        rdb.update_cksum = rioGenericUpdateChecksum;

    // 写入 RDB 版本号
    snprintf(magic,sizeof(magic),"REDIS%04d",REDIS_RDB_VERSION);
    if (rdbWriteRaw(&rdb,magic,9) == -1) goto werr;

    // 遍历所有数据库
    for (j = 0; j < server.dbnum; j++) {

        // 指向数据库
        redisDb *db = server.db+j;
        // 指向数据库键空间
        dict *d = db->dict;
        // 跳过空数据库
        if (dictSize(d) == 0) continue;
        // 创建键空间迭代器
        di = dictGetSafeIterator(d);
        if (!di) {
            fclose(fp);
            return REDIS_ERR;
        }

         // 写入 DB 选择器符号 该符号后接数据库ID
        if (rdbSaveType(&rdb,REDIS_RDB_OPCODE_SELECTDB) == -1) goto werr;
        if (rdbSaveLen(&rdb,j) == -1) goto werr;

        // 遍历数据库，并写入每个键值对的数据
         
        while((de = dictNext(di)) != NULL) {
            sds keystr = dictGetKey(de);
            robj key, *o = dictGetVal(de);
            long long expire;

            // 根据 keystr ，在栈中创建一个 key 对象
            initStaticStringObject(key,keystr);
            // 获取键的过期时间
            expire = getExpire(db,&key);
            // 保存键值对数据
            if (rdbSaveKeyValuePair(&rdb,&key,o,expire,now) == -1) goto werr;
        }
        dictReleaseIterator(di);
    }
    di = NULL; /* So that we don't release it again on error. */

    /*  写入 EOF 代码
     */
    if (rdbSaveType(&rdb,REDIS_RDB_OPCODE_EOF) == -1) goto werr;

     // CRC64 校验和。
     // 如果校验和功能已关闭，那么 rdb.cksum 将为 0
     // 在这种情况下， RDB 载入时会跳过校验和检查。
    cksum = rdb.cksum;
    memrev64ifbe(&cksum);
    rioWrite(&rdb,&cksum,8);

    // 冲洗缓存，确保数据已写入磁盘
    if (fflush(fp) == EOF) goto werr;
    if (fsync(fileno(fp)) == -1) goto werr;
    if (fclose(fp) == EOF) goto werr;

    // 使用 RENAME ，原子性地对临时文件进行改名，覆盖原来的 RDB 文件。
    
    if (rename(tmpfile,filename) == -1) {
        redisLog(REDIS_WARNING,"Error moving temp DB file on the final destination: %s", strerror(errno));
        unlink(tmpfile);
        return REDIS_ERR;
    }

    // 写入完成，打印日志
    redisLog(REDIS_NOTICE,"DB saved on disk");
    // 清零数据库脏状态
    server.dirty = 0;
    // 记录最后一次完成 SAVE 的时间
    server.lastsave = time(NULL);
    // 记录最后一次执行 SAVE 的状态
    server.lastbgsave_status = REDIS_OK;
    return REDIS_OK;

werr:
    // 关闭文件
    fclose(fp);
    // 删除文件
    unlink(tmpfile);
    redisLog(REDIS_WARNING,"Write error saving DB on disk: %s", strerror(errno));
    if (di) dictReleaseIterator(di);
    return REDIS_ERR;
} 	
```
SAVE命令底层几乎就是上述函数，BGSAVE的实现只是需要fork（）一个子进程：
```cpp
int rdbSaveBackground(char *filename) {
    pid_t childpid;
    long long start;

    // 如果 BGSAVE 已经在执行，那么出错
    if (server.rdb_child_pid != -1) return REDIS_ERR;
    // 记录 BGSAVE 执行前的数据库被修改次数
    server.dirty_before_bgsave = server.dirty;
    // 最近一次尝试执行 BGSAVE 的时间
    server.lastbgsave_try = time(NULL);
    // fork() 开始前的时间，记录 fork() 返回耗时用
    start = ustime();
    if ((childpid = fork()) == 0) {
        int retval;
        /* Child */
        // 关闭网络连接 fd
        closeListeningSockets(0);
        // 设置进程的标题，方便识别
        redisSetProcTitle("redis-rdb-bgsave");
        // 执行保存操作
        retval = rdbSave(filename);
        // 打印 copy-on-write 时使用的内存数
        if (retval == REDIS_OK) {
            size_t private_dirty = zmalloc_get_private_dirty()
            if (private_dirty) {
                redisLog(REDIS_NOTICE,
                    "RDB: %zu MB of memory used by copy-on-write",
                    private_dirty/(1024*1024));
            }
        }
        // 向父进程发送信号
        exitFromChild((retval == REDIS_OK) ? 0 : 1);
    } else {
        /* Parent */
        // 计算 fork() 执行的时间
        server.stat_fork_time = ustime()-start;
        // 如果 fork() 出错，那么报告错误
        if (childpid == -1) {
            server.lastbgsave_status = REDIS_ERR;
            redisLog(REDIS_WARNING,"Can't save in background: fork: %s",
                strerror(errno));
            return REDIS_ERR;
        }
        // 打印 BGSAVE 开始的日志
        redisLog(REDIS_NOTICE,"Background saving started by pid %d",childpid);
        // 记录数据库开始 BGSAVE 的时间
        server.rdb_save_time_start = time(NULL);
        // 记录负责执行 BGSAVE 的子进程 ID
        server.rdb_child_pid = childpid;
        // 关闭自动 rehash
        updateDictResizePolicy();
        return REDIS_OK;
    }
    return REDIS_OK; /* unreached */
}
```
值得一提的是，**s**，可以对Redis服务器进行配置，在redis.conf文件中有**默认配置**：
```cpp
save 900 1
save 300 10
save 60 10000
```
这表示只要满足上述三个条件任意一个，就执行BGSAVE。
例如save 900 1：900秒内对数据库进行了至少1次修改；
但其实用户还可以自定义保存条件，这主要由结构体redis.h/saveparam决定的：
```cpp
// 服务器的保存条件（BGSAVE 自动执行的条件）
struct saveparam {
    // 多少秒之内
    time_t seconds;
    // 发生多少次修改
    int changes;
};
```
上述两个因素，其实是根据redisSever两个属性计算得来的，dirty计数器及lastsave属性。

- dirty计数器记录距离上次保存之后，对数据库进行了多少次修改（写入删除更新等），每进行一次修改，dirty属性值就加1；
- lastsave属性是Unix时间戳，记录上次保存的时间；

一个完整的RDB文件包含的部分如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/45dc7f6aac0a9a2ae59b80d59f115374.png)

- REDIS是Redis RDB文件的标识；
- db_version是指RDB文件的版本号，这里的版本号是指Redis保存RDB文件的方式根据Redis版本可能是不同的；
- database包含0或任意个数据库的键值对数据；
- EOF长度1字节，标志正文结束；
- check_sum是8字节的校验和；

**关于RDB文件结构，这里只做简单的介绍，如果有需要了解的地方可翻阅黄健宏老师的《Redis设计与实现》，或是留言**。如果想分析RDB文件可以使用od -c或是od -x命令来打印RDB文件内容。
### AOF持久化
AOF是Append Only File的简称。RDB是保存服务器快照，而AOF方式则是保存服务器执行的**命令来“记录”服务器状态**。简单解释一下这两者的区别：
假设有一个version-1.0版本的数据库，依次执行了SET DEL SADD三个指令，那么：

- RDB方式会保存执行完三个指令之后的数据库状态，设为version1.1；
- AOF方式会**保存执行的三个指令！**如果数据库想恢复version1.1的状态，那么只需依次执行保存的三个指令即可。

AOF文件是纯文本格式，可以直接打开查阅，例如：
![image.png](https://oss1.aistar.cool/elog-offer-now/fec0e5126b83a0e0d094b82416d8f614.png)
**具体实现时，AOF主要分为三个步骤：命令追加、文件写入、文件同步**。
第一步，每当服务器执行完命令之后，就会将命令以AOF协议的格式写入redisServer的aof_buf缓冲区中。
何时保存该缓冲区内容到文件，即是第二步文件写入（写入AOF）及文件同步（保存AOF文件），这由服务器配置appendfsync来确定：
![image.png](https://oss1.aistar.cool/elog-offer-now/8bd51b3b1ab8c2924f0195cda0f2635d.png)
> 注：默认为everysec。
> 注：现代操作系统为了提高文件写入效率，当用户调用write函数时，操作系统将数据暂存至内存缓冲区，等待缓冲区满或是指定时限而不是立即写入文件。为了强制写入数据，提供了fsync及fdatasync函数接口。

上述**三种同步方式将直接决定AOF的效率和安全**：
·若是always：最安全，效率最慢；
·若是everysec：效率够快，丢失也仅1s的数据；
·若是no：效率最高，安全性较差；
AOF文件的载入过程可以由下图简单表现：
![image.png](https://oss1.aistar.cool/elog-offer-now/4b3aa4ccf33ed7b277a60aab8c2d07b7.png)
你可能会注意到：**随着服务器的运行，AOF文件中保存的内容将会越来越大，这很可能会造成影响**。
为了解决这个问题，Redis提供了AOF重写功能，一起来看看。
考虑这样一个情况，服务器执行了以下命令：
![image.png](https://oss1.aistar.cool/elog-offer-now/1e8f34d4613cc2b649252b797aad44b2.png)
AOF中写入了六条命令，但其实···只需要一条命令!
RPUSH list "c" "D" "E" "F" "G" 
AOF重写的实现原理即是：首先从数据库读取键现在的值，然后用一条命令去记录键值对，代替之前记录这个键值对的多条命令。其源码可以参阅aof.c/int rewriteAppendOnlyFile(char *filename)；
为了提供重写效率，Redis提供了后台重写的功能，但有个问题需要解决即重写过程中，服务器可能又进行了更新，此时Redis服务器工作流程如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/f8131d859d1db6342f25472c2b2e3c78.png)
即会将客户端的命令**追加到子进程重写缓冲区**。
顺带一提，Redis服务器更“青睐”AOF载入数据，如果服务器重启时开启了AOF载入，那么会首选AOF方式。
![image.png](https://oss1.aistar.cool/elog-offer-now/50ce01a514295ce941bdda1b431bae42.png)
## 事件
Redis服务器是一个事件驱动程序，需要处理两类事件：
·文件事件：客户端通过套接字与服务器连接的，**客户端命令就是一种文件事件**；
·时间事件：服务器的一些操作需要在给定时间点执行，如serverCron；
### 文件事件
**Redis基于Reactor模式**开发了自己的网络（抽象的网络）事件处理器，**称为文件事件处理器**：
·**基于IO多路复用监听多个套接字**，并根据套接字执行的任务来关联合适的事件处理器；
文件事件处理器由四部分构成：套接字、多路复用、分派器、处理器
![image.png](https://oss1.aistar.cool/elog-offer-now/13daf68ad6930e69c13ce6f57cc1fa60.png)
值得注意的是，**IO多路复用程序会将就绪套接字放进一个队列中，而后从队列头传递一个事件给分派器，只有当上一个套接字事件处理完毕之后，才继续传送下一个套接字**。
Redis的IO多路复用程序是通过包装常见的select、epoll、evport、kqueue这些函数库来实现的（参考源码：ae_select/epoll/kqueue/export.c）,并且都基于上述函数库实现了相同的API，所以Redis的IO复用程序的底层是可以互换的。
![image.png](https://oss1.aistar.cool/elog-offer-now/c946245daba642c62a53b307b4e2b31a.png)
在编译时会自动选择系统中**性能最高（是否支持更合理）**的函数库来作为其底层实现：
```cpp
// ae.c
// 选择当前系统最优的IO复用方式
// 根据性能降序排列 
#ifdef HAVE_EVPORT
#include "ae_evport.c"
#else
    #ifdef HAVE_EPOLL
    #include "ae_epoll.c"
    #else
        #ifdef HAVE_KQUEUE
        #include "ae_kqueue.c"
        #else
        #include "ae_select.c"
        #endif
    #endif
#endif
```
注：之所以如此排序是因为	Redis **会优先选择时间复杂度为O(1)**的 I/O 多路复用函数作为底层实现，**包括 Solaries 10 中的 evport**、**Linux 中的 epoll 和 macOS/FreeBSD 中的kqueue**，上述的这些函数都使用了内核内部的结构，并且能够服务几十万的文件描述符。
但是如果当前编译环境没有上述函数，select函数是作为 POSIX 标准中的系统调用，在不同版本的操作系统上都会实现，所以将其作为保底方案。
**事件类型**
ae.h中定义了IO多路复用程序所监听的两类事件，AE_READABLE和AE_WEUTABLE：
·READABLE事件，当套接字可读（客户端write或close或新的可应答套接字）时产生；
·WRITABLE事件，套接字可写时，如客户端执行read；
当一个套接字同时产生了两类事件，**即可读又可写，那么优先执行度再写**；（为什么呢？可能是为了防止读操作被覆盖）
### 时间事件
Redis中的时间事件主要分为两类，一是**定时事件**（返回AE_NOMORE），二是**周期性事件**（返回非AE_NOMORE整数值）。时间事件由三个属性构成：
·id：全局唯一ID，递增；
·when：unix时间戳，记录预设时间；
·timeProc：时间事件处理器，类似于回调函数，当时间事件到达时，就会调用相应的处理器进行处理；
Redis的时间事件是**基于一个无序（指when无序，而不是id无序）链表实现的**，**新来的放在表头**，当**时间事件执行器运行时，遍历整个链表**，找出已到达的时间事件，并调用相应的事件处理器（这跟poll、select一样，**效率很低？在3.0版本下，正常模式的Redis服务器仅有serverCron时间事件，benchmark模式下也只有两个，几乎不影响性能**）。
**事件的调度与执行**
Redis对时间和文件事件的调度策略如下图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/fcb39032bd97815497d29ef035fec0a6.png)
## 客户端
Redis服务器可以与多个客户端建立连接，每个客户端连接时，服务器都保存了相应状态，如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/35085885d2f64b79dc4760ed9d899fbf.png)
其中每个客户端都具有自己的属性。
### 基本属性
```cpp
typedef struct redisClient {
    // 套接字描述符
    int fd;
    // 当前正在使用的数据库
    redisDb *db;
    // 当前正在使用的数据库的 id （号码）
    int dictid;
    // 客户端的名字
    robj *name;             
    // 查询缓冲区
    sds querybuf;
    // 查询缓冲区长度峰值
    size_t querybuf_peak;   
    // 参数数量
    int argc;
    // 参数对象数组
    robj **argv;
    // 记录被客户端执行的命令
    struct redisCommand *cmd, *lastcmd;
    // 请求的类型：内联命令还是多条命令
    int reqtype;
    // 剩余未读取的命令内容数量
    int multibulklen;       
    // 命令内容的长度
    long bulklen;           
    // 回复链表
    list *reply;
    // 回复链表中对象的总大小
    unsigned long reply_bytes; 

    // 已发送字节，处理 short write 用
    int sentlen;                // 创建客户端的时间
    time_t ctime;           /* Client creation time */

    // 客户端最后一次和服务器互动的时间
    time_t lastinteraction; 

    // 客户端的输出缓冲区超过软性限制的时间
    time_t obuf_soft_limit_reached_time;

    // 客户端状态标志
    int flags;              /* REDIS_SLAVE | REDIS_MONITOR | REDIS_MULTI ... */

    // 当 server.requirepass 不为 NULL 时
    // 代表认证的状态
    // 0 代表未认证， 1 代表已认证
    int authenticated;      

    // 复制状态
    int replstate;          
    // 用于保存主服务器传来的 RDB 文件的文件描述符
    int repldbfd;           /* replication DB file descriptor */

    // 读取主服务器传来的 RDB 文件的偏移量
    off_t repldboff;        /* replication DB file offset */
    // 主服务器传来的 RDB 文件的大小
    off_t repldbsize;       /* replication DB file size */

    sds replpreamble;       /* replication DB preamble. */

    // 主服务器的复制偏移量
    long long reploff;      /* replication offset if this is our master */
    // 从服务器最后一次发送 REPLCONF ACK 时的偏移量
    long long repl_ack_off; /* replication ack offset, if this is a slave */
    // 从服务器最后一次发送 REPLCONF ACK 的时间
    long long repl_ack_time;/* replication ack time, if this is a slave */
    // 主服务器的 master run ID
    // 保存在客户端，用于执行部分重同步
    char replrunid[REDIS_RUN_ID_SIZE+1]; /* master run id if this is a master */
    // 从服务器的监听端口号
    int slave_listening_port; /* As configured with: SLAVECONF listening-port */

    // 事务状态
    multiState mstate;      /* MULTI/EXEC state */
    // 阻塞类型
    int btype;              /* Type of blocking op if REDIS_BLOCKED. */
    // 阻塞状态
    blockingState bpop;     /* blocking state */
    // 最后被写入的全局复制偏移量
    long long woff;         /* Last write global replication offset. */
    // 被监视的键
    list *watched_keys;     /* Keys WATCHED for MULTI/EXEC CAS */
    // 这个字典记录了客户端所有订阅的频道
    // 键为频道名字，值为 NULL
    // 也即是，一个频道的集合
    dict *pubsub_channels;  /* channels a client is interested in (SUBSCRIBE) */
    // 链表，包含多个 pubsubPattern 结构
    // 记录了所有订阅频道的客户端的信息
    // 新 pubsubPattern 结构总是被添加到表尾
    list *pubsub_patterns;  /* patterns a client is interested in (SUBSCRIBE) */
    sds peerid;             /* Cached peer ID. */

    // 回复偏移量
    int bufpos;
    // 回复缓冲区
    char buf[REDIS_REPLY_CHUNK_BYTES];
} redisClient;
```
主要围绕**其中几个重要属性（从上至下）**进行分析：
·套接字描述符fd：取值为-1（伪客户端，处理的命令请求来自AOF文件或者LUA脚本）或大于-1（普通客户端）；
client list 可以列出当前服务器的客户端及其所使用的描述符等；
·name：默认为空，可以通过client setname命令设置；
·flags标志：记录客户端的角色及其状态，即可以是单个标志，也可以是多个标志的或：
![image.png](https://oss1.aistar.cool/elog-offer-now/0aa208db490ddc2a41cbbb1dcffd314b.png)
每一个标志都是一个常量，查看redis.h：
```cpp
* Client flags */
#define REDIS_SLAVE (1<<0)   /* This client is a slave server */
#define REDIS_MASTER (1<<1)  /* This client is a master server */
#define REDIS_MONITOR (1<<2) /* This client is a slave monitor, see MONITOR */
#define REDIS_MULTI (1<<3)   /* This client is in a MULTI context */
#define REDIS_BLOCKED (1<<4) /* The client is waiting in a blocking operation */
#define REDIS_DIRTY_CAS (1<<5) /* Watched keys modified. EXEC will fail. */
#define REDIS_CLOSE_AFTER_REPLY (1<<6) /* Close after writing entire reply. */
#define REDIS_UNBLOCKED (1<<7) /* This client was unblocked and is stored in
                                  server.unblocked_clients */
#define REDIS_LUA_CLIENT (1<<8) /* This is a non connected client used by Lua */
#define REDIS_ASKING (1<<9)     /* Client issued the ASKING command */
#define REDIS_CLOSE_ASAP (1<<10)/* Close this client ASAP */
#define REDIS_UNIX_SOCKET (1<<11) /* Client connected via Unix domain socket */
#define REDIS_DIRTY_EXEC (1<<12)  /* EXEC will fail for errors while queueing */
#define REDIS_MASTER_FORCE_REPLY (1<<13)  /* Queue replies even if is master */
#define REDIS_FORCE_AOF (1<<14)   /* Force AOF propagation of current cmd. */
#define REDIS_FORCE_REPL (1<<15)  /* Force replication of current cmd. */
#define REDIS_PRE_PSYNC (1<<16)   /* Instance don't understand PSYNC. */
#define REDIS_READONLY (1<<17)    /* Cluster client is in read-only state. */
```
·argv、argc命令与命令参数：即是客户端发送给服务器的命令，实例如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/10ca95bb14cdbb81f0d1b6ed20d17932.png)
那么服务器在接收命令之后，如何查找命令的实现函数呢？
·cmd命令实现函数：这个步骤是通过一个Dict结构的命令表实现的：
![image.png](https://oss1.aistar.cool/elog-offer-now/d4634b4ab3d5981ca839d51573bf1b83.png)
当在命令表中找到argv[0]所对应的command结构时，cmd就会指向该结构。而后服务器就可以使用cmd以及argv、argc保存的属性来执行相应的函数。
·**输出缓冲区**，有两个缓冲区，**一个大小固定，一个大小可变**
大小固定保存长度较小的回复，如ok、简单字符串值、整数值等等，主要由以下两个参数组成：
![image.png](https://oss1.aistar.cool/elog-offer-now/c711582c588d4431c67bda5c60ee789f.png)
可变大小的缓冲区保存如非常大（如果固定大小不够用了，或者放不下，就会使用它）的字符串、列表、集合等，其结构是一个链表List* reply：
![image.png](https://oss1.aistar.cool/elog-offer-now/2fa4762ad2037b9568838b65fb734329.png)
·**身份验证authenticated**：表示客户端是否通过了身份验证，0表示未验证，1表示验证。
当为0时，客户端的请求命令除了AUTH之外都会被拒绝。
### 创建与关闭
服务器启动会创建负责执行Lua脚本的伪客户端（服务器生命周期内一直存在）、执行AOF中redis命令的伪客户端（载入完毕之后关闭）。
除此之外，当使用网络连接到服务器时，会创建普通客户端，普通客户端可能由于发送不合协议格式的命令而被关闭。
## 服务器
### 命令请求执行过程
若客户端执行以下命令：set key value，那么从输入该命令到客户端回复ok，需要进行以下操作：
![image.png](https://oss1.aistar.cool/elog-offer-now/812040a3719a1cf7fc88b3e8407e0c58.png)
接下来分别介绍这四个部分：
·**发送命令请求**
首先客户端会将命令请求转换成协议格式，然后通过套接字将该请求数据发送给服务器：
![image.png](https://oss1.aistar.cool/elog-offer-now/4e8a27f2215b8d7ec5663ffd336ca861.png)
·**读取命令请求**
当服务器获取到某客户端的套接字可读时，它就会调用命令请求处理其器来执行以下操作：
![image.png](https://oss1.aistar.cool/elog-offer-now/7954843f523dbb2691d15ae5d248d92c.png)
·**命令执行器**
分为四个部分：**查找命令实现**（从命令表中查找所指定的命令结构）、**执行预备操作**（检查命令是否找到、参数是否合法、客户端是否已验证、是否正在执行事务等等，简而言之，就是看现在是不是执行该命令的时机）、**调用命令的实现函数**、**执行后续操作**（日志、更新calls属性、广播给其他服务器等等）
命令表Dict中存储的是Redis命令的结构，如下：
```cpp
/*
 * Redis 命令
 */
struct redisCommand {
    // 命令名字
    char *name;
    // 实现函数
    redisCommandProc *proc;
    // 参数个数
    int arity;
    // 字符串表示的 FLAG
    char *sflags; /* Flags as string representation, one char per flag. */
    // 实际 FLAG
    int flags;    /* The actual flags, obtained from the 'sflags' field. */
    /* Use a function to determine keys arguments in a command line.
     * Used for Redis Cluster redirect. */
    // 从命令中判断命令的键参数。在 Redis 集群转向时使用。
    redisGetKeysProc *getkeys_proc;
    /* What keys should be loaded in background when calling this command? */
    // 指定哪些参数是 key
    int firstkey; /* The first argument that's a key (0 = no keys) */
    int lastkey;  /* The last argument that's a key */
    int keystep;  /* The step between first and last key */
    // 统计信息
    // microseconds 记录了命令执行耗费的总毫微秒数
    // calls 是命令被执行的总次数
    long long microseconds, calls;
};
```
> 注：redis命令不区分大小写；

·命令回复发送给客户端：命令实现函数会将命令回复保存到客户端的输出缓冲区里面，并为客户端的套接字关联命令回复处理器，**当客户端套接字变为可写状态时，服务器就会执行命令回复处理器**,将保存在客户端**输出缓冲区中的命令回复发送给客户端**。
当命令回复发送完毕之后，**回复处理器会清空客户端状态的输出缓冲区为处理下一个命令做准备**。
·客户端接收并打印：如下
![image.png](https://oss1.aistar.cool/elog-offer-now/31acec4c8060e9895834e810bb174eca.png)
### serverCron函数
源码地址redis.c/serverCron，1300+行左右位置。
该函数**默认100毫秒（可配置）**执行一次，**负责管理服务器资源**，**并保持服务器自身的良好运转**。
建议结合源码及下图理解其功能：
![image.png](https://oss1.aistar.cool/elog-offer-now/b474ca307276fd13d5f88391860b0e99.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/0fa306e56acaddb06bfe918b2c8f8c62.png)
# 五、多机数据库
这个部分主要介绍跟多级数据库有关的复制、集群、sentinel。
## 复制功能
> 源码参见：replication.c

在Redis中可以使用SLAVEOF或者设置slaveof选项，使得一个服务器去复制另一个服务器。**这种情形就是我们熟知的主从结构，一般用作读写分离，主服务器是负责读/写，从服务器负责读见下图**。
![image.png](https://oss1.aistar.cool/elog-offer-now/52380f8b5113bca3ccf7f2d4870e05a6.png)
### 新旧版本的复制对比
在Redis2.8版本之后的复制功能效率更高，安全系数更好，新旧版本复制功能对比如下（请点击或下载查看大图）：
![image.png](https://oss1.aistar.cool/elog-offer-now/99cd622cff36c1df78ecc8bc84c9d5ac.png)
其中，旧版本的同步操作如下图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/7fad559596ec9c26eb9d8351ef075f68.png)
注：在主服务器进行BGSAVE和发送RDB文件的时候，会将所有写命令写入发送缓冲区，在传输完毕之后将所有写命令发送给从服务器。
一个展示命令传播的示例如下图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/2ed06e493836e7c30d72bcd35a6f9e6b.png)
新版复制功能的部分同步如下图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/cec9ce247723ba614b12ae9a34699b75.png)
新版复制功能调用流程图如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/8c0298970cbea8395d3d80c0449597bd.png)
进一步解释新版复制功能实现部分重同步的原理：
·服务器ID：当从服务器对某一服务器进行了同步操作时，该ID被设置为主服务器的ID。这是为了在从服务器断线重连主服务器时，判断上次所连接的是否是原来的服务器！
·复制偏移量：类似于TCP的SEQ，主从服务器都维护了一个复制偏移量offset：当主服务器给从服务器发送**N个字节（而不是命令）**时，该offset+N；当从服务器接收N个字节时，该Offset+N；**这是实现部分同步的关键：让主服务器知道从服务器还差哪些命令没有获取**！
·复制积压缓冲区：是主服务器端的一个固定长度（可调整，默认1M）的先进先出队列。这也是部分同步的关键：在该队列中，维护了复制偏移量offset与每一条写命令的对应关系，见下图。
![image.png](https://oss1.aistar.cool/elog-offer-now/e1ac1cac5d3f926e1dc81a389e389e15.png)
如果从服务器需要的复制命令在该队列中，那么执行部分重同步即可；如果不在···那就只能完全重同步了！
### 复制的全过程
·设置主服务器的地址端口
·建立套接字连接
·发送PING命令（检查主服务器状态）
![image.png](https://oss1.aistar.cool/elog-offer-now/4d11dddb7eb9cd580d395f57742e1c21.png)
·进行身份验证（若设置了masterauth）
![image.png](https://oss1.aistar.cool/elog-offer-now/eafc79393b1deeb46c815c930b349272.png)
·发送端口信息，即从服务器将自身端口发送给主服务器（主要是为了打印信息）
·同步操作（在这个时候两者互为客户端，才可以进行写命令的传输）
![image.png](https://oss1.aistar.cool/elog-offer-now/5f632dd9e66c8da67443e8e341c15e09.png)
·命令传播
在该阶段，从服务器会默认1s的时间给主服务器发送命令 REPLCONF ACK <offset> ，这是一种心跳检测，主要是为了检查网络连接或是否有命令丢失。
## **哨兵Sentinel**
源码参见：sentinel.c
### **介绍**
sentinal，哨兵是Redis多机架构中**高可用性**非常重要的一个组件，主要功能如下：
（1）**集群监控**，负责监控redis master和slave进程是否正常工作（心跳检测）；
（2）**消息通知**，如果某个redis实例有故障，那么哨兵负责发送消息作为报警通知给管理员；
（3）**故障转移**，**如果master node挂掉了，会自动转移到slave node上；**
（4）**配置中心**，如果故障转移发生了，通知client客户端新的master地址；
哨兵本身也是分布式的，作为一个哨兵集群去运行，互相协同工作
（1）故障转移时，判断一个master node是宕机了，需要**大部分（超过一半）**的哨兵都同意才行，涉及到了分布式选举的问题；
（2）即使部分哨兵节点挂掉了，哨兵集群还是能正常工作的，因为如果一个**作为高可用机制重要组成部分的故障转移系统本身是单点的**，那就很不稳定了；
下面几幅图展示sentinel系统是如何实现监视Redis服务器的：
初始状态如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/4aa544df05e8bbdc6640b88925c19e8c.png)
主服务器下线：
![image.png](https://oss1.aistar.cool/elog-offer-now/570459dd0f052361fdfdd706b7025667.png)
执行**故障转移**：
![image.png](https://oss1.aistar.cool/elog-offer-now/4798d655a0e644974ea09744a28c0ad6.png)
原主服务器上线并降级
![image.png](https://oss1.aistar.cool/elog-offer-now/cb4100746280a05a12522c165972a2c4.png)
### **初始化Sentinel**
主要有以下四个步骤：
·初始化服务器：sentinel本身就是一个**运行在特殊模式下的Redis服务器**！
sentinel和普通Redis服务器的区别如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/6de8b3cec4fad1488a7f5937d8f8432d.png)
·使用sentinel专用代码：将不会使用普通服务器的一些代码；
·初始化sentinel状态，包括监视的主服务器IPport等（读取配置文件）；
·创建与监视服务器的网络连接：一个是命令连接，负责跟主服务器进行命令交互；二是订阅连接，获取服务器的_sentinel_:hello频道（心跳检测？）；
### **获取主从服务器信息**
在建立连接之后，sentinel会默认10s通过INFO命令获取主/从服务器的返回消息。
注：**sentinel一开始连接的是主服务器，当发现其有新的从服务器时，就会创建它的实例（flags为SRI_MASTER）并建立连接并订阅。**
·获取主服务器信息：
一方面是关于主服务器本身的信息，包括run_id域记录的**服务器运行ID**，以及**role域记录的服务器角色（主/从）**;
另一方面是关于主服务器属下所有从服务器的信息，每个从服务器都由一个"slave"字符串开头的行记录，每行的ip=域记录了从服务器的IP地址，而port=域则记录了从服务器的端口号。**根据这些IP地址和端口号，Sentinel无须用户提供从服务器的地址信息，就可以自动发现从服务器**。
sentinel会通过这些信息更新主服务器的实例结构。
·从服务器信息：
从服务器的运行ID run_id。
从服务器的角色role。
主服务器的IP地址master_host，以及主服务器的端口号master_port。主从服务器的连接状态master_link_status。
从服务器的**优先级s1ave_priority（跟后续选举有关）**。
从服务器的复制偏移量slave repl offset.
sentinel会通过这些信息更新主服务器的实例结构。
### **跟主从服务器交互**
sentinel会默认两秒一次通过命令连接向监视的主从服务器发送命令：
PUBLTSHsentinel__:hello"<s_ip>,<s_port>,<s_runid>,<s_epoch>,<m_name>,<m_ip>,<m port>,<m epoch>"
这些命令主要是为了保持两者的连接，并确定信息的正确。
除此之外，sentinel还会通过订阅的sentine_:hello频道向连接的服务器发送信息。
![image.png](https://oss1.aistar.cool/elog-offer-now/85bf75c83cfbda06697ca8ff749824b5.png)
并且这个频道信息是所有sentinel共享的，其他的sentinel会据此来更新自己的实例信息。
![image.png](https://oss1.aistar.cool/elog-offer-now/6747ff4f8ffa343022a9355b8acc032d.png)
### **检查下线**
分为检测主观/客观下线状态。
·主观下线：默认每秒一次向所有实例发送PING，根据服务器返回的回复/或者断线时长来判断是否掉线。
注：多个sentinel的down-after-milliseconds可能不同，只有设置最长间隔的sentinel判断为下线，那才是真正的下线。
·客观下线：这正是上一点提到的：不同的sentinel的设置时长或是判断不一致，**因此当某一个sentinel认为某一个服务器下线以后（主观下线）**，他会不停地询问“该服务器是否已下线”，**当接收到足够数量（可配置）的下线判断后，才会将服务器认为真正的客观下线，并对从服务器执行客观转移**。
注：客观下线是在主观下线的基础上进行的。
### **故障转移**
故障转移主要分为两个步骤：
·选举领头sentinel，当主服务器被判断为客观下线之后，监视这个下线服务器的各个sentinel会进行**协商（广播给其他sentinel）**，选举一个领头sentinel，由它来进行故障转移，这个过程主要有以下**规则**：
（仔细领会）**一个配置纪元内最多只能有一个领头sentine**l、每个sentinel都有资格、每次进行选举不管结果如何配置纪元（configuration epoch）加一（没有啥用）、同一个配置纪元内所有sentinel都**有且仅有**一次将**某sentinel设为局部领头的机会、**发现主服务器客观下线的sentinel都会要求同伴将它设为局部领头、**要求设为局部领头是先到先得、被大于一半**的的sentinel设为局部领头那就是全局领头、给定时限内没选出来那就重来一次。
·故障转移：选出领头的sentienl之后，由领头的进行故障转移，主要包括三个步骤，见下图：
![image.png](https://oss1.aistar.cool/elog-offer-now/c380a9283265a55a6b527f13a497e3b7.png)
## **集群**
源码参加cluster.c。
集群其实就是运行多个Redis实例，跟分布式不同的是，**集群相当于增加硬件资源来使得整个系统性能更好（利用负载均衡）**，而分布式则是各个部分之间分门别类，各司其职，IPC通信。
Redis启动时都是一个个单机，当使用CLUSTER MEET命令之后，对应的Redis实例就会握手，从而成为一个集群。
![image.png](https://oss1.aistar.cool/elog-offer-now/c5ab1abd1320032792e5735ea47feb11.png)
### **指派哈希槽**
Redis集群的数据分配是以一种叫做hash槽的方式分派的，具有极大的灵活性，可以自由配置。Redis集群通过**分片的方式**来保存数据库中的键值对:**集群的整个数据库被分为16384个槽( slot )**，数据库中的每个键都属于这16384个槽的其中一个，集群中的每个节点可以处理0个或最多16384个槽。
当16384个槽都被分配出去的时候，整个集群才是上线状态，否则处于下线（fail）状态。
可以通过CLUSTER ADDSLOTS来进行槽的分配。
每个cluster的槽信息是由clusternode中的slots信息来记录，其实就是一个数组：
![image.png](https://oss1.aistar.cool/elog-offer-now/46aacdff7fae184613fe6c148d6f5dd8.png)
集群中的每个节点都会将自己的**slots数组通过消息发送给集群中的其他节点**，并且每个接收到slots数组的节点都会将数组保存到相应节点的clusterNode结构里面，**因此，集群中的每个节点都会知道数据库中的16384个槽分别被指派给了集群中的哪些节点**。
注：每个集群节点会在clusterstate结构中的slots数组（这里是cluster *slots[]，之前节点自身是unsigned char slots[]）中记录16384槽的指派信息（这样就不用去遍历了，而是直达对应的节点）,如果为NULL说明未指派，若不为NULL，其中存储了对应的IPport等信息。
![image.png](https://oss1.aistar.cool/elog-offer-now/7498cfacf587b5a5426caba88d20001a.png)
### **集群中如何执行命令**
客户端执行命令的关键是计算当前命令应该对应哪个集群节点，见下：
![image.png](https://oss1.aistar.cool/elog-offer-now/135ef021afeef395157e0a68d5cadd0f.png)
·计算键处于哪个槽：
def slot__number (key):     return CRC1 6 (key)&16383 
·判断该槽在哪个节点
通过clusterstate.slots数组来判断是否是当前节点自身，不是则指明客户端重定向MOVDE错误。
![image.png](https://oss1.aistar.cool/elog-offer-now/abc4ffb040e537cfbe65397bc6fb953b.png)![image.png](https://oss1.aistar.cool/elog-offer-now/49bf1771017cf2b0ec570105558a7f28.png)
注：集群模式下不会打印出MOVED错误，单机Redis才会，因为它不懂。
注：集群模式下只能使用**0号数据库**。
### **重新分片**
Redis集群可以在线重分片，这是由其集群管理软件redis-trib负责执行的，重分配过程见下：
![image.png](https://oss1.aistar.cool/elog-offer-now/00056bde23098335397744dbc9eec174.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/ac8d1d75789f16eadea76eb63870ff4c.png)
注：在重新分片期间，有这样一种情形：被迁移槽的一部分键值对在源节点，而另一部分在目标节点中，那么这时如果客户端执行一个命令，该如何处理呢？
![image.png](https://oss1.aistar.cool/elog-offer-now/01bfcccb172e93700700a18d40746da0.png)
注：**ASK错误跟MOVED命令一样**，集群自动操作并隐藏。两者的区别：
1）MOVED错误代表槽的负责权已经从一个节点转移到了另一个节点:在客户端收到关于槽i的MOVED错误之后，**客户端每次遇到关于槽i的命令请求时，都可以直接将命令请求发送至MOVED错误所指向的节点**，因为该节点就是目前负责槽i的节点。
2）与此相反，ASK错误只是两个节点在迁移槽的过程中使用的一种临时措施:在客户端收到关于槽i的ASK错误之后，客户端只会在接下来的一次命令请求中将关丁槽i的命令请求发送至ASK错误所指示的节点，但这种转向不会对客户端今后发送关于槽i的命令请求产生任何影响，**客户端仍然会将关于槽i的命令请求发送至目前负责处理槽i的节点，除非ASK错误再次出现**。
### **故障转移**
集群中的节点分为主节点和从节点，主节点处理槽，从节点复制主节点并在主节点宕机下线后替代该主节点。如以下的这个集群，7004和7005是两个从节点，复制节点7000的数据状态。
![image.png](https://oss1.aistar.cool/elog-offer-now/1f70811d7d612fb9d1970159c5249734.png)
若节点7000因错误下线，这时尚在运行的主节点7001、7002、7003就会从7004、7005中选出一个从节点来作为主节点。就算节点7000重新上线，也是作为新主节点的从节点。
集群中的每个节点都会定期地向集群中的**其他节点发送PING消息，**以此来检测对方是否在线，如果接收PING消息的节点没有在规定的时间内，**向发送PING消息的节点返回PONG消息**，那么发送PING消息的节点就会将接收PING消息的节点标记为疑似下线( probable fail，PFAIL)。
当超过一半的节点都认为某节点疑似下线时，将某节点标记为已下线并向全集群广播。而后开始执行故障转移，主要有以下几个步骤。
1）从下线主节点的所有从节点里面选一个。
2）被选中的从节点会执行SLAVEOF no one命令，成为新的主节点。
3）新的主节点会**撤销**所有对已下线主节点的槽指派，并将这些槽全部指派给自己。
4）**新的主节点向集群广播一条PONG消息**，这条PONG消息可以让集群中的其他节点立即知道这个节点已经由从节点变成了主节点，并且这个主节点已经接管了原本由已下线节点负责处理的槽。
5）新的主节点开始接收和自己负责处理的槽有关的命令请求，故障转移完成。
从节点的选举是这样的，当从节点接收到自己的主节点FAIL的消息时，它就会向集群广播消息，每一个主节点都可以对其进行投票。在每一个配置纪元中，当某一个从节点的支持者大于N/2时，它即被选中成为新的主节点，进行后续的操作。
以上的选举过程跟哨兵sentinel的选举很相似，都是基于Raft算法的领头选举方法。
有关Redis，我还没有将其完全的串联起来，尤其是从上而下的调用体系。
# **六.应用场景**
前面的内容主要关注于Redis的底层数据结构及运行逻辑，接下来的这个部分是笔者从网上收集、整理的Redis应用资料。
## **Redis语法**
**建议直接参考以下链接**：
[https://www.runoob.com/redis/redis-commands.html](https://www.runoob.com/redis/redis-commands.html)

## **业务场景**
[https://segmentfault.com/a/1190000016188385](https://segmentfault.com/a/1190000016188385)
[https://www.pdai.tech/md/db/nosql-redis/db-redis-x-cache.html](https://www.pdai.tech/md/db/nosql-redis/db-redis-x-cache.html)
# Redis6.0如何？
[https://www.cnblogs.com/leijisong/p/14957013.html](https://www.cnblogs.com/leijisong/p/14957013.html)
Redis不是已经采用了多路复用技术吗？不是号称很高的性能了吗？为啥还要采用多线程模型呢？
Redis6.0中的多线程，**也只是针对网络请求过程采用了多线程，而数据的读写命令仍然是单线程处理的**。
为什么呢？不是多路复用技术已经大大提高IO利用率了吗？
主要对Redis有着更高的要求。根据测算，Redis 将所有数据放在内存中，内存的响应时长大约为 100 纳秒，对于小数据包，Redis 服务器可以处理 80,000 到 100,000 QPS，这么高的对于 80% 的公司来说，单线程的 Redis 已经足够使用了。
但随着越来越复杂的业务场景，有些公司动不动就上亿的交易量，因此需要更大的 QPS。为了提升QPS，**很多公司的做法是部署Redis集群**，并且尽可能提升Redis机器数。但是这种做法的资源消耗是巨大的。
而经过分析，限制Redis的性能的主要瓶颈出现在网络IO的处理上，虽然之前采用了多路复用技术。但是我们前面也提到过，**多路复用的IO模型本质上仍然是同步阻塞型IO模型**。下面是多路复用IO中select函数的处理过程：
![image.png](https://oss1.aistar.cool/elog-offer-now/89718cdf1b719810f40e4c7a95c68846.png)
**那么，在引入多线程之后，如何解决并发带来的线程安全问题呢？**
这就是为什么我们前面多次提到的"Redis 6.0的多线程只用来处理网络请求，而数据的读写还是单线程"的原因。
Redis 6.0 只有在网络请求的接收和解析，以及请求后的数据通过网络返回给时，使用了多线程。而数据读写操作还是由单线程来完成的，所以，这样就不会出现并发问题了。

