---
title: 第 4 章：结构体、枚举和集合类型
urlname: fccyi1rbvv9znu3d
date: '2024-06-20 19:21:39'
updated: '2024-06-20 19:23:23'
description: 本章节将深入探讨 Rust 中的结构体、枚举和集合类型的定义和使用方法，包括动态数组 Vec 和哈希表 HashMap 的操作，帮助读者掌握这些高级特性。
keywords: 'Rust 结构体, Rust 枚举, Rust 集合类型, Rust 动态数组, Rust 哈希表'
---
在本章中，我们将探讨 Rust 中几种非常重要的数据结构：**结构体**、**枚举** 和 **集合类型**。理解并熟练使用这些特性将极大提升你的 Rust 编程能力，特别是在构建复杂的数据模型时。
## 4.1 定义和使用结构体
结构体（Struct）是 Rust 中用来创建复杂数据类型的基本构建块。它允许你将不同类型的数据组合在一起，并为它们命名。
### 4.1.1 基本定义
让我们从一个简单的结构体定义开始：
```rust
// 定义一个名为 User 的结构体
struct User {
    name: String,
    age: u32,
    email: String,
}
```
在上面的例子中，我们定义了一个 `User` 结构体，它包含了 `name`、`age` 和 `email` 三个字段。每个字段都有一个类型。
### 4.1.2 实例化和访问
要创建一个结构体的实例，我们可以这样做：
```rust
fn main() {
    // 创建一个 User 结构体实例
    let user1 = User {
        name: String::from("Alice"),
        age: 30,
        email: String::from("alice@example.com"),
    };

    // 访问结构体字段
    println!("Name: {}, Age: {}, Email: {}", user1.name, user1.age, user1.email);
}
```
### 4.1.3 结构体方法
你还可以为结构体定义方法：
```rust
impl User {
    // 一个实例方法
    fn introduce(&self) {
        println!("Hi, my name is {} and I am {} years old. You can contact me at {}.", self.name, self.age, self.email);
    }

    // 一个关联函数
    fn new(name: String, age: u32, email: String) -> User {
        User { name, age, email }
    }
}

fn main() {
    let user1 = User::new(String::from("Alice"), 30, String::from("alice@example.com"));
    user1.introduce();
}
```
### 4.1.4 使用结构体的场景
结构体在组织和管理复杂数据时非常有用，常用于创建配置对象、处理 JSON 数据等场景。
```
classDiagram
class User {
  +name: String
  +age: u32
  +email: String
  +new(name: String, age: u32, email: String) -> User
  +introduce(&self)
}
```
## 4.2 定义和使用枚举
枚举（Enum）允许你定义一个类型，它的值可以是几个不同的变体之一。每个变体可以有不同的数据类型。
### 4.2.1 枚举定义
我们先来看一个简单的枚举定义：
```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```
### 4.2.2 使用枚举
你可以这样使用枚举：
```rust
fn main() {
    let msg1 = Message::Quit;
    let msg2 = Message::Move { x: 10, y: 20 };
    let msg3 = Message::Write(String::from("Hello"));
    let msg4 = Message::ChangeColor(255, 255, 255);

    match msg4 {
        Message::Quit => println!("Quit"),
        Message::Move { x, y } => println!("Move to x: {}, y: {}", x, y),
        Message::Write(text) => println!("Message: {}", text),
        Message::ChangeColor(r, g, b) => println!("Change color to red: {}, green: {}, blue: {}", r, g, b),
    }
}
```
### 4.2.3 使用枚举的场景
枚举在处理状态机、网络协议解析等场景中非常有用。
## 4.3 动态数组 Vec 和哈希表 HashMap
集合类型在处理动态和不确定数量的数据时非常有用。Rust 提供了强大的集合类型如 `Vec` 和 `HashMap`。
### 4.3.1 动态数组 Vec
`Vec` 是一个动态数组，它可以根据需要动态扩展和缩小。
```rust
fn main() {
    let mut v: Vec<i32> = Vec::new();
    v.push(1);
    v.push(2);
    v.push(3);

    for i in &v {
        println!("{}", i);
    }

    // 通过索引访问
    let third: i32 = v[2];
    println!("The third element is {}", third);

    // 通过 get 方法访问
    match v.get(2) {
        Some(third) => println!("The third element is {}", third),
        None => println!("There is no third element."),
    }
}
```
### 4.3.2 哈希表 HashMap
`HashMap` 是一个键值对集合，适用于需要通过键快速查找值的场景。
```rust
use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    let team_name = String::from("Blue");
    let score = scores.get(&team_name);

    match score {
        Some(score) => println!("The score for {} is {}", team_name, score),
        None => println!("No score found for {}", team_name),
    }

    // 遍历 HashMap
    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }
}
```
### 4.3.3 使用集合类型的场景
集合类型在处理动态数据、数据聚合和查找操作中非常有用，常用于实现缓存、集合操作、统计计算等场景。
```
graph LR
A[起点] --> B[动态数组 Vec]
B --> C[添加元素]
C --> D[遍历元素]
A --> E[哈希表 HashMap]
E --> F[插入键值对]
F --> G[查找值]
F --> H[遍历键值对]
```
本章节介绍了结构体、枚举和集合类型的定义和使用方法，这些基础知识将为你在 Rust 编程中的数据组织和操作提供有力支持。通过实践，你会发现这些特性在构建复杂应用时非常实用。
