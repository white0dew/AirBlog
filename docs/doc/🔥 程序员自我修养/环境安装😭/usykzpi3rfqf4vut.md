---
title: 安装pnpm
urlname: usykzpi3rfqf4vut
date: '2024-05-27 14:36:16'
updated: '2024-05-27 14:38:02'
description: '怎么在windows、linux、mac上安装pnpm呢？前言如果您不使用独立脚本或 @pnpm/exe 来安装 pnpm，则需要在系统上安装 Node.js（至少 v16.14）。原址：https://pnpm.io/zh/installation使用独立脚本安装即使没有安装 Node.js...'
---
怎么在windows、linux、mac上安装pnpm呢？
## 前言
如果您不使用独立脚本或 @pnpm/exe 来安装 pnpm，则需要在系统上安装 Node.js（至少 v16.14）。
> 原址：[https://pnpm.io/zh/installation](https://pnpm.io/zh/installation)

## 使用独立脚本安装
即使没有安装 Node.js，也可以使用以下脚本安装 pnpm。
### Windows
使用 PowerShell：
```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```
### 在 POSIX 系统上
```
curl -fsSL https://get.pnpm.io/install.sh | sh -
```
如果您没有安装 curl，也可以使用 wget：
```
wget -qO- https://get.pnpm.io/install.sh | sh -
```
提示
You may use the [pnpm env](https://pnpm.io/zh/cli/env) command then to install Node.js.
## 使用 Corepack 安装
Since v16.13, Node.js is shipping [Corepack](https://nodejs.org/api/corepack.html) for managing package managers. 这是一项实验性功能，因此您需要通过运行如下脚本来启用它：
提示
If you have installed Node.js with pnpm env Corepack won't be installed on your system, you will need to install it separately. See [#4029](https://github.com/pnpm/pnpm/issues/4029).
```
corepack enable pnpm
```
如果您已经使用Homebrew安装了Node.js，您需要单独安装Corepack：
```
brew install corepack
```
这会自动将pnpm安装在您的系统上。
你可以通过下列命令固定项目所用的 pnpm 版本：
```
corepack use pnpm@latest
```
This will add a "packageManager" field in your local package.json which will instruct Corepack to always use a specific version on that project. 如果您想要可复现性，这可能很有用，因为所有使用 Corepack 的开发人员都将使用与您相同的版本。 当一个新版本的 pnpm 发布时，您可以重新运行上述命令。
## 使用 npm 安装
We provide two packages of pnpm CLI, pnpm and @pnpm/exe.

- [pnpm](https://www.npmjs.com/package/pnpm) is a ordinary version of pnpm, which needs Node.js to run.
- [@pnpm/exe](https://www.npmjs.com/package/@pnpm/exe) is packaged with Node.js into an executable, so it may be used on a system with no Node.js installed.
```
npm install -g pnpm
```
或者
```
npm install -g @pnpm/exe
```
提示
是否要在 CI 服务器上使用 pnpm? See: [Continuous Integration](https://pnpm.io/zh/continuous-integration).
## 兼容性
以下是各版本 pnpm 与各版本 Node.js 之间的兼容性表格。

| Node.js | pnpm 7 | pnpm 8 | pnpm 9 |
| --- | --- | --- | --- |
| Node.js 12 | ❌ | ❌ | ❌ |
| Node.js 14 | ✔️ | ❌ | ❌ |
| Node.js 16 | ✔️ | ✔️ | ❌ |
| Node.js 18 | ✔️ | ✔️ | ✔️ |
| Node.js 20 | ✔️ | ✔️ | ✔️ |

## 问题排查
如果 pnpm 损坏并且您无法通过重新安装来修复，您可能需要将其从 PATH 中手动删除。
Let's assume you have the following error when running pnpm install:
```
C:\src>pnpm install
internal/modules/cjs/loader.js:883
  throw err;
  ^



Error: Cannot find module 'C:\Users\Bence\AppData\Roaming\npm\pnpm-global\4\node_modules\pnpm\bin\pnpm.js'
←[90m    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:880:15)←[39m
←[90m    at Function.Module._load (internal/modules/cjs/loader.js:725:27)←[39m
←[90m    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)←[39m
←[90m    at internal/main/run_main_module.js:17:47←[39m {
  code: ←[32m'MODULE_NOT_FOUND'←[39m,
  requireStack: []
}
```
First, try to find the location of pnpm by running: which pnpm. 如果您使用的是 Windows，请在 Git Bash 中运行此命令。 您将获得 pnpm 命令的位置，例如：
```
$ which pnpm
/c/Program Files/nodejs/pnpm
```
Now that you know where the pnpm CLI is, open that directory and remove any pnpm-related files (pnpm.cmd, pnpx.cmd, pnpm, etc). 完成后，再次安装 pnpm。现在它应该按照预期正常工作。
## 使用更短的别名
pnpm might be hard to type, so you may use a shorter alias like pn instead.
#### 在 POSIX 系统上添加永久别名
Just put the following line to your .bashrc, .zshrc, or config.fish:
```
alias pn=pnpm
```
#### 在 Powershell (Windows) 中添加永久别名：
在具有管理员权限的 Powershell 窗口中执行：
```
notepad $profile.AllUsersAllHosts
```
In the profile.ps1 file that opens, put:
```
set-alias -name pn -value pnpm
```
保存文件并关闭窗口。 您可能需要关闭所有打开的 Powershell 窗口才能使别名生效。
## 卸载 pnpm
卸载pnpm可参考： [Uninstalling pnpm](https://pnpm.io/zh/uninstall).
