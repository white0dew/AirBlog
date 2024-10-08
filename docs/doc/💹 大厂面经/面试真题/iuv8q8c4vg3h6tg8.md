---
title: 字节三次面试面经
urlname: iuv8q8c4vg3h6tg8
date: '2024-10-02 23:07:25'
updated: '2024-10-02 23:10:21'
description: 一面MySQL相关MySQL CPU飙高如何排查？整个系统的性能瓶颈是什么？如何排查的慢SQL？MySQL的索引结构是什么？详细讲一下B +树。MySQL的数据在B +树上是如何存储的？GC垃圾回收相关讲一下GC垃圾回收。GC垃圾回收时CPU大概会提升多少？Redis相关Redis的过期删除机...
---
# 一面
1. **MySQL相关**
    - MySQL CPU飙高如何排查？
    - 整个系统的性能瓶颈是什么？
    - 如何排查的慢SQL？
    - MySQL的索引结构是什么？详细讲一下B +树。MySQL的数据在B +树上是如何存储的？
2. **GC垃圾回收相关**
    - 讲一下GC垃圾回收。
    - GC垃圾回收时CPU大概会提升多少？
3. **Redis相关**
    - Redis的过期删除机制是什么？他的定时删除会发生冲突吗？
    - Redis内存淘汰策略
4. **IO相关**
    - 讲一下IO多路复用，线程的资源占用大概是多少？
    - select、poll、epoll的区别。为什么epoll性能好？
5. **算法题**
    - 奇偶链表排序

# 二面
1. **EPoll相关**
    - EPoll是什么？
2. **IO模式相关**
    - 同步IO和异步IO的区别在哪？如何将同步IO修改为异步IO？
    - 常见的IO模式有哪些？这些IO模式有哪些区别？
3. **进程和线程相关**
    - 进程和线程的区别？
    - GMP模型中线程是一个什么样的角色？
    - 进程间的通信方式？
    - 命名管道和匿名管道的区别。
4. **磁盘访问相关**
    - 应用访问一块磁盘上的数据需要哪些步骤？讲一下上述过程中页表发生的变化。如何理解DMA？
5. **数据库设计相关**
    - 设计一个数据库的表，需要遵循哪些原则？
    - 优化MySQL插入可以从哪几个角度进行优化？
6. **网络相关**
    - Socket和WebSocket的区别？socket的组成
    - TCP拥塞控制包括哪些阶段？
7. **算法和数据结构相关**
    - 如何判断1亿个数某一个数是否存在，数的取值范围是1到1万亿。需要精确判断。
    - 字符串反转

# 三面
1. **MySQL锁相关**
    - MySQL锁机制讲一下。锁相关的这个使用上面有什么需要注意的吗？
    - MySQL读select的性能优化方案。
    - MySQL读写分离和水平扩展的方式。
    - 读多写少的场景，数据不经常发生变化，如何处理？
2. **Redis相关**
    - redis的性能受限于什么？如果需要对Redis性能进行扩展的话怎么做？
    - Redis集群模式和主从模式有什么区别？集群模式下热key如何处理？
    - 如何保障缓存和数据库的一致性？删除缓存后的缓存击穿如何处理？
3. **数据结构相关**
    - zset有了解过吗？跳表有什么好处？zrange和zrangeby的时间复杂度是多少？
4. **场景题和算法题**
    - 场景题：打赏排行榜
    - 大数乘法

