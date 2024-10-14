---
title: Linux环境怎么下测试网络速度？
urlname: qyxl3y4us6uuwyui
date: '2024-10-12 09:48:44'
updated: '2024-10-14 10:15:19'
description: '最近买了多个服务器，为了防止服务商虚构数值，有必要检测一下。在Linux系统中,有多种工具可以用来测试网络速度。1. 使用 speedtest-clispeedtest-cli 是一个基于命令行的速度测试工具,它使用 Speedtest.net 的服务器来测试你的网络速度。安装在大多数Linu...'
---
最近买了多个服务器，为了防止服务商虚构数值，有必要检测一下。



在Linux系统中,有多种工具可以用来测试网络速度。

## 1. 使用 speedtest-cli
`speedtest-cli` 是一个基于命令行的速度测试工具,它使用 Speedtest.net 的服务器来测试你的网络速度。

### 安装
在大多数Linux发行版中,你可以通过包管理器安装 `speedtest-cli`:

```bash
# 在 Ubuntu 或 Debian 系统中
sudo apt install speedtest-cli

# 在 CentOS 或 Fedora 系统中
sudo yum install speedtest-cli

# 使用 pip 安装
pip install speedtest-cli
```

### 使用
安装完成后,你可以直接在终端中运行:

```bash
speedtest-cli
```

这将自动选择最近的服务器并开始测试。你也可以使用一些选项来自定义测试:

```bash
# 显示简单的结果
speedtest-cli --simple

# 以字节为单位显示结果
speedtest-cli --bytes

# 显示分享结果的图片网址
speedtest-cli --share
```

## 2. 使用 iperf3
`iperf3` 是一个强大的网络性能测试工具,它可以测试 TCP, UDP 和 SCTP 协议的带宽。

### 安装
```bash
# 在 Ubuntu 或 Debian 系统中
sudo apt install iperf3

# 在 CentOS 或 Fedora 系统中
sudo yum install iperf3
```

### 使用
`iperf3` 需要一个服务器和一个客户端。首先,在一台机器上启动服务器:

```bash
iperf3 -s
```

然后,在另一台机器上运行客户端:

```bash
iperf3 -c server_ip
```

这将进行默认的 TCP 测试。你也可以进行 UDP 测试:

```bash
iperf3 -c server_ip -u
```

## 3. 使用 curl 测试下载速度
`curl` 是一个多功能的网络工具,也可以用来测试下载速度。

### 使用
```bash
curl -o /dev/null http://speedtest.wdc01.softlayer.com/downloads/test10.zip
```

这个命令会下载一个测试文件并显示平均下载速度。

## 4. 使用 wget 测试下载速度
`wget` 是另一个常用的下载工具,也可以用来测试网络速度。

### 使用
```bash
wget -O /dev/null http://speedtest.wdc01.softlayer.com/downloads/test10.zip
```

这个命令会显示下载进度和平均速度。

## 5. 图形界面工具: GNOME 网络工具
对于喜欢图形界面的用户,GNOME 网络工具提供了一个简单的网络测试界面。

### 安装
```bash
sudo apt install gnome-nettool
```

### 使用
安装后,你可以在应用程序菜单中找到 "Network Tools"。这个工具提供了多种网络诊断功能,包括 ping, traceroute 等。

## 6. 网页版速度测试
除了上述工具,你还可以使用网页版的速度测试工具,如 Speedtest.net, Fast.com 等。这些工具通常不需要安装任何软件,直接在浏览器中就可以使用。

