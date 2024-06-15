---
title: 7、词典功能实现
urlname: vtsebpvpbg1cymg5
date: '2024-06-15 21:23:23'
updated: '2024-06-15 21:23:42'
description: 在本章中，我们将进一步扩展我们的翻译插件，增加一个词典功能。这将允许用户在使用插件进行翻译时，同时获取词语的详细解释。本章将详细介绍如何选择词典 API，如何调用词典 API，以及如何将词典解释结果显示在插件中。选择词典 API选择一个合适的词典 API 是实现词典功能的关键步骤。常见的词典 ...
---
在本章中，我们将进一步扩展我们的翻译插件，增加一个词典功能。这将允许用户在使用插件进行翻译时，同时获取词语的详细解释。本章将详细介绍如何选择词典 API，如何调用词典 API，以及如何将词典解释结果显示在插件中。

## 选择词典 API

选择一个合适的词典 API 是实现词典功能的关键步骤。常见的词典 API 有 Merriam-Webster API、Oxford Dictionaries API 等。我们在本教程中将使用 Merriam-Webster API，因为它提供了详细的词典解释和多种词典类型。

### 获取 Merriam-Webster API Key

1. **注册账号**：前往 [Merriam-Webster Developer](https://dictionaryapi.com/register/index)，注册一个开发者账号。
2. **申请 API Key**：登录后，申请一个词典 API Key。记下你的 API Key，我们将在后续步骤中使用它。

## 调用词典 API

有了 API Key 后，我们就可以开始调用 Merriam-Webster API 获取词语的解释了。我们将用我们的内容脚本 `content.js` 来调用这个 API。

### 更新 `content.js`

在 `content.js` 中，我们需要编写一个函数来调用 Merriam-Webster API，并处理返回的词典解释结果。以下是示例代码：

```javascript
// content.js

async function getDictionaryDefinition(word) {
  const apiKey = "YOUR_MERRIAM_WEBSTER_API_KEY"; // 替换为你的实际 API Key
  const url = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0 && data[0].shortdef) {
      return data[0].shortdef;
    } else {
      return ["No definition found."];
    }
  } catch (error) {
    console.error("Error fetching dictionary definition:", error);
    return ["Error fetching definition."];
  }
}
```

## 显示词典解释结果

接下来，我们需要将词典解释结果显示在插件的 Popup 界面中。我们将更新 `popup.js` 文件来处理并显示这些结果。

### 更新 `popup.js`

在 `popup.js` 中，我们将添加一个函数来处理词典解释结果并将其显示在 Popup 界面中。以下是示例代码：

```javascript
// popup.js

document.addEventListener("DOMContentLoaded", function () {
  const dictionaryButton = document.getElementById("dictionaryButton");
  const outputDiv = document.getElementById("output");

  dictionaryButton.addEventListener("click", async function () {
    const selectedText = await getSelectedText();
    const definitions = await getDictionaryDefinition(selectedText);

    outputDiv.innerHTML = `<h4>Dictionary Definitions for "${selectedText}":</h4>`;
    definitions.forEach((definition) => {
      outputDiv.innerHTML += `<p>${definition}</p>`;
    });
  });
});

async function getSelectedText() {
  // 从 content script 获取选中的文本
  return "example"; // 这是一个示例，实际实现中需要从 content script 获取选中文本
}
```

### 更新 `popup.html`

我们还需要更新 `popup.html` 文件，添加一个按钮来触发词典查询，以及一个输出区域来显示词典解释结果。

```html
<!-- popup.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Translation and Dictionary Plugin</title>
    <style>
      /* 添加一些基本样式 */
      #output {
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <h3>Translation and Dictionary Plugin</h3>
    <button id="dictionaryButton">Get Dictionary Definitions</button>
    <div id="output"></div>
    <script src="popup.js"></script>
  </body>
</html>
```

## 完整示例

为了帮助大家更好地理解，我们提供了一个完整的示例代码，包括 `content.js`、`popup.js` 和 `popup.html` 文件的内容：

**content.js**:

```javascript
// content.js

async function getDictionaryDefinition(word) {
  const apiKey = "YOUR_MERRIAM_WEBSTER_API_KEY"; // 替换为你的实际 API Key
  const url = `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0 && data[0].shortdef) {
      return data[0].shortdef;
    } else {
      return ["No definition found."];
    }
  } catch (error) {
    console.error("Error fetching dictionary definition:", error);
    return ["Error fetching definition."];
  }
}
```

**popup.js**:

```javascript
// popup.js

document.addEventListener("DOMContentLoaded", function () {
  const dictionaryButton = document.getElementById("dictionaryButton");
  const outputDiv = document.getElementById("output");

  dictionaryButton.addEventListener("click", async function () {
    const selectedText = await getSelectedText();
    const definitions = await getDictionaryDefinition(selectedText);

    outputDiv.innerHTML = `<h4>Dictionary Definitions for "${selectedText}":</h4>`;
    definitions.forEach((definition) => {
      outputDiv.innerHTML += `<p>${definition}</p>`;
    });
  });
});

async function getSelectedText() {
  // 从 content script 获取选中的文本
  return "example"; // 这是一个示例，实际实现中需要从 content script 获取选中文本
}
```

**popup.html**:

```html
<!-- popup.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Translation and Dictionary Plugin</title>
    <style>
      /* 添加一些基本样式 */
      #output {
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <h3>Translation and Dictionary Plugin</h3>
    <button id="dictionaryButton">Get Dictionary Definitions</button>
    <div id="output"></div>
    <script src="popup.js"></script>
  </body>
</html>
```

## 总结

在本章中，我们介绍了如何为翻译插件增加词典功能。我们选择了 Merriam-Webster API，编写了调用 API 的代码，并更新了 Popup 界面以显示词典解释结果。通过这些步骤，用户可以在翻译文本的同时，获取更详细的词语解释，这将大大增强插件的实用性。

【本章节完毕】
