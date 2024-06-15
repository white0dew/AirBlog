---
title: 3、创建 Popup 界面
urlname: fhh99lgx1ihp1ykw
date: '2024-06-15 21:21:04'
updated: '2024-06-15 21:22:08'
description: 在本章中，我们将一步步创建 Chrome 插件的基础 Popup 界面。这部分是用户与插件进行交互的主要界面。我们会创建一个简单的 popup.html 文件，设计其样式和布局，然后编写 popup.js 来处理用户的点击事件。创建popup.html首先，我们需要在项目文件夹内创建一个新的 ...
---
在本章中，我们将一步步创建 Chrome 插件的基础 Popup 界面。这部分是用户与插件进行交互的主要界面。我们会创建一个简单的 `popup.html` 文件，设计其样式和布局，然后编写 `popup.js` 来处理用户的点击事件。

## 创建`popup.html`

首先，我们需要在项目文件夹内创建一个新的 HTML 文件，命名为 `popup.html`。这个文件将作为我们插件的 Popup 界面。以下是一个简单的 HTML 示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Translator & Dictionary Plugin</title>
    <link rel="stylesheet" href="popup.css">
</head>
<body>
    <h1>Translator & Dictionary</h1>
    <button id="translateBtn">Translate</button>
    <button id="dictionaryBtn">Dictionary</button>
    <div id="result"></div>
    <script src="popup.js"></script>
</body>
</html>
```

在上面的代码中，我们创建了一个基本的 HTML 结构，包括标题、两个按钮及一个用于显示结果的 `div` 元素。同时，我们链接了一个外部样式表 `popup.css` 以及一个 JavaScript 文件 `popup.js`。

## 设计`popup`的样式和布局

接下来，我们需要设计 Popup 界面的样式。创建一个名为 `popup.css` 的文件，并添加以下 CSS 样式：

```css
body {
    font-family: Arial, sans-serif;
    width: 250px;
    padding: 10px;
}

h1 {
    font-size: 18px;
    text-align: center;
}

button {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
}

#result {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
}
```

这些样式将使我们的 Popup 界面看起来更加美观和规范。特别是按钮和结果显示区域的样式，可以增强用户体验。

## 编写`popup.js`处理事件

最后，我们需要编写一些 JavaScript 代码来处理用户点击按钮时的事件。创建 `popup.js` 文件，并添加以下代码：

```javascript
document.addEventListener('DOMContentLoaded', function () {
    const translateBtn = document.getElementById('translateBtn');
    const dictionaryBtn = document.getElementById('dictionaryBtn');
    const resultDiv = document.getElementById('result');

    translateBtn.addEventListener('click', function () {
        chrome.tabs.executeScript({
            code: 'window.getSelection().toString();'
        }, function (selection) {
            resultDiv.textContent = 'Translating: ' + selection[0];
            // 在这里调用翻译 API 并显示结果
        });
    });

    dictionaryBtn.addEventListener('click', function () {
        chrome.tabs.executeScript({
            code: 'window.getSelection().toString();'
        }, function (selection) {
            resultDiv.textContent = 'Looking up: ' + selection[0];
            // 在这里调用词典 API 并显示结果
        });
    });
});
```

这个脚本首先等待 DOM 内容加载完成，然后为两个按钮添加点击事件监听器。当用户点击“Translate”或“Dictionary”按钮时，脚本将获取当前页面中选中的文本，并在结果区域显示相应的提示。

## 整合与测试

到目前为止，我们已经完成了基础 Popup 界面的创建，包括 `popup.html`、`popup.css` 和 `popup.js` 文件。我们可以通过以下步骤来整合与测试：

1.  确保你的项目文件夹中包含了 `manifest.json` 文件，并且其中包含以下内容： 
```json
{
    "manifest_version": 2,
    "name": "Translator & Dictionary Plugin",
    "version": "1.0",
    "browser_action": {
        "default_popup": "popup.html"
    },
    "permissions": [
        "activeTab"
    ]
}
```
 

2.  打开 Chrome 浏览器，进入扩展程序管理页面（chrome://extensions/）。 
3.  启用“开发者模式”。 
4.  点击“加载已解压的扩展程序”，选择你的项目文件夹。 
5.  安装完成后，你应该可以在浏览器工具栏看到插件的图标，点击图标将会弹出我们创建的 Popup 界面。 

至此，我们已经成功创建了一个基本的 Popup 界面，并实现了简单的事件处理。接下来的章节将进一步扩展插件的功能。

