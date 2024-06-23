---
title: 第 6 章：异常处理
urlname: yzb9otcc53egu51a
date: '2024-06-21 16:37:49'
updated: '2024-06-23 21:03:10'
description: 本章详细介绍了 C#中的异常处理机制，包括异常的类型、try-catch-finally 语句的使用、如何抛出异常以及如何定义自定义异常。通过图文结合的方式帮助读者深刻理解异常处理的原理和应用。
keywords: '异常处理, C#异常, try-catch-finally, 自定义异常, 抛出异常'
---
异常处理是编程中至关重要的一部分，它帮助我们在程序运行过程中应对未预料到的错误。本章将深入探讨 C#中的异常处理机制，包括异常的类型、try-catch-finally 语句的使用、如何抛出异常以及如何定义自定义异常。

## 什么是异常

在程序运行过程中，可能会遇到各种各样的错误，例如除数为零、数组越界、文件未找到等。这些错误在 C#中被称为"异常"。异常是程序执行过程中出现的问题或意外情况，通常由系统自动检测并生成相应的异常对象。

## 异常的类型

C#中有多种类型的异常，以下是几种常见的异常类型：

1. **System.Exception**: 所有异常的基类。
2. **System.SystemException**: 由系统引发的异常。
3. **System.ApplicationException**: 由应用程序引发的异常。
4. **常见的派生异常**: 
   - **System.NullReferenceException**: 尝试访问未实例化的对象。
   - **System.IndexOutOfRangeException**: 数组下标超出范围。
   - **System.DivideByZeroException**: 除数为零。

## try-catch-finally

C#使用`try-catch-finally`语句来处理异常。`try`块包含可能引发异常的代码，`catch`块用于捕获异常并处理，而`finally`块包含无论是否发生异常都要执行的代码。以下是其基本结构：

```csharp
try {
    // 可能引发异常的代码
} catch (Exception ex) {
    // 处理异常的代码
} finally {
    // 始终执行的代码
}
```

### 示例

```csharp
try {
    int[] numbers = { 1, 2, 3 };
    Console.WriteLine(numbers[5]);
} catch (IndexOutOfRangeException ex) {
    Console.WriteLine("数组下标超出范围：" + ex.Message);
} finally {
    Console.WriteLine("无论是否发生异常，这段代码都会执行。");
}
```


在上述示例中，`try`块中的代码尝试访问数组的一个不存在的元素，从而引发`IndexOutOfRangeException`异常。`catch`块捕获并处理该异常，最后`finally`块确保某些代码始终执行。

## 抛出异常

有时，我们需要在代码中手动抛出异常，使用`throw`关键字可以实现这一点。

### 示例

```csharp
public void CheckAge(int age) {
    if (age < 18) {
        throw new ArgumentException("年龄不能小于18岁");
    }
    Console.WriteLine("年龄符合要求");
}
```

在该示例中，`CheckAge`方法检查传入的年龄是否小于 18 岁，如果是，则抛出`ArgumentException`异常。

## 自定义异常

在某些情况下，标准异常类型不能准确描述问题，这时可以定义自定义异常。

### 示例

```csharp
public class InvalidAgeException : Exception {
    public InvalidAgeException(string message) : base(message) { }
}
```

```csharp
public void CheckAge(int age) {
    if (age < 18) {
        throw new InvalidAgeException("年龄不能小于18岁");
    }
    Console.WriteLine("年龄符合要求");
}
```

在该示例中，定义了一个名为`InvalidAgeException`的自定义异常类，并在`CheckAge`方法中使用该异常。

通过本章的学习，您应该已经掌握了 C#中的异常处理机制，包括如何使用`try-catch-finally`语句、如何手动抛出异常以及如何定义自定义异常。异常处理对于编写健壮和稳定的代码至关重要，希望您能够深入理解并熟练应用。

