---
title: 7天玩转 Golang 标准库之 sort
urlname: kg7o7vghu19v2b48
date: '2024-06-19 23:17:53'
updated: '2024-06-19 23:18:02'
description: "数据排序 是编程任务的一个常见部分，而Go标准库的sort包提供了对切片和用户定义集合的排序操作。1.基础排序：整数、浮点数和字符串Golang自带了对于整数切片[]int，浮点数切片[]float64以及字符切片[]string的排序：package main  import ( \t\"fmt..."
---
**数据排序** 是编程任务的一个常见部分，而Go标准库的sort包提供了对切片和用户定义集合的排序操作。
### 1.基础排序：整数、浮点数和字符串
Golang自带了对于整数切片`[]int`，浮点数切片`[]float64`以及字符切片`[]string`的排序：
```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	ints := []int{44, 67, 3, 17, 89, 10, 23, 45, 67, -5, 89}
	sort.Ints(ints)
	fmt.Println(ints)

	floats := []float64{4.2, 5.7, 9.8, 1.56, 3.3}
	sort.Float64s(floats)
	fmt.Println(floats)

	strs := []string{"peach", "kiwi", "apple", "banana"}
	sort.Strings(strs)
	fmt.Println(strs)
}
```
### 2.自定义类型的排序
sort库允许你对自定义数据类型进行排序，但需要实现sort接口，这意味着你需要为类型定义`Len()`, `Less()`和`Swap()`这三个方法。比如，我们对以下struct类型数据进行排序：

```go
type Person struct {
	Name string
	Age  int
}

// 类型别名，方便接下来的定义
type PersonSlice []Person

// 实现sort.Interface接口
func (a PersonSlice) Len() int           { return len(a) }
func (a PersonSlice) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a PersonSlice) Less(i, j int) bool { return a[i].Age < a[j].Age }  //根据Age排序

func main() {
	ps := []Person{
		{"Alice", 23},
		{"Bob", 25},
		{"Mike", 22},
		{"John", 26},
		{"Lucy", 21},
	}

	sort.Sort(PersonSlice(ps))

	for _, v := range ps {
		fmt.Println(v.Name, ":", v.Age)
	}
}
```
非常高兴你对这个主题有深入的兴趣。在Golang的sort库中，除了以上的基础排序和自定义类型排序，你还可以针对自定义类型进行多字段排序，以及使用`sort.Search`进行查找。以下是进一步的深入示例：

### 3.多字段排序

在自定义类型排序的基础上，你可能会遇到需要按照多个字段进行排序的场景。例如，当Person的Age相同时，我们希望能按照Name的字典顺序进行排序。这就需要我们在`Less`方法中增加额外的判断。
```go
type Person struct {
	Name string
	Age  int
}

type PersonSlice []Person

func (a PersonSlice) Len() int { return len(a) }
func (a PersonSlice) Swap(i, j int) { a[i], a[j] = a[j], a[i] }
func (a PersonSlice) Less(i, j int) bool {
	if a[i].Age == a[j].Age {
		return a[i].Name < a[j].Name  //Age相等时按Name排序
	}
	return a[i].Age < a[j].Age
}

func main() {
	ps := []Person{
		{"Alice", 23},
		{"Bob", 24},
		{"Charlie", 23},
		{"Dave", 24},
	}

	sort.Sort(PersonSlice(ps))

	for _, v := range ps {
		fmt.Println(v.Name, ":", v.Age)
	}
}
```
### 4.使用`sort.Search`进行查找

使用sort的另一个重要场景是进行有序切片的搜索。`sort.Search`函数可以运行一个自定义的查找函数，返回满足该函数的第一个元素的索引。

```go
func main() {
	ints := []int{1, 3, 5, 7, 9, 11, 13, 15}

	// 搜索大于等于10的第一个元素的索引
	idx := sort.Search(len(ints), func(i int) bool { return ints[i] >= 10 })
	fmt.Println(idx)  // 输出: 5
}
```
可以看到Go的sort库提供的排序和查找功能是非常强大和灵活的，无论是哪种场景，它都可以提供有效的解决方案。
## 结语
无论对于基本数据类型还是自定义类型，Go的sort库都能为你提供强大的排序功能，理解并熟练使用sort库将大大提高你的编程效率。
