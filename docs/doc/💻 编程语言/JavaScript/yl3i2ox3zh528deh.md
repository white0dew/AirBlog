---
title: 第四章：函数与作用域
urlname: yl3i2ox3zh528deh
date: '2024-06-07 10:34:29'
updated: '2024-06-07 10:34:52'
description: 在这一章中，我们将深入探讨 JavaScript 中函数的各个方面，包括函数的定义与调用、参数与返回值、箭头函数与匿名函数。此外，我们还会探讨作用域的概念，以及如何利用闭包来创建更强大的代码。最后，我们将介绍高阶函数及其在简化代码方面的应用。1. 函数1.1 函数的定义与调用在 JavaScr...
---
在这一章中，我们将深入探讨 JavaScript 中函数的各个方面，包括函数的定义与调用、参数与返回值、箭头函数与匿名函数。此外，我们还会探讨作用域的概念，以及如何利用闭包来创建更强大的代码。最后，我们将介绍高阶函数及其在简化代码方面的应用。

## 1. 函数

### 1.1 函数的定义与调用

在 JavaScript 中，函数是通过 `function` 关键字定义的。以下是一个简单的例子：

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

在上面的代码中，我们定义了一个名为 `greet` 的函数，它接受一个参数 `name`，并在控制台输出一条问候语。要调用这个函数，只需传入一个参数：

```javascript
greet("Alice"); //输出: Hello, Alice!
```

### 1.2 函数参数与返回值

函数可以接受多个参数，并且可以返回一个值。下面是一个计算两个数之和的例子：

```javascript
function add(a, b) {
  return a + b;
}
```

调用 `add` 函数并传递两个参数：

```javascript
let result = add(3, 5);
console.log(result); //输出: 8
```

### 1.3 箭头函数与匿名函数

ES6 引入了箭头函数，使得函数表达更加简洁。箭头函数没有自己的 `this`，这使它们在某些情况下非常有用。以下是一个使用箭头函数的例子：

```javascript
const multiply = (a, b) => a * b;
```

与普通函数不同，箭头函数更适合用于简短的函数表达式。匿名函数则是没有名称的函数，通常作为参数传递给其他函数或立即执行：

```javascript
setTimeout(function () {
  console.log("Hello, after 2 seconds");
}, 2000);
```

## 2. 作用域

### 2.1 作用域的基本概念

作用域决定了变量和函数的可访问性。JavaScript 中有两种主要的作用域：全局作用域和局部作用域。

### 2.2 全局作用域与局部作用域

在全局作用域中声明的变量或函数可以在代码的任何地方访问：

```javascript
let globalVar = "I am global";

function showGlobalVar() {
  console.log(globalVar);
}

showGlobalVar(); //输出: I am global
```

局部作用域是指在函数内部声明的变量或函数，它们只能在该函数内部访问：

```javascript
function showLocalVar() {
  let localVar = "I am local";
  console.log(localVar);
}

showLocalVar(); //输出: I am local
// console.log(localVar); //错误: localVar is not defined
```

### 2.3 闭包的概念与应用

闭包是指函数可以记住并访问其词法作用域，即使该函数在其词法作用域之外执行。闭包在 JavaScript 中非常有用，尤其是在实现数据隐藏和模块模式时。以下是一个例子：

```javascript
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); //输出: 1
console.log(counter()); //输出: 2
console.log(counter()); //输出: 3
```

在这个例子中，`counter` 函数始终可以访问 `createCounter` 函数中的 `count` 变量，即使 `createCounter` 函数已经执行完毕。

## 3. 高阶函数

### 3.1 什么是高阶函数

高阶函数是指接受函数作为参数或返回另一个函数的函数。它们在函数式编程中非常重要。

### 3.2 常见高阶函数示例

常见的高阶函数包括 `map`、`filter` 和 `reduce`。下面是一些例子：

- `map`：对数组中的每个元素进行操作，并返回一个新数组。

```javascript
let numbers = [1, 2, 3, 4];
let doubled = numbers.map((n) => n * 2);
console.log(doubled); //输出: [2, 4, 6, 8]
```

- `filter`：筛选符合条件的元素，并返回一个新数组。

```javascript
let evenNumbers = numbers.filter((n) => n % 2 === 0);
console.log(evenNumbers); //输出: [2, 4]
```

- `reduce`：将数组中的所有元素归约为一个单一的值。

```javascript
let sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); //输出: 10
```

### 3.3 使用高阶函数简化代码

高阶函数能让代码更简洁、更易读。例如，使用 `map`、`filter` 和 `reduce` 可以替代传统的 `for` 循环：

```javascript
let numbers = [1, 2, 3, 4];
let result = numbers
  .filter((n) => n % 2 === 0)
  .map((n) => n * 2)
  .reduce((acc, curr) => acc + curr, 0);

console.log(result); //输出: 12
```

### 4. 图解函数与作用域

为了更好地理解函数与作用域的概念，下面是一个用 Mermaid 语法绘制的图解。


## 小结

函数是 JavaScript 中的核心组成部分，理解函数的定义与调用、参数与返回值、箭头函数与匿名函数能大大提升你的编程能力。作用域决定了变量和函数的可访问性，闭包则提供了一种在函数外部访问函数内部变量的强大机制。高阶函数使得代码更加简洁和易于维护。通过这章的学习，你将掌握这些重要概念，为后续更复杂的编程任务打下坚实的基础。

