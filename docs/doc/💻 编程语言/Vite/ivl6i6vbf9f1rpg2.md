---
title: 第七章：框架支持——与 Vue、React、Svelte 的结合
urlname: ivl6i6vbf9f1rpg2
date: '2024-06-04 14:13:18'
updated: '2024-06-04 17:14:16'
description: 在前几章中，我们已经了解了 Vite 的基础配置、开发服务器、模块化机制以及插件系统。本章将探讨 Vite 如何与多种前端框架结合使用，特别是 Vue、React 和 Svelte。使用 Vite 构建 Vue 项目初始化 Vue 项目Vite 提供了一个简单的命令行工具，可以帮助我们快速初始...
---

在前几章中，我们已经了解了 Vite 的基础配置、开发服务器、模块化机制以及插件系统。本章将探讨 Vite 如何与多种前端框架结合使用，特别是 Vue、React 和 Svelte。

## 使用 Vite 构建 Vue 项目

### 初始化 Vue 项目

Vite 提供了一个简单的命令行工具，可以帮助我们快速初始化一个 Vue 项目：

```shell
npm init vite@latest my-vue-app --template vue
cd my-vue-app
npm install
```

### 配置 Vue 插件

在 `vite.config.js` 中配置 Vue 插件：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 配置 Vue 插件
export default defineConfig({
  plugins: [vue()]
})
```

### 创建 Vue 组件

接下来，我们可以创建一个简单的 Vue 组件：

```vue
<!-- src/components/HelloWorld.vue -->
<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vite with Vue!'
    }
  }
}
</script>
```

### 使用 Vue 组件

在 `main.js` 中使用这个组件：

```javascript
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

## 使用 Vite 构建 React 项目

### 初始化 React 项目

Vite 同样支持快速初始化 React 项目：

```shell
npm init vite@latest my-react-app --template react
cd my-react-app
npm install
```

### 配置 React 插件

在 `vite.config.js` 中配置 React 插件：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 配置 React 插件
export default defineConfig({
  plugins: [react()]
})
```

### 创建 React 组件

接下来，我们可以创建一个简单的 React 组件：

```javascript
// src/components/HelloWorld.jsx
import React from 'react'

function HelloWorld() {
  const [message, setMessage] = React.useState('Hello Vite with React!')

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage('Hello Vite with React and HMR!')}>Click Me</button>
    </div>
  )
}

export default HelloWorld
```

### 使用 React 组件

在 `main.jsx` 中使用这个组件：

```javascript
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('app'))
```

## 使用 Vite 构建 Svelte 项目

### 初始化 Svelte 项目

Vite 也支持快速初始化 Svelte 项目：

```shell
npm init vite@latest my-svelte-app --template svelte
cd my-svelte-app
npm install
```

### 配置 Svelte 插件

在 `vite.config.js` 中配置 Svelte 插件：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import svelte from '@sveltejs/vite-plugin-svelte'

// 配置 Svelte 插件
export default defineConfig({
  plugins: [svelte()]
})
```

### 创建 Svelte 组件

接下来，我们可以创建一个简单的 Svelte 组件：

```
<!-- src/components/HelloWorld.svelte -->
<script>
  let message = 'Hello Vite with Svelte!'
</script>

<div>
  <h1>{message}</h1>
  <button on:click={() => message = 'Hello Vite with Svelte and HMR!'}>Click Me</button>
</div>

<style>
  h1 {
    color: purple;
  }
</style>
```

### 使用 Svelte 组件

在 `main.js` 中使用这个组件：

```javascript
// src/main.js
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app
```

## Vite 与常规 React 构建工具的对比

在这一章节的末尾，我们来对比一下 Vite 与常规 React 构建工具（如 Create React App）在框架支持上的区别：

### 框架支持

-  **Vite**： 
   - 支持多种前端框架，包括 Vue、React、Svelte、Preact、Lit 等。
   - 通过插件系统轻松实现对不同框架的支持。
-  **常规 React 构建工具**： 
   - 主要支持 React，其他框架的支持较为有限。
   - 插件系统相对复杂，配置较多。

### 开发体验

-  **Vite**： 
   - 极速冷启动和高效的热模块替换（HMR），提供流畅的开发体验。
   - 配置简洁直观，适合快速开发和迭代。
-  **常规 React 构建工具**： 
   - 启动速度较慢，HMR 效率较低。
   - 配置复杂，特别是在跨框架开发时，需进行大量调整。

### 构建性能

-  **Vite**： 
   - 使用 Rollup 进行生产构建，性能优越，构建速度快。
   - 支持代码拆分、代码压缩和 tree-shaking 等优化技术。
-  **常规 React 构建工具**： 
   - 通常使用 Webpack 进行构建，构建时间较长，性能相对较低。
   - 尽管 Webpack 也支持代码拆分和压缩，但配置较为复杂。

## 结论

通过这一章的学习，你应该已经掌握了如何使用 Vite 构建 Vue、React 和 Svelte 项目。无论你选择哪种框架，Vite 都能提供极速的开发体验和高效的构建性能。下一章，我们将深入探讨 Vite 的智能依赖预构建功能，了解它如何提升加载速度，敬请期待！
