---
title: 2535-数组元素和与数字和的绝对差
urlname: gfcdgx0b9ydfla1g
date: '2024-09-26 12:23:38'
updated: '2024-09-27 08:14:55'
description: '---tags: [''简单'',''数组'']---题目给你一个正整数数组 nums 。元素和 是 nums 中的所有元素相加求和。数字和 是 nums 中每一个元素的每一数位（重复数位需多次求和）相加求和。返回 元素和 与 数字和 的绝对差。示例 1：输入：nums = [1,15,6,3]输出：...'
tags:
  - 简单
  - 数组
---
# 题目
给你一个正整数数组 nums 。



元素和 是 nums 中的所有元素相加求和。

数字和 是 nums 中每一个元素的每一数位（重复数位需多次求和）相加求和。

返回 元素和 与 数字和 的绝对差。



示例 1：

> 输入：nums = [1,15,6,3]
>
> 输出：9
>
> 解释：
>
> nums 的元素和是 1 + 15 + 6 + 3 = 25 。
>
> nums 的数字和是 1 + 1 + 5 + 6 + 3 = 16 。
>
> 元素和与数字和的绝对差是 |25 - 16| = 9 。
>

示例 2：

> 输入：nums = [1,2,3,4]
>
> 输出：0
>
> 解释：
>
> nums 的元素和是 1 + 2 + 3 + 4 = 10 。
>
> nums 的数字和是 1 + 2 + 3 + 4 = 10 。
>
> 元素和与数字和的绝对差是 |10 - 10| = 0 。
>

注意：两个整数 x 和 y 的绝对差定义为 |x - y| 。

> [https://leetcode.cn/problems/difference-between-element-sum-and-digit-sum-of-an-array/description/](https://leetcode.cn/problems/difference-between-element-sum-and-digit-sum-of-an-array/description/)
>

# 分析
这道题很简单，跟着题目走就好了。



元素和好理解，直接将数组全部加起来即可。



稍微麻烦一点的是数字和，需要把所有的数字拆成个位数，最后再相加。



我们可以先做一个暴力的方法。



# 解答
```go
func differenceOfSum(nums []int) int {
	// 数字和
	sum1 := 0
	for _, v := range nums {
		sum1 += v
	}

	// 数位和
	sum2 := 0
	for _, v := range nums {
		for v > 0 {
			sum2 += v % 10
			v /= 10
		}
	}

	if sum1 > sum2 {
		return sum1 - sum2
	} else {
		return sum2 - sum1
	}

}

```



# 思考
那么还有优化的地方吗？



唯一能够考虑优化的地方就是计算数字和，你觉得可以优化吗？



倒是想到了一个小的优化点，即在计算数字和的时候，大概率是有重复的，因此可以使用哈希表记录。



key是当前计算的数字，val是最终的数字和。



可以略微提升运行速度，但是会提高内存占用，大家可以手动修改一下代码。



