---
title: 6、调用翻译 API
urlname: csxtdf0gdbfudqg7
date: '2024-06-15 21:22:57'
updated: '2024-06-23 20:37:28'
description: 学习如何在 Chrome 插件中选择并设置翻译 API，使用内容脚本调用 API，显示翻译结果。包含 Google Translate 和其他免费翻译 API 的详细步骤。
keywords: 翻译 API，Chrome 插件，Google Translate，API 调用，翻译功能
---
在这一章中，我们将学习如何选择合适的翻译 API，并且设置 API 访问权限，使用内容脚本调用翻译 API 并显示结果。这个章节将重点讲解如何在 Chrome 插件中实现在线翻译功能。

## 6.1 选择合适的翻译 API
### 6.1.1 Google Translate API

Google Translate API 是一个常用的翻译 API，支持多种语言。它的主要优点是准确性高，覆盖语言广泛。但是，这个 API 是收费的，需要先创建一个 Google Cloud 项目，并启用翻译 API。

### 6.1.2 免费翻译 API

还有一些免费的翻译 API，比如：

- LibreTranslate
- MyMemory Translation API
- Yandex.Translate API

我们可以根据自己项目的需求和预算选择合适的翻译 API。

## 6.2 设置 API 访问权限

### 6.2.1 获取 API Key

以 Google Translate API 为例，首先我们需要获取 API Key：

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建一个新的项目或者使用已有项目。
3. 导航到“API 和服务” -> “启用 API 和服务”，搜索并启用“Cloud Translation API”。
4. 在“凭据”标签下，点击“创建凭据” -> “API 密钥”。
5. 复制生成的 API Key。

### 6.2.2 配置 API Key

将获取的 API Key 保存到项目中：

```json
{
  "apiKey": "YOUR_API_KEY"
}
```

将以上 JSON 文件保存为 `config.json`。

## 6.3 使用内容脚本调用翻译 API

### 6.3.1 创建翻译函数

在 `content.js` 中，编写一个函数来调用翻译 API。以下是调用 Google Translate API 的示例代码：

```javascript
async function translateText(text, targetLanguage) {
  const apiKey = "YOUR_API_KEY";
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      q: text,
      target: targetLanguage,
      format: "text",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data && data.data && data.data.translations) {
    return data.data.translations[0].translatedText;
  } else {
    throw new Error("Translation API error");
  }
}
```

### 6.3.2 调用翻译函数

在 `content.js` 中，监听用户的选择操作，并调用翻译函数：

```javascript
document.addEventListener("mouseup", async () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    try {
      const translatedText = await translateText(selectedText, "en");
      console.log(`Translated Text: ${translatedText}`);
      // 这里可以进一步处理翻译结果，比如显示在界面上
    } catch (error) {
      console.error(`Translation Error: ${error.message}`);
    }
  }
});
```

## 6.4 显示翻译结果

为了在页面上显示翻译结果，我们可以创建一个简单的提示框：

### 6.4.1 创建提示框样式

在 `content.css` 中添加提示框样式：

```css
#translate-popup {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
```

### 6.4.2 在页面上显示提示框

在 `content.js` 中编写显示提示框的代码：

```javascript
function showPopup(text, x, y) {
  let popup = document.getElementById("translate-popup");
  if (!popup) {
    popup = document.createElement("div");
    popup.id = "translate-popup";
    document.body.appendChild(popup);
  }
  popup.textContent = text;
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;
  popup.style.display = "block";
}

document.addEventListener("mouseup", async (event) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    try {
      const translatedText = await translateText(selectedText, "en");
      showPopup(translatedText, event.pageX, event.pageY);
    } catch (error) {
      console.error(`Translation Error: ${error.message}`);
    }
  }
});

document.addEventListener("mousedown", () => {
  const popup = document.getElementById("translate-popup");
  if (popup) {
    popup.style.display = "none";
  }
});
```

通过上述步骤，我们实现了调用翻译 API 并在页面上显示翻译结果的功能。

