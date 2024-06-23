---
title: 第 1 章：初识 Rust
urlname: rort768t73lz7op0
date: '2024-06-20 19:17:42'
updated: '2024-06-20 19:19:26'
description: '本章介绍了Rust的基本概念及其应用领域，解释了为什么选择Rust，指导用户搭建第一个Rust开发环境，并编写第一个Rust程序“Hello, World!”。'
keywords: 'Rust入门, Rust基础, Rust编程, Rust开发环境, Rust Hello World'
---
## 什么是 Rust 以及它的应用领域
Rust 是一种系统编程语言，主要用于性能和安全性要求极高的场景。它由 Mozilla Research 开发，目的是成为“安全、并发、可实践”的替代品。Rust 的设计目标是确保内存安全和并行编程的安全性，避免了常见的内存访问错误，如空指针引用和数据竞争。
### Rust 的应用领域

- **系统编程**：操作系统、驱动程序、嵌入式系统等。
- **网络编程**：高性能服务器、网络库等。
- **WebAssembly**：高效的前端开发。
- **区块链**：智能合约、区块链节点等。
- **游戏开发**：性能要求高的游戏引擎。

Rust 已经被广泛应用于实际项目中，如 Firefox 浏览器的 Servo 引擎、Dropbox 的文件存储系统和 Cloudflare 的 CDN 服务。
## 为什么选择学习 Rust
选择 Rust 有以下几个原因：

1. **内存安全**: Rust 的所有权系统消除了内存泄漏和数据竞争等问题。
2. **高性能**: Rust 的性能与 C 和 C++ 相当，但没有它们的安全隐患。
3. **并发编程**: Rust 的并发模型使得编写线程安全的代码变得简单。
4. **活跃的社区**: Rust 社区非常活跃，提供了大量的学习资源和开源库。
5. **未来前景**: 随着 WebAssembly 和其他高性能计算的普及，Rust 的应用前景广阔。
## 搭建你的第一个 Rust 开发环境
### 安装 Rust
Rust 团队提供了一种简单的安装工具 `rustup`，它可以在各个平台上快速安装 Rust。

1. 打开终端。
2. 输入以下命令安装 `rustup`：
```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

3. 安装完成后，运行以下命令来确保 Rust 正确安装：
```shell
rustc --version
```
你应该会看到类似如下的输出：
```shell
rustc 1.53.0 (53cb7b09b 2021-06-17)
```
### 配置环境变量
确保 Rust 的 bin 目录添加到系统的 PATH 中。`rustup` 安装完成后，通常会自动进行配置。如果需要手动配置，可以根据操作系统执行相应命令：

- **Linux/macOS**:
```shell
export PATH="$HOME/.cargo/bin:$PATH"
```

- **Windows**:通过 "系统属性" -> "高级系统设置" -> "环境变量"，在 "用户变量" 或 "系统变量" 中添加 `C:\Users\你的用户名\.cargo\bin`。
### 验证安装
再次运行以下命令以验证 Rust 是否已正确安装：
```shell
rustc --version
```
如果 Rust 安装成功，你将看到 Rust 的版本号。
## 你的第一个 Rust 程序："Hello, World!"
接下来，我们将编写一个简单的 Rust 程序来验证我们的开发环境。
### 创建项目目录
首先，创建一个新的目录来存放我们的项目文件：
```shell
mkdir hello_rust
cd hello_rust
```
### 编写代码
在项目目录下，创建一个名为 `main.rs` 的文件，并写入以下代码：
```rust
fn main() {
    println!("Hello, World!");
}
```
### 编译和运行
打开终端，导航到项目目录，然后编译并运行程序：
```shell
rustc main.rs
./main
```
你应该会看到以下输出：
```shell
Hello, World!
```
恭喜你！你已经成功编写并运行了你的第一个 Rust 程序。这是一个简单但重要的起点，为你开启了 Rust 编程之旅的大门。
通过这一章的学习，你应该对 Rust 有了初步的了解，并且成功搭建了自己的开发环境。接下来，我们将深入学习 Rust 的基本语法和核心概念，为以后的高级主题打下坚实的基础。
