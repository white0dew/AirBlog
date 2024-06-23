---
title: 第 13 章：LINQ
urlname: ks16hc0d9oh0gryd
date: '2024-06-21 16:44:10'
updated: '2024-06-21 16:44:24'
description: 本章详细介绍了 LINQ 的基本概念、查询语法和方法语法，通过实例展示了如何在 C# 中使用 LINQ 来处理对象和 XML 数据。
keywords: 'LINQ, C# 查询语法, LINQ 方法语法, LINQ to Objects, LINQ to XML'
---
## 什么是 LINQ

LINQ (Language Integrated Query) 是一种在 C# 和其他 .NET 语言中用于查询数据的强大工具。它允许开发者以声明性语法来查询和操作集合数据，无论数据来源是对象、数据库还是 XML。

## LINQ 的查询语法

LINQ 提供了两种主要的查询语法：查询表达式语法和方法语法。查询表达式语法类似于 SQL，而方法语法则使用链式方法调用来构建查询。

### 查询表达式语法

查询表达式语法让代码看起来简洁且类似于 SQL 语句。下面是一个示例，展示如何使用查询表达式来查询一个字符串数组中的元素：

```csharp
string[] names = { "Alice", "Bob", "Charlie", "David" };

var query = from name in names
            where name.Length > 3
            select name;

foreach (var name in query)
{
    Console.WriteLine(name);
}
```

### 方法语法

方法语法则利用扩展方法来构建查询。与查询表达式语法相比，方法语法更加灵活，但也可能略显复杂。以下是使用方法语法实现相同查询的示例：

```csharp
string[] names = { "Alice", "Bob", "Charlie", "David" };

var query = names.Where(name => name.Length > 3);

foreach (var name in query)
{
    Console.WriteLine(name);
}
```

## LINQ 的方法语法

方法语法使用一系列的扩展方法来构建查询。以下是一些常用的 LINQ 方法：

- `Where`: 过滤元素
- `Select`: 投影元素
- `OrderBy`: 排序元素
- `GroupBy`: 分组元素
- `Join`: 连接两个集合
- `Sum`, `Average`, `Count`, `Max`, `Min`: 聚合方法

### 示例：使用方法语法

以下示例展示了如何使用方法语法来查询和操作一个整数数组：

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

var evenNumbers = numbers.Where(n => n % 2 == 0)
                          .OrderBy(n => n)
                          .Select(n => new { Number = n, Square = n * n });

foreach (var item in evenNumbers)
{
    Console.WriteLine($"Number: {item.Number}, Square: {item.Square}");
}
```

## LINQ to Objects

LINQ to Objects 是 LINQ 的一个实现，它允许对内存中的对象进行查询。通过 LINQ to Objects，可以查询任何实现了 `IEnumerable<T>` 接口的集合。

### 示例：LINQ to Objects

以下示例展示了如何使用 LINQ to Objects 查询一个 List 集合：

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

var oddNumbers = from number in numbers
                 where number % 2 != 0
                 orderby number descending
                 select number;

foreach (var number in oddNumbers)
{
    Console.WriteLine(number);
}
```

## LINQ to XML

LINQ to XML 是 LINQ 的一个实现，它允许对 XML 数据进行查询和操作。通过 LINQ to XML，可以轻松地创建、查询和操作 XML 文档。

### 示例：LINQ to XML

以下示例展示了如何使用 LINQ to XML 查询和操作 XML 数据：

```csharp
XDocument xmlDoc = XDocument.Parse(@"
<root>
    <person>
        <name>Alice</name>
        <age>30</age>
    </person>
    <person>
        <name>Bob</name>
        <age>25</age>
    </person>
</root>");

var people = from person in xmlDoc.Descendants("person")
             where (int)person.Element("age") > 27
             select new
             {
                 Name = person.Element("name").Value,
                 Age = (int)person.Element("age")
             };

foreach (var person in people)
{
    Console.WriteLine($"Name: {person.Name}, Age: {person.Age}");
}
```

## 总结

通过本章的学习，我们了解了 LINQ 的基本概念和使用方法。我们探索了查询表达式语法和方法语法，并展示了如何在内存对象和 XML 数据上使用 LINQ。掌握 LINQ 将极大提高数据处理的效率，使代码更加简洁和易读。

【本章节完毕】
