---
title: 第七章：DOM 操作与事件处理
urlname: bbsxpgzzhu3i88xy
date: '2024-06-07 10:37:40'
updated: '2024-08-15 16:41:41'
cover: 'https://cdn.nlark.com/yuque/__mermaid_v3/15266c94d9ccd675f00027a43ab14bfe.svg'
description: 1. DOM 基本概念什么是 DOMDOM（Document Object Model）是 HTML 和 XML 文档的编程接口。它提供了一组标准的对象，使开发者能够动态访问和更新文档的内容、结构和样式。DOM 把文档表示为一个树结构，其中每个节点都是文档的一部分。DOM 树的结构DOM 树是...
---
## 1. DOM 基本概念

### 什么是 DOM

DOM（Document Object Model）是 HTML 和 XML 文档的编程接口。它提供了一组标准的对象，使开发者能够动态访问和更新文档的内容、结构和样式。DOM 把文档表示为一个树结构，其中每个节点都是文档的一部分。

### DOM 树的结构

DOM 树是层次化的结构，包含了文档的所有元素。树的每个节点都代表文档中的一部分，比如元素、属性或文本内容。

![](https://oss1.aistar.cool/elog-offer-now/f1b9a4ff67673a319fa7b9a96cb039d9.svg)
### 常用 DOM 操作方法

以下是一些常用的 DOM 操作方法：

- `getElementById(id)`: 根据元素的 ID 获取元素
- `querySelector(selector)`: 根据 CSS 选择器获取元素
- `createElement(tagName)`: 创建一个新的元素
- `appendChild(node)`: 将一个新的子节点添加到某个父节点中
- `removeChild(node)`: 从某个父节点中移除一个子节点

```javascript
// 获取元素
const element = document.getElementById("myElement");
const elementBySelector = document.querySelector(".myClass");

// 创建新元素
const newElement = document.createElement("div");
newElement.textContent = "Hello, World!";

// 添加新元素到 DOM
document.body.appendChild(newElement);

// 移除元素
document.body.removeChild(newElement);
```

## 2. 事件处理

### 事件的基本概念

事件是用户或浏览器执行的特定动作，比如点击按钮、加载页面或按下键盘。事件处理是指编写代码来响应这些事件。

### 添加与移除事件监听器

可以使用 `addEventListener` 方法为元素添加事件监听器，并使用 `removeEventListener` 方法移除事件监听器。

```javascript
// 获取元素
const button = document.getElementById("myButton");

// 事件处理函数
function handleClick() {
  alert("Button clicked!");
}

// 添加事件监听器
button.addEventListener("click", handleClick);

// 移除事件监听器
button.removeEventListener("click", handleClick);
```

### 事件冒泡与捕获

事件冒泡和捕获是事件传播的两个阶段。冒泡是指事件从目标元素开始向上传播到根元素，而捕获是指事件从根元素向下传播到目标元素。

```javascript
// 获取元素
const parent = document.getElementById("parent");
const child = document.getElementById("child");

// 添加事件监听器
parent.addEventListener(
  "click",
  () => {
    alert("Parent clicked!");
  },
  false
); // 冒泡阶段

child.addEventListener(
  "click",
  (event) => {
    alert("Child clicked!");
    event.stopPropagation(); // 阻止事件传播
  },
  false
); // 冒泡阶段
```

## 3. 实战练习

### 实现动态内容的添加与删除

通过 DOM 操作，可以实现动态添加和删除内容的功能。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dynamic Content</title>
  </head>
  <body>
    <div id="content"></div>
    <button id="addBtn">Add Content</button>
    <button id="removeBtn">Remove Content</button>

    <script>
      const contentDiv = document.getElementById("content");
      const addBtn = document.getElementById("addBtn");
      const removeBtn = document.getElementById("removeBtn");

      addBtn.addEventListener("click", () => {
        const newParagraph = document.createElement("p");
        newParagraph.textContent = "This is a new paragraph.";
        contentDiv.appendChild(newParagraph);
      });

      removeBtn.addEventListener("click", () => {
        if (contentDiv.lastChild) {
          contentDiv.removeChild(contentDiv.lastChild);
        }
      });
    </script>
  </body>
</html>
```

### 实现表单验证

通过事件处理，可以实现表单的实时验证。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Form Validation</title>
  </head>
  <body>
    <form id="myForm">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <span id="error" style="color: red; display: none;"
        >Invalid email address</span
      >
      <button type="submit">Submit</button>
    </form>

    <script>
      const form = document.getElementById("myForm");
      const emailInput = document.getElementById("email");
      const errorSpan = document.getElementById("error");

      emailInput.addEventListener("input", () => {
        if (emailInput.validity.valid) {
          errorSpan.style.display = "none";
        } else {
          errorSpan.style.display = "block";
        }
      });

      form.addEventListener("submit", (event) => {
        if (!emailInput.validity.valid) {
          event.preventDefault();
          errorSpan.style.display = "block";
        }
      });
    </script>
  </body>
</html>
```

通过以上内容的学习，你已经掌握了基本的 DOM 操作和事件处理方法。接下来可以通过实际项目练习更加深入地理解和应用这些知识。
