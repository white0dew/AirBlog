---
title: 第 10 章：封装
urlname: ordcsqdus8g8xmsa
date: '2024-06-21 16:39:14'
updated: '2024-06-21 16:39:24'
description: 本章节介绍封装的概念，访问修饰符的种类及其使用方法，属性的定义和使用，索引器的应用，帮助读者理解和应用封装这一面向对象编程的重要特性，提升代码的安全性和可维护性。
keywords: '封装, 访问修饰符, 属性, 索引器, C#面向对象'
---
## 前言

封装是面向对象编程的四大基本特性之一。通过封装，我们可以隐藏对象的内部状态，只允许通过特定的方法访问和修改数据，从而保证数据的安全性和一致性。本章将详细介绍封装的概念、访问修饰符、属性及索引器的使用方法。

## 什么是封装

封装(Encapsulation) 是将对象的状态(字段)和行为(方法)结合在一起，并对外隐藏其内部实现细节的机制。通过封装，我们可以控制数据的访问权限，增强代码的安全性和可维护性。

### 示例

```csharp
public class Person
{
    private string name;  // 字段

    public string GetName()  // 方法
    {
        return name;
    }

    public void SetName(string newName)  // 方法
    {
        name = newName;
    }
}
```

在上面的例子中，`name` 字段是私有的，只能通过 `GetName` 和 `SetName` 方法访问和修改。

## 访问修饰符

访问修饰符用于控制类成员的可见性。C# 提供了以下几种访问修饰符：

1. **public**：公共访问，成员可以被任何代码访问。
2. **private**：私有访问，成员只能在其所属类内部访问。
3. **protected**：受保护访问，成员可以在其所属类和派生类中访问。
4. **internal**：内部访问，成员只能在同一程序集内访问。
5. **protected internal**：受保护内部访问，成员可以在同一程序集内访问，或者在派生类中访问。

### 示例

```csharp
public class Car
{
    public string Make { get; set; }  // 公共属性
    private int year;  // 私有字段
    protected int speed;  // 受保护字段
    internal string color;  // 内部字段
    protected internal string model;  // 受保护内部字段
}
```

## 属性

属性是用于封装类中字段的一种方法。它们提供了控制字段访问和修改的机制，同时保持了字段的易用性。

### 示例

```csharp
public class Rectangle
{
    private double length;  // 私有字段
    private double width;  // 私有字段

    public double Length  // 公共属性
    {
        get { return length; }
        set { length = value; }
    }

    public double Width  // 公共属性
    {
        get { return width; }
        set { width = value; }
    }

    public double Area  // 只读属性
    {
        get { return length * width; }
    }
}
```

在上面的例子中，`Length` 和 `Width` 属性提供了对 `length` 和 `width` 字段的访问控制。`Area` 属性是只读的，它计算并返回矩形的面积。

## 索引器

索引器使对象可以像数组一样通过索引访问其数据。它们允许类、结构或接口的实例使用数组访问语法来访问数据。

### 示例

```csharp
public class ShoppingCart
{
    private List<string> items = new List<string>();

    public string this[int index]  // 索引器
    {
        get { return items[index]; }
        set { items[index] = value; }
    }

    public void AddItem(string item)
    {
        items.Add(item);
    }

    public int ItemCount
    {
        get { return items.Count; }
    }
}
```

在上面的例子中，`ShoppingCart` 类定义了一个索引器，使我们可以通过索引访问购物车中的项目。


## 小结

本章介绍了封装的概念、不同访问修饰符的使用方法、属性的定义和使用、以及索引器的应用。通过理解和应用封装，我们可以更好地保护数据的完整性，提高代码的可维护性和重用性。在实际开发中，合理使用封装是编写高质量代码的重要技巧。

【本章节完毕】
