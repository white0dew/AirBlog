---
title: 如何实现，用户在网页拷贝时，添加版权后缀？
urlname: yngxyvkbqaf61ywf
date: '2024-06-20 16:01:17'
updated: '2024-06-20 16:02:08'
description: 要在用户从网页复制文本时添加一段自定义的后缀，可以监听copy事件，并在该事件的处理函数中修改剪贴板中的内容。这里给出一个使用TypeScript实现的示例：首先，需要一个HTML页面作为起点。以下是一个简单的示例：<!DOCTYPE html> <html lang="en"> <head>...
---
要在用户从网页复制文本时添加一段自定义的后缀，可以监听`copy`事件，并在该事件的处理函数中修改剪贴板中的内容。这里给出一个使用TypeScript实现的示例：
首先，需要一个HTML页面作为起点。以下是一个简单的示例：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Copy Example</title>

</head>

<body>
    <p>这是一段测试文本，试着复制我，看看剪贴板里会发生什么。</p>

    <script src="app.ts" type="module"></script>

</body>

</html>

```
然后，使用TypeScript编写您的脚本`app.ts`，实现在复制操作时添加后缀的逻辑：
```typescript
document.addEventListener('copy', (event: ClipboardEvent) => {
  // 获取用户选择的文本
  const selection = document.getSelection();
  const selectedText = selection ? selection.toString() : '';

  // 检查选择的文本是否超过一定字数，这里以超过10个字符为例
  if (selectedText.length > 10) {
    // 自定义的后缀内容
    const suffix = `
原文链接：*****
作者：*****
版权所有，侵权必究`;

    // 修改剪贴板中的内容
    const newText = selectedText + suffix;
    event.clipboardData?.setData('text/plain', newText);

    // 阻止默认的复制行为
    event.preventDefault();
  }
});
```
这段代码会在文档上添加一个监听器，监听`copy`事件。当用户执行复制操作时，检查所选文本的长度。如果长度超过了10个字符（您可以根据需要调整这个阈值），则在所选文本后附加一段自定义的后缀内容，并通过`event.clipboardData.setData`方法将这个新文本设置到剪贴板中。
最后，通过`event.preventDefault()`阻止默认的复制行为，以确保剪贴板中的内容是修改后的版本。
`
`
