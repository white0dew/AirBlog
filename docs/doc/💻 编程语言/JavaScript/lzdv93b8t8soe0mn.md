---
title: 第一章：初识 JavaScript
urlname: lzdv93b8t8soe0mn
date: '2024-06-07 10:32:26'
updated: '2024-08-15 16:37:24'
description: JavaScript 是现代 Web 开发的核心技术之一，任何想要成为全栈开发者的人都必须掌握它。这一章将带你初步了解 JavaScript，从其历史、发展到应用领域，再到实际的环境搭建和第一个 JavaScript 程序编写。1. JavaScript 简介1.1 JavaScript 的历...
---
JavaScript 是现代 Web 开发的核心技术之一，任何想要成为全栈开发者的人都必须掌握它。
这一章将带你初步了解 JavaScript，从其历史、发展到应用领域，再到实际的环境搭建和第一个 JavaScript 程序编写。

## 1. JavaScript 简介

### 1.1 JavaScript 的历史与发展

JavaScript 诞生于 1995 年，由 Brendan Eich 在 Netscape Communications 公司开发。

最初，它被命名为 Mocha，后改为 LiveScript，最终命名为 JavaScript。JavaScript 迅速成为 Web 浏览器的标准编程语言，并在 1997 年被 ECMA（European Computer Manufacturers Association）标准化，称为 ECMAScript。

在过去的几十年里，JavaScript 进行了多次迭代和改进，从简单的脚本语言演变为强大的编程语言，支持面向对象编程、函数式编程和事件驱动编程等多种范式。

### 1.2 JavaScript 的应用领域

JavaScript 最初用于客户端编程，即在浏览器中运行。然而，随着技术的发展，JavaScript 的应用领域逐渐扩大，现在它在以下几个方面有广泛应用：

- **Web 开发**：主要用于创建交互式和动态的网页。
- **服务器端编程**：使用 Node.js，JavaScript 也可以在服务器端运行。
- **移动应用开发**：通过框架如 React Native，可以开发跨平台的移动应用。
- **桌面应用开发**：使用 Electron，可以创建跨平台的桌面应用。
- **游戏开发**：通过 HTML5 和 Canvas API，可以创建浏览器游戏。

### 1.3 为什么选择 JavaScript

选择 JavaScript 有几个重要原因：

- **简单易学**：JavaScript 语法相对简单，适合初学者学习。
- **广泛应用**：几乎所有的 Web 应用都使用 JavaScript。
- **强大的社区支持**：JavaScript 拥有庞大的开发者社区，丰富的资源和工具。
- **全栈开发**：通过 Node.js，JavaScript 可以在前端和后端同时使用，实现全栈开发。

## 2. 安装与设置

在开始编写 JavaScript 代码之前，我们需要设置开发环境。以下是一些基本的安装与配置步骤。

### 2.1 浏览器自带的 JavaScript 环境

所有现代浏览器都自带 JavaScript 引擎，这使得我们可以直接在浏览器中编写和运行 JavaScript 代码。常见的浏览器如 Google Chrome、Mozilla Firefox、Microsoft Edge 和 Safari 都支持 JavaScript。

打开浏览器的开发者工具（通常可以通过按 F12 或右键点击网页然后选择“检查”），在控制台（Console）中输入以下代码，按 Enter 键运行：

```javascript
console.log("Hello, World!");
```

你应该会看到控制台输出了 `Hello, World!` 这表示你的浏览器已经准备好运行 JavaScript 代码。

### 2.2 安装 Node.js

虽然浏览器可以运行 JavaScript，但为了在服务器端使用 JavaScript，我们需要安装 Node.js。Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时，可以让 JavaScript 在服务器端运行。

#### 安装步骤

1.  **下载 Node.js**：访问 [Node.js 官方网站](https://nodejs.org/)，选择合适的版本（LTS 版本推荐）下载并安装。 
2.  **验证安装**：安装完成后，打开命令行工具（如终端或命令提示符），输入以下命令验证安装是否成功： 
```bash
node -v
npm -v
```

这些命令会输出 Node.js 和 npm（Node Package Manager）的版本号，表示安装成功。 

### 2.3 配置开发环境

为了编写和调试 JavaScript 代码，我们需要一个代码编辑器。这里推荐使用 Visual Studio Code (VS Code)，它是一个流行的免费开源代码编辑器，支持多种编程语言和丰富的扩展。

#### 安装 VS Code

1. **下载 VS Code**：访问 [VS Code 官方网站](https://code.visualstudio.com/)，下载并安装适合你操作系统的版本。
2. **安装扩展**：打开 VS Code，点击左侧的扩展图标，然后搜索并安装以下常用扩展： 
   - **ESLint**：用于检查和修复 JavaScript 代码中的语法错误和风格问题。
   - **Prettier**：用于代码格式化，使代码风格统一。
   - **Debugger for Chrome**：用于在 VS Code 中调试 Chrome 浏览器中的代码。

## 3. 第一个 JavaScript 程序

### 3.1 编写 Hello, World 程序

在学习编程语言时，第一个编写的程序通常是 "Hello, World!"。让我们来编写一个简单的 JavaScript 程序，在浏览器中显示 "Hello, World!"。

#### 步骤

1. **创建文件**：打开 VS Code，创建一个新的文件 `index.html`。
2. **编写代码**：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
  </head>
  <body>
    <script>
      console.log("Hello, World!");
    </script>
  </body>
</html>
```

3. **运行程序**：在浏览器中打开 `index.html` 文件，打开开发者工具，在控制台中你会看到 `Hello, World!` 的输出。

### 3.2 在浏览器中运行 JavaScript

除了在 HTML 文件中嵌入 JavaScript 代码，我们还可以直接在浏览器的控制台中编写和运行 JavaScript 代码。这对于快速测试和调试非常有用。

#### 示例

打开浏览器的开发者工具，在控制台中输入以下代码并运行：

```javascript
alert("Hello, World!");
```

这会弹出一个包含 "Hello, World!" 的消息框。

### 3.3 基本的代码编辑与调试

在编写 JavaScript 代码时，调试是一个重要的环节。浏览器的开发者工具提供了强大的调试功能。

#### 设置断点

1. **打开开发者工具**：按 F12 或右键点击网页选择“检查”。
2. **切换到 Sources 面板**：找到并打开你的 JavaScript 文件。
3. **设置断点**：点击代码行号处，可以设置断点。执行到该行代码时，程序会暂停运行，方便你检查变量和代码执行情况。

#### 调试代码

1. **查看变量**：在调试过程中，你可以在 Scope 面板中查看当前变量的值。
2. **单步执行**：使用 Step Over、Step Into 和 Step Out 按钮逐行执行代码，方便你深入了解代码的执行过程。

通过这章的学习，你已经了解了 JavaScript 的基本概念和历史，安装了开发环境，并编写了第一个 JavaScript 程序。在接下来的章节中，我们将深入学习 JavaScript 语言的基础语法和更多实用的编程技巧。
