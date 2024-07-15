---
title: 美团后端日常实习一面面经
urlname: ptnpq2ugcgpw5404
date: '2024-07-13 14:34:19'
updated: '2024-07-13 14:34:27'
description: '1、自我介绍2、挑选一个你觉得最有价值的项目说一下：说了一个数据中台的项目。其中有两个有意思的地方。（1）一个控制反转思想设计的外键依赖自动检查工具。详情见博客：https://blog.csdn.net/qq_28625359/article/details/140147873?spm=10...'
---

1、自我介绍
2、挑选一个你觉得最有价值的项目说一下：说了一个数据中台的项目。其中有两个有意思的地方。
（1）一个控制反转思想设计的外键依赖自动检查工具。详情见博客：[https://blog.csdn.net/qq_28625359/article/details/140147873?spm=1001.2014.3001.5502](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fblog.csdn.net%2Fqq_28625359%2Farticle%2Fdetails%2F140147873%3Fspm%3D1001.2014.3001.5502)
（2）一套用标签机制实现搜索的设计。详情见博客：[https://blog.csdn.net/qq_28625359/article/details/140148327?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22140148327%22%2C%22source%22%3A%22qq_28625359%22%7D](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fblog.csdn.net%2Fqq_28625359%2Farticle%2Fdetails%2F140148327%3Fcsdn_share_tail%3D%257B%2522type%2522%253A%2522blog%2522%252C%2522rType%2522%253A%2522article%2522%252C%2522rId%2522%253A%2522140148327%2522%252C%2522source%2522%253A%2522qq_28625359%2522%257D)。
3、聊了一下标签机制里面存SQL会遇到的SQL注入，怎么解决：输入参数校验、转换编码。
4、又聊了一下存储安全，数据脱密脱敏。我的思路：对于身份证、手机号等数据进行非对称加密、对于密码存储可重复加密结果，输入数据通过加密结果判断。面试官补充：可以多次加密。一般数据库漏了源码肯定也漏了。所以可以考虑密钥的异地/特殊机制存储。
5、mysql、redis、es的选型和功能区别。大量数据持久化选mysql，少量数据求高速用redis，全文检索用ES。然后又拓展开详细讲了讲mysql和redis的区别。
6、redis支不支持事务。感觉有点懵，没背过这八股啊，蒙了个支持。刚下来思考了一下，redis其实不太会遇到事务的问题，因为核心线程只有一个。
7、详细讲讲mysql怎么实现事务的。还是老一套，ACID+四个问题+MVCC和锁
8、了解mysql哪些log，详细说说。undo，redo，bin。undo，redo是innodb的，bin是上层模块的。undo用于解决事务问题。redo用于半持久化。bin用于长期持久化加主从同步。
9、算法题：有序链表去重，五分钟秒了。
10、时间剩的还有点多，面试官又问了问了不了解线程池。我说没用过但知道，背诵核心参数、线程池类型。看差不多快一个小时了，就停了。
11、反问：部门业务。Base地、几轮面试（一轮）

作者：牛客781705666号
链接：[https://www.nowcoder.com/](https://www.nowcoder.com/)
来源：牛客网  
