---
title: 百度二面面经
urlname: iv44cpd623e9qmcm
date: '2024-07-13 14:40:01'
updated: '2024-07-27 20:40:50'
description: '面经docker与虚拟机的区别docker是怎样实现资源隔离和资源限制的docker如何实现相互通信docker file了解吗（不了解）说一下epoll水平触发和边缘触发sql题，给stu_id,stu_score,stu_name求平均分having是干嘛的手撕：二叉树最大路径和说一下几个...'
---
# 面经
docker与虚拟机的区别
docker是怎样实现资源隔离和资源限制的
docker如何实现相互通信
docker file了解吗（不了解）
说一下epoll
水平触发和边缘触发
sql题，给stu_id,stu_score,stu_name求平均分
having是干嘛的
手撕：二叉树最大路径和
说一下几个在项目中遇到的难点，最能体现你技术的点
反问：如何学习k8s
> 原帖链接：[https://www.nowcoder.com/feed/main/detail/539defc84556425987f2c750b73c4e4c?sourceSSR=search](https://www.nowcoder.com/feed/main/detail/539defc84556425987f2c750b73c4e4c?sourceSSR=search)

# 参考回答
**面试官**：Docker和虚拟机有什么区别？
**应聘者**：嗯，这个问题挺常见的。Docker和虚拟机最大的不同就是Docker更轻量。虚拟机是完整的操作系统，而Docker只是共享主机的内核。所以Docker启动更快，占用资源更少。但是呢，虚拟机隔离性更好，安全性可能更高一些。
**面试官**：Docker是怎样实现资源隔离和资源限制的？
**应聘者**：Docker主要是用了Linux的一些特性来实现的。比如说，用cgroups来限制CPU、内存这些资源的使用，用namespace来隔离进程、网络、文件系统这些。这样每个容器就像是独立的环境，互不影响。
**面试官**：Docker如何实现相互通信？
**应聘者**：Docker容器间通信主要有几种方式。最简单的就是用Docker网络了，创建一个网络，把容器都加进去，它们就能互相通信了。还可以用端口映射，把容器的端口映射到主机上。如果是同一个主机上的容器，还可以用IPC共享内存或者volume共享文件来通信。
**面试官**：Docker file了解吗？
**应聘者**：抱歉，这个我不太了解。我主要是使用现成的Docker镜像，还没有自己写过Dockerfile。
**面试官**：那你能说说epoll吗？
**应聘者**：epoll是Linux下的一种I/O多路复用机制，效率比select和poll高多了。它能同时监控多个文件描述符，当I/O事件发生时，只需要遍历那些发生了事件的fd，不用像select那样遍历所有的fd。所以在高并发的场景下，epoll特别有用。
**面试官**：水平触发和边缘触发有什么区别？
**应聘者**：这两个是epoll的工作模式。水平触发就是只要有数据就一直通知你，而边缘触发是有新的数据到达的时候才通知你。用边缘触发的话，你得一次性把数据都读完，不然就不会再通知了。所以边缘触发效率更高，但是编程更难一些。
**面试官**：给你一个SQL题目，有stu_id, stu_score, stu_name这些字段，你怎么求平均分？
**应聘者**：哦，这个简单。用AVG函数就行了：
```sql
SELECT AVG(stu_score) as average_score FROM student_table;
```
如果想按学生分组的话，可以加个GROUP BY：
```sql
SELECT stu_name, AVG(stu_score) as average_score 
FROM student_table 
GROUP BY stu_name;
```
**面试官**：HAVING是干什么的？
**应聘者**：HAVING主要是用来过滤分组后的数据的。比如说，我们想找出平均分大于80的学生，就可以这么写：
```sql
SELECT stu_name, AVG(stu_score) as average_score 
FROM student_table 
GROUP BY stu_name
HAVING average_score > 80;
```
它和WHERE的区别就是，HAVING是在分组之后进行过滤，而WHERE是在分组之前。
**面试官**：好的，现在来道算法题。求二叉树的最大路径和。
**应聘者**：嗯，这题我们可以用递归来解决。基本思路是对每个节点，我们计算包含它的最大路径和。这个和可能是节点值加左子树的最大路径和，或者是节点值加右子树的最大路径和，或者是节点值加左右子树的最大路径和。我们用一个全局变量来记录最大值。大概的代码是这样：
```python
class Solution:
    def maxPathSum(self, root):
        self.max_sum = float('-inf')
        
        def max_gain(node):
            if not node:
                return 0
            
            left_gain = max(max_gain(node.left), 0)
            right_gain = max(max_gain(node.right), 0)
            
            path_sum = node.val + left_gain + right_gain
            self.max_sum = max(self.max_sum, path_sum)
            
            return node.val + max(left_gain, right_gain)
        
        max_gain(root)
        return self.max_sum
```
这样，时间复杂度是O(n)，n是节点数，因为我们遍历了每个节点一次。空间复杂度是O(h)，h是树的高度，因为递归调用栈的深度最大是树的高度。
**面试官**：说说你在项目中遇到的难点，最能体现你技术能力的点。
**应聘者**：嗯，让我想想。我觉得最有挑战性的是我们做的一个高并发的订单系统。我们遇到的主要问题是数据库压力大，还有就是出现了一些数据不一致的情况。
为了解决这些问题，我们做了几个优化：

1. 首先，我们用了Redis来做缓存，减轻数据库压力。
2. 然后，我们把一些不需要实时处理的操作，比如发送通知啊，更新统计数据啊，都放到消息队列里异步处理。
3. 对于数据一致性问题，我们实现了分布式事务，用的是两阶段提交协议。

这个过程中，我学到了很多关于缓存、消息队列和分布式事务的知识。最重要的是，我更深入地理解了如何设计可扩展的系统架构。
**面试官**：好的，你还有什么想问的吗？
**应聘者**：是的，我想请教一下，您觉得学习k8s最好的方式是什么？
**面试官**：学习k8s，我建议你可以先从官方文档开始，理解基本概念。然后搭建一个本地的minikube环境，动手实践。再就是跟着一些实战教程走一遍，比如部署一个完整的应用。最后，参与一些开源项目或者在工作中实际使用，才能真正掌握。记住，k8s是个复杂的系统，需要慢慢积累经验。
**应聘者**：明白了，谢谢您的建议！
**面试官**：好的，今天的面试就到这里，我们后续会通知你结果。
**应聘者**：好的，非常感谢您的时间。期待您的好消息，再见！
