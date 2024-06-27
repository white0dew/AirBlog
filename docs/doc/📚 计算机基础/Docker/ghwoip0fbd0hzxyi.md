---
title: 第五章：Docker Compose
urlname: ghwoip0fbd0hzxyi
date: '2024-06-06 21:22:00'
updated: '2024-06-27 21:03:25'
description: Docker Compose 是用于定义和运行多容器 Docker 应用程序的一种工具。通过使用一个 YAML 文件来配置应用程序的服务，您可以使用一个单一的命令来创建和启动所有的服务。Docker Compose 解决了以下问题：多容器应用的管理：当一个应用程序需要多个容器时，手动管理这些容...
---

Docker Compose 是用于定义和运行多容器 Docker 应用程序的一种工具。通过使用一个 YAML 文件来配置应用程序的服务，您可以使用一个单一的命令来创建和启动所有的服务。

Docker Compose 解决了以下问题：

1. **多容器应用的管理**：当一个应用程序需要多个容器时，手动管理这些容器会变得复杂，而 Docker Compose 可以轻松地管理这些容器。
2. **环境隔离**：每个项目都有独立的环境，这样不同项目之间不会有冲突。
3. **版本控制配置**：使用 Docker Compose 文件，可以将配置版本控制，使得团队成员能够轻松地共享配置。

### 安装与配置 Docker Compose

Docker Compose 提供了多种安装方式，以下是最常用的几种方式：

#### 在 Windows 上安装 Docker Compose

1.  **使用 Docker Desktop**：Docker Desktop 内置了 Docker Compose，安装 Docker Desktop 后可以直接使用 Docker Compose。 
2.  **手动安装**： 
   -  下载 Docker Compose 的二进制文件： 
```powershell
$version = (Invoke-RestMethod -Uri https://api.github.com/repos/docker/compose/releases/latest).tag_name
Invoke-WebRequest "https://github.com/docker/compose/releases/download/$version/docker-compose-Windows-x86_64.exe" -OutFile "$Env:ProgramFiles\Docker\Docker\resources\bin\docker-compose.exe"
```
 

   -  将 `docker-compose.exe` 移动到系统路径中。 

#### 在 macOS 上安装 Docker Compose

1.  **使用 Docker Desktop**：同样的，Docker Desktop 内置了 Docker Compose。 
2.  **通过 Homebrew 安装**： 
```bash
brew install docker-compose
```
 

#### 在 Linux 上安装 Docker Compose

1.  **下载 Docker Compose 的二进制文件**： 
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -oP '\"tag_name\": \"\K(.*)(?=\")')/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
 

2.  **为二进制文件添加执行权限**： 
```bash
sudo chmod +x /usr/local/bin/docker-compose
```
 

3.  **创建软链接**（可选）： 
```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```
 

### 验证 Docker Compose 安装

安装完成后，可以通过以下命令验证 Docker Compose 是否安装成功：

```bash
docker-compose --version
```

输出类似如下内容即表示安装成功：

```bash
docker-compose version 1.29.2, build 5becea4c
```

### 创建第一个 Docker Compose 文件

为了帮助您快速上手 Docker Compose，我们将创建一个简单的示例应用，这个应用由一个 web 服务和一个数据库服务构成。

1.  **创建项目目录**： 
```bash
mkdir myapp
cd myapp
```
 

2.  **创建 **`**docker-compose.yml**`** 文件**： 
```yaml
version: "3"
services:
  web:
    image: nginx
    ports:
      - "80:80"
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: example
```
 

3.  **启动应用**： 
```bash
docker-compose up
```

此命令将下载 nginx 和 postgres 镜像，并启动两个容器。通过访问 `http://localhost` 可以查看 nginx 的默认页面。 

4.  **停止应用**：
使用以下命令可以停止并移除容器： 
```bash
docker-compose down
```
 

## 编排多容器应用

Docker Compose 并不仅限于简单的服务配置，它还支持复杂的多容器应用编排。

### 定义服务

在 `docker-compose.yml` 文件中，您可以定义多个服务，每个服务可以指定不同的镜像和配置。例如：

```yaml
version: "3"
services:
  web:
    image: mycustomimage:latest
    build: .
    ports:
      - "80:80"
    depends_on:
      - db
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: example
```

### 使用 `docker-compose up` 启动应用

启动所有定义的服务：

```bash
docker-compose up
```

### 使用 `docker-compose down` 停止应用

停止并移除所有服务：

```bash
docker-compose down
```

## Docker Compose 实践

本节将通过实际案例展示如何使用 Docker Compose 部署常见的应用环境。

### 使用 Docker Compose 部署 LAMP 环境

LAMP (Linux, Apache, MySQL, PHP) 是一个常见的 Web 开发环境。以下是使用 Docker Compose 部署 LAMP 环境的示例：

1.  **创建 **`**docker-compose.yml**`** 文件**： 
```yaml
version: "3"
services:
  web:
    image: php:7.4-apache
    volumes:
      - ./html:/var/www/html
    ports:
      - "80:80"
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: example
```
 

2.  **创建项目结构**： 
```bash
mkdir -p lamp/html
cd lamp
```
 

3.  **启动 LAMP 环境**： 
```bash
docker-compose up
```
 

4.  **访问 Web 服务**：
在浏览器中访问 `http://localhost`，可以看到默认的 PHP 页面。 

### 使用 Docker Compose 部署微服务架构

微服务是一种架构模式，将应用程序划分为一组小的、独立的服务。以下是一个简化的微服务架构示例：

1.  **创建 **`**docker-compose.yml**`** 文件**： 
```yaml
version: "3"
services:
  frontend:
    image: node:14
    working_dir: /app
    command: npm start
    volumes:
      - ./frontend:/app
    ports:
      - "3000:3000"
  backend:
    image: python:3.8
    working_dir: /app
    command: python app.py
    volumes:
      - ./backend:/app
    ports:
      - "5000:5000"
```
 

2.  **创建项目结构**： 
```bash
mkdir -p microservices/{frontend,backend}
cd microservices
```
 

3.  **启动微服务架构**： 
```bash
docker-compose up
```
 

4.  **访问前端服务**：
在浏览器中访问 `http://localhost:3000`，可以看到前端应用。 
5.  **访问后端服务**：
在浏览器中访问 `http://localhost:5000`，可以看到后端应用。 

