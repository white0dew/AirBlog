---
title: 第一章：初识 Docker
urlname: wxfb81i787twwg1d
date: '2024-06-06 21:20:13'
updated: '2024-06-27 21:01:50'
description: 1. Docker 简介Docker 的历史与发展Docker 是由 Solomon Hykes 于 2013 年在 Python 语言会议 PyCon 上首次推出的。它从此改变了软件开发和部署的方式，推动了容器化技术的发展。最初，Docker 是 dotCloud 公司（现称为 Docker...
---
### 1. Docker 简介
#### Docker 的历史与发展
Docker 是由 Solomon Hykes 于 2013 年在 Python 语言会议 PyCon 上首次推出的。它从此改变了软件开发和部署的方式，推动了容器化技术的发展。最初，Docker 是 dotCloud 公司（现称为 Docker Inc.）的一个内部项目，但由于其强大和便捷，迅速在全球开发者社区中获得了广泛关注和使用。

Docker 的核心理念是“Build, Ship, Run”（构建、传输、运行）。它通过容器化技术，使得应用程序可以在任何环境中运行，无论是开发者的本地计算机、测试服务器，还是生产环境的云服务器。

#### Docker 的应用场景

Docker 在以下几个场景中被广泛应用：

- **开发和测试环境**：开发者可以快速构建和部署应用，确保开发环境与生产环境的一致性。
- **持续集成和持续部署（CI/CD）**：借助 Docker，可以实现自动化构建、测试和部署，提高软件交付效率。
- **微服务架构**：通过将应用拆分为多个独立的微服务，每个微服务运行在独立的容器中，简化了应用的开发、测试和运维。
- **混合云和多云策略**：Docker 容器可以在任何支持 Docker 的平台上运行，使得应用可以轻松迁移到不同的云服务提供商。

#### 为什么选择 Docker

Docker 提供了许多优点，使其成为现代软件开发和部署的首选工具：

- **轻量级**：相比于虚拟机，Docker 容器更轻量，不需要完整的操作系统，从而节省了系统资源。
- **可移植性**：Docker 容器可以在任何支持 Docker 的平台上运行，确保应用环境的一致性。
- **隔离性**：每个 Docker 容器相互独立，互不干扰，从而增强了系统的安全性。
- **快速启动**：Docker 容器启动速度快，可以在几秒钟内启动，从而提高了开发和运维效率。

### 2. 安装与设置

#### 安装 Docker（Windows、macOS、Linux）

在开始使用 Docker 之前，我们需要先安装它。以下是针对不同操作系统的安装步骤：

##### Windows

1. 从 [Docker 官网](https://www.docker.com/products/docker-desktop) 下载 Docker Desktop for Windows。
2. 双击下载的安装包，按照提示完成安装。
3. 安装完成后，打开 Docker Desktop 应用，确保 Docker 已启动。

##### macOS

1. 从 [Docker 官网](https://www.docker.com/products/docker-desktop) 下载 Docker Desktop for Mac。
2. 双击下载的安装包，将 Docker 图标拖到 Applications 文件夹中。
3. 打开 Applications 文件夹中的 Docker 应用，确保 Docker 已启动。

##### Linux

在 Linux 系统上安装 Docker，最常见的是在基于 Debian 的系统（如 Ubuntu）或基于 Red Hat 的系统（如 CentOS）上进行。

**Ubuntu**

```bash
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

**CentOS**

```bash
sudo yum update
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
```

#### 配置 Docker 环境

安装完成后，我们还需要对 Docker 进行一些基本配置，以确保其正常运行。

1. **配置 Docker 镜像加速器**：由于网络原因，直接从 Docker Hub 拉取镜像可能会比较慢。可以通过配置国内镜像加速器来提高拉取速度。

在 Docker Desktop 中：

- 打开 Docker Desktop。
- 点击设置按钮，选择“Daemon”选项。
- 在“Registry mirrors”中添加国内镜像地址，如 `https://registry.docker-cn.com`。

在 Linux 中：
编辑 Docker 配置文件 `/etc/docker/daemon.json`，添加镜像加速器地址：

```json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

然后重启 Docker 服务：

```bash
sudo systemctl restart docker
```

2. **添加非 root 用户到 Docker 组**：默认情况下，只有 root 用户或具有 sudo 权限的用户才能运行 Docker 命令。可以通过将当前用户添加到 Docker 组来解决此问题。

```bash
sudo usermod -aG docker $USER
```

然后重新登录以使更改生效。

#### 验证 Docker 安装

安装和配置完成后，我们需要验证 Docker 是否安装成功。打开终端，运行以下命令：

```bash
docker --version
```

输出类似于以下内容，表示安装成功：

```bash
Docker version 20.10.7, build f0df350
```

接下来，运行一个简单的容器：

```bash
docker run hello-world
```

如果看到以下输出，说明 Docker 运行正常：

```
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

### 3. 第一个 Docker 容器

#### 编写 Hello, World 程序

为了更好地理解 Docker 的使用，我们将编写并运行一个简单的 Hello, World 程序。

首先，创建一个名为 `hello-world` 的目录，并在其中创建一个名为 `Dockerfile` 的文件，内容如下：

```dockerfile
# 使用官方的 Ubuntu 基础镜像
FROM ubuntu:latest

# 安装基础软件包
RUN apt-get update && apt-get install -y \
    software-properties-common \
    && apt-get clean

# 设置工作目录
WORKDIR /app

# 创建一个 Hello, World 脚本
RUN echo 'echo "Hello, World!"' > hello.sh

# 赋予执行权限
RUN chmod +x hello.sh

# 设置容器启动时执行的命令
CMD ["./hello.sh"]
```

#### 运行 Docker 容器

在终端中进入 `hello-world` 目录，构建 Docker 镜像：

```bash
docker build -t hello-world .
```

构建完成后，运行容器：

```bash
docker run hello-world
```

如果看到以下输出，表示容器运行成功：

```
Hello, World!
```

#### 基本的 Docker 命令

在使用 Docker 的过程中，我们会频繁地使用一些基本命令。以下是一些常用的 Docker 命令：

- `**docker build**`：用于构建镜像。例如 `docker build -t my-image .`。
- `**docker run**`：用于运行容器。例如 `docker run my-image`。
- `**docker ps**`：查看正在运行的容器。例如 `docker ps`。
- `**docker stop**`：停止正在运行的容器。例如 `docker stop container-id`。
- `**docker rm**`：删除已停止的容器。例如 `docker rm container-id`。
- `**docker rmi**`：删除镜像。例如 `docker rmi image-id`。

通过这些基本命令，我们可以开始使用 Docker 创建和管理容器，为后续的学习和应用打下坚实的基础。

---

在本章中，我们介绍了 Docker 的历史、应用场景以及为什么选择 Docker，并详细讲解了 Docker 的安装与配置过程。通过编写和运行第一个 Docker 容器，我们了解了 Docker 的基本使用方法和常用命令。

在接下来的章节中，我们将深入探讨 Docker 的基础概念、命令详解以及更多高级应用，帮助你更好地掌握 Docker 容器化技术。

**互动练习**

1. 在你的系统上安装 Docker 并配置镜像加速器。
2. 编写并运行一个简单的 Docker 容器，输出 "Hello, World!"。
3. 尝试使用一些基本的 Docker 命令，查看容器状态、停止和删除容器。

如果在操作过程中遇到任何问题，请在评论区留言讨论或指正错误，我们会及时回复并帮助你解决。

