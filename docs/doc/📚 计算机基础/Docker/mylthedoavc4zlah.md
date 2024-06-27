---
title: 第三章：Docker 命令详解
urlname: mylthedoavc4zlah
date: '2024-06-06 21:21:29'
updated: '2024-06-27 21:02:51'
description: 在这一章中，我们将深入探讨 Docker 的常用命令，帮助你掌握如何高效地管理 Docker 镜像和容器。理解这些命令将使你能够更加自如地使用 Docker 进行开发和部署。1. 镜像管理命令Docker 镜像是容器的基础，每个容器都是由镜像创建的。以下是一些常用的镜像管理命令：docker ...
---
在这一章中，我们将深入探讨 Docker 的常用命令，帮助你掌握如何高效地管理 Docker 镜像和容器。理解这些命令将使你能够更加自如地使用 Docker 进行开发和部署。

## 1. 镜像管理命令

Docker 镜像是容器的基础，每个容器都是由镜像创建的。以下是一些常用的镜像管理命令：

### `docker pull`

从远程仓库拉取镜像。

```bash
docker pull <image_name>:<tag>
```

示例：

```bash
docker pull nginx:latest
```

### `docker push`

将本地镜像推送到远程仓库。

```bash
docker push <repository>/<image_name>:<tag>
```

示例：

```bash
docker push myrepo/myapp:1.0
```

### `docker images`

列出本地所有镜像。

```bash
docker images
```

### `docker rmi`

删除本地镜像。

```bash
docker rmi <image_id>
```

示例：

```bash
docker rmi 123abc
```

通过这些命令，你可以轻松地管理 Docker 镜像，包括拉取、推送和删除操作。

## 2. 容器管理命令

容器是 Docker 最核心的概念之一，通过容器化技术使得应用部署和管理变得简单。以下是一些常用的容器管理命令：

### `docker run`

运行一个新的容器。

```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

示例：

```bash
docker run -d -p 80:80 nginx
```

### `docker start` / `docker stop`

启动和停止一个已经存在的容器。

```bash
docker start <container_id>
docker stop <container_id>
```

示例：

```bash
docker start my_container
docker stop my_container
```

### `docker rm`

删除一个或多个容器。

```bash
docker rm <container_id>
```

示例：

```bash
docker rm my_container
```

### `docker ps`

列出正在运行的容器。

```bash
docker ps
```

列出所有容器，包括停止的容器。

```bash
docker ps -a
```

### `docker exec`

在运行中的容器中执行命令。

```bash
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

示例：

```bash
docker exec -it my_container /bin/bash
```

### `docker logs`

查看容器的日志。

```bash
docker logs <container_id>
```

通过这些命令，可以方便地运行、管理、停止和删除容器。

## 3. 网络与存储命令

Docker 提供了强大的网络和存储管理功能，以下是一些常用的网络与存储命令：

### 网络命令

#### `docker network create`

创建一个新的网络。

```bash
docker network create <network_name>
```

示例：

```bash
docker network create my_network
```

#### `docker network ls`

列出所有网络。

```bash
docker network ls
```

#### `docker network rm`

删除一个网络。

```bash
docker network rm <network_name>
```

示例：

```bash
docker network rm my_network
```

### 存储命令

#### `docker volume create`

创建一个新的数据卷。

```bash
docker volume create <volume_name>
```

示例：

```bash
docker volume create my_volume
```

#### `docker volume ls`

列出所有数据卷。

```bash
docker volume ls
```

#### `docker volume rm`

删除一个数据卷。

```bash
docker volume rm <volume_name>
```

示例：

```bash
docker volume rm my_volume
```

通过以上网络和存储命令，可以轻松地创建、管理和删除 Docker 网络和数据卷，从而更好地管理容器间的通信和数据持久化。
