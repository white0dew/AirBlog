---
title: 第十章：Docker 与 Kubernetes
urlname: fgd4f06xqeq9mx27
date: '2024-06-06 21:23:21'
updated: '2024-06-27 21:04:53'
description: Kubernetes（简称 K8s）是一个开源的容器编排平台，用于自动化部署、扩展和管理容器化应用。Kubernetes 最初由 Google 开发，现在由云原生计算基金会（CNCF）维护。Kubernetes 提供了一种将多个容器应用以集群方式管理的方式，使得应用的高可用性、扩展性和可维护性...
---

Kubernetes（简称 K8s）是一个开源的容器编排平台，用于自动化部署、扩展和管理容器化应用。Kubernetes 最初由 Google 开发，现在由云原生计算基金会（CNCF）维护。Kubernetes 提供了一种将多个容器应用以集群方式管理的方式，使得应用的高可用性、扩展性和可维护性得到了极大的提升。


在深入了解 Kubernetes 之前，首先需要掌握一些基本概念：

- **集群（Cluster）**: 由一组节点（Node）组成，用于运行容器化应用。
- **节点（Node）**: 集群中的单个机器，可以是物理机或虚拟机。每个节点运行容器，并由主节点（Master Node）管理。
- **Pod**: Kubernetes 中最小的部署单元，一个 Pod 可以包含一个或多个容器，通常共享存储、网络和命名空间。
- **服务（Service）**: 定义了一组 Pod 的访问策略，通常用于负载均衡和服务发现。
- **部署（Deployment）**: 定义了应用的期望状态，Kubernetes 会确保集群中的应用实例符合该状态。
### 

要使用 Kubernetes，首先需要安装和配置 Kubernetes 环境。以下是常见的安装方式：


Minikube 是一个本地的 Kubernetes 集群，适合用于开发和测试。以下是在本地机器上安装 Minikube 的步骤：

1.  **安装 Minikube**: 
```bash
# macOS
brew install minikube

# Windows
choco install minikube

# Linux
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
&& sudo install minikube-linux-amd64 /usr/local/bin/minikube
```
 

2.  **启动 Minikube**: 
```bash
minikube start
```
 

3.  **验证安装**: 
```bash
kubectl cluster-info
```
 

## 1. 使用 Kubernetes 管理容器

### 1.1 创建与管理 Pod

Pod 是 Kubernetes 中最小的部署单元。以下是创建和管理 Pod 的基本步骤：

#### 创建 Pod

使用 YAML 文件定义 Pod，并通过 `kubectl` 命令创建 Pod。
示例 YAML 文件（`pod.yaml`）：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
    - name: my-container
      image: nginx
```

创建 Pod:

```bash
kubectl apply -f pod.yaml
```

#### 查看 Pod 状态

```bash
kubectl get pods
kubectl describe pod my-pod
```

### 1.2 使用 Deployment 部署应用

Deployment 提供了声明式更新应用的能力，可以方便地管理应用的扩展和滚动更新。

#### 创建 Deployment

示例 YAML 文件（`deployment.yaml`）：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-container
          image: nginx
```

创建 Deployment:

```bash
kubectl apply -f deployment.yaml
```

#### 查看 Deployment 状态

```bash
kubectl get deployments
kubectl describe deployment my-deployment
```

### 1.3 配置服务与负载均衡

服务（Service）为一组 Pod 提供稳定的网络端点，通常用于负载均衡和服务发现。

#### 创建服务

示例 YAML 文件（`service.yaml`）：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

创建服务:

```bash
kubectl apply -f service.yaml
```

#### 查看服务状态

```bash
kubectl get services
kubectl describe service my-service
```

## 2. Docker 与 Kubernetes 的结合

### 2.1 将 Docker 应用迁移到 Kubernetes

将现有的 Docker 应用迁移到 Kubernetes 涉及以下步骤：

1. **编写 Kubernetes 配置文件**: 将 Docker Compose 文件转换为 Kubernetes 的 Deployment 和 Service YAML 文件。
2. **部署应用**: 使用 `kubectl apply` 命令将配置文件部署到 Kubernetes 集群。

### 2.2 使用 Helm 管理 Kubernetes 应用

Helm 是 Kubernetes 的包管理工具，可以方便地管理应用的安装、升级和配置。

#### 安装 Helm

```bash
# macOS
brew install helm

# Windows
choco install kubernetes-helm

# Linux
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

#### 使用 Helm 部署应用

```bash
# 添加 Helm 仓库
helm repo add stable https://charts.helm.sh/stable

# 搜索应用
helm search repo stable

# 部署应用
helm install my-release stable/nginx
```

### 2.3 Kubernetes 的高级配置与优化

为了确保 Kubernetes 集群的高效运行，可以进行以下优化：

1. **资源限制与配额**: 为 Pod 设置 CPU 和内存限制，防止资源争用。
2. **节点自动伸缩**: 使用 Cluster Autoscaler 自动调整节点数量，以应对负载变化。
3. **监控与日志**: 配置 Prometheus 和 Grafana 进行监控，使用 ELK 堆栈进行日志管理。


