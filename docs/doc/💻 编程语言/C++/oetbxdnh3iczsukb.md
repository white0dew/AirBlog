---
title: "搞懂Socket网络编程 \U0001F914"
urlname: oetbxdnh3iczsukb
date: '2024-05-28 16:46:28'
updated: '2024-05-28 16:46:56'
cover: 'https://cdn.nlark.com/yuque/0/2021/png/22382235/1632469452426-1d73ba73-7388-4605-8522-1bde02a33211.png'
description: 进一步学习select、poll、epoll。Socket网络编程学过计算机网络的同学应该都看得懂这幅图：一个进程进行网络传输的过程可以分为两个阶段：第一阶段：在用户态下，将需要用到的数据封装，调用相应的系统函数如write/read，陷入内核态；第二阶段：在内核态下，内核根据拷贝至内核空间的...
---
进一步学习select、poll、epoll。
# Socket网络编程
学过计算机网络的同学应该都看得懂这幅图：
![image.png](https://oss1.aistar.cool/elog-offer-now/0b16ea1de3b1b1b364e140231065bfd7.png)
一个进程进行网络传输的过程可以分为两个阶段：

- **第一阶段**：在用户态下，将需要用到的数据封装，调用相应的**系统函数**如write/read，**陷入内核态**；
- **第二阶段**：在内核态下，内核根据拷贝至**内核空间**的数据依次运行TCP/IP协议栈，对应用数据进行封装（TCP/IP、IP、帧），而后将数据帧传给网卡，由网卡完成物理传输。

而在两个阶段之间进行衔接的则是一个被称为**套接字——Socket**的东西。简单来说，Socket获取内核态下TCP/IP协议栈所需要的必备信息，并为应用层的数据传输提供相应的接口。以常见的Unix服务器代码为例：
```cpp
//来自《Unix网络编程(卷一)》
//服务端代码
int main(int argc, char **argv)
{
	int					listenfd, connfd;
	struct sockaddr_in	servaddr;
	char				buff[MAXLINE];
	time_t				ticks;
	//创建新套接字
	listenfd = Socket(AF_INET, SOCK_STREAM, 0);

	bzero(&servaddr, sizeof(servaddr));
	servaddr.sin_family      = AF_INET;
	servaddr.sin_addr.s_addr = htonl(INADDR_ANY);//表示接收任何IP
	servaddr.sin_port        = htons(13);	/* daytime server 端口*/
	//绑定端口
	Bind(listenfd, (SA *) &servaddr, sizeof(servaddr));
	//监听端口
	Listen(listenfd, LISTENQ);
	//若有连接，就建立连接并处理业务逻辑
	for ( ; ; ) {
		connfd = Accept(listenfd, (SA *) NULL, NULL);

        ticks = time(NULL);
        snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
        Write(connfd, buff, strlen(buff));
		//关闭连接
		Close(connfd);
	}
}

//客户端代码
#include	"unp.h"
int main(int argc, char **argv)
{
	int					sockfd, n;
	char				recvline[MAXLINE + 1];
	struct sockaddr_in	servaddr;
	
	if (argc != 2)
		err_quit("usage: a.out <IPaddress>");
	//创建一个socket并初始化
	if ( (sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
		err_sys("socket error");

	bzero(&servaddr, sizeof(servaddr));
	servaddr.sin_family = AF_INET;
	servaddr.sin_port   = htons(13);	/* daytime server */
	if (inet_pton(AF_INET, argv[1], &servaddr.sin_addr) <= 0)
		err_quit("inet_pton error for %s", argv[1]);
	//连接对应的服务端
	if (connect(sockfd, (SA *) &servaddr, sizeof(servaddr)) < 0)
		err_sys("connect error");
	//读取数据
	while ( (n = read(sockfd, recvline, MAXLINE)) > 0) {
		recvline[n] = 0;	/* null terminate */
		if (fputs(recvline, stdout) == EOF)
			err_sys("fputs error");
	}
	if (n < 0)
		err_sys("read error");

	exit(0);
}
```
上文两段代码，就是最简易的Socket编程模板，分为**客户端与服务端**：
![image.png](https://oss1.aistar.cool/elog-offer-now/469a0c7ad0f5d6bd350947596a9fbfe8.png)
**对于服务端来说**，服务端首先通过socket()函数创建一个新的socket()并初始化；

而后将其绑定bind()到指定的端口（何谓端口？给同一个计算机上不同程序提供单独的数据口，防止冲突）；
> 服务端的端口一般是固定的，如HTTP是443协议；客户端的端口是在创建socket时系统随机分配的；


socket被创建出来时，默认为“主动套接字”，即作为客户端，若是在服务端就需要使用listen()函数将对应的socket变为“被动套接字”或称“监听套接字”；

accept()函数表示从**连接成功**的客户端中选一个进行业务处理。connect()函数若获取到一个连接，会返回一个新的**socket，**它与服务端一开始创建的socket不太一样，此时的socket被称为**已连接套接字，它已经完成了TCP连接，并完备了四元组：本地IP、本地端口、客户端IP、客户端端口。**

何谓连接成功？在Unix内核中，**维护了两个队列**，一个是**连接成功队列**，另一个是**还未完成三次握手连接的队列**。如下图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/ceb77ff783e41b71f50d27fd9b5b0fd0.png)
以办事处为例来解释**这两个队列**：某一天许多人都去街道办事处办手续，但在办手续之前需要填好表。办事处的员工在喇叭里喊道“请下一位。”如果**此时有人填好表了**，就可以立马进去了；**如果好几个人都填好表**，那就只能老老实实排队；如果**所有人都还在填表**，那么就只能听到喇叭一直在喊，但是没人走动。

其实从上面的例子以及代码就能看出，上述代码只是一个最简单的、最基本的服务器程序。**它在同一个时间只能服务同一个客户端**，如果此时其他客户端也想要接收服务，它就爱莫能助了。

为了解决**同时多人需要服务**这个问题，很简单，自然就想到了**多进程或者多线程模型**。
当接收到一个客户端时，服务端程序新建一个进程或者线程，由它来负责这个客户端就可以了。理想情况下，这种方式显然是最直观、最简单的解决方式。

但现实是每个电脑的**资源都是有限的**，总不能来了一亿客户端连接，就新建一亿个进程或者线程吧？那样确实很省事，然而资源不够，并且线程的新建/销毁影响CPU整体性能。

由于无法无限制地创建线程/进程来处理众多客户端连接，那就使用线程池技术，一个线程在**一定时间内**负责一个客户连接，通过线程在**各个客户连接之间切换**，最终达到同时处理这些客户连接。
> 有关多线程服务器和I/O多路复用服务器的区别可以参考[链接](https://blog.csdn.net/snoweaglelord/article/details/99681179)

**那么何时切换到下一个客户连接实现“雨露均沾”呢？**

以Http服务端为例，其响应客户端（此时已建立连接）的模式一般是：

- 客户端发起http请求报文（用户请求）
- 服务端去读取客户端的请求报文（读取报文）
- 服务端处理相应的业务逻辑（处理逻辑）
> 比如客户端的请求是修改自己的用户名，服务端就需要去修改相应的数据库

- 服务端将响应报文发送给客户端（响应报文）

即**请求-读取-逻辑-响应**，四个阶段，其中，认为逻辑处理极快，耗费时间的阶段主要为**读取/响应这两个IO操作。**

因此服务端**切换**客户连接的时机一般为**读取/响应IO操作，**以及**分配时间耗尽。**进一步讲解之前，先看看IO模型的分类。
# I/O分类
计算机的IO分为以下**五类**：

- 同步阻塞(blocking)式I/O：在调用该类I/O函数读取数据时，**直到读取数据完毕才会返回，否则进程/线程就阻塞到当前函数**，如果数据一直没有处理好，当前进程/线程一直处于阻塞状态，此时应用进程与内核数据之间的流转关系图如下：

![image.png](https://oss1.aistar.cool/elog-offer-now/c0c490604376bc9b7493221fcd9eba8a.png)

- 同步非阻塞式I/O：上面的阻塞式I/O有个很明显的缺点，那就是如果数据没有处理好，整个进程/线程就卡住了，无法做其他的业务逻辑，白白浪费了系统资源。非阻塞式I/O的区别就在于，如果数据没有准备好，那就返回一个错误信息，**由业务上层自行决定是继续等待数据还是处理其他的事情**，示意图如下：

![image.png](https://oss1.aistar.cool/elog-offer-now/266ace32907d0435b2b1c0696826e7bd.png)

- 信号驱动式I/O：这类IO其实是利用信号机制，当内核发现数据已经准备好了的时候，通过SIGIO信号去“激活”相应的信号处理程序，由信号处理程序来进行数据的读取，**这也是一个非阻塞的I/O**，如图：

![image.png](https://oss1.aistar.cool/elog-offer-now/0f0ca45efb93aadfd991c3dd7416089a.png)

- 异步I/O：之前的信号驱动式I/O是内核告诉应用程序**“数据已经准备好了，可以开始读取，Over”；**而异步I/O则是更进一步——**它直接说：“数据已经读取完毕了哈，不用客气，Over。” **深得张良隐退之精髓，事了拂衣去，深藏功与名。

![image.png](https://oss1.aistar.cool/elog-offer-now/b7a4ce25dc187ce3858904e19e9d3823.png)

- I/O多路复用：它的重点在于**同时检测多个I/O事件，**并提供能够快速找到对应事件的方法，重点在于**多个**；

![image.png](https://oss1.aistar.cool/elog-offer-now/11fb21fab11070631583ed3ef12e723e.png)
对上述五种I/O模型对比一下：
![image.png](https://oss1.aistar.cool/elog-offer-now/563bdb62baad80e8b475e0cedd5a7a85.png)
回到刚开始的问题“服务端**切换**客户连接的时机一般为**读取/响应IO操作，**以及**分配时间耗尽”。**
分配时间耗尽就是指每个客户连接不能一直占用某个线程，时间用完了就切换为其他客户连接。

而**读取/响应操作**，则是要求服务端知道何时某个连接Socket已经**可以进行操作(可读/可写)**了！此时可能有多个Socket都可以进行操作，服务端需要**某种手段找到对应的Socket**——这个手段就是I/O多路复用。

I/O多路复用可以由内核监测哪些Socket可以操作，而后通知用户进程进行操作。
虽然一个进程在同一时刻只能处理一个客户请求，但是如果每个客户请求处理速度很快，比如1 秒内处理上万个请求。站在宏观的角度来看，**此时多个客户请求复用了一个进程，这就是多路复用(也可以称为时分复用)的由来**。

总之，**多个网络或文件I/O复用一个或少量的线程来处理这些连接，即是所谓的I/O复用**。而要想实现I/O复用，关键就在于**如何高效**的获取到哪些Socket已经可以进行操作（读/写/异常）。

在Linux下三个具有代表性的库：**select/poll/epoll**。其中，select与poll其本质是基于“轮询”，时间复杂度为O(N)，N为所监测的套接字端口；epoll基于事件驱动，其时间复杂度为O(1)；
# select/poll
select实现IO多路复用的方式是**将需要监听的套接字端口（称为文件描述符）放入一个集合中**，而后将这个集合**拷贝到内核**中。内核通过**遍历集合**的方式来获取是否有端口需要执行事件，当检测到事件时，将对应的套接字端口**标记为可读可写**，而后将集合**拷贝回用户态**，在用户态中，还需要**通过一次遍历**来获取可读可写的套接字端口。

由此可见，基于select的方式需要进行**两次遍历**，**两次拷贝。**这就造成该方法的**效率不高**，除此之外，select使用固定长度的位图来标记套接字集合，由FD_SETSIZE限制，默认为1024，**因此有最大连接数端口的限制**；

poll实现多路复用的方式跟select很类似，不过poll使用**链表**来组织套接字端口，**从而没有了最大连接数端口的限制**。

select和poll都只提供了一个函数，例如select函数：
```c
 int select(int maxfdpl, fd_set *readset, fd_set *writeset, fd_set *exceptset,struct timeval *timeout);
```
select()函数的参数告诉内核我们所关心的文件描述符。
      •对每个描述符，我们是要想关注一个文件描述符中**读或者写**，还是关注一个描述符中是否出现**异常**，对应的参数是readset、wiriteset、exceptset；
      •要等待多长时间，是无限长？固定时间？不等待？

select函数返回后，内核告诉我们：根据我们的要求已经做好准备的描述符的**个数，**而后通过**轮询**之前所传入的文件描述符集合来找到对应的就绪文件描述符；
> 轮询与文件描述符的设置可以参考[select参数详解](https://blog.csdn.net/lingfengtengfei/article/details/12392449)，每次执行select之后，都需要**重新设置**文件描述符集合；


poll函数如下：
```c
int poll(struct pollfd *fdarray,unsigned long nfds,int timeout);
```
其中的pollfd结构体如下，可以看做是select的描述符集合：
```c
struct pollfd {
	int fd;	/*descriptor to check */
	short events;	/*events of interest on fd */ 输入的参数
	short revents;	/*events that occurred on fd */ 返回的参数
};
```
nfsd表示pollfd中的元素个数，timeout是等待时间。其中events与revents可设置的参数如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/3833793891f09b76de9a062084a3353b.png)
# epoll
epoll提供了三个函数：**epoll_create()建立一个epoll对象、epoll_ctl注册要监听的事件类型、epoll_wait收集发生的事件的连接**。

每一个epoll对象都有一个独立的eventpoll结构体，用于存放通过epoll_ctl方法向epoll对象中**添加进来的事件**。这些事件**都会挂载在红黑树中**，如此，**重复添加**的事件就可以通过红黑树而高效的识别出来(时间效率是lgn，其中n为树的高度)如果需要修改，直接修改红黑树相应的节点即可，不需要重新设置整个文件描述符。

而**所有添加到epoll中的事件**都与设备驱动程序建立驱动关系，当相应的事件发生时会调用对应回调方法。这个回调方法在内核中叫ep_poll_callback,**它会将发生的事件添加到rdlist双链表中**。对于每一个事件，都有一个epitem结构体：
```c
struct epitem{
    struct rb_node  rbn;//红黑树节点
    struct list_head    rdllink;//双向链表节点
    struct epoll_filefd  ffd;  //事件句柄信息
    struct eventpoll *ep;    //指向其所属的eventpoll对象
    struct epoll_event event; //期待发生的事件类型
}
```
当调用epoll_wait检查**是否有事件发生时**，只需要检查eventpoll对象中的rdlist双链表中**是否有epitem元素即可**。如果**rdlist不为空**，**则把发生的事件复制到用户态，同时将事件数量返回给用户**。
![image.png](https://oss1.aistar.cool/elog-offer-now/54c0f4aac9ec8f3ce2efb214bfba6a42.png)
> epoll是将对应的事件从内核态拷贝至用户态，没有使用共享内存，网传有误


在epoll中，对于每一个事件，都会建立一个epitem结构体，如下所示：
```c
struct epitem{
    struct rb_node  rbn;//红黑树节点
    struct list_head    rdllink;//双向链表节点
    struct epoll_filefd  ffd;  //事件句柄信息
    struct eventpoll *ep;    //指向其所属的eventpoll对象
    struct epoll_event event; //期待发生的事件类型
}
```
总之，epoll通过**红黑树与双链表结合事件回调机制**，使得整个流程高效。之前介绍的的poll/select主要有两个缺点，一是需要两次拷贝，在监测端口数多时，会产生较大的性能损耗；二是需要两次遍历，这种O(N)的方式效率不高。而epoll通过红黑树与事件回调的方式来解决。

另外，epoll支持**两种事件触发模式**，水平触发与边沿触发，poll/select只有水平触发：

- 边沿触发模式，当被监控端口上有感兴趣事件发生时，服务器端只会从 epoll_wait 中苏醒一次，即使进程完全处理好对应端口的数据，**也依然只苏醒一次**，因此我们**程序要保证一次性处理完读写数据，**一般搭配非阻塞IO，一直读取对应的端口，直到返回调用错误表明数据读取完毕； 
- 水平触发模式，当被监控端口上有感兴趣事件发生时，服务器端**会持续地从** epoll_wait 中苏醒，直到对应的事件被处理完毕；
# 读写就绪条件
为了更方便的理解IO，我们需要理解一个套接字接口时候才是就绪，比如什么时候读就绪？什么时候写就绪？

对于读，满足以下4种条件任意一种即**返回读就绪**：

- 套接字**接收缓冲区**中的数据字节数**大于等于**套接字接收缓冲区低水位标记的大小。可以使用SO_RCVLOWAT套接字选项设置该套接字的低水位标记。对于TCP和UDP套接字而言，其默认值为1；
- 该套接字读处于半关闭状态（即TCP连接接收到了FIN）；
- 该套接字是一个**监听套接字且已完成连接队列不为空；**
- 该套接字错误待处理。

对于写，满足以下4种条件任意一种即**返回写就绪**：

- 该套接字**发送缓冲区中的可用空间字节数**大于等于套接字发送缓冲区**低水位标记的大小**，并且或者该套接字已连接，或者该套接字不需要连接（如UDP套接字)。我们可以使用SO_SNDI.OWATr套接字选项来设置该套接字的低水位标记。对于TCP和UDP套接字而言，其默认值通常为2048；
- 该套接字写处于半关闭状态，如果写会产生SIGPIPE信号；
- 非阻塞式connect已建立连接，或者连接失败；
- 该套接字错误待处理；
> 如果某个套接字错误，它将该套接字标记为**既可读又可写**


对于**异常条件**，如果一个套接字**存在带外数据或者仍处于带外标记**，那么它有异常条件待处理。
![image.png](https://oss1.aistar.cool/elog-offer-now/d0b5371f070a986f283e354fc6f3f919.png)
# 参考资料
[Unix网络编程](https://item.jd.com/41444199009.html)
[小林coding——一文拿下IO多路复用](https://mp.weixin.qq.com/s/Qpa0qXxuIM8jrBqDaXmVNA)
[深入理解select、poll、epoll](https://blog.csdn.net/davidsguo008/article/details/73556811/?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-0.no_search_link&spm=1001.2101.3001.4242)
