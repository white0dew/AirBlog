---
title: 第八章：智能依赖预构建——提升加载速度
urlname: gipyn4qiqoagffad
date: '2024-06-04 15:50:40'
updated: '2024-06-04 17:14:03'
description: 在前几章中，我们已经了解了 Vite 的基础配置、开发服务器、模块化机制、插件系统以及多框架支持。本章将深入探讨 Vite 的智能依赖预构建功能，了解它如何提升开发和加载速度。依赖预构建的原理在大型项目中，依赖包的解析和打包可能是一个性能瓶颈。Vite 通过自动预构建并缓存依赖包，减少了依赖解...
---
在前几章中，我们已经了解了 Vite 的基础配置、开发服务器、模块化机制、插件系统以及多框架支持。本章将深入探讨 Vite 的智能依赖预构建功能，了解它如何提升开发和加载速度。

## 依赖预构建的原理

在大型项目中，依赖包的解析和打包可能是一个性能瓶颈。Vite 通过自动预构建并缓存依赖包，减少了依赖解析和打包的时间，从而提升了构建性能。

### 什么是依赖预构建？

依赖预构建是指在第一次启动开发服务器时，Vite 会自动将项目的依赖包进行预构建，并将其缓存起来。这样，在后续的开发过程中，Vite 可以直接使用这些缓存的依赖包，而无需每次都重新解析和打包。

### 预构建的优势

- **提升初次加载速度**：通过预构建依赖包，减少了初次加载时的解析和打包时间。
- **减少模块解析开销**：预构建后的依赖包可以直接加载，避免了运行时的模块解析开销。
- **缓存优化**：Vite 会将预构建的依赖包缓存起来，减少了重复解析和打包的开销。

## 配置依赖预构建

你可以在 `vite.config.js` 中配置依赖预构建的行为，例如指定需要预构建的依赖包、排除不需要预构建的依赖包等。

### 指定预构建依赖

通过 `optimizeDeps.include` 选项，可以指定需要预构建的依赖包：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 配置依赖预构建
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['axios', '@vueuse/core']
  }
})
```

在这个示例中，我们指定 `axios` 和 `@vueuse/core` 作为需要预构建的依赖包。

### 排除不需要预构建的依赖

通过 `optimizeDeps.exclude` 选项，可以排除不需要预构建的依赖包：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 配置依赖预构建
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['your-slow-dependency']
  }
})
```

在这个示例中，我们排除了 `your-slow-dependency` 依赖包。

### 预构建配置示例

以下是一个完整的预构建配置示例：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 完整的预构建配置
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['axios', '@vueuse/core'],
    exclude: ['your-slow-dependency']
  }
})
```

## 依赖预构建的实际应用

### 优化大型项目

在大型项目中，依赖包的数量和复杂度较高，预构建可以显著提升构建和开发性能。以下是一个优化大型项目的示例：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 优化大型项目的预构建配置
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lodash', 'moment', 'react-router-dom'],
    exclude: ['@my-org/my-large-dependency']
  }
})
```

在这个示例中，我们指定了 `lodash`、`moment` 和 `react-router-dom` 作为需要预构建的依赖包，并排除了一个大型的内部依赖包 `@my-org/my-large-dependency`。

### 动态依赖

Vite 的预构建功能也支持动态依赖，可以根据项目的实际使用情况进行优化。以下是一个动态依赖优化的示例：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 动态依赖的预构建配置
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['dayjs', 'lodash-es'],
    exclude: (id) => id.includes('large-lib')
  }
})
```

在这个示例中，我们动态排除了依赖包名称中包含 `large-lib` 的依赖。

## Vite 与常规 React 构建工具的对比

在这一章节的末尾，我们来对比一下 Vite 与常规 React 构建工具（如 Create React App）在依赖管理上的区别：

### 依赖预构建

-  **Vite**： 
   - 自动预构建依赖，提升初次加载速度。
   - 支持 include 和 exclude 选项，灵活配置预构建行为。
-  **常规 React 构建工具**： 
   - 通常不具备自动预构建功能，需要手动配置依赖管理。
   - 依赖解析和打包时间较长，影响开发效率。

### 缓存优化

-  **Vite**： 
   - 预构建依赖并缓存，减少重复解析和打包的开销。
   - 缓存优化提升了开发和构建性能。
-  **常规 React 构建工具**： 
   - 依赖缓存机制较为复杂，配置繁琐。
   - 需要额外的缓存优化配置，增加开发成本。

### 开发体验

-  **Vite**： 
   - 极速冷启动和高效的热模块替换（HMR），提供流畅的开发体验。
   - 依赖预构建和缓存优化，进一步提升开发效率。
-  **常规 React 构建工具**： 
   - 启动速度较慢，HMR 效率较低。
   - 依赖管理和缓存优化较为复杂，影响开发体验。

## 结论

通过这一章的学习，你应该已经掌握了 Vite 的智能依赖预构建功能。利用预构建和缓存优化，Vite 可以显著提升开发和加载速度，特别是在大型项目中，依赖预构建功能尤为重要。下一章，我们将对 Vite 与常规 React 构建工具、Next.js 进行详细对比，敬请期待！
