---
title: send-only channel和receive-only channel的争议
urlname: reg9kozm27gdfcfa
date: '2024-05-23 10:31:47'
updated: '2024-05-24 09:34:58'
description: 在Go语言中，channel是一个非常重要的内置数据结构，几乎每个Go开发者都非常熟悉。它不仅能帮助实现goroutine之间的通信和同步，还通过goroutine和channel实现了CSP（Communicating Sequential Processes）模型。Go语言的共同创始人之一...
---
在Go语言中，channel是一个非常重要的内置数据结构，几乎每个Go开发者都非常熟悉。它不仅能帮助实现goroutine之间的通信和同步，还通过goroutine和channel实现了CSP（Communicating Sequential Processes）模型。

Go语言的共同创始人之一罗布·派克（Rob Pike）曾说过：

> Don't communicate by sharing memory, share memory by communicating.


这句话的潜台词是，鼓励开发者通过channel来实现goroutine之间的通信，而不是通过共享内存。

channel可以分为两种类型：

- **双向channel（bi-directional channel）**：既可以发送数据，也可以接收数据。
- **单向channel（uni-directional channel）**: 
   - **send-only channel**：只能发送数据，不能接收数据，否则会编译报错。
   - **receive-only channel**：只能接收数据，不能发送数据，否则会编译报错。

单向channel的一个典型应用场景是作为函数或方法的参数，用来明确只能发送或接收数据，从而避免误操作。

```go
package main

import (
	"fmt"
)

// send-only channel
func testSendChan(c chan<- int) {
	c <- 20
}

// receive-only channel
func testRecvChan(c <-chan int) {
	result := <-c
	fmt.Println("result:", result)
}

func main() {
	ch := make(chan int, 3)
	testSendChan(ch)
	testRecvChan(ch)
}
```

在上面的代码中，`testSendChan`的参数是一个send-only channel，`testRecvChan`的参数是一个receive-only channel。实参`ch`是一个双向channel，Go runtime会自动将其转换为单向channel传递给相应的函数。

## 问题

尽管上面的例子展示了单向channel作为函数形参的常见用法，问题在于：我们可以用`make`创建单向channel吗？如果可以，这样做有实际应用场景吗？是否存在潜在的陷阱？

我们来看看下面两个问题：

### 题目1

```go
ch := make(<-chan int)
close(ch)
fmt.Println("ok")
```

- A: 打印ok
- B: 运行时报错：fatal error - deadlock
- C: 运行时报错：panic
- D: 编译失败

### 题目2

```go
c := make(chan<- int)
close(c)
fmt.Println("ok")
```

- A: 打印ok
- B: 运行时报错：fatal error - deadlock
- C: 运行时报错：panic
- D: 编译失败

大家可以先稍作思考，看看这两个问题的答案会是什么。

## 解析

### 答案

- 题目1的答案是D。题目1中创建了一个receive-only channel，只能从channel中接收值，不能往channel里发送值。对于receive-only channel不能调用`close`操作，否则会编译报错：

```go
./main.go:9:7: invalid operation: close(ch) (cannot close receive-only channel)
```

- 题目2的答案是A。题目2创建了一个send-only channel，只能往channel中发送值，不能从channel中接收值。对于send-only channel可以正常调用`close`操作。

这两者的差异在于：receive-only channel表示只能从这个channel中接收数据，使用方对这个channel只有读取权限，因此无法关闭。而send-only channel可以正常关闭，因为关闭操作属于写操作的范畴。

### 衍生问题

```go
// send-only channel
func testSendChan(c chan<- int) {
	c <- 20
}

// receive-only channel
func testRecvChan(c <-chan int) {
	result := <-c
	fmt.Println("result:", result)
}

func main() {
	ch := make(chan int, 3)
	testSendChan(ch)
	testRecvChan(ch)
}
```

上面的代码展示了双向channel作为函数实参传递给接受单向channel作为形参的函数。**关键点在于这里的函数实参是双向channel**。

对细心的开发者来说，一个疑问可能会产生：`make`创建的单向channel有实际用途吗？例如：

- `make(chan<- int)`创建的send-only channel，只能发送数据，那它的具体用途是什么？
- `make(<-chan int)`创建的receive-only channel，只能接收数据，那它的实际应用场景是什么？

关于这个问题，Go语言社区内也曾有过激烈讨论。

Golang团队的[Brad Fitzpatrick](https://github.com/bradfitz)曾抱怨，认为编译器应该禁止通过`make`创建单向channel，因为它们没有实际用途：

```
I'm surprised the compiler permits create send- or receive-only channels:
------
package main

import "fmt"

func main() {
    c := make(<-chan int)
    fmt.Printf("%T\n", c)
}

------

Is that an accident?

I can't see what utility they'd have.
```

而Go语言负责人[Russ Cox](https://github.com/rsc)则回应道：不建议编译器禁止创建单向channel，因为如果对单向channel进行非法操作，编译器依然会报错。而禁止这类操作会增加Go语言设计的复杂性，没有必要，得不偿失：

```
I can't see a reason to disallow it either though.

All I am saying is that explicitly disallowing it adds
complexity to the spec that seems unnecessary.
What bugs or problems does it avoid to make this
special exclusion in the rules for make?
Russ
```

## 推荐阅读

- [Go Quiz: 从Go面试题看channel的注意事项](https://mp.weixin.qq.com/s?__biz=Mzg2MTcwNjc1Mg==&mid=2247483746&idx=1&sn=c3ec0e3f67fa7b1cb82e61450d10c7fd&chksm=ce124e0df965c71b7e148ac3ce05c82ffde4137cb901b16c2c9567f3f6ed03e4ff738866ad53&token=1224150345&lang=zh_CN#rd)
- [Go Quiz: 从Go面试题看channel在select场景下的注意事项](https://mp.weixin.qq.com/s?__biz=Mzg2MTcwNjc1Mg==&mid=2247483816&idx=1&sn=44e5cf4900b44f9a0cde491df5dd6e51&chksm=ce124ec7f965c7d1edd9ccffe80520981970ad6000cfea3b1a4099a4627f0f24cc33272ec996&token=1224150345&lang=zh_CN#rd)

## 总结

1.  对于无缓冲区的`channel`，发送和接收数据都会导致阻塞。 
2.  对于`nil channel`和有缓冲区的`channel`，收发数据机制如下表所示： 
| channel | nil | 空的 | 非空非满 | 满了 |
| --- | --- | --- | --- | --- |
| 往channel发送数据 | 阻塞 | 发送成功 | 发送成功 | 阻塞 |
| 从channel接收数据 | 阻塞 | 阻塞 | 接收成功 | 接收成功 |
| 关闭channel | panic | 关闭成功 | 关闭成功 | 关闭成功 |

3.  `channel`关闭后的行为： 
   - 发送数据到已关闭的`channel`会触发panic。
   - 从关闭的`channel`接收数据，会先读完channel中的数据。数据读完后，接收到的是该元素类型的零值。
```go
data, ok := <- c
```
 如果channel `c`关闭并且数据读完，`data`为零值，`ok`为`false`。否则，`data`为读到的值，`ok`为`true`。

   - 重复关闭`channel`会引发panic。
4.  `select`的运行机制： 
   - 选择一个不阻塞的`case`分支执行。如果多个`case`分支都不阻塞，随机选择一个执行，和代码中分支的顺序无关。
   - 如果所有`case`分支都阻塞，则执行`default`分支。
   - 如果没有`default`分支，`select`会阻塞，直到某个`case`分支不再阻塞。
## 
