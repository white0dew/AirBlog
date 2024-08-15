---
title: 第八章：浏览器 API 与本地存储
urlname: fkoyngxgpmgaeg44
date: '2024-06-07 10:37:53'
updated: '2024-08-15 16:41:58'
description: 1. 浏览器 API在现代 Web 开发中，浏览器为开发者提供了丰富的 API，用于处理各种任务，如网络请求、剪贴板操作等。本节将介绍一些常用的浏览器 API，并演示其使用方法。常用浏览器 API 介绍Fetch APIFetch API 用于执行网络请求，替代了老旧的 XMLHttpRequ...
---
## 1. 浏览器 API

在现代 Web 开发中，浏览器为开发者提供了丰富的 API，用于处理各种任务，如网络请求、剪贴板操作等。本节将介绍一些常用的浏览器 API，并演示其使用方法。

### 常用浏览器 API 介绍

#### Fetch API

`Fetch API` 用于执行网络请求，替代了老旧的 `XMLHttpRequest`。它的语法更简洁，支持 `Promise`，使异步代码更具可读性。

**示例代码：**

```javascript
// Fetch API 示例
fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
```

#### 操作剪贴板 API

剪贴板 API 允许 Web 应用程序读取或写入剪贴板内容，极大地提高了用户体验。例如，用户可以点击按钮将文本复制到剪贴板。

**示例代码：**

```javascript
// 复制文本到剪贴板
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
}

// 使用示例
copyToClipboard("Hello, world!");
```

## 2. 本地存储

现代浏览器提供了多种本地存储机制，用于在客户端存储数据，包括 `LocalStorage`、`SessionStorage` 和 `IndexedDB`。每种存储机制各有优缺点和适用场景。

### LocalStorage 的基本操作

`LocalStorage` 是一种持久化存储机制，数据不会过期，除非手动删除。它非常适用于存储用户设置等数据。

**示例代码：**

```javascript
// 设置数据
localStorage.setItem("username", "john_doe");

// 获取数据
const username = localStorage.getItem("username");
console.log(username); // 输出: john_doe

// 删除数据
localStorage.removeItem("username");

// 清空所有数据
localStorage.clear();
```

### SessionStorage 的基本操作

`SessionStorage` 类似于 `LocalStorage`，但数据只在页面会话期间有效，关闭标签页或浏览器后数据会被清除。

**示例代码：**

```javascript
// 设置数据
sessionStorage.setItem("session_id", "123456");

// 获取数据
const sessionId = sessionStorage.getItem("session_id");
console.log(sessionId); // 输出: 123456

// 删除数据
sessionStorage.removeItem("session_id");

// 清空所有数据
sessionStorage.clear();
```

### IndexedDB 的基本概念与使用

`IndexedDB` 是一种低级 API，用于在客户端存储大量结构化数据。它支持事务、索引和搜索，适用于需要存储大量数据的应用。

**示例代码：**

```javascript
// 打开数据库
const request = indexedDB.open("myDatabase", 1);

request.onsuccess = function (event) {
  const db = event.target.result;
  console.log("Database opened successfully");
};

request.onupgradeneeded = function (event) {
  const db = event.target.result;

  // 创建对象存储
  const objectStore = db.createObjectStore("users", { keyPath: "id" });

  // 创建索引
  objectStore.createIndex("name", "name", { unique: false });
};

request.onerror = function (event) {
  console.error("Database error:", event.target.errorCode);
};
```

## 3. 实战练习

通过本章所学知识，我们来实现一个简单的记事本应用，结合 `LocalStorage` 实现数据的持久化存储。

### 实现一个简单的记事本应用

我们的记事本应用需要以下功能：

1. 添加新记事
2. 显示所有记事
3. 删除记事

**HTML 结构：**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>记事本应用</title>
  </head>
  <body>
    <h1>记事本应用</h1>
    <input type="text" id="note-input" placeholder="输入记事内容" />
    <button onclick="addNote()">添加记事</button>
    <ul id="notes-list"></ul>

    <script src="app.js"></script>
  </body>
</html>
```

**JavaScript 代码：**

```javascript
// 获取 DOM 元素
const noteInput = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");

// 加载已保存的记事
document.addEventListener("DOMContentLoaded", loadNotes);

function addNote() {
  const noteText = noteInput.value.trim();
  if (noteText === "") return;

  // 创建记事对象
  const note = { id: Date.now(), text: noteText };

  // 保存记事到 LocalStorage
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));

  // 更新 UI
  appendNoteToDOM(note);
  noteInput.value = "";
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((note) => appendNoteToDOM(note));
}

function appendNoteToDOM(note) {
  const li = document.createElement("li");
  li.textContent = note.text;
  li.dataset.id = note.id;

  // 添加删除按钮
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "删除";
  deleteBtn.onclick = function () {
    deleteNote(note.id);
  };

  li.appendChild(deleteBtn);
  notesList.appendChild(li);
}

function deleteNote(id) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.filter((note) => note.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes));

  // 更新 UI
  const noteElement = document.querySelector(`li[data-id='${id}']`);
  notesList.removeChild(noteElement);
}
```

### 实现数据的持久化存储

通过以上代码，我们实现了一个简单的记事本应用，能够添加、显示和删除记事，并将数据持久化存储在 `LocalStorage` 中。这样，即使刷新页面或关闭浏览器，记事内容也能够保留。


本章介绍了常用的浏览器 API 和本地存储技术，包括 `Fetch API`、剪贴板 API、`LocalStorage`、`SessionStorage` 和 `IndexedDB`。通过这些知识，你可以开发出功能更丰富、用户体验更好的 Web 应用。
