---
title: 4、网页交互
urlname: hoxdx3meswbbhpff
date: '2024-06-15 21:22:08'
updated: '2024-06-15 21:26:43'
description: 在本章中，我们将深入探讨如何使用 Chrome 扩展中的内容脚本与网页进行交互。内容脚本是 Chrome 扩展中的一个重要部分，它能够访问和操作网页的 DOM（Document Object Model）。通过内容脚本，我们可以获取网页的选中内容并进行处理，为接下来的翻译和词典功能打下基础。添...
---
在本章中，我们将深入探讨如何使用 Chrome 扩展中的内容脚本与网页进行交互。内容脚本是 Chrome 扩展中的一个重要部分，它能够访问和操作网页的 DOM（Document Object Model）。通过内容脚本，我们可以获取网页的选中内容并进行处理，为接下来的翻译和词典功能打下基础。

## 添加内容脚本`content.js`

首先，我们需要在项目结构中添加一个新的 JavaScript 文件`content.js`，它将作为我们内容脚本的入口。我们需要在`manifest.json`中注册这个脚本，以便 Chrome 能够识别并加载它。

### 修改`manifest.json`

在`manifest.json`中添加以下内容：

```json
{
  "name": "翻译和词典插件",
  "version": "1.0",
  "description": "一个用于翻译和查词的Chrome插件",
  "manifest_version": 3,
  "permissions": ["activeTab", "storage"],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "images/icon16.png",
      "48": "images/icon48.png",
      "128": "images/icon128.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

在这里，我们通过`content_scripts`字段声明了内容脚本`content.js`，并允许它在所有网页上运行。

## 操作网页的 DOM

一旦内容脚本被加载到网页中，我们可以使用标准的 JavaScript 方法来操作网页的 DOM。以下是一个简单的例子，展示如何在页面上添加一个新的元素，并在用户点击时显示一个消息框。

### 编写`content.js`

```javascript
// content.js
(function () {
  // 在页面上创建一个新的 div 元素
  const newDiv = document.createElement("div");
  newDiv.style.position = "fixed";
  newDiv.style.bottom = "10px";
  newDiv.style.right = "10px";
  newDiv.style.padding = "10px";
  newDiv.style.backgroundColor = "yellow";
  newDiv.textContent = "点击我获取选中内容";

  // 将新元素添加到 body
  document.body.appendChild(newDiv);

  // 添加事件监听器，当用户点击时弹出消息框
  newDiv.addEventListener("click", () => {
    alert("您点击了插件按钮！");
  });
})();
```

在这个示例中，我们创建了一个新的`div`元素，并将它固定在页面的右下角。当用户点击这个`div`时，会弹出一个消息框提示。

## 获取选中内容的示例

在实际的翻译和词典功能中，我们需要获取用户在网页上选中的文本内容。以下是一个示例，展示如何获取选中的文本并在控制台中输出。

### 修改`content.js`

```javascript
// content.js
(function () {
  // 在页面上创建一个新的 div 元素
  const newDiv = document.createElement("div");
  newDiv.style.position = "fixed";
  newDiv.style.bottom = "10px";
  newDiv.style.right = "10px";
  newDiv.style.padding = "10px";
  newDiv.style.backgroundColor = "yellow";
  newDiv.textContent = "点击我获取选中内容";

  // 将新元素添加到 body
  document.body.appendChild(newDiv);

  // 添加事件监听器，当用户点击时获取选中的文本
  newDiv.addEventListener("click", () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      console.log("选中的文本内容：", selectedText);
    } else {
      alert("请先选中一些文本内容！");
    }
  });
})();
```

在这个示例中，当用户点击按钮时，脚本会检查当前是否有选中的文本。如果有选中的文本，脚本会在控制台中输出选中的内容；否则，会弹出一个消息框提示用户先选中一些文本内容。

通过本章的学习，我们掌握了如何在 Chrome 扩展中使用内容脚本与网页进行交互。我们学习了如何添加和注册内容脚本，如何操作网页的 DOM，以及如何获取用户选中的文本内容。这些技能是实现翻译和词典功能的基础。在接下来的章节中，我们将探讨如何实现内容脚本与背景脚本之间的消息传递机制。

