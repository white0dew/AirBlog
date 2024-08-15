---
title: 第九章：项目实战：创建一个任务管理应用
urlname: xwymt3c06amgkp2n
date: '2024-06-07 10:38:06'
updated: '2024-08-15 16:42:27'
description: 在这一章中，我们将通过创建一个完整的任务管理应用，来综合运用前几章所学的知识。这个项目将涵盖需求分析、功能规划、开发实现以及项目部署等多个方面，帮助你掌握实际项目开发的流程。项目介绍与规划项目需求分析与功能规划在开发一个任务管理应用之前，我们需要首先明确应用的需求和功能。以下是对项目的需求分析...
---

在这一章中，我们将通过创建一个完整的任务管理应用，来综合运用前几章所学的知识。这个项目将涵盖需求分析、功能规划、开发实现以及项目部署等多个方面，帮助你掌握实际项目开发的流程。

## 项目介绍与规划

### 项目需求分析与功能规划

在开发一个任务管理应用之前，我们需要首先明确应用的需求和功能。以下是对项目的需求分析：

- **任务添加**：用户可以添加新的任务，并输入任务的标题和描述。
- **任务删除**：用户可以删除已完成或不需要的任务。
- **任务编辑**：用户可以编辑已存在的任务，修改任务的标题和描述。
- **任务标记完成**：用户可以将任务标记为已完成。
- **任务过滤与排序**：用户可以根据任务的状态（完成/未完成）和其他条件进行过滤和排序。

### 项目目录结构的设计

在开始编码之前，我们需要设计项目的目录结构，以便于代码的组织和管理。以下是一个示例项目的目录结构：

```
task-manager/
│
├── index.html        // 项目入口文件
├── css/
│   ├── styles.css    // 样式文件
│
├── js/
│   ├── app.js        // 主应用逻辑
│   ├── tasks.js      // 任务相关逻辑
│
└── assets/
    ├── images/       // 图片资源
```

## 任务管理应用的开发

### 实现任务的添加与删除

首先，我们将实现任务的添加与删除功能。这是任务管理应用的核心功能之一。

#### 1. 创建基础 HTML 模板

在 `index.html` 文件中，创建一个简单的 HTML 模板，以便我们在里面添加任务输入框和任务列表。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Task Manager</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <div class="task-manager">
      <h1>Task Manager</h1>
      <div class="task-input">
        <input type="text" id="task-title" placeholder="Enter task title" />
        <textarea
          id="task-desc"
          placeholder="Enter task description"
        ></textarea>
        <button id="add-task-btn">Add Task</button>
      </div>
      <div class="task-list">
        <h2>Tasks</h2>
        <ul id="task-list"></ul>
      </div>
    </div>
    <script src="js/tasks.js"></script>
    <script src="js/app.js"></script>
  </body>
</html>
```

#### 2. 在 `tasks.js` 中编写任务相关逻辑

在 `tasks.js` 文件中，我们将编写与任务相关的逻辑，例如添加和删除任务。

```javascript
let tasks = [];

function addTask(title, description) {
  const task = {
    id: Date.now(),
    title,
    description,
    completed: false,
  };
  tasks.push(task);
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
    taskList.appendChild(taskItem);
  });
}
```

#### 3. 在 `app.js` 中连接 HTML 与 JavaScript

在 `app.js` 文件中，我们将连接 HTML 与 JavaScript，实现任务的添加与删除功能。

```javascript
document.getElementById("add-task-btn").addEventListener("click", () => {
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;
  if (title && description) {
    addTask(title, description);
    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
  } else {
    alert("Please enter both title and description");
  }
});
```

### 实现任务的编辑与标记完成

接下来，我们实现任务的编辑与标记完成功能。

#### 1. 在 `tasks.js` 中添加编辑和标记完成的逻辑

```javascript
function editTask(id, newTitle, newDescription) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.title = newTitle;
    task.description = newDescription;
    renderTasks();
  }
}

function toggleTaskCompletion(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}
```

#### 2. 在 `tasks.js` 中修改 `renderTasks` 函数以包含编辑和标记完成功能

```javascript
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="editTask(${task.id}, prompt('New title:', '${
      task.title
    }'), prompt('New description:', '${task.description}'))">Edit</button>
            <button onclick="toggleTaskCompletion(${task.id})">${
      task.completed ? "Undo" : "Complete"
    }</button>
        `;
    taskList.appendChild(taskItem);
  });
}
```

### 实现任务的过滤与排序

最后，我们实现任务的过滤与排序功能，帮助用户根据不同条件查看任务。

#### 1. 在 `index.html` 中添加过滤和排序的选项

```html
<div class="task-filter">
  <button onclick="filterTasks('all')">All</button>
  <button onclick="filterTasks('completed')">Completed</button>
  <button onclick="filterTasks('not-completed')">Not Completed</button>
</div>
```

#### 2. 在 `tasks.js` 中添加过滤和排序的逻辑

```javascript
function filterTasks(filter) {
  let filteredTasks;
  switch (filter) {
    case "completed":
      filteredTasks = tasks.filter((task) => task.completed);
      break;
    case "not-completed":
      filteredTasks = tasks.filter((task) => !task.completed);
      break;
    default:
      filteredTasks = tasks;
      break;
  }
  renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  filteredTasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="editTask(${task.id}, prompt('New title:', '${
      task.title
    }'), prompt('New description:', '${task.description}'))">Edit</button>
            <button onclick="toggleTaskCompletion(${task.id})">${
      task.completed ? "Undo" : "Complete"
    }</button>
        `;
    taskList.appendChild(taskItem);
  });
}
```

## 项目总结与发布

### 代码优化与重构

完成上述功能后，我们需要对代码进行优化和重构，确保代码的可读性和可维护性。例如，我们可以将重复的代码提取成函数，或者使用模块化的方式来组织代码。

### 部署应用到 GitHub Pages 或 Netlify

完成开发工作后，我们还需要将应用部署到互联网上，使其能够被访问。以下是部署应用到 GitHub Pages 和 Netlify 的步骤。

### 部署到 GitHub Pages

1.  **创建 GitHub 仓库**
首先，在 GitHub 上创建一个新的仓库，例如 `task-manager`。然后，将本地项目推送到该仓库。 
```bash
git init
git remote add origin https://github.com/your-username/task-manager.git
git add .
git commit -m "Initial commit"
git push -u origin master
```
 

2.  **配置 GitHub Pages**
在 GitHub 仓库中，点击 `Settings` -> `Pages`，在 `Source` 部分选择 `master branch`。保存设置后，GitHub Pages 会生成一个应用的访问链接。 

### 部署到 Netlify

1.  **创建 Netlify 账号并登录**
如果还没有 Netlify 账号，可以前往 [Netlify 网站](https://www.netlify.com/) 注册一个免费账号并登录。 
2.  **新建站点并关联 GitHub 仓库**
登录 Netlify 后，点击 `New site from Git`，选择 `GitHub` 作为代码托管服务，并授权 Netlify 访问你的 GitHub 仓库。选择刚刚创建的 `task-manager` 仓库。 
3.  **配置部署设置**
在部署设置中，保持默认配置。Netlify 会自动检测并构建项目。点击 `Deploy site` 后，Netlify 会自动部署项目，并生成一个访问链接。 

### 项目总结

通过本章的学习，我们从零开始创建了一个完整的任务管理应用，涵盖了从需求分析、功能规划、代码实现到最终部署的全过程。希望通过这个实战项目，你能够掌握 JavaScript 在实际项目开发中的应用，提升解决实际问题的能力。

### 进一步学习

项目完成后，你可以继续优化和扩展应用功能，例如：

- **用户身份验证**：添加用户登录和注册功能，使任务可以与特定用户关联。
- **数据持久化**：将任务数据保存到服务器端数据库，实现跨设备同步。
- **实时更新**：使用 WebSockets 或其他实时技术，实现任务的实时更新。

通过不断地实践和探索，你会发现 JavaScript 的无限可能性，成为一名更加优秀的全栈开发者。
