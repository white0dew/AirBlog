---
title: Next.js 和 Contentlayer 项目中实现自动生成 Sitemap
urlname: ilz2siimxs2xmb7g
date: '2024-05-28 17:25:59'
updated: '2024-05-28 17:26:16'
description: 要在 Next.js 和 Contentlayer 项目中实现自动生成 Sitemap 的功能，你可以编写一个脚本，在每次生成文档后自动生成 Sitemap。以下是一个示例脚本，你可以根据自己的需求进行调整。步骤 1：安装必要的依赖首先，你需要安装必要的依赖库，用于生成 Sitemap 和处理...
---
要在 Next.js 和 Contentlayer 项目中实现自动生成 Sitemap 的功能，你可以编写一个脚本，在每次生成文档后自动生成 Sitemap。以下是一个示例脚本，你可以根据自己的需求进行调整。

### 步骤 1：安装必要的依赖

首先，你需要安装必要的依赖库，用于生成 Sitemap 和处理文件系统：

```bash
npm install fs path xmlbuilder contentlayer
```

### 步骤 2：编写生成 Sitemap 的脚本

在你的项目根目录下创建一个 `generate-sitemap.js` 文件，并添加以下代码：

```javascript
const fs = require('fs');
const path = require('path');
const { xmlbuilder } = require('xmlbuilder');
const { allDocuments } = require('.contentlayer/generated');

// 网站的基础 URL
const BASE_URL = 'https://www.yoursite.com';

// 生成 Sitemap XML
const generateSitemap = () => {
  // 创建根元素
  const urlset = xmlbuilder.create('urlset', { encoding: 'UTF-8' });
  urlset.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

  // 添加文档页面
  allDocuments.forEach((doc) => {
    const url = urlset.ele('url');
    url.ele('loc', `${BASE_URL}/${doc.url}`);
    url.ele('lastmod', new Date(doc.date).toISOString());
    url.ele('changefreq', 'monthly');
    url.ele('priority', '0.8');
  });

  // 生成 XML 字符串
  const xml = urlset.end({ pretty: true });

  // 写入 sitemap.xml 文件
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);

  console.log('Sitemap generated at', sitemapPath);
};

// 执行生成 Sitemap 的函数
generateSitemap();
```

### 步骤 3：在生成文档后自动运行脚本

要确保每次 Contentlayer 生成文档后自动运行这个脚本，可以在 `package.json` 中添加一个新的脚本命令。你可以使用 `postbuild` 钩子，确保在构建项目后运行 Sitemap 生成脚本：

```json
{
  "scripts": {
    "build": "next build && next export",
    "postbuild": "node generate-sitemap.js"
  }
}
```

### 步骤 4：确保文档生成路径和 URL 处理正确

在脚本中，我们假设 `allDocuments` 是从 Contentlayer 生成的文档集合中获取的。如果你的文档集合属性名称或路径不同，请相应地进行调整。

### 步骤 5：运行构建

现在，你可以运行 `npm run build`，这个命令将在生成文档后自动生成 Sitemap：

```bash
npm run build
```

完成以上步骤后，每次你构建项目时，Sitemap 都会自动生成，并保存在 `public/sitemap.xml` 中。

### 总结
以上脚本展示了如何在 Next.js 和 Contentlayer 项目中自动生成 Sitemap。你可以根据自己的需求调整脚本，如更改 Sitemap 的属性、URL 格式等。这个自动化过程确保了每次文档更新后，Sitemap 都能及时更新，提升搜索引擎对网站内容的抓取效率。
