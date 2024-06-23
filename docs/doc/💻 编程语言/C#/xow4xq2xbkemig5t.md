---
title: 第 8 章：继承
urlname: xow4xq2xbkemig5t
date: '2024-06-21 16:38:12'
updated: '2024-06-21 16:38:22'
description: 本章介绍了 C#中的继承概念，包括基类和派生类的定义、继承的实现、base 关键字的使用以及方法的重写，帮助读者掌握面向对象编程的核心技术之一。
keywords: '继承, C# 继承, 基类和派生类, 方法重写, base 关键字'
---
## 前言

继承是面向对象编程（OOP）的一个核心概念，它允许我们创建一个基类，并让其他类从这个基类继承，从而共享其方法和属性。这不仅提高了代码的重用性，还促进了代码的组织和维护。

## 8.1 什么是继承

继承是一种机制，它允许一个类（派生类）从另一个类（基类）继承字段和方法。通过这种方式，派生类可以重用基类的代码，并且可以根据需要添加新的功能或重写现有功能。

## 8.2 基类和派生类

基类是其他类可以继承的类，它包含了通用的属性和方法。派生类是继承自基类的类，它继承了基类的所有属性和方法，并且可以增加自己的属性和方法。


在上面的类图中，`Animal`是一个基类，`Cat`和`Dog`分别是从`Animal`继承的派生类。`Cat`类有一个独特的方法`Meow()`，而`Dog`类有一个独特的方法`Bark()`。

### 示例代码

```csharp
public class Animal
{
    public string Name { get; set; }

    public void Eat()
    {
        Console.WriteLine($"{Name} is eating.");
    }

    public void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping.");
    }
}

public class Cat : Animal
{
    public void Meow()
    {
        Console.WriteLine("Cat says: Meow!");
    }
}

public class Dog : Animal
{
    public void Bark()
    {
        Console.WriteLine("Dog says: Bark!");
    }
}
```

在这个代码示例中，`Cat`和`Dog`类都继承了`Animal`类的`Name`属性、`Eat`方法和`Sleep`方法。

## 8.3 继承的实现

要实现继承，只需使用冒号（:）符号在派生类声明中指定基类。

### 示例代码

```csharp
public class Animal
{
    public string Name { get; set; }

    public void Eat()
    {
        Console.WriteLine($"{Name} is eating.");
    }

    public void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping.");
    }
}

public class Cat : Animal
{
    public void Meow()
    {
        Console.WriteLine("Cat says: Meow!");
    }
}
```

在这个示例中，`Cat`类使用冒号（:）继承了`Animal`类。

## 8.4 base 关键字

在派生类中，有时需要调用基类的构造函数或方法，这可以通过`base`关键字来实现。

### 示例代码

```csharp
public class Animal
{
    public string Name { get; set; }

    public Animal(string name)
    {
        Name = name;
    }

    public void Eat()
    {
        Console.WriteLine($"{Name} is eating.");
    }

    public void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping.");
    }
}

public class Cat : Animal
{
    public Cat(string name) : base(name)
    {
    }

    public void Meow()
    {
        Console.WriteLine("Cat says: Meow!");
    }
}
```

在这个示例中，`Cat`类的构造函数使用`base`关键字调用了基类`Animal`的构造函数。

## 8.5 方法的重写

方法重写允许派生类重新定义基类中的方法，从而提供新的实现。这需要在基类的方法前添加`virtual`关键字，并在派生类的方法前添加`override`关键字。

### 示例代码

```csharp
public class Animal
{
    public string Name { get; set; }

    public virtual void Eat()
    {
        Console.WriteLine($"{Name} is eating.");
    }

    public void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping.");
    }
}

public class Cat : Animal
{
    public override void Eat()
    {
        Console.WriteLine($"{Name} is eating cat food.");
    }

    public void Meow()
    {
        Console.WriteLine("Cat says: Meow!");
    }
}
```

在这个示例中，`Cat`类重写了`Animal`类的`Eat`方法，以提供不同的实现。

## 总结

通过继承，代码得以重用和组织，更容易管理。理解和使用继承是掌握面向对象编程的重要一步。在下一章，我们将探讨多态，这是 OOP 的另一个关键概念。

【本章节完毕】
