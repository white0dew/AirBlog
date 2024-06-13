---
title: 4/2 腾讯PCG二面：技术深度不够？腾讯PCG面试问到你怕了没？
urlname: cslqxxvst26d0tw7
date: '2024-06-13 21:14:41'
updated: '2024-06-13 21:14:49'
description: 下面我将分享一位同学在腾讯PCG TRPC二面的面试经历，他说这场面试好比走进了技术的迷宫，充满了挑战和机遇，你准备好了吗？【提醒】通过这次面试经验，你将可以复习到以下知识点：RPC框架原理Localcache组件使用Redis库选择Golang的interface概念Golang中的map使...
---

下面我将分享一位同学在腾讯**PCG TRPC二面的面试经历，他说这场面试好比走进了技术的迷宫，充满了挑战和机遇，你准备好了吗？**

【提醒】通过这次面试经验，你将可以复习到以下知识点：

1. RPC框架原理
2. Localcache组件使用
3. Redis库选择
4. Golang的interface概念
5. Golang中的map使用及其并发行为
6. 协程和线程的区别
7. LSM树的原理及在LevelDB中的应用
8. 跳表的作用与原理
9. LSM树与B+树的比较
10. Socket编程和epoll的使用

![](https://oss1.aistar.cool/elog-offer-now/e7c98c16527500506b450f4b003ecc99.png)

**面试官**: 您好，让我们先从RPC框架开始。能简单解释一下你对RPC框架的理解吗？

**求职者**: 当然，RPC，也就是远程过程调用，是一种使得可以像调用本地方法一样调用远程方法的技术。它隐藏了网络传输的复杂性，让开发者可以专注于业务逻辑。

**面试官**: 很好。那你能说说在本地缓存方面，你使用过哪些组件吗？

**求职者**: 在Golang中，我通常会使用`groupcache`，这是一个由Google开发的本地缓存库，它可以很好地扩展并且减轻后端服务的负载。

**面试官**: 了解。谈谈你在使用Redis时候用的是哪个库？

**求职者**: 我一般会使用`go-redis`/`redis.v8`这个库。它功能全面，社区活跃，而且提供了很好的API来进行Redis操作。

**面试官**: 接下来，你怎么看待Golang的interface？

**求职者**: Golang的interface是一种类型，它定义了一组方法，但是这些方法不需要具体实现。任何实现了这些方法的类型都隐式地实现了这个interface，这有利于编写灵活且可复用的代码。

**面试官**: 在Golang中，你使用过map吗？能否并发读写，会不会panic？

**求职者**: 当然用过。在Golang中，map不是并发安全的。如果你尝试在没有任何同步机制的情况下进行并发读写，那么程序可能会panic。为了避免这种情况，我们可以使用`sync.Map`或者其他同步机制，像是使用`sync.RWMutex`来控制对map的访问。

**面试官**: 那你能解释一下协程和线程的区别吗？

**求职者**: 协程通常是用户态的轻量级线程，它们是由语言或框架管理而不是操作系统。协程可以实现非阻塞的IO操作，而线程通常是操作系统管理的，它们之间的上下文切换成本更高。在Golang中，协程被称为goroutines，它们的调度是由Golang运行时管理的。

**面试官**: 很详细。leveldb是自己写的吗？你做了什么改动？

**求职者**: LevelDB不是我写的，它是一个由Google开发的快速键值存储库。但我在项目中使用并对它进行了一些优化，比如增加了压缩算法来减少磁盘使用，还有调整了内存管理策略来提高读写性能。

**面试官**: 那么，能介绍一下LSM tree吗？

**求职者**: LSM tree，全称Log-Structured Merge-Tree，是一种数据结构，它通过合并和压缩操作来优化长时间的写操作。在LevelDB中，LSM树用于存储和检索键值对，它将数据首先写入内存中的结构，然后再异步地写入磁盘上的有序文件中。

**面试官**: 跳表在这里发挥什么作用？

**求职者**: 跳表是一种概率平衡的数据结构，它类似于链表，但是在链表的基础上增加了多级索引，使得可以实现快速的查找操作。在LSM树中，跳表可以用作内存中的数据结构，以支持快速的插入和搜索操作。

**面试官**: 那么，LSM树和B+树有什么不同？

**求职者**: LSM树和B+树都是用于存储数据的树形数据结构，但它们各有特点。LSM树更适合于写密集型的场景，因为它将写操作延迟处理，通过后台合并过程来提高效率。而B+树提供了平衡的读写性能，并且在数据库索引中广泛使用。B+树的叶节点是有序的，并且相互链接，这样可以快速进行范围查询。

**面试官**: 说到有序的叶子节点，B+树是如何关联找到下一个节点的？

**求职者**: 在B+树中，所有的叶子节点通过指针相互链接，形成了一个有序的链表。这样，当你在叶子节点中找到一个元素之后，可以通过这些指针来访问下一个或者上一个元素，非常适合于范围查询。

**面试官**: 有用过socket编程吗？

**求职者**: 是的，我使用过socket编程来实现网络通信。在Golang中，我主要使用了`net`包来创建和管理TCP/UDP连接。

**面试官**: 了解过epoll吗？你是怎么用的？

**求职者**: epoll是Linux下的一种高效的IO事件通知机制。我在使用epoll时通常会结合非阻塞IO来进行网络编程，这样可以同时处理大量的网络连接而不会造成线程阻塞。

**面试官**: 进程之间的通信有了解过吗？

**求职者**: 当然，进程间通信（IPC）是允许在不同进程之间进行数据传输的机制。我了解并使用过多种IPC方式，包括管道（pipes）、消息队列、信号量、共享内存等。

**面试官**: 你能简单说明一下管道是怎么用的吗？

**求职者**: 管道是一种最基本的IPC形式，它允许一个进程与另一个进程进行数据传输。在Unix和类Unix系统中，管道通过`pipe()`系统调用创建，它会产生一对文件描述符，数据写入一个文件描述符会从另一个文件描述符读出来。

**面试官**: 你有使用过fork来创建新的进程吗？

**求职者**: 是的，`fork()`是Unix系统中用于创建进程的系统调用。它会创建一个与当前进程几乎完全相同的子进程，两个进程可以通过IPC进行通信。

**面试官**: 在TCP协议中，socket的TIME_WAIT状态是什么时候出现的？

**求职者**: TIME_WAIT状态出现在TCP连接被主动关闭方在发送最后一个ACK确认后进入的状态。这个状态会持续一段时间，以确保对方接收到了最后的确认消息。

**面试官**: 你了解过gRPC吗？

**求职者**: 是的，gRPC是一个高性能、开源和通用的RPC框架，它基于HTTP/2协议，支持多种语言。在gRPC中，服务的定义是通过Protocol Buffers来实现的，这是一种更加轻量级的IDL（Interface Definition Language）。

**面试官**: IDL文件中的`repeat`关键字代表什么？

**求职者**: 在Protocol Buffers中，`repeated`关键字用于表示字段可以重复，也就是说，这个字段可以持有多个值，类似于其他语言中的数组或列表。

**面试官**: 那么，接着我们来说说进程间的通信。你对这个概念有了解吗？

**求职者**: 进程间通信(Inter-Process Communication，简称IPC)是指在不同的进程之间传递数据的过程。在Unix和类Unix的操作系统中，常用的IPC方式有管道（pipe）、信号（signal）、消息队列（message queue）、共享内存（shared memory）、信号量（semaphore）以及套接字（socket）。

**面试官**: 那么，你能具体说一下管道是怎么使用的吗？

**求职者**: 管道（pipe）是最早的IPC方式之一。它是一个半双工的通信方式，数据只能单向流动，而且只能在具有亲缘关系的进程间使用。例如父子进程、兄弟进程之间。

在C语言中，我们可以使用pipe函数来创建管道。这个函数会返回两个文件描述符，分别表示管道的读端和写端。

```c
#include <unistd.h>

int pipe(int pipefd[2]);
```

其中，`pipefd[0]`用于读取管道，`pipefd[1]`用于写入管道。

**面试官**: 很好，那么你用过fork函数吗？

**求职者**: 是的，我用过。fork函数用于在Unix和类Unix的操作系统中创建新的进程。这个函数会创建一个和当前进程几乎完全一样的进程，也就是所谓的子进程。这个子进程会从父进程处继承大部分的属性，比如文件描述符、环境变量等，但是它们仍然是两个独立的进程，拥有各自的地址空间，互不影响。

在C语言中，我们可以使用fork函数来创建子进程：

```c
#include <unistd.h>

pid_t fork(void);
```

这个函数的返回值是进程ID。在父进程中，返回的是子进程的进程ID；在子进程中，返回0。

**面试官**: 那么，你能告诉我TCP的socket的timeWait状态是什么时候出现的吗？

**求职者**: TCP的timeWait状态是在四次挥手结束后出现的。在TCP连接的终止阶段，当主动关闭连接的一方（通常被称为“主动关闭方”）收到对方的FIN报文并回复ACK报文后，就会进入timeWait状态。

这个状态会持续一段时间，通常是2倍的最大报文段生存时间（Maximum Segment Lifetime，MSL）。这样做主要是为了保证ACK报文能够到达对方，如果对方没有收到ACK报文，会重新发送FIN报文，主动关闭方在timeWait状态下就可以再次发送ACK报文。

而且，timeWait状态也能防止“旧的重复分段”出现在新的连接中。旧的重复分段是指在上一个连接中延迟的分段，在新的连接中被错误地当作是属于新连接的分段。

**面试官**: 很好，那么你对grpc有了解吗？

**面试官**: 当然了，讲讲你对gRPC的理解。

**求职者**: gRPC是一种高性能、跨语言的RPC框架，由Google开发，基于HTTP/2协议设计，并且可以使用Protocol Buffers作为其接口描述语言。它支持多种语言，可以让不同语言编写的服务之间可以方便地进行远程调用。

**面试官**: 这样啊，那能给我解释一下IDL文件中的`repeat`关键字代表的是什么吗？

**求职者**: 在Protocol Buffers中，`repeat`关键字用于定义一个字段为可重复的，也就是说这个字段可以对应多个值，类似于其他语言中的数组或列表。在gRPC中，我们通常用它来表示一个消息中可以包含多个同类型的元素。

例如，如果我们定义了一个消息类型，想要在其中包含多个字符串，可以这样写：

```protobuf
message Example {
  repeated string items = 1;
}
```

这表示`items`可以包含零个或多个字符串。

**面试官**: 好的，你最近有在看什么书吗？

**求职者**: 最近我一直在阅读《Effective Go》这本书。

**面试官**: 那你能简单聊一聊GMP模型吗？

**求职者**: 当然可以。GMP模型是Go语言的并发模型，它由Goroutine、M和P三部分组成。

- **Goroutine**：是Go语言的轻量级线程，可以理解为执行用户代码的实体。
- **M**：代表Machine，是操作系统的线程。
- **P**：代表Processor，是逻辑处理器，负责调度Goroutine到M上执行。

每个P都会有一个本地的runqueue，用于存放等待运行的Goroutine。M需要绑定一个P才能执行这些Goroutine。当一个M在执行一个Goroutine时，如果这个Goroutine发生了阻塞（比如进行了系统调用），那么M会释放当前的P，去寻找一个新的可运行的Goroutine来执行，而阻塞的Goroutine会被移动到全局的runqueue中，或者等待事件发生后重新被调度。

这样的设计使得Go能够在保持轻量级的同时，也能有效地利用多核处理器，进行并发处理。**面试官**: 好的，那我们再深入一些。你能给我解释一下Go语言中的内存模型，尤其是关于happens-before原则的理解吗？

**求职者**: Go的内存模型定义了在哪些条件下对变量的读取可以保证看到特定的写入。这里的核心原则是happens-before关系，它决定了内存操作的可见性。简单来说，如果操作A happens-before操作B，那么在B开始执行时，它保证能看到A的效果。

Go语言中happens-before的几个规则包括：

- 对同一个地址的读操作happens-before后面的写操作；
- 一个goroutine中的所有操作happens-before该goroutine的终止；
- 对一个channel的关闭happens-before从该channel接收到一个零值；
- 对一个sync.Mutex或sync.RWMutex的解锁happens-before它的下一次加锁。

这些规则保证了在并发编程时，我们能够预测并确保内存的一致性。

**面试官**: 那么，你能说明一下Go中channel的使用场景，以及它是如何帮助进行goroutine间通信的吗？

**求职者**: Channel是Go中的一个核心类型，用于在不同的goroutine之间传递消息。它可以帮助我们避免共享内存时出现的竞争条件。我们可以使用channel来发送和接收值，这些操作本身也是同步的。发送会等待直到数据被接收，而接收会等待直到有数据到来。

Channels可以用于不同的场景，比如任务同步、数据共享等。例如，我们可以使用无缓冲的channel来同步两个goroutine，确保一个操作happens-before另一个操作。另外，我们也可以使用有缓冲的channel来进行任务调度，通过buffer限制并发数，防止过多的goroutine同时运行。

举个例子，我们可以创建一个channel来传递任务：

```go
ch := make(chan Task)
```

然后在一个goroutine中发送任务：

```go
go func() {
    for _, task := range tasks {
        ch <- task
    }
    close(ch)
}()
```

在另一个goroutine中接收任务并处理：

```go
go func() {
    for task := range ch {
        process(task)
    }
}()
```

这样就实现了goroutine间的通信和同步。**面试官**: 很好，现在我们来谈谈错误处理。Go语言中的`panic`是什么？你在什么情况下会用到它？

**求职者**: 在Go语言中，`panic`是一个内置函数，它会停止当前函数的执行，开始逐层向上执行函数的延迟部分（deferred functions），然后打印出调用栈信息，并退出程序。通常情况下，我们只在遇到不可恢复的错误时使用`panic`，比如程序内部的逻辑错误，这些是我们希望在开发阶段就检测到的问题。

```go
func mayPanic() {
    panic("a problem")
}

func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered. Error:\n", r)
        }
    }()
    mayPanic()
    fmt.Println("After mayPanic()")
}
```

在这个例子中，`mayPanic`函数中产生了一个`panic`，但是在`main`函数中，我们通过`defer`和`recover`来恢复它。`recover`是一个内置函数，它可以捕获到`panic`的输入值，并且恢复正常的执行。

**面试官**: 明白了。那么，你使用过Go语言的map吗？你知道它能不能并发读写吗？

**求职者**: 是的，我用过Go中的map。Go的map不是并发安全的，如果我们在没有任何同步操作的情况下进行并发的读写，它可能会引发`panic`。为了避免这种情况，我们需要使用锁，比如`sync.Mutex`或`sync.RWMutex`，来确保并发访问时的同步。

```go
var m = make(map[string]int)
var mutex = &sync.Mutex{}

func get(key string) int {
    mutex.Lock()
    defer mutex.Unlock()
    return m[key]
}

func set(key string, value int) {
    mutex.Lock()
    defer mutex.Unlock()
    m[key] = value
}
```

在这个例子中，我们使用了`sync.Mutex`来确保对map的访问是同步的，这样就可以在并发环境中安全地使用map了。

**面试官**: 那你能解释一下socket编程，以及epoll的了解是怎样的？

**求职者**: Socket编程是一种用于两个节点之间通信的方法，它是基于网络的TCP/IP协议来实现的。在Go语言中，我们可以使用`net`包来进行socket编程，创建服务器和客户端之间的连接。

至于epoll，它是Linux系统提供的一种I/O事件通知机制，可以有效地处理数以万计的套接字。与传统的select或poll相比，epoll更加高效，因为它不需要重复遍历整个文件描述符集合来检查事件。在Go语言中，epoll通常是由底层的网络库来抽象和使用的，我们不需要直接与epoll接口打交道。

使用epoll时，我们会创建一个epoll实例：

```c
int epfd = epoll_create1(0);
```

然后我们可以添加或者删除监视的文件描述符：

```c
struct epoll_event event;
event.data.fd = fd;
event.events = EPOLLIN | EPOLLOUT;
epoll_ctl(epfd, EPOLL_CTL_ADD, fd, &event);
```

这样，我们就可以监视这个文件描述符上的读写事件了。在Go的网络库中，这一切都被抽象了，所以我们不需要手动管理这些细节。

**面试官**: 很好，今天的面试就这样，等后续通知吧。

# 腾讯PCG trpc 二面

1. 你对RPC的框架有了解过吗？
2. localcache用的什么组件？
3. redis用的什么库？
4. 对Golang的interface怎么理解？
5. map用过吗？能并发读写吗？是不是会panic？什么是panic
6. 协程和线程什么区别？
7. leveldb是自己写的吗？你做了什么改动？出于什么目的搞这个项目？
8. 能介绍一下lsm tree吗？
9. 跳表有什么作用？
10. lsm tree和B+tree有什么区别？
11. B+树的叶子结点是有序的吗？
12. B+树怎么去关联找下一个结点？
13. 有用过socket编程吗？
14. 有去看过socket编程，或者说epoll了解过吗？
15. 你是怎么用的epoll？
16. 进程之间的通信有了解过吗？
17. 管道大概怎么用的？
18. fork用过吗？
19. tpc的socket的timeWait状态是什么时候出现？
20. grpc了解过吗？
21. IDL文件的repeat代表啥？
22. 你现在有在看什么书吗？
23. 看过effective go没有？
24. 聊一聊GMP模型



作者：寄__l
链接：[https://www.nowcoder.com/?type=818_1](https://www.nowcoder.com/?type=818_1)
来源：牛客网  
