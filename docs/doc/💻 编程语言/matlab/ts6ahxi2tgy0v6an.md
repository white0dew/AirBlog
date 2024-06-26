---
title: 第 1 章 初识 MATLAB
urlname: ts6ahxi2tgy0v6an
date: '2024-06-25 22:32:32'
updated: '2024-06-25 22:33:35'
cover: 'https://cdn.nlark.com/yuque/__mermaid_v3/9ba70e23e6911c9b9daad4aabdaa02c8.svg'
description: 'keywords: MATLAB, 安装, 界面, 入门, 第一个程序欢迎来到 MATLAB 的世界！作为一名工程师和 MATLAB 编程的爱好者,我非常高兴能与大家分享我的知识和经验。无论你是编程新手还是有经验的开发者,MATLAB 都能为你打开一扇通往高效科学计算和工程设计的大门。在这一章...'
keywords: 'MATLAB, 安装, 界面, 入门, 第一个程序'
---
欢迎来到 MATLAB 的世界！作为一名工程师和 MATLAB 编程的爱好者,我非常高兴能与大家分享我的知识和经验。无论你是编程新手还是有经验的开发者,MATLAB 都能为你打开一扇通往高效科学计算和工程设计的大门。
在这一章节中,我们将首先对 MATLAB 进行简单介绍,了解它的发展历史和主要应用领域。接下来,我会手把手教大家如何下载安装 MATLAB,并带领大家熟悉 MATLAB 的界面布局和各个组件的功能。
作为热身,我们将编写第一个 MATLAB 程序,感受 MATLAB 编程的乐趣。让我们开启 MATLAB 学习之旅吧！
## 1.1 MATLAB 简介
### 1.1.1 MATLAB 的历史和发展
MATLAB 是由 MathWorks 公司开发的商业数学软件,其名称源于 Matrix Laboratory(矩阵实验室)的缩写。自 1984 年首次发布以来,MATLAB 凭借其强大的矩阵运算能力和丰富的工具箱,在科学计算、工程设计等领域得到了广泛应用。
经过几十年的发展,MATLAB 已经从最初的矩阵运算工具发展成为一个涵盖数值计算、符号运算、图形可视化、算法开发等多方面功能的综合性数学软件。目前,MATLAB 已推出至 R2022b 版本,新版本不断加入新的功能和改进,以满足不同领域用户的需求。
![](https://oss1.aistar.cool/elog-offer-now/e839f5ed6152d840a542a0dc83f35e3c.svg)### 1.1.2 MATLAB 的应用领域
MATLAB 在各个领域都有广泛应用,下面列举一些主要的应用领域:

- **科学计算**: MATLAB 强大的矩阵运算和数值分析能力,使其成为科学计算领域的常用工具。无论是数学建模、算法仿真,还是数据分析与可视化,MATLAB 都能提供高效的解决方案。
- **控制系统**: MATLAB 提供了专门用于控制系统设计的 Control System Toolbox,可以方便地进行系统建模、分析和仿真。很多控制工程师都喜欢用 MATLAB 来设计和优化控制算法。
- **信号处理**: MATLAB 在信号处理领域也有广泛应用。利用 MATLAB 及其 Signal Processing Toolbox,工程师们可以方便地进行滤波器设计、频谱分析、信号降噪等操作。
- **图像处理**: 图像工程师的必备工具非 MATLAB 莫属。Image Processing Toolbox 提供了丰富的图像处理函数,使得图像的读取、增强、分割、特征提取等操作变得非常简单。
- **机器学习**: 近年来,MATLAB 在机器学习领域的应用越来越广泛。Statistics and Machine Learning Toolbox 和 Deep Learning Toolbox 使得在 MATLAB 中进行传统机器学习乃至深度学习成为可能。

除此之外,MATLAB 在金融分析、生物信息、航空航天等领域也有广泛应用。可以说,只要涉及数学计算和算法的地方,就少不了 MATLAB 的身影。
### 1.1.3 MATLAB 的主要功能
MATLAB 提供了丰富的功能,主要包括:

- **数值计算**: MATLAB 拥有强大的矩阵运算和数值分析能力,并提供了大量数学函数,使得复杂的数值计算变得简单直观。
- **符号运算**: 利用 Symbolic Math Toolbox,MATLAB 可以进行符号运算,包括符号方程求解、微积分运算、符号简化等。
- **2D/3D 绘图**: MATLAB 有非常强大的绘图功能,无论是 2D 平面图形还是 3D 立体图形,都能轻松绘制。并且支持图形的编辑和导出。
- **程序开发**: 作为一种编程语言,MATLAB 支持程序开发的各个环节,包括编辑、调试、测试和发布等。MATLAB 的语法简洁易学,适合科学计算程序的快速开发。
- **图形用户界面(GUI)**: MATLAB 提供了功能强大的 GUI 开发工具,允许用户通过拖放的方式快速生成图形界面,非常适合开发科学计算软件。
- **外部程序接口**: MATLAB 可以与其他编程语言(如 C、C++、Fortran、Python)进行交互,还可以与硬件设备通信。这使得 MATLAB 的应用范围大大扩展。
- **工具箱扩展**: MathWorks 为 MATLAB 提供了大量工具箱,每个工具箱针对特定领域提供了大量功能。用户也可以开发自己的工具箱在 MATLAB 中使用。
## 1.2 MATLAB 的安装与环境配置
### 1.2.1 下载与安装 MATLAB
MATLAB 是商业软件,需要从 MathWorks 官网购买许可并下载。安装步骤如下:

1. 进入[MathWorks 官网](https://www.mathworks.com),点击右上角的"登录"按钮,登录你的 MathWorks 账号(没有账号的读者请先注册)。
2. 登录后,进入个人账户页面,在左侧菜单栏找到"下载"选项,点击进入。
3. 在下载页面,选择你需要安装的 MATLAB 版本(一般选择最新版),并选择适合你操作系统的安装文件(Windows/Linux/macOS),点击下载。
4. 下载完成后,双击安装文件,按照提示一步步完成安装。安装过程中需要输入 MathWorks 账号的 License 信息。
### 1.2.2 MATLAB 的启动和退出
安装完成后,你就可以开始使用 MATLAB 了。在 Windows 系统中,可以通过以下两种方式启动 MATLAB:

1. 在开始菜单中找到 MATLAB 文件夹,点击 MATLAB 应用图标启动。
2. 在 MATLAB 安装目录下找到`bin`文件夹,双击`matlab.exe`启动。

启动后,你将看到 MATLAB 的主界面。当你使用完 MATLAB,可以通过以下两种方式退出:

1. 在 MATLAB 主界面,点击右上角的 "X" 按钮关闭窗口。
2. 在 MATLAB Command Window 中输入`quit`或`exit`命令并回车。
### 1.2.3 工作环境的配置
为了更高效地使用 MATLAB,建议对工作环境进行一些配置:

1. **设置工作目录**: 在 MATLAB 中,当前工作目录非常重要,它决定了 MATLAB 的文件读写位置。你可以通过以下方式设置工作目录:

   - 在 MATLAB 主界面,点击"Home"选项卡,在"Environment"部分找到 "Current Folder",点击选择你的工作目录。
   - 在 MATLAB Command Window 中使用`cd`命令改变当前目录,如`cd C:\Users\YourName\Documents\MATLAB`。
2. **管理搜索路径**: MATLAB 的搜索路径决定了 MATLAB 在哪些位置搜索文件。将常用的文件夹添加到搜索路径可以方便地访问其中的文件。设置方法如下:

   - 在 MATLAB 主界面,点击"Home"选项卡,在"Environment"部分点击 "Set Path"。
   - 在弹出的窗口中,点击 "Add Folder..." 按钮,选择要添加的文件夹。
   - 点击 "Save" 按钮保存设置。
3. **个性化设置**: MATLAB 允许用户对界面、字体、配色等进行个性化设置,以满足个人偏好。设置方法如下:
   - 在 MATLAB 主界面,点击"Home"选项卡,在"Environment"部分点击 "Preferences"。
   - 在弹出的窗口中,可以对 MATLAB 的各个方面进行设置。
   - 设置完成后点击 "OK" 按钮保存。
## 1.3 MATLAB 界面介绍
MATLAB 的界面由多个部分组成,了解每个部分的功能对我们熟悉 MATLAB 很有帮助。下面我将介绍主界面中几个重要的组件。
### 1.3.1 MATLAB 桌面组件
打开 MATLAB,你首先看到的就是 MATLAB Desktop(MATLAB 桌面)。它由菜单栏、工具栏和多个面板组成,是 MATLAB 的控制中心。我们可以在这里访问各种工具和资源。
### 1.3.2 命令窗口
命令窗口(Command Window)是 MATLAB 最重要的组件之一。在这里,你可以输入 MATLAB 命令并立即执行。MATLAB 会在命令窗口显示命令的输出结果。学会在命令窗口中与 MATLAB 进行交互,是掌握 MATLAB 的第一步。
在命令窗口中,你会看到一个 `>>` 符号,这是 MATLAB 的命令提示符。你可以在提示符后输入命令,按回车键执行。例如,试试输入以下命令:
```matlab
>> disp('Hello, MATLAB!')
```
按下回车键,你会在命令窗口看到输出结果:
```
Hello, MATLAB!
```
就是这么简单!命令窗口让 MATLAB 编程变得直观而有趣。
### 1.3.3 工作区
工作区(Workspace)是存储 MATLAB 变量的地方。在 MATLAB 中,每当你创建一个变量,它就会出现在工作区中。在 MATLAB 主界面,你可以看到"Workspace"面板,它显示了当前工作区中的所有变量及其值。
让我们在命令窗口中创建几个变量:
```matlab
>> x = 1
>> y = 2
>> z = x + y
```
现在,查看"Workspace"面板,你会看到 `x`, `y`, `z` 三个变量及其值。通过工作区,你可以方便地查看和管理 MATLAB 变量。
### 1.3.4 文件浏览器
MATLAB 的"Current Folder"面板实际上是一个文件浏览器,它显示了当前工作目录下的文件和子文件夹。你可以使用它来浏览和管理 MATLAB 文件。
双击文件浏览器中的 `.m` 文件,可以在编辑器中打开该文件。右键点击文件或文件夹,可以进行新建、删除、重命名等操作。
### 1.3.5 编辑器
MATLAB 提供了一个强大的编辑器,用于创建和编辑 MATLAB 程序文件(`.m` 文件)。在编辑器中,你可以编写、调试和运行 MATLAB 代码。
在 MATLAB 主界面,点击"New Script"按钮,可以打开一个新的编辑器窗口。在编辑器中,你可以输入 MATLAB 命令,并通过点击"Run"按钮或按 `F5` 键运行代码。
编辑器提供了语法高亮、代码补全、断点调试等功能,大大提高了代码编写的效率。学会使用编辑器,是 MATLAB 编程的必备技能。
## 1.4 第一个 MATLAB 程序
学习任何一门编程语言,第一个程序往往是输出 "Hello, World!"。对 MATLAB 来说也不例外。让我们在 MATLAB 中输出 "Hello, MATLAB!"。
### 1.4.1 创建脚本文件
在 MATLAB 主界面,点击"New Script"按钮,打开一个新的编辑器窗口。你也可以使用快捷键 `Ctrl+N` 打开新的编辑器窗口。
### 1.4.2 编写简单的 MATLAB 代码
在编辑器中,输入以下代码:
```matlab
disp('Hello, MATLAB!');
```
这行代码使用 `disp` 函数显示字符串 'Hello, MATLAB!'。
### 1.4.3 运行 MATLAB 程序
要运行这个程序,你有以下几种方式:

1. 点击编辑器上方的"Run"按钮。
2. 按下`F5`键。
3. 在编辑器窗口中右键,选择"Run"。

运行后,你会在命令窗口看到输出结果:
```
Hello, MATLAB!
```
恭喜你,你已经成功编写并运行了第一个 MATLAB 程序!
### 1.4.4 保存和加载工作空间
在 MATLAB 中,你可以将当前工作空间中的所有变量保存到一个 `.mat` 文件中,下次使用时可以直接加载这个文件,恢复之前的工作状态。
要保存当前工作空间,可以使用以下命令:
```matlab
save('myWorkspace.mat');
```
这会将当前工作空间保存到当前文件夹下的 `myWorkspace.mat` 文件中。
要加载之前保存的工作空间,可以使用以下命令:
```matlab
load('myWorkspace.mat');
```
这会将 `myWorkspace.mat` 文件中的变量加载到当前工作空间中。
学会保存和加载工作空间,可以大大提高 MATLAB 的工作效率。
