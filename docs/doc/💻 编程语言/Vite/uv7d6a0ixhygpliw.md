---
title: 第二章：初识 Vite——安装与配置
urlname: uv7d6a0ixhygpliw
date: '2024-06-04 13:24:06'
updated: '2024-06-04 13:25:47'
description: 在上一章，我们了解了 Vite 的核心优势和背景。这一章将带你从零开始，安装和配置 Vite 项目，让你快速体验到这款工具所带来的极速开发体验。初始化 Vite 项目Vite 提供了一个简单的命令行工具，可以帮助我们快速初始化一个新项目。以下是使用 npm 初始化一个 Vite 项目的步骤： ...
---

在上一章，我们了解了 Vite 的核心优势和背景。这一章将带你从零开始，安装和配置 Vite 项目，让你快速体验到这款工具所带来的极速开发体验。

### 初始化 Vite 项目

Vite 提供了一个简单的命令行工具，可以帮助我们快速初始化一个新项目。以下是使用 npm 初始化一个 Vite 项目的步骤：

1.  **创建项目目录**： 
```shell
npm init vite@latest my-vite-app
```
 

2.  **进入项目目录**： 
```shell
cd my-vite-app
```
 

3.  **安装依赖**： 
```shell
npm install
```
 

你也可以选择不同的模板来初始化项目，例如 Vue、React、Svelte 等。默认情况下，Vite 会使用 Vue.js 模板。

### 配置项目

Vite 的配置文件是 `vite.config.js`，你可以在其中配置各种选项，如插件、路径别名、构建选项等。下面是一个基本的配置示例：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 基本的 Vite 配置，使用 Vue 插件
export default defineConfig({
  plugins: [vue()]
})
```

#### 配置插件

Vite 通过插件系统提供了强大的扩展能力。你可以在 `vite.config.js` 中配置插件，例如 Vue 插件、React 插件等。以下是使用 Vue 插件的示例：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 基本的 Vite 配置，使用 Vue 插件
export default defineConfig({
  plugins: [vue()]
})
```

如果你想使用 React 插件，可以这样配置：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 基本的 Vite 配置，使用 React 插件
export default defineConfig({
  plugins: [react()]
})
```

#### 配置路径别名

在大型项目中，路径别名可以帮助你简化模块的导入路径。你可以在 `vite.config.js` 中配置路径别名：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 基本的 Vite 配置，使用 Vue 插件，并配置路径别名
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
```

这样，你就可以使用 `@` 作为 `src` 目录的别名：

```javascript
// 使用路径别名导入组件
import MyComponent from '@/components/MyComponent.vue'
```

### 启动开发服务器

配置好项目之后，我们可以启动 Vite 的开发服务器：

```shell
npm run dev
```

启动开发服务器后，你可以在浏览器中访问 `http://localhost:3000`，开始开发你的应用。Vite 的开发服务器具有以下特点：

- **极速冷启动**：无需预先打包所有文件。
- **热模块替换（HMR）**：代码修改后的变化几乎能实时反映在页面中，无需刷新整个页面。
- **智能依赖预构建**：自动预构建并缓存依赖包，提升开发性能。

### 配置开发服务器

你可以在 `vite.config.js` 中配置开发服务器的相关选项，例如服务器端口、代理等：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 修改端口配置
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4000, // 修改默认端口为4000
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### 构建生产版本

开发完成后，你可以使用 Vite 构建生产版本：

```shell
npm run build
```

构建完成后，Vite 会在 `dist` 目录下生成生产版本的文件。你可以将这些文件部署到静态服务器或 CDN 上。

### 轻松幽默的讲解

Vite 的安装和配置就像是泡一杯咖啡——简单、快速、效果惊人。你只需几行命令，就能启动一个高效的开发环境。不需要复杂的配置，不需要漫长的等待，Vite 让你的开发体验畅快无比。

“配置 Vite 就像泡一杯咖啡，步骤简单，效果惊人！”

### Vite 与常规 React 构建工具的对比

在这一章节的末尾，我们来对比一下 Vite 与常规 React 构建工具（如 Create React App）的区别：

#### 开发体验

-  **Vite**： 
   - 极速冷启动：利用浏览器原生 ES 模块支持，实现极快的冷启动速度。
   - 高效的热模块替换（HMR）：代码修改后的变化几乎能实时反映在页面中。
-  **常规 React 构建工具**： 
   - 启动速度较慢：需要预先打包所有文件，启动时间较长。
   - HMR 效率较低：代码修改后的变化需要较长时间才能反映在页面中。

#### 配置复杂度

- **Vite**：配置简洁直观，插件系统灵活强大。
- **常规 React 构建工具**：配置复杂，特别是在需要自定义配置时，需要进行大量调整。

#### 构建性能

- **Vite**：使用 Rollup 进行生产构建，构建速度快，性能优越。
- **常规 React 构建工具**：通常使用 Webpack 进行构建，构建时间较长，性能相对较低。

### 结论

通过这一章的学习，你应该已经掌握了 Vite 的基本安装和配置方法。无论是极速冷启动、高效的热模块替换，还是简洁直观的配置方式，Vite 都展示了它作为现代前端构建工具的强大之处。下一章，我们将深入探讨 Vite 的开发服务器及其强大的功能，敬请期待！
