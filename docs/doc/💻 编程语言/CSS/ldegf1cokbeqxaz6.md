---
title: 第三章：文本与字体
urlname: ldegf1cokbeqxaz6
date: '2024-06-06 20:46:14'
updated: '2024-06-06 20:46:34'
description: 在网页设计中，文本的展示和排版是至关重要的。本章将详细介绍 CSS 中如何处理文本样式、文本对齐与装饰、行高与字间距等内容。通过学习本章，你将能够灵活运用 CSS 对文本进行美化和优化，从而提升网页的视觉效果和用户体验。1. 文本样式字体系列（font-family）CSS 提供了 font-...
---
在网页设计中，文本的展示和排版是至关重要的。本章将详细介绍 CSS 中如何处理文本样式、文本对齐与装饰、行高与字间距等内容。通过学习本章，你将能够灵活运用 CSS 对文本进行美化和优化，从而提升网页的视觉效果和用户体验。

## 1. 文本样式

### 字体系列（`font-family`）

CSS 提供了 `font-family` 属性来定义文本的字体系列。可以为元素指定多个字体名称，以逗号分隔。当浏览器无法显示第一个字体时，会依次尝试后面的字体。

```css
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
}
```

在这个例子中，浏览器会首先尝试使用 "Helvetica Neue" 字体，如果不可用则使用 Arial，最后使用系统默认的 sans-serif 字体。

### 字体大小（`font-size`）

`font-size` 属性用于设置文本的大小。你可以使用多种单位，比如像素（px）、点（pt）、百分比（%）、相对单位（em, rem）等。

```css
p {
  font-size: 16px;
}
h1 {
  font-size: 2em;
}
```

在上面的例子中，段落文本的大小为 16 像素，而标题文本的大小是其父元素字体大小的两倍。

### 字体样式（`font-style`）

`font-style` 属性用于设置字体的样式，如常规、斜体和倾斜。

```css
em {
  font-style: italic;
}
```

这里，`em` 元素将被设置为斜体样式。

### 字体粗细（`font-weight`）

`font-weight` 属性用于定义字体的粗细程度。可以使用关键字（normal, bold）或数值（100 到 900，步长为 100）。

```css
strong {
  font-weight: bold;
}
p {
  font-weight: 300;
}
```

在此例中，`strong` 元素的字体设置为粗体，段落文本的字体粗细为 300。

## 2. 文本对齐与装饰

### 文本对齐（`text-align`）

`text-align` 属性用于设置文本在其容器内的对齐方式，可以是左对齐、右对齐、居中对齐或两端对齐。

```css
h1 {
  text-align: center;
}
p {
  text-align: justify;
}
```

此例中，标题文本居中对齐，而段落文本两端对齐。

### 文本装饰（`text-decoration`）

`text-decoration` 属性用于添加或消除文本的装饰，如下划线、上划线和删除线。

```css
a {
  text-decoration: none;
}
del {
  text-decoration: line-through;
}
```

这里，链接文本没有下划线，而 `del` 元素的文本显示删除线。

### 文本缩进（`text-indent`）

`text-indent` 属性用于设置段落的首行缩进。

```css
p {
  text-indent: 2em;
}
```

此例中，段落的首行会缩进两个字符宽度。

## 3. 行高与字间距

### 行高（`line-height`）

`line-height` 属性用于设置行间距。可以使用数值、百分比或倍数。

```css
p {
  line-height: 1.5;
}
```

此例中，段落的行高是字体大小的 1.5 倍。

### 字母间距（`letter-spacing`）

`letter-spacing` 属性用于设置文本字符之间的间距。

```css
h1 {
  letter-spacing: 0.1em;
}
```

在此例中，标题文本的字符间距为 0.1 个字符宽度。

### 单词间距（`word-spacing`）

`word-spacing` 属性用于设置单词之间的间距。

```css
p {
  word-spacing: 0.2em;
}
```

此例中，段落文本的单词间距为 0.2 个字符宽度。


