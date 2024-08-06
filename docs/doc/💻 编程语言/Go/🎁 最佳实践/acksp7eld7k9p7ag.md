---
title: 并发：Goroutines和Channels的详细指南
urlname: acksp7eld7k9p7ag
date: '2024-06-19 23:18:29'
updated: '2024-08-06 19:33:17'
description: 0. 并发和并行的区别并发与并行在许多情况下被用作相互替代的术语，但在计算中，它们之间有着明显的区别。并发是指同时管理很多事情，这是软件设计的一种方式；而并行执行则指同时做很多事情，是根据硬件的计算能力来进行的。例如，假设我们在一个餐厅里做若干件事情：点菜、吃饭、结账。在并发的世界里，我们将这...
---
#### 0. 并发和并行的区别
并发与并行在许多情况下被用作相互替代的术语，但在计算中，它们之间有着明显的区别。并发是指同时管理很多事情，这是软件设计的一种方式；而并行执行则指同时做很多事情，是根据硬件的计算能力来进行的。

例如，假设我们在一个餐厅里做若干件事情：点菜、吃饭、结账。在并发的世界里，我们将这些任务分解开，可以同时管理但不一定同时执行。而在并行的世界里，我们实际上在同一时刻做了多件事情，比如我们可以边吃饭边聊天。
#### 1. Goroutines介绍和创建
Goroutines是由Go语言运行时环境管理的轻量型线程。与OS线程或者其他编程语言的线程相比，Goroutines的创建和撤销的成本更低。

当你需要创建一个新的Goroutine时，只需要使用go关键字：

```go
go function()
```

比如，我们有下面的函数：

```go
func sayHello() {
    fmt.Println("Hello, World")
}
```

通过在函数调用前添加`go`关键字，就可以将它变成一个goroutine：

```go
go sayHello()
```

#### 2. Channels的原理和使用

Channels是用来在Goroutines之间进行通信的数据结构，可以把它们看作是Goroutines之间的管道。你可以通过channel发送和接收数据。

在Go中创建channel的方式如下：

```go
ch := make(chan int)
```

这里创建了一个整型channel。然后我们可以使用`<-`运算符向channel发送数值或者从channel读取数值。比如：

```go
ch <- 5 // send 5 to channel ch
x := <- ch // receive from ch, and assign value to x
```

Goroutine默认是异步操作的，即开启一个新的Goroutine后，不会阻塞当前线程的继续执行。但是有时候我们需要等待一个或者多个Goroutines完成后继续，这时我们可以使用`sync.WaitGroup`。

```go
var wg sync.WaitGroup
wg.Add(1)  // 增加等待的Goroutine数量
go func() {
  defer wg.Done()  // 在Goroutine结束时调用，表示有一个Goroutine已经完成
  // 此处为Goroutine实际执行的代码
} 
wg.Wait()  // 在此处等待所有的Goroutine完成
```
Channel是Go提供的一种强大的通信机制。我们先前讨论了基本的Channel创建和操作，这次我们来看一下更高级的用法。

- **有缓冲和无缓冲Channel**



创建Channel时，可以为其指定一个缓冲大小。有缓冲的Channel在满载或空载时才会阻塞，反之无缓冲的Channel在每次发送和读取数据时都会阻塞。
```json
ch := make(chan int) // 无缓冲
ch := make(chan int, 5) // 缓冲大小为5
```

- **select语句**



Go的select关键字让我们可以在channel上做出更复杂的操作。select会监听case语句中channel的读写操作，当channel读写操作为非阻塞状态（即能读写）时执行相对应的语句。select中默认是不带有default的，也就是说如果没有符合的case，select将会阻塞直到有符合的case出现。
```json
select {
    case <-chan1:
       // 如果chan1成功读到数据，则进行该case处理语句
    case chan2 <- 1:
       // 如果成功向chan2写入数据，则进行该case处理语句
    default:
       // 如果上面都没有成功，则进入default处理流程
}
```
#### 3. Go中的Goroutine如何调度

对于Goroutine的调度，Go选择了成本较低的M:N调度（也称为两级调度）模型。在这种模型中，存在两个调度层：

-  OS调度层：OS调度层负责在物理线程（内核线程）上调度线程。OS线程的创建、切换和销毁成本都相对较高，而且会消耗大量的系统资源。 
-  Go运行时调度层：Go运行时调度层负责在逻辑执行器（P）上调度Goroutines。相比于OS线程，Goroutines的创建、切换和销毁的成本都非常低。 

Go调度器使用了很多技术和策略来使得其Goroutine的调度更加高效，比如工作窃取, 抢占, 系统监控等。Go调度器的目的是让程序能够充分利用所有的CPU资源，让每个CPU都有Goroutine在运行。
#### 4. 和其他编程语言的比较

在许多传统的编程语言中，例如Java和C++，并发模型通常基于线程，这意味着开发人员需要直接与低级别的线程API打交道，包括但不限于线程生命周期的管理，以及复杂的同步原语，如互斥量和条件变量。这种并发模型常常导致代码难以编写和理解。

相比之下，Go的并发模型基于CSP（Communicating Sequential Processes）理论，把并发的复杂性隐藏在语言层面，开发人员无须关心内部的实现细节。Go提供的Goroutines和Channel，使得我们可以用更为简单和直观的方式来编写并发程序。

#### 5. 案例和应用场景

在实际的开发过程中，我们往往需要根据实际需求来选择使用Goroutine, Channel或是互斥锁等工具。

例如，如果我们在编写一个网站爬虫，可能会遇到这样的需求：我们需要启动多个Goroutine去分别爬取网站的不同部分，而主Goroutine需要等待所有的爬虫Goroutine都完成任务后才能进行下一步。这种情况下，我们就可以利用WaitGroup来同步多个Goroutine的执行进度。

