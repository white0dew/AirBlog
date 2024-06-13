---
title: 第六章：异步编程
urlname: xwdzodwra6u55sib
date: '2024-06-07 10:37:26'
updated: '2024-06-07 10:37:39'
description: 1. 回调函数在 JavaScript 中，异步编程是处理时间消耗任务（如网络请求、文件读取等）的核心技术之一。回调函数是处理异步操作的最基本方式。什么是回调函数回调函数是作为参数传递给另一个函数的函数，当那个函数完成其任务后会调用这个回调函数。此模式常用于处理异步操作。以下是一个基本示例：f...
---
## 1. 回调函数

在 JavaScript 中，异步编程是处理时间消耗任务（如网络请求、文件读取等）的核心技术之一。回调函数是处理异步操作的最基本方式。

### 什么是回调函数

回调函数是作为参数传递给另一个函数的函数，当那个函数完成其任务后会调用这个回调函数。此模式常用于处理异步操作。以下是一个基本示例：

```javascript
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// 使用回调函数加载脚本
loadScript("path/to/script.js", (error, script) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`${script.src} has been loaded successfully.`);
  }
});
```

### 使用回调函数处理异步操作

回调函数非常有用，但当多个异步操作需要串行执行时，回调函数会导致**回调地狱**问题。以下是多个异步操作的示例：

```javascript
loadScript("script1.js", (error, script1) => {
  if (error) {
    console.error(error);
  } else {
    loadScript("script2.js", (error, script2) => {
      if (error) {
        console.error(error);
      } else {
        loadScript("script3.js", (error, script3) => {
          if (error) {
            console.error(error);
          } else {
            console.log("All scripts loaded successfully");
          }
        });
      }
    });
  }
});
```

## 2. Promise

### Promise 的基本概念

Promise 是异步编程的一种解决方案，它比传统的回调函数和事件更优雅。Promise 可以使异步代码看起来像同步代码，避免了回调地狱。

### 创建与使用 Promise

Promise 构造函数接受一个回调函数，该回调函数有两个参数：`resolve` 和 `reject`。调用 `resolve` 表示成功，调用 `reject` 表示失败。例如：

```javascript
let promise = new Promise((resolve, reject) => {
  // 异步操作代码
  setTimeout(() => {
    resolve("Success!");
  }, 1000);
});

// 使用 .then 和 .catch 处理 Promise
promise
  .then((message) => {
    console.log(message); // 'Success!'
  })
  .catch((error) => {
    console.error(error);
  });
```

### Promise 链与错误处理

Promise 支持链式调用，通过 `.then()` 可以将多个异步操作串联起来。每个 `.then()` 都返回一个新的 Promise，因此可以继续调用 `.then()` 或 `.catch()` 进行错误处理。例如：

```javascript
loadScript("script1.js")
  .then((script1) => {
    console.log(`${script1.src} loaded`);
    return loadScript("script2.js");
  })
  .then((script2) => {
    console.log(`${script2.src} loaded`);
    return loadScript("script3.js");
  })
  .then((script3) => {
    console.log("All scripts loaded successfully");
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });
```

## 3. async/await

### async/await 的基本概念

`async` 和 `await` 是基于 Promise 的语法糖，使得异步代码看起来像同步代码，从而简化异步操作。`async` 函数总是返回一个 Promise，`await` 只能在 `async` 函数中使用。

### 使用 async/await 简化异步代码

下面是一个使用 `async/await` 简化后的异步操作示例：

```javascript
async function loadAllScripts() {
  try {
    let script1 = await loadScript("script1.js");
    console.log(`${script1.src} loaded`);

    let script2 = await loadScript("script2.js");
    console.log(`${script2.src} loaded`);

    let script3 = await loadScript("script3.js");
    console.log("All scripts loaded successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

loadAllScripts();
```

### 错误处理与同步风格

在 `async/await` 中，可以使用 `try...catch` 来处理错误，这种方式类似于同步代码中的错误处理：

```javascript
async function loadScriptWithErrorHandling(src) {
  try {
    let script = await loadScript(src);
    console.log(`${script.src} loaded successfully`);
    return script;
  } catch (error) {
    console.error(`Error loading script: ${error.message}`);
  }
}

loadScriptWithErrorHandling("script1.js");
```

通过 `async/await`，我们可以编写出更加清晰、易读的异步代码，大大提高了代码的可维护性。

---

【本章节完毕】

希望你能从本章中理解和掌握回调函数、Promise，以及 `async/await` 的使用方法和异步编程的技巧。接下来，我们将进入更加实战和高级的部分，了解如何操作 DOM 和处理浏览器事件。
