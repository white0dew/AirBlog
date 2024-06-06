---
title: 第五章：布局基础
urlname: wofgtfxighsrilqr
date: '2024-06-06 20:47:01'
updated: '2024-06-06 20:48:00'
description: 1. 流动布局块级元素与内联元素在CSS中，HTML元素可以分为块级元素（Block-level Element）和内联元素（Inline Element）。了解它们的不同特性对于布局设计至关重要。块级元素块级元素总是从新行开始，并且会独占一行。常见的块级元素包括 <div>、<h1> 至 <...
---
## 1. 流动布局

### 块级元素与内联元素

在CSS中，HTML元素可以分为块级元素（Block-level Element）和内联元素（Inline Element）。了解它们的不同特性对于布局设计至关重要。

#### 块级元素

块级元素总是从新行开始，并且会独占一行。常见的块级元素包括 `<div>`、`<h1>` 至 `<h6>`、`<p>` 等。块级元素的特点是可以设置宽度、高度、内边距和外边距。

例如：

```html
<div>
  这是一个块级元素。
</div>
<p>
  这是另一个块级元素。
</p>
```

#### 内联元素

内联元素不会从新行开始，会在一行内显示。常见的内联元素包括 `<span>`、`<a>`、`<strong>` 等。内联元素的特点是只能设置左右内边距和外边距，无法设置高度和宽度。

例如：

```html
<span>这是一个内联元素。</span>
<a href="#">这是另一个内联元素。</a>
```

### 标准文档流

在标准文档流中，元素按照它们在HTML中的顺序从上到下排列。块级元素会从新行开始，而内联元素则会在一行中排列。当我们不对其进行任何特殊的CSS设置时，所有元素都遵循这一规则。

```html
<p>这是一个段落。</p>
<p>这是另一个段落。</p>
```

CSS：

```css
p {
  color: blue;
}
```

效果：

```html
<p style="color: blue;">这是一个段落。</p>
<p style="color: blue;">这是另一个段落。</p>
```

## 2. 浮动布局

浮动（Float）是一种创建复杂布局的常用技术。通过使用 `float` 属性，我们可以让一个元素向左或向右浮动，并让后续的元素环绕在其周围。

### 浮动的基本概念

浮动的基本概念是将一个元素从文档流中取出，使其向左或向右浮动。其他内容会围绕浮动元素进行排列。常用的 `float` 属性值包括：

- `float: left;` 元素向左浮动。
- `float: right;` 元素向右浮动。

```html
<img src="image.jpg" alt="图片" style="float: left;">
<p>这是一段文字，这段文字会围绕在图片的右侧。</p>
```

CSS：

```css
img {
  float: left;
  margin-right: 10px;
}

p {
  text-align: justify;
}
```

效果：

```html
<img src="image.jpg" alt="图片" style="float: left; margin-right: 10px;">
<p style="text-align: justify;">这是一段文字，这段文字会围绕在图片的右侧。</p>
```

### 清除浮动

清除浮动是一个重要的概念，因为浮动元素会影响其后面的元素排列。我们可以使用 `clear` 属性来解决这一问题。常用的 `clear` 属性值包括：

- `clear: left;` 清除左侧浮动。
- `clear: right;` 清除右侧浮动。
- `clear: both;` 清除左右两侧的浮动。

```html
<img src="image.jpg" alt="图片" style="float: left;">
<p>这是一段文字，这段文字会围绕在图片的右侧。</p>
<div style="clear: both;"></div>
<p>浮动被清除后，这段文字会出现在图片下方。</p>
```

CSS：

```css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

效果：

```html
<img src="image.jpg" alt="图片" style="float: left;">
<p>这是一段文字，这段文字会围绕在图片的右侧。</p>
<div class="clearfix"></div>
<p>浮动被清除后，这段文字会出现在图片下方。</p>
```

### 浮动布局的实例应用

浮动布局常用于创建多列布局。例如，我们可以使用浮动来创建一个简单的两列布局：

HTML：

```html
<div class="container">
  <div class="column left">左侧内容</div>
  <div class="column right">右侧内容</div>
</div>
```

CSS：

```css
.container {
  width: 100%;
}

.column {
  width: 48%;
  float: left;
  margin-right: 2%;
}

.column.right {
  margin-right: 0;
}
```

效果：

```html
<div class="container" style="width: 100%;">
  <div class="column left" style="width: 48%; float: left; margin-right: 2%;">左侧内容</div>
  <div class="column right" style="width: 48%; float: left; margin-right: 0;">右侧内容</div>
</div>
```

## 3. 定位布局

定位（Positioning）是一种更为灵活的布局技术。通过使用 `position` 属性，我们可以精确地控制元素在页面上的位置。常见的 `position` 属性值包括：

- `static`：默认值，元素按照正常文档流进行布局。
- `relative`：相对定位，相对于其正常位置进行偏移。
- `absolute`：绝对定位，相对于最近的已定位祖先元素进行定位。
- `fixed`：固定定位，相对于视口进行定位。
- `sticky`：粘性定位，在特定的滚动位置进行定位。

### 定位的基本概念

#### 相对定位

相对定位的元素仍保留在文档流中，但可以通过 `top`、`right`、`bottom`、`left` 属性进行偏移。

```html
<div class="relative-box">相对定位盒子</div>
```

CSS：

```css
.relative-box {
  position: relative;
  top: 10px;
  left: 20px;
  background-color: lightblue;
}
```

效果：

```html
<div class="relative-box" style="position: relative; top: 10px; left: 20px; background-color: lightblue;">相对定位盒子</div>
```

#### 绝对定位

绝对定位的元素脱离文档流，不占据空间，相对于最近的已定位祖先元素进行定位。

```html
<div class="relative-container">
  <div class="absolute-box">绝对定位盒子</div>
</div>
```

CSS：

```css
.relative-container {
  position: relative;
  height: 200px;
  background-color: lightgray;
}

.absolute-box {
  position: absolute;
  top: 30px;
  left: 40px;
  background-color: lightcoral;
}
```

效果：

```html
<div class="relative-container" style="position: relative; height: 200px; background-color: lightgray;">
  <div class="absolute-box" style="position: absolute; top: 30px; left: 40px; background-color: lightcoral;">绝对定位盒子</div>
</div>
```

#### 固定定位

固定定位的元素脱离文档流，不随页面滚动而改变位置，相对于视口进行定位。

```html
<div class="fixed-box">固定定位盒子</div>
```

CSS：

```css
.fixed-box {
  position: fixed;
  bottom: 10px;
  right: 20px;
  background-color: lightgreen;
}
```

效果：

```html
<div class="fixed-box" style="position: fixed; bottom: 10px; right: 20px; background-color: lightgreen;">固定定位盒子</div>
```

#### 粘性定位

粘性定位结合了相对定位和固定定位的特点。在特定的滚动位置前，元素表现为相对定位；超过这个位置后，表现为固定定位。

```html
<div class="sticky-box">粘性定位盒子</div>
```

CSS：

```css
.sticky-box {
  position: sticky;
  top: 20px;
  background-color: lightyellow;
}
```

效果：

```html
<div class="sticky-box" style="position: sticky; top: 20px; background-color: lightyellow;">粘性定位盒子</div>
```

### 定位布局的实例应用

在实际应用中，定位布局可以帮助我们创建复杂的网页布局。例如，我们可以创建一个固定在页面底部的导航栏：

HTML：

```html
<nav class="fixed-nav">
  <a href="#">首页</a>
  <a href="#">关于</a>
  <a href="#">联系</a>
</nav>
```

CSS：

```css
.fixed-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
}

.fixed-nav a {
  color: white;
  margin: # 第五章：布局基础

## 3. 定位布局（继续）

### 定位布局的实例应用（续）

在实际应用中，定位布局可以帮助我们创建复杂的网页布局。例如，我们可以创建一个固定在页面底部的导航栏：

HTML：

```html
<nav class="fixed-nav">
  <a href="#">首页</a>
  <a href="#">关于</a>
  <a href="#">联系</a>
</nav>
```

CSS：

```css
.fixed-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
}

.fixed-nav a {
  color: white;
  margin: 0 15px;
  text-decoration: none;
}
```

效果：

```html
<nav class="fixed-nav" style="position: fixed; bottom: 0; width: 100%; background-color: #333; color: white; text-align: center; padding: 10px 0;">
  <a href="#" style="color: white; margin: 0 15px; text-decoration: none;">首页</a>
  <a href="#" style="color: white; margin: 0 15px; text-decoration: none;">关于</a>
  <a href="#" style="color: white; margin: 0 15px; text-decoration: none;">联系</a>
</nav>
```

这个固定导航栏会始终显示在页面底部，并且不会随着页面的滚动而移动，从而提供了一个稳定的导航体验。

### 粘性定位的场景应用

粘性定位在某些场景中非常有用，比如需要在用户滚动到某个位置后，元素保持在固定位置。以下是一个示例，展示了如何使用粘性定位创建一个在用户滚动到顶部时固定的标题栏：

HTML:

```html
<header class="sticky-header">
  这个标题将会在滚动到顶部时固定。
</header>
<section class="content">
  <p>内容部分...</p>
  <!-- 更多内容 -->
</section>
```

CSS:

```css
.sticky-header {
  position: sticky;
  top: 0;
  background-color: #ffeb3b;
  padding: 10px;
  font-size: 20px;
  text-align: center;
}

.content {
  height: 2000px; /* 增加内容的高度以便滚动 */
}
```

效果：

```html
<header class="sticky-header" style="position: sticky; top: 0; background-color: #ffeb3b; padding: 10px; font-size: 20px; text-align: center;">
  这个标题将会在滚动到顶部时固定。
</header>
<section class="content" style="height: 2000px;">
  <p>内容部分...</p>
  <!-- 更多内容 -->
</section>
```

### 实现复杂布局

定位技术可以帮助我们实现更复杂的布局，例如创建一个多层叠加效果的页面布局。以下是一个示例展示了如何使用相对定位和绝对定位实现一个重叠的布局效果：

HTML:

```html
<div class="container">
  <div class="box box1">盒子1</div>
  <div class="box box2">盒子2</div>
  <div class="box box3">盒子3</div>
</div>
```

CSS:

```css
.container {
  position: relative;
  width: 300px;
  height: 200px;
  background-color: #f0f0f0;
}

.box {
  position: absolute;
  width: 100px;
  height: 100px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box1 {
  background-color: #2196f3;
  top: 10px;
  left: 10px;
}

.box2 {
  background-color: #f44336;
  top: 40px;
  left: 40px;
}

.box3 {
  background-color: #4caf50;
  top: 70px;
  left: 70px;
}
```

效果：

```html
<div class="container" style="position: relative; width: 300px; height: 200px; background-color: #f0f0f0;">
  <div class="box box1" style="position: absolute; width: 100px; height: 100px; color: white; display: flex; justify-content: center; align-items: center; background-color: #2196f3; top: 10px; left: 10px;">盒子1</div>
  <div class="box box2" style="position: absolute; width: 100px; height: 100px; color: white; display: flex; justify-content: center; align-items: center; background-color: #f44336; top: 40px; left: 40px;">盒子2</div>
  <div class="box box3" style="position: absolute; width: 100px; height: 100px; color: white; display: flex; justify-content: center; align-items: center; background-color: #4caf50; top: 70px; left: 70px;">盒子3</div>
</div>
```

在这个示例中，通过使用绝对定位，我们成功实现了多个盒子之间的重叠效果。每个盒子都相对于其包含块（`.container`）进行定位，展现了定位布局的强大功能。
接下来，我们将进入更加高级的布局技术，包括弹性布局（Flexbox）和网格布局（Grid），它们能够使我们的布局更加灵活和高效。

