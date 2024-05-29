---
title: "\U0001F381 最佳实践"
urlname: htpzy6yum72pgula
date: '2024-05-22 20:17:02'
updated: '2024-05-24 09:36:08'
description: '---nav_path: best_practice---Go语言中的defer特性详解在Go语言中，defer关键字用于预定函数或方法的执行，这常用于处理成对的操作如打开关闭文件、加解锁、记录时间等。defer的独特之处在于，无论包含它的函数通过何种路径返回，它都确保调用被defer的函数。...'
nav_path: best_practice
---
# Go语言中的defer特性详解
在Go语言中，`defer`关键字用于预定函数或方法的执行，这常用于处理成对的操作如打开关闭文件、加解锁、记录时间等。`defer`的独特之处在于，无论包含它的函数通过何种路径返回，它都确保调用被`defer`的函数。

## 示例分析

### 示例1：defer在函数正常返回前执行

```go
// defer1.go
package main

import (
	"fmt"
)

func test1() {
	fmt.Println("test")
}

func main() {
	fmt.Println("main start")
	defer test1()
	fmt.Println("main end")
}
```

执行结果：

```
main start
main end
test
```

这里`defer test1()`确保了`test1()`在`main`函数的最末尾执行。

### 示例2：defer在函数因panic结束前执行

```go
// defer2.go
package main

import (
	"fmt"
)

func test1() {
	fmt.Println("test")
}

func test2() {
	panic(1)
}

func main() {
	fmt.Println("main start")
	defer test1()
	test2()
	fmt.Println("main end")
}
```

执行结果：

```
main start
test
panic: 1
...
```

尽管`test2()`触发了`panic`，`defer test1()`依然得到了执行。

## 探究：defer是否总会执行？

现在考虑以下代码：

```go
// defer3.go
package main

import (
	"fmt"
	"os"
)

func test1() {
	fmt.Println("test")
}

func main() {
	fmt.Println("main start")
	defer test1()
	fmt.Println("main end")
	os.Exit(0)
}
```

执行结果是：

```
main start
main end
```

defer的`test1()`并未执行。为何会这样？

这是因为`os.Exit`直接退出当前程序，不会执行任何已经`defer`的函数。

## defer的四个基本原则回顾

1. `defer`后必须是函数或方法调用，不能添加括号。
2. `defer`的函数参数在执行`defer`表达式时固定。
3. `defer`的执行顺序是后进先出（LIFO）。
4. `defer`可以修改所属函数的命名返回值。

## Go语言的defer实现原理

```go
type _defer struct {
    siz       int32    // 参数和返回值的内存大小
    started   bool
    heap      bool     // 是否分配在堆上
    openDefer bool     // 是否进行了优化
    sp        uintptr  // 栈指针
    pc        uintptr  // 程序计数器
    fn        *funcval // 被defer的函数
    _panic    *_panic  // defer的panic信息
    link      *_defer  // defer链表
}
```

Go语言内部通过一个链表维护defer调用，这也解释了为何它们会按LIFO顺序执行。

## 总结

在Go中使用`defer`需要记住：并非所有情况下`defer`都会执行。例如，`os.Exit`会导致程序立即退出，此时`defer`不会被调用。了解`defer`的原理和限制能帮助我们更合理地编写Go代码。
## 
