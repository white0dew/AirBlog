---
title: 第 9 章：多态
urlname: kugx9ym41ibcfat7
date: '2024-06-21 16:38:26'
updated: '2024-06-23 21:04:04'
description: 'keywords: C# 多态, C# 虚方法, C# 抽象类, C# 接口, 面向对象编程多态性（Polymorphism）是面向对象编程中的一项核心特性，它允许一个接口有多个实现方式。C# 中的多态主要通过虚方法（virtual methods）、抽象类（abstract classes）...'
keywords: 'C# 多态, C# 虚方法, C# 抽象类, C# 接口, 面向对象编程'
---
多态性（Polymorphism）是面向对象编程中的一项核心特性，它允许一个接口有多个实现方式。C# 中的多态主要通过虚方法（virtual methods）、抽象类（abstract classes）和接口（interfaces）来实现。本章将详细介绍这些概念，并通过具体示例帮助你掌握如何在编程中应用多态。

## 什么是多态

多态指的是同一操作可以有不同的执行方式，具体表现在基类和派生类之间方法的重写。通过多态，一个基类引用可以在运行时指向不同的派生类对象，并调用其实现的特定方法。这种特性使得代码更加灵活和可扩展。


在上图中，`Shape` 是一个接口，定义了一个 `Draw` 方法。`Circle`、`Rectangle` 和 `Triangle` 分别实现了 `Shape` 接口，并提供了各自的 `Draw` 方法。

## 虚方法

虚方法（virtual method）是指在基类中声明，并允许在派生类中重写的方法。在基类中使用 `virtual` 关键字声明虚方法，在派生类中使用 `override` 关键字对其进行重写。

### 示例代码

```csharp
using System;

public class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Animal makes a sound");
    }
}

public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Dog barks");
    }
}

public class Cat : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Cat meows");
    }
}

public class Program
{
    public static void Main()
    {
        Animal myDog = new Dog();
        Animal myCat = new Cat();

        myDog.MakeSound(); // 输出：Dog barks
        myCat.MakeSound(); // 输出：Cat meows
    }
}
```

在这个示例中，基类 `Animal` 定义了一个虚方法 `MakeSound`。派生类 `Dog` 和 `Cat` 重写了这个方法，并提供了各自的实现。通过基类引用 `Animal`，我们可以在运行时调用不同派生类的 `MakeSound` 方法，这就是多态的体现。

## 抽象类和抽象方法

抽象类（abstract class）是无法实例化的类，它通常包含一个或多个抽象方法（abstract method）。抽象方法没有方法体，必须在派生类中实现。抽象类和方法的使用有助于定义一个通用的接口，而具体的实现留给派生类。

### 示例代码

```csharp
using System;

public abstract class Shape
{
    public abstract void Draw();
}

public class Circle : Shape
{
    public override void Draw()
    {
        Console.WriteLine("Drawing a circle");
    }
}

public class Rectangle : Shape
{
    public override void Draw()
    {
        Console.WriteLine("Drawing a rectangle");
    }
}

public class Program
{
    public static void Main()
    {
        Shape[] shapes = { new Circle(), new Rectangle() };

        foreach (var shape in shapes)
        {
            shape.Draw(); // 输出：Drawing a circle 和 Drawing a rectangle
        }
    }
}
```

在这个示例中，`Shape` 是一个抽象类，定义了一个抽象方法 `Draw`。派生类 `Circle` 和 `Rectangle` 必须实现 `Draw` 方法。通过抽象类引用 `Shape`，我们可以调用不同派生类的 `Draw` 方法。

## 接口

接口（interface）是一个更高级的抽象层次，它只包含方法、属性、事件等成员的声明，没有任何实现。类或结构可以实现一个或多个接口，并提供具体的实现。

### 示例代码

```csharp
using System;

public interface IShape
{
    void Draw();
}

public class Circle : IShape
{
    public void Draw()
    {
        Console.WriteLine("Drawing a circle");
    }
}

public class Rectangle : IShape
{
    public void Draw()
    {
        Console.WriteLine("Drawing a rectangle");
    }
}

public class Program
{
    public static void Main()
    {
        IShape myCircle = new Circle();
        IShape myRectangle = new Rectangle();

        myCircle.Draw(); // 输出：Drawing a circle
        myRectangle.Draw(); // 输出：Drawing a rectangle
    }
}
```

在这个示例中，`IShape` 是一个接口，定义了一个方法 `Draw`。类 `Circle` 和 `Rectangle` 实现了 `IShape` 接口，并提供了 `Draw` 方法的具体实现。通过接口引用 `IShape`，我们可以调用不同类的 `Draw` 方法。

多态作为面向对象编程的核心特性，使得代码更加灵活和可扩展。通过虚方法、抽象类和接口，我们可以定义通用的接口，并在派生类中提供具体的实现。在实际开发中，合理利用多态可以使代码结构更加清晰和易于维护。

