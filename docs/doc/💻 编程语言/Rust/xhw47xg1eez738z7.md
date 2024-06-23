---
title: 第 2 章：Rust 的基本语法
urlname: xhw47xg1eez738z7
date: '2024-06-20 19:19:32'
updated: '2024-06-20 19:20:44'
description: 本章讲解 Rust 的基本语法，包括变量和数据类型、运算符、条件表达式和循环，帮助读者理解和掌握 Rust 编程的基础知识。
keywords: '变量, 数据类型, 运算符, 条件表达式, 循环'
---
通过本章的学习，你将掌握 Rust 中的基本语法规则，为后续的学习打下坚实的基础。
## 变量和数据类型
在 Rust 中，变量的声明使用 `let` 关键字。默认情况下，Rust 的变量是不可变的（immutable）。如果需要声明一个可变变量，可以使用 `mut` 关键字。
```rust
fn main() {
    let x = 5; // 不可变变量
    let mut y = 10; // 可变变量

    println!("x 的值为: {}", x);
    println!("y 的值为: {}", y);

    y = 15;
    println!("修改后的 y 值为: {}", y);
}
```
Rust 是一种强类型语言，意味着每个变量都有固定的数据类型。常见的数据类型包括：

- **整数类型**：如 `i32`、`u32`，分别表示 32 位有符号和无符号整数。
- **浮点数类型**：如 `f32`、`f64`，分别表示 32 位和 64 位浮点数。
- **布尔类型**：如 `bool`，表示布尔值（`true` 或 `false`）。
- **字符类型**：如 `char`，表示单个 Unicode 字符。
- **元组类型**：如 `(i32, f64, char)`，可以包含不同类型的多个值。
```rust
fn main() {
    let a: i32 = 42;
    let b: f64 = 3.14;
    let c: bool = true;
    let d: char = 'R';
    let e: (i32, f64, char) = (42, 3.14, 'R');

    println!("a: {}, b: {}, c: {}, d: {}, e: {:?}", a, b, c, d, e);
}
```
## 运算符
Rust 支持常见的运算符，包括：

- **算术运算符**：`+`、`-`、`*`、`/`、`%`
- **比较运算符**：`==`、`!=`、`>`、`<`、`>=`、`<=`
- **逻辑运算符**：`&&`、`||`、`!`
- **位运算符**：`&`、`|`、`^`、`<<`、`>>`
```rust
fn main() {
    let a = 10;
    let b = 20;

    // 算术运算
    let sum = a + b;
    let diff = a - b;
    let product = a * b;
    let quotient = b / a;
    let remainder = b % a;

    println!("sum: {}, diff: {}, product: {}, quotient: {}, remainder: {}", sum, diff, product, quotient, remainder);

    // 比较运算
    println!("a == b: {}", a == b);
    println!("a != b: {}", a != b);
    println!("a > b: {}", a > b);
    println!("a < b: {}", a < b);

    // 逻辑运算
    println!("a < b && a > 5: {}", a < b && a > 5);
    println!("a < b || a > 30: {}", a < b || a > 30);
    println!("!true: {}", !true);
}
```
## 条件表达式和循环
### 条件表达式
Rust 中的条件表达式使用 `if` 关键字，语法与其他编程语言类似。Rust 也支持 `else if` 和 `else` 分支。
```rust
fn main() {
    let number = 15;

    if number % 3 == 0 {
        println!("{} 是 3 的倍数", number);
    } else if number % 2 == 0 {
        println!("{} 是偶数", number);
    } else {
        println!("{} 是奇数", number);
    }
}
```
### 循环
Rust 提供了三种主要的循环类型：`loop`、`while` 和 `for`。

- `loop`** 循环**：无限循环，直到内部使用 `break` 语句跳出。
```rust
fn main() {
    let mut counter = 0;

    loop {
        counter += 1;
        println!("计数器: {}", counter);

        if counter == 5 {
            break;
        }
    }
}
```

- `while`** 循环**：当条件为真时执行循环体。
```rust
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{}!", number);
        number -= 1;
    }

    println!("发射！");
}
```

- `for`** 循环**：迭代一个集合（例如数组或范围）。
```rust
fn main() {
    let array = [10, 20, 30, 40, 50];

    for element in array.iter() {
        println!("数组元素的值: {}", element);
    }

    for number in 1..5 {
        println!("范围内的值: {}", number);
    }
}
```
## 模式匹配
Rust 中的 `match` 表达式提供了一种强大且灵活的模式匹配机制，允许你根据不同的条件执行不同的代码块。
```rust
fn main() {
    let number = 1;

    match number {
        1 => println!("一"),
        2 => println!("二"),
        3 => println!("三"),
        _ => println!("其他"),
    }

    let optional_value: Option<i32> = Some(5);

    match optional_value {
        Some(value) => println!("有值: {}", value),
        None => println!("无值"),
    }
}
```
在上面的代码中，`match` 表达式根据 `number` 的值选择不同的分支执行。同时，`Option` 类型的匹配展示了如何处理可能为空的值。
```
graph TD
A[match表达式] --> B{模式1}
A --> C{模式2}
A --> D{模式3}
B --> E[执行代码1]
C --> F[执行代码2]
D --> G[执行代码3]
```

本章详细讲解了 Rust 的基础语法，包括变量和数据类型、运算符、条件表达式、循环和模式匹配等内容。通过这些基础知识的掌握，你已经为后续学习 Rust 的高级特性打下了牢固的基础。
