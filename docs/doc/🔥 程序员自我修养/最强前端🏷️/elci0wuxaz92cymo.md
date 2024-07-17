---
title: pnpm、npm 、yarn更换国内源
urlname: elci0wuxaz92cymo
date: '2024-07-17 21:51:15'
updated: '2024-07-17 22:52:59'
description: '背景pnpm下载国外包的时候实在是太难受了！！我要换源！pnpm换源相关命令# 安装 npm install -g pnpm # 查看源 pnpm get registry pnpm config get registry # 临时修改 pnpm config set registry <re...'
---
# 背景
pnpm下载国外包的时候实在是太难受了！！
我要换源！
# pnpm换源
相关命令
```markdown
# 安装
npm install -g pnpm
# 查看源
pnpm get registry
pnpm config get registry
# 临时修改
pnpm config set registry <registry-url>
# 永久修改
pnpm config set registry <registry-url> -g
# 设置为淘宝镜像源
pnpm config set registry https://registry.npmmirror.com/

# 还原为官方镜像源
pnpm config set registry https://registry.npmjs.org/
# 更新依赖项
pnpm update
# 安装依赖项
pnpm install
# 卸载依赖项
pnpm uninstall
# 删除依赖项
pnpm remove
# 运行脚本
pnpm run
#  清除缓存
pnpm store prune
```
## npm换源
```markdown
# 查看源
npm get registry
npm config get registry
# 临时修改
npm config set registry <registry-url>
# 永久修改
npm config set registry <registry-url> -g
# 还原
	npm config set registry https://registry.npmjs.org
	# 或
	npm config delete registry
# 更新依赖项
npm update
# 安装依赖项
npm install
# 卸载依赖项
npm uninstall
# 删除依赖项
npm remove
# 运行脚本
npm run
#  清除缓存
npm cache clean
```

# yarn换源
```markdown
# 安装
npm install -g yarn
# 查看源
yarn config get registry
# 临时修改
yarn config set registry <registry_url>
# 永久修改
yarn config set registry <registry_url> -g
# 还原
  yarn config set registry https://registry.yarnpkg.com 
  #或
  yarn config delete registry
# 添加一个依赖
yarn add <packageName>
# 更新一个依赖
yarn upgrade <packageName>
# 移除一个依赖
yarn remove <packageName>
#  清除缓存
yarn cache clean
```
