---
title: 第 11 章 仿真与建模
urlname: ffo21vig2vd3vg1n
date: '2024-06-25 22:28:54'
updated: '2024-06-25 22:29:10'
description: 'keywords: simulink, 仿真, 建模, 自动控制系统在 MATLAB 中,Simulink 是一个功能强大的可视化仿真与建模工具。通过 Simulink,我们可以方便地搭建复杂系统的模型,并进行仿真分析。本章将详细介绍 Simulink 的使用方法,并通过一个自动控制系统的实例...'
keywords: 'simulink, 仿真, 建模, 自动控制系统'
---
在 MATLAB 中,Simulink 是一个功能强大的可视化仿真与建模工具。通过 Simulink,我们可以方便地搭建复杂系统的模型,并进行仿真分析。本章将详细介绍 Simulink 的使用方法,并通过一个自动控制系统的实例,讲解如何使用 Simulink 进行系统建模、仿真,以及结果分析。
## 11.1 Simulink 简介
### 11.1.1 Simulink 的基本概念
Simulink 是 MATLAB 的一个重要组成部分,它提供了一种基于模型的设计方法,用于对动态系统进行建模、仿真和分析。通过 Simulink,我们可以使用图形化的方式,通过拖放各种模块来搭建系统模型。
Simulink 支持多领域建模,包括:

- 控制系统
- 信号处理
- 通信系统
- 机器人技术
- 汽车动力学
- 航空航天系统

等众多领域。它为这些领域提供了丰富的模块库,大大提高了建模的效率。
### 11.1.2 Simulink 的界面介绍
让我们先来熟悉一下 Simulink 的界面。启动 MATLAB 后,在命令行窗口输入`simulink`命令,即可打开 Simulink 的主界面:
![](https://oss1.aistar.cool/elog-offer-now/ea289d178261156ef1673dc31a9ee1eb.png)
Simulink 主界面主要包括以下几个部分:

1. 菜单栏:提供各种操作命令,如文件管理、编辑、工具等。
2. 工具栏:提供常用的操作按钮,如新建模型、打开模型、保存等。
3. 模块浏览器:显示 Simulink 提供的各种模块库。
4. 模型编辑区:用于创建和编辑 Simulink 模型。
5. 模型浏览器:显示当前模型中的层次结构。

通过界面上的这些元素,我们就可以方便地使用 Simulink 进行建模和仿真了。
## 11.2 使用 Simulink 进行建模
接下来,我们就来学习如何使用 Simulink 进行建模。Simulink 建模的基本流程如下:

1. 创建新的模型文件
2. 从模块库中拖放所需的模块
3. 设置模块参数
4. 连接模块
5. 配置仿真参数
6. 运行仿真
### 11.2.1 创建 Simulink 模型
首先,我们需要创建一个新的 Simulink 模型文件。在 Simulink 主界面上,点击"Blank Model"按钮,即可新建一个空白模型:
![](https://oss1.aistar.cool/elog-offer-now/d0868a0934636830575495b1ab38f58d.png)
这时,会打开一个空白的模型编辑窗口,我们就可以在这里搭建模型了。
### 11.2.2 模型的组成与连接
Simulink 模型是由各种模块(Block)组成的。这些模块可以从 Simulink 库中拖放到模型编辑区。Simulink 提供了非常丰富的模块库,涵盖了各种领域的常用模块。例如在常用的"Sources"库中,就包括了以下模块:

- Constant:常量信号源
- Sine Wave:正弦波信号源
- Pulse Generator:脉冲信号源
- Clock:时钟信号源

等。我们可以根据需要,选取合适的模块来搭建系统模型。
将模块添加到模型后,我们还需要使用连线(Line)将它们连接起来,以确定信号的流向。例如,我们可以将一个正弦波信号源连接到示波器(Scope),观察信号的波形:
### 11.2.3 使用 Simulink 库
为了更高效地使用 Simulink,我们需要熟悉 Simulink 库的结构。可以在模块浏览器中查看 Simulink 库的层次结构:
![](https://oss1.aistar.cool/elog-offer-now/f295ec2fc7b4d60702a7894462cd4ecf.png)
Simulink 库按照不同领域和功能,组织为一个树形结构。一些常用的库有:

- Continuous:连续系统模块
- Discrete:离散系统模块
- Math Operations:数学运算模块
- Sinks:信号输出模块
- Sources:信号源模块

此外,Simulink 还提供了针对特定领域的子库,如:

- Aerospace Blockset:航空航天系统库
- Powertrain Blockset:动力系统库
- Statistics and Machine Learning Toolbox:统计与机器学习库

我们可以根据需要,选择合适的库来查找所需的模块。Simulink 库的模块一般都有详细的帮助文档,方便我们学习模块的功能和用法。
## 11.3 仿真结果的分析
搭建完系统模型后,我们就可以进行仿真,并分析仿真结果了。下面介绍 Simulink 仿真的基本步骤。
### 11.3.1 运行 Simulink 仿真
在 Simulink 模型编辑窗口中,点击工具栏上的"Run"按钮,就可以开始仿真:
![](https://oss1.aistar.cool/elog-offer-now/f0150013e535e2815eee7aa4f4b6ebcd.png)
仿真过程中,Simulink 会根据模型的连接关系,自动计算各个信号的值,直到仿真结束。
### 11.3.2 仿真结果的查看与分析
仿真完成后,我们可以通过示波器等 Scope 模块,直观地查看信号的波形。例如,下图是一个正弦波信号的仿真波形:
![](https://oss1.aistar.cool/elog-offer-now/c4552db3c2f8d7bfe082397cf75f742e.png)
通过分析仿真波形,我们可以直观地判断系统的响应特性,如:

- 振幅
- 频率
- 相位
- 稳态误差

等。这为我们优化系统性能提供了重要依据。
除了示波器,Simulink 还提供了其他可视化工具,如:

- Display:数值显示器
- XY Graph:二维相图
- To Workspace:保存数据到工作区

利用这些工具,我们可以更全面地分析仿真数据。
### 11.3.3 仿真数据的导出
有时,我们可能需要导出仿真数据,以便在 MATLAB 中进一步分析。最简单的方法是使用"To Workspace"模块,它可以将信号数据保存到 MATLAB 工作区的变量中:
![](https://oss1.aistar.cool/elog-offer-now/dd5a1b12c43a1c4c9e7a4d05cae391f5.png)
保存后的数据,就可以在 MATLAB 中像普通变量一样访问和分析了。我们还可以使用 MATLAB 强大的绘图功能,对仿真数据进行可视化分析。
## 11.4 实例:自动控制系统
下面,让我们通过一个自动控制系统的实例,来综合运用本章学到的 Simulink 知识。
### 11.4.1 自动控制系统的建模
假设我们要设计一个简单的温度控制系统。系统由一个温度传感器、一个 PID 控制器和一个加热器组成,目标是使温度稳定在设定值。
首先,我们在 Simulink 中搭建系统模型。温度传感器可以用一个"Transfer Fcn"模块表示,PID 控制器用"PID Controller"模块,加热器也用"Transfer Fcn"表示。为了模拟温度环境,我们还需要添加一个"Constant"模块,作为环境温度。最后,用"Scope"显示实际温度和设定温度。
搭建好的 Simulink 模型如下:
![](https://oss1.aistar.cool/elog-offer-now/5afd02da6c51fb8752761fc82db30b4b.png)
### 11.4.2 自动控制系统的仿真
模型搭建好后,我们就可以进行仿真了。设置 PID 控制器参数和仿真时间后,点击"Run"按钮开始仿真。
仿真完成后,我们可以在"Scope"中查看温度响应曲线:
![](https://oss1.aistar.cool/elog-offer-now/96bba781028ae000d87efef1ce5bbf61.png)
从图中可以看出,在控制作用下,实际温度很快达到并稳定在设定值附近,说明我们的温度控制系统是有效的。
### 11.4.3 仿真结果的分析与优化
但是,仔细观察会发现,实际温度存在一定的超调和震荡,控制性能还有提升的空间。我们可以尝试调整 PID 控制器的参数,如:

- 比例系数(P):影响控制响应速度
- 积分时间常数(I):影响消除静差的能力
- 微分时间常数(D):影响抑制超调的能力

通过反复仿真和参数调优,我们可以找到一组满意的控制器参数,使系统获得理想的控制性能。
下图是优化后的温度响应曲线,可以看到超调和震荡明显减小,控制性能得到改善:
![](https://oss1.aistar.cool/elog-offer-now/7d9405fe3208857913939e5a75302ee9.png)
通过这个实例,我们演示了使用 Simulink 进行自动控制系统建模、仿真与优化的完整过程。Simulink 直观的图形化建模方式,以及便捷的仿真与分析工具,大大提高了控制系统设计的效率。
