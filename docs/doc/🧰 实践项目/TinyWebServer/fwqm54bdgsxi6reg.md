---
title: Reactor与Proactor 两种事件分发模式？
urlname: fwqm54bdgsxi6reg
date: '2024-05-28 16:38:33'
updated: '2024-05-28 16:40:16'
cover: 'https://cdn.nlark.com/yuque/0/2021/png/22382235/1634002490029-c029c3ec-c80f-4fed-8f40-d4f05ac77f1b.png'
description: 在多线程服务器中，一般是使用IO复用+线程池来实现，具体的实现方式有：Reactor和Proactor。例如为人所知的Netty、Redis等就是使用Reactor实现的，具有很高的性能。简单来说，两者都是基于事件分发所实现的网络编程模型。Reactor模式下是一种非阻塞同步模式，其感知的是已...
---
在多线程服务器中，一般是使用IO复用+线程池来实现，具体的实现方式有：Reactor和Proactor。例如为人所知的Netty、Redis等就是使用Reactor实现的，具有很高的性能。

**简单来说**，两者都是基于**事件分发**所实现的网络编程模型。
**Reactor模式下是一种非阻塞同步模式，其感知的是已就绪的可读写连接事件**，由一个或多个Reactor节点负责进行事件的监听和分发，由任务Handler来处理具体的读写、业务逻辑；
**而Proactor模式下，是一种异步模式，其感知的是已完成的读写事件，**其读写数据都是通过异步IO来实现的。
# Reactor
Reactor模式又称反应器、分发器Dispatcher模式。其主要有两部分构成：Reactor节点和Handler：

- Reactor节点**负责监听事件并将其分发**，所谓的事件是指基于socket的连接、读写、异常等，不清楚的可以查阅[Socket网络编程与IO多路复用](https://zhuanlan.zhihu.com/p/418293949)；
- Handler**负责对分发的事件进行处理**，例如建立连接，或是从对应的socket端口中读取数据-》进行业务处理-》将结果写入socket中；

针对不同的业务场景和性能要求，Reactor节点与Handler节点的数量都是可变的，而Handler其实就是实际中的线程或者进程，因此Reactor模式又可以进一步划分为四种方案：

- 单 Reactor 单进程 / 线程；
- 单 Reactor 多进程 / 线程；
- 多 Reactor 单进程 / 线程；
- 多 Reactor 多进程 / 线程；

其中，第三种实现复杂并且实际性能无优势，其实很少使用。
## 单Reactor单进程/线程
这种方案的示意图大致如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/febca94ecf6da2e6899d9360a48ad29a.png)
其中，Acceptor可以看成是特殊的Handler，其工作是与客户端建立连接。

在该方案下的**Reactor模型工作流程如下**（参考[小林](https://mp.weixin.qq.com/s/GRkZ1IEfTalQSkErWe1SAg)）：

- Reactor 对象通过 select/poll/epoll （IO 多路复用接口） 监听事件，收到事件后通过 dispatch 进行分发，具体分发给 Acceptor 对象还是 Handler 对象，还要看收到的事件类型；
- 如果是连接建立的事件，则交由 Acceptor 对象进行处理，Acceptor 对象会通过 accept 方法 获取连接，并创建一个 Handler 对象来处理后续的响应事件；
- 如果不是连接建立事件， 则交由当前连接对应的 Handler 对象来进行响应；
- Handler 对象通过 read -> 业务处理 -> send 的流程来完成完整的业务流程。

该方案的优点即是实现简单，不需要考虑多进程/多线程通信或是资源竞争。缺点一是**单进程无法完全释放CPU的性能**；二是由于只有一个Handler，**如果某个客户业务处理时间较长**，就会影响整体的响应延迟。

其实上面两个缺点都是一个意思：**没有使用多核，并且业务逻辑处理耗时太长，只适用于业务处理非常快的场景。**

但实际上该方案也有高性能的实现例子，那就是Redis，Redis之所以有如此高的性能，究其原因，是因为所有的业务处理都是基于内存处理，不会有较高的延迟。

一个单Reactor单线程的Java demo可以参考链接：[https://www.cnblogs.com/crazymakercircle/p/9833847.html](https://www.cnblogs.com/crazymakercircle/p/9833847.html)。

**基于C++实现的Reactor模型可以参考：**
[使用C++实现简单的Reactor模式](https://www.jianshu.com/p/01f3fb1d4cb5) 
[reactor模式C++实现](https://blog.csdn.net/u011693064/article/details/71629422)
## 单Reactor多进程/线程
为了能够发挥多核CPU的性能，我们对上一个方案进行改进：
![image.png](https://oss1.aistar.cool/elog-offer-now/7723b132d5d01b9921ca9e1ebca2e518.png)
其实相比于单线程/单进程方案，第二种方案最显著的区别就是引入了线程池的概念。即将Handler处理器的执行放入线程池，多线程进行业务处理。

该方案下需要解决多线程之间的资源竞争问题，但能够充分发挥多核CPU的性能。不过在其性能瓶颈可能存在于Reactor节点，由于它负责所有事件的监听，**在短时间高并发的场景下，很可能造成事件响应延迟**。
## 多Reactor多进程/线程
为了解决上述单Reactor单进程/线程的隐患，引入多Reactor节点：
![image.png](https://oss1.aistar.cool/elog-offer-now/67cf430582fd29871636c9e3cf1bf8c8.png)
其工作流程：

- 主线程中的 MainReactor 对象**通过 select /poll/epoll监控连接建立事件**，收到事件后通过 Acceptor 对象中的 accept  获取连接，**将新的连接分配给某个子线程**；
- 子线程中的 SubReactor 对象将 MainReactor **对象分配的连接加入 select 继续进行监听**，并创建一个 Handler 用于处理连接的响应事件。
- 如果有新的事件发生时，SubReactor 对象会调用当前连接对应的 Handler 对象来进行响应。
- Handler 对象通过 read -> 业务处理 -> send 的流程来完成完整的业务流程。

也就是说在多Reactor节点下，**主线程只负责接收新连接，子线程负责完成后续的业务处理**。另外，主线程只需要把新连接传给子线程，子线程无须返回数据，直接就可以在子线程将处理结果发送给客户端。

该方案的典型应用有Netty和Memcache。
# Proactor
Proactor模式的示意图如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/023c52ac8e7a89cf754fc98f289799c4.png)
其工作流程如下：

- Proactor Initiator **负责创建 Proactor 和 Handler 对象**，并将 Proactor 和 Handler 都通过
Asynchronous Operation Processor 注册到内核；
- Asynchronous Operation Processor **负责处理注册请求，并处理 I/O 操作**；
- Asynchronous Operation Processor **完成 I/O 操作后通知 Proactor**；
- Proactor 根据不同的事件类型**回调不同的 Handler 进行业务处理**；
- Handler 完成业务处理；

可知，在Proactor模式下，**主线程和内核负责处理读写数据、接受新连接等I/O操作**，工作线程仅负责业务逻辑，如处理客户请求，**通常由异步I/O实现**。由于Linux下对于异步IO的支持不完善，因此在Linux还没有较为成熟的Proactor模型。

不过可以使用同步IO来模拟Proactor模型：
> - 主线程往epoll内核事件表注册**socket上的读就绪事件**。
> - 主线程调用epoll_wait等待**socket上有数据可读**
> - 当socket上有数据可读，epoll_wait通知主线程,**主线程从socket循环读取数据，直到没有更多数据可读**，然后将读取到的数据封装成一个请求对象并插入请求队列。
> - 睡眠在**请求队列上某个工作线程被唤醒，它获得请求对象并处理客户请求**，然后往epoll内核事件表中注册该socket上的写就绪事件
> - 主线程调用epoll_wait等待socket可写。
> - 当socket上有数据可写，epoll_wait通知主线程。**主线程往socket上写入服务器处理客户请求的结果**。

基于该模拟Proactor模型实现的Web服务器可以参考[链接](https://link.zhihu.com/?target=https%3A//github.com/white0dew/WebServer)。

由于Windows下有完整的异步接口支持方案，因此可以实现Proactor模型，具体可以参考：[采用完成端口（IOCP）实现高性能网络服务器（Windows c++版）](https://www.cnblogs.com/yuanchenhui/p/iocp_windows.html)
# 参考资料
[小林coding](https://mp.weixin.qq.com/s/GRkZ1IEfTalQSkErWe1SAg)
[最新版Web服务器项目详解 - 02 半同步半反应堆线程池（上）](https://mp.weixin.qq.com/s?__biz=MzAxNzU2MzcwMw==&mid=2649274278&idx=4&sn=caa323faf0c51d882453c0e0c6a62282&chksm=83ffbefeb48837e841a6dbff292217475d9075e91cbe14042ad6e55b87437dcd01e6d9219e7d&scene=0&xtrack=1#rd)
