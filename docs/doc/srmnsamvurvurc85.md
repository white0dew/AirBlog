---
title: 测试
urlname: srmnsamvurvurc85
date: '2024-05-10 22:17:46'
updated: '2024-05-23 08:30:25'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1715492510321-816e871b-b766-4187-ad91-4f99829ef0b5.png'
description: 描述
classify: 关于Elog
cover_img: 1223
is_nav: true
nav_path: testnew
tags:
  - Blog
  - CI/CD
---
[Skip to content](https://elog.1874.cool/notion/deploy-platform#VPContent)
[Elog Docs](https://elog.1874.cool/)
**SearchK**
Main Navigation[Notion 版](https://elog.1874.cool/notion/start)
**其他版本**
[Elog 开发计划](https://1874.notion.site/Elog-91dd2037c9c847e6bc90b712b124189c)[Elog 示例模版](https://1874.notion.site/9bac25294abc46cc822042e4a3b550a6)
**V0.14.0**
Sidebar Navigation
## 关于Elog
[Elog 能干什么](https://elog.1874.cool/notion/introduce)
[Features](https://elog.1874.cool/notion/zuzvbv2lqhvllgit)
[Elog 更新日志](https://elog.1874.cool/notion/cq6p8hxizn1ogwgm)
[沟通与反馈](https://elog.1874.cool/notion/la9toqncox96kfp8)
[常见问题](https://elog.1874.cool/notion/qa)
## 入门指引
[快速开始](https://elog.1874.cool/notion/start)
[关键信息获取](https://elog.1874.cool/notion/gvnxobqogetukays)
[CLI 命令](https://elog.1874.cool/notion/bry3d3lwe206xuor)
## 配置详情
[目录结构](https://elog.1874.cool/notion/config-catalog)
[写作平台配置](https://elog.1874.cool/notion/write-platform)
[部署平台配置](https://elog.1874.cool/notion/deploy-platform)
[图床平台配置](https://elog.1874.cool/notion/image-platform)
[本地调试](https://elog.1874.cool/notion/local-test)
## 功能和API适配情况
[语雀-Markdown](https://elog.1874.cool/notion/yuque-markdown)
[语雀示例文章](https://elog.1874.cool/notion/yuque-example)
[Notion-Markdown](https://elog.1874.cool/notion/notion-markdown)
[Notion示例文章](https://elog.1874.cool/notion/notion-example)
[FlowUs-Markdown](https://elog.1874.cool/notion/flowus-markdown)
[FlowUs示例文章](https://elog.1874.cool/notion/flowus-example)
[飞书示例文章](https://elog.1874.cool/notion/feishu-example)
## 进阶玩法
[Front Matter](https://elog.1874.cool/notion/raqyleng501h23p1)
[按目录存放文档](https://elog.1874.cool/notion/xe160pqsumi6bqnz)
[持续集成](https://elog.1874.cool/notion/vy55q9xwlqlsfrvk)
## 社区生态
[最佳实践](https://elog.1874.cool/notion/ubcut43kgf97fag6)
[Blogpal 浏览器插件](https://elog.1874.cool/notion/blogpal)
**On this page**
**Table of Contents for current page**

- [本地部署（local）](https://elog.1874.cool/notion/deploy-platform#%E6%9C%AC%E5%9C%B0%E9%83%A8%E7%BD%B2-local)
   - [Format 字段说明](https://elog.1874.cool/notion/deploy-platform#format-%E5%AD%97%E6%AE%B5%E8%AF%B4%E6%98%8E)
   - [FrontMatter 字段说明](https://elog.1874.cool/notion/deploy-platform#frontmatter-%E5%AD%97%E6%AE%B5%E8%AF%B4%E6%98%8E)
   - [FormatExt 字段说明](https://elog.1874.cool/notion/deploy-platform#formatext-%E5%AD%97%E6%AE%B5%E8%AF%B4%E6%98%8E)
- [Halo](https://elog.1874.cool/notion/deploy-platform#halo)
   - [rowType 字段说明](https://elog.1874.cool/notion/deploy-platform#rowtype-%E5%AD%97%E6%AE%B5%E8%AF%B4%E6%98%8E)
   - [needUploadImage 字段说明](https://elog.1874.cool/notion/deploy-platform#needuploadimage-%E5%AD%97%E6%AE%B5%E8%AF%B4%E6%98%8E)
   - [FormatExt 字段说明](https://elog.1874.cool/notion/deploy-platform#formatext-%E5%AD%97%E6%AE%B5%E8%AF%B4%E6%98%8E-1)
- [Confluence](https://elog.1874.cool/notion/deploy-platform#confluence)
- [WordPress](https://elog.1874.cool/notion/deploy-platform#wordpress)
   - [keyMap 字段说明](https://elog.1874.cool/notion/deploy-platform#keymap-%E5%AD%97%E6%AE%B5%E8%AF%B4%E6%98%8E)
- [下一步](https://elog.1874.cool/notion/deploy-platform#%E4%B8%8B%E4%B8%80%E6%AD%A5)
# 部署平台配置
## 本地部署（local）
适用于所有类似 Hexo 的框架：通过向指定目录存放 markdown 文档来进行渲染的博客平台

| **字段** | **必填** | **类型** | **说明** | **默认值** |
| --- | --- | --- | --- | --- |
| outputDir | 否 | string | 文档输出目录 | - |
| filename | 否 | string | 生成文档的命名格式，取值 urlname｜title | title |
| format | 否 | string | 适配器，取值 markdown｜wiki｜html | markdown |
| frontMatter | 否 | FrontMatter | FrontMatter相关配置 | - |
| catalog | 否 | boolean | 是否按照目录生成文档 | false |
| formatExt | 否 | string | 自定义文档处理适配器路径 | - |

### Format 字段说明
format字段表示该文档内容的格式，常用的例如markdown或适用于 Confluence 的 wiki，适用于 Wordpress的 html
### FrontMatter 字段说明
0.12.0及以上版本支持

| **字段** | **必填** | **类型** | **说明** | **默认值** |
| --- | --- | --- | --- | --- |
| enable | 否 | boolean | 是否启用 FrontMatter | false |
| include | 否 | string[] | 只输出数组中存在的字段，数据库的其他字段忽略 | - |
| exclude | 否 | string[] | 忽略数组中存在的字段，输出数据库的其他字段 | - |

在 0.12.0 版本之前启用 FrontMatter 可设置 local.format=matter-markdown
### FormatExt 字段说明
自定义文档处理适配器.js文件路径，当需要对文档进一步处理时，可配置此选项

1. 目前只支持 Common Js 标准的处理器
2. 处理器需要暴露一个**同步/异步**的 format 的方法，在 0.12.0 之前版本**仅支持同步方法**，0.12.0 及以上版本可支持**异步方法或 npm 库**
3. 在 0.12.0 之前版本返回类型为**字符串，**0.12.0 及以上版本返回**传入的** **doc 文档对象javascript**
## Halo
Halo 关键信息获取及配置流程请移步 [关键信息获取](https://elog.1874.cool/notion/gvnxobqogetukays#halo) 页面。
0.13.0及以上版本支持

| **字段** | **必填** | **说明** | **默认值** |
| --- | --- | --- | --- |
| endpoint | 是 | 站点地址，区分 http/https | - |
| token | 是 | Halo 个人令牌 | - |
| policyName | 否 | 存储策略 | default-policy |
| rowType | 否 | 源文档格式，取值 html/markdown | html |
| needUploadImage | 否 | 是否将文档图片上传到 Halo | false |
| formatExt | 否 | 自定义文档处理适配器路径，需要符合HTML格式要求 | - |

### rowType 字段说明
**如果使用 Elog 进行同步，建议不要在 Halo 后台编辑文档，文档的编辑应该交给写作平台来处理**
[根据 Halo 社区说明](https://github.com/halo-dev/halo/issues/4936#issuecomment-1830199955)：
Halo 的默认编辑器是富文本编辑器，rawType 为 html，rawType 的意义在于让 Halo 知道文章应该用什么源格式的编辑器进行编辑。
Halo 本身没有自带 Markdown 编辑器，需要用户自行安装，所有的编辑器插件可以在 [Halo插件市场](https://www.halo.run/store/apps?type=PLUGIN) 中找到。
此外，在 rawType 设置为 markdown 且系统中并没有 markdown 类型的编辑器时，进入文章编辑会给出提示：
![](https://oss1.aistar.cool/elog-offer-now/ae360f38f1574e8f71144fe3ed0ce866.png)
### needUploadImage 字段说明
是否将文档图片上传到 Halo中存储。此外，建议该设置与图床设置，二选一即可。如果你开启了图床，将文档图片上传到 oss 之类的图床上，就没必要开启 Halo 图片上传，再从 oss 上传图片到 Halo。
### FormatExt 字段说明
**目前还不支持在部署平台为 Halo 中使用，将在后续版本中支持**
自定义文档处理适配器.js文件路径，当需要对文档进一步处理时，可配置此选项

1. 目前只支持 Common Js 标准的处理器
2. 处理器需要暴露一个**同步/异步**的 format 的方法或 npm 库
3. 需要返回**传入的** **doc 文档对象**

**javascript**
## Confluence
| **字段** | **必填** | **说明** | **默认值** |
| --- | --- | --- | --- |
| baseUrl | 是 | Confluence API 请求 Base Url | - |
| spaceKey | 是 | 空间Key | - |
| rootPageId | 是 | 根页面ID，Elog会把文档统一存到此目录下 | - |
| user | 是 | Confluence账号 | - |
| password | 是 | Confluence密码 | - |
| formatExt | 否 | 自定义文档处理适配器路径，需要符合Confluence格式要求 | - |

## WordPress
WordPress 模版获取、关键信息获取及配置流程请移步 [关键信息获取](https://elog.1874.cool/notion/gvnxobqogetukays#wordpres) 页面。

