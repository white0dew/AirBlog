---
title: 2、项目文件
urlname: eydyl7oc3k5ivgbz
date: '2024-06-15 21:20:10'
updated: '2024-06-21 17:02:21'
description: 本章讲解如何从零开始创建 Chrome 插件项目，包括创建项目文件夹、了解项目结构和编写 manifest.json 文件。确保项目结构清晰，代码管理便捷。
keywords: 'Chrome 插件, 项目文件, manifest.json, 项目结构, 版本控制'
---
在本章中，我们将从零开始创建我们的 Chrome 插件项目。你将学会如何创建项目文件夹，了解项目的结构，并编写必要的 `manifest.json` 文件来配置插件。

## 创建项目文件夹

首先，我们需要为我们的插件创建一个项目文件夹。在你的计算机上选择一个合适的位置，然后按照以下步骤创建文件夹：

1. 在你的计算机上打开文件资源管理器（Windows）或 Finder（Mac）。
2. 在你希望存放项目的路径下，右键选择“新建文件夹”。
3. 将文件夹命名为“TranslatorDictionaryExtension”。

```bash
# 使用命令行创建项目文件夹
mkdir TranslatorDictionaryExtension
cd TranslatorDictionaryExtension
```

## 项目结构介绍

一个典型的 Chrome 插件项目通常包括以下几个文件和文件夹：

- `manifest.json`：插件的配置文件。
- `popup.html`：插件的弹出页面。
- `popup.js`：处理弹出页面逻辑的脚本文件。
- `content.js`：内容脚本，用于与网页进行交互。
- `background.js`：后台脚本，用于处理复杂逻辑和长期任务。
- `styles/`：存放样式文件的文件夹。
- `images/`：存放插件图标和其他图片资源的文件夹。

确保项目结构清晰、文件命名规范，有助于后续开发和维护。

```
TranslatorDictionaryExtension/
│
├── manifest.json
├── popup.html
├── popup.js
├── content.js
├── background.js
├── styles/
│   └── popup.css
└── images/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 编写 `manifest.json` 文件

`manifest.json` 文件是 Chrome 插件的核心配置文件，它描述了插件的基本信息和权限。我们将创建并编写这个文件，确保插件能被 Chrome 浏览器识别和加载。

在“TranslatorDictionaryExtension”文件夹内，新建一个名为 `manifest.json` 的文件，并添加以下内容：

```json
{
  "manifest_version": 3,
  "name": "Translator and Dictionary Extension",
  "version": "1.0",
  "description": "A Chrome extension that translates selected text and provides dictionary definitions.",
  "permissions": [
    "activeTab",
    "storage",
    "contextMenus",
    "https://translate.googleapis.com/",
    "https://www.dictionaryapi.com/"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "images/icon16.png",
      "48": "images/icon48.png",
      "128": "images/icon128.png"
    }
  },
  "icons": {
    "16": "images/icon16.png",
    "48": "images/icon48.png",
    "128": "images/icon128.png"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

### 解释 `manifest.json` 文件内容

- `manifest_version`: 说明当前使用的 manifest 规范版本。我们使用的是最新的版本 3。
- `name`: 插件的名称，会显示在 Chrome 扩展管理页面和 Chrome Web Store 中。
- `version`: 插件的版本号。
- `description`: 插件的简要描述。
- `permissions`: 插件需要的权限，如访问活动标签页、存储、右键菜单和 API 请求权限。
- `background`: 指定后台脚本文件，使用 service worker 来处理后台逻辑。
- `action`: 配置插件的弹出页面和图标。
- `icons`: 定义插件的图标。
- `content_scripts`: 配置内容脚本，并指定在哪些页面上注入这些脚本。

## 提交代码到版本控制

为了保证项目的版本控制和备份，我们建议使用 Git 来管理项目。以下是初始化 Git 仓库并提交初始代码的步骤：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件到 Git 仓库
git add .

# 提交初始代码
git commit -m "Initial commit with project structure and manifest.json"
```

通过以上步骤，我们已经完成了项目的初始设置，为后续的开发打下了基础。

