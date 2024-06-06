---
title: 第六章：HTML 表格
urlname: qqpwoxgs149zde15
date: '2024-06-06 20:32:01'
updated: '2024-06-06 20:32:15'
description: 在本章中，我们将深入探讨 HTML 表格元素的使用。表格在展示数据时非常有用，例如展示一组数据、财务报表或日程安排等。通过学习本章内容，你将掌握如何创建和美化表格。1. 表格元素简介表格在 HTML 中通过 <table> 元素定义。一个基本的 HTML 表格由行（<tr>）和单元格（<td>...
---
在本章中，我们将深入探讨 HTML 表格元素的使用。表格在展示数据时非常有用，例如展示一组数据、财务报表或日程安排等。通过学习本章内容，你将掌握如何创建和美化表格。

## 1. 表格元素简介

表格在 HTML 中通过 `<table>` 元素定义。一个基本的 HTML 表格由行（`<tr>`）和单元格（`<td>` 或 `<th>`）组成。

### 表格结构示例

```html
<table>
  <tr>
    <th>姓名</th>
    <th>年龄</th>
    <th>职业</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>28</td>
    <td>工程师</td>
  </tr>
  <tr>
    <td>李四</td>
    <td>35</td>
    <td>设计师</td>
  </tr>
</table>
```

如上所示，`<table>` 元素包含三个子元素：

- `<tr>`：表示表格的一行（table row）。
- `<th>`：表示表头单元格（table header）。
- `<td>`：表示表格数据单元格（table data）。

### 表格属性

HTML 表格具有多种属性，可以帮助我们更好地控制表格的外观和行为。

- `border`：设置表格边框。
- `cellpadding`：定义单元格内边距。
- `cellspacing`：定义单元格间距。
- `width`：设置表格宽度。
- `height`：设置表格高度。

## 2. 创建基本表格

### 添加边框

```html
<table border="1">
  <tr>
    <th>姓名</th>
    <th>年龄</th>
    <th>职业</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>28</td>
    <td>工程师</td>
  </tr>
  <tr>
    <td>李四</td>
    <td>35</td>
    <td>设计师</td>
  </tr>
</table>
```

### 添加内边距和间距

```html
<table border="1" cellpadding="10" cellspacing="5">
  <tr>
    <th>姓名</th>
    <th>年龄</th>
    <th>职业</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>28</td>
    <td>工程师</td>
  </tr>
  <tr>
    <td>李四</td>
    <td>35</td>
    <td>设计师</td>
  </tr>
</table>
```

### 设置表格宽度

```html
<table border="1" width="50%">
  <tr>
    <th>姓名</th>
    <th>年龄</th>
    <th>职业</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>28</td>
    <td>工程师</td>
  </tr>
  <tr>
    <td>李四</td>
    <td>35</td>
    <td>设计师</td>
  </tr>
</table>
```

## 3. 表格合并

### 合并行（`rowspan`）

```html
<table border="1">
  <tr>
    <th>姓名</th>
    <th>详细信息</th>
  </tr>
  <tr>
    <td rowspan="2">张三</td>
    <td>28岁，工程师</td>
  </tr>
  <tr>
    <td>喜欢编程，跑步</td>
  </tr>
</table>
```

### 合并列（`colspan`）

```html
<table border="1">
  <tr>
    <th>姓名</th>
    <th colspan="2">详细信息</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>28岁</td>
    <td>工程师</td>
  </tr>
  <tr>
    <td>李四</td>
    <td>35岁</td>
    <td>设计师</td>
  </tr>
</table>
```

## 4. 表格样式

使用 CSS 可以进一步美化表格。

### 表格样式示例

```html
<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }
</style>

<table>
  <tr>
    <th>姓名</th>
    <th>年龄</th>
    <th>职业</th>
  </tr>
  <tr>
    <td>张三</td>
    <td>28</td>
    <td>工程师</td>
  </tr>
  <tr>
    <td>李四</td>
    <td>35</td>
    <td>设计师</td>
  </tr>
</table>
```

## 5. 小结

通过本章的学习，你应该掌握了如何创建和美化 HTML 表格。表格是一种非常有用的工具，可以用来展示结构化的数据。在接下来的章节中，我们将进入 HTML 更高级的内容。
