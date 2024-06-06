---
title: 第十章：变换与特效
urlname: tdk1gwkigaz5pu7d
date: '2024-06-06 20:50:27'
updated: '2024-06-06 20:50:52'
description: 在这一章中，我们将探讨 CSS 中的变换（Transform）和滤镜效果（Filter）。这些技术可以帮助我们创建更加生动和引人注目的网页效果。1. 变换（Transform）CSS 变换属性允许您对元素进行平移、缩放、旋转和倾斜。变换应用于元素时，不会影响到文档流，而只是改变元素的呈现方式。...
---
在这一章中，我们将探讨 CSS 中的变换（Transform）和滤镜效果（Filter）。这些技术可以帮助我们创建更加生动和引人注目的网页效果。

## 1. 变换（Transform）

CSS 变换属性允许您对元素进行平移、缩放、旋转和倾斜。变换应用于元素时，不会影响到文档流，而只是改变元素的呈现方式。

### 1.1 平移（translate）

平移（Translate）可以用来移动元素的位置。可以在 X 轴、Y 轴，或者同时在两者上移动。

```css
.box {
  transform: translate(
    50px,
    100px
  ); /* 将元素在X轴上平移50px，在Y轴上平移100px */
}
```

### 1.2 缩放（scale）

缩放（Scale）用于改变元素的大小。可以在 X 轴、Y 轴上分别缩放，或者同时缩放。

```css
.box {
  transform: scale(1.5); /* 将元素放大1.5倍 */
  transform: scale(1.5, 2); /* 在X轴上放大1.5倍，在Y轴上放大2倍 */
}
```

### 1.3 旋转（rotate）

旋转（Rotate）可以让元素围绕点进行旋转。可以指定角度来控制旋转的程度。

```css
.box {
  transform: rotate(45deg); /* 将元素顺时针旋转45度 */
}
```

### 1.4 倾斜（skew）

倾斜（Skew）用于倾斜元素。可以在 X 轴和 Y 轴分别进行倾斜。

```css
.box {
  transform: skewX(30deg); /* 将元素在X轴上倾斜30度 */
  transform: skewY(30deg); /* 将元素在Y轴上倾斜30度 */
  transform: skew(30deg, 20deg); /* 在X轴上倾斜30度，在Y轴上倾斜20度 */
}
```

### 1.5 组合变换

可以将多个变换组合在一个 `transform` 属性中。

```css
.box {
  transform: translate(50px, 100px) scale(1.5) rotate(45deg) skew(30deg, 20deg);
}
```

## 2. 滤镜效果（Filter）

滤镜效果（Filter）允许对元素应用图像处理效果，比如模糊（blur）、亮度（brightness）、对比度（contrast）等。

### 2.1 常见滤镜效果

#### 模糊（blur）

模糊效果可以让元素变得模糊。可以指定模糊半径。

```css
.box {
  filter: blur(5px); /* 将元素模糊5px */
}
```

#### 亮度（brightness）

亮度效果可以让元素变亮或变暗。值可以大于 1（变亮）或小于 1（变暗）。

```css
.box {
  filter: brightness(0.5); /* 将元素亮度降低到50% */
}
```

#### 对比度（contrast）

对比度效果可以增加或减少元素的对比度。值可以大于 1（增加对比度）或小于 1（减少对比度）。

```css
.box {
  filter: contrast(2); /* 将元素对比度增加到200% */
}
```

### 2.2 组合滤镜效果

可以将多个滤镜效果组合在一个 `filter` 属性中。

```css
.box {
  filter: blur(5px) brightness(0.8) contrast(1.5);
}
```

## 3. 实例应用

### 3.1 创建悬浮变换效果

让我们创建一个悬浮时自动放大和旋转的效果。

```html
<div class="hover-box">悬浮我</div>
```

```css
.hover-box {
  width: 100px;
  height: 100px;
  background-color: #4caf50;
  transition: transform 0.5s;
}

.hover-box:hover {
  transform: scale(1.2) rotate(10deg); /* 悬浮时放大1.2倍并旋转10度 */
}
```

### 3.2 创建模糊背景效果

让我们创建一个带有模糊背景效果的卡片。

```html
<div class="card">
  <div class="background"></div>
  <div class="content">内容</div>
</div>
```

```css
.card {
  position: relative;
  width: 300px;
  height: 200px;
  overflow: hidden;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("background.jpg");
  filter: blur(10px); /* 对背景图像应用模糊效果 */
}

.content {
  position: relative;
  color: white;
  padding: 20px;
}
```

## 总结

通过掌握变换和滤镜效果，可以为网页增加许多有趣和复杂的视觉效果。这些技术不仅可以提高用户体验，还可以增强网页的视觉吸引力。

