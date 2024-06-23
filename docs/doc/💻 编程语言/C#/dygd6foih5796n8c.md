---
title: 第 4 章：数组
urlname: dygd6foih5796n8c
date: '2024-06-21 16:36:25'
updated: '2024-06-21 16:36:47'
description: 本章介绍什么是数组，一维数组和多维数组的概念，并且详细讲解了数组的初始化和常用操作，如遍历、查找和排序。
keywords: '数组, 一维数组, 多维数组, C#数组, 数组操作'
---
## 什么是数组

数组（Array）是一种用于存储多个相同类型数据的集合。它可以通过索引（index）访问其中的每个元素，从而使得处理大量数据变得更加高效和方便。在 C# 中，数组是固定大小的，也就是说数组的大小在创建后不能更改。

```csharp
// 创建一个存储整数的一维数组
int[] numbers = new int[5];
```

## 一维数组和多维数组

### 一维数组

一维数组是最基本的数组形式，类似于一个列表或序列。它的元素可以通过一个索引来访问。

```csharp
// 创建并初始化一个一维数组
int[] numbers = { 1, 2, 3, 4, 5 };
```

### 多维数组

多维数组包括二维数组、三维数组等，用于存储表格或网格状的数据。它们的元素通过多个索引来访问。

```csharp
// 创建并初始化一个二维数组
int[,] matrix = {
    { 1, 2, 3 },
    { 4, 5, 6 },
    { 7, 8, 9 }
};
```


## 数组的初始化

在 C# 中，数组可以通过以下几种方式进行初始化：

### 声明后逐个赋值

```csharp
int[] numbers = new int[3];
numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;
```

### 声明时直接初始化

```csharp
int[] numbers = { 1, 2, 3 };
```

### 使用 `new` 关键字初始化

```csharp
int[] numbers = new int[] { 1, 2, 3 };
```

## 数组的常用操作

### 遍历

遍历数组是最常见的操作，可以使用 `for` 循环或 `foreach` 循环来访问数组的每个元素。

```csharp
// 使用 for 循环遍历数组
for (int i = 0; i < numbers.Length; i++)
{
    Console.WriteLine(numbers[i]);
}
```

```csharp
// 使用 foreach 循环遍历数组
foreach (int number in numbers)
{
    Console.WriteLine(number);
}
```

### 查找

可以使用 `Array.IndexOf` 方法来查找数组中某个元素的索引。

```csharp
int index = Array.IndexOf(numbers, 2);
Console.WriteLine(index); // 输出 1
```

### 排序

数组的排序可以使用 `Array.Sort` 方法。

```csharp
Array.Sort(numbers);
foreach (int number in numbers)
{
    Console.WriteLine(number); // 输出排序后的数组
}
```

本章介绍了什么是数组，以及一维数组和多维数组的基本概念。我们学习了如何声明和初始化数组，并且讲解了遍历、查找和排序等常用操作。在下一章中，我们将深入探讨字符串的相关操作。
