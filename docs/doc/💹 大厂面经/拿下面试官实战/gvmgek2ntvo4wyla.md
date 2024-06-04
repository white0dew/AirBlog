---
title: GPT-4o的发布，留给程序员的后路不多了。。。
urlname: gvmgek2ntvo4wyla
date: '2024-06-04 08:29:56'
updated: '2024-06-04 08:30:26'
description: 大家好，我是白露，全栈工程师。今天凌晨，OpenAI发布了GPT-4o。然后，朋友圈就炸了。一方面是大部分搞 ai的朋友在狂欢，aigc已来！另一方面，是其他领域的朋友在反思、苦笑、焦虑，特别是程序员：我还还要多久才会被 AI 取代？从去年GPT3出现，我就是一个 AI 深度用户，因此起床的第...
---
大家好，我是白露，全栈工程师。

今天凌晨，OpenAI发布了GPT-4o。然后，朋友圈就炸了。

---

一方面是大部分搞 ai的朋友在狂欢**，aigc已来！**

另一方面，是其他领域的朋友在反思、苦笑、焦虑，特别是程序员：**我还还要多久才会被 AI 取代？**

从去年GPT3出现，我就是一个 AI 深度用户，因此起床的第一时间我就登录试了试。

可以说无论是逻辑推理、数学计算，还是知识储备，GPT-4o都在其前身的基础上实现了质的飞跃。

最离谱的是反应速度，已经基本上可以做到**实时了**。

刹那之间，我脑海里就想到一个很直观的应用：**那就是让GPT来帮我写代码，我说，它写。**

我们直接语音交流，它给出代码实现。我只需要负责整体架构的正确性，以及防止它在细节问题上跑偏……我的生产力起码得❌5倍！

---

AI出现的这一年来，**我一直认为 AI 是一个放大器，放大你原本的能力**。

作为程序员应对AI技术持续进步的策略，在于找到一个专业领域并深入钻研。

当我们对某一细分领域有了深刻的理解后，便拥有了外行人所无法比拟的优势。

这里，我想分享一个简单的例子来说明这一点。 

---

著名数学家陶哲轩运用GPT辅助自己的科研。

他通过ChatGPT来解决数学难题，而普通人即便使用同样的工具，也只能看到一堆难以理解的符号罢了。

原因在于，陶哲轩拥有足够的数学基础和深刻的领域知识，能够理解并应用GPT给出的答案。 

因此，无论AI技术如何发展，重点都在于你对所属领域的认知深度和广度。

回到程序员行业，如果我们每天仅满足于完成基本的增删改查（CRUD）操作，从未深究业务逻辑背后的深层次原因，也没有深入探索过使用的框架背后的底层原理，那么，面对GPT-4o这样的技术进步，可能真的会面临被淘汰的风险。 

换言之，作为程序员，我们应深化知识技能，掌握深层逻辑与机理。这样，即便面对强大的AI进步，我们也能保持自身的竞争力和价值。

---

话不多收，我们来看一道简单的题吧，**对题目不感兴趣的同学，可以跳到最后，有GPT4o的立即使用链接**。
# 如何设计微信抢红包功能？

**面试官**: 你好，今天我们讨论一个问题：模拟微信发红包，假设有n个人抢总金额为m的红包，请设计一个算法来实现这个功能。首先，请你给出你的初步想法。

**求职者**: 对于这个问题，我的初步想法是使用随机分配的方法，每次从剩余金额中随机出一个数作为一个人的红包金额，但需要确保每个人至少能拿到0.01元。为了实现这个，我可能会在每次分配前计算一个上限，确保即使后面每个人都只拿到最小金额，也不会超出总金额。
简单来说，我的想法是这样的： 
每次在(0, m)这个区间内随机一个值，记为r； 
计算一下剩余金额m-r，剩余金额m-r必须大于(n-1)*0.01，不然后面的n-1个人无法完成分配；
 按照顺序随机n-1次，最后剩下的金额可以直接当做最后一个红包，不需要随机；

这里是一个简单的实现：
```python
import random

def allocate_money(m, n):
    if n * 0.01 > m:
        raise ValueError("Not enough money or too many people")
    allocations = []
    m = round(m, 2)
    while n > 1:
        max_alloc = round((m - (n - 1) * 0.01), 2)
        alloc = round(random.uniform(0.01, max_alloc), 2)
        allocations.append(alloc)
        m -= alloc
        n -= 1
    allocations.append(round(m, 2))  # 最后一个人拿走剩余金额
    return allocations
```

**面试官**: 这个实现是一个不错的开始，它确保了每个人都能拿到至少0.01元。

但是，你有没有发现，**就是红包金额越来越小，等于说：谁先抢，谁能抢到的红包金额就越大**。

不公平的问题主要体现在前面的区间太大。

而且如果我们考虑到可能有数百甚至数千人参与抢红包，这个方法可能会导致一些性能问题，究其原因在于越往后，金额的可用区间就越小，随机的压力就越大。

你有没有考虑过其他的分配方案？

**求职者**: 是的，我了解到还有一种叫做"二倍均值法"的算法，它可以在保持公平性的同时提高分配的效率。我可以尝试用它来实现这个功能。这里是它的代码：

```python
def allocate_money_2(m, n):
    if n * 0.01 > m:
        raise ValueError("Not enough money or too many people")
    allocations = []
    m = round(m, 2)
    for i in range(n - 1):
        avg = m / (n - i)  # 计算剩余人均金额
        max_alloc = min(round(avg * 2, 2), m - 0.01 * (n - i - 1))  # 保证至少有0.01元
        alloc = round(random.uniform(0.01, max_alloc), 2)
        allocations.append(alloc)
        m -= alloc
    allocations.append(round(m, 2))  # 最后一个人拿走剩余金额
    return allocations
```

**面试官**: 二倍均值法是一个很好的改进，确实可以提高效率。但是，为了进一步提高性能并处理更极端的情况，比如1万元分给3万人，你还能想到更优的方法吗？

**求职者**: 对于这种极端情况，我会考虑使用"线段切割法"。
线段切割法的思路大致如下：
 1、将红包的分配过程想象成线段切割，红包的总金额为线段的总长度； 

2、在线段上标记处N-1个不重复的点，线段就被切割成了N分长度(金额)不同的小线段； 

3、标记方法：每次都在(0, m)这个区间随机出一个值，即为标记点； 

4、最后计算相邻标记点之间的差距（子线段长度）即为红包金额；

这种方法可以更均匀地分配金额，而且在面对大量参与者时可以保持较高的性能。以下是线段切割法的代码实现：

```python
def allocate_money_3(m, n):
    if n * 0.01 > m:
        raise ValueError("Not enough money")
    allocations = []
    points = [0.01 * i for i in range(n)]  # 生成切割点
    m -= 0.01 * n  # 预留出最小金额
    for _ in range(n - 1):
        point = random.uniform(0.01, m)
        while point in points:  # 避免重复切割点
            point = random.uniform(0.01, m)
        points.append(point)
    points.append(m + 0.01 * n)  # 加上预留的金额
    points.sort()
    allocations = [round(points[i+1] - points[i], 2) for i in range(n)]
    return allocations
```


**面试官**: 这个方法确实能在大量用户抢红包时保持高性能。但在你的代码中，我发现你使用了一个列表来存储所有的切割点，并且还有一个检查点是否存在的步骤。这可能会在切割点非常多的情况下导致性能问题。有没有办法优化这部分？

**求职者**: 您提到了一个很好的点。我们可以通过使用集合（在Python中是`set`）来存储切割点，而不是列表，因为集合的查找时间复杂度是O(1)，而列表是O(n)。让我重新实现一下这个算法：
```python
def allocate_money_3_optimized(m, n):
    if n * 0.01 > m:
        raise ValueError("Not enough money")
    allocations = []
    points = set()
    m_rounded = round(m - 0.01 * n, 2)  # 预留出最小金额并四舍五入
    while len(points) < n - 1:
        point = round(random.uniform(0.01, m_rounded), 2)
        points.add(point)  # set会自动处理重复的情况
    points = list(points)
    points.append(0)  # 加入起点
    points.append(m_rounded + 0.01 * n)  # 加入终点
    points.sort()
    allocations = [round(points[i+1] - points[i], 2) for i in range(n)]
    return allocations
```

**面试官**: 这个优化很好，今天的问题就到这，等后续通知吧。


