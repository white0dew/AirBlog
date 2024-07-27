---
title: 夸克网盘自动签到功能上线
urlname: tgaw8ygonvh5e6rf
date: '2024-07-27 10:37:23'
updated: '2024-07-27 10:39:48'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1722047931274-1677fa96-3eab-444f-87bc-281ae7507cf9.png'
description: 经过不懈努力，我发现了一个好用的工具——夸克网盘自动签到。虽然每日签到所获得的空间不多，但积少成多，也是一份不错的小福利。对于感兴趣的朋友，以下是详细的操作步骤：项目获取：前往GitHub，找到我们的项目页面alipan_auto_sign，点击fork，将项目复制到您的个人仓库。出于安全考虑...
---
经过不懈努力，我发现了一个好用的工具——夸克网盘自动签到。虽然每日签到所获得的空间不多，但积少成多，也是一份不错的小福利。对于感兴趣的朋友，以下是详细的操作步骤：

1. **项目获取**：前往GitHub，找到我们的项目页面[alipan_auto_sign](https://github.com/nibabashilkk/alipan_auto_sign)，点击fork，将项目复制到您的个人仓库。出于安全考虑，建议设置为私有仓库，以避免cookie配置泄露。

![image.png](https://oss1.aistar.cool/elog-offer-now/8d3f679ce42bbb03bd7d68746e6726c0.png)

2. **夸克Cookie获取**：访问夸克网盘的[官方网页](https://pan.quark.cn/)，登录后打开浏览器的开发者工具（按F12），选择一个后台请求，复制所有cookie。

![image.png](https://oss1.aistar.cool/elog-offer-now/2efc16a5d1262377e27443a900d5d2e3.png)

3. **配置文件设置**：将复制的cookie粘贴到您fork的项目配置文件中。
4. **运行测试**：配置完成后，手动执行action进行测试。如果一切顺利，您将通过pushplus接收到成功的消息通知。

![image.png](https://oss1.aistar.cool/elog-offer-now/824c29375fa6950d037cdecf715e68d5.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/468dfbb1f9e3f13d4942232fd028aa4d.png)

5. **原理解析**：项目的实现基于对签到接口的调用。如果您对实现细节感兴趣，可以访问GitHub上的项目页面查看。

工具来自：[https://www.xiaoliu.life/p/20240414b/](https://www.xiaoliu.life/p/20240414b/)
