---
title: 第四章：Dockerfile 与镜像构建
urlname: lbhwlgqkvk3gfyui
date: '2024-06-06 21:21:45'
updated: '2024-06-06 21:22:00'
description: Dockerfile 是 Docker 的核心功能之一，通过它我们能够自动化地构建自定义镜像。在这一章，我们将深入探讨 Dockerfile 的基本语法和使用方法，并通过实际案例展示如何构建自定义镜像。1. Dockerfile 基础什么是 DockerfileDockerfile 是一个文本...
---
Dockerfile 是 Docker 的核心功能之一，通过它我们能够自动化地构建自定义镜像。在这一章，我们将深入探讨 Dockerfile 的基本语法和使用方法，并通过实际案例展示如何构建自定义镜像。

## 1. Dockerfile 基础

### 什么是 Dockerfile

Dockerfile 是一个文本文件，其中包含了一系列的指令，这些指令定义了一个 Docker 镜像的构建过程。每个指令对应一个镜像层，最终形成一个可以执行的 Docker 镜像。

### Dockerfile 的基本语法

Dockerfile 的基本语法相对简单，但它具有很强的表达能力。下面是一些常用的指令：

- `FROM`：指定基础镜像
- `RUN`：执行命令
- `COPY` 或 `ADD`：复制文件到镜像中
- `CMD` 或 `ENTRYPOINT`：指定容器启动时的命令
- `EXPOSE`：暴露端口
- `ENV`：设置环境变量
- `WORKDIR`：设置工作目录

### 编写第一个 Dockerfile

我们将编写一个简单的 Dockerfile 来构建一个包含 Node.js 环境的镜像。

```dockerfile
# 使用官方的 Node.js 镜像作为基础镜像
FROM node:14

# 创建并设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制应用代码
COPY . .

# 暴露应用端口
EXPOSE 8080

# 启动应用
CMD ["node", "app.js"]
```

以上 Dockerfile 文件定义了一个以 Node.js 镜像为基础的自定义镜像，它将应用代码复制到镜像中并安装所需的依赖，最后设置启动命令。

## 2. 构建自定义镜像

### 使用 `docker build` 构建镜像

使用 `docker build` 命令可以根据 Dockerfile 构建镜像。以下是其基本用法：

```shell
docker build -t my-node-app .
```

参数解释：

- `-t my-node-app`：为镜像指定标签 `my-node-app`
- `.`：指定 Dockerfile 的路径（当前目录）

### 多阶段构建

多阶段构建是一种优化镜像大小的方法，通过在构建过程中使用多个 `FROM` 指令，可以有效减少最终镜像的体积。

```dockerfile
# 第一阶段：构建阶段
FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 第二阶段：生产阶段
FROM node:14
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080
CMD ["node", "dist/app.js"]
```

上述 Dockerfile 分为两个阶段：

1. 构建阶段：编译代码，生成构建产物
2. 生产阶段：仅复制构建产物，大大减小了镜像体积

### 镜像优化与缓存机制

Docker 在构建镜像时使用分层缓存机制，可以加速构建过程。为了充分利用缓存机制，我们应尽量将不经常变化的指令放在 Dockerfile 的前面。

## 3. Dockerfile 实践

### 使用 Dockerfile 构建 Web 应用镜像

我们将构建一个简单的 Node.js Web 应用镜像。

1. 创建项目目录并初始化 Node.js 项目：

```shell
mkdir my-web-app
cd my-web-app
npm init -y
```

2. 安装 Express：

```shell
npm install express
```

3. 创建 `app.js` 文件：

```javascript
const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello, Docker!");
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
```

4. 编写 Dockerfile：

```dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "app.js"]
```

5. 构建镜像并运行容器：

```shell
docker build -t my-web-app .
docker run -p 8080:8080 my-web-app
```

访问 `http://localhost:8080`，你将看到 "Hello, Docker!"。

### 使用 Dockerfile 构建数据库镜像

我们将使用官方的 MySQL 镜像并进行一些自定义配置。

1. 创建 Dockerfile：

```dockerfile
FROM mysql:5.7
ENV MYSQL_ROOT_PASSWORD=my-secret-pw
ENV MYSQL_DATABASE=mydatabase
COPY ./init.sql /docker-entrypoint-initdb.d/
```

2. 创建 `init.sql` 文件，以初始化数据库：

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
```

3. 构建镜像并运行容器：

```shell
docker build -t my-mysql .
docker run -d -p 3306:3306 --name my-mysql-container my-mysql
```

通过这些示例，你可以学会如何使用 Dockerfile 构建和自定义各种类型的应用镜像。

