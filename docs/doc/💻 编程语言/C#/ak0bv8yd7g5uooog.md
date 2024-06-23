---
title: 第 14 章：异步编程
urlname: ak0bv8yd7g5uooog
date: '2024-06-21 16:44:25'
updated: '2024-06-23 21:04:58'
description: 'keywords: 异步编程, Task, async 等待, 并行编程。在现代编程中，异步编程（Asynchronous Programming）是一项关键技术，能够显著提升应用程序的响应速度和性能。本章将深入探讨异步编程的概念，以及如何在 C#中使用 Task、Task以及 async 和...'
keywords: '异步编程, Task, async 等待, 并行编程。'
---
在现代编程中，异步编程（Asynchronous Programming）是一项关键技术，能够显著提升应用程序的响应速度和性能。本章将深入探讨异步编程的概念，以及如何在 C#中使用 Task、Task以及 async 和 await 关键字，最后还会介绍并行编程的实现。

## 什么是异步编程

异步编程是一种编程模式，允许程序在等待一个操作完成时继续执行其他操作，而不会被阻塞。这种方式特别有用在 I/O 操作（如文件读写、网络请求）或长时间运行的计算任务中。

### 同步 vs 异步

**同步编程**：在同步编程中，任务是按顺序执行的，一个任务完成后才会开始下一个任务。如果某个任务需要等待很长时间（例如读取一个大文件），程序其余部分将被阻塞，直到该任务完成。

**异步编程**：在异步编程中，程序可以在等待任务完成时继续执行其他任务。这使得程序在执行 I/O 密集型或耗时任务时更加高效。



## Task 和 Task

在 C#中，Task 和 Task是实现异步编程的基础。

### Task

Task 表示一个异步操作。你可以通过 Task 的静态方法 Run 来启动一个新的任务。

```csharp
using System;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        Task task = Task.Run(() =>
        {
            // 模拟一个耗时任务
            for (int i = 0; i < 10; i++)
            {
                Console.WriteLine("Task running...");
                Task.Delay(1000).Wait();
            }
        });

        task.Wait(); // 等待任务完成
    }
}
```

### Task

Task表示一个返回值的异步操作。例如，你可以启动一个 Task，它将在完成时返回一个字符串。

```csharp
using System;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        Task<string> task = Task.Run(() =>
        {
            Task.Delay(2000).Wait();
            return "Task completed!";
        });

        task.Wait(); // 等待任务完成
        Console.WriteLine(task.Result); // 输出任务结果
    }
}
```

## async 和 await 关键字

使用 async 和 await 关键字可以简化异步代码的编写，使代码更易读和维护。

### 定义异步方法

在方法前加上 async 关键字，表示该方法是异步方法。异步方法通常返回 Task 或 Task。

```csharp
using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        string result = await PerformTask();
        Console.WriteLine(result);
    }

    static async Task<string> PerformTask()
    {
        await Task.Delay(2000); // 模拟异步操作
        return "Task completed!";
    }
}
```

### 使用 await 等待异步操作

在异步方法中，使用 await 关键字等待异步操作完成。await 会暂停方法的执行，直到异步操作完成，然后继续执行后续代码。

```csharp
static async Task PerformMultipleTasks()
{
    Task task1 = Task.Delay(2000);
    Task task2 = Task.Delay(3000);

    await task1;
    Console.WriteLine("Task 1 completed");

    await task2;
    Console.WriteLine("Task 2 completed");
}
```

## 异步方法的错误处理

在异步方法中使用 try-catch 块，可以捕获异步操作中的异常。

```csharp
static async Task PerformTaskWithErrorHandling()
{
    try
    {
        await Task.Run(() =>
        {
            throw new InvalidOperationException("Something went wrong");
        });
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Exception caught: {ex.Message}");
    }
}
```

## 并行编程

并行编程（Parallel Programming）是一种并发编程模型，允许程序同时执行多个操作。C#提供了 Parallel 类来支持并行编程。

### Parallel.For

Parallel.For 方法用于并行执行一个 for 循环。

```csharp
using System;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        Parallel.For(0, 10, i =>
        {
            Console.WriteLine($"Task {i} is running on thread {Task.CurrentId}");
            Task.Delay(1000).Wait();
        });
    }
}
```

### Parallel.ForEach

Parallel.ForEach 方法用于并行执行对集合中的每个元素的操作。

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

        Parallel.ForEach(numbers, number =>
        {
            Console.WriteLine($"Processing number {number} on thread {Task.CurrentId}");
            Task.Delay(1000).Wait();
        });
    }
}
```

### 并行编程的注意事项

尽管并行编程能够显著提升程序性能，但需要注意以下事项：

- **线程安全**：确保并行执行的代码是线程安全的，避免数据竞争和死锁等问题。
- **资源竞争**：并行任务可能会争夺系统资源，如 CPU 和内存，合理分配资源。
- **调试难度**：并行编程可能会增加代码的调试难度，注意日志记录和错误处理。


本章介绍了异步编程的基本概念，以及如何在 C#中使用 Task、Task、async 和 await 关键字实现异步操作。我们还探讨了并行编程的实现方式以及一些注意事项。通过异步和并行编程，可以显著提升应用程序的响应速度和性能，让你的程序更高效、更健壮。

