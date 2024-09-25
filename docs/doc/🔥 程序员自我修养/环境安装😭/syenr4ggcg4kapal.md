---
title: Docker 镜像加速配置指南（2024年7月更新）
urlname: syenr4ggcg4kapal
date: '2024-07-21 14:32:34'
updated: '2024-09-25 08:47:03'
description: '在国内使用Docker时，由于网络原因，从官方仓库拉取镜像可能会很慢。1. 常用仓库镜像对应表原始仓库国内镜像docker.iohttps://docker.chenby.cnhttps://docker.anyhub.us.kghub-mirror.c.163.comdockerproxy....'
---
在国内使用Docker时，由于网络原因，从官方仓库拉取镜像可能会很慢。

## 1. 常用仓库镜像对应表
| 原始仓库 | 国内镜像 |
| --- | --- |
| **docker.io** | [https://docker.chenby.cn](https://docker.chenby.cn)<br/>[https://docker.anyhub.us.kg](https://docker.anyhub.us.kg)<br/>hub-mirror.c.163.com   dockerproxy.com<br/>[~~***.mirror.aliyuncs.com~~](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)~~（需登录阿里云查看个人地址）~~ |
| quay.io | quay.mirrors.ustc.edu.cn |
| registry.k8s.io | registry.lank8s.cn   registry.aliyuncs.com/google_containers/   registry.cn-hangzhou.aliyuncs.com/google_containers |
| gcr.io | gcr.lank8s.cn |


注意：阿里云的镜像地址需要登录阿里云账号才能查看完整地址。

## 2. DaoCloud公共镜像加速服务
DaoCloud提供了一个公共镜像加速服务，支持多个流行的镜像源。以下是部分支持的镜像源对应表：

| 源站 | DaoCloud镜像 |
| --- | --- |
| docker.io | docker.m.daocloud.io |
| gcr.io | gcr.m.daocloud.io |
| quay.io | quay.m.daocloud.io |
| registry.k8s.io | k8s.m.daocloud.io |
| mcr.microsoft.com | mcr.m.daocloud.io |


更多支持的镜像源请参考 [DaoCloud public-image-mirror](https://github.com/DaoCloud/public-image-mirror)。

## 3.自建Dokcer加速服务
参考仓库：[https://github.com/dqzboy/Docker-Proxy](https://github.com/dqzboy/Docker-Proxy)

## 3. Linux系统全局配置
要在Linux系统上全局配置Docker使用镜像加速，请按以下步骤操作：

1. 创建或修改 Docker 守护进程配置文件：

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com/",
    "https://dockerproxy.com/",
    "https://docker.m.daocloud.io/"
  ]
}
EOF
```

1. 重新加载 Docker 配置并重启服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 4. 验证配置
配置完成后，可以通过以下命令验证镜像加速器是否生效：

```bash
docker info
```

在输出信息中，查找 "Registry Mirrors" 部分，应该能看到你配置的镜像地址。

## 5. 使用技巧
+ 对于特定的镜像，您可以直接在拉取时指定镜像源，例如：

```bash
docker pull quay.mirrors.ustc.edu.cn/coreos/flannel:v0.10.0-amd64
```

+ 在Kubernetes环境中，可以通过修改YAML文件中的镜像地址来使用加速源。
+ 建议配置多个镜像源，以提高可用性和下载速度。

