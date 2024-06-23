---
title: 第 11 章：集合
urlname: vpvppyhndghx56x3
date: '2024-06-21 16:41:11'
updated: '2024-06-23 21:04:33'
description: 'keywords: 集合, List, Dictionary, HashSet, C#, 数据结构集合是编程中常用的数据结构之一，用于存储和管理一组数据。在 C# 中，集合类提供了丰富的功能，使得数据的存取和操作更加便捷高效。本章将详细介绍 List、Dictionary<TKey, TVal...'
keywords: '集合, List, Dictionary, HashSet, C#, 数据结构'
---
集合是编程中常用的数据结构之一，用于存储和管理一组数据。在 C# 中，集合类提供了丰富的功能，使得数据的存取和操作更加便捷高效。本章将详细介绍 List、Dictionary<TKey, TValue> 和 HashSet 以及它们的常用操作。

## 什么是集合

集合是一种数据结构，用于存储一组相关的数据项。与数组不同，集合提供了更强大的功能，如动态大小调整、复杂查询和数据操作。在 C# 中，集合类都位于 `System.Collections.Generic` 命名空间下，主要包括以下几种：

- **List**: 一种动态数组，能够按索引快速访问元素。
- **Dictionary<TKey, TValue>**: 一种键值对集合，能够通过键快速查找值。
- **HashSet**: 一种无序集合，不允许包含重复元素。

## List

### 定义和初始化

`List<T>` 是一种常用的泛型集合，提供了动态大小调整和高效的元素访问。以下是 `List<T>` 的定义和初始化方法：

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // 定义和初始化
        List<string> names = new List<string> { "Alice", "Bob", "Charlie" };

        // 添加元素
        names.Add("Dave");

        // 访问元素
        Console.WriteLine(names[2]); // 输出：Charlie

        // 遍历集合
        foreach (var name in names)
        {
            Console.WriteLine(name);
        }
    }
}
```

### 常用操作

下面是一些 `List<T>` 的常用操作：

- **添加元素**: 使用 `Add` 方法添加单个元素，使用 `AddRange` 方法添加多个元素。
- **插入元素**: 使用 `Insert` 方法在指定位置插入元素。
- **删除元素**: 使用 `Remove` 方法删除指定元素，使用 `RemoveAt` 方法删除指定位置的元素。
- **查找元素**: 使用 `Contains` 方法检查集合中是否包含指定元素，使用 `IndexOf` 方法获取元素的索引。

```csharp
// 添加多个元素
names.AddRange(new List<string> { "Eve", "Frank" });

// 在指定位置插入元素
names.Insert(1, "Grace");

// 删除指定元素
names.Remove("Bob");

// 删除指定位置的元素
names.RemoveAt(0);

// 查找元素
bool containsAlice = names.Contains("Alice");
int indexOfFrank = names.IndexOf("Frank");

Console.WriteLine($"Contains Alice: {containsAlice}");
Console.WriteLine($"Index of Frank: {indexOfFrank}");
```

### 示例：管理学生名单

```csharp
using System;
using System.Collections.Generic;

class StudentList
{
    private List<string> students;

    public StudentList()
    {
        students = new List<string>();
    }

    public void AddStudent(string student)
    {
        students.Add(student);
        Console.WriteLine($"{student} 已加入学生名单。");
    }

    public void RemoveStudent(string student)
    {
        if (students.Remove(student))
        {
            Console.WriteLine($"{student} 已从学生名单中移除。");
        }
        else
        {
            Console.WriteLine($"{student} 不在学生名单中。");
        }
    }

    public void PrintStudents()
    {
        Console.WriteLine("学生名单：");
        foreach (var student in students)
        {
            Console.WriteLine(student);
        }
    }
}

class Program
{
    static void Main()
    {
        StudentList studentList = new StudentList();
        studentList.AddStudent("Alice");
        studentList.AddStudent("Bob");
        studentList.PrintStudents();
        studentList.RemoveStudent("Alice");
        studentList.PrintStudents();
    }
}
```

## Dictionary<TKey, TValue>

### 定义和初始化

`Dictionary<TKey, TValue>` 是一种键值对集合，通过键来快速访问值。以下是 `Dictionary<TKey, TValue>` 的定义和初始化方法：

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // 定义和初始化
        Dictionary<int, string> employees = new Dictionary<int, string>
        {
            { 1, "Alice" },
            { 2, "Bob" },
            { 3, "Charlie" }
        };

        // 添加键值对
        employees.Add(4, "Dave");

        // 访问值
        Console.WriteLine(employees[2]); // 输出：Bob

        // 遍历字典
        foreach (var kvp in employees)
        {
            Console.WriteLine($"ID: {kvp.Key}, Name: {kvp.Value}");
        }
    }
}
```

### 常用操作

下面是一些 `Dictionary<TKey, TValue>` 的常用操作：

- **添加键值对**: 使用 `Add` 方法添加键值对。
- **删除键值对**: 使用 `Remove` 方法删除指定键的键值对。
- **查找键值对**: 使用 `ContainsKey` 方法检查字典是否包含指定键，使用 `TryGetValue` 方法获取指定键的值。

```csharp
// 添加键值对
employees.Add(5, "Eve");

// 删除指定键的键值对
employees.Remove(1);

// 查找键值对
bool containsKey2 = employees.ContainsKey(2);
if (employees.TryGetValue(3, out string value))
{
    Console.WriteLine($"Key 3 maps to value: {value}");
}

Console.WriteLine($"Contains Key 2: {containsKey2}");
```

### 示例：管理员工信息

```csharp
using System;
using System.Collections.Generic;

class EmployeeDirectory
{
    private Dictionary<int, string> employees;

    public EmployeeDirectory()
    {
        employees = new Dictionary<int, string>();
    }

    public void AddEmployee(int id, string name)
    {
        employees[id] = name;
        Console.WriteLine($"员工 {name}（ID: {id}） 已加入员工名录。");
    }

    public void RemoveEmployee(int id)
    {
        if (employees.Remove(id))
        {
            Console.WriteLine($"员工（ID: {id}） 已从员工名录中移除。");
        }
        else
        {
            Console.WriteLine($"员工（ID: {id}） 不在员工名录中。");
        }
    }

    public void PrintEmployees()
    {
        Console.WriteLine("员工名录：");
        foreach (var kvp in employees)
        {
            Console.WriteLine($"ID: {kvp.Key}, Name: {kvp.Value}");
        }
    }
}

class Program
{
    static void Main()
    {
        EmployeeDirectory directory = new EmployeeDirectory();
        directory.AddEmployee(1, "Alice");
        directory.AddEmployee(2, "Bob");
        directory.PrintEmployees();
        directory.RemoveEmployee(1);
        directory.PrintEmployees();
    }
}
```

## HashSet

### 定义和初始化

`HashSet<T>` 是一种无序集合，不允许包含重复元素。以下是 `HashSet<T>` 的定义和初始化方法：

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // 定义和初始化
        HashSet<string> fruits = new HashSet<string> { "Apple", "Banana", "Cherry" };

        // 添加元素
        fruits.Add("Date");
        fruits.Add("Apple"); // 不会添加重复元素

        // 遍历集合
        foreach (var fruit in fruits)
        {
            Console.WriteLine(fruit);
        }
    }
}
```

### 常用操作

下面是一些 `HashSet<T>` 的常用操作：

- **添加元素**: 使用 `Add` 方法添加元素。
- **删除元素**: 使用 `Remove` 方法删除指定元素。
- **查找元素**: 使用 `Contains` 方法检查集合中是否包含指定元素。

```csharp
// 添加元素
fruits.Add("Elderberry");

// 删除指定元素
fruits.Remove("Banana");

// 查找元素
bool containsCherry = fruits.Contains("Cherry");

Console.WriteLine($"Contains Cherry: {containsCherry}");
```

### 示例：管理水果集合

```csharp
using System;
using System.Collections.Generic;

class FruitBasket
{
    private HashSet<string> fruits;

    public FruitBasket()
    {
        fruits = new HashSet<string>();
    }

    public void AddFruit(string fruit)
    {
        if (fruits.Add(fruit))
        {
            Console.WriteLine($"{fruit} 已加入水果篮。");
        }
        else
        {
            Console.WriteLine($"{fruit} 已存在于水果篮中。");
        }
    }

    public void RemoveFruit(string fruit)
    {
        if (fruits.Remove(fruit))
        {
            Console.WriteLine($"{fruit} 已从水果篮中移除。");
        }
        else
        {
            Console.WriteLine($"{fruit} 不在水果篮中。");
        }
    }

    public void PrintFruits()
    {
        Console.WriteLine("水果篮内容：");
        foreach (var fruit in fruits)
        {
            Console.WriteLine(fruit);
        }
    }
}

class Program
{
    static void Main()
    {
        FruitBasket basket = new FruitBasket();
        basket.AddFruit("Apple");
        basket.AddFruit("Banana");
        basket.PrintFruits();
        basket.RemoveFruit("Apple");
        basket.PrintFruits();
    }
}
```

---

### 集合的常用操作

对于所有集合类型（如 `List<T>`、`Dictionary<TKey, TValue>` 和 `HashSet<T>`），有一些常用的操作和方法，它们在不同的集合类型中表现各异，但基本思想是相似的：

- **添加元素**: 向集合中添加新元素。
- **删除元素**: 从集合中移除指定元素。
- **查找元素**: 验证集合中是否存在特定元素。
- **遍历集合**: 依次访问集合中的每个元素。

这些操作在日常编程中非常重要，掌握这些操作可以帮助你高效地管理和操作数据。

---

## 问题与建议

在学习集合时，你可能会遇到以下问题，请参考以下建议进行解决：

1. **内存管理**：集合在动态扩展时会消耗更多的内存，建议适当设置初始容量以提高性能。
2. **线程安全**：如果在多线程环境中使用集合，请使用线程安全的集合类，如 `ConcurrentDictionary<TKey, TValue>`。
3. **性能优化**：选择合适的集合类型以提高性能，例如，当需要快速查找时优先使用 `Dictionary<TKey, TValue>`，而不是 `List<T>`。

### 资源推荐

为了进一步提升对集合的理解和应用，建议参考以下资源：

- Microsoft's official C# documentation on collections: [Introduction to Collections](https://docs.microsoft.com/en-us/dotnet/standard/collections/)
- C# in Depth by Jon Skeet - A great book providing in-depth knowledge about C# and its features.

在本章中，我们详细介绍了 C#中的集合类型，包括 `List<T>`、`Dictionary<TKey, TValue>` 和 `HashSet<T>`，并且演示了它们的定义、初始化和常用操作。集合是编程中非常重要的工具，掌握它们将极大提高你的编程效率和代码质量。

希望通过本章的学习，你已经能够熟练应用这些集合类型来解决实际编程问题。在接下来的章节中，我们将继续探讨更多高级主题，进一步提升你的 C#编程技能。
