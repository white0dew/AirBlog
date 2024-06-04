---
title: 第九章：Vite 与常规 React 构建工具的对比
urlname: gdanxi3s6gdukift
date: '2024-06-04 15:50:04'
updated: '2024-06-04 17:16:44'
description: 在前几章中，我们深入探讨了 Vite 的各种功能和特性。本章将详细对比 Vite 与常规 React 构建工具（如 Create React App），帮助你了解它们在开发体验、构建性能、配置复杂度等方面的差异。开发体验极速冷启动Vite：优势：利用浏览器原生 ES 模块支持，实现极快的冷启动...
---

在前几章中，我们深入探讨了 Vite 的各种功能和特性。本章将详细对比 Vite 与常规 React 构建工具（如 Create React App），帮助你了解它们在开发体验、构建性能、配置复杂度等方面的差异。

## 开发体验

### 极速冷启动

**Vite**：

- **优势**：利用浏览器原生 ES 模块支持，实现极快的冷启动速度。启动开发服务器时，只需加载当前页面所需的模块，避免了预先打包所有文件的开销。
- **示例**：
```shell
npm run dev
# Vite 的开发服务器几乎瞬间启动
```
 

**常规 React 构建工具**：

- **劣势**：需要预先打包所有文件，启动时间较长，尤其是在大型项目中更为明显。
- **示例**：
```shell
npm start
# Webpack 的开发服务器启动时间较长
```
 

### 高效的热模块替换（HMR）

**Vite**：

- **优势**：基于原生 ES 模块的 HMR，性能优越，代码修改后的变化几乎能实时反映在页面中，无需刷新整个页面。
- **示例**：
```javascript
// src/components/HelloWorld.vue
<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vite!'
    }
  }
}
</script>
```
 

**常规 React 构建工具**：

- **劣势**：HMR 效率较低，代码修改后的变化需要较长时间才能反映在页面中，有时还需要手动刷新页面。
- **示例**：
```javascript
// src/components/HelloWorld.jsx
import React, { useState } from 'react'

function HelloWorld() {
  const [message, setMessage] = useState('Hello CRA!')

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage('Hello CRA and HMR!')}>Click Me</button>
    </div>
  )
}

export default HelloWorld
```
 

## 构建性能

### 使用 Rollup 进行生产构建

**Vite**：

- **优势**：使用 Rollup 进行生产构建，构建速度快，性能优越。支持代码拆分、代码压缩和 tree-shaking 等优化技术。
- **示例**：
```shell
npm run build
# Vite 使用 Rollup 进行高效构建
```
 

**常规 React 构建工具**：

- **劣势**：通常使用 Webpack 进行构建，构建时间较长，性能相对较低。尽管 Webpack 也支持代码拆分和压缩，但配置较为复杂。
- **示例**：
```shell
npm run build
# Webpack 的构建时间较长
```
 

### 配置复杂度

**Vite**：

- **优势**：配置简洁直观，插件系统灵活强大。大多数情况下，只需简单配置即可满足需求。
- **示例**：
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
```
 

**常规 React 构建工具**：

- **劣势**：配置复杂，特别是在需要自定义配置时，需要进行大量调整和调试。对于不熟悉 Webpack 配置的开发者来说，学习成本较高。
- **示例**：
```javascript
// webpack.config.js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
```
 

## 智能依赖预构建

**Vite**：

- **优势**：自动预构建依赖，提升初次加载速度。支持 include 和 exclude 选项，灵活配置预构建行为。预构建依赖并缓存，减少重复解析和打包的开销。
- **示例**：
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['axios', '@vueuse/core'],
    exclude: ['your-slow-dependency']
  }
})
```
 

**常规 React 构建工具**：

- **劣势**：通常不具备自动预构建功能，需要手动配置依赖管理。依赖解析和打包时间较长，影响开发效率。依赖缓存机制较为复杂，配置繁琐。
- **示例**：
```shell
# 需要手动配置和优化依赖管理
```
 

## 总结

通过这一章的对比分析，我们可以看到 Vite 在开发体验、构建性能、配置复杂度和依赖管理等方面具有显著优势。以下是 Vite 与常规 React 构建工具的主要区别：

-  **开发体验**： 
   - Vite 提供极速冷启动和高效的 HMR，开发过程更加流畅。
   - 常规 React 构建工具启动速度较慢，HMR 效率较低。
-  **构建性能**： 
   - Vite 使用 Rollup 进行生产构建，性能优越，构建速度快。
   - 常规 React 构建工具使用 Webpack，构建时间较长，性能相对较低。
-  **配置复杂度**： 
   - Vite 配置简洁直观，插件系统灵活强大。
   - 常规 React 构建工具配置复杂，特别是自定义配置时，需要进行大量调整。
-  **智能依赖预构建**： 
   - Vite 自动预构建依赖，提高初次加载速度，并支持灵活配置。
   - 常规 React 构建工具通常不具备自动预构建功能，依赖管理复杂。

## 结论

Vite 作为一种现代前端构建工具，通过其极速冷启动、高效的 HMR、智能依赖预构建和简洁的配置，为开发者提供了极佳的开发体验和构建性能。如果你希望提升开发效率和构建速度，不妨尝试在下一个项目中使用 Vite。

下一章，我们将对 Vite 与 Next.js 进行详细对比，了解它们在开发体验、功能特性和使用场景等方面的差异，敬请期待！
