---
title: 第四章：模块化与 HMR——瞬间热加载
urlname: lgt6zenie0apvc1y
date: '2024-06-04 13:28:00'
updated: '2024-06-04 13:29:52'
description: 在前一章中，我们了解了 Vite 的开发服务器及其强大功能。本章将深入探讨 Vite 的模块化机制和热模块替换（HMR），让你在开发过程中享受瞬间热加载的便利。模块化开发Vite 利用浏览器原生的 ES 模块支持，实现了高效的模块化开发。ES 模块（ESM）是现代 JavaScript 的一种...
---

在前一章中，我们了解了 Vite 的开发服务器及其强大功能。本章将深入探讨 Vite 的模块化机制和热模块替换（HMR），让你在开发过程中享受瞬间热加载的便利。

## 模块化开发

Vite 利用浏览器原生的 ES 模块支持，实现了高效的模块化开发。ES 模块（ESM）是现代 JavaScript 的一种模块系统，它具有以下优势：

1. **静态分析**：ES 模块在编译时就可以解析其依赖关系，避免了运行时解析的开销。
2. **按需加载**：ES 模块支持按需加载，可以减少初次加载时间。
3. **浏览器支持**：现代浏览器原生支持 ES 模块，避免了额外的打包开销。

### ES 模块的基本使用

在 Vite 项目中，你可以直接使用 ES 模块进行模块化开发。以下是一个基本的使用示例：

```javascript
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

```vue
<!-- src/App.vue -->
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

在这个示例中，我们将 `App.vue` 作为模块导入到了 `main.js` 中，并使用 `createApp` 方法将其挂载到页面上。这种模块化的开发方式，使得代码分离更加清晰，维护更加方便。

## 热模块替换（HMR）

热模块替换（HMR）是 Vite 的一大特色，它允许在运行时替换、添加或删除模块，而无需重新加载整个页面。这极大地提升了开发效率，使得开发过程更加流畅。

### HMR 的实现原理

Vite 的 HMR 基于 WebSocket 实现。当你修改代码时，Vite 开发服务器会通过 WebSocket 通知浏览器更新相应的模块。浏览器接收到更新通知后，只会重新加载修改的模块，而不是整个页面。

### HMR 的使用示例

以下是一个简单的 HMR 使用示例：

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

### HMR 的高级用法

除了基本的模块热替换，Vite 还支持组件的局部热替换。这意味着你可以在不丢失组件状态的情况下，更新组件的部分内容。例如，当你修改组件的模板或样式时，Vite 只会替换相应的部分，而不会重新加载整个组件。

```vue
<!-- src/components/Counter.vue -->
<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
```

在这个示例中，你可以修改按钮的样式或文本，而不影响计数器的状态。HMR 会智能地更新组件的部分内容，而不是整个组件。

## 配置 HMR

Vite 的 HMR 默认启用，无需额外配置。如果你希望自定义 HMR 的行为，可以在 `vite.config.js` 中进行配置：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 配置 HMR
export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: {
      overlay: false, // 禁用错误覆盖
      clientPort: 443 // 自定义客户端端口
    }
  }
})
```

在这个示例中，我们禁用了错误覆盖，并自定义了客户端的端口。

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

通过这一章的学习，你应该已经掌握了 Vite 的模块化机制和热模块替换（HMR）。Vite 的高效 HMR 功能，使得开发过程更加流畅，提升了开发效率。下一章，我们将深入探讨 Vite 的生产构建功能，敬请期待！

