---
title: 第二章：HTML 基础语法
urlname: rb4ye0t3yaqbxzpg
date: '2024-06-06 20:30:09'
updated: '2024-06-06 20:30:24'
description: 2.1 HTML 文档的基本结构HTML（超文本标记语言）是构建网页的基础语言。一个标准的 HTML 文档包括以下几个部分：<!DOCTYPE html> <html lang="en">   <head>     <meta charset="UTF-8" />     <meta name...
---
## 2.1 HTML 文档的基本结构

HTML（超文本标记语言）是构建网页的基础语言。一个标准的 HTML 文档包括以下几个部分：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 页面内容 -->
  </body>
</html>
```

### 2.1.1 `<!DOCTYPE html>`

这行代码告诉浏览器使用 HTML5 规范进行解析。

### 2.1.2 `<html lang="en">`

这是 HTML 文档的根元素。`lang`属性用于指定文档的语言。

### 2.1.3 `<head>`

`<head>`标签包含了所有对页面进行描述的信息，如字符集、页面标题、外部资源链接等。

### 2.1.4 `<meta charset="UTF-8">`

`<meta>`标签用于描述 HTML 文档的元数据。`charset="UTF-8"`表示使用 UTF-8 字符编码。

### 2.1.5 `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

这行代码确保页面在不同设备上的显示效果一致。

### 2.1.6 `<title>`

`<title>`标签定义了文档的标题，在浏览器标签栏中显示。

### 2.1.7 `<body>`

`<body>`标签包含了页面的所有内容。

## 2.2 常用的 HTML 标签

HTML 标签是构成网页内容的关键元素。以下是一些常用的 HTML 标签：

### 2.2.1 标题标签

标题标签用于定义页面的标题，有六个级别，分别是`<h1>`到`<h6>`，标题级别从高到低依次递减。

```html
<h1>这是一级标题</h1>
<h2>这是二级标题</h2>
<h3>这是三级标题</h3>
```

### 2.2.2 段落标签

段落标签`<p>`用于定义文本段落。

```html
<p>这是一个段落。</p>
```

### 2.2.3 换行标签

换行标签`<br>`用于插入换行符。

```html
<p>这是第一行。
这是第二行。</p>
```

### 2.2.4 水平线标签

水平线标签`<hr>`用于插入水平线，通常表示主题的变化。

```html
<p>段落上方有一条水平线。</p>
<hr />
<p>段落下方有一条水平线。</p>
```

## 2.3 标签的属性与使用

HTML 标签可以包含各种属性，以提供额外的信息和控制元素的行为。属性通常以键-值对的形式存在，放置在标签的开头部分。

### 2.3.1 常用属性

#### `id` 属性

`id`属性用于为元素指定唯一的 ID 值，主要用于 JavaScript 和 CSS 的引用。

```html
<p id="paragraph1">这是一个段落。</p>
```

#### `class` 属性

`class`属性用于为元素指定一个或多个类名，通常用于 CSS 样式的应用。

```html
<p class="text-bold">这是一个加粗的段落。</p>
```

#### `style` 属性

`style`属性用于直接在标签中定义 CSS 样式。

```html
<p style="color: red;">这是一个红色的段落。</p>
```

### 2.3.2 自定义属性

HTML5 允许我们使用数据属性来存储自定义的数据。自定义属性的命名必须以`data-`开头。

```html
<p data-custom="value">这是一个带有自定义属性的段落。</p>
```

## 2.4 标签的嵌套与层次结构

HTML 标签可以嵌套使用，但是层次结构必须合理。例如，不可以在一个段落标签`<p>`中嵌套另一个段落标签。这会导致 HTML 结构不规范。

```html
<div>
  <h1>这是标题</h1>
  <p>这是一个段落。</p>
  <ul>
    <li>这是一个列表项。</li>
    <li>这是另一个列表项。</li>
  </ul>
</div>
```

通过了解 HTML 的基本结构和常用标签，你已经掌握了构建简单网页的基础。接下来，我们将深入学习文本与段落的更多内容。
