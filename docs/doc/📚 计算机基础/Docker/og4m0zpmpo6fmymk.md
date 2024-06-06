---
title: 第二章：Docker 基础概念
urlname: og4m0zpmpo6fmymk
date: '2024-06-06 21:21:13'
updated: '2024-06-06 21:21:28'
description: Docker 的基本概念是理解和有效使用 Docker 的关键。本章将深入探讨 Docker 的基本架构、镜像和容器等核心概念。通过学习这些内容，读者将能够更好地理解 Docker 的工作原理，并为后续的高级应用打下坚实的基础。1. Docker 的基本架构Docker 的架构由多个组件组成，...
---
Docker 的基本概念是理解和有效使用 Docker 的关键。本章将深入探讨 Docker 的基本架构、镜像和容器等核心概念。通过学习这些内容，读者将能够更好地理解 Docker 的工作原理，并为后续的高级应用打下坚实的基础。

## 1. Docker 的基本架构

Docker 的架构由多个组件组成，其中最核心的组件包括 Docker 引擎、Docker 镜像、Docker 容器和 Docker 仓库。我们将逐一介绍这些组件的功能和作用。

### Docker 引擎

Docker 引擎是 Docker 的核心组件，它负责构建、运行和管理容器。Docker 引擎主要由以下几个部分组成：

1. **守护进程（Daemon）**：负责管理容器的生命周期，包括创建、启动和停止容器。
2. **API 接口**：提供与 Docker 守护进程通信的接口，支持 HTTP REST API。
3. **客户端（Client）**：提供与用户交互的命令行工具（CLI），通过 API 与守护进程通信。

以下是 Docker 引擎的基本架构示意图：


### Docker 镜像

Docker 镜像是运行容器的模板。每个镜像包含了应用程序及其运行环境，镜像是只读的，可以通过层次结构进行扩展和管理。

### Docker 容器

Docker 容器是镜像的运行实例。容器是轻量级的、独立且可移植的，容器之间彼此隔离，它们共享主机的内核。

### Docker 仓库

Docker 仓库用于存储和分发镜像。Docker 官方提供了公共仓库 Docker Hub，用户也可以搭建私有仓库。

## 2. Docker 镜像

Docker 镜像是构建和运行容器的基础。本节将详细介绍镜像的构成、获取与管理以及创建自定义镜像的过程。

### 镜像的构成与层次

Docker 镜像由多个只读层组成，每一层都基于上一层进行构建。镜像层的这种结构使得镜像的构建和传输更加高效。以下是镜像层次结构的示意图：


### 获取与管理镜像

Docker 提供了一系列命令用于获取和管理镜像：

- **获取镜像**：使用 `docker pull` 命令从仓库拉取镜像。例如，拉取官方的 Ubuntu 镜像：
```bash
docker pull ubuntu:latest
```
 

- **查看镜像**：使用 `docker images` 命令查看本地的所有镜像：
```bash
docker images
```
 

- **删除镜像**：使用 `docker rmi` 命令删除镜像：
```bash
docker rmi ubuntu:latest
```
 

### 创建自定义镜像

通过编写 Dockerfile，可以自定义构建镜像。以下是一个简单的 Dockerfile 示例：

```dockerfile
# 使用官方的 Node.js 镜像作为基础镜像
FROM node:14

# 设置工作目录
WORKDIR /app

# 复制应用程序的依赖文件
COPY package.json /app

# 安装依赖
RUN npm install

# 复制应用程序的源代码
COPY . /app

# 暴露端口
EXPOSE 3000

# 启动应用程序
CMD ["node", "index.js"]
```

构建自定义镜像：

```bash
docker build -t my-node-app .
```

## 3. Docker 容器

Docker 容器是基于镜像创建的运行实例。本节将介绍容器的生命周期、启动与停止容器、以及容器的网络与存储。

### 容器的生命周期

容器的生命周期包括创建、启动、停止、重启和删除。以下是容器生命周期的示意图：


### 启动与停止容器

使用以下命令启动和停止容器：

-  **启动容器**：使用 `docker run` 命令启动容器。例如，启动一个基于 Ubuntu 镜像的容器： 
```bash
docker run -it ubuntu:latest
```

其中，`-it` 选项用于交互式终端。 

-  **停止容器**：使用 `docker stop` 命令停止容器。首先需要获取容器 ID 或名称： 
```bash
docker ps
```

然后停止容器： 
```bash
docker stop <container_id_or_name>
```
 

### 容器的网络与存储

容器的网络配置和数据管理是确保容器化应用正常运行的重要部分。

-  **网络配置**：Docker 提供了多种网络模式，包括 bridge、host 和 overlay 等。可以使用 `docker network` 命令管理网络。 
```bash
docker network create my-bridge-network
```
 

-  **存储管理**：Docker 提供了数据卷和绑定挂载两种方式管理数据。数据卷用于持久化数据，绑定挂载用于共享主机文件系统。以下是创建和挂载数据卷的示例： 
```bash
docker volume create my-volume
docker run -v my-volume:/data ubuntu
```
 

通过以上内容，读者应该已经掌握了 Docker 的基本概念和操作。接下来，我们将深入探索 Docker 的命令详解。

