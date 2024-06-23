---
title: 第 10 章：并发编程
urlname: ttuo4tdv5c5p7iz4
date: '2024-06-20 19:47:30'
updated: '2024-06-23 20:36:18'
description: 本章节将深入探讨 Rust 中的并发编程，涵盖线程和消息传递、共享状态与 Sync trait、Send trait 和线程安全、并发模式和最佳实践。
keywords: '并发编程, Rust 线程, Rust 消息传递, Rust Sync, Rust Send'
---
## 前言
在现代编程中，并发性是提升性能和响应能力的关键。Rust 以其安全且高效的内存管理而闻名，在并发编程方面也提供了强大的支持。本章将带你深入探讨 Rust 中的并发编程，从基础概念到高级模式和实践。
## 线程和消息传递
Rust 提供了简单而强大的线程管理工具。在 Rust 中，您可以使用 `std::thread` 创建和管理线程。让我们从一个简单的示例开始，展示如何创建和启动线程：
```rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("这是子线程的消息 {}", i);
            thread::sleep(Duration::from_millis(500));
        }
    });

    for i in 1..5 {
        println!("这是主线程的消息 {}", i);
        thread::sleep(Duration::from_millis(1000));
    }

    // 等待子线程完成
    handle.join().unwrap();
}
```
在上面的代码中，我们创建了一个子线程，每隔 500 毫秒打印一条消息。同时，主线程也在打印消息，并在完成后等待子线程结束。
### 消息传递
Rust 中的消息传递是通过通道（channels）实现的。通道包括发送端（Sender）和接收端（Receiver）。下面是一个使用通道进行线程间通信的示例：
```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let values = vec!["一", "二", "三", "四"];
        for value in values {
            tx.send(value).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    for received in rx {
        println!("收到：{}", received);
    }
}
```
在这个例子中，我们创建了一个通道，并启动了一个子线程向通道发送数据。主线程则从通道接收数据并打印出来。当所有发送的数据都被接收后，主线程也随之结束。
## 共享状态和 Sync trait
在并发编程中，多个线程可能需要访问和修改共享状态。Rust 提供了多种机制来安全地共享状态。`Arc` 和 `Mutex` 是其中两个重要工具。
### Arc 和 Mutex
`Arc` 是原子引用计数（atomic reference counting）的缩写，它允许多个线程安全地共享所有权。`Mutex` 则提供了互斥锁，确保同时只有一个线程可以访问共享数据。
```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("结果：{}", *counter.lock().unwrap());
}
```
在这个示例中，我们使用 `Arc` 和 `Mutex` 创建了一个线程安全的计数器。每个线程都获取计数器的锁，并递增其值。主线程等待所有线程完成后，打印最终结果。
## Send trait 和线程安全
Rust 中的 `Send` trait 标识数据可以在线程间安全传递。大多数基础类型都实现了 `Send` trait。自定义类型也可以通过确保所有成员都是 `Send` 来实现 `Send`。
```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(move || {
        println!("从子线程中访问矢量：{:?}", v);
    });

    handle.join().unwrap();
}
```
在上面的例子中，我们将一个向量移动到子线程，并在子线程中访问它。由于向量是 `Send` 的，因此这个操作是安全的。
## 并发模式和最佳实践
Rust 提供了多种并发编程模式，包括消息传递、共享状态和任务调度。在实际应用中，选择合适的并发模式至关重要。以下是一些并发编程的最佳实践：

- **尽量避免数据竞争**：使用 `Mutex` 和 `RwLock` 等工具确保数据一致性。
- **简化数据传递**：使用通道进行线程间通信，避免复杂的数据共享。
- **确保线程安全**：通过 `Send` 和 `Sync` trait 确保数据在不同线程间的安全传递。
- **适当使用原子操作**：对于简单的计数和标志操作，可以使用 `Atomic` 类型。
### 实践示例
让我们综合运用本章所学，创建一个多线程的简单聊天服务器：
```rust
use std::sync::{Arc, Mutex};
use std::sync::mpsc;
use std::thread;
use std::io::{self, Write};

fn main() {
    let (tx, rx) = mpsc::channel();
    let clients = Arc::new(Mutex::new(vec![]));

    for i in 0..3 {
        let tx = tx.clone();
        let clients = Arc::clone(&clients);

        thread::spawn(move || {
            let client_id = i;
            tx.send(format!("Client {} connected", client_id)).unwrap();
            clients.lock().unwrap().push(client_id);

            loop {
                let mut input = String::new();
                io::stdin().read_line(&mut input).unwrap();
                tx.send(format!("Client {}: {}", client_id, input.trim())).unwrap();
            }
        });
    }

    drop(tx);

    for message in rx {
        println!("{}", message);
    }
}
```
在这个示例中，我们创建了一个简单的聊天服务器，每个客户端在独立的线程中运行，并通过通道发送消息。主线程负责接收和打印所有消息。多个客户端可以同时发送消息，而不会发生数据竞争。
