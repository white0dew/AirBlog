---
title: import tocbot from tocbot 提示no export？
urlname: lavaxae7yf3771sb
date: '2024-09-24 22:46:30'
updated: '2024-09-24 22:49:12'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1727189270590-dadc7cf8-0419-4480-9d77-e1b47ec19c9e.png'
description: 背景最近项目更新了tocbot，结果发现报错了··一脸懵逼，于是问了一下 AI，AI 给出了三种解释以及解决方法。解决你遇到的错误可能是因为 TypeScript 无法正确解析 tocbot 模块的导出方式。tocbot 模块使用了 CommonJS 的导出方式，而 TypeScript 默认...
---
# 背景
最近项目更新了tocbot，结果发现报错了··

![](https://oss1.aistar.cool/elog-offer-now/875359148198bc014b38c477b94bd50d.png)



一脸懵逼，于是问了一下 AI，AI 给出了三种解释以及解决方法。

# 解决
你遇到的错误可能是因为 TypeScript 无法正确解析 `tocbot` 模块的导出方式。`tocbot` 模块使用了 CommonJS 的导出方式，而 TypeScript 默认使用 ES 模块的导入方式。

为了解决这个问题，你可以使用以下几种方法之一：

### 方法 1: 使用 `require` 导入
你可以使用 `require` 语法来导入 `tocbot`，这在 CommonJS 模块中是常见的做法。

```typescript
const tocbot = require('tocbot');
```

### 方法 2: 使用 `esModuleInterop`（测试无效！）
你可以在 `tsconfig.json` 中启用 `esModuleInterop` 选项，这样 TypeScript 会自动处理 CommonJS 模块的导入。

```json
{
  "compilerOptions": {
    "esModuleInterop": true
  }
}
```

然后你可以像这样导入 `tocbot`：

```typescript
import tocbot from 'tocbot';
```

### 方法 3: 使用 `import * as`（测试有效）
你也可以使用 `import * as` 语法来导入 `tocbot`，这在处理 CommonJS 模块时是常见的做法。

```typescript
import * as tocbot from 'tocbot';
```

### 示例代码
以下是一个完整的示例，展示了如何使用 `tocbot` 并配置其选项：

```typescript
// 方法 1: 使用 require 导入
const tocbot = require('tocbot');

// 方法 2: 使用 import 导入（需要启用 esModuleInterop）
// import tocbot from 'tocbot';

// 方法 3: 使用 import * as 导入
// import * as tocbot from 'tocbot';

// 初始化 tocbot
tocbot.init({
  tocSelector: '.js-toc',
  contentSelector: '.js-toc-content',
  headingSelector: 'h1, h2, h3',
  ignoreSelector: '.toc-ignore',
  hasInnerContainers: true,
  linkClass: 'toc-link',
  extraLinkClasses: 'extra-link-class',
  activeLinkClass: 'is-active-link',
  listClass: 'toc-list',
  extraListClasses: 'extra-list-class',
  isCollapsedClass: 'is-collapsed',
  collapsibleClass: 'is-collapsible',
  listItemClass: 'toc-list-item',
  activeListItemClass: 'is-active-li',
  collapseDepth: 6,
  scrollSmooth: true,
  scrollSmoothDuration: 420,
  scrollSmoothOffset: -100,
  headingsOffset: 100,
  throttleTimeout: 50,
  positionFixedSelector: '.js-toc',
  positionFixedClass: 'is-position-fixed',
  fixedSidebarOffset: 'auto',
  includeHtml: true,
  includeTitleTags: true,
  onClick: (e: MouseEvent) => {
    e.preventDefault();
    console.log('Link clicked');
  },
  orderedList: false,
  scrollContainer: null,
  skipRendering: false,
  headingLabelCallback: (headingLabel: string) => {
    return headingLabel.length > 20 ? headingLabel.substring(0, 17) + '...' : headingLabel;
  },
  ignoreHiddenElements: true,
  headingObjectCallback: (obj: object, node: HTMLElement) => {
    if (node.classList.contains('exclude-from-toc')) {
      return;
    }
    return obj;
  },
  basePath: '',
  disableTocScrollSync: false,
  tocScrollOffset: 20
});

// 销毁 tocbot
// tocbot.destroy();

// 刷新 tocbot
// tocbot.refresh();
```

通过这些方法，你应该能够成功导入并使用 `tocbot` 模块。

