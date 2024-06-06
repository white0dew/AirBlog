---
title: 第九章：过渡与动画
urlname: ddgrqxv0hf72h2s1
date: '2024-06-06 20:50:03'
updated: '2024-06-06 20:50:26'
description: 1. CSS 过渡1.1 过渡的基本概念CSS 过渡（Transitions）是一种可以让属性值在一定时间内平滑过渡的技术。它能增强用户体验，增加页面的动态效果。1.2 过渡属性与过渡效果CSS 提供了几个专用属性来定义过渡效果：transition-property：指定要添加过渡效果的 C...
---
## 1. CSS 过渡

### 1.1 过渡的基本概念

CSS 过渡（Transitions）是一种可以让属性值在一定时间内平滑过渡的技术。它能增强用户体验，增加页面的动态效果。

### 1.2 过渡属性与过渡效果

CSS 提供了几个专用属性来定义过渡效果：

- `**transition-property**`：指定要添加过渡效果的 CSS 属性。
- `**transition-duration**`：指定过渡效果的时间。
- `**transition-timing-function**`：定义过渡效果的速度曲线。
- `**transition-delay**`：指定过渡效果的延迟时间。

#### 示例代码

```css
/* 默认状态 */
.button {
  background-color: blue;
  color: white;
  padding: 10px;
  border: none;
  transition-property: background-color, transform;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}

/* 当鼠标悬停时 */
.button:hover {
  background-color: green;
  transform: scale(1.1);
}
```

#### 解释

- `.button` 类定义了一个按钮，默认背景色为蓝色。
- 使用 `transition` 属性，让背景色和缩放效果在 0.5 秒内平滑过渡，过渡效果为 `ease-in-out`。

## 2. CSS 动画

### 2.1 动画的基本概念

CSS 动画（Animations）是通过定义关键帧来创建复杂的动画效果。与过渡不同，动画可以独立运行，不需要用户交互。

### 2.2 关键帧动画（`@keyframes`）

关键帧动画通过 `@keyframes` 规则定义，在动画的不同时间点指定样式。

#### 示例代码

```css
/* 定义关键帧动画 */
@keyframes example {
  0% {
    background-color: red;
    left: 0;
  }
  50% {
    background-color: yellow;
    left: 50px;
  }
  100% {
    background-color: green;
    left: 100px;
  }
}

/* 应用动画 */
.box {
  width: 100px;
  height: 100px;
  position: relative;
  animation-name: example;
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-delay: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
```

#### 解释

- `@keyframes example` 定义了一段名为 `example` 的动画。
- `.box` 类将这段动画应用到一个盒子元素上，持续时间为 4 秒，延迟 1 秒，动画无限循环，且方向交替。

### 2.3 动画属性与动画效果

#### 动画属性

- `**animation-name**`：指定动画名称。
- `**animation-duration**`：指定动画持续时间。
- `**animation-timing-function**`：定义动画的速度曲线。
- `**animation-delay**`：指定动画开始前的延迟时间。
- `**animation-iteration-count**`：定义动画的播放次数。
- `**animation-direction**`：定义动画是否交替反转。

#### 动画效果

通过组合使用上述属性，可以实现丰富的动画效果。以下是几个常见的动画效果示例：

#### 示例代码

```css
/* 旋转动画 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotate-box {
  width: 100px;
  height: 100px;
  background-color: purple;
  animation: rotate 2s infinite linear;
}

/* 渐变动画 */
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-box {
  width: 100px;
  height: 100px;
  background-color: pink;
  animation: fade 3s forwards;
}
```

#### 解释

- `rotate` 动画让元素在 2 秒内无限次旋转。
- `fade` 动画让元素在 3 秒内从透明度 0 渐变到 1，并在动画结束后保持最终状态。

通过过渡和动画，开发者可以为网页添加丰富的动态效果，从而提升用户体验。理解这些技术并灵活运用，将为你的前端开发技能增色不少。

