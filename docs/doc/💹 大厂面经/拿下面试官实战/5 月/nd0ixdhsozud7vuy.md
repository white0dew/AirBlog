---
title: 5.14 南开毕业：金三银四结束了，听说还有铜五铁六。。。
urlname: nd0ixdhsozud7vuy
date: '2024-06-13 21:14:37'
updated: '2024-06-13 21:14:45'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1715778941545-c31980d3-0ba9-4d5a-918b-91eb1f278326.png'
description: 大家好，我是白露，全栈开发。大家经常都说春招是金三银四。说明在三月之前找到工作的难度最低，找的公司也最好；四月次之。毕竟好的公司，面试的人数往往远大于在实际招聘人数，因此招聘的时候都是时间越靠前，获得 offer 的难度更低。今天在论坛看到一个南开大学的同学发的帖子，分享给大家：看到这样的帖子...
---
大家好，我是白露，全栈开发。

大家经常都说春招是**金三银四**。

说明在三月之前找到工作的难度最低，找的公司也最好；四月次之。

毕竟好的公司，面试的人数往往远大于在实际招聘人数，因此招聘的时候都是时间越靠前，获得 offer 的难度更低。

今天在论坛看到一个南开大学的同学发的帖子，分享给大家：
![image.png](https://oss1.aistar.cool/elog-offer-now/034d8b9981c9229512abd375b7504e84.png)

看到这样的帖子，我心里有一点同情，结果下面有一堆同学在“高兴”、“放心”。。。
![image.png](https://oss1.aistar.cool/elog-offer-now/c04a496e00a23548b1e0fc9aada0f188.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/bf285a48ae1fead6d8c63e67ea64f668.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/6ddabf04c2a467d702c4aa62e386ba50.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/6b0084efd0843baac59d0308163de331.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/a86b07d207c7b2861c46cb314ce6dc6d.png)
可以看到，不管是南开、西安电子、中科大。。。等985/211学校，目前还没很多同学没有找到满意的工作。

注意，我这样说，并不是要让**目前还没有找到工作的同学松懈下来**。

白露其实是希望大家，能够明白，当前的就业形势很严峻，一些学校北京比较优秀的学生也会遇到找工作难的问题。
另外，我和朋友做了一个GPT镜像网站，**支持GPT4o等所有官网的功能**，**无需担心网络问题**，只需要99元/月，**前50名可以返现10元**，有兴趣的朋友直接加我微信**whitedewstory**  即可。
**
 **
因此，在这个环境下，大家更要**坚持学习、寻找适合自己的工作，**持之以恒！
# 开始面试
**面试官**: 非常感谢你今天来参加面试。首先，请你介绍一下你最近参与的一个项目和你在项目中扮演的角色。

**求职者**: （自我介绍和项目一定要熟读背诵）

**面试官**: 好的，非常感谢你的分享。现在我们来聊一些技术问题。首先，请你谈谈你对Java集合的理解。

**求职者**: Java集合主要分为两大类：Collection和Map。

Collection接口有List、Set和Queue等子接口，分别支持元素的列表、集合和队列等数据结构。

Map接口实现键值对的映射，最常用的实现类是HashMap。

**面试官**: 了解。那你能解释一下ConcurrentHashMap和HashMap的区别吗？

**求职者**: 当然，我会更详细地解释一下ConcurrentHashMap。 

ConcurrentHashMap是Java中的一个类，它是HashMap的线程安全版本。
我们知道，HashMap不是线程安全的，也就是说如果多个线程同时修改HashMap，可能会导致数据的不一致。

因此，在并发环境下，我们需要一个线程安全的版本，这就是ConcurrentHashMap。 
ConcurrentHashMap的主要特点是它允许多个线程并发地读写数据，而不需要外部同步。

它通过一种叫做"分段锁"的机制实现这一点。

在ConcurrentHashMap中，数据被分成一段段的，每一段数据都有一个锁来保护，这就是"分段锁"。当一个线程要修改一段数据时，它只需要获得这段数据对应的锁，而不是锁住整个HashMap。

其他线程可以同时访问和修改HashMap中的其他段，这样就大大提高了并发性能。 

从Java 8开始，ConcurrentHashMap的实现进行了一些优化。

以前，每个段都是一个单独的HashMap，现在，每个段变成了一个Node数组，每个Node包含了一个key-value对。

这样，ConcurrentHashMap内部就变成了一个Node数组的数组，也就是一个二维数组。 而且，Java 8的ConcurrentHashMap还引入了红黑树。当一个段中的Node数量超过一定阈值时，这个段会从链表转变为红黑树，这样可以提高搜索效率。 

此外，ConcurrentHashMap还有一个重要的特性，就是无锁的读取。也就是说，在读取数据时，ConcurrentHashMap不需要加锁，因为它的内部结构保证了内存可见性。

**面试官**: 很好。接下来，谈谈Java内存区域的划分，以及Java递归参数存放的位置。

**求职者**: Java内存区域主要分为堆内存、栈内存、方法区、程序计数器和本地方法栈。

Java递归参数存放在栈内存中，每次递归调用时都会创建一个新的栈帧。

**面试官**: 非常详细。那么你对Java垃圾收集算法有了解吗？

**求职者**: 是的，常见的垃圾收集算法有标记-清除、标记-整理和复制算法。

CMS和G1都是针对老年代的收集器。CMS的目标是获取最短回收停顿时间，而G1则是为了提供一个更平衡的吞吐量和停顿时间。

**面试官**: 接下来，谈谈你对Redis持久化和单线程模型的理解。

**求职者**: Redis支持两种持久化方式：RDB和AOF。

RDB是定时对内存中数据进行快照存储，AOF则记录每个写操作，重启时通过回放AOF文件恢复数据。Redis的单线程模型利用非阻塞I/O，通过事件循环处理所有请求，实现高性能。

**面试官**: 对于数据库和缓存的一致性问题，你是如何看待的？

**求职者**: 数据库和缓存的一致性是指当数据库数据更新后，缓存中的数据也同步更新。

实现一致性的方法包括缓存失效策略、读写穿透等。

**面试官**: 你对索引下推的理解是？

**求职者**: 索引下推是MySQL在5.6版本后引入的优化，可以在索引遍历过程中过滤掉不满足条件的记录，减少访问表数据的次数，提高查询效率。

**面试官**: 请编写一个函数，使用两个字符串表示的double类型值相乘，并返回结果的字符串表示。

**求职者**: 好的，这里是我的实现：
```python
public class MultiplyStrings {
    public static String multiply(String num1, String num2) {
        // 移除小数点并记录小数位数
        int pointPos1 = num1.length() - 1 - num1.indexOf('.');
        int pointPos2 = num2.length() - 1 - num2.indexOf('.');
        int totalPointPos = pointPos1 + pointPos2;
        
        // 去除小数点，将数字转为整数字符串
        String n1 = num1.replace(".", "");
        String n2 = num2.replace(".", "");

        // 初始化结果数组
        int[] result = new int[n1.length() + n2.length()];

        // 乘法过程
        for (int i = n1.length() - 1; i >= 0; i--) {
            for (int j = n2.length() - 1; j >= 0; j--) {
                int mul = (n1.charAt(i) - '0') * (n2.charAt(j) - '0');
                int sum = mul + result[i + j + 1];

                result[i + j] += sum / 10;
                result[i + j + 1] = sum % 10;
            }
        }

        // 转换结果为字符串
        StringBuilder sb = new StringBuilder();
        for (int p : result) {
            if (!(sb.length() == 0 && p == 0)) { // 忽略前导0
                sb.append(p);
            }
        }
        
        // 插入小数点
        sb.insert(sb.length() - totalPointPos, '.');

        // 处理可能出现的前导0和小数点后无数字的情况
        if (sb.charAt(0) == '.') sb.insert(0, '0');
        if (sb.length() - 1 == sb.indexOf(".")) sb.append('0');

        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println(multiply("123.45", "67.89"));  // 示例输入
    }
}
```

**面试官**: 非常好感谢你的参与和分享。我们会尽快给你反馈结果。祝你好运！


