---
title: 部署在Vercel的Mysql数据库查询非常慢
urlname: zzbp4y3b2vy1q6lg
date: '2024-10-18 21:19:51'
updated: '2024-10-18 21:22:54'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1729257728403-eae48fed-d064-4e18-ac6d-977a32bac426.png'
description: '最近在做一个导航网站，https://airnav.icu/own结果发现当项目部署上线后，mysql查询速度贼慢。只有几十条记录，查询时间要接近一秒钟，这肯定是不科学的。后面想到，Mysql的查询速度有很大一部分原因是网络传输，于是想到了是不是vercel的配置问题？终于在vercel项目的...'
---
最近在做一个导航网站，[https://airnav.icu/own](https://airnav.icu/own)



结果发现当项目部署上线后，mysql查询速度贼慢。



只有几十条记录，查询时间要接近一秒钟，这肯定是不科学的。



后面想到，Mysql的查询速度有很大一部分原因是网络传输，于是想到了是不是vercel的配置问题？



终于在vercel项目的配置发现了一个东西:

![](https://oss1.aistar.cool/elog-offer-now/2d7d43fde18a1d76939e1259c7223e22.png)

选择函数地点，选离你数据库最近的机房！



由于我的机房是在 香港，所以就部署在香港。



部署完成之后，之前的1s查询，直接变成20ms····

