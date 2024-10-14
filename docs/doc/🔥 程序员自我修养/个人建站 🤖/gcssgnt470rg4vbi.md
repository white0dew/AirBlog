---
title: 使用Docker安装Umami，统计网站PV/UV
urlname: gcssgnt470rg4vbi
date: '2024-10-14 08:34:32'
updated: '2024-10-14 22:53:45'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1728866928325-2fb3c2f3-9493-4408-9269-dd6c53a89cea.png'
description: 因为有好几个网站，尝试了google、百度的分析统计软件，都不太好用……其实最好用的是vercel，但是要收费，于是找到了Umami这个开源的统计网站，下面是安装教程，数据库是MYsql（我用的8.4）。先下载Docker镜像docker pull docker.umami.is/umami-...
---
因为有好几个网站，尝试了google、百度的分析统计软件，都不太好用……



其实最好用的是vercel，但是要收费，于是找到了Umami这个开源的统计网站，下面是安装教程，数据库是MYsql（我用的8.4）。



# 先下载Docker镜像
```typescript
docker pull docker.umami.is/umami-software/umami:mysql-latest
```

如果是Postgresql，用下面这个：

```typescript
docker pull docker.umami.is/umami-software/umami:postgresql-latest
```

# 编排镜像
新建一份compose.file：

```typescript
version: '1'
services:
  umami:
    image: docker.umami.is/umami-software/umami:mysql-latest
    restart: always
    network_mode: "host"
    expose:
          - 3000:3000
    environment:
      DATABASE_TYPE: mysql
      DATABASE_URL: mysql://数据库用户名:密码@localhost:3306/数据库名称
      APP_SECRET: 自己编一串密码
    container_name: umami
```

# 启动
用下面的docker命令启动：

```typescript
docker-compose up -d
```

正常的话应该启动了，可以使用命令查看：

```typescript
docker ps
```

# 设置反向代理
默认对外暴露的端口是：3000，可以进行反向代理，从而实现域名访问。



如果是宝塔部署的话，可以在站点先新建一个php站点：

![](https://oss1.aistar.cool/elog-offer-now/e3863f789ef49cb150c84658dfe7b236.png)



新建之后，在设置-反向代理选择对应的端口：

![](https://oss1.aistar.cool/elog-offer-now/1c868433e061159915c2f7202bcaf7e0.png)

# 登录访问
访问网址：ip:3000 或者已经绑定好了反向代理。

```typescript
默认账号：admin ，默认密码：umami
```

![](https://oss1.aistar.cool/elog-offer-now/b7c05a3d39cb57174b7c8e42aa764da0.png)

# 新建网站
![](https://oss1.aistar.cool/elog-offer-now/754cc653b0861522b5a6a097a6ac2fce.png)



# API调用
在自己的网站加入代码即可：

![](https://oss1.aistar.cool/elog-offer-now/d9cefb67b1e2a4a4780f9837c45cbd2b.png)



# 网站分析
如图所示~

![](https://oss1.aistar.cool/elog-offer-now/f5a075181db6aa4cc0a252610af185d9.png)





# API
如果想在网站里获取某些指标，可以参考umami提供的API接口:



[https://umami.is/docs/api](https://umami.is/docs/api)





Over! 快去试试吧！

