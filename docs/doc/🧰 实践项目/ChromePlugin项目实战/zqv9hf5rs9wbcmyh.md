---
title: 5、消息传递机制
urlname: zqv9hf5rs9wbcmyh
date: '2024-06-15 21:22:35'
updated: '2024-06-15 21:22:52'
description: 在 Chrome 插件的开发过程中，消息传递机制是实现不同部分之间通信的关键。无论是从背景脚本到内容脚本，还是从 popup 界面到背景脚本，都需要建立有效的通信管道。本章将详细介绍如何实现这些通信机制。背景脚本与内容脚本通信1. 背景脚本background.js的编写背景脚本在 Chrom...
---
在 Chrome 插件的开发过程中，消息传递机制是实现不同部分之间通信的关键。无论是从背景脚本到内容脚本，还是从 popup 界面到背景脚本，都需要建立有效的通信管道。本章将详细介绍如何实现这些通信机制。

## 背景脚本与内容脚本通信

### 1. 背景脚本`background.js`的编写

背景脚本在 Chrome 插件的生命周期中始终保持运行状态，用于处理无法由内容脚本完成的任务。首先，我们需要在项目中创建 `background.js` 并添加到 `manifest.json` 文件中。

**background.js**

```javascript
// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log("插件已安装");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("收到消息: ", message);
  sendResponse({ status: "消息已收到" });
});
```

### 2. 更新`manifest.json`文件

确保在 `manifest.json` 中声明了 `background.js`。

**manifest.json**

```json
{
  "manifest_version": 3,
  "name": "翻译和词典插件",
  "version": "1.0",
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["activeTab", "scripting"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "images/icon-16.png",
      "48": "images/icon-48.png",
      "128": "images/icon-128.png"
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

## 处理短连接与长连接

### 短连接

短连接适用于简单的请求响应模式。例如，当用户点击某个按钮时，发送一个请求，获得响应后进行相应操作。

**popup.js**

```javascript
// popup.js

document.getElementById("sendMessage").addEventListener("click", () => {
  chrome.runtime.sendMessage({ greeting: "Hello" }, (response) => {
    console.log("收到响应:", response);
  });
});
```

### 长连接

长连接适用于需要持续通信的场景。我们可以使用 `chrome.runtime.connect` 和 `chrome.runtime.onConnect` 建立长连接。

**content.js**

```javascript
// content.js

const port = chrome.runtime.connect({ name: "knockknock" });
port.postMessage({ joke: "Knock knock" });

port.onMessage.addListener((msg) => {
  console.log("背景脚本响应: ", msg);
});
```

**background.js 的更新**

```javascript
// background.js

chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name === "knockknock");
  port.onMessage.addListener((msg) => {
    if (msg.joke === "Knock knock") {
      port.postMessage({ question: "Who's there?" });
    }
  });
});
```

## 实现选中文本的传递

接下来，我们将实现一个简单的功能：获取网页中用户选中的文本，并将其传递给背景脚本处理。

### 1. 添加选中文本获取功能

在 `content.js` 中添加以下代码，获取选中文本并发送给背景脚本。

**content.js**

```javascript
// content.js

document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    chrome.runtime.sendMessage({ text: selectedText }, (response) => {
      console.log("背景脚本响应:", response);
    });
  }
});
```

### 2. 背景脚本处理选中文本

在 `background.js` 中处理接收到的选中文本。

**background.js**

```javascript
// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.text) {
    console.log("选中文本:", message.text);
    // 这里可以进行进一步处理，例如调用 API 翻译文本
    sendResponse({ status: "文本已收到并处理" });
  }
});
```

通过以上步骤，我们成功实现了从内容脚本到背景脚本的消息传递，并处理了选中文本的传递。这种机制为插件的功能扩展提供了无限可能。

