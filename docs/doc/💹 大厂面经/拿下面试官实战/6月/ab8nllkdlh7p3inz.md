---
title: 6.8 阎王爷背上是不是纹的拼多多？
urlname: ab8nllkdlh7p3inz
date: '2024-06-13 21:14:36'
updated: '2024-06-13 21:14:43'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1717948488993-a3d95deb-95ee-43f9-93aa-345c5f125dfc.png'
description: 大家好，我是白露啊。昨天端午在刷帖子的时候，看到一个让人哭笑不得的吐槽，忍不住要和大家分享一下。帖子的标题是：“阎王爷背上是不是纹的拼多多”，接着是一段满满都是血泪的控诉。这哪里是工作，简直像是进“十八层地狱”。不仅工时长得吓人，每一分钟都被盯着，连喝水上厕所都成问题，忍不住感叹周扒皮遇到这种...
---
大家好，我是白露啊。

昨天端午在刷帖子的时候，看到一个让人哭笑不得的吐槽，忍不住要和大家分享一下。帖子的标题是：“阎王爷背上是不是纹的拼多多”，接着是一段满满都是血泪的控诉。
![截屏2024-06-09 23.54.43.png](https://oss1.aistar.cool/elog-offer-now/8155974117e595b0e3eddaa08a63ccb5.png)

这哪里是工作，简直像是进“十八层地狱”。不仅工时长得吓人，每一分钟都被盯着，连喝水上厕所都成问题，忍不住感叹周扒皮遇到这种公司也会喊“祖师爷”！

这位小伙伴很显然是被拼多多的所谓“高薪”吸引进来的，但没想到进去后发现根本没时间花钱，简直后悔得肠子都青了。当时没有来得及等其他公司的offer，这位同学有点后悔了。

但是，可能去了其他公司，说不准又回后悔没有选工资更高的拼多多··？哎

最让人绝望的是，签了竞业协议，现在因为这个“约束”，想走也走不了，只能在这个“地狱”里继续煎熬。每想到此，真是让人无力又无奈，简直是在折磨员工的身心。

看了这位同学的故事，白露不得不说，当前的职场环境和激烈的竞争压力确实很大，**不仅要拼命工作，还要应对各种限制和不合理的条款**。

希望这位网友，以及所有在职场上苦苦挣扎的朋友们，能够找到一种方法让自己保持健康和心理平衡。毕竟健康和生活质量是无价的。

各位小伙伴们，有没有类似的职场经历或者被公司的各种“条条框框”搞得崩溃的经历？欢迎在评论区留言分享。好了，今天才上班我们就来看一篇轻松的算法题，如果不想看，可以直接跳转到文末，有惊喜哦～
# 开始面试
![截屏2024-06-09 23.35.51.png](https://oss1.aistar.cool/elog-offer-now/35897f470f884f6fb389f42af40080c3.png)
解题思路：

1. 创建一个新的链表来存储结果，以及一个节点指针用于追踪当前操作的节点。
2. 遍历两个输入的链表，直到两个链表都到达末尾。
3. 在遍历的过程中，将两个链表当前节点的值相加，如果上一步有进位，也加上进位的值。
4. 计算总和后，将总和的个位数作为新节点添加到结果链表的末尾，并计算是否有进位（即总和是否大于等于10）。
5. 如果两个链表的长度不一致，继续遍历较长的链表，重复步骤3和4。
6. 遍历完两个链表后，如果还有进位，将进位作为新节点添加到结果链表的末尾。
7. 返回结果链表的头节点。

**Java实现：**
```java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;
        while (l1 != null || l2 != null) {
            int x = (l1 != null) ? l1.val : 0;
            int y = (l2 != null) ? l2.val : 0;
            int sum = carry + x + y;
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        if (carry > 0) {
            curr.next = new ListNode(carry);
        }
        return dummy.next;
    }
}
```

**Go实现：**
```go
type ListNode struct {
    Val  int
    Next *ListNode
}

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    dummy := &ListNode{0, nil}
    curr := dummy
    carry := 0
    for l1 != nil || l2 != nil {
        x, y := 0, 0
        if l1 != nil {
            x = l1.Val
            l1 = l1.Next
        }
        if l2 != nil {
            y = l2.Val
            l2 = l2.Next
        }
        sum := carry + x + y
        carry = sum / 10
        curr.Next = &ListNode{sum % 10, nil}
        curr = curr.Next
    }
    if carry != 0 {
        curr.Next = &ListNode{carry, nil}
    }
    return dummy.Next
}
```

这两种实现避免了在输入链表末尾添加额外的零节点，而是直接在遍历过程中处理了长度不一致的情况，这样代码更加简洁易懂，同时也减少了不必要的操作。

咋样，你会了吗？
