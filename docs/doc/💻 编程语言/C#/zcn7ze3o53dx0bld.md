---
title: 第 16 章：特性
urlname: zcn7ze3o53dx0bld
date: '2024-06-21 16:45:17'
updated: '2024-06-23 21:05:17'
description: 'keywords: C#特性, 特性定义, 内置特性, 自定义特性, C#反射什么是特性特性（Attribute）是 C#中的一种强大工具，使得开发者可以在代码中添加元数据。特性可以应用于几乎所有的 C#代码元素，包括类、方法、属性、字段等。通过特性，可以方便地对代码的行为进行标注和控制。特性...'
keywords: 'C#特性, 特性定义, 内置特性, 自定义特性, C#反射'
---
## 什么是特性

特性（Attribute）是 C#中的一种强大工具，使得开发者可以在代码中添加元数据。特性可以应用于几乎所有的 C#代码元素，包括类、方法、属性、字段等。通过特性，可以方便地对代码的行为进行标注和控制。

### 特性的作用

特性主要用于以下几个方面：

- **标识和分类**：为代码元素添加标识信息，方便在运行时进行分类和过滤。
- **控制行为**：通过特性可以修改代码在运行时的行为。
- **简化代码**：通过特性可以减少重复代码，提高代码可读性。

## 特性的定义和使用

在 C#中，定义特性需要继承自`System.Attribute`类。使用特性则是在代码元素上方加上特性声明。

### 定义特性

定义一个简单的特性如下：

```csharp
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class MyCustomAttribute : Attribute
{
    public string Description { get; }

    public MyCustomAttribute(string description)
    {
        Description = description;
    }
}
```

这里定义了一个`MyCustomAttribute`特性，可以应用于类和方法，并且包含一个描述信息。

### 使用特性

使用特性非常简单，只需要在代码元素上加上特性声明即可：

```csharp
[MyCustomAttribute("This is a custom attribute")]
public class MyClass
{
    [MyCustomAttribute("This method does something")]
    public void MyMethod()
    {
        // 方法实现
    }
}
```

## 内置特性

C#中有许多内置特性，常用的包括`Obsolete`、`Serializable`、`DebuggerStepThrough`等。

### Obsolete 特性

`Obsolete`特性用于标记已过时的代码元素。使用该特性时，编译器会发出警告或错误提示。

```csharp
[Obsolete("This method is obsolete. Use NewMethod instead.")]
public void OldMethod()
{
    // 方法实现
}
```

### Serializable 特性

`Serializable`特性用于标记可序列化的类。被标记为`Serializable`的类可以通过序列化机制进行存储和传输。

```csharp
[Serializable]
public class MySerializableClass
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

## 自定义特性

除了使用内置特性外，开发者还可以根据需求定义自己的特性。

### 定义一个复杂的特性

```csharp
[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
public class RangeAttribute : Attribute
{
    public int Min { get; }
    public int Max { get; }

    public RangeAttribute(int min, int max)
    {
        Min = min;
        Max = max;
    }
}
```

### 使用自定义特性

```csharp
public class Product
{
    [Range(1, 100)]
    public int Quantity { get; set; }
}
```

## 使用反射读取特性

反射（Reflection）是 C#提供的一种机制，允许程序在运行时动态地获取类型的信息。通过反射，可以读取代码元素上的特性。

### 读取特性示例

```csharp
using System;
using System.Reflection;

public class Program
{
    public static void Main()
    {
        Type type = typeof(MyClass);

        // 获取类上的特性
        var classAttributes = type.GetCustomAttributes(typeof(MyCustomAttribute), false);
        foreach (MyCustomAttribute attr in classAttributes)
        {
            Console.WriteLine($"Class Attribute: {attr.Description}");
        }

        // 获取方法上的特性
        MethodInfo method = type.GetMethod(nameof(MyClass.MyMethod));
        var methodAttributes = method.GetCustomAttributes(typeof(MyCustomAttribute), false);
        foreach (MyCustomAttribute attr in methodAttributes)
        {
            Console.WriteLine($"Method Attribute: {attr.Description}");
        }
    }
}
```

上述代码演示了如何使用反射来获取类和方法上的自定义特性，并输出其描述信息。


在 C#中，特性是一种强大的工具，通过它可以方便地为代码元素添加元数据，并在运行时读取和使用这些元数据。通过学习本章内容，你应该能够定义和使用特性，理解内置特性的应用场景，并使用反射来读取特性信息。

