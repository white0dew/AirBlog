---
title: 第三章：极速开发——Vite 的开发服务器
urlname: echszg78wl78ob1o
date: '2024-06-04 13:25:46'
updated: '2024-06-04 13:28:01'
description: 在上一章中，我们已经学习了如何安装和配置 Vite。本章将深入探讨 Vite 的开发服务器，它的速度和高效的热模块替换（HMR）功能会让你的开发体验如虎添翼。启动开发服务器启动 Vite 的开发服务器非常简单。你只需在项目根目录下运行以下命令：npm run dev默认情况下，Vite 的开发...
---


在上一章中，我们已经学习了如何安装和配置 Vite。本章将深入探讨 Vite 的开发服务器，它的速度和高效的热模块替换（HMR）功能会让你的开发体验如虎添翼。

## 启动开发服务器

启动 Vite 的开发服务器非常简单。你只需在项目根目录下运行以下命令：

```shell
npm run dev
```

默认情况下，Vite 的开发服务器会在 `http://localhost:5173` 上运行。如果你希望更改默认端口，可以在 `vite.config.js` 中进行配置：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 修改默认端口为4000
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4000
  }
})
```

轻松幽默的讲解：

> “启动 Vite 的开发服务器就像打开电视一样简单快捷，按下电源按钮，你的开发旅程就开始了！”


## 实时预览与自动刷新

Vite 的开发服务器提供了强大的实时预览和自动刷新功能。当你修改代码时，页面会自动更新，无需手动刷新。这一切都得益于 Vite 的热模块替换（HMR）功能。

### 热模块替换（HMR）

HMR 是开发过程中一个非常重要的功能，它能显著提升开发效率。Vite 的 HMR 基于原生 ES 模块，性能优越，代码修改后的变化几乎能实时反映在页面中，无需刷新整个页面。

### 实现原理

Vite 通过 WebSocket 连接实现 HMR，当你修改代码时，开发服务器会通知浏览器更新相应的模块。浏览器接收到更新通知后，只会重新加载修改的模块，而不是整个页面。

### 代码示例与注释

假设我们有一个简单的 Vue 组件：

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
      message: 'Hello Vite!'
    }
  }
}
</script>
```

当你修改 `message` 的值时，页面会自动更新，无需刷新整个页面。例如，将 `message` 修改为 "Hello Vite and Vue!"：

```vue
export default {
  data() {
    return {
      message: 'Hello Vite and Vue!'
    }
  }
}
```

保存文件后，浏览器会自动更新显示新的消息。

轻松幽默的讲解：

> “Vite 的 HMR 就像魔法师的咒语，让你的代码修改瞬间生效。没有什么比看到代码即时变化更令人愉悦的了！”


## 配置开发服务器

你可以通过 `vite.config.js` 配置开发服务器的相关选项，例如服务器端口、代理等。

### 修改端口

如果你希望更改默认端口，可以在 `vite.config.js` 中进行如下配置：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 修改默认端口为4000
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4000
  }
})
```

### 配置代理

在开发过程中，你可能需要代理某些 API 请求到后端服务器。你可以通过 `server.proxy` 选项配置代理：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 配置代理
export default defineConfig({
  plugins: [vue()],
  server: {
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

这样，所有以 `/api` 开头的请求都会被代理到 `http://localhost:5000`，并移除路径前缀 `/api`。

### 配置 HTTPS

如果你需要在开发服务器上启用 HTTPS，可以通过以下配置实现：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 启用 HTTPS
export default defineConfig({
  plugins: [vue()],
  server: {
    https: true
  }
})
```

你也可以指定自定义的 SSL 证书和密钥：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

// 启用 HTTPS 并指定自定义证书和密钥
export default defineConfig({
  plugins: [vue()],
  server: {
    https: {
      key: fs.readFileSync('./cert/key.pem'),
      cert: fs.readFileSync('./cert/cert.pem')
    }
  }
})
```

轻松幽默的讲解：

> “配置开发服务器就像点单一样简单，你只需告诉 Vite 你想要的‘口味’，它就能完美呈现！”


## Vite 与常规 React 构建工具的对比

在这一章节的末尾，我们来对比一下 Vite 与常规 React 构建工具（如 Create React App）的区别：

### 开发体验

-  **Vite**： 
   - 极速冷启动：利用浏览器原生 ES 模块支持，实现极快的冷启动速度。
   - 高效的热模块替换（HMR）：代码修改后的变化几乎能实时反映在页面中。
-  **常规 React 构建工具**： 
   - 启动速度较慢：需要预先打包所有文件，启动时间较长。
   - HMR 效率较低：代码修改后的变化需要较长时间才能反映在页面中。

### 配置复杂度

- **Vite**：配置简洁直观，插件系统灵活强大。
- **常规 React 构建工具**：配置复杂，特别是在需要自定义配置时，需要进行大量调整。

### 构建性能

- **Vite**：使用 Rollup 进行生产构建，构建速度快，性能优越。
- **常规 React 构建工具**：通常使用 Webpack 进行构建，构建时间较长，性能相对较低。

### 结论

通过这一章的学习，你应该已经掌握了 Vite 开发服务器的强大功能。极速冷启动、高效的热模块替换以及灵活的配置选项让 Vite 成为了现代前端开发的不二选择。下一章，我们将深入探讨 Vite 的模块化与热模块替换（HMR），敬请期待！
