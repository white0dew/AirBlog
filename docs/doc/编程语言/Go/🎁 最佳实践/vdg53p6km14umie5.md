---
title: 你知道引用传递与引用变量？
urlname: vdg53p6km14umie5
date: '2024-05-23 10:36:44'
updated: '2024-05-24 09:34:13'
description: 当我们在Go语言中使用map和channel时，你可能会注意到，将这些类型作为函数参数传递时，并不需要在形参中为map和channel添加指针符号*，依然能在函数体内改变外部map和channel的值。这种现象可能会让一些人联想到C++中的引用变量和引用传递。比如，考虑以下Go代码片段：pac...
---

当我们在Go语言中使用map和channel时，你可能会注意到，将这些类型作为函数参数传递时，并不需要在形参中为map和channel添加指针符号*，依然能在函数体内改变外部map和channel的值。

这种现象可能会让一些人联想到C++中的引用变量和引用传递。比如，考虑以下Go代码片段：

```go
package main

import "fmt"

func changeMap(data map[string]interface{}) {
	data["c"] = 3
}

func main() {
	counter := map[string]interface{}{"a": 1, "b": 2}
	fmt.Println("起始状态:", counter)
	changeMap(counter)
	fmt.Println("修改后:", counter)
}
```

运行结果展示了函数`changeMap`成功地修改了外部map类型`counter`的值：

```go
起始状态: map[a:1 b:2]
修改后: map[a:1 b:2 c:3]
```

那么，这是否意味着Go中的map传参采用了引用传递呢？在探究这一问题之前，让我们先回顾一下什么是引用变量和引用传递。

## 什么是引用变量和引用传递

引用变量和引用传递是C中的两个基本概念。以下是一个简单的C例子，展示了引用变量和引用传递：

```cpp
#include <iostream>
using namespace std;

void changeValue(int &n) {
    n = 2;
}

int main() {
    int a = 1;
    int &b = a; // b是a的引用变量
    cout << "a=" << a << " 地址:" << &a << endl;
    cout << "b=" << b << " 地址:" << &b << endl;
    changeValue(a);
    cout << "修改后 a=" << a << " 地址:" << &a << endl;
    cout << "b=" << b << " 地址:" << &b << endl;
}
```

从运行结果来看，变量b作为引用变量，与原变量a共享相同的地址。当通过引用传递改变了a的值时，b的值也随之改变。

## Go有引用变量和引用传递吗？

答案是否定的。在Go语言中，不存在引用变量和引用传递的概念。

在Go语言中，不存在两个变量共享相同内存地址的情况，但是两个变量可以指向同一内存地址，这是两个不同的概念。例如：

```go
package main

import "fmt"

func main() {
	a := 10
	var p1 *int = &a
	var p2 *int = &a
	fmt.Println("p1 指向:", p1, " 地址:", &p1)
	fmt.Println("p2 指向:", p2, " 地址:", &p2)
}
```

在这个Go代码中，虽然p1和p2变量的值（指针）相同，都指向变量a的地址，但它们自身的地址是不同的。

## 有map不是使用引用传递的反例吗？

请看以下代码：

```go
package main

import "fmt"

func initMap(data map[string]int) {
	data = make(map[string]int)
	fmt.Println("函数内部, data == nil:", data == nil)
}

func main() {
	var data map[string]int
	fmt.Println("初始化前, data == nil:", data == nil)
	initMap(data)
	fmt.Println("初始化后, data == nil:", data == nil)
}
```

这个例子显示，即使`initMap`函数在内部对`data`变量进行了重新赋值，这对外部的`data`变量并无影响，进一步证明了Go语言中不存在引用传递。

## 那map和channel是如何工作的呢？

事实上，Go语言中的map和channel本质上都是指针，指向Go运行时(runtime)的具体结构。当我们使用`make`函数初始化这些类型时，Go编译器会将其转换为对应的运行时函数调用，实际返回的是一个指向运行时数据结构的指针。

因此，虽然Go语言中不存在引用变量和引用传递，但对map和channel的操作可以影响到这些数据结构的状态，因为它们本质上是通过指针间接访问的。

## 总结

在Go语言中，所有的传递都是按值传递。map和channel虽然在行为上类似于引用传递，但实际上是因为它们本质上是指针，指向Go运行时的特定结构。此外，Go语言确实没有引用变量和引用传递的概念，这一点与C++等语言有所不同。

## 参考链接

- [在Go中没有引用传递](https://dave.cheney.net/2017/04/29/there-is-no-pass-by-reference-in-go)

