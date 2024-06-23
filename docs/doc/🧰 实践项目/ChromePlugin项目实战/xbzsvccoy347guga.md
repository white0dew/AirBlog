---
title: 12、国际化支持
urlname: xbzsvccoy347guga
date: '2024-06-15 21:25:25'
updated: '2024-06-21 17:05:03'
description: 本章节详细介绍如何在Chrome插件中添加国际化支持，通过编写国际化文件和示例演示，掌握多语言插件开发的基础知识和技术实现。
keywords: 'Chrome插件, 国际化支持, 多语言开发, messages.json, 插件国际化'
---
本章节将详细介绍如何在 Chrome 插件中添加国际化支持，以便让插件适应不同语言环境中的用户需求。我们将通过编写国际化文件，并以中文和英文为例进行演示。通过本章的学习，您将掌握国际化插件开发的基础知识和技术实现。
## 1. 引言

国际化（Internationalization, i18n）是指为软件应用提供多语言支持，从而使其能够在不同地区、不同语言环境中良好运作。在开发 Chrome 插件时，添加国际化支持可以显著提升用户体验，使插件更具普适性。

## 2. 添加多语言支持

### 2.1 创建国际化目录和文件

首先，我们需要在项目根目录下创建一个名为 `_locales` 的文件夹。该文件夹将包含不同语言的子文件夹，每个子文件夹中都有一个 `messages.json` 文件，用于存放该语言的翻译内容。

```
project_root/
│
├── _locales/
│   ├── en/
│   │   └── messages.json
│   └── zh/
│       └── messages.json
├── manifest.json
├── popup.html
├── popup.js
├── content.js
└── background.js
```

### 2.2 编写 `messages.json` 文件

`messages.json` 文件用来存储插件界面中使用的所有文本。每个文本项都有一个唯一的标识符（message ID），以及对应的翻译内容。

#### 英文版本 `messages.json`

文件路径：`_locales/en/messages.json`

```json
{
  "appName": {
    "message": "Translation and Dictionary Plugin",
    "description": "Name of the extension"
  },
  "appDescription": {
    "message": "A Chrome extension to translate text and look up dictionary definitions.",
    "description": "Description of the extension"
  },
  "translateButton": {
    "message": "Translate",
    "description": "Button text for translating selected text"
  },
  "dictionaryButton": {
    "message": "Dictionary",
    "description": "Button text for looking up dictionary definitions"
  }
}
```

#### 中文版本 `messages.json`

文件路径：`_locales/zh/messages.json`

```json
{
  "appName": {
    "message": "翻译和词典插件",
    "description": "扩展程序的名称"
  },
  "appDescription": {
    "message": "一个用于翻译文本和查词的 Chrome 扩展程序。",
    "description": "扩展程序的描述"
  },
  "translateButton": {
    "message": "翻译",
    "description": "翻译选中文本的按钮文字"
  },
  "dictionaryButton": {
    "message": "词典",
    "description": "查词定义的按钮文字"
  }
}
```

## 3. 修改 `manifest.json` 文件

在 `manifest.json` 中，我们需要声明插件的默认语言。该设置将告知 Chrome 在找不到特定语言文件时，使用哪种语言作为默认语言。

```json
{
  "manifest_version": 3,
  "name": "__MSG_appName__",
  "description": "__MSG_appDescription__",
  "version": "1.0",
  "default_locale": "en",
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html"
  },
  "permissions": ["storage", "activeTab"]
}
```

在 `name` 和 `description` 字段中，我们使用了 `__MSG_` 前缀加上对应的 message ID。这种方式告诉 Chrome 使用 `messages.json` 文件中的翻译内容来替换这些字段。

## 4. 在 HTML 中使用国际化内容

在 `popup.html` 文件中，我们同样可以使用国际化内容。需要在 HTML 标签的 `data-i18n` 属性中指定 message ID，然后在 JavaScript 中进行替换。

### 4.1 更新 `popup.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title><span data-i18n="appName"></span></title>
    <style>
      /* 样式省略 */
    </style>
  </head>
  <body>
    <h1><span data-i18n="appName"></span></h1>
    <p><span data-i18n="appDescription"></span></p>
    <button id="translateButton" data-i18n="translateButton"></button>
    <button id="dictionaryButton" data-i18n="dictionaryButton"></button>

    <script src="popup.js"></script>
  </body>
</html>
```

### 4.2 更新 `popup.js`

在 `popup.js` 中，我们编写一个函数来替换 HTML 标签中的 `data-i18n` 属性内容。

```javascript
document.addEventListener("DOMContentLoaded", () => {
  function updateI18nTexts() {
    document.querySelectorAll("[data-i18n]").forEach((elem) => {
      const messageId = elem.getAttribute("data-i18n");
      elem.textContent = chrome.i18n.getMessage(messageId);
    });
  }

  updateI18nTexts();
});
```

## 5. 示例：添加中文和英文支持

现在，我们已经完成了多语言支持的配置和实现。您可以将 Chrome 插件加载到浏览器中，切换浏览器的语言设置，并看到插件界面文本根据语言的不同进行相应的切换。

### 5.1 测试中文支持

1. 打开 Chrome 浏览器，进入设置界面。
2. 向下滚动，找到“语言”设置。
3. 添加中文，并将其设置为首选语言。
4. 重新加载插件，您将看到插件界面文本变为中文。

### 5.2 测试英文支持

1. 同样在 Chrome 的语言设置中，添加英文并将其设置为首选语言。
2. 重新加载插件，您将看到插件界面文本变为英文。

通过本章节的学习，你已经掌握了如何为 Chrome 插件添加国际化支持的基本方法。这不仅提升了插件的用户体验，也为插件在全球范围内的推广打下了基础。

国际化支持的实现过程包括创建 `_locales` 目录和 `messages.json` 文件，更新 `manifest.json` 文件，以及在 HTML 和 JavaScript 代码中使用国际化内容。
