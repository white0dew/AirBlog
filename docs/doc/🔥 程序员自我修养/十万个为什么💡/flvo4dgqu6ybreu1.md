---
title: prettier 如何禁止编译报错？
urlname: flvo4dgqu6ybreu1
date: '2024-05-29 22:13:18'
updated: '2024-05-29 22:14:04'
description: 在Next.js项目中，如果你使用了Prettier并且配置了ESLint来检查代码风格，有时可能会遇到Prettier的格式化规则与ESLint规则产生冲突，导致编译时报错。为了避免这种情况，你可以在你的ESLint配置文件中禁用Prettier的规则。以下是一个常见的配置方法，用于在ESL...
---
在Next.js项目中，如果你使用了Prettier并且配置了ESLint来检查代码风格，有时可能会遇到Prettier的格式化规则与ESLint规则产生冲突，导致编译时报错。为了避免这种情况，你可以在你的ESLint配置文件中禁用Prettier的规则。

以下是一个常见的配置方法，用于在ESLint中禁用所有与Prettier冲突的规则：

1. **安装必要的npm包：**

```shell
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

或者如果你使用yarn：

```shell
yarn add --dev eslint-config-prettier eslint-plugin-prettier
```

这些包会帮助你在ESLint中集成Prettier。

2. **在你的**`**.eslintrc**`**配置中添加**`**"prettier"**`**：**

```json
{
  "extends": [
    // ...其他继承的配置
    "prettier"
  ],
  "plugins": [
    // ...其他插件
    "prettier"
  ],
  "rules": {
    // ...其他规则
    "prettier/prettier": "off" // 关闭prettier/prettier规则
  }
}
```

通过将"prettier"添加到`"extends"`数组中，你可以确保所有与Prettier冲突的ESLint规则都被禁用。在`"rules"`对象中，将`"prettier/prettier"`规则设置为`"off"`，以防止ESLint在代码不符合Prettier格式化时报错。

这样配置后，你的ESLint将不会强制执行Prettier的代码风格规则，但你依然可以手动运行Prettier来格式化代码。如果你不希望Prettier和ESLint一起工作，只需不在你的项目中集成它们即可，但一般建议让这两个工具协同工作，以保持代码质量和统一代码风格。
