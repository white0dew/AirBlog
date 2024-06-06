---
title: 第十章：引入与嵌入外部资源
urlname: quvzonpqlvtknn62
date: '2024-06-06 20:33:36'
updated: '2024-06-06 20:33:53'
description: 在前面的章节中，我们已经学习了很多关于 HTML 的基础和进阶知识。本章将深入探讨如何在 HTML 页面中嵌入和引入外部资源。我们将学习如何使用 <iframe> 内嵌内容，以及如何使用 <link>、<script> 和 <style> 标签引入外部资源。10.1 内嵌内容 (<iframe...
---
在前面的章节中，我们已经学习了很多关于 HTML 的基础和进阶知识。本章将深入探讨如何在 HTML 页面中嵌入和引入外部资源。我们将学习如何使用 `<iframe>` 内嵌内容，以及如何使用 `<link>`、`<script>` 和 `<style>` 标签引入外部资源。

## 10.1 内嵌内容 (`<iframe>`)

### 什么是 `<iframe>`？

`<iframe>` 是内嵌框架，用于在当前页面中嵌入另一个 HTML 页面。通过使用 `<iframe>` 标签，你可以在一个页面中展示另一个网站或网页内容。

### `<iframe>` 的基本语法

```html
<iframe src="https://www.example.com" width="600" height="400"></iframe>
```

### 属性详解

- **src**：嵌入页面的 URL 地址。
- **width** 和 **height**：内嵌框架的宽度和高度。
- **frameborder**：设置边框，值为 "0" 时无边框。
- **allowfullscreen**：允许全屏显示。

### 示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>内嵌内容示例</title>
  </head>
  <body>
    <h1>嵌入 Example 网站</h1>
    <iframe
      src="https://www.example.com"
      width="800"
      height="600"
      frameborder="0"
      allowfullscreen
    >
    </iframe>
  </body>
</html>
```

### 安全性与优化

1.  **使用沙箱（sandbox）属性**：限制 `<iframe>` 中内容的行为。 
```html
<iframe
  src="https://www.example.com"
  width="800"
  height="600"
  frameborder="0"
  allowfullscreen
  sandbox
>
</iframe>
```
 

2.  **优化加载性能**：懒加载 `<iframe>` 内容。 
```html
<iframe
  src="https://www.example.com"
  width="800"
  height="600"
  frameborder="0"
  allowfullscreen
  loading="lazy"
>
</iframe>
```
 

## 10.2 引入外部资源

在实际开发中，常常需要引入外部的 CSS 样式文件、JavaScript 脚本文件以及字体等资源。HTML 提供了几种常用的标签来实现这些功能。

### 引入 CSS 样式 (`<link>`)

`<link>` 标签用于引入外部的 CSS 样式文件，它通常放置在 HTML 文档的 `<head>` 部分。

#### 基本语法

```html
<link rel="stylesheet" href="styles.css" />
```

#### 属性详解

- **rel**：指定外部资源的关系，此处为 "stylesheet" 表示样式表。
- **href**：外部样式文件的 URL 地址。

#### 示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>引入 CSS 示例</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

### 引入 JavaScript 脚本 (`<script>`)

`<script>` 标签用于引入外部的 JavaScript 文件，通常放置在 HTML 文档的底部，紧靠关闭的 `</body>` 标签之前。

#### 基本语法

```html
<script src="script.js"></script>
```

#### 属性详解

- **src**：外部 JavaScript 文件的 URL 地址。
- **async**：异步加载脚本。
- **defer**：延迟加载脚本，直到页面完全解析。

#### 示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>引入 JavaScript 示例</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <script src="script.js"></script>
  </body>
</html>
```

### 内嵌样式 (`<style>`)

`<style>` 标签用于在 HTML 文档中内嵌 CSS 样式。它通常放置在 HTML 文档的 `<head>` 部分。

#### 基本语法

```html
<style>
  /* CSS 样式 */
</style>
```

#### 示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>内嵌样式示例</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      h1 {
        color: blue;
      }
    </style>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

### 内嵌脚本 (`<script>`)

`<script>` 标签也可以用于在 HTML 文档中内嵌 JavaScript 脚本。

#### 基本语法

```html
<script>
  // JavaScript 代码
</script>
```

#### 示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>内嵌脚本示例</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <script>
      console.log("Hello from the embedded script!");
    </script>
  </body>
</html>
```

## 总结

通过本章的学习，我们掌握了如何在 HTML 页面中嵌入和引入外部资源。了解了 `<iframe>` 标签的使用方法，以及如何使用 `<link>`、`<script>` 和 `<style>` 标签引入外部的样式和脚本。在实际开发中，合理地使用这些标签可以大大提高网页的功能和表现。
