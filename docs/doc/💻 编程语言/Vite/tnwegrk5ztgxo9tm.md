---
title: 第五章：构建生产版本——Rollup 的威力
urlname: tnwegrk5ztgxo9tm
date: '2024-06-04 13:29:54'
updated: '2024-06-04 17:13:37'
description: 在上一章中，我们深入探讨了 Vite 的模块化机制和热模块替换（HMR）。本章将聚焦于 Vite 的生产构建功能，了解它如何利用 Rollup 提供高效且灵活的构建能力。构建生产版本在开发完成后，你需要将项目构建成生产版本，以便部署到服务器或 CDN。Vite 使用 Rollup 作为生产构建...
---
在上一章中，我们深入探讨了 Vite 的模块化机制和热模块替换（HMR）。本章将聚焦于 Vite 的生产构建功能，了解它如何利用 Rollup 提供高效且灵活的构建能力。

## 构建生产版本

在开发完成后，你需要将项目构建成生产版本，以便部署到服务器或 CDN。Vite 使用 Rollup 作为生产构建工具，这使得构建过程高效且灵活。

### 使用 Vite 构建生产版本

要构建生产版本，只需在项目根目录下运行以下命令：

```shell
npm run build
```

构建完成后，Vite 会在 `dist` 目录下生成生产版本的文件。这些文件经过优化和压缩，可以直接部署到服务器或 CDN 上。

### 构建配置

你可以在 `vite.config.js` 中配置构建相关的选项。例如，配置输出目录、代码拆分等：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 配置构建选项
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', // 指定输出目录
    sourcemap: true, // 生成 source map 文件
    rollupOptions: {
      input: {
        main: 'index.html',
        nested: 'nested/index.html'
      },
      output: {
        // 自定义输出文件名格式
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
```

在这个示例中，我们指定了输出目录为 `dist`，生成 source map 文件，并自定义了输出文件的命名格式。

### 代码拆分

Rollup 提供了强大的代码拆分功能，可以将项目拆分成多个独立的模块，优化加载性能。你可以在 `rollupOptions.output` 中配置代码拆分选项：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 配置代码拆分
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 node_modules 中的依赖分离到单独的 chunk 中
          vendor: ['vue', 'axios']
        }
      }
    }
  }
})
```

在这个示例中，我们将 `vue` 和 `axios` 作为 `vendor` chunk 分离出来，减少了主 bundle 的大小，从而提高了加载性能。

## 优化构建性能

除了基础配置外，Vite 还提供了一些优化构建性能的方法，例如压缩代码、移除无用代码等。

### 压缩代码

你可以使用 Vite 内置的压缩插件进行代码压缩。默认情况下，Vite 会在构建过程中使用 Terser 进行代码压缩。你可以在 `build` 选项中配置压缩参数：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 配置代码压缩
export default defineConfig({
  plugins: [vue()],
  build: {
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true // 移除 debugger 语句
      }
    }
  }
})
```

### 移除无用代码

在生产构建中，移除无用代码可以显著减少 bundle 的大小。你可以使用 Rollup 的 tree-shaking 功能，自动移除未使用的代码：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 配置 tree-shaking
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      treeshake: true
    }
  }
})
```

## Vite 与常规 React 构建工具的对比

在这一章节的末尾，我们来对比一下 Vite 与常规 React 构建工具（如 Create React App）的区别：

### 构建性能

-  **Vite**： 
   - 使用 Rollup 进行生产构建，构建速度快，性能优越。
   - 支持代码拆分、代码压缩和 tree-shaking 等优化技术。
-  **常规 React 构建工具**： 
   - 通常使用 Webpack 进行构建，构建时间较长，性能相对较低。
   - 尽管 Webpack 也支持代码拆分和压缩，但配置较为复杂。

### 配置复杂度

- **Vite**：配置简洁直观，插件系统灵活强大，构建配置易于理解和修改。
- **常规 React 构建工具**：配置复杂，特别是在需要自定义配置时，需要进行大量调整和调试。

### 开发体验

- **Vite**：极速冷启动、高效的热模块替换（HMR）和智能的依赖预构建，提供了流畅的开发体验。
- **常规 React 构建工具**：启动速度较慢，HMR 效率较低，开发体验相对欠佳。

## 结论

通过这一章的学习，你应该已经掌握了 Vite 的生产构建功能。利用 Rollup 提供的高效构建能力和丰富的优化选项，Vite 可以显著提升构建性能，减少 bundle 大小。下一章，我们将深入探讨 Vite 的插件系统，了解如何扩展 Vite 的功能，敬请期待！
