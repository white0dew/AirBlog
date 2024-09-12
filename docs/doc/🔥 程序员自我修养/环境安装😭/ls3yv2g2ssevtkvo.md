---
title: Goland Proxy，国内镜像加速
urlname: ls3yv2g2ssevtkvo
date: '2024-08-03 12:02:37'
updated: '2024-09-06 09:04:22'
description: 前言众所周知，国内网络访问国外资源经常会出现不稳定的情况。 Go 生态系统中有着许多中国 Gopher 们无法获取的模块，比如最著名的 golang.org/x/...。并且在中国大陆从 GitHub 获取模块的速度也有点慢。 因此设置 CDN 加速代理就很有必要了，以下是几个速度不错的提供者...
---
# 前言
众所周知，国内网络访问国外资源经常会出现不稳定的情况。



 Go 生态系统中有着许多中国 Gopher 们无法获取的模块，比如最著名的 golang.org/x/...。并且在中国大陆从 GitHub 获取模块的速度也有点慢。 



因此设置 CDN 加速代理就很有必要了，以下是几个速度不错的提供者： 

+ 七牛：Goproxy 中国 [https://goproxy.cn](https://goproxy.cn) 
+ 阿里： mirrors.aliyun.com/goproxy/ 
+ 官方： < 全球 CDN 加速 [https://goproxy.io/>](https://goproxy.io/>) 
+ 其他：jfrog 维护 [https://gocenter.io](https://gocenter.io)

# 教程
Go 语言的模块默认从 GOPROXY 环境变量获取相关信息。此变量默认指向 [https://proxy.golang.org/](https://proxy.golang.org/)。然而，遗憾的是，在正常情况下，国内无法访问该网址。

所幸的是，国内外存在一些镜像站，在进行配置后即可使用。

goproxy.cn

- 官网: [https://goproxy.cn/](https://goproxy.cn/)

- 用法：

    1. $ go env -w GO111MODULE=on

    2. $ go env -w GOPROXY=[https://goproxy.cn,direct](https://goproxy.cn,direct)



goproxy.io

- 官网: [https://goproxy.io/](https://goproxy.io/)

- 用法：

    1. $ go env -w GO111MODULE=on

    2. $ go env -w GOPROXY=[https://goproxy.io,direct](https://goproxy.io,direct)



结合使用

由于 goproxy.cn 和 goproxy.io 均为镜像站，可同时使用：

    1. $ go env -w GO111MODULE=on

    2. $ go env -w GOPROXY=[https://goproxy.cn,https://goproxy.io,direct](https://goproxy.cn,https://goproxy.io,direct)



其他

上述命令所设置的环境变量信息由 Go 语言保存在磁盘中，通过以下命令能够获取存储路径：

    1. $ go env GOENV  

