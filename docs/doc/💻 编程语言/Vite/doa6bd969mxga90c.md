---
title: 第十一章：实战项目——用 Vite 构建一个完整的应用
urlname: doa6bd969mxga90c
date: '2024-06-04 15:49:39'
updated: '2024-06-04 17:16:04'
description: 通过前几章的学习，你已经对 Vite 的各种功能和特性有了深入了解。本章将带你进入实战项目，使用 Vite 构建一个完整的任务管理应用（Todo App）。我们将从项目规划开始，一步步实现任务管理的各个功能。项目规划功能需求我们将构建一个简单的任务管理应用，包含以下功能：任务的添加任务的删除任...
---

通过前几章的学习，你已经对 Vite 的各种功能和特性有了深入了解。本章将带你进入实战项目，使用 Vite 构建一个完整的任务管理应用（Todo App）。我们将从项目规划开始，一步步实现任务管理的各个功能。

## 项目规划

### 功能需求

我们将构建一个简单的任务管理应用，包含以下功能：

- 任务的添加
- 任务的删除
- 任务的标记完成

### 技术选型

- 前端框架：Vue.js
- 状态管理：Vuex
- 路由管理：Vue Router

## 项目初始化

### 创建项目

使用 Vite 快速初始化一个 Vue 项目：

```shell
npm init vite@latest todo-app --template vue
cd todo-app
npm install
```

### 配置项目

在 `vite.config.js` 中配置 Vue 插件：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
```

## 开发过程

### 目录结构

为了更好地组织项目，我们将采用如下目录结构：

```
todo-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── store/
│   ├── views/
│   ├── App.vue
│   ├── main.js
├── index.html
├── vite.config.js
└── package.json
```

### 安装依赖

我们需要安装 Vuex 和 Vue Router：

```shell
npm install vuex@next vue-router@next
```

### 配置 Vuex

在 `src/store` 目录下创建 `index.js` 文件，并配置 Vuex：

```javascript
// src/store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: []
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task)
    },
    TOGGLE_TASK(state, taskId) {
      const task = state.tasks.find(task => task.id === taskId)
      if (task) {
        task.completed = !task.completed
      }
    },
    REMOVE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId)
      }
    },
    actions: {
      addTask({ commit }, task) {
        commit('ADD_TASK', task)
      },
      toggleTask({ commit }, taskId) {
        commit('TOGGLE_TASK', taskId)
      },
      removeTask({ commit }, taskId) {
        commit('REMOVE_TASK', taskId)
      }
    },
    getters: {
      allTasks(state) {
        return state.tasks
      }
    }
  })
```

### 配置 Vue Router

在 `src` 目录下创建 `router.js` 文件，并配置 Vue Router：

```javascript
// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### 创建组件

#### 创建任务列表组件

在 `src/components` 目录下创建 `TodoList.vue` 文件：

```vue
<!-- src/components/TodoList.vue -->
<template>
  <div>
    <h1>Todo List</h1>
    <input v-model="newTask" placeholder="Add a new task" @keyup.enter="addTask" />
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <span :class="{ done: task.completed }">{{ task.text }}</span>
        <button @click="toggleTask(task.id)">✔</button>
        <button @click="removeTask(task.id)">✖</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      newTask: ''
    }
  },
  computed: {
    ...mapState(['tasks'])
  },
  methods: {
    ...mapActions(['addTask', 'toggleTask', 'removeTask']),
    addTask() {
      if (this.newTask.trim()) {
        this.addTask({ id: Date.now(), text: this.newTask, completed: false });
        this.newTask = '';
      }
    }
  }
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
button {
  margin-left: 10px;
}
</style>
```

#### 创建视图组件

在 `src/views` 目录下创建 `Home.vue` 文件：

```vue
<!-- src/views/Home.vue -->
<template>
  <div>
    <TodoList />
  </div>
</template>

<script>
import TodoList from '../components/TodoList.vue'

export default {
  components: {
    TodoList
  }
}
</script>
```

### 主入口文件

在 `src` 目录下的 `main.js` 中配置并启动应用：

```javascript
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
```

### 配置主组件

在 `src` 目录下的 `App.vue` 中配置主组件：

```vue
<!-- src/App.vue -->
<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 全局样式 */
</style>
```

## 项目构建与部署

### 构建生产版本

开发完成后，你可以使用 Vite 构建生产版本：

```shell
npm run build
```

构建完成后，Vite 会在 `dist` 目录下生成生产版本的文件。你可以将这些文件部署到静态服务器或 CDN 上。

### 部署到静态服务器或 CDN

这里以部署到 GitHub Pages 为例：

1.  安装 `gh-pages` 包： 
```shell
npm install gh-pages --save-dev
```
 

2.  在 `package.json` 中添加部署脚本： 
```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "gh-pages -d dist"
  }
}
```
 

3.  构建并部署项目： 
```shell
npm run build
npm run deploy
```
 

这样，你的任务管理应用就成功部署到了 GitHub Pages。

## 结论

通过这一章的实战项目，你应该已经掌握了如何使用 Vite 构建一个完整的任务管理应用。我们从项目规划、安装依赖、配置项目、开发功能到最终部署，全面覆盖了一个完整项目的开发流程。Vite 的高效开发体验和简洁配置无疑为我们的开发工作带来了极大的便利。

至此，我们的 Vite 实战项目章节也告一段落了。如果你对 Vite 还有更多的疑问或需要进一步的信息，欢迎在评论区交流！
