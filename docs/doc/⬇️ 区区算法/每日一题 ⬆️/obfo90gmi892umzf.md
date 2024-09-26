---
title: 2207-字符串中最多数目的子序列
urlname: obfo90gmi892umzf
date: '2024-09-25 20:34:21'
updated: '2024-09-26 12:54:03'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1727268604843-f2f506b7-7117-4c73-aec4-70ad9a7aed60.png'
description: '---keywords: 中等,力扣,贪心,字符串---题目给你一个下标从 0 开始的字符串 text 和另一个下标从 0 开始且长度为 2 的字符串 pattern ，两者都只包含小写英文字母。你可以在 text 中任意位置插入 一个 字符，这个插入的字符必须是 pattern[0] 或者 ...'
keywords: '中等,力扣,贪心,字符串'
---
# 题目
给你一个下标从 0 开始的字符串 text 和另一个下标从 0 开始且长度为 2 的字符串 pattern ，两者都只包含小写英文字母。



你可以在 text 中任意位置插入 一个 字符，这个插入的字符必须是 pattern[0] 或者 pattern[1] 。注意，这个字符可以插入在 text 开头或者结尾的位置。



请你返回插入一个字符后，text 中最多包含多少个等于 pattern 的 子序列 。



子序列 指的是将一个字符串删除若干个字符后（也可以不删除），剩余字符保持原本顺序得到的字符串。

**<font style="color:rgb(38, 38, 38);background-color:rgb(240, 240, 240);">示例 1：</font>**

```plain
输入：text = "abdcdbc", pattern = "ac"
输出：4
解释：
如果我们在 text[1] 和 text[2] 之间添加 pattern[0] = 'a' ，那么我们得到 "abadcdbc" 。那么 "ac" 作为子序列出现 4 次。
其他得到 4 个 "ac" 子序列的方案还有 "aabdcdbc" 和 "abdacdbc" 。
但是，"abdcadbc" ，"abdccdbc" 和 "abdcdbcc" 这些字符串虽然是可行的插入方案，但是只出现了 3 次 "ac" 子序列，所以不是最优解。
可以证明插入一个字符后，无法得到超过 4 个 "ac" 子序列。
```

**<font style="color:rgb(38, 38, 38);background-color:rgb(240, 240, 240);">示例 2：</font>**

```plain
输入：text = "aabb", pattern = "ab"
输出：6
解释：
可以得到 6 个 "ab" 子序列的部分方案为 "aaabb" ，"aaabb" 和 "aabbb" 。
```

> [https://leetcode.cn/problems/maximize-number-of-subsequences-in-a-string/](https://leetcode.cn/problems/maximize-number-of-subsequences-in-a-string/)
>

# 初次分析
先将这道题拆解，划分为两个小问题：

+ 将 pattern[0] 插入到 text 中，使得 text 中最多包含多少个等于 pattern 的子序列。
+ 将 pattern[1] 插入到 text 中，使得 text 中最多包含多少个等于 pattern 的子序列。



两个子问题的答案取最大值即可。



接下来问题来了，怎么求一个字符串内包含指定字符串的子序列呢？



因为一旦解决这个问题，尝试不同的插入位置，即可算出题目的最终答案。



分析一下求子序列这个问题：例如abac，求ac子序列有多少个，怎么算？



首先明确，子序列是原字符串删除若干字符之后，剩下的字符按顺序组成的。



那么是不是可以这么理解，从原字符串中按照顺序挑选子序列长度的字符，看是否和预期的子序列相等？



嗯？好像是诶！



那么怎么遍历出所有的情况呢？直接看代码！

## v1-暴力
```go
package main

func maximumSubsequenceCount(text string, pattern string) int64 {
    if len(pattern) < 2 {
        return 0
    }

    // 尝试在text中插入不同位置的字符1
    tmpText := text
    tmpPatternInsert1 := make([]string, 0)
    for i := 0; i <= len(text); i++ {
        tmpText = text[:i] + pattern[0:1] + text[i:]
        tmpPatternInsert1 = append(tmpPatternInsert1, tmpText)
    }

    // 计算1的子序列中为pattern的最大数量
    maximumSubsequenceCount1 := int64(0)
    for _, v := range tmpPatternInsert1 {
        tmpPattern := genSubSeq(v, len(pattern), pattern)
        tmpMax := int64(0)
        for _, v := range tmpPattern {
            if v == pattern {
                tmpMax++
            }
        }
        if tmpMax > maximumSubsequenceCount1 {
            maximumSubsequenceCount1 = tmpMax
        }
    }

    // 尝试在text中插入不同位置的字符2
    tmpText = text
    tmpPatternInsert2 := make([]string, 0)
    for i := 0; i <= len(text); i++ {
        tmpText = text[:i] + pattern[1:] + text[i:]
        tmpPatternInsert2 = append(tmpPatternInsert2, tmpText)
    }
    // 计算2的子序列中为pattern的最大数量
    maximumSubsequenceCount2 := int64(0)
    for _, v := range tmpPatternInsert2 {
        tmpMax := int64(0)
        tmpPattern := genSubSeq(v, len(pattern), pattern)
        for _, v := range tmpPattern {
            if v == pattern {
                tmpMax++
            }
        }
        if tmpMax > maximumSubsequenceCount2 {
            maximumSubsequenceCount2 = tmpMax
        }
    }

    // 返回最大值
    if maximumSubsequenceCount1 > maximumSubsequenceCount2 {
        return maximumSubsequenceCount1
    } else {
        return maximumSubsequenceCount2
    }

}

// 给定字符串，算出它的所有子序列组成
func genSubSeq(text string, subLen int, pattern string) []string {

    res := make([]string, 0)

    for i := 0; i < len(text); i++ {
        tmpChar := string(text[i])

        // 如果长度不可能够，直接continue
        if i+subLen > len(text) {
            continue
        }

        // 如果首字母不符合，直接continue
        if text[i] != pattern[0] {
            continue
        }

        tmpRes := fetchStr(text, i+1, subLen-1, pattern)
        for _, v := range tmpRes {
            // 长度
            if len(tmpChar)+len(v) != subLen {
                continue
            }
            res = append(res, tmpChar+v)
        }
    }
    return res
}

func fetchStr(text string, left int, resLen int, pattern string) []string {
    if resLen == 0 || left >= len(text) {
        return nil
    }

    res := make([]string, 0)
    for i := left; i < len(text); i++ {
        tmpChar := string(text[i])

        // 当前字母不符合指定下标的字符串，直接continue
        if text[i] != pattern[1] {
            continue
        }

        // 下一个字符的数据组
        tmpRes := fetchStr(text, i+1, resLen-1, pattern)

        if len(tmpRes) == 0 {
            res = append(res, tmpChar)
        } else {
            for _, v := range tmpRes {
                res = append(res, tmpChar+v)
            }
        }
    }
    return res
}

```



# 优化思路
可惜，暴力法的计算逻辑太多了。



运行之后在部分用例上超时了，这是因为使用递归方式，直接暴力计算，**造成了大量重复计算**。



我们在仔细想想这个问题。



我们真的需要考虑插入的所有的情况吗？



真的需要吗？



我们是不是只需要考虑将字符串**插入首、尾两种情况呢**？



因为这两种情况，才可能出现最大的子序列数。

## v2-特殊情况
只需要改动这个地方，即只考虑首位情况。



![](https://oss1.aistar.cool/elog-offer-now/b9774f31f08f24b419324ecb3d6d5e45.png)



很遗憾，最后还是超时了。



![](https://oss1.aistar.cool/elog-offer-now/990067eeefc17d41385b137395fec4df.png)

# 贪心算法
再一次思考，这个问题可不可以更简单？



遍历字符串，并且同时统计两个字符出现的频数。如果遇见 pattern[1]，就可以和前面出现过的 pattern[0] 组成子序列。



然后我们插入字符：

+ 如果加上 pattern[0]， 就加在字符串开头，与字符串中的 pattern[1] 组成新的子序列。
+ 如果加上 pattern[1]， 就加在字符串结尾，与字符串中的 pattern[0] 组成新的子序列。

最终新增的子字符串数量为两个字符频数的最大值，加到结果中并返回。

## v3-贪心
```go
func maximumSubsequenceCount(text string, pattern string) int64 {
    var res, cnt1, cnt2 int64
    for _, c := range text {
        if byte(c) == pattern[1] {
            res += cnt1
            cnt2++
        }
        if byte(c) == pattern[0] {
            cnt1++
        }
    }
    if cnt1 > cnt2 {
        return res + cnt1
    }
    return res + cnt2
}
```

# 思考


如果 pattern 的长度是 3 呢？



是 m 呢？



