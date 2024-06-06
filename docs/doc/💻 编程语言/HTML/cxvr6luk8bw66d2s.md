---
title: '第七章: 表单与输入'
urlname: cxvr6luk8bw66d2s
date: '2024-06-06 20:32:18'
updated: '2024-06-06 20:32:36'
description: 表单是用户与网站进行交互的核心工具之一。它们不仅用于数据提交，还可以进行数据验证和用户输入的管理。在这一章中，我们将详细介绍 HTML 表单元素及其使用方法，并提供丰富的代码示例帮助理解。表单元素基本结构一个基本的 HTML 表单使用 <form> 标签包含所有的表单元素。表单的基本结构如下：...
---
# 


表单是用户与网站进行交互的核心工具之一。它们不仅用于数据提交，还可以进行数据验证和用户输入的管理。在这一章中，我们将详细介绍 HTML 表单元素及其使用方法，并提供丰富的代码示例帮助理解。

## 表单元素

### 基本结构

一个基本的 HTML 表单使用 `<form>` 标签包含所有的表单元素。表单的基本结构如下：

```html
<form action="submit_url" method="post">
  <!-- 表单元素 -->
</form>
```

- `action` 属性：指定表单提交的目标 URL。
- `method` 属性：指定提交表单时使用的 HTTP 方法（通常为 `GET` 或 `POST`）。

### 常见的表单元素

#### 输入框（`<input>`）

输入框是最常见的表单元素之一，用于接收用户输入。根据 `type` 属性的不同，输入框可以有多种类型：

```html
<form action="/submit" method="post">
  <!-- 文本输入框 -->
  <label for="name">姓名:</label>
  <input type="text" id="name" name="name" />



  <!-- 邮件输入框 -->
  <label for="email">邮箱:</label>
  <input type="email" id="email" name="email" />



  <!-- 密码输入框 -->
  <label for="password">密码:</label>
  <input type="password" id="password" name="password" />



  <!-- 提交按钮 -->
  <input type="submit" value="提交" />
</form>
```

- `type="text"`：文本输入框。
- `type="email"`：用于输入电子邮件地址的输入框。
- `type="password"`：密码输入框，输入内容以掩码显示。
- `type="submit"`：提交按钮。

#### 文本区域（`<textarea>`）

文本区域用于接收多行文本输入：

```html
<form action="/submit" method="post">
  <label for="message">留言:</label>

  <textarea id="message" name="message" rows="4" cols="50"></textarea
  >


  <input type="submit" value="提交" />
</form>
```

- `rows` 属性：指定文本区域的行数。
- `cols` 属性：指定文本区域的列数。

#### 按钮（`<button>`）

按钮可以是提交按钮或普通按钮：

```html
<form action="/submit" method="post">
  <button type="submit">提交</button>
  <button type="button" onclick="alert('按钮点击')">点击我</button>
</form>
```

- `type="submit"`：提交按钮，点击时提交表单。
- `type="button"`：普通按钮，点击时触发 JavaScript 事件。

## 表单验证与提交

### HTML5 表单验证

HTML5 提供了一些属性来进行简单的表单验证：

```html
<form action="/submit" method="post">
  <label for="name">姓名:</label>
  <input type="text" id="name" name="name" required />



  <label for="email">邮箱:</label>
  <input type="email" id="email" name="email" required />



  <label for="age">年龄 (18-99):</label>
  <input type="number" id="age" name="age" min="18" max="99" />



  <input type="submit" value="提交" />
</form>
```

- `required` 属性：表示该字段为必填项。
- `type="email"`：验证是否为有效的电子邮件格式。
- `min` 和 `max` 属性：限制输入的数值范围。

### 表单提交

表单提交时，浏览器会将表单数据发送到指定的 `action` URL。服务器接收并处理数据后，可以返回响应页面。

#### 使用 JavaScript 提交表单

有时候，我们需要通过 JavaScript 来控制表单的提交行为：

```html
<form id="myForm" action="/submit" method="post">
  <label for="name">姓名:</label>
  <input type="text" id="name" name="name" required />



  <label for="email">邮箱:</label>
  <input type="email" id="email" name="email" required />



  <button type="button" onclick="submitForm()">提交</button>
</form>

<script>
  function submitForm() {
    // 可以在这里进行额外的验证或处理
    document.getElementById("myForm").submit();
  }
</script>
```

在这个示例中，我们通过 JavaScript 函数 `submitForm` 手动提交表单。这允许我们在提交前执行额外的逻辑。

## 小结

这一章我们详细介绍了 HTML 表单元素及其使用方法，涵盖了基础的文本输入、文本区域、按钮等元素，以及如何进行表单验证和提交。在接下来的章节中，我们将探讨更高级的 HTML5 新特性，以提升表单的功能。
