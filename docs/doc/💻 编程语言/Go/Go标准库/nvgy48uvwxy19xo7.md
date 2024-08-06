---
title: 7天玩转 Golang 标准库之 sync
urlname: nvgy48uvwxy19xo7
date: '2024-06-19 23:16:50'
updated: '2024-08-06 19:33:03'
description: Go语言作为现代编程语言，其并发编程的优势是有目共睹的。在实际编程中，我们常常需要保证多个goroutine之间的同步，这就需要使用到Go语言的sync标准库。sync库提供了基本的同步原语，例如互斥锁（Mutex）和等待组（WaitGroup），这些都是协调和控制并发执行的重要工具。基础应用...
---
Go语言作为现代编程语言，其并发编程的优势是有目共睹的。在实际编程中，我们常常需要保证多个goroutine之间的同步，这就需要使用到Go语言的`sync`标准库。

`sync`库提供了基本的同步原语，例如互斥锁（Mutex）和等待组（WaitGroup），这些都是协调和控制并发执行的重要工具。
# 基础应用
### 1. 使用Mutex实现互斥
在很多情况下，我们需要保证在任意时刻只有一个goroutine能够访问某个数据。这时我们就可以使用Mutex（互斥锁）来实现这个需求。Mutex有两个方法：`Lock`和`Unlock`。

在`Lock`和`Unlock`之间的代码块，同一时刻只有一个goroutine可以执行，其他尝试执行这部分代码的goroutine会被阻塞直到锁被解开。以下面的例子为例，我们试图在多个goroutine中对一个全局变量完成加法操作：

```go
package main

import (
    "fmt"
    "sync"
)

var (
    sum int
    mu  sync.Mutex
)

func worker() {
    for i := 0; i < 10; i++ {
        mu.Lock()
        sum = sum + 1
        mu.Unlock()
    }
}

func main() {
    var wg sync.WaitGroup

    for i := 0; i < 10000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            worker()
        }()
    }

    wg.Wait()
    fmt.Println(sum)
}
```
### 2. 使用WaitGroup等待并发操作结束
在另外一种常见的应用场景中，我们需要开启一组goroutine去处理任务，而主goroutine需要等待这些任务完成后才能结束。这可以通过`sync.WaitGroup`来实现。

WaitGroup有三个方法：`Add`增加计数，`Done`减少计数，`Wait`等待计数归零。
```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()

    fmt.Printf("Worker %d starting\n", id)

    time.Sleep(time.Second)
    fmt.Printf("Worker %d done\n", id)
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 5; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }

    wg.Wait()
}
```

以上的代码中，我们创建了5个worker goroutine，main goroutine 会等待所有的worker都完成工作后才会退出。
# 进阶应用
以下是一些稍微复杂一些的`sync`库的使用例子。
## 全局单例
使用`sync.Once`来保证某个操作只执行一次。这在初始化全局变量或者单例模式中非常有用。 
```go
 package main

 import (
    "fmt"
    "sync"
 )

 var once sync.Once

 func setup() {
     fmt.Println("Init function")
 }

 func worker(wg *sync.WaitGroup, n int) {
     once.Do(setup)
     fmt.Println("Worker", n)
     wg.Done()
 }

 func main() {
     var wg sync.WaitGroup

     for i := 0; i < 10; i++ {
         wg.Add(1)
         go worker(&wg, i)
     }

     wg.Wait()
 }
```

在以上代码中，我们保证了`setup`函数只被执行了一次，即使有10个goroutine都尝试去执行`setup`函数。 

## 条件变量
使用`sync.Cond`来实现条件变量，这可以使得一个或者多个goroutine等待或者通知事件。 
```go
 package main

 import (
     "fmt"
     "sync"
     "time"
 )

 // Button 定义一个按钮结构体
 type Button struct {
     Clicked *sync.Cond
 }

 // 模拟一个用户界面
 func simulate(button *Button) {
     time.Sleep(time.Second)

     // 用户点击button
     button.Clicked.Broadcast()
 }

 func main() {
     // 初始化Button
     button := Button{Clicked: sync.NewCond(&sync.Mutex{})}

     // 显示信息的goroutine
     for i := 0; i < 10; i++ {
         go func(i int) {
             // 等待button被点击
             button.Clicked.L.Lock()
             defer button.Clicked.L.Unlock()
             button.Clicked.Wait()
 
             // button被点击，显示一条信息
             fmt.Println("button clicked,", i)
         }(i)
     }

     // 模拟用户点击button
     go simulate(&button)

     time.Sleep(2 * time.Second)
 }
```

处理并发是使用Go语言开发中非常重要的一部分，理解和掌握`sync`标准库中的同步原语对于你写出高效可靠的并发程序是非常重要的。

希望这篇文章能够帮助你更好的理解如何在Go语言中进行并发编程，我会非常高兴收到你的反馈～
