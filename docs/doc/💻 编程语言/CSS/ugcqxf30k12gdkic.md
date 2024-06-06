---
title: 第七章：网格布局（Grid）
urlname: ugcqxf30k12gdkic
date: '2024-06-06 20:49:21'
updated: '2024-06-06 20:49:37'
description: '1. Grid 的基本概念Grid 容器与 Grid 项目在 CSS Grid 布局中，主要有两个重要的角色：Grid 容器和 Grid 项目。Grid 容器是包含了所有 Grid 项目的元素，而 Grid 项目则是 Grid 容器内部的直接子元素。Grid 容器：通过设置 display: ...'
---
## 1. Grid 的基本概念

### Grid 容器与 Grid 项目

在 CSS Grid 布局中，主要有两个重要的角色：Grid 容器和 Grid 项目。Grid 容器是包含了所有 Grid 项目的元素，而 Grid 项目则是 Grid 容器内部的直接子元素。

- **Grid 容器**：通过设置 `display: grid;` 或 `display: inline-grid;` 将元素定义为 Grid 容器。
- **Grid 项目**：Grid 容器的直接子元素自动成为 Grid 项目。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Grid 示例</title>
    <style>
      .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
      .item {
        background-color: #f0f0f0;
        padding: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
    </div>
  </body>
</html>
```

### 定义网格行与列

通过 `grid-template-columns` 和 `grid-template-rows` 属性可以定义网格的列和行。

- **列定义**：`grid-template-columns: 100px 200px 100px;` 表示定义三列，宽度分别为 100px, 200px 和 100px。
- **行定义**：`grid-template-rows: 50px 100px;` 表示定义两行，行高分别为 50px 和 100px。

```css
.container {
  display: grid;
  grid-template-columns: 100px 200px 100px;
  grid-template-rows: 50px 100px;
}
```

### 网格线与网格区域

- **网格线（Grid Lines）**：网格中的分割线，列线和行线将网格划分为单元。
- **网格区域（Grid Areas）**：由网格线围成的矩形区域，可以通过命名区域来简化布局。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>网格区域示例</title>
    <style>
      .container {
        display: grid;
        grid-template-areas:
          "header header header"
          "sidebar content content"
          "footer footer footer";
        gap: 10px;
      }
      .header {
        grid-area: header;
      }
      .sidebar {
        grid-area: sidebar;
      }
      .content {
        grid-area: content;
      }
      .footer {
        grid-area: footer;
      }
      .item {
        background-color: #f0f0f0;
        padding: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header item">Header</div>
      <div class="sidebar item">Sidebar</div>
      <div class="content item">Content</div>
      <div class="footer item">Footer</div>
    </div>
  </body>
</html>
```

## 2. 网格布局的应用

### 创建复杂布局

利用 CSS Grid，可以很容易地创建复杂的布局，如多列布局、重叠布局等。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>复杂布局示例</title>
    <style>
      .container {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 100px auto 50px;
        gap: 10px;
      }
      .header {
        grid-column: 1 / span 3;
      }
      .sidebar {
        grid-row: 2;
      }
      .content {
        grid-column: 2 / 4;
        grid-row: 2 / 3;
      }
      .footer {
        grid-column: 1 / span 3;
      }
      .item {
        background-color: #f0f0f0;
        padding: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header item">Header</div>
      <div class="sidebar item">Sidebar</div>
      <div class="content item">Content</div>
      <div class="footer item">Footer</div>
    </div>
  </body>
</html>
```

### 网格对齐与间距

可以通过 `align-items`, `justify-items`, `align-content`, 和 `justify-content` 属性来调整网格项目和整个网格的对齐方式。

- **align-items**：垂直对齐网格项目。
- **justify-items**：水平对齐网格项目。
- **align-content**：垂直对齐整个网格。
- **justify-content**：水平对齐整个网格。

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  align-items: center;
  justify-items: center;
}
```

### 响应式网格布局

使用 `minmax()` 函数和媒体查询，可以实现响应式网格布局，适应不同屏幕大小。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>响应式网格示例</title>
    <style>
      .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 10px;
      }
      .item {
        background-color: #f0f0f0;
        padding: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
      <div class="item">Item 4</div>
      <div class="item">Item 5</div>
      <div class="item">Item 6</div>
    </div>
  </body>
</html>
```

