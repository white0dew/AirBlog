---
title: 推荐几个开源的Newletter！
urlname: hdp8nlb2144e4dsn
date: '2024-07-29 12:41:32'
updated: '2024-07-29 12:42:43'
description: '有一些优秀的开源 newsletter 项目，其中一些还提供 Docker 镜像。ListmonkListmonk 是一个自托管的、现代化的 newsletter 和邮件列表管理器。GitHub: https://github.com/knadh/listmonk特点：Go 语言编写提供 Do...'
---
有一些优秀的开源 newsletter 项目，其中一些还提供 Docker 镜像。

1. Listmonk

Listmonk 是一个自托管的、现代化的 newsletter 和邮件列表管理器。

- GitHub: [https://github.com/knadh/listmonk](https://github.com/knadh/listmonk)
- 特点：
   - Go 语言编写
   - 提供 Docker 镜像
   - 支持多种数据库（PostgreSQL）
   - 现代化的 UI
   - 支持模板和个性化
   - API 支持

使用 Docker 运行 Listmonk:
```bash
docker run -d --name listmonk \
    -p 9000:9000 \
    -v /path/to/data:/listmonk/data \
    listmonk/listmonk:latest
```

2. Mailtrain

Mailtrain 是一个自托管的 newsletter 应用。

- GitHub: [https://github.com/Mailtrain-org/mailtrain](https://github.com/Mailtrain-org/mailtrain)
- 特点：
   - Node.js 编写
   - 提供 Docker 镜像
   - 支持多种数据库（MySQL/MariaDB）
   - 支持 WYSIWYG 编辑器
   - 支持自动化和 API

使用 Docker 运行 Mailtrain:
```bash
docker run -d --name mailtrain \
    -p 3000:3000 \
    -v /path/to/data:/app/data \
    mailtrain/mailtrain
```

3. Postal

Postal 是一个完全的开源邮件传递平台。

- GitHub: [https://github.com/postalserver/postal](https://github.com/postalserver/postal)
- 特点：
   - Ruby on Rails 编写
   - 提供 Docker 镜像
   - 支持多域名
   - 详细的跟踪和报告
   - API 支持

使用 Docker 运行 Postal:
```bash
docker run -d --name postal \
    -p 5000:5000 \
    -v /path/to/data:/opt/postal/data \
    ghcr.io/postalserver/postal:latest
```

4. Mautic

虽然 Mautic 主要是一个营销自动化平台，但它也包含强大的 newsletter 功能。

- GitHub: [https://github.com/mautic/mautic](https://github.com/mautic/mautic)
- 特点：
   - PHP 编写
   - 提供 Docker 镜像
   - 全面的营销自动化功能
   - 支持邮件营销、登陆页面、表单等
   - 强大的分段和个性化功能

使用 Docker 运行 Mautic:
```bash
docker run -d --name mautic \
    -p 8080:80 \
    -v /path/to/data:/var/www/html \
    mautic/mautic:latest
```
选择哪个取决于你的具体需求。
如果你需要一个简单的 newsletter 解决方案，Listmonk 可能是个不错的选择。
如果你需要更全面的营销自动化功能，可以考虑 Mautic。Postal 则更适合需要完整邮件传递平台的用户。
在使用这些工具时，请确保遵守相关的邮件和隐私法规，如 GDPR、CAN-SPAM 等。
