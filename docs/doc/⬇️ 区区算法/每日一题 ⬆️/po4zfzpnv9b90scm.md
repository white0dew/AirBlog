---
title: 1-两数之和
urlname: po4zfzpnv9b90scm
date: '2024-09-26 12:28:43'
updated: '2024-09-29 09:08:29'
description: 校招面试算法题必刷之两数之和。
tags:
  - 简单
  - 数组
---
# 题目
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。



你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。



你可以按任意顺序返回答案。



> 示例 1：
>
> 输入：nums = [2,7,11,15], target = 9
>
> 输出：[0,1]
>
> 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
>
> 示例 2：
>
> 
>
> 输入：nums = [3,2,4], target = 6
>
> 输出：[1,2]
>
> 示例 3：
>
> 
>
> 输入：nums = [3,3], target = 6
>
> 输出：[0,1]
>



注意：

+ **<font style="color:rgb(38, 38, 38);background-color:rgb(240, 240, 240);">只会存在一个有效答案</font>**
+ **<font style="color:rgb(38, 38, 38);background-color:rgb(240, 240, 240);">进阶：你可以想出一个时间复杂度小于 O(n2) 的算法吗？</font>**

**<font style="color:rgb(38, 38, 38);background-color:rgb(240, 240, 240);"></font>**

> [https://leetcode.cn/problems/two-sum/description/](https://leetcode.cn/problems/two-sum/description/)
>

# 分析
这是一道经典算法题，并且拥有很多变种。



初看这道题，有一个很直观的解法，那就是遍历整个数组，直接暴力求出满足条件的数组下标即可。



由于这种解法太暴力，我就不写了，大家可以自己写一下。



其实在思考暴力的时候，我们就应该发现一个问题，那就是数组是否有序，对我们的计算有很大的影响。



因为一旦数组有序，那么我们就可以一个数从左边走，一个数从右边走，快速找到目标答案。



说的更具体一点，一开始下标分别指向左右两侧。



+ 如果当前的值大于target，那么右标往左移动。
+ 如果当前值小于target，那么左标往右移动。
+ 如果等于····，题目结束。

因此，我们需要先对数组排序，然后在移动左右两标算出来。



并且，只需要一次遍历，因此时间复杂度为O(n)。



# 解答-两头遍历
```go

func twoSum(nums []int, target int) []int {
    // 保存原始索引和值的结构体数组
    type numWithIndex struct {
        value int
        index int
    }
    originalNums := make([]numWithIndex, len(nums))
    for i, v := range nums {
        originalNums[i] = numWithIndex{v, i}
    }
    // 对原始数据的副本进行排序
    sortedNums := make([]numWithIndex, len(originalNums))
    copy(sortedNums, originalNums)
    sort.Slice(sortedNums, func(i, j int) bool {
        return sortedNums[i].value < sortedNums[j].value
    })

    left := 0
    right := len(sortedNums) - 1

    for left < right {
        sum := sortedNums[left].value + sortedNums[right].value
        if sum == target {
            return []int{sortedNums[left].index, sortedNums[right].index}
        } else if sum < target {
            left++
        } else {
            right--
        }
    }
    return nil
}
```



# 思考
其实还有一种方法，那就是使用hash表。



计算target与当前值的差值是否存在于hash表，即可判断是否已经找到了答案。



# 解答-哈希表
```go
func twoSum(nums []int, target int) []int {
    // 创建一个 map，key 为数组中的元素值，value 为元素的索引
    numMap := make(map[int]int)
    for i, num := range nums {
        // 计算目标值与当前元素的差值
        complement := target - num
        // 如果差值在 map 中，说明找到了两数之和
        if j, ok := numMap[complement]; ok {
            return []int{j, i}
        }
        // 将当前元素存入 map
        numMap[num] = i
    }
    return nil
}
```

