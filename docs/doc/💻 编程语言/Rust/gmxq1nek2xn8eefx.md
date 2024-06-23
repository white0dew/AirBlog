---
title: 第 14 章：Rust 和其他语言的交互
urlname: gmxq1nek2xn8eefx
date: '2024-06-20 19:54:07'
updated: '2024-06-23 21:01:27'
description: 'keywords: Rust, 交互, C 语言, Python, Node.js, WebAssembly在现代软件开发中，语言间的互操作性变得越来越重要。Rust 以其安全性、高性能和并发性著称，但在某些情况下，我们仍需要与其他编程语言进行交互。本章将详细探讨 Rust 如何与 C 语言、...'
keywords: 'Rust, 交互, C 语言, Python, Node.js, WebAssembly'
---
在现代软件开发中，语言间的互操作性变得越来越重要。Rust 以其安全性、高性能和并发性著称，但在某些情况下，我们仍需要与其他编程语言进行交互。本章将详细探讨 Rust 如何与 C 语言、Python、Node.js 和 Java 进行交互，以及如何利用 Rust 和 WebAssembly 开发高效的 Web 应用。
## 与 C 语言交互
Rust 提供了强大的 FFI（Foreign Function Interface），使得与 C 语言的交互变得相对简单。我们可以用 Rust 调用 C 函数，也可以用 C 语言调用 Rust 函数。
### 调用 C 函数
首先，让我们来看一个简单的例子，演示如何在 Rust 中调用 C 语言函数。假设我们有一个 C 的共享库 `mathlib`，其中提供了一个函数 `add`：
```c
// mathlib.c
#include <stdio.h>

int add(int a, int b) {
    return a + b;
}
```
接下来，我们需要用 `bindgen` 工具生成 Rust 的绑定：
```bash
$ bindgen mathlib.h -o src/bindings.rs
```
生成的 `bindings.rs` 文件如下：
```rust
// bindings.rs
#[link(name = "mathlib")]
extern "C" {
    pub fn add(a: i32, b: i32) -> i32;
}
```
然后，我们可以在 Rust 中调用这个 `add` 函数：
```rust
// main.rs
mod bindings;

fn main() {
    unsafe {
        let result = bindings::add(5, 3);
        println!("The result of adding 5 and 3 is: {}", result);
    }
}
```
### 调用 Rust 函数
同样地，我们也可以从 C 语言调用 Rust 函数。首先，我们定义一个 Rust 函数：
```rust
// lib.rs
#[no_mangle]
pub extern "C" fn multiply(a: i32, b: i32) -> i32 {
    a * b
}
```
然后，在 C 程序中，我们可以调用这个 Rust 函数：
```c
// main.c
#include <stdio.h>

extern int multiply(int a, int b);

int main() {
    int result = multiply(4, 2);
    printf("The result of multiplying 4 and 2 is: %d\n", result);
    return 0;
}
```
## 与 Python 交互
为了在 Python 中使用 Rust 代码，我们可以利用 `PyO3` 库。`PyO3` 是一个使得 Rust 与 Python 互操作的库。
### 使用 `PyO3` 创建 Python 模块
首先，我们需要添加 PyO3 依赖：
```toml
# Cargo.toml
[dependencies]
pyo3 = { version = "0.15", features = ["extension-module"] }
```
接下来，我们可以编写 Rust 代码以创建一个 Python 扩展模块：
```rust
// lib.rs
use pyo3::prelude::*;

#[pyfunction]
fn sum_as_string(a: i32, b: i32) -> PyResult<String> {
    Ok((a + b).to_string())
}

#[pymodule]
fn rust_extension(py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(sum_as_string, m)?)?;
    Ok(())
}
```
然后，我们需要创建一个 `setup.py` 文件以便构建这个 Python 模块：
```python
# setup.py
from setuptools import setup
from setuptools_rust import RustExtension

setup(
    name="rust_extension",
    version="0.1",
    rust_extensions=[RustExtension("rust_extension.rust_extension", "Cargo.toml", binding="pyo3")],
    packages=["rust_extension"],
    zip_safe=False,
)
```
最后，运行以下命令以构建并安装这个模块：
```bash
$ python setup.py install
```
现在，我们可以在 Python 中使用这个模块：
```python
import rust_extension

result = rust_extension.sum_as_string(5, 7)
print(f"The result is: {result}")
```
## 与 Node.js 交互
为了在 Node.js 中使用 Rust 代码，我们可以利用 `neon` 库。`neon` 是一个用于编写 Node.js 原生模块的库。
### 使用 `neon` 创建 Node.js 模块
首先，安装 `neon` CLI 工具：
```bash
$ npm install -g neon-cli
```
然后，初始化一个新的 Neon 项目：
```bash
$ neon new my-project
$ cd my-project
```
在生成的项目中，我们可以编写 Rust 代码以创建一个 Node.js 扩展模块：
```rust
// src/lib.rs
use neon::prelude::*;

fn add(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let a = cx.argument::<JsNumber>(0)?.value(&mut cx);
    let b = cx.argument::<JsNumber>(1)?.value(&mut cx);
    Ok(cx.number(a + b))
}

register_module!(mut cx, {
    cx.export_function("add", add)
})
```
然后，运行以下命令以构建并安装这个模块：
```bash
$ neon build
```
现在，我们可以在 Node.js 中使用这个模块：
```javascript
const myAddon = require("./native");

console.log(myAddon.add(3, 4)); // 输出: 7
```
## 与 Java 交互
为了在 Java 中使用 Rust 代码，我们可以利用 JNI（Java Native Interface）。
### 使用 JNI 创建 Java 本地库
首先，我们需要在 Java 中声明一个本地方法：
```java
// Main.java
public class Main {
    static {
        System.loadLibrary("rustlib");
    }

    public native int multiply(int a, int b);

    public static void main(String[] args) {
        Main main = new Main();
        int result = main.multiply(4, 3);
        System.out.println("The result of multiplying 4 and 3 is: " + result);
    }
}
```
接下来，在 Rust 中实现这个本地方法：
```rust
// lib.rs
#[no_mangle]
pub extern "system" fn Java_Main_multiply(env: *mut JNIEnv, class: jclass, a: jint, b: jint) -> jint {
    a * b
}
```
然后，使用 `javac` 编译 Java 文件并生成 JNI 头文件：
```bash
$ javac Main.java
$ javah -jni Main
```
最后，使用 `cargo` 构建 Rust 库：
```bash
$ cargo build --release
```
确保将生成的 `.so` 文件放在正确的位置，然后运行 Java 程序：
```bash
$ java Main
```
## Rust 和 WebAssembly
最后，我们来看看如何将 Rust 编译成 WebAssembly，并在浏览器中使用它。WebAssembly 提供了一种高效的方式来运行 Rust 代码，并且与 JavaScript 互操作性良好。
### 编写和编译 WebAssembly
首先，我们需要安装 `wasm-pack` 工具：
```bash
$ cargo install wasm-pack
```
然后，创建一个新的 Rust 项目并添加 WebAssembly 支持：
```bash
$ cargo new --lib wasm_project
$ cd wasm_project
```
在 `Cargo.toml` 中，添加 WebAssembly 相关依赖：
```toml
[dependencies]
wasm-bindgen = "0.2"

[lib]
crate-type = ["cdylib"]
```
编写 Rust 代码以创建一个简单的 WebAssembly 模块：
```rust
// src/lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
```
然后，运行以下命令以编译 WebAssembly 模块：
```bash
$ wasm-pack build --target web
```
### 在浏览器中使用 WebAssembly
创建一个 HTML 文件来使用这个 WebAssembly 模块：
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Rust and WebAssembly</title>

    <script type="module">
      import init, { greet } from "./pkg/wasm_project.js";

      async function run() {
        await init();
        console.log(greet("World"));
      }

      run();
    </script>

  </head>

  <body></body>

</html>

```
然后，用浏览器打开这个 HTML 文件，你将看到控制台中输出 `Hello, World!`。
通过这些示例，我们看到 Rust 提供了丰富的工具和库，方便与其他编程语言进行交互，使得我们可以在不同的项目中充分利用 Rust 的优势。
