---
title: ㊙️ 自用算法小册
urlname: ccershuyglgpxsdp
date: '2024-05-28 16:51:58'
updated: '2024-05-28 16:52:23'
cover: 'https://cdn.nlark.com/yuque/0/2021/png/22382235/1633655486985-57fe5ede-3f3c-4901-aef1-a3b8fdeec83f.png'
description: 似乎以前都只注重于把这道题解出来，而没有在意做题时的“心路历程”，也没有归类总结，更没有去回顾····这样的刷题，如同空中楼阁一样，轻飘飘的，长远来看没有任何益处。因此在平时练习题的时候，最重要的先写清楚思路，再进行代码的编写。排序算法注：外部排序其实大数据量下的排序，也是基于内部排序进行的。...
---
> 似乎以前都只注重于把这道题解出来，**而没有在意做题时的“心路历程”，也没有归类总结**，更没有去回顾····
> 这样的刷题，如同空中楼阁一样，轻飘飘的，长远来看没有任何益处。
> 因此在平时练习题的时候，**最重要的先写清楚思路，再进行代码的编写**。

# 排序算法
# ![image.png](https://oss1.aistar.cool/elog-offer-now/7fbc64131dc7e19bfb3aeb9a82108b87.png)
> 注：外部排序其实大数据量下的排序，也是基于内部排序进行的。
> 注：下面是各类排序的一个简单实现，以**升序排列**为例，原址为[链接](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/ge-chong-pai-xu-suan-fa-tu-xie-zong-jie-by-ke-ai-x/)。

## 冒泡排序
每一趟通过交换，将遍历到的**最大值**传递到末尾，每一趟完成之后修改末尾下标。
```cpp
//冒泡排序
void maoPaoSort(int array[]){
    for (int i = 0; i < N-1; i++){
        //逐渐收缩比较的范围，将大的往上退
        for (int j = 0; j < N-1-i; j++){
            if (array[j] > array[j+1]){
                int temp = array[j+1];
                array[j+1] = array[j];
                array[j] = temp;
            }
        }
        printf("this is %d:", i + 1);
        printArray(array);
    }
}
```
## 选择排序
每一趟从当前选择值中选择一个最小值，将最小值与前面第N个（已排序）数字互换。
```cpp
void choiceSort(int array[]){
    for (int i = 0; i < N; i++){
        int k = i;
        for (int j = k + 1; j < N; j++){
            if (array[j] < array[k]){
                k = j;
            }
        }
        //找到了最小的值再交换
        if(k!=i)//说明根本不用交换
        {
            int temp = array[i];
            array[i] = array[k];
            array[k] = temp;
        }
    }
}
```
## 插入排序
类似于扑克牌洗牌，从后面选择一个数，插入到已排序的合适位置。
该算法有个问题,那就是**需要不停的往后挪动数组,很重要!**
```cpp
void insertSort(int array[]){
    //从第二个元素开始，加入第一个元素是已排序数组
    for (int i = 1; i < N; i++){
        //待插入元素 array[i]
        if (array[i] < array[i - 1]){
            int wait = array[i];
            int j = i;
            //开始挪动数组
            while (j > 0 && array[j - 1] > wait){
                //从后往前遍历已排序数组，若待插入元素小于遍历的元素，则遍历元素向后挪位置
                array[j] = array[j - 1];
                j--;
            }
            array[j] = wait;
        }
    }
}
```
## 希尔排序
> [https://blog.csdn.net/weixin_44915226/article/details/119510328](https://blog.csdn.net/weixin_44915226/article/details/119510328)

其实**是插入排序的分组版本**。
```python
	# 插入排序
def insert_sort(alist):
    n = len(alist)
    for i in range(1,n):
        while (i>0):
            if alist[i] < alist[i-1]:
                alist[i], alist[i-1] = alist[i-1], alist[i]
                i -= 1
            else:
                break
    return alist


# 希尔排序
def shell_sort(alist):
    n = len(alist)
    gap = n // 2
    while gap > 0:
        for i in range(gap,n):
            j = i
            while j > 0:
                if alist[j] > alist[j-gap]:
                    alist[j], alist[j-gap] = alist[j-gap], alist[j]
                    j -= gap
                else:
                    break
        gap //= 2
    return alist
```
## 二分查找
**相关题型：**
[35.搜索插入位置](https://leetcode.cn/problems/search-insert-position/)，这道题是在寻找插入的位置，**最后返回left即可，因为跳出while循环，left脚下就是答案！**
![image.png](https://oss1.aistar.cool/elog-offer-now/15c91402323ba847937f6cdaa8ee33eb.png)
**二分查找的常用框架如下：**
查一个数![image.png](https://oss1.aistar.cool/elog-offer-now/37575015f5e52f930d3fec1c2eee0338.png)
查左边界![image.png](https://oss1.aistar.cool/elog-offer-now/376e9c79bcd44dc9872b98060616234b.png)
**之所以要以left为最终的判断，是因为left可能恰好越过界，就踩在那个点上！**
查右边界![image.png](https://oss1.aistar.cool/elog-offer-now/b9bb47dde3c7146d92b2335b7cdc0e73.png)
**之所以要以right为最终的判断，是因为right可能恰好越过界，就踩在那个点上！**
> 注：不要出现else，而是用if else 这样看代码时能很快知道到底是什么逻辑


[875. 爱吃香蕉的珂珂](https://leetcode-cn.com/problems/koko-eating-bananas/)
![image.png](https://oss1.aistar.cool/elog-offer-now/629487928b4ff3a09f7e5e026a001db4.png)
**解题思路**：如何才能够找到合适的吃香蕉速度？

- 速度最小可能为多少？ **1根/小时**
- 速度最大可能为多少？ 因为每次只能吃一堆，即便还有胃口也不会再去吃了，所以最大的速度是**max（piles）/根**
- 因此，就是从min~max之中进行遍历，找到最小的那个速度

![image.png](https://oss1.aistar.cool/elog-offer-now/e614012ba42ca765b29211afad4b09ec.png)
[1011. 在 D 天内送达包裹的能力](https://leetcode-cn.com/problems/capacity-to-ship-packages-within-d-days/)
![image.png](https://oss1.aistar.cool/elog-offer-now/388bf5a118d73595400cc5a042f0f2d2.png)
**解题思路：**

- 想一想，最小的速度可以为多少？**max(weights);**
- **最大的速度可以为多少？sum(weights);**
- 所以，**这又是一个二分查找求左边界的问题！**[链接](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484598&idx=1&sn=69edaf4a7f6bfd0b1185cae5d0689c1d&chksm=9bd7fabeaca073a8820bc93cb67a8e26fa9eaa1ab9717b7e3ac41b4aac12235067c8af3520d5&scene=178&cur_album_id=1318883740306948097#rd)

[378.有序矩阵中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/)
![image.png](https://oss1.aistar.cool/elog-offer-now/a96abb53b479971aa2e4ab84bc934d61.png)
**解题思路：**
第一钟方法：将数组展开为一维数组，再排序，再获取第k小的元素；
第二种方法：使用堆排序，注意遍历的顺序和堆的大小，如果是大顶堆，那么需要从矩阵右下开始遍历；
![image.png](https://oss1.aistar.cool/elog-offer-now/c3c9b0ec1668ffea825c319a74dee6cb.png)
第三种方法：利用**矩阵的特性以及二分的思想**。
首先，初始最小和初始最大分别为左上与左下，可用mid作为中间值。
根据升序矩阵的性质，不大于它的元素个数其实就是下图路径左边的个数。
如何求左边的个数？从左下角起步，如何当前值小于等于mid，那么就往右边走，并把**当前列的个数（因为列首小于列尾啊）**记入总个数，否则往上走。
我一开始有一个疑惑：**mid一定会在矩阵中吗？**
会的，如果不会，那么就不会出现这个数字，题错了！
![image.png](https://oss1.aistar.cool/elog-offer-now/5d457f35956a56af54d3e01934caabfb.png)
如何计算个数？
![image.png](https://oss1.aistar.cool/elog-offer-now/b7e709e9091119f5b81f314b7740ae87.png)
**如何进行边界的更新？**
![image.png](https://oss1.aistar.cool/elog-offer-now/e0ed7d4ed824eb3cff8bdb7d72c0cedb.png)
剑指offer中有一道相关题，[240. 搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/)，直接从右上角开始遍历；
## 快速排序
> 快速排序其实也是分治递归的思想
> 具体有两种实现思路：
> 第一个是**左右两个值都找到才交换,**最后再与基准值进行交换;
> 第二个是**左右两个找到了就交换**,就好像两边在互相挖坑让对方跳;
> 第三个时

```cpp
void quickSort(int array[], int left, int right){
	if (left > right){
		return;
	}
	int i, j, temp;
	i = left;
	j = right;
	//以最左边的数作为基准数
	temp = array[left];
    //第一种
	while (i != j){
		//先从右边开始找小于temp的元素  注意等号
		while (array[j] >= temp && i < j) {
			j--;
		}
		//再从左边开始找大于temp的元素
		while (array[i] <= temp && i < j){
			i++;
		}
		//左右哨兵均找到满足要求的数后，交换这两个数
		if (i < j){
			int change = array[i];
			array[i] = array[j];
			array[j] = change;
		}
	}
	// 出循环表明i==j  
    // 因此将基准数归位，此时基准数左边的数均小于基准数，右边的数均大于基准数
	array[left] = array[j];
	array[j] = temp;
	
	//然后递归处理基准左边未排序的数，和基准右边的数
	quickSort(array, left, i-1);
	quickSort(array, i + 1, right);
 
}
//第二种
void QuickSort2(int a[],int l ,int h)  
{  
    int po;  
    int high = h,low = l;  
    if( l < h )  
    {  
        po = a[l];  
        while( low < high)  
        {  
            while( low < high && a[high] >= po ) high--;  
            a[low] = a[high]; //相互跳坑 
            while( low < high && a[low] <= po ) low++;  
            a[high] = a[low];  
        }  
        a[low] = po; //把最后一个坑给补上 
  
        QuickSort2(a,l,low-1);  
        QuickSort2(a,low+1,h);  
    }  
}  
//第三种

```
当初看这个方法时有个疑惑，为什么要进行：`array[left] = array[j];array[j] = temp;`
在跳出循环时，j所指向的数必定小于基准数，两者进行换位可以保证左边的数小于基准数，右边的数大于基准数。

[215. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)
![image.png](https://oss1.aistar.cool/elog-offer-now/2fcbf0401d1708850662818d5a8ea7d7.png)
两种方法：
第一种：先将排序再寻找第K大数（冒泡、快速、堆，等到都属于这个方法）
第二种：借助快速排序的特点，**通过阶段性快排的下标来判断**！降序排列！
```cpp
class Solution {
public:
    int target;
    int findKthLargest(vector<int>& nums, int k) {
        if(nums.size()<k){
            return -1;
        }

        target = k;
        int index = quickSort(nums,0,nums.size()-1);
        return nums[index];
    }

    int quickSort(vector<int>&nums,int left,int right){
        int temp = nums[left];
        int i=left;
        int j = right;

        while(i!=j){
            //从右往左(我这是降序排列！)
            while(i<j&&nums[j]<=temp){
                j--;
            }
            //左往右
            while(i<j&&nums[i]>=temp){
                i++;
            }

            if(i!=j){
                int tempnum= nums[j];
                nums[j]=nums[i];
                nums[i]=tempnum;
            }
        }
        //此时 i=j
        nums[left]=nums[i];
        nums[i]=temp;

        if(i==target-1){
            return i;
        }
        else if(i<target-1){
            return quickSort(nums,i+1,right);
        }
        else {
            return quickSort(nums,left,i-1);
        }
    }
};
```
## 堆排序的实现
堆排序是一种选择排序，是**利用堆这种数据结构而设计的一种排序算法**，它的最坏，最好，平均时间复杂度均O(nlogn)，它也是不稳定排序。
首先简单了解下**堆——**堆是具有以下性质的**完全二叉树**：每个结点的值都大于或等于其左右孩子结点的值，称为**大顶堆**；或者每个结点的值都小于或等于其左右孩子结点的值，称为**小顶堆**。如下图：
![image.png](https://oss1.aistar.cool/elog-offer-now/eafaf3d08c13f26aee5676de55ed3d26.png)
**大顶堆，主要是用来实现一个升序排列**，(⊙﹏⊙)？把大的拿出来不应该降序吗？
因为堆排序一般是基于数组实现，且将出堆的元素放在数组末尾，可以省去数组移动！
**弹出一个元素之后，再对剩下的进行一次建堆，如此反复**；
小顶堆，**主要是实现降序，顺序同上**；
有关堆排序的具体实现细节可以参考动图：[1.7 堆排序-菜鸟教程](https://www.runoob.com/w3cnote/heap-sort.html)。
[堆排序demo](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/solution/shou-si-dui-pai-xu-yi-wen-kan-hui-dui-pai-xu-by-ti/)
> 因为堆是一棵完全二叉树，所以一般可以用**数组**来实现。数组的下标对应堆中节点的编号。为方便起见，我们假**设数组下标从 1 开始**。那么对于堆中每个节点与其左右子节点的编号关系都有：
> - leftID = fatherID * 2
> - rightID = fatherID * 2 + 1
> - fatherID = sonID / 2
> 
**示例**如下图：
![image.png](https://oss1.aistar.cool/elog-offer-now/cdb5b709a790c743458fb1e15f7d19e6.png)
> 有了数据存储格式之后，来看下堆支持的方法： 
> 1. int size() { ... }; 返回堆内元素个数。 
> 2. int top() { ... }; 返回根节点的元素。 
> 3. void push(int x) { ... }; 插入一个元素。 
> 4. void pop(int x) { ... }; 将根节点元素从堆中弹出。 
> 
前两种方法较简单，size() 可以维护一个计数，在 push 和 pop 时更新即可。top() 直接返回根节点的元素即可。主要讲下第三和第四个灵魂函数。
> **push方法：**
> 由于性质二的限制，push后堆也应该是一棵完全二叉树，所以**必须将元素追加到数组末尾**。
> 又由于性质一的限制，需要对刚刚push的元素进行**冒泡**。
> 以最大堆为例，设刚刚push的元素的编号为 id，val[id] 表示对应节点的值：
> - 如果 id == 1，冒泡过程结束。
> - 如果 **val[id] > val[id/2]**，那么需进行交换，swap(val[id], val[id/2])，id /= 2，跳转第 1 步；否则，算法结束。
> 
示例如下图：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/a631e4b87b1b3ca1fd9492d5125b1ee0.png)
> **pop方法：**
> 需要分两步走：**第一步**，**先将根节点与编号最大节点的元素互换**，**并删除编号最大的节点**。
> **第二步，**此时堆仍然是一棵完全二叉树，但有可能不满足性质一。所以我们需要对根节点的**元素进行下沉操作**，以大顶堆为例，设置一个游标 id, 初始指向根节点：
> 1. 如果id指向叶子节点，算法结束。
> 2. 如果id指向节点大于其左右子节点的值，算法结束。
> 3. 设id的左右子节点中，拥有较大值的编号为 p，交换 id 与 p 的值，并将** id 指向 p 节点**。跳转步骤 1 .
> 
示例如下图：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/de59230887af432276b85c565ff85b95.png)
> 以topK问题为例：

```cpp
class Solution {
    enum { MAXN = 10000 };
    int n;
    int heap[MAXN];
    
    inline int& getRef(int root) {
        return heap[root-1];
    }
public:
    Solution() : n(0) {}
    void push(int v) {
        heap[n++] = v;
        //开始对洗新加的元素进行排序，直接判断其是否与父节点大小
        //for(int pos = n, nextPos = pos>>1; pos > 1 
        //        && getRef(pos) > getRef(nextPos); pos = nextPos, nextPos >>= 1) {
        //    swap(getRef(pos), getRef(nextPos));
        //}
        //对上面的改版，更容易理解
        int pos=n,nextPos=pos>>1;
        //如果新加的节点比其父节点大，那就需要交换
        while(pos>1>1&&getRef(pos) > getRef(nextPos)){
        	swap(getRef(pos), getRef(nextPos));
            pos = nextPos, nextPos >>= 1
        }
    }
    
    int pop() {
       //交换顶元素到末尾，并将其剪短，表示排序完毕
       swap(getRef(1), getRef(n));
       int res = heap[--n];
        
       for(int root = 1; ; ) {
           //获取左右子节点
           int left = root<<1;
           int right = root<<1|1;
           
           //看看现在父节点是否大于其子节点，不大于则交换
           //注意要查看节点是否越界
           if(right <= n && getRef(root) < max(getRef(left), getRef(right))) {
               if(getRef(left) > getRef(right)) {
                   swap(getRef(left), getRef(root));
                   root = left;
               } else {
                   swap(getRef(right), getRef(root));
                   root = right;
               }
           //注意要查看节点是否越界
           } else if (left <= n && getRef(root) < getRef(left)) {
                swap(getRef(left), getRef(root));
                root = left;
                break;
           } else {
               break;
           }
       }
       return res;
    }
    int size() const {
        return n;
    }
    vector<int> getLeastNumbers(vector<int>& arr, int k) {
        for(auto v : arr) {
            this->push(v);
            if(this->size() > k) {
                this->pop();
            }
        }
        
        return vector<int>(heap, heap+k);
    }
};
```
## 归并排序
> 归并排序，**一般是用递归实现, 分为两个阶段, 分组和合并.**
> 分组即是将原数组不停的**切分为两半**,直到每一部分**仅有1个元素为止**,合并即是将两个**分组合并**,由于此时两个分组都处于**已排序状态**,可以**很快的排序**.
> 一般来说，n个数据大致会**分为logN层**，**每层执行merge的总复杂度为O(n)**， **所以总的复杂度为O(nlogn)**。
> 需要临时占用部分内存空间.

```cpp
#include <iostream>

using namespace std;
int arrs[] = { 23, 65, 12, 3, 8, 76, 345, 90, 21, 75, 34, 61 };
int arrLen = sizeof(arrs) / sizeof(arrs[0]);
int * tempArr = new int[arrLen];

void mergeArray(int * arrs, int * tempArr, int left, int middle, int right){
    int i = left, j = middle ;
    int m = middle + 1, n = right;
    int k = 0;

    //直接在新数组里,依次将两个数组合并进去!
    // 用空间换时间!
    while(i <= j && m <= n){
        if(arrs[i] <= arrs[m])
            tempArr[k++] = arrs[i++];
        else
            tempArr[k++] = arrs[m++];
    }
    //防止还有数据没有完全被传递干净
    while(i <= j)
        tempArr[k++] = arrs[i++];
    while(m <= n)
        tempArr[k++] = arrs[m++];
    //再把合并的数组拷贝回去,不然递归回去之后数组根本没有改变
    for(i=0; i < k; i++)
        arrs[left + i] = tempArr[i];
}

void mergeSort(int * arrs, int * tempArr, int left, int right){
    if(left < right){
        int middle = (left + right)/2;
        mergeSort(arrs, tempArr, left, middle);
        mergeSort(arrs, tempArr, middle + 1, right);
        mergeArray(arrs, tempArr, left, middle, right);
    }
}

int main()
{
    mergeSort(arrs, tempArr, 0, arrLen-1);
    for (int i = 0; i < arrLen; i++)
        cout << arrs[i] << endl;
    return 0;
}

```

[148.排序链表](https://leetcode-cn.com/problems/sort-list/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/ba49261198bd447fc463ebcbe513d66e.png)
> 解题思路：
> - 堆排序这种方式是以新建链表节点来排序的，得问面试官；
> - 归并排序链表的步骤有两步：**分割+合并。**
>    - 分割即是利用快慢指针，**找到链表的中点，并将中点->next=null，进行切分**。
>    - 当分割到每个链表只有1个节点时，即两两进行合并，这就是**合并两个升序链表的**问题。
>    - **难点在于：怎么保存分割的结果？**
>       - 如果使用递归的方式，则在分割到单个节点的时候，即进行归并，**而后一次递归返回合并之后的链表头节点**；
>       - 如果想要降低空间复杂度，就只能使用**迭代的方式来替代递归，那么如何迭代？即人工对链表进行分割！如下图**![image.png](https://oss1.aistar.cool/elog-offer-now/b8f7a9abf33dc2c4dbe55646b8c0b7e8.png)
>       - **这个解答代码可参考：**[链接](https://leetcode-cn.com/problems/sort-list/solution/sort-list-gui-bing-pai-xu-lian-biao-by-jyd/224647)

```cpp
class MergeSort {
private:
    // 找链表的中间节点的前一个(和 876.链表的中间结点 不一样)
    ListNode* getMid(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head->next->next;
        while (fast && fast->next) {
            fast = fast->next->next;
            slow = slow->next;
        }
        return slow;
    }

    // 合并两个有序链表（21.合并两个有序链表）
    ListNode* merge(ListNode* headL, ListNode* headR) {
        // cout << "l: " << headL->val << " r: " << headR->val << endl;
        ListNode* hair = new ListNode(-1);
        ListNode* cur = hair;

        while (headL != nullptr && headR != nullptr) {
            if (headL->val < headR->val) {
                cur->next = headL;
                headL = headL->next;
            } else {
                cur->next = headR;
                headR = headR->next;
            }
            cur = cur->next;
        }
        //这是为了将后续的链表进一步合并!
        if (headL == nullptr) {
            cur->next = headR;
        } else {
            cur->next = headL;
        }
        return hair->next;
    }

public:
    ListNode* sort(ListNode* head) {
        if (head == nullptr || head->next == nullptr) return head;
        ListNode* midNode = getMid(head);
        ListNode* rightHead = midNode->next;
        midNode->next = nullptr;  // 要截断//很重要!!

        ListNode* leftNode = sort(head);
        ListNode* rightNode = sort(rightHead);
        
        //返回的是已经合并之后的头节点!
        return merge(leftNode, rightNode);
    }
};

class Solution {
public:
    ListNode* sortList(ListNode* head) {
        MergeSort m;
        return m.sort(head);
    }
};
```
[剑指offer51：数组中的逆序对](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/3d64ec3bb6094fc9ef6448219e61000c.png)
> 归并排序；
> **解题思路**：
> - 将问题分解为两部分来求解![image.png](https://oss1.aistar.cool/elog-offer-now/4510833b37c6aa1e80390fff0b113aaf.png)
> - 这样求逆序对的问题，就转换成为了在归并排序的过程中**做一些额外工作：计算逆序对的问题。**
> - 先求中点，而后递归调用分割函数，将原数组切分（用下标来表示切分）
> - 当数组分割成最小单元（1个数）时，开始进行合并
> - 合并前先复制一遍原数组，而后将顺序的数字重新放入原数组中。在合并时，根据前后的大小关系，计算逆序对；
> - 返回最终的逆序结果
> - 这个题解比较容易理解：[链接](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solution/jian-zhi-offer-51-shu-zu-zhong-de-ni-xu-pvn2h/869354)
> 
**二刷心得：**
> - 终于什么参考都没看，用归并排序将其解出来了，有一些细节要注意
> - 一是，复制数组时，只复制[left,right]之中的数据，否则会超时；（**或者直接复制整个数组，这样就不会有坐标转换的步骤，并且速度更快！**）省去了每次都构造vector的时间开销！
> - 二是，注意坐标的转换，以及边界条件等问题，最好在本子上画出来推导一下；

[23.合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/solution/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/262a09a7941fcb3e46ae861a2c4787cb.png)
> 解题思路：
> - 利用优先队列，实现堆排序，而后依次取出最小的节点即可，注意重载运算符或仿函数的方法；
> - 归并排序，**分割成两两合并链表的问题**，最后依次递归：[链接](https://leetcode-cn.com/problems/merge-k-sorted-lists/solution/shun-xu-he-bing-si-lu-jian-dan-by-climit-qxo9/)

```cpp
//优先队列,堆排序
class Solution {
public:
    struct cmp{  //对新的数据类型的<进行重写
       bool operator()(ListNode *a,ListNode *b){
          return a->val > b->val;
       }
    };
    ListNode* mergeKLists(vector<ListNode*>& lists) {
       priority_queue<ListNode* ,vector<ListNode*> , cmp> heapk;
       for(auto p:lists){
        if(p!=NULL){
            heapk.push(p);
        }
       }
       ListNode *pHead = new ListNode(-1);
       ListNode *pCur = pHead;
       while(!heapk.empty()){
          ListNode *top = heapk.top();
          heapk.pop();
          pCur->next = top;
          pCur = pCur->next;
          if(top->next!=NULL){
            heapk.push(top->next);
          } 
       }
       pCur = pHead->next;
       delete pHead;
       return pCur;
    }
};
```
## C++如何使用优先队列?
priority_queue<Type, Container, Functional>
传入基本数据类型时,**默认是大顶堆.**
priority_queue <int,vector<int>,greater<int> > q;** (小顶堆)——降序**
priority_queue <int,vector<int>,less<int> >q**;(大顶堆)——升序**
**重载运算符或重写仿函数:**
```cpp
//方法1
struct cmp //运算符重载<
{
    int x;
    tmp1(int a) {x = a;}
    bool operator<(const tmp1& a) const
    {
        return x < a.x; //大顶堆
    }
};

//方法2(常用!)
struct cmp //重写仿函数
{
    bool operator() (tmp1 a, tmp1 b) 
    {
        return a.x < b.x; //大顶堆 返回true表示优先级高!
    }
};
```
# 树的王国
> 先看看这篇文章（从普通树到二叉平衡树、B-Tree等）：[链接](https://blog.csdn.net/chongzi_daima/article/details/107849493)

## 二叉查找/搜索树（BST，Binary Search Tree）
**特点：二分的思想**
1、若它的左子树不为空，则**左子树上所有的节点值都小于它的根节点值**；
2、若它的右子树不为空，则**右子树上所有的节点值均大于它的根节点值**；
3、**它的左右子树也分别可以充当为二叉查找树**；
4、没有相等的节点。（此点存疑，根据实际应用来调整，**或是在节点增加一个count计数，但代价大**）；

**实现思路：**
**访问：**找一个值，只需要从根节点出发，与根节点去比较，若大于根节点去右子树找，若小于去左子树中找（每次淘汰一半的子树），**这样只需要 O（logn）就能找到你要找的元素**；
**插入：**先利用访问找到合适的位置，而后将需要插入的数字根据大小放置在左/右边；
> 如下，替换掉12原本的位置，12作为13的左子节点：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/4d49604128f733ec4add422e289ae209.png)

**删除：**删除情况比较复杂，这需要根据左右两子树的情况来确定最终的值，例如，**如果 A 有两个子节点**， 那么我们就以**右子树的最小节点取代 A**，（从右子节点开始，一直走到**左到底**就是其**右子树的最小节点**）将 A 赋予其值，并将其删除：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/0cf1d05c87838f72a2720cc99721673f.png)
> 为什么要这样？**因为只有取右子树的最小值**，**才可以最小程度的影响原树结构；**

**实现代码：**
```cpp
//https://www.cnblogs.com/WindSun/p/10895787.html
#include <iostream>
using namespace std;
template<typename T>
//BST结点定义
struct BSTNode
{
	T data;
	BSTNode<T> *lchild, *rchild;//左右子结点
	//默认构造函数
	BSTNode() :lchild(nullptr), rchild(nullptr) {}
	//带参构造函数（初始化列表的方式）
	BSTNode(const T d, BSTNode<T>* L = nullptr, BSTNode<T>* R = nullptr) :data(d), lchild(L), rchild(R) {}
};

template<typename T>
class BST
{
public:
	BST() :root(nullptr) {}
	//构建二叉树
	BST(T value) :root(nullptr), InputEnd(value) {
		T tempvalue;
		cin >> tempvalue;
		while (tempvalue!=InputEnd)
		{
			Insert_(tempvalue, root);
			cin >> tempvalue;
		}
	}
	//析构函数
	~BST() { Destroy(root); }
	
	//插入
	bool Insert(T value) { return Insert_(value, root); }

	//插入元素（第二个参数是指针的引用，引用原树的根节点）
	bool Insert_(const T& value, BSTNode<T>* &node) {
		if (node == nullptr) {
			node = new BSTNode<T>(value);
			//判断内存是否分配成功
			if (node == nullptr)
			{
				cout << "Memory allocation failed!" << endl;
				exit(1);//程序退出
			}
			return true;
		}
		else if (value < node->data) {
			Insert_(value, node->lchild);
		}
		else if (value > node->data) {
			Insert_(value, node->rchild);
		}
		else {
			return false;//已在树中插入失败（根据情况而定）
		}
	}

	//删除
	bool Remove(T value) { return Remove_(value, root); }

	//删除一个元素(以node为根的二叉搜索树中删除含x的结点)
	bool Remove_(T value, BSTNode<T>* &node) {
		BSTNode<T>* temp;
		if (node != nullptr) //node不为空进行操作
		{				 
			if (value < node->data)
			{
				Remove_(value, node->lchild);
			}
			else if (value > node->data)
			{
				Remove_(value, node->rchild);
			}
			//找到了要删除的结点
			//1.要删除的结点node同时有左右子树
			else if (node->lchild != nullptr&&node->rchild != nullptr)
			{
				temp = node->rchild;    //在右子树中搜索中序下的第一个结点
				while (temp->lchild != nullptr)
				{
					temp = temp->lchild;
				}
				//用右子树中序下的第一个结点的值填充要删除的结点
				node->data = temp->data;
				//然后再新填充值node的右子树中删除temp的data值
				Remove_(node->data, node->rchild);
			}
			else //不同时有左右子树
			{
				temp = node;        //temp记住要删除的node结点
				if (node->lchild == nullptr) //只有右子树
				{
					node = node->rchild;
				}
				else    //只有左子树
				{
					node = node->lchild;
				}
				delete temp;    //删除结点
				temp = nullptr;
				return true;
			}
		}
		else //node为空直接返回false
		{
			return false;
		}
	}
	
	//搜索二叉树
	bool Search(T value) { return (Search_(value, root) != nullptr) ? true : false; }

	//搜索若找到，返回该结点地址，否则返回NULL
	BSTNode<T>* Search_(T x, BSTNode<T>* node)
	{
		if (node == nullptr)
		{
			return nullptr;
		}
		else if (x < node->data)
		{
			return Search_(x, node->lchild);
		}
		else if (x > node->data)
		{
			return Search_(x, node->rchild);
		}
		else
		{
			return node;
		}
	}

	//中序遍历
	void InOrder() { InOrder(root); }

	//遍历操作
	void InOrder(BSTNode<T>* root)
	{
		if (root != NULL)
			{
			    InOrder(root->lchild);
			    cout << root->data << " ";
			    InOrder(root->rchild);
			}
	}

	//销毁二叉树
	void Destroy(BSTNode<T>* &root)
	{
		if (root == nullptr)
		{
			return;
		}
		if (root->lchild != nullptr)
		{
			Destroy(root->lchild);
		}
		if (root->rchild != nullptr)
		{
			Destroy(root->rchild);
		}
		delete root;
		root = nullptr;
	}

private:
	BSTNode<T> *root;//根节点指针
	T InputEnd;//输入结束标志（构建二叉树所用）
};

int main(int argc, char* argv[])
 {
	//g a e d f h j i l k #
	BST<char> tree('#');
	tree.InOrder();
	cout << endl;
	cout << tree.Search('e') << endl;
	cout << tree.Insert('z') << endl;
	tree.InOrder();
	cout << endl;
	cout << tree.Remove('z') << endl;
	cout << tree.Remove('j') << endl;
	tree.InOrder();
	cout << endl;
	system("pause");
	return 0;
 }
```
## 平衡二叉树/AVL
> [链接](https://mp.weixin.qq.com/s?__biz=Mzg2NzA4MTkxNQ==&mid=2247485220&idx=1&sn=7bca40ca5a3e703f6c9f89eb0f9f2be4&source=41#wechat_redirect)
> **为了解决二叉搜索树在某些情况下退化成一个有序链表的问题**，强制限定左右子树的高度差最多为1；

**特点：**
	**BST的特点+每个节点左右子树的高度差最多等于1**。
**调整：**如何保证调整过后是AVL？不会影响之前的结构吗？
	不会，因为在插入过程中是**动态维护的，是从叶子节点往上递归进行**。

	**左左型：需要右旋**——即：**顺时针旋转两个节点**，使得父节点被自己的左孩子取代，而自己成为自己的右孩子。
![image.png](https://oss1.aistar.cool/elog-offer-now/7ff9fc1a137c6310267b3b99991fcdfd.png)![image.png](https://oss1.aistar.cool/elog-offer-now/4b539b318357284ade8cb52dd4bd2d8b.png)
	**右右型：需要左旋**——逆时针旋转。
![image.png](https://oss1.aistar.cool/elog-offer-now/6c95704895e1760664c2e948fef19d78.png)
	**还有左右型和右左型，前者需要先右在左，后者需啊哟先左后右**，**详情请见：**[链接](https://mp.weixin.qq.com/s?__biz=Mzg2NzA4MTkxNQ==&mid=2247485220&idx=1&sn=7bca40ca5a3e703f6c9f89eb0f9f2be4&source=41#wechat_redirect)。
**实现代码：**[链接](https://blog.csdn.net/qq_25343557/article/details/89110319)，将左右子树旋转的细节完完全全的写完了。或者是这个[链接](https://mp.weixin.qq.com/s?__biz=MzUzMDA0ODkxNA==&mid=2247484650&idx=1&sn=04a506182a9b2658b457e19209b41d61&chksm=fa56f617cd217f01a052687856b18ff9accc2e34aa625d68ff5a5ee4e027b4321ed72fbbc4f7&scene=178&cur_album_id=1337879508761886721#rd)。
## 红黑树
> 参考博客：[链接](https://mp.weixin.qq.com/s?__biz=MzUzMDA0ODkxNA==&mid=2247484987&idx=1&sn=2e0c6e731b235d74975fdc9b676ef4f2&chksm=fa56f4c6cd217dd09ffc3b2dab39fc06377126b18e8f99a2dcf4bfc0908e52c39d83fad08d0d&cur_album_id=1337879508761886721&scene=189#rd)，写的很不错，先理论再实现代码。

先问一个问题：**为什么需要红黑树？BST和AVL难道还不够？**
**——**虽然平衡树解决了二叉查找树退化为近似链表的缺点，能够把查找时间控制在 O(logn)，不过却不是最佳的，因为平衡树要求每个节点的左子树和右子树的高度**差至多等于1**，**这个要求实在是太严了，导致每次进行插入/删除节点的时候，几乎都会破坏平衡树的第二个规则**，进而我们都需要通过左旋和右旋来进行调整，使之再次成为一颗符合要求的平衡树。 

**显然，如果在那种插入、删除很频繁的场景中**，平衡树需要频繁着进行调整，这会使平衡树的性能大打折扣，**为了解决这个问题，于是有了红黑树，**红黑树具有如下特点：
1、具有**二叉查找树**的特点；
2、节点是红色和黑色，根节点**是黑色的**；
3、每个**叶子节点都是黑色的空节点（NIL）**，也就是说，**叶子节点不存数据**。
4、若节点为红色，则其孩子节点必为黑色；
5、每个节点，**从该节点到达其可达的叶子节点是所有路径**，**都包含相同数目的黑色节点**。（更好记一点，**从黑色的NULL叶子节点到最终根节点的路上黑色数目相等！**）
![image.png](https://oss1.aistar.cool/elog-offer-now/dc247d92587f8e9da34f7e47455180d0.png)
> - 性质(5)保证红黑树的**最长路径不超过最短路径的两倍**——红黑树是通过“黑高”，“不能出现双红结点”等限制，**让树在一定程度上左右平衡，并不是严格意义上深度差不大于1**。因此能保证在调整不频繁的情况下，达到logn的查找效率。当然，红黑树的logn前面的系数要比平衡二叉树大一些。但是在实际应用中足够了
> - 红黑树相比于AVL树，**牺牲了部分平衡性**，以换取删除/插入操作时少量的旋转次数，整体来说，性能优于AVL树。


先介绍两个概念：**黑深度和黑高度**。

- 黑深度：自顶向下， 从根节点开始， 沿途所经过的黑节点的总数称作该节点的黑深度， 根节点的黑深度为0 
- 黑高度：自底向上， 从叶子节点开始， 沿途所经过的黑节点的总数，称作该节点的黑高度， 外部节点即空叶子节点的黑高度为0

如下图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/2571b572f2d3790407044f901e8bd04c.png)
各节点的深度和高度如下表：
![image.png](https://oss1.aistar.cool/elog-offer-now/9905e9b68d91cc52db1afbfd917b7876.png)
> **注意：**定义中所谓的“经过”，**是指完全略过黑节点**，比如002的黑高度为2, 008的黑高度也是2，而不是3，虽然008也是一个黑节点，**但是没有完全经过**！

> **调整方法：**[https://zhuanlan.zhihu.com/p/79980618?utm_source=cn.wiz.note](https://zhuanlan.zhihu.com/p/79980618?utm_source=cn.wiz.note)或[链接](https://mp.weixin.qq.com/s?__biz=MzUzMDA0ODkxNA==&mid=2247485018&idx=1&sn=d6d1902b79d7d1ce91033ff224940054&chksm=fa56f4a7cd217db1ae9d98bf5e21590818634885a1cbe9b7c0c573412ffb816151cdf98d5cb4&cur_album_id=1337879508761886721&scene=189#rd)

**插入调整：**寻找插入点+调整（旋转或上色）
在寻找插入点的时候，算法的思路如下：

- 新插入节点设置为**红色**（如果插入黑色节点，会导致某路径上的黑色节点数目超过其他路径，**违反性质5，**相比之下，红色影响较小）
- 新插入节点首先和根节点比较：若根节点不存在即树为空，则新插入节点作为树的根节点插入
- 若根节点存在，则比较两节点大小，确认要插入该节点的左子树或右子树
- 若要插入当前节点左子树，则比较新插入节点和左孩子节点，若左孩子不存在， 则新插入节点作为当前节点的左孩子节点.若左孩子存在，则重复过程2-4
- 若要插入当前节点右子树，则比较新插入节点和右孩子节点， 若右孩子节点不存在，则新插入节点作为当前节点的右孩子节点.若右孩子存在，则重复过程2-4
- 最终新节点作为叶子节点插入

在调整的过程中，主要有以下四种情况：
![](https://oss1.aistar.cool/elog-offer-now/124a01209084b89eb74ad1fa4f077a23.jpeg)
上面最复杂的其实是case3的case3，采用这种方式之后，可能会造成有两个**红色**连续，因此就需要以G节点为新节点，继续进行调整，类似于一种递归的过程。详情请参考[红黑树的插入](https://mp.weixin.qq.com/s?__biz=MzUzMDA0ODkxNA==&mid=2247485018&idx=1&sn=d6d1902b79d7d1ce91033ff224940054&chksm=fa56f4a7cd217db1ae9d98bf5e21590818634885a1cbe9b7c0c573412ffb816151cdf98d5cb4&cur_album_id=1337879508761886721&scene=189#rd)。

**删除调整：**寻找插入点+交换调整
删除大致分为两种情况，一种是删除叶子节点，一种是删除非叶子节点。

如果是删除非叶子节点，一般是采用寻找删除节点的前驱节点或后继节点来交换，从而转换为删除叶子节点。
> 前驱节点是删除节点的左子树的最大值；
> 后继节点是删除节点的右子树的最小值；

通过这种互换位置和颜色，删除情形又被分为三种：

- case1:删除的节点为叶子节点
- case2:删除的节点只有左子树
- case3:删除的节点只有右子树

其中case2、case3是一类，因为只有一个子树，那么子树节点必为红色，隐含删除节点必为黑色，根据情况删除即可，参考[红黑树删除1.](https://mp.weixin.qq.com/s?__biz=MzUzMDA0ODkxNA==&mid=2247485042&idx=1&sn=b924c19ead786749b42c4e31d12a66b1&chksm=fa56f48fcd217d99774f362b4229ca968bf0a6c7e15493b941e55d9b64d41cb106bcebafb52e&cur_album_id=1337879508761886721&scene=189#rd)

对于叶子节点情况，就需要进行全局的调整了，直接去看博客[红黑树删除2.](https://mp.weixin.qq.com/s?__biz=MzUzMDA0ODkxNA==&mid=2247485091&idx=1&sn=0d4419b327e1d2d5e44eccb283affd29&chksm=fa56f45ecd217d48d1f78aef8da526c2401942389575baae631f3bb23e12dc633b6ffa3a1bdd&cur_album_id=1337879508761886721&scene=189#rd)

简单来说**，**红黑树和AVL的区别就在于需要考虑到五种规则，但是五种规则在实际使用的时候其实只需要考虑2种：**红红不相连、黑的节点相同，**调整红黑树的过程就是在考量这两个因素的过程。

**红黑树比AVL好在哪？**
> 参考这个答案的说法：[链接](https://www.zhihu.com/question/20545708/answer/1430380181)

Linux内核用红黑树是有官方答案的。
其中第 16 行提到
> Red-black trees are similar to AVL trees, but provide faster real-time bounded
worst case performance for insertion and deletion (at most two rotations and
three rotations, respectively, to balance the tree), with slightly slower
(but still O(log n)) lookup time.

红黑树类似于AVL树，但提供更快的实时性，**插入和删除的有界最坏情况性能（最多两个分别旋转和三次旋转以平衡树）**。**查找时间稍慢（但仍为O（log n））**。


> 这个部分来看看二叉树有什么题。
> **缘起（反转、填充、展开为链表）**
> “快速排序就是个二叉树的前序遍历，归并排序就是个二叉树的后续遍历”————labuladong
> **快速排序是寻找分界点，再对两边进行快速排序**——类似于前序遍历；**归并排序是先对两边进行排序，再到中界进行合并**——类似于**后序遍历**；
> **写树相关的算法，简单说就是，先搞清楚当前root节点该做什么，然后根据函数定义递归调用子节点，递归调用会让孩子节点做相同的事情。（这其实就是递归的意义）**

[**226.反转二叉树**](https://leetcode-cn.com/problems/invert-binary-tree/)
![image.png](https://oss1.aistar.cool/elog-offer-now/7639e66d075c003cefd24e368ed2cb57.png)
**思路：**
利用递归，反转当前节点的左右节点，而后对左右子树再进行同样的操作；
![image.png](https://oss1.aistar.cool/elog-offer-now/97efdbc52639bc6d3663fbdf66015b56.png)
[**116.填充二叉树节点的右侧指针**](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)
![image.png](https://oss1.aistar.cool/elog-offer-now/bca70ba9b0ea468403c320fa7adee533.png)
直接实现“连接每一个节点的左右节点”，**无法将两个不同节点的左右节点连接，那就换成“连接两个相邻节点”，见下：**
![image.png](https://oss1.aistar.cool/elog-offer-now/717627762d9b3f383465b5f5d05a28b4.png)
[**114.二叉树展开为链表**](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)
![image.png](https://oss1.aistar.cool/elog-offer-now/4b6ad4a67a34769888ab3607b04ed732.png)
**解题思路：**
**递归：**
尝试给出这个函数的定义：**给flatten函数输入一个节点root，那么以root为根的二叉树就会被拉平为一条链表。**
**如何把root的左右子树拉平？**其实很简单，按照flatten函数的定义，对root的左右子树递归调用flatten函数即可，**很难解释，但这个函数就是完成这个功能而已。**
（待补充）


**迭代：**
**就是先将所有的点插入Vector中按照前序遍历，而后再依次取出并连接；**
![image.png](https://oss1.aistar.cool/elog-offer-now/70c31bbfdfe0687d466ea3b252508910.png)
## 
[645.最大二叉树](https://leetcode-cn.com/problems/maximum-binary-tree/)
![image.png](https://oss1.aistar.cool/elog-offer-now/d7235efba071e99ab0a867be37380f5c.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/6726b2df3253c2859c992d61a88da279.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/b21fdb658eef3b9a3edd73a2c04dad20.png)
> 思路倒是很简单，不过在Treenode的写法上卡了一会，**因为Treenode需要使用new来分配**（**因该结构体中有指针）**；
> 每次都去寻找最大值，而后根据数组分割，进行子树的构建

![image.png](https://oss1.aistar.cool/elog-offer-now/7a0e8edd2fa044d96a8dcc35036641a2.png)
## 
## [105.从前序和中序遍历结果来重构二叉树（剑指offer07）](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
![image.png](https://oss1.aistar.cool/elog-offer-now/e32fad25c8091638a5b2c05dfc0a8e70.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/9e9fee5e537c75f2e2cd59d9de4691c3.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/ccfc8419b0b59bac5b02f10f9059a365.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/43656c7009401ce88cfaf63bb6503991.png)
## [106.从后序和中序遍历结果重构二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)
> 需要先重构右子树，再重构左子树；
> [https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/solution/yi-tao-code-gao-ding-by-ren-william-istm/](https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/solution/yi-tao-code-gao-ding-by-ren-william-istm/)

![image.png](https://oss1.aistar.cool/elog-offer-now/b270a8eaf03c44d749c8b145cd9b2b79.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/f1087623db08cd53b6d21e953c4b8833.png)
## [652.寻找重复子树](https://leetcode-cn.com/problems/find-duplicate-subtrees/)
![image.png](https://oss1.aistar.cool/elog-offer-now/66820a85504af1a25bfabf54bd6b0579.png)

这里的重复子树是2-4，跟4。
**话说这道题应该咋做？一点头绪都没有。**
**最后看了答案才明白：利用前或中或后序遍历将子树展开成字符串，再利用hash表判断是否具有重复的子树结构。**
> 建议用后续遍历，因为子树是从下往上的

这道题深刻地诠释了递归解法的意义，每一个节点只需要知道，**以自己为根节点的子树是不是重复的就可以了**，**那么判断自己是重复的需要哪些条件呢？**
**需要知道自己的子树结构（局部），以及其他人的子树结构（全局）；怎么判断有没有？**
**用Set或者HashMap即可。**
**这道题堪称经典！！**
![image.png](https://oss1.aistar.cool/elog-offer-now/adc877ca2faa6f12a633eabc71a6bcfe.png)
## 二叉搜索树寻找第K小
[230.二叉搜索树中第k小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)
![image.png](https://oss1.aistar.cool/elog-offer-now/5d5c03005f0a4333b384ed93e75ea024.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/5cf9237fc93fe56d8a24cf285057471c.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/aeb582f3b63858394d94bcd12ded53f7.png)

可以直接中序遍历，**但是接下来的解法也值得借鉴**：
![image.png](https://oss1.aistar.cool/elog-offer-now/a790faa49f453fc6ed4dc1b5ea2e2f63.png)
_详细解释可看：_
[https://mp.weixin.qq.com/s/ioyqagZLYrvdlZyOMDjrPw](https://mp.weixin.qq.com/s/ioyqagZLYrvdlZyOMDjrPw)
简单来说，跟**7.3最后一道题有些类似**：需要在二叉树节点中维护额外信息。**每个节点需要记录，以自己为根的这棵二叉树有多少个节点。（有了这个信息，我们就可以快速寻找对应大小的节点，且平均时间复杂度为指数级别）**
![image.png](https://oss1.aistar.cool/elog-offer-now/e69d8d163fa1016a209522d5d743a8c5.png)
## 二叉搜索树转换为累加树
[538/1038.把二叉搜索树转换为累加树](https://leetcode-cn.com/problems/binary-search-tree-to-greater-sum-tree/)
![image.png](https://oss1.aistar.cool/elog-offer-now/ea922e76fc0a90bef39175b1aa9c4fbd.png)
**中序遍历二叉搜索树可以升序打印节点，如果交换递归顺序就可以降序打印节点信息了！！**
![image.png](https://oss1.aistar.cool/elog-offer-now/61d91465965584eecee536b598efb138.png)
因为每个节点其实**只要知道大于自己的节点个数就可以实现这个算法了**，所以**利用反向的中序遍历即可完成！**
![image.png](https://oss1.aistar.cool/elog-offer-now/05ab3cf22a7a7466286c74bda7a0ddf9.png)
## 判断二叉搜索树的合法性
如果每个节点只判断自身的左右节点是否满足大小关系，就可能出现子树节点比其父节点更大的情况，要想解决这个问题，**就可以通过增加递归函数的参数列表**：
```cpp
booleanisValidBST(TreeNode root){     
    return isValidBST(root, null, null); 
} 
/* 限定以 root 为根的子树节点必须满足 max.val > root.val > min.val */ 
booleanisValidBST(TreeNode root, TreeNode min, TreeNode max){     
    // base case     
    if (root == null) return true;     
    // 若 root.val 不符合 max 和 min 的限制，说明不是合法 BST     
    if (min != null && root.val <= min.val) return false;     
    if (max != null && root.val >= max.val) return false;     
    // 限定左子树的最大值是 root.val，右子树的最小值是 root.val     
    return isValidBST(root.left, min, root)  && isValidBST(root.right, root, max); 
} 
```
## 在二叉搜索树中搜索一个数
结合它左大右小的性质：
```cpp
voidBST(TreeNode root, int target){ 
    if (root.val == target)     
    // 找到目标，做点什么     
    if (root.val < target)              
        BST(root.right, target);     
    if (root.val > target)             
        BST(root.left, target); 
} 
```
## 在BST中插入一个数
一旦涉及「改」，函数就要返回TreeNode类型，并且对递归调用的返回值进行接收。
```cpp
TreeNode insertIntoBST(TreeNode root, int val){     
    // 找到空位置插入新节点     
    if (root == null) return new TreeNode(val);     
    // if (root.val == val)     
    //     BST 中一般不会插入已存在元素     
    if (root.val < val)              
        root.right = insertIntoBST(root.right, val);     
    if (root.val > val)              
        root.left = insertIntoBST(root.left, val);    
    return root; 
} 
```
## 在BST中删除一个数
找到删除的那个数不难，**难的是删除了之后如何调整改二叉树使其结构正常**！！
分为三种情况：

1. 只有一个节点
2. 没有节点
3. 有两个节点

详见链接：	 
[https://mp.weixin.qq.com/s/SuGAvV9zOi4viaeyjWhzDw](https://mp.weixin.qq.com/s/SuGAvV9zOi4viaeyjWhzDw)
![image.png](https://oss1.aistar.cool/elog-offer-now/48e7cfa5bade55f158968890b6ea5882.png)
## 二叉树序列化
**二叉树的序列化与反序列化**，无外乎就是一下几种遍历的方式：
> 直接点进去：[https://mp.weixin.qq.com/s/DVX2A1ha4xSecEXLxW_UsA](https://mp.weixin.qq.com/s/DVX2A1ha4xSecEXLxW_UsA)

前序遍历：这是最容易理解的方式，**反序列化提取字符串第一个递归即可**；
![image.png](https://oss1.aistar.cool/elog-offer-now/ad7ff7bcde9aa2c944be8642734b9a61.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/0734a5e8640b32c1b664107a7bfad1f8.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/6573ad879d59f51024228d2e8bf9e514.png)
```cpp
/******** 先序遍历序列化与反序列化 *************/
class Codec {
public:
    string data;
    string SEGMENT="|";
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        traverse(root);
        data.pop_back(); // 去掉尾部 ,
        return data;
    }
    void traverse(TreeNode* root) {
        if (root == nullptr) {
            data += "#,";
            return;
        }
        data += (to_string(root->val) + SEGMENT);
        traverse(root->left);
        traverse(root->right);
    }
    queue<string> split(string& str) {
        queue<string> ans;
        if (str.empty()) return ans;
        int size = str.size();
        int pre = 0;
        for (int i = 0; i <= size; ++i) {
            if (i == size || str[i] == SEGMENT) {
                ans.emplace(str.substr(pre, i-pre));
                pre = i+1;
            }
        }
        return ans;
    }
    
    TreeNode* deserialize(queue<string>& data) {
        if (data.empty())   return nullptr;
        string first = data.front();
        data.pop();
        if (first == "#")   return nullptr;

        TreeNode* root = new TreeNode(stoi(first));
        root->left = deserialize(data);
        root->right = deserialize(data);

        return root;
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        // 这么做只是为了提前把字符串分开，如果放在后续代码中
        // 会比较冗余
        queue<string> iters = split(data);
        return deserialize(iters);
    }
};

```
后序遍历：序列化较简单，难点在于反序列化，**需要从后往前，且先构造右子树，再构造左子树。**
```cpp
/* 辅助函数，通过 nodes 列表构造二叉树 */ 
TreeNode deserialize(LinkedList<String> nodes){     
    if (nodes.isEmpty()) return null;     
    // 从后往前取出元素         
    String last = nodes.removeLast();     
    if (last.equals(NULL)) 
        return null;         
    TreeNode root = new TreeNode(Integer.parseInt(last));     
    // 限构造右子树，后构造左子树         
    root.right = deserialize(nodes);         
    root.left = deserialize(nodes);     
    return root; 
} 
```
中序遍历：**序列化可以，但是反序列化无解，因为根本找不到根节点啊！！！**
层级遍历：**剑指offer上的经典题型，层级框架如下：**
```cpp
voidtraverse(TreeNode root){ 
    if (root == null) 
        return; 
    // 初始化队列，将 root 加入队列     
    Queue<TreeNode> q = new LinkedList<>();     
    q.offer(root); 
    while (!q.isEmpty()) {         
        TreeNode cur = q.poll(); 
        /* 层级遍历代码位置 */        
        System.out.println(root.val); 
        /*****************/ 
        if (cur.left != null) {             
            q.offer(cur.left);         
        } 
        if (cur.right != null) 
        {             
            q.offer(cur.right);
        }     
    }
} 
```
## [235. 二叉搜索树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/)
![image.png](https://oss1.aistar.cool/elog-offer-now/7de4bb36b533d0e11c6da65d09aedc45.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/b51d335d690d6d26a6a9ac9d394c1a87.png)
## [剑指 Offer 68 - II. 二叉树的最近公共祖先](https://leetcode.cn/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/)
> 参考：[https://mp.weixin.qq.com/s/9RKzBcr3I592spAsuMH45g](https://mp.weixin.qq.com/s/9RKzBcr3I592spAsuMH45g)

![image.png](https://oss1.aistar.cool/elog-offer-now/a3852175c42de9be34ea76afcbe34c86.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/493d840ebc99a30e927a6d96614ff8d3.png)
## [222. 完全二叉树的节点个数](https://leetcode.cn/problems/count-complete-tree-nodes/)
![image.png](https://oss1.aistar.cool/elog-offer-now/ffef1f527016871159a842cef5140221.png)
法一：暴力法，**用dfs或bfs直接搜索**，找到一个节点就++，时间复杂度是O(n);
法二：结合完全二叉树的特性，除了最后一层，**其他层树的节点总数为2^h-1！**简单解释就是，对于每个节点，先求其高度，如果左右高度相同，那么就是满二叉树，节点为2^h-1（根节点的h为1）；**如果不同，则按照普通二叉树的递归解法；**
![image.png](https://oss1.aistar.cool/elog-offer-now/fa2e9e2f5275789d23ce424b28d3466a.png)
> 时间复杂度分析：[https://mp.weixin.qq.com/s/xW2fbE3v4JhMSKfxoxIHBg](https://mp.weixin.qq.com/s/xW2fbE3v4JhMSKfxoxIHBg)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/01ff06230d7fc166ba04c9d6f97f8460.png)

# 多指针
## [剑指 Offer II 022. 链表中环的入口节点](https://leetcode-cn.com/problems/c32eOV/)
> **怎么找入口的问题着实卡了很久，因为不知道怎么推算。后来看到这个答案才知道是具体的过程：**[链接](https://leetcode-cn.com/problems/c32eOV/solution/kuai-man-zhi-zhen-pan-duan-you-wu-huan-b-de2k/)。
> ![image.png](https://oss1.aistar.cool/elog-offer-now/f71aacbcf5d14a6ee8a7fcad3bfdcc01.png)

```cpp
public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode A = head;
        ListNode B = head;
        boolean f = false;
        while(B != null && B.next != null){
            A = A.next;
            B = B.next.next;
            if(A == B) {
                f = true;
                break;
            }
        }
        if(!f) return null; //无环
        A = head;
        while(A != B){
            A = A.next;
            B = B.next;
        }
        return A;
    }
}
```
## [剑指 Offer 22. 链表中倒数第k个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)
> 这道题不难，难的是细节，即到底有没有倒数K个节点？ 即需要实现判断。

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
 //遍历一遍？压入栈，而后出栈
 //或是利用双指针，前者到达末尾节点则后者到达所需要的节点
class Solution {
public:
    ListNode* getKthFromEnd(ListNode* head, int k) {
        if(head==NULL||k==0)//第一/二种情况
            return NULL;
        ListNode* before=head;
        ListNode* behind=head;

        for(int i=0;i<k-1;i++){
            before=before->next;
            if(before==NULL)
                return NULL;
        }

        while(before->next!=NULL){
            before=before->next;
            behind=behind->next;
        }
        return behind;
        
    }
};
```
## [876. 链表的中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/)
> 也是利用快慢指针，细节在于最后的判断，因为链表长度奇偶的不同，会造成中点选择的不同。
> 判断的**依据就是快指针最后指向的是某个节点，还是null。或者直接返回慢指针！**

![image.png](https://oss1.aistar.cool/elog-offer-now/3d87feadf169e17c37ddcf4fa9f68ca6.png)
# 动态规划
> 导读文章：[链接](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484524&idx=1&sn=302941466dbf594709b5436a59f8b06c&source=41#wechat_redirect)

## [53.最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)-easy
> 动态规划；
> 心路历程：先刷了难的在来刷这个，真的是简单。

![image.png](https://oss1.aistar.cool/elog-offer-now/0d1ecf3fe059f4e3c465d0d8d66490df.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/4f8023f298ee6da93132c16038288f09.png)
## [300.最长递增子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)-mid
> 我该怎么设置初始的动态规划表？一维还是二维？
> 我企图用i j来表示区间的最大子序列长度，然而无法列出正确的解答方法。
> 正确的**方法应该是一维的dp数组，dp[i]表示以i结尾的最长子序列长度**，**求dp[i+1]时，从前往后遍历取看哪一个子序列能够接上的即可**：[链接](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484498&idx=1&sn=df58ef249c457dd50ea632f7c2e6e761&chksm=9bd7fa5aaca0734c29bcf7979146359f63f521e3060c2acbf57a4992c887aeebe2a9e4bd8a89&scene=178&cur_album_id=1318881141113536512#rd)（该链接中还有一种利用二分查找的方式进行求解的方法）

![image.png](https://oss1.aistar.cool/elog-offer-now/ee5e454d5da896fd70ea5672ff08b630.png)
## [70.爬楼梯](https://leetcode.cn/problems/climbing-stairs/)-easy
![image.png](https://oss1.aistar.cool/elog-offer-now/ade01f2ebebcd0d3e9600bd953327a24.png)
状态转移方程：f(n) = f(n-1)+f(n-2)，因为n阶既可以是n-1跳上来，也可以是n-2跳上来
![image.png](https://oss1.aistar.cool/elog-offer-now/7a4727047842a268fbbc58462a80681a.png)
初始状态： 1 1 1
## [背包问题](https://blog.csdn.net/qq_38410730/article/details/81667885)
> **背包问题即是在有限的空间内，放入价值最大的商品的问题。**
> 心路历程：
> 想用一维的dp数组来解，发现后面根本无从下手。**所以说状态转移方程和dp数组的含义定义是动态规划问题最难的步骤!**
> **正确的解法是设dp[i][j]为将前i件商品加入到背包容量j中所取得的最大价值**。这样状态转移方程就可以根据第j件商品能不能装得到背包中，来取最大值了。
> **注意计算dp开始的界限，一般dp[0][0]...等都是不用计算的，而是直接从1开始计算，**这是在建立dp数组的时候就考虑到了的。
> `vector<vector<int>> dp(n, vector<int>(target + 1, 0));`
> **详见该题的链接。**
> **拓展：**背包问题的**上述链接解法**不仅包含了求最大值的方法，**还有求最大值解法的商品情形，**即**回溯！**
> **基本思想是利用状态转移方程的特点，反向推导之前的状态，从而确定下选用的商品。**

![image.png](https://oss1.aistar.cool/elog-offer-now/4fa9a26deb5640bbbcfcb5be2cdc1af4.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/8dac5585e30b7a49f97f7b0438229498.png)
**如何回溯？即选择了哪些物品？从状态转移方程入手！**
![image.png](https://oss1.aistar.cool/elog-offer-now/fc4e440b6a714af3041a6694ee900649.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/c2aeed9f01b9e680f3525b855ec50ae5.png)
## [474.一和零（0-1背包）](https://leetcode-cn.com/problems/ones-and-zeroes/)
> 心路历程：
> 这是上面背包问题的进阶版，**不只需要考虑一个背包，需要考虑两个背包（0、1的数量），但是解法是一样的**。
> 先计算每个字符串中01的数量，而后在假设背包包含的情况下，他们可能的状态！
> **参考题解的优化手段（滚动数组）**：[链接](https://leetcode-cn.com/problems/ones-and-zeroes/solution/dong-tai-gui-hua-zhuan-huan-wei-0-1-bei-bao-wen-ti/)

![image.png](https://oss1.aistar.cool/elog-offer-now/ac5e2bb720544c466cf26c83d62ea93c.png)
## [494. 目标和](https://leetcode.cn/problems/target-sum/)-mid
> [https://leetcode.cn/problems/target-sum/solution/mu-biao-he-by-nehzil-x5am/](https://leetcode.cn/problems/target-sum/solution/mu-biao-he-by-nehzil-x5am/)

![image.png](https://oss1.aistar.cool/elog-offer-now/a0dd81145d31e77eba657486ce2bbb9d.png)
**除了可以用DFS之外，还可以转换为0/1背包问题！**
![image.png](https://oss1.aistar.cool/elog-offer-now/b400aaef2db8c04d6ad5b01c0be0d936.png)
## [600.不含连续1的非负整数](https://leetcode.cn/problems/non-negative-integers-without-consecutive-ones/)-hard
![image.png](https://oss1.aistar.cool/elog-offer-now/82afb190e190e22f5147507c5b982ba8.png)
法一：使用dfs：如果是0，那就可以加0加1，如果是1，那就只能加0；
法二：是一种数位求解的题，可以看**这个题解：**[https://leetcode.cn/problems/non-negative-integers-without-consecutive-ones/solution/tong-ge-lai-shua-ti-la-dong-tai-gui-hua-a1b20/](https://leetcode.cn/problems/non-negative-integers-without-consecutive-ones/solution/tong-ge-lai-shua-ti-la-dong-tai-gui-hua-a1b20/)

## [416.分割等和子集](https://leetcode-cn.com/problems/partition-equal-subset-sum/)
> 先求和，和为偶数继续往下走，否则直接返回false；
> 取求和的一半，于是问题就变成能否从数组中取出数的和等于这个一半。
> 这就是一个0-1背包的问题：[链接](https://leetcode-cn.com/problems/partition-equal-subset-sum/solution/0-1-bei-bao-wen-ti-xiang-jie-zhen-dui-ben-ti-de-yo/)


## [72.编辑距离](https://leetcode-cn.com/problems/edit-distance/)
> 动态规划；多指针；
> 心路历程;
> 解不出来，编辑问题的精髓是**从递归到备忘录、动态规划解法，需要一步一步递进式的理解**，否则根本不知道什么意思。
> 在递归中，如何将两个字符串变得一样？从后往前，利用双指针来进行比较，比较之后的操作就是编辑操作（跳过其实也是一种操作），如下图：
> ![](https://oss1.aistar.cool/elog-offer-now/fde1505fbcb5a60309f7a1d59b5ec2f7.webp)
> 在这个动态规划解法中，**我们将dp[i][j]定义成将s1的前i位变成和s2的前j位一样**。
> 详情见[链接](https://mp.weixin.qq.com/s/uWzSvWWI-bWAV3UANBtyOw)，在该解法中，还提到了**另一种保留动态规划选择（之前讲的是回溯）**的方法，那就是自定义一个结构，用它来构造dp数组，在做选择的时候，存储当前的选择。


## [1143.最长公共子序列](https://leetcode-cn.com/problems/longest-common-subsequence/)-mid
![image.png](https://oss1.aistar.cool/elog-offer-now/46d1140dd79e7b3f096c3634553a56b4.png)
心路历程：
刚开始想使用常规方法来解决它，发现根本没有好的思路，遂使用动态规划。
在写动态规划算法的时候，有一个细节问题，**那就是dp数组和字符串的下标是不同的！因为这个问题卡了很久**。
**因为dp[i][j]表示的是，str1的前i字符和str2的前j个字符所组成的最长公共子序列！**
最长公共子序列，又称LCS算法，而且弄出很多的变种。
![image.png](https://oss1.aistar.cool/elog-offer-now/5d19c7fe10fee72d97a95d7fa22adc3f.png)
## [NC127 最长公共子串](https://www.nowcoder.com/practice/f33f5adc55f444baa0e0ca87ad8a6aac?tpId=196&tqId=37132&rp=1&ru=/exam/oj&qru=/exam/oj&sourceUrl=%2Fexam%2Foj%3Fpage%3D1%26pageSize%3D50%26search%3D%25E6%259C%2580%25E9%2595%25BF%25E5%2585%25AC%25E5%2585%25B1%25E5%25AD%2590%25E4%25B8%25B2%26tab%3D%25E7%25AE%2597%25E6%25B3%2595%25E7%25AF%2587%26topicId%3D196&difficulty=undefined&judgeStatus=undefined&tags=&title=%E6%9C%80%E9%95%BF%E5%85%AC%E5%85%B1%E5%AD%90%E4%B8%B2)
![image.png](https://oss1.aistar.cool/elog-offer-now/92974d1ffcfbad7bda8c7eb71611dbe2.png)
跟公共子序列相比，这道题的限定条件更严格，因为它是要求子串，即连续相等！
**dp[i][j]表示以第i、j个字符结尾的，最长子串的长度！（所以i j是从0开始算的）**

## [64.最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/)
![image.png](https://oss1.aistar.cool/elog-offer-now/0c0dec04a5bea4aa06f71671aa5c04ad.png)
解题思路：

- dp[i][j]表示从（0,0）到（i，j）的最短路径和；
- 由于只能向右或者向下走，所以动态转移方程即为dp[i][j]=min(dp[i-1][j]，dp[i][j-1])+map[i][j]。其中map[][]是原地图的数字矩阵
- 而后返回最后的距离dp[n-1][m-1]，可以利用原数组进一步的压缩空间。
- 法二：使用dfs回溯算法，为了加速可以在中途进行min判断。

![image.png](https://oss1.aistar.cool/elog-offer-now/3ee30281169a34ed5fc094af7ead2473.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/9875d8229249ad8a8d61d10d528e3bcd.png)

## [1312.字符串成为回文子串的最小插入数](https://leetcode-cn.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/)-hard
> ![image.png](https://oss1.aistar.cool/elog-offer-now/c89143e9d29ec8ae1871910ace947dbf.png)
> 解题思路：
> - 常规方法无法找到一个合适的解法，并且该题似乎存在子问题，考虑动态规划
> - 在做数学归纳的时候，**遗漏了一种情况（**而且我只考虑到了在**两边插入2次**的情况**），**造成转移方程不对，**这说明在总结状态转移方程时，一定要注意各种情况；**
> - 正确的转移方程应该是`if(s[i]!=s[j]) dp[i][j] = min(dp[i + 1][j], dp[i][j - 1]) + 1;`
> - 即需要做出选择，是先让i+1到j满足回文，还是让i到j-1回文，**而后插入一个字符使得整个区间满足回文**。
> - 这道题的遍历方式也值得推敲，需要**从下到上，从左到右（**因为转移方程的两个依赖项，i+1，j-1**），**详见：[链接](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247486872&idx=1&sn=45b0cf438d3fb140ad6d06e660a7fa4d&chksm=9bd7f390aca07a86c37e440bb9d5fb936be0a1283c781cc2ad867f6e890b2e1ff26545a36158&scene=178&cur_album_id=1318881141113536512#rd)
> 
**思路拓展：**
> - 相当于求最长的**回文子序列（序列不是子串）**，**构不成最长子序列的字符就需要插入相同的。**比如mbadm，其中最长回文子序列为mam长度为3，因此需要插入5-3=2次，见答案：[链接](https://leetcode-cn.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/comments/405084)
> - 也相当于LCS问题（最长公共子序列），只不过是在一个字符串的头和尾进行比较，可以先看看**最长公共子序列，**再来想怎么解决这个问题：[链接](https://leetcode-cn.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/comments/1097989)

## [55.游戏跳跃](https://leetcode.cn/problems/jump-game/submissions/)
![image.png](https://oss1.aistar.cool/elog-offer-now/a12c97b9e979e6600412c69c8e8a2cbd.png)
每个下标能跳的次数要么**是之前跳到这的距离-1， 要么是当前自己能跳的距离，取两者中的最大值**。
**一旦出现某个dp==0，表示跳不动了**。
![image.png](https://oss1.aistar.cool/elog-offer-now/f7248f6bbd43ae27c6f675513047b936.png)
## [45.跳跃游戏II](https://leetcode.cn/problems/jump-game-ii/)
![image.png](https://oss1.aistar.cool/elog-offer-now/30aebff0dbd5898b06733bda988c9bc9.png)
**最好是用贪心算法！ 每次都想在自己能跳的范围内，找一个下一次能跳的最远距离！**
![image.png](https://oss1.aistar.cool/elog-offer-now/47824a148c6c98d6e315a24cb11e346c.png)
# 贪心算法
> 贪心，是将每一步都设置为最优的方式来求取最优解的办法。

## [517.超级洗衣机](https://leetcode-cn.com/problems/super-washing-machines/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/19cb22f7d901ba582d380b162000e2ab.png)
> 解题思路：
> - 一开始我的思路想岔了，跟困难题不符，**我理解为一步之内衣服可以连续传送**；
> - 看了三叶的题解:[链接](https://leetcode-cn.com/problems/super-washing-machines/solution/gong-shui-san-xie-noxiang-xin-ke-xue-xi-mzqia/)
> - 才明白，**要求的是每个洗衣机传递衣服数量的最大值**
> - 对于每一个洗衣机而言：**其最优的传递衣服数量应该等于起始时左边衣服总量与最终左边衣服总量的差值**+**起始时右边衣服总量与最终右边衣服总量的差值。**
> - 于是解题方法应该是遍历整个数列，而后求取**每个点向左右传递的数量之和**。

# 链表
## [21.合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)
> 链表；
> ![image.png](https://oss1.aistar.cool/elog-offer-now/cb3b2003bae6ca033e0c429ea35b32e0.png)
> 心路历程：
> 这道题说是中等题也不为过，由于题干要求利用上述的节点进行拼接，因此不能使用创建新节点的方式来返回链表。
> 而且合并链表时一定要记住，对链表节点的操作，**就是对指针的操作**，何时应该修改原变量、何时应该修改临时变量，都是细节。
> 建议看这个答案的写法，简答自然：[链接](https://leetcode-cn.com/problems/merge-two-sorted-lists/solution/xiang-qing-wen-yi-xia-listnode-headansde-ky9m/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/0e9dd8675f540acae55c61a4ce0efb36.png)

```cpp
//递归
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if(l1 == null) {
            return l2;
        }
        if(l2 == null) {
            return l1;
        }

        if(l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    }
}
```
## [23.合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)
> 心路历程：
> 这道题是上一道题的进阶版本，难点在于如何选择下一个最小节点？ 如果每次都去比，时间效率太低，而这种排序问题，可以直接使用**堆排序来实现**，**在C++和Java中就是优先队列**。
> **知识拓展：**
> C++如何使用Priority_queue?对于普通类型，**默认是大顶堆（普通类型使用greater<int>构造小顶堆）**，如果要实现小顶堆，或者是自定义类型，那就需要**重载运算符或者写一个仿函数，注意小顶堆和大顶堆在重载或者仿函数中的分别是>和<，**参考[链接](https://blog.csdn.net/lightindarkness/article/details/105501748)

## [725.分割链表](https://leetcode-cn.com/problems/split-linked-list-in-parts/)-mid
> ![image.png](https://oss1.aistar.cool/elog-offer-now/3d917bdc877ed2a38cc996de8edea549.png)
> 心路历程;
> 思路倒是很简单，写的时候还是卡在了细节：**如果链表的节点数目小于分组数怎么办？要设置为nullptr**；这要么通过前置处理全部设置为nullptr，要么后置处理。剩下的就是对链表节点的操作。
> **分割多长？先求长度size，除以k，例如3/5=0，%3，表示每个长度为0，前3个长度增加1！**
> 


```cpp
class Solution {
public:
    vector<ListNode*> splitListToParts(ListNode* head, int k) {
        int count=0;
        ListNode* tempNode=head;
        while(tempNode!=nullptr){
            count++;
            tempNode=tempNode->next;
        }
        
        int limit=count/k;
        int extra=count%k;

        vector<ListNode*> res;
        tempNode=nullptr;
        ListNode* tempHead=nullptr;
        ListNode* cur=head;

        int valid=0;
        while(cur!=nullptr){
            for(int i=0;i<limit;i++){
                if(!tempHead){
                    tempHead=cur;
                }
                tempNode=cur;
                cur=cur->next;
            }
            
            //额外的长度
            if(valid<extra){
                if(!tempHead){
                    tempHead=cur;
                }
                tempNode=cur;
                cur=cur->next;
                valid++;
            }
            
                //处理了几个额外的
            tempNode->next=nullptr;
            res.push_back(tempHead);
            tempHead=nullptr;
        }
        for(int i=0;i<k-count;i++){
            tempHead=nullptr;
            res.push_back(tempHead);
        }
        return res;
    }
};
```
# 深度优先/回溯算法（DFS）
## 模板
> 何时使用DFS算法？
> ——存在多种选择的可能性，且需要排除其中不需要的选择。
> **DFS算法的框架如下**：
> - **路径**，即已经做出的选择；
> - **选择列表**，即将要做出的选择；
> - **结束条件**，所有选择已结束；
> - 总结：![image.png](https://oss1.aistar.cool/elog-offer-now/5127a9242c30c51563e6e95c33ba5661.png)

## [46. 全排列](https://leetcode-cn.com/problems/permutations/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/f10026a867add0994f9b8596b1e2e893.png)
> 解题思路：
> - 画一下递归树可以知道，全排列可以看成每次从一个集合中挑选一个数，而后继续进行排列；
> - 因此按照DFS的框架，确定条件是所取的数目==全部数字的数目，则返回
> - 而后开始执行撤销操作
> - **写代码的时候将返回和撤销的操作写反了，注意，不管条件是不是满足，最后都会执行返回操作的！**

```cpp
//DFS算法
//路径 选择 结束条件
class Solution {
private:
    vector<vector<int>>res;
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<int>flag(nums.size(),0);
        vector<int>temp;
        help(nums,temp,flag);
        return res;
    }

    void help(vector<int>&nums,vector<int>&temp,vector<int>&flag){
        //满足条件返回
        if(temp.size()==nums.size()){
                res.push_back(temp);
                return;
            }

        for (int i=0;i<nums.size();i++){
            if(flag[i]==1){
                continue;                
            }
            flag[i]=1;
            temp.push_back(nums[i]);
            help(nums,temp,flag);   

            flag[i]=0;
            temp.pop_back();
        }
        return;
    }
};
```
## [八皇后](https://leetcode-cn.com/problems/eight-queens-lcci/)（打印结果）
> ![image.png](https://oss1.aistar.cool/elog-offer-now/e3355ccc393d85e32674df5b610dcc3f.png)
> 解题思路：
> - 以行列遍历，ij设为选中的坐标
> - 如果满足条件isValid，则可以尝试放置一个棋子
> - 当选中的坐标数等于所求的行数时，即可增加一个结果，同时回撤当前选择，尝试之前的选择
> - 最后递归到入口进行输出
> - **这玩意的难点是递归函数的设置，哪些要作为入口参数变量，哪些不用，**这个只能不停的尝试，**尽可能参数最小化，那就不会错。**
> - **而且我的写法超时了，看对方的答案吧，就是我的风格：**[链接](https://leetcode-cn.com/problems/n-queens-ii/solution/zhi-you-wo-yi-ge-ren-jue-de-li-kou-ba-ti-hao-gao-f/)

```cpp
class Solution {
public:
    vector<vector<string>> res;
    vector<vector<string>> solveNQueens(int n) {
        vector<int> pre;
        dfs(n,0,pre);
        return res;
    }
    
    void dfs(int n,int index,vector<int> &pre){
        if(index==n){
            // 这个思路很好啊，将其他的全部初始化为'.'
            vector<string> ans(n,string(n,'.'));
            for(int i=0;i<n;i++){
                ans[i][pre[i]]='Q';
            }
            res.push_back(ans);
            return;
        }
        for(int i=0;i<n;i++){
            if(isValid(n,index,i,pre)){
                pre.push_back(i);
                dfs(n,index+1,pre);
                pre.pop_back();
            } 
        }
    }
    
    // 判断这个位置，能不放置皇后
    bool isValid(int n,int index,int num,vector<int> &pre){
        int prenum=pre.size();
        for(int i=0;i<prenum;i++){
            if(num==pre[i] || abs(num-pre[i])==index-i)//这个判断对角线的方式太秀了！！
                return false;
        }
        return true;
    }
};
```
## [52. N皇后 II](https://leetcode-cn.com/problems/n-queens-ii/)
![image.png](https://oss1.aistar.cool/elog-offer-now/0a0a41070deb16f379198694e98ea2c1.png)
```cpp
class Solution {
public:
    int N;
    int total=0;
    int totalNQueens(int n) {
        N=n;
        vector<int> ans(n);
        find(0,ans);
        return total;
    }
    void find(int n,vector<int> &ans)
    {
        if(n==N) 
        {
            //cout<<"1"<<endl;
            total++;
            return;
        }
        
        for(int i=0;i<N;i++)
        {
            int ok=1;
            for(int j=0;j<n;j++)
            {
                //由于是按照行遍历，皇后只可能列相同
                if(ans[j]==i || abs(ans[j]-i)==abs(j-n))//在一对角上或者在一行上
                    //其计算方式简单理解为：将上一个皇后的坐标行数减去当前行数
                    // 看是否与当前位置坐标列数减去当前列数相等
                {
                    ok=0;
                    break;
                }
 
            }
            if(ok)//没有冲突
                {
                    ans[n]=i;
                    find(n+1,ans);
                }
        }
    }
};
```
## [剑指 Offer 12. 矩阵中的路径](https://leetcode.cn/problems/ju-zhen-zhong-de-lu-jing-lcof/)
![image.png](https://oss1.aistar.cool/elog-offer-now/2cb924fe9247b4ed644a7fc55405efb8.png)
**解法：**使用dfs，对每一个候选点的上下左右进行辐射，如果有合适的，则进行下一步迭代。
注意，在dfs中，一定要想清楚使用什么作为变量是最好的结果！**比如这道题，当前点的坐标i、j才是一个合理的变量**。
```cpp

class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {

        if(word.empty()) return false;
        for(int i=0; i<board.size(); ++i)
        {
            for(int j=0; j<board[0].size(); ++j)
            {
                // 使用回溯法解题
                if(dfs(board, word, i, j, 0)) return true;
            }
        }
        return false;
    }
    bool dfs(vector<vector<char>>& board, string& word, int i, int j, int w)
    {
        // 如果索引越界，或者值不匹配，返回false
        if(i<0 || i>=board.size() 
           || j<0 || j>=board[0].size() || board[i][j]!=word[w]) 
            return false;
        if(w == word.length() - 1) return true; //为什么是长度-1，因为是数组下标！从1开始的！

        //暂存当前元素
        char temp = board[i][j];
        //这种方式可以实现原地判断，很方便
        board[i][j] = '\0'; // 将当前元素标记为'\0'，即一个不可能出现在word里的元素，表明当前元素不可再参与比较
        if(dfs(board,word,i-1,j,w+1) 
        || dfs(board,word,i+1,j,w+1) 
        || dfs(board,word,i,j-1,w+1) 
        || dfs(board,word,i,j+1,w+1))
        {
            // 当前元素的上下左右，如果有匹配到的，返回true
            return true;
        }
        board[i][j] = temp; // 将当前元素恢复回其本身值
        return false;
    }
};
```
# 广度优先（BFS）
> 何时使用BFS？
> 从一个起点到达一个终点，**求最短路径问题**，有很大的空间开销，但是时间开销（平均/最好/最坏）是固定的。（其实是一种图的遍历）
> **核心思想是利用队列，遍历队列，将某一点周围的点放到队列中**。
> 另外，在某些时候BFS比DFS更快，因为BFS是以迭代的方式全部并行进行，**而DFS需要通过递归一个一个返回**。
> 代码框架如下：
> ![图片1.png](https://oss1.aistar.cool/elog-offer-now/05fc61a38374d4e395996f0269833f09.png)

## [111.二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/74f8224d8a3a1affe682e050d4edf307.png)
> 解题思路：
> - 先将根节点入队
> - 由于我们所求的是最短路径，因此需要一个**变量size来存储当前队列中节点的数量**
> - **这个节点数量，就是这一层的节点**，**当这一层的节点全部出队，并将其左右节点放入队列中时，length++**，进入**下一层的遍历；**
> - 遇到**左右子节点都为null的即为叶子节点，退出即可**。
> 
知识补充：
> **C++中队列queue，队首是front，压入是push，弹出是pop，获取size，是否为空empty**：[链接](https://www.cnblogs.com/yoke/p/6080092.html)

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
 // bfs
class Solution {
public:
    int minDepth(TreeNode* root) {
        if(root==nullptr){
            return 0;
        }

        int high=0; //进去一次就是0哦
        queue<TreeNode*> queue;
        queue.push(root);
        
        while(!queue.empty()){
            int tempsize=queue.size();
            high++;
            for(int i =0;i<tempsize;i++){
                TreeNode* tempNode=queue.front();
                queue.pop();
                if(tempNode->left==nullptr&&tempNode->right==nullptr){
                    return high;
                }
                if (tempNode->left!=nullptr)
                    queue.push(tempNode->left);
                if (tempNode->right!=nullptr)
                    queue.push(tempNode->right);
            }
        }
        return high;
    }
};
```
## [752.打开转盘锁](https://leetcode-cn.com/problems/open-the-lock/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/9ccd7fdfa2efdfd2a491ac22b8cae354.png)
> **解题思路**：
> - 从题意上，**是求最短路径问题，可以考虑采用BFS算法**
> - 而后发现可选择的地方：**4个号码位，增加还是减少**
> - 所以基于BFS算法进行求解，当中途的号码命中死亡号码时，**说明不能进行这步操作直接continue**，放弃当前的选择；**否则，继续将最新的号码放入队列中，直到命中target；**
> - **注意：**为了减少计算重复的中间号码**，需要维护一个set，一旦之前已经出现了，就不再对其进行测试。**
> - 答案参考：[链接](https://leetcode-cn.com/problems/open-the-lock/solution/da-kai-zhuan-pan-suo-bfs-by-zxhnext-671m/)
> - **方法拓展**：在计算某一位上下移动的字符时，**可以利用这种方式简化计算：**`**char a = (curr[j] -'0' + 10 + t) % 10 + '0';**`**，实现‘0’到’9‘的完美转换。**

```cpp
class Solution {
public:
    // 将 s[j] 向上拨动一次
    string plusOne(string s, int j) {
        if (s[j] == '9')
            s[j] = '0';
        else
            s[j] += 1;
        return s;
    }
    // 将 s[i] 向下拨动一次
    string minusOne(string s, int j) {
        if (s[j] == '0')
            s[j] = '9';
        else
            s[j] -= 1;
        return s;
    }

// BFS 框架，打印出所有可能的密
    int openLock(vector<string>& deadends, string target) {
        // 记录需要跳过的死亡密码
    set<string> deads;
    for (string s : deadends) deads.insert(s);
    // 记录已经穷举过的密码，防止走回头路
    set<string> visited;
    queue<string> q;
    // 从起点开始启动广度优先搜索
    int step = 0;
    q.push("0000");
    visited.insert("0000");

    while (!q.empty()) {
        int sz = q.size();
        /* 将当前队列中的所有节点向周围扩散 */
        for (int i = 0; i < sz; i++) {
            string cur = q.front();
            q.pop();
            /* 判断是否到达终点 */
            if (deads.count(cur))
                continue;
            if (cur==target)
                return step;

            /* 将一个节点的未遍历相邻节点加入队列 */
            for (int j = 0; j < 4; j++) {
                string up = plusOne(cur, j);
                if (!visited.count(up)) {
                    q.push(up);
                    visited.insert(up);
                }
                string down = minusOne(cur, j);
                if (!visited.count(down)) {
                    q.push(down);
                    visited.insert(down);
                }
            }
        }
        /* 在这里增加步数 */
        step++;
    }
    // 如果穷举完都没找到目标密码，那就是找不到了
    return -1;
    }
};
```
> **思路拓展**：
> 这道题**可以用双向BFS，同时从起点和终点开始遍历，并且每次查询自己的中间号码是否在对方的set中出现，一旦出现相同的，则说明已经找到咯！**
> 只在**知道起点和终点的情况下双向BFS算法，**不再使用队列**，而是用hash表或者set**，**这样可以快速判断两者间是否有交集**！

```cpp
/*class Solution {
public:
    // 将 s[j] 向上拨动一次
    string plusOne(string s, int j) {
        if (s[j] == '9')
            s[j] = '0';
        else
            s[j] += 1;
        return s;
    }
    // 将 s[i] 向下拨动一次
    string minusOne(string s, int j) {
        if (s[j] == '0')
            s[j] = '9';
        else
            s[j] -= 1;
        return s;
    }

// BFS 框架，打印出所有可能的密
    int openLock(vector<string>& deadends, string target) {
        // 记录需要跳过的死亡密码
    set<string> deads;
    for (string s : deadends) deads.insert(s);
    // 记录已经穷举过的密码，防止走回头路
    set<string> visited;
    queue<string> q;
    // 从起点开始启动广度优先搜索
    int step = 0;
    q.push("0000");
    visited.insert("0000");

    while (!q.empty()) {
        int sz = q.size();
        // 将当前队列中的所有节点向周围扩散 
        for (int i = 0; i < sz; i++) {
            string cur = q.front();
            q.pop();
            // 判断是否到达终点 
            if (deads.count(cur))
                continue;
            if (cur==target)
                return step;

            // 将一个节点的未遍历相邻节点加入队列 
            for (int j = 0; j < 4; j++) {
                string up = plusOne(cur, j);
                if (!visited.count(up)) {
                    q.push(up);
                    visited.insert(up);
                }
                string down = minusOne(cur, j);
                if (!visited.count(down)) {
                    q.push(down);
                    visited.insert(down);
                }
            }
        }
        // 在这里增加步数 
        step++;
    }
    // 如果穷举完都没找到目标密码，那就是找不到了
    return -1;
    }
};*/
//双向BFS
class Solution {
public:
    // 将 s[j] 向上拨动一次
    string plusOne(string s, int j) {
        if (s[j] == '9')
            s[j] = '0';
        else
            s[j] += 1;
        return s;
    }
    // 将 s[i] 向下拨动一次
    string minusOne(string s, int j) {
        if (s[j] == '0')
            s[j] = '9';
        else
            s[j] -= 1;
        return s;
    }

// BFS 框架，打印出所有可能的密
    int openLock(vector<string>& deadends, string target) {
        // 记录需要跳过的死亡密码
    set<string> deads;
    for (string s : deadends) deads.insert(s);
    // 记录已经穷举过的密码，防止走回头路
    set<string> visited;
    set<string> q1;//从根节点出发
    set<string> q2;//从目标（target）节点出发
    // 从起点开始启动广度优先搜索
    int step = 0;
    q1.insert("0000");
    q2.insert(target);
    visited.insert("0000");

    while (!q1.empty()&&!q2.empty()) {
        set<string>temp;
        for(auto cur:q1){
            if(deads.count(cur))
                continue;
            if(q2.count(cur))
                return step;
        
            visited.insert(cur);
        // 将一个节点的未遍历相邻节点加入队列 
            for (int j = 0; j < 4; j++) {
                string up = plusOne(cur, j);
                if (!visited.count(up)) {
                    temp.insert(up);
                }
                string down = minusOne(cur, j);
                if (!visited.count(down)) {
                    temp.insert(down);;
                }
            }
        }
        // 在这里增加步数 
        step++;
        q1=q2;
        q2=temp;
    }
    // 如果穷举完都没找到目标密码，那就是找不到了
    return -1;
    }
};
```
# 单调栈
> **什么时候使用单调栈？**
> - 比当前元素更大的下一个元素
> - 比当前元素更大的前一个元素
> - 比当前元素更小的下一个元素
> - 比当前元素更小的前一个元素
> 
参考[链接](https://blog.csdn.net/qq_17550379/article/details/86519771)

## [739.每日温度](https://leetcode-cn.com/problems/daily-temperatures/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/671add93c68bc762416a6fbd340d2fcf.png)
> 单调栈
> 解题思路：
> - 单调栈——往里面压入什么？压入坐标
> - 每次遍历到**新的温度时，和栈顶元素比较**，如果**比栈顶元素大**，那么根**据栈顶元素的下标就可以计算天数**，而后将其弹出，**继续比较栈顶，如此反复**
> - 而后**弹栈中所有元素，设为0**，答案参考：[739.每日温度](https://leetcode-cn.com/problems/daily-temperatures/)

## [496. 下一个更大元素 I](https://leetcode-cn.com/problems/next-greater-element-i/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/9806a9fbb73ef225e2fb33a03ea87cb0.png)
> 单调栈；
> 解题思路：
> - 利用一个hashmap**保存nums1中出现的数以及对应的下标**
> - 利用单调栈，**遍历nums2，并利用上一个hashmap去查询对应的下标并保存**
> - 如果**hashmap中有该数，就压入栈中**
> - 答案参考：[链接](https://leetcode-cn.com/problems/next-greater-element-i/)

## [503. 下一个更大元素 II](https://leetcode-cn.com/problems/next-greater-element-ii/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/ce872757af27b0fdf9ab19962ae38197.png)
> 单调栈；
> 解题思路：
> - 先用单调递减栈来保存数据，之前的流程跟普通单调栈一样
> - 当**遍历一遍数组之后，如果当前栈还有数据，那就再次遍历一遍数据**
> - 如果**当前栈还有数据，那就置位-1**
> - 一种将遍历长度设置为2n，下标为index=i%n，这样相当于将两次遍历合二为一，参考：[链接](https://leetcode-cn.com/problems/next-greater-element-ii/comments/92706)


## [42.接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/3044234a521986c79b4df458d101626f.png)
> 解题思路：
> - 这道题其实有两种思路：**一行一行的累加，或者一列一列的累加。**[链接](https://leetcode-cn.com/problems/trapping-rain-water/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-w-8/)
> - **行的累加**![image.png](https://oss1.aistar.cool/elog-offer-now/7f36bf0fda602e45524a21e41bfc9b3e.png)即求每一行的水
> - **列的累加**![image.png](https://oss1.aistar.cool/elog-offer-now/560578b4a2326a6ac13ffe2841deba59.png)即求当前列可以存多少水
> - 列的方法本质上是**寻找某一点左右的最低边界，那么可存储的水就是最低边界与当前值的差值**
> - **暴力方式**：遍历每一点，并求左右的最高边界，时间复杂度O2n
> - **（简化方式：）动态规划**：分别从左从右遍历一次，取小标i的左右最大值，时间复杂度O(n)优化上述求点的过程，不能每次求两侧最大值的时候都使用遍历的方式，**因此采用dp数组来保存i的左右最大值，而后动态更新即可**
> - **双指针**：是对动态规划的空间压缩，**只使用两个变量来保存左右最大值**，过程极其巧妙[链接](https://leetcode-cn.com/problems/trapping-rain-water/solution/jie-yu-shui-by-leetcode/327718)
> - **单调栈**：单调递减栈，其实底层思路还是求某一个点两边的最大值，**不过需要乘以距离，因为有多格！**
> - **参考**[链接](https://leetcode-cn.com/problems/trapping-rain-water/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-w-8/)

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        if(n < 2)
            return 0;
        vector<int> left_max(n);
        vector<int> right_max(n);
        left_max[0] = height[0];
        right_max[n - 1] = height[n - 1];
        for(int i = 1; i < n; i ++)
            left_max[i] = max(left_max[i - 1], height[i]);
        for(int i = n - 2; i >= 0; i --)
            right_max[i] = max(right_max[i + 1], height[i]);
        int ans = 0;
        for(int i = 0; i < n; i ++)
            ans += min(left_max[i], right_max[i]) - height[i];
        return ans;
    }
};

```
## [407. 接雨水 II](https://leetcode.cn/problems/trapping-rain-water-ii/)
![image.png](https://oss1.aistar.cool/elog-offer-now/94e5acfb8faa88df5128ec9481163d22.png)
三维的接雨水，我们同样可以使用堆来求解，同二维的接雨水一样，我们先让边界上的点入堆，然后弹出高度最小者，再通过这个点向上下左右四个方向探测，如果上下左右有比当前位置低的点，说明可以注水，且注的水不会流出，正确性证明类似二维接雨水。
链接：[https://leetcode.cn/problems/trapping-rain-water-ii/solution/tong-ge-lai-shua-ti-la-qing-xi-si-lu-con-mu9n/](https://leetcode.cn/problems/trapping-rain-water-ii/solution/tong-ge-lai-shua-ti-la-qing-xi-si-lu-con-mu9n/)
## [求最大01子矩阵的面积大小](https://blog.csdn.net/weixin_44406146/article/details/103714582)
> 这是我在**企业微信面试中试遇到的问题**，当时没有想明白的是怎么回事，**又是怎么利用单调栈来解决的。**
> 题目如下：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/d7ea85d83d9b9e20335f9b0ea3ebdf90.png)
> **思路解析：**
> - 对每一行进行分割，而后分别求以当前行为底的一个面积。
> - 如果某一行有0，那么当前的行height数组就是0，如果是1，那就height++
> - 最后问题的关键就在于，如何从一个height数组，**来求取相应的面积大小，即求直方图所构成的大小**。
> - 第一种解法，最直观，那就是对每一个坐标的左右分别去寻找，小于它的下标值；
> - 第二种解法，**利用单调栈去简化第一种解法**；
> - 要注意，采用单调栈时，每一次计算面积时并不一定是当前下标的真正最大值，只不过会被后面的面积覆盖，最后结果整体不会错而已
> - 详情可看：[链接](https://hanquan.blog.csdn.net/article/details/110670125)
> - **之前有个疑惑：**为什么要使用两次单调栈，第二次单调栈是为了清空栈，此时其中的高度是递增的。

## [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)
![image.png](https://oss1.aistar.cool/elog-offer-now/b5d165c4833c57ead0049c1ddea38ab3.png)
解题思路：左括号全部压栈，出现右括号就看栈顶元素是否匹配，否则就不匹配

## [进阶：22.括号生成](https://leetcode-cn.com/problems/generate-parentheses/)
![image.png](https://oss1.aistar.cool/elog-offer-now/e77643bfee75ee1096f91132576672b0.png)
解题思路：

- 排列组合加栈：排列组合，并用栈来判断是否可以插入右括号
- 排列组合加规律：发现一个特点，那就是最后的结果必须左括号数量等于右括号数量，并且等于需要的括号数[链接](https://leetcode-cn.com/problems/generate-parentheses/solution/22-gua-hao-sheng-cheng-shen-du-you-xian-aendi/)
## 区间相关
区间相关类的题型，包括**区间覆盖、区间删除**等，关键就在于**如何对区间进行排序**。
对区间的排序又分为从**起点排序或**从**终点排序**，区间之间有以下三种情况：
![image.png](https://oss1.aistar.cool/elog-offer-now/4f7238fb0c90b4195abf6d30341f3bcc.png)
对于区间覆盖类问题，面对以上三种情况：
对于情况一，找到了**覆盖区间**。
对于情况二，两个区间可以**合并，成一个大区间**。
对于情况三，两个区间**完全不相交**。
之后的区间合并、删除都是基于这三种情况的不同处理而已。
> 详情可见：[https://mp.weixin.qq.com/s/Eb6ewVajH56cUlY9LetRJw](https://mp.weixin.qq.com/s/Eb6ewVajH56cUlY9LetRJw)

## [1288.删除被覆盖的区间](https://leetcode-cn.com/problems/remove-covered-intervals/submissions/)
![image.png](https://oss1.aistar.cool/elog-offer-now/c64f8fc94fe0029c5f5041a1936bc27c.png)
解法：先根据开端进行排序，**而后遍历，看两者的左右是否被覆盖。**
**这里只需要比较右边，因为左边已经按照大小进行排序了！**
```cpp
class Solution {
public:
    int removeCoveredIntervals(vector<vector<int>>& intervals) {
        int n = intervals.size();
        sort(intervals.begin(), intervals.end(), [](const vector<int>& u, const vector<int>& v) {    return u[0] < v[0] || (u[0] == v[0] && u[1] > v[1]);});
        
        int ans = n;
        int rmax = intervals[0][1];
        for (int i = 1; i < n; ++i) {
        //为什么只判断右边界？
        //因为上一个区间的左边界必定小于下一个区间的左边界！
        //因此只要右边界被包含，那么必定区间被覆盖
            if (intervals[i][1] <= rmax) {
                --ans;
            }
            else {
                rmax = max(rmax, intervals[i][1]);
            }
        }
        return ans;
    }
};
```
## [56.合并区间](https://leetcode-cn.com/problems/merge-intervals/submissions/)
![image.png](https://oss1.aistar.cool/elog-offer-now/eeb6bce21a56dd0dded1b9b119831a16.png)
> Ps：**按照区间起点升序排列，开头就是最小的，结尾就是重合区间最大的**。

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        vector<vector<int>> res;
        vector<int> tmp = {0, 0};//tmp第一个元素表示区间起始位置，第二元素表示终点位置
        sort(intervals.begin(), intervals.end());  //这里排序会按照第一个数大小排，若大小相等再按照第二个数排

        tmp = intervals[0];            //初始化第一个区间
        for (int i = 1; i < intervals.size(); i ++ )    //遍历所有区间
        {
            if (tmp[1] < intervals[i][0])  //合并区间的右端点小于当前区间左端点，说明不能合并当前区间
            {
                res.push_back(tmp);     //已经合并完一个区间
                tmp = intervals[i];    //初始化新区间
            }
            else
            {
                tmp[1] = max(tmp[1], intervals[i][1]);//合并区间的右端点大于当前区间左端点，说明可以合并当前区间
            } //这里合并只需要修改右端点即可，即右端点取最大值
        }
        res.push_back(tmp);           //扫尾
        return res;
    }
};
```
## [986.区间列表的交集](https://leetcode-cn.com/problems/interval-list-intersections/submissions/)
![image.png](https://oss1.aistar.cool/elog-offer-now/00c69bf626605da6ddc7507b8f082287.png)
## [57.插入区间](https://leetcode-cn.com/problems/insert-interval/)
> PS：这是从相反的方向解决问题；

```cpp
vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        int left = newInterval[0];
        int right = newInterval[1];
        bool placed = false;
        vector<vector<int>> ans;
        //只有这么三种情况：
        //相交
        //在左
        //在右，依次判断即可
        for (const auto& interval: intervals) {
            if (interval[0] > right) {
                // 在插入区间的右侧且无交集
                if (!placed) {
                    ans.push_back({left, right});
                    placed = true;                    
                }
                ans.push_back(interval);
            }
            else if (interval[1] < left) {
                // 在插入区间的左侧且无交集
                ans.push_back(interval);
            }
            else {
                // 与插入区间有交集，计算它们的并集
                left = min(left, interval[0]);
                right = max(right, interval[1]);
            }
        }
        if (!placed) {
            ans.push_back({left, right});
        }
        return ans;
    }

```
### 2）回文串（字符串/链表）
**思路：**
判断字符串是否回文？**直接两端往中心收缩，比较即可**；
判断链表是否回文？要么新建一个反向链表而后一一比对，要么利用**递归实现该功能（利用二叉树后续遍历的思想实现链表的后续遍历）**，见下：（**tips：二叉树的前中后序遍历是如何实现的呢？迭代？递归？**）
```cpp
// 左侧指针
ListNode left;
booleanisPalindrome(ListNode head){
    left = head;
return traverse(head);
}
booleantraverse(ListNode right){
if (right == null) return true;
boolean res = traverse(right.next);
// 后序遍历代码
    res = res && (right.val == left.val);
    left = left.next;
return res;
}
```
这样实现的意义何在？其实就是**利用递归，将链表的节点存储在栈中，而后一一取出即可**（left=left.next就进行从头至尾的比较）
PS：上述解法可以进一步压缩空间，先使用**快慢指针寻找中点（tips：如何寻找呢？快慢指针有什么用呢？（详见6.8）），**而后将中点之后的链表反转，比较头结点和中点开始的链表即可。
**链接：**
[https://mp.weixin.qq.com/s/tCgEoOlZKS_ohuTx1VxJ-Q](https://mp.weixin.qq.com/s/tCgEoOlZKS_ohuTx1VxJ-Q)
[234.回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)
## [409.最长回文串](https://leetcode-cn.com/problems/longest-palindrome/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/4023e397e9dea65a9007ca3a1671de8c.png)
> 回文串；动态规划；
> 解题思路：
> - 中心扩张，选中任何一个为中点，向两边扩展，如果两边的字符相等，则继续扩展，否则，更新结果；
> - 细节在于回文长度可能为**奇数也可能为偶数**，这就造成中心点的坐标选择问题，一是在选点的时候看i与i+1的字符是否相等来微调；二是参考这个答案：[链接](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484471&idx=1&sn=7c26d04a1f035770920d31377a1ebd42&chksm=9bd7fa3faca07329189e9e8b51e1a665166946b66b8e8978299ba96d5f2c0d3eafa7db08b681&scene=21#wechat_redirect)


## [516.最长回文子序列](https://leetcode-cn.com/problems/longest-palindromic-subsequence/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/ad161776a101228ce95402c8d973b430.png)
> 解题思路：
> - 跟求回文子串有很多相似的地方
> - 这么来思考：**假设已知dp[i+1]和dp[j-1]，如何求dp[i][j]**？很明显，跟s[i]  s[j]有关
> - 如果两者相等，那自然就是子问题+2；
> - 如果两者不等，那就需要做出取舍**s[i]  s[j]不能同时位于一个子序列中，**那个子区间最大，就取哪个，于是
> 
`dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);`
> - 参考[链接](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484666&idx=1&sn=e3305be9513eaa16f7f1568c0892a468&chksm=9bd7faf2aca073e4f08332a706b7c10af877fee3993aac4dae86d05783d3d0df31844287104e&scene=21#wechat_redirect)


## [234.回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/444532885275325c3bea9c15b6a6d323.png)
> 回文串；链表；
> 解题思路：
> - 依次压入栈中，依次弹出比对
> - **仿照二叉树后序遍历的思路，**借助递归来实现上述栈的效果，参考[链接](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484822&idx=1&sn=44742c9a3557038c8da7150100d94db9&chksm=9bd7fb9eaca0728876e1146306a09f5453bcd5c35c4a264304ea6189faa83ec12a00322f0246&scene=21#wechat_redirect)
> - 还有一种方式，**利用快慢指针，找到中点，分割链表，而后反转中点之后的链表**，这样就可以进行比对。



# 反转链表
> 反转链表，有两种通用解法：**递归返回头结点；迭代两相背刺；**


## [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/97d345456069e80764fb4e03b43dc7d3.png)
> 反转链表；
> 解题思路：
> - **递归的方式：**理解递归的重点就是**明白递归函数的作用**，比如反转链表以递归实现如下：![image.png](https://oss1.aistar.cool/elog-offer-now/6ddd473df48c61a0b49818f56310deb2.png) 若是直接跳进递归的逻辑中，云山雾绕，很难理解。
> - 想想 reverse作用是什么？ **传入一个链表头节点，返回反转过后的头结点，并将这个新的头结点last，一直return回去**。
> - **迭代的方式：**基本思路是保存**当前节点的前后节点**，并令**当前节点的next指向其前节点（俗称，背刺！）**，依次背刺**上一节点直到当前节点的next为null即可**，**返回当前节点**。核心代码如下：![image.png](https://oss1.aistar.cool/elog-offer-now/c6b420609675659d34a1fda2dc6fdf7a.png)
> - 


变种：反转链表前N个节点
> 其实在上一道题的基础上改一下就好。
> 解题思路：
> - 首先遍历一遍，看看长度够不够N，不够直接返回失败；
> - **递归的方式：增加一个全局变量，**表示进入递归的次数，而后保存N个节点之后的第N+1个节点的指针，因为我们需要将两部分链表连接起来；![image.png](https://oss1.aistar.cool/elog-offer-now/c32bb054c71e91c58d3da477fde0bd07.png)
> - **迭代的方式：**同上，也是需要保存第N+1个节点的指针；


## [92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/d226041a808ab99548b74e5f08b6bdea.png)
> 反转链表；递归
> 解题思路：
> - 这道题，最终需要将情况细分到**反转前N个链表**上来
> - 首先，reverseBetween（head，m，n），如果其中调用reverseBetween（head.next，m-1，n-1），那么如此递归下去，必将有m-1=1，**这不就变成了反转前N个节点么？**
> - ![image.png](https://oss1.aistar.cool/elog-offer-now/d714b40e95b6b96adbc336e953a2fcd2.png)**仔细看看代码的递归妙用！**
> - **如果是迭代的方式，**那么需要先遍历找到第m个节点，而后进行链表的反转，而后找到第n个节点，将反转过后的链表与之前的链表进行合并；


## [25. K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/c7276cf75b151531894a1e9ae35ee521.png)
> 反转链表；
> 解题思路：
> - 第一种解法：递归，将K个一组反转链表，变为反转[a,a+k）区间的链表；参考[链接](https://mp.weixin.qq.com/s/A-dQ9spsP_Iu1Y4iCRP9nA)![image.png](https://oss1.aistar.cool/elog-offer-now/cf0af41c406b920373c6cf71376254d9.png)其中reverse(a,b)**是以迭代的方式实现的**；
> - 第二种解法：迭代，

# 股票买卖
> 股票买卖的题型**其实根本是动态规划**。根据下面的题来由易到难来理解一下。
> 重点理解：**dp数组的含义；状态转移方程；遍历的方向；有没有空间优化的可能。**
> labuladong的教程：[链接](https://mp.weixin.qq.com/s/lQEj_K1lUY83QtIzqTikGA)
> leetcode上的教程：[链接](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/bao-li-mei-ju-dong-tai-gui-hua-chai-fen-si-xiang-b/)

## [剑指offer 63.股票的最大利润（买卖股票的最大收益 |）](https://leetcode-cn.com/problems/gu-piao-de-zui-da-li-run-lcof/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/084bf012a13dd16474df9f495d8f9794.png)
> 股票买卖；动态规划；暴力法
> 解题思路：
> - dp[i][k]，k取0/1，表示第i天，手头是否有股票，**当前有多少钱(如果买入就是负数)**；
> - 初始状态：dp[0][0]=0,表示第一天手头无股票，那就无收入；dp[0][1]=-prices[0]，表示第一天买了股票，那么就是负收益；
> - 那么状态转移方程就出来了：
> - **dp[i][0]=max(dp[i-1][0],dp[i-1][1]+prices[i])——**第i天我手头没有股票，有两种可能，**要么是我昨天就没买股票，要么就是今天眼疾手快脱手了**。
> - **dp[i][1]=max(dp[i-1][1],-prices[i])——**第i天我手头有股票，**要么是昨天就买了**，**要么是今天才买了股票进场罚站**。**（且只能买入一手，故利润直接为-价格）**
> - 最后返回什么？dp[n-1][0]，**因为最后一天，肯定是手头没有股票了，才会有最大收益！**
> - 答案直接点题目链接，自己写过，**如果想进行空间压缩，可以只保留前一天的数据**
> - **还有另外一种方式——暴力法**：找某个元素之前的最小元素，这就是可能的最大值，可以通过记录之前的最小值，将复杂度降到O(N)，参考[链接](https://leetcode-cn.com/problems/gu-piao-de-zui-da-li-run-lcof/solution/gu-piao-de-zui-da-li-run-by-mrsate/)
> - **还可以使用一维的dp数组，表示前i天的最大收益，核心：**前i天的最大收益 = max{前i-1天的最大收益，第i天的价格-前i-1天中的最小价格}
> - ![image.png](https://oss1.aistar.cool/elog-offer-now/4b8d1522be57cab2444f7c5ab119756a.png)


## [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/fa981af52e385ad6e4a5f76b24056865.png)
> 动态规划；股票买卖；
> 解题思路：
> - **dp[i][k]的含义跟上一道题一样**
> - **初始状态也一样**
> - 状态转移有些区别：
> - **dp[i][0]=max(dp[i-1][0],dp[i-1][1]+prices[i]);**
> - dp[i][1]=max(dp[i-1][1],dp[i-1][0]-prices[i])——因为**我们计算的是总共的利润，所以需要将之前的收入给加起来**
> 
![image.png](https://oss1.aistar.cool/elog-offer-now/3fccdca8219e77832f5f72873c47a9dc.png)
> - **贪心**：如果今天的股价比昨天的股价高，那就加上差值` res += diff;`
> 
![image.png](https://oss1.aistar.cool/elog-offer-now/5196c3d74a674eda76b6fa25857ff773.png)

# LRU/LFU
LRU(Least Recently Used,最近最少使用),强调的是时间上的排序,即越久没有使用的缓存\页面进行删除\替换.
LFU(Least Frequency Used,最少频率使用),强调的是频率!当频率相同时,再比较时间!
## LRU的解法
利用HashMap加双端链表,整个链表以时间来排序,.
hashmap用来获取链表节点,双端链表进行维护时间的顺序.
**不能使用小顶堆,因为在get的时候,无法实现对堆内cache的更新和重排!**
```cpp
struct DLinkedNode {
    int key, value;
    DLinkedNode* prev;
    DLinkedNode* next;
    DLinkedNode(): key(0), value(0), prev(nullptr), next(nullptr) {}
    DLinkedNode(int _key, int _value): key(_key), value(_value), prev(nullptr), next(nullptr) {}
};

class LRUCache {
private:
    unordered_map<int, DLinkedNode*> cache;
    DLinkedNode* head;
    DLinkedNode* tail;
    int size;
    int capacity;

public:
    LRUCache(int _capacity): capacity(_capacity), size(0) {
        // 使用伪头部和伪尾部节点
        head = new DLinkedNode();
        tail = new DLinkedNode();
        head->next = tail;
        tail->prev = head;
    }
    
    int get(int key) {
        if (!cache.count(key)) {
            return -1;
        }
        // 如果 key 存在，先通过哈希表定位，再移到头部
        DLinkedNode* node = cache[key];
        moveToHead(node);
        return node->value;
    }
    
    void put(int key, int value) {
        if (!cache.count(key)) {
            // 如果 key 不存在，创建一个新的节点
            DLinkedNode* node = new DLinkedNode(key, value);
            // 添加进哈希表
            cache[key] = node;
            // 添加至双向链表的头部
            addToHead(node);
            ++size;
            if (size > capacity) {
                // 如果超出容量，删除双向链表的尾部节点
                DLinkedNode* removed = removeTail();
                // 删除哈希表中对应的项
                cache.erase(removed->key);
                // 防止内存泄漏
                delete removed;
                --size;
            }
        }
        else {
            // 如果 key 存在，先通过哈希表定位，再修改 value，并移到头部
            DLinkedNode* node = cache[key];
            node->value = value;
            moveToHead(node);
        }
    }

    //很重要
    void addToHead(DLinkedNode* node) {
        node->prev = head;
        node->next = head->next;
        //需要更新两个的节点
        head->next->prev = node;
        head->next = node;
    }
    //很重要
    void removeNode(DLinkedNode* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
    //很重要
    void moveToHead(DLinkedNode* node) {
        removeNode(node);
        addToHead(node);
    }
    //很重要
    DLinkedNode* removeTail() {
        DLinkedNode* node = tail->prev;
        removeNode(node);
        return node;
    }
};

```
## LFU的解法
可以使用Set来保证其frequency排序, 再用一个HashMap实现key到value的映射。
```cpp
struct CacheNode {
    int key;
    int value;
    int freq;
    long tick;

    // 小顶堆
    bool operator<(const CacheNode& other) const {
        if (freq < other.freq) {
            return true;
        } else if (freq == other.freq && tick < other.tick) {
            return true;
        }

        return false;
    }
};

class LFUCache {
public:
    LFUCache(int _capacity) {
        capacity = _capacity;
        tick = 1;
    }
    
    int get(int key) {
        auto iter = mp.find(key);
        if (iter == mp.cend()) {
            return -1;
        }

        int value = iter->second.value;
        touch(iter->second);
        
        return value;
    }
    
    void put(int key, int value) {
        if (capacity == 0) {
            return;
        }

        auto iter = mp.find(key);
        if (iter != mp.cend()) {
            // key exists, update value and touch
            iter->second.value = value;
            touch(iter->second);
            return;
        }

        if (mp.size() == capacity) {
            // Remove the first node in cache
            const CacheNode& node = *cache.cbegin();
            mp.erase(node.key);
            cache.erase(node);
        }
        

        // Create a new node and save to set and map
        CacheNode node{key, value, 1, tick++};
        mp[node.key] = node;
        cache.insert(node);
    }

private:
    long tick;
    int capacity;
    unordered_map<int, CacheNode> mp; // save the object instead of ptr
    set<CacheNode> cache; // Balance BST

    void touch(CacheNode& node) {
        cache.erase(node);
        node.freq++;
        node.tick = tick++;
        cache.insert(node);
    }

};


```
# 滑动窗口
## [567.字符串的排列](https://leetcode-cn.com/problems/permutation-in-string/)
> **滑动窗口；多指针；**
> 5min mid
> 解题思路：
> - 先遍历s1字符串，存储至hashtable1中；
> - 建立两个指针left和right，分别表示左右边界；一个valid，表示有多少个字符满足了条件
> - 新建一个**hashtable2**，遍历s2，**并根据该字符是否在s1中，修改hashtable2中次数，当该字符在两个hash表中出现的次数相等时，valid+1**；
> - 开始进行左边界的收缩，条件为窗口大小大于s1.size。根据左边界的字符，对hashtable2以及valid进行修改
> 
**还有一种关于记录出现次数的方法**，见到一个利用负数、0、正数，分别表示多出现了、刚好、还需要出现几次三种状态，使得代码很精简：[链接](https://leetcode-cn.com/problems/permutation-in-string/solution/hua-dong-chuang-kou-by-muyids-4/)

```cpp
class Solution {
    public:
    bool checkInclusion(string s1, string s2) {
        
        int n=s1.size();
        int m=s2.size();
        if(n>m) return false;
        vector<int>cnt1(26),cnt2(26);
        //窗口为n的字符串 是否相同
        for(int i=0;i<n;i++)
        {
            ++cnt1[s1[i]-'a'];
            ++cnt2[s2[i]-'a'];
        }
        if(cnt1==cnt2) return true;
        //
        for(int i=n;i<m;i++)
        {
            //在数组右端添加字符
            ++cnt2[s2[i]-'a'];
            //移除最左端字符
            --cnt2[s2[i-n]-'a'];
            if(cnt1==cnt2) return true;
        }
        return false;
    }
};

作者：7aughing-6olickmiv
    链接：https://leetcode.cn/problems/permutation-in-string/solution/hua-dong-chuang-kou-by-7aughing-6olickmi-95j9/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

## [1358. 包含所有三种字符的子字符串数目](https://leetcode-cn.com/problems/number-of-substrings-containing-all-three-characters/)
> 滑动窗口；多指针；
> 
> 心路历程：
> 由于之前做**过求字符串字典序的题**，所以照着写，最后发现过不了最后的测试用例，原因在于左右边界循环次数太多，时间复杂度达O(n^2)。
> 因此**必须使用滑动窗口来收缩范围。**
> 
> 滑动串口的精髓就在于，**找到合适的右边界，而后不断的收缩左边界，直到条件不满足为止**。
> 这个过程一般会利用hash表来进行存储相应的个数或者位置信息，如果忘了滑动窗口的过程，看这个[滑动窗口详解](https://leetcode-cn.com/problems/number-of-substrings-containing-all-three-characters/solution/si-kao-de-guo-cheng-bi-da-an-zhong-yao-xiang-xi-tu/)。
> `知识补充：min_element和max_element可以找到容器中的最小最大元素的指针，详见：[链接](https://blog.csdn.net/hanshihao1336295654/article/details/82747931)`
> 

```cpp
class Solution {
public:
    int numberOfSubstrings(string s) {
        int res = 0, l = 0;
        unordered_map<char, int> m;
        for (int i = 0; i < s.size(); i++) {
            m[s[i]]++;
            while (m['a'] > 0 && m['b'] > 0 && m['c'] > 0) {
                res += s.size() - i;# 往后的序列都是啊！
                m[s[l++]]--;
            }
        }
        return res;
    }
};
```

## [76.最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/submissions/)  
> 滑动窗口；多指针；
> 10min hard
> 心路历程：
> 这道题是一道典型的滑动窗口题，难处理的是如何才算是满足条件？
> 这里的取巧方式是，s与t各有一个hash表，如果在遍历过程中两个hash表中某数字数量相等，**则说明该字符达标了。当字符达标的数目达到字符的个数时，说明一个覆盖的子串已经找到了**。而后收缩左边界，直到字符达标数目不在达标为止。
> `知识补充：利用substr成员函数可以直接从string取出指定位置长度的子串：[链接](https://baike.baidu.com/item/substr/2171?fr=aladdin)`
> 

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        unordered_map<char, int> need, window;
        for (char c : t) need[c]++;

        int left = 0, right = 0;
        int valid = 0;
        // 记录最小覆盖子串的起始索引及长度
        int start = 0, len = INT_MAX;
        while (right < s.size()) {
            // c 是将移入窗口的字符
            char c = s[right];
            // 右移窗口
            right++;
            // 进行窗口内数据的一系列更新
            if (need.count(c)) {
                window[c]++;
                if (window[c] == need[c])
                    valid++;
            }

            // 判断左侧窗口是否要收缩
            while (valid == need.size()) {
                // 在这里更新最小覆盖子串
                if (right - left < len) {
                    start = left;
                    len = right - left;
                }
                // d 是将移出窗口的字符
                char d = s[left];
                // 左移窗口
                left++;
                // 进行窗口内数据的一系列更新
                if (need.count(d)) {
                    if (window[d] == need[d])
                        valid--;
                    window[d]--;
                }                    
            }
        }
        // 返回最小覆盖子串
        return len == INT_MAX ?
            "" : s.substr(start, len);
    }
};
```

## [438. 找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)
> 滑动窗口；
> 秒了 mid
> 心路历程：就是上一道题的变种，**只增加了索引的存储**。由此可见，滑动窗口其实玩来玩去就是那样，重点在于抓住它的精髓。


## [3.无重复的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)
> 滑动窗口；
> 1min mid
> 心路历程：在判定条件上稍微卡了一会，**后来发现只要新加入的字符串大于1就计算一次长度**，而后收缩左边界，直到这个新元素为1为止，而后再次扩展右边界，如此循环。

```cpp
//暂时AC
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> window;

    int left = 0, right = 0;
    int res = 0; // 记录结果
    while (right < s.size()) {
        char c = s[right];
        right++;
        // 进行窗口内数据的一系列更新
        window[c]++;
        // 判断左侧窗口是否要收缩
        while (window[c] > 1) {
            char d = s[left];
            left++;
            // 进行窗口内数据的一系列更新
            window[d]--;
        }
        // 在这里更新答案
        res = max(res, right - left);
    }
    return res;
}
};
```


# 两数之和
**框架：**
**双指针前后递进，大小判断，同时加上特殊条件的判定**；
如下是基本的**两数相加套路**：
```cpp
vector<int> twoSum(vector<int>& nums, int target) 
{ 
    // 先对数组排序     
    sort(nums.begin(), nums.end());     
    // 左右指针     
    int lo = 0, hi = nums.size() - 1;     
    while (lo < hi) {     
        int sum = nums[lo] + nums[hi];     
        // 根据 sum 和 target 的比较，移动左右指针     
        if (sum < target) {             
            lo++;         
        } else if (sum > target) {             
            hi--;         
        } else if (sum == target) { 
            return {nums[lo], nums[hi]};         
        }    
    } 
    return {}; 
} 
PS:有些题目中还可能遇到不只一对两数相加满足条件，求多组并且还要去重，这时可以用：
if (sum < target)      
    lo++; 
else if (sum > target) 
    hi--; 
else {         
    res.push_back({left, right}); 
    // 跳过所有重复的元素 
    while (lo < hi && nums[lo] == left) 
        lo++; 
    while (lo < hi && nums[hi] == right) 
        hi--;    
} 
```
> PPS：有些题目中要求**返回下标，这个时候sort就不行，可以考虑用暴力法，或是用hash表存储（target-nums[i]）,而后看后续是否有数字满足；**

参考题目：
1.[两数之和](https://leetcode-cn.com/problems/two-sum/)
[15.三数之和](https://leetcode-cn.com/problems/3sum/submissions/)
_PS：这道题是复用了两数之和的函数而实现的；_
_PS2：这道题所谓的双指针其实就是将两数之和的函数给内置到了三数之和中；_
[18.四数之和](https://leetcode-cn.com/problems/4sum/)

# 区间合并与分割
## [56.合并区间](https://leetcode.cn/problems/merge-intervals/)
![image.png](https://oss1.aistar.cool/elog-offer-now/6568a84125f27fae443939fe44e0e3fd.png)
注：匿名函数的使用，sort是容器函数，**需要借助匿名函数进行自定义的比较**。
还可以这么写：
![image.png](https://oss1.aistar.cool/elog-offer-now/932182617b348523afe306db57722da5.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/bb0ee30184c49c1a3a804c03b19bdac6.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/a32e3d0f5e7ceeb14d876b573d903560.png)


## [57.插入区间](https://leetcode.cn/problems/insert-interval/)
![image.png](https://oss1.aistar.cool/elog-offer-now/652961ca6c32968c899490eda287ec79.png)
注：**place表示是否已经将改区间给放进去了，如果放进去了，那么在右边的直接往里边丢就行。**
![image.png](https://oss1.aistar.cool/elog-offer-now/d406f078da99fb2af8c42fea19690f2a.png)
# 大数计算
> 大数计算的题型，一般计算的整数都超过Long Long的范围了，所以需要字符串或者容器来作为中间介质。
> 核心计算逻辑就是这个：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/9f9ab92c973c15b887625053d5b89830.png)


## [66. 加一](https://leetcode-cn.com/problems/plus-one/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/c64ab175491bf89ca40ba53cd518f7b5.png)
> 大数计算；
> **解题思路：**
> - 从后往前进行计算，取余数为当前位数，取商为进位；
> - 如果最后一位计算之后，还有进位，那就往前插入一个1；
> - 也可以转换成大数相加的方式，将1转换为“0000001”进行相加；
> - 参考[链接](https://blog.csdn.net/ASJBFJSB/article/details/91038066)


## [2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/b35f74f677a1943718ffe61aebdb9818.png)
> 大数计算；链表**；**多指针
> **解题思路：**
> - 两个指针，分别指向两个链表的开始位置
> - 模拟相加的过程，一位一位的向后传递进位
> - 如果某一个链表遍历完毕，那就只遍历另外一个链表即可
> - **思考一下**，如果链表不是逆序的，应该怎么处理？——只能先手动反转链表了
> 
参考链接：[链接](https://blog.csdn.net/weixin_43207320/article/details/94735888)


## [43. 字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/e6777dcec44a93179d23d245e98b8f6a.png)
> 大数计算；字符串
> **解题思路：**
> - 我的解法，模拟乘法的过程，借助双指针，让某一个字符串的所有数与另外一个字符串的位依次相乘
> - 在计算的时候需要保留进位，最后再相加
> - 这种方式，相当于还要实现一遍字符串的相加，而后在过程中调用对应的函数
> - 更便捷的解法，我们将乘法的计算过程进一步拆分一下![image.png](https://oss1.aistar.cool/elog-offer-now/a35c051f410f0f70ff1fdb2eba4cfd62.png)
> - 由上图可知，**两个字符串i j位置的数相乘，那么结果只会影响到i+j 和i+j+1两位，其中i+j+1保存的是进位**
> - **那么我们完全可以遍历字符串，而后取位数相乘，将对应的位置存储于某一个数组中**
> - 而后将数组中的结果连接成字符串，结果不就出来了？
> - 值得注意的是，以这种方式进行计算的时候，也需要从后往前进行遍历相乘，因为低位向高位有进位
> - 同时注意**进位**，看这个答案：[链接](https://leetcode-cn.com/problems/multiply-strings/submissions/)
> - **参考链接：**[链接](https://blog.csdn.net/kangkanglou/article/details/79894208)

# 数据结构
> 数据结构类型的题，是指需要理解各种常用的数据结构及算法，并通过算法来实现它

## [剑指offer09.用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/33ad96843e530e760a9db4c12515783e.png)
> 数据结构；栈；队列
> **解题思路：**
> - **队列是先入先出，栈是先入先出，那么如果两个栈相互“串联”就可以模拟出先入先出了！**
> - 于是解法出来了，**两个栈中一个负责接收“入队”，一个负责处理“出队”**
> - 当入队时**，元素全部push进入第一个栈**
> - 当出队时，**如果第二栈为空**，**那就将第一个栈的元素依次弹出pop并压入第二栈中**，而后对第二个栈进行弹出
> - **这样的时间复杂度，平均下来就是O(1)。**
> - 拓展：**如何获取队首？其实可以对第二栈进行top访问，不进行弹出即可；**


## [225.用两个队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/76faf0516d83b450f861ea1a841c54ad.png)
> 栈；队列；数据结构
> **解题思路：**
> - 两队列，**一个负责接收入队push，另一个负责处理出队时的暂存区**
> - 入队时，**数据全部放到第一队**
> - 出队时，将第一队的数**依次出队放到第二队，只剩最后一个元素**
> - 而后将第二队的数据又重新赋值给第一队（这个部分本想用一个指针来指示，但是队列没有这样的操作），清空第二队
> - 如此反复，**时间复杂度较高，出队O(n),入队O(1)**
> - **拓展：**其实用一个队列就可以了！在一个队列时，出队n-1个数据，并且依次再次入队，只需要返回第n个数据即可！这里有一道题解是入队O(n),出队O(1)

## [71. 简化路径](https://leetcode.cn/problems/simplify-path/)
![image.png](https://oss1.aistar.cool/elog-offer-now/d3e71e0799b44a4c7b911be44cc0078f.png)
这道题建议直接将‘/’略过不做考虑！
![image.png](https://oss1.aistar.cool/elog-offer-now/98dcfef23ee3aa4f5a1220c9b374cc71.png)
而后将栈中的结果出栈，用‘/’连接在一起，值得注意的是，在C++中可以使用vector模拟栈，并且最后的结果还不用倒置。
# 图的奥秘
> 有关图的遍历与拓扑排序等；
> 先解决一个问题：**如何存储图？**
> 最简单的方式是利用一个**二维数组来存储**，如下：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/74d73c141ce98fbd63a4207e74def346.png)

## 图的遍历
> 以城市之间的距离为例，**DFS和BFS**都**可以用作寻找最短路径**。
> ![image.png](https://oss1.aistar.cool/elog-offer-now/fdffde372e6d7bc922e8ef0f8318336f.png)
> 如果是**BFS**，需要是队列来进行图的遍历并更新最短距离，其实BFS还可以用作求最少转机次数。将转机次数放在queue的结构体里面，也是一个**很便捷**的方法。
> ![image.png](https://oss1.aistar.cool/elog-offer-now/dbb01f966e3b53123d691448e1d095f3.png)
> **时间复杂度**：O(N)，**空间复杂度**为O(N^2)；
> 因为DFS/BFS都需要遍历所有的点。
> 如果是任意两点之间的求最短路径，则需要每两个点进行一次BFS或DFS，即N^2次BFS和DFS。



**Floyd-Warshall算法求最短路径**
> Floyd算法的基本思想就是对将各个顶点作为中转站，从而更新最短路径。
> ![image.png](https://oss1.aistar.cool/elog-offer-now/9aaecb3c7cc74061d6fdd16f896eda61.png)
> 这段代码的**基本思想**就是：最开始只允许经过1号顶点进行中转，接下来只允许经过1和2号顶点进行中转……允许**经过1~n号所有顶点进行中转**，求任意两点之间的最短路程。用一句话概括就是：从i号顶点到j号顶点只经过前k号点的最短路程。
> 它的时间复杂度是O(N^3)，在数据量不是很大的情况下有奇效。
> 这其实是一种**动态规划的思想**。
> 另外，如果图中有不可达的点，可以这样处理：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/7e3eaea2759e5ee6882ce54ffb4f87f3.png)
> 有个问题，那就是Floyd算法无法解决“负权回路”的图，因为每次经过负权的点，都会更新路径，并且如果一个图存在负权回路，那么也就不存在最短路径。

## [743.网络的延迟时间](https://leetcode-cn.com/problems/network-delay-time/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/943f0d3310da3cb3ef1f18c030ae6a05.png)
> 最短路径；Floyd算法；
> **解题思路：**
> - 这道题完全就是Floyd算法的典型题；
> - ![image.png](https://oss1.aistar.cool/elog-offer-now/4b2cb5ec6e9708cf683488187dae636f.png)


**Dijkstra（迪杰斯特拉）算法求单源最短路径**
> 何为单源最短路径？
> 即是求指定一个源点到其余各个顶点的最短路径。例如求下面1号顶点到2、3、4、5、6号节点的最短路径。
> ![image.png](https://oss1.aistar.cool/elog-offer-now/a7eebc1af9024f293373deac0f14745c.png)
> Dijstra算法的主要思想是：**通过“边”来松弛（某节点1通过某相邻节点2中转，使得它到节点3的距离变短）各个节点到其他节点的距离**。
> 以一号节点为例，如下是其**初始路程**：用一个一维数组dis来存储1号顶点到**其余各个顶点的初始路程**，如下：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/964d83e5cdc769c9ae3a4b2aeb566893.png)
> 将上述数组为估计值，**因为后续需要做的工作就是对其更新**。
> 
> 我们看到1->2的路径最短，且1->2的过程不可能再短了（1到其他节点的距离都是正数，且到2是最短，总不可能还有通过其他节点中转使得1->2路径**缩短吧**？）
> 
> 然后我们看到2号节点有“估计值”如下：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/b80b016fb6ccda03870b8f38554659c7.png)
> 那么1号节点就可以通过2号节点来“松弛”**1->3,1->4的路径**，这时更新为：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/5ae7d535452f64c76f92ed253ba337d7.png)
> 接下来要做的就是从3,4,5,6（2已经走过了）找距离最小的那个节点进行中转，比如4号节点，再次更新；再从3,5,6选最近节点更新···如此反复，最终如下：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/ca458aaea0939f402290aa42903e8f7b.png)
> 上述算法的基本思想就是：**每次找到离源点（源点如1号顶点）最近的一个顶点，然后以该顶点为中心进行扩展，最终得到源点到其余所有点的最短路径**。
> 
> **Dijlstra算法基本步骤如下:**
> 1. 顶点分为两个部分：**已知最短路径P和未知最短路径Q**。
> 
最开始时P只有源点（如题目的1），其他全都在Q。这个可以用一个flag数组保存，如果flag[i]==1，那句表示在P，否则在Q。
> 2. P中源点设置dis到自身的距离为0，其他设置为边的长度即可；
> 3. 在Q中选一个离源点最近的点对源点的dis进行松弛，并更新相应的距离；
> 4. 将第3步所选的点从Q中删除，Q为空则算法结束；
> 
**实例代码如下：**![image.png](https://oss1.aistar.cool/elog-offer-now/fdce9fad5aa3c548eaba74be94c2dd03.png)
> 上述算法的**时间复杂度为O(N^2)**，因为O(N)找到最近点，而后O(N)更新最近的距离。
> 其实是**基于贪心策略**的算法。
> 
> 如何优化？
> 首先，使用**堆排序来找最近的点**，O(logn）；而后，对于边数M远小于N^2的**稀疏图**来说，**可以将邻接矩阵改成邻接表**，邻接表怎么存储？例如使用数组来实现邻接表（还可以使用指针链表）：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/84836b1ac07c72952c7f8d013c578719.png)

# 拓扑排序
## [207.课程表](https://leetcode-cn.com/problems/course-schedule/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/5feb43be02b02cdd3df8ba268c2b9422.png)
> 图；拓扑排序；
> **解题思路：**
> 顶点的度是**指和该顶点相连的边的条数**。特别是对于有向图来说，顶点的出边条数称为该顶点的**出度**，顶点的入边条数称为该顶点的**入度，度=出度+入度；**
> 有向无环图→ **一定存在入度为0的点，**不然就没法解题了；
> **拓扑排序简单来说**，是对于一张有向图 G，我们需要将 G 的 **n 个点排列成一组序列**，使得图中任意一对顶点 <u,v>，如果图中存在**一条 u→v 的边**，那么 **u 在序列中需要出现在 v **的前面。亦可理解为对某点 v 而言，只有当 v 的**所有源点均**出现了，v 才能出现。
> 
> 拓扑排序可以使用**BFS与DFS来做**，**其中BFS较容易理解，**主要是以下几个步骤：
> - **让入度为 0 的点入列，它们无前置**。
> - 然后逐个出列，**出列代表该节点已排序，减小其下个节点的入度。** 
> - 如果下个节点的入度新变为 0，安排它入列、再出列……直到没有入度为 0 的节点可入列。 
> - 一般来说，**出队次数必然节点数，否则就是有环**。
> 
[思路链接](https://leetcode-cn.com/problems/course-schedule/solution/bao-mu-shi-ti-jie-shou-ba-shou-da-tong-tuo-bu-pai-/)
> [解题链接](https://leetcode-cn.com/problems/course-schedule/solution/ke-cheng-biao-by-leetcode-solution/)


## [1203.项目管理(拓扑排序)](https://leetcode-cn.com/problems/sort-items-by-groups-respecting-dependencies/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/c557373186409922e5d1beac2d17c911.png)
> 图；拓扑排序；
> - **解题思路：**
> - 相比于普通的拓扑排序，这道题的差异在于**点之间有分组**，即涉及到组间的排序
> - 于是这道题分为两个步骤：第一是完成组与组的依赖关系，看是否存在一个拓扑排序，如果两个组之间相互依赖，任务会停摆；
> - 第二是完成组内的排序；
> - 其中，组与组以及组内的排序，其实都是拓扑排序，将组中所有的项目都抽象成一个点即可；
> - 题解参考：[链接](https://leetcode-cn.com/problems/sort-items-by-groups-respecting-dependencies/solution/xiang-mu-guan-li-by-leetcode-solution-3e7j/)

# 多线程
## 交替打印字符串（原子、条变量、锁）
> [原题链接](https://leetcode-cn.com/problems/print-foobar-alternately/solution/c-3chong-fang-fa-yuan-zi-cao-zuo-tiao-ji-d2l9/)

法一、利用一个原子变量bool来判断，打印出来之后就取反，而后另外一个线程开始打印，如此反复；
![image.png](https://oss1.aistar.cool/elog-offer-now/595bfa90e9d049fde2c6b3af4af83bc0.png)
法二、互斥锁加条件变量，**互斥锁主要是对一个bool值进行判断**；
```cpp
class FooBar {
private:
    int n;
    mutex mtx;
    condition_variable cv;
    bool foo_done = false;
public:
    FooBar(int n) : n(n) {}

    void foo(function<void()> printFoo) {
        for (int i = 0; i < n; i++) {
            unique_lock<mutex> lock(mtx);
            cv.wait(lock, [&]() { return !foo_done; });
            printFoo();
            foo_done = true;
            cv.notify_one();
        }
    }

    void bar(function<void()> printBar) {
        for (int i = 0; i < n; i++) {
            unique_lock<mutex> lock(mtx);
            cv.wait(lock, [&]() { return foo_done; });
            printBar();
            foo_done = false;
            cv.notify_one();
        }
    }
};
```
法三、信号量，初始化两个信号量，**一个为1一个为0（1的就是先打印的）**，打**印之后相反的信号量加一（post）**
![image.png](https://oss1.aistar.cool/elog-offer-now/b1505fda6b17a37d66217bd1b35a6af4.png)
法四，两个互斥锁：
```cpp
class FooBar {
private:
    int n;
    std::mutex m1,m2;
public:
    FooBar(int n) {
        this->n = n;
        m2.lock();
    }

    void foo(function<void()> printFoo) {
        
        for (int i = 0; i < n; i++) {
            m1.lock();
        	// printFoo() outputs "foo". Do not change or remove this line.
        	printFoo();
            m2.unlock();
        }
    }

    void bar(function<void()> printBar) {
        
        for (int i = 0; i < n; i++) {
            m2.lock();
        	// printBar() outputs "bar". Do not change or remove this line.
        	printBar();
            m1.unlock();
        }
    }
};
```
补充：
std::this_thread::yield() 的目的是避免一个**线程频繁与其他线程争抢CPU时间片**, 从而导致多线程处理性能下降.
std::this_thread::yield() **是让当前线程让渡出自己的CPU时间片(给其他线程使用)**
std::this_thread::sleep_for()** 是让当前休眠”指定的一段”**时间.
sleep_for()也可以起到 std::this_thread::yield()相似的作用, 但两者的**使用目的是大不相同的。**
## 条件变量
[https://blog.csdn.net/zzhongcy/article/details/85248597?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-0&spm=1001.2101.3001.4242](https://blog.csdn.net/zzhongcy/article/details/85248597?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-0&spm=1001.2101.3001.4242)
> 并查集是一种**树型的数据结构**，用于**处理一些不交集（Disjoint Sets）的合并及查询问题**。
> **虽然并查集使用BFS/DFS在某些时候也是可以解题的，但是通用和简洁的解法是联合-查找算法（Union-find Algorithm）（该算法后面时间复杂度趋近于O(1)）**，该算法定义了两个用于此数据结构的操作：
> - **Find**：**确定元素属于哪一个子集**。它可以被用来确定两个元素是否属于同一子集。**即寻找到它的根节点**![image.png](https://oss1.aistar.cool/elog-offer-now/88332ea2f283bc01fc4993c31e088166.png)
> - **Union：将两个子集合并成同一个集合**。**即将某一条路径上的点的最终父节点设置为另一条路径的最终父节点**。如下，如果想要merge（8,5），那么过程如下：![image.png](https://oss1.aistar.cool/elog-offer-now/370364b42d7ce29e3a37eeac16de72ca.png)![image.png](https://oss1.aistar.cool/elog-offer-now/0a0d6ab34422a2b3f4d4478c4be49ae8.png)
> - 上面这种合并的方式，在路径太长的时候，**耗时较多，就像是一个链表在遍历，因此可以对其进行优化：**直**接将路径上的点指向最终父节点，**而不是一级一级的找**。**![image.png](https://oss1.aistar.cool/elog-offer-now/db66898e4fd1f7f5e0417317e038603b.png)
> 
由于支持这两种操作，一个**不相交集也常被称为联合-查找数据结构**（Union-find Data Structure）或**合并-查找集合**（Merge-find Set）。
> **进一步了解推荐阅读:一文搞懂并查集：原文**[链接](https://leetcode-cn.com/problems/number-of-provinces/solution/tu-jie-bing-cha-ji-by-time-limit-6x7p/)

# 并查集
## [547. 省份数量](https://leetcode-cn.com/problems/number-of-provinces/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/19639f08cf11cd8692d626e377705968.png)
> 解题思路：
> - 并查集的典型解法
> - 首先以一个**二维矩阵来表示省份之间的链接关系**，以**N表示初始时的省份数量**
> - 而后运用并查集的方式进行合并，何时需要合并？**如果M[i][j]==1，**就表示需要合并，如果merge(i,j)成功，N--；如果合并不成功，说明已经合并过了，那么N不变
> - 最后的结果就是省份的数量
> - DFS/BFS解法，查看：[链接](https://leetcode-cn.com/problems/number-of-provinces/solution/dfs-bfs-bing-cha-ji-3-chong-fang-fa-ji-s-edkl/)

```cpp
std::vector<int> fa;
void init(int N) {
	fa.resize(N);
	for (int i = 0; i < N; i++) {
		fa[i] = i;//对应自身
	}
}
//返回 x 所属集合的ID
int find(int x) {
	int r = x;
	while(fa[r] != r) {
		r = fa[r];
	}
    //进行路径压缩
	while(fa[x] != x) {
		int t = fa[x];
		fa[x] = r;
		x = t;
	}
	return x;
}
bool merge(int u, int v) {
	int ru = find(u);
	int rv = find(v);
    if (ru == rv) {
        return false;
    }
	fa[ru] = rv;
    return true;
}
class Solution {
public:
    int findCircleNum(vector<vector<int>>& M) {
        int N = M.size();
        init(N);
        int anw = N;
        for (int i = 0; i < N; i++) {
            // i+1是因为之前的已经被合并过了
            for (int j = i+1; j < N; j++) {
                if (M[i][j] && merge(i, j)) {
                    anw --;
                }
            }
        }
        return anw;
    }
};
```

## [200.岛屿的数量](https://leetcode-cn.com/problems/number-of-islands/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/0cc7f3bbaca62953def39c719fdd4445.png)
> 解题思路：
> - 有三中那个思路，一种是这章的重点——并查集，另一种方法是利用BFS；还有一种方式是利用DFS
> - 如果并查集的思路，怎么处理合并问题？**如何表示一个二维矩阵的坐标呢？**可以使用i*cols+j，相当于从第一列开始数的顺序。**那么如何处理这里所谓的链接？**之前省份的那道题是给出了链接关系，而岛屿的链接问题，可以以向右和向下进行判断，是否有岛屿，从而进行合并，**在遍历的过程中记录空地 0 的数量，那么最终的岛屿数量就是cols*rows-空地的数量-剩余联通分量的数量。**（**联通分量就是说合并了多少次岛屿**）
> - 如果是DFS，一般是利用栈或者递归的方式实现，递归的方式更简洁。先建立一个visited二维数组，表示所有的点都没有访问过，**DFS的精髓，就是从一个点出发，依次进行上下左右的访问，会将途中访问过的点进行标记，下一次就不会对其进行访问了**。
> - 如果是BFS，一般是利用队列来迭代实现，只要队列不为空，那就继续进行扩展。思路跟DFS一样，利用一个二维的visited数组表示该点有没有被访问过，如果被访问/或者是水那就下一个点。
> - 三种答案建议参考[链接](https://leetcode-cn.com/problems/number-of-islands/solution/dfs-bfs-bing-cha-ji-python-dai-ma-java-dai-ma-by-l/)


## [1319. 连通网络的操作次数](https://leetcode-cn.com/problems/number-of-operations-to-make-network-connected/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/ddc9cba0955d5b76350093683e68521f.png)
> 并查集；
> 解题思路：
> - 剥开外壳，这就是一个规规矩矩的并查集题
> - 首先，通过并查集，我们是不是可以获得当前网络连接中的“子网个数”？
> - 如何才能让所有子网互通？ 那就在子网之间两两加上一根线，一共需要  子网数量-1  的线
> - 于是，线够不够就是所有子网能不能联通的关键。那么到底有多少根线可以使用？
> - **在并查集合并的过程中，如果发现两个电脑其实已经是互通的了，那么这根线就是多余的！**
> - **多余的线数量>=需要的线数量，就能够合并  可以参考：**[链接](https://leetcode-cn.com/problems/number-of-operations-to-make-network-connected/solution/cong-ren-lian-shi-bie-kai-shi-jiang-bing-40d1/)


## [剑指 Offer II 116. 朋友圈](https://leetcode-cn.com/problems/bLyHh0/)
> ![image.png](https://oss1.aistar.cool/elog-offer-now/789ef2556f5a4b8f5c17fcb736c9daee.png)
> 并查集；DFS；BFS
> 解题思路：
> - 跟省份那道题有什么区别？
> - DFS解法[链接](https://leetcode-cn.com/problems/bLyHh0/solution/sui-ran-bing-cha-ji-hen-xiang-qi-shi-dfs-kcat/)，注意，**DFS的方法就是计算进入了几次DFS，因为进入一次，在遍历的过程中会将visited标志为1**
> - BFS解法[链接](https://leetcode-cn.com/problems/bLyHh0/solution/shen-du-you-xian-sou-suo-yan-du-you-xian-i5k0/)，注意，BFS的方法就是看进入了几次队列的迭代操作，因为进入一次，会遍历所有可能达到的点
> - **解法都简单，关键是处理的细节很到位！**[链接](https://leetcode-cn.com/problems/bLyHh0/solution/cpython3java-1dfs-2bfs-3bing-cha-ji-by-h-zkfk/)

**类似题型**
[岛屿的数量||](https://blog.csdn.net/qq_21201267/article/details/107226324) 
改成了初始全部为水，而后将对应位置的水置为1的过程；
[128.最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/) 
这道题的方法很多，可以使用先sort再滑动窗口（用桶排序，不推荐）、set（时间复杂度略高）、unordered_set（速度快，因为不用往上下都遍历）、并查集（都合并到最小的那个数，同时用一个unordered_map来存储个数）参考[链接](https://leetcode-cn.com/problems/longest-consecutive-sequence/solution/ha-xi-biao-shi-xian-on-bing-cha-ji-liang-chong-shi/)
