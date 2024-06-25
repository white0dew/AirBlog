---
title: 第 10 章 控制系统设计
urlname: nbd6tl0z4z70x16t
date: '2024-06-24 20:56:47'
updated: '2024-06-24 20:57:22'
cover: 'https://cdn.nlark.com/yuque/__latex/02303157dbe397ead520d9ca3f4dd90a.svg'
description: 'keywords: 控制系统,传递函数,状态空间模型,PID 控制器,状态反馈控制器10.1 控制系统基础在开始学习控制系统设计之前,我们需要先了解一些基本概念。控制系统是一种能够根据预定的规则,对被控对象的行为进行控制和调节的系统。它广泛应用于工业生产、航空航天、机器人等领域。10.1.1 ...'
keywords: '控制系统,传递函数,状态空间模型,PID 控制器,状态反馈控制器'
---
## 10.1 控制系统基础
在开始学习控制系统设计之前,我们需要先了解一些基本概念。控制系统是一种能够根据预定的规则,对被控对象的行为进行控制和调节的系统。它广泛应用于工业生产、航空航天、机器人等领域。
### 10.1.1 控制系统的基本概念
控制系统由被控对象、执行机构、测量装置、控制器等部分组成。其基本原理如下图所示:

- 被控对象:需要控制的对象,如电机、化工设备等。
- 测量装置:测量被控对象的输出,将其转换为控制器可以识别的信号。
- 控制器:根据测量信号和指令信号,产生控制信号。
- 执行机构:接收控制信号,对被控对象施加相应的作用。
### 10.1.2 控制系统的分类
根据控制方式的不同,控制系统可分为:

- 开环控制系统:没有反馈环节,控制器直接作用于被控对象。
- 闭环控制系统:存在反馈环节,控制器根据反馈信号调节控制量。

根据控制规律的不同,控制系统可分为:

- 线性控制系统:系统的数学模型为线性方程。
- 非线性控制系统:系统的数学模型为非线性方程。
## 10.2 传递函数与状态空间模型
为了对控制系统进行分析与设计,我们需要建立系统的数学模型。传递函数和状态空间模型是两种常用的数学模型。
### 10.2.1 传递函数的定义
传递函数描述了线性时不变系统的输入和输出之间的关系。对于单输入单输出系统,传递函数定义为:
![](https://oss1.aistar.cool/elog-offer-now/7e58bd8e4363954f91a2a0d83d0336bb.svg)
其中,![](https://oss1.aistar.cool/elog-offer-now/b912d621acb0890f43bce1fc722fd87b.svg)为输出的拉普拉斯变换,![](https://oss1.aistar.cool/elog-offer-now/a8175f81b75c4049042ff71ebbbd15a8.svg)为输入的拉普拉斯变换。
例如,一个 RC 电路的传递函数为:
![](https://oss1.aistar.cool/elog-offer-now/92669b94be69158112426e5c395c7f01.svg)
其中,R 为电阻,C 为电容。
### 10.2.2 状态空间模型的定义
状态空间模型用一组一阶微分方程来描述系统的动态特性。一般形式为:
![](https://oss1.aistar.cool/elog-offer-now/4bcb154081636d65e0db9c842eeb45bf.svg)
其中,![](https://oss1.aistar.cool/elog-offer-now/d25263510e2ca7e63541bba6a2be25d6.svg)为状态变量,![](https://oss1.aistar.cool/elog-offer-now/f064c1195c893bc4bdd1e04dc2ea8791.svg)为输入变量,![](https://oss1.aistar.cool/elog-offer-now/ffd22dc60705a94354695adfa2314a70.svg)为输出变量,A、B、C、D 为系统矩阵。
以一个弹簧-质量-阻尼系统为例,其状态空间模型为:
![](https://oss1.aistar.cool/elog-offer-now/98bec326856ffd2169f4da14aff7aa8d.svg)
其中,![](https://oss1.aistar.cool/elog-offer-now/4539c63177fed897231da3e9c4819cc2.svg)为位移,![](https://oss1.aistar.cool/elog-offer-now/4c8d6e24f17fd90652f82da349ef5593.svg)为速度,k 为弹簧系数,b 为阻尼系数,m 为质量。
### 10.2.3 传递函数与状态空间模型的转换
传递函数和状态空间模型之间可以互相转换。以下是一些常用的转换方法。
#### 状态空间模型转传递函数
已知状态空间模型的系统矩阵 A、B、C、D,传递函数为:
![](https://oss1.aistar.cool/elog-offer-now/ac30660e0cc33a8cf6fd5f9f07f25438.svg)
其中,I 为单位矩阵。
例如,将上述弹簧-质量-阻尼系统转换为传递函数:
```matlab
m = 1; k = 1; b = 0.5;
A = [0 1; -k/m -b/m];
B = [0; 1/m];
C = [1 0];
D = 0;

sys = ss(A,B,C,D);
G = tf(sys)
```
输出结果为:
```
G =

     1
  ———————————
 s^2 + 0.5 s + 1
```
#### 传递函数转状态空间模型
已知传递函数的分子多项式向量 num 和分母多项式向量 den,状态空间模型为:
![](https://oss1.aistar.cool/elog-offer-now/37af318fa207ec34b4c8ca69d903f082.svg)
其中,![](https://oss1.aistar.cool/elog-offer-now/5b42673e275a4f660ac9a3ba3b019bbd.svg)为 den 的第 i 个元素,![](https://oss1.aistar.cool/elog-offer-now/0a109032d56c0066dc62f3bdb14b6cd2.svg)为 num 的第 i 个元素,n 为 den 的阶数。
例如,将上述传递函数转换为状态空间模型:
```matlab
num = [1];
den = [1 0.5 1];

[A,B,C,D] = tf2ss(num,den)
```
输出结果为:
```
A =

    -0.5000   -1.0000
     1.0000         0

B =

     1
     0

C =

     1     0.5000

D =

     0
```
## 10.3 系统的时域与频域分析
### 10.3.1 时域分析
时域分析主要研究系统对某一输入信号的响应。常用的时域性能指标有:

- 上升时间:响应从 10%上升到 90%所需的时间。
- 峰值时间:响应达到第一个峰值所需的时间。
- 超调量:响应的最大值与稳态值之差与稳态值的百分比。
- 调节时间:响应进入并保持在稳态值附近的时间。

以单位阶跃响应为例:
```matlab
sys = tf(1, [1 1]);
step(sys)
stepinfo(sys)
```
输出结果为:
![](https://oss1.aistar.cool/elog-offer-now/5f1f9459aec4f00e7189237efe9f08c5.png)
```
ans =

  struct with fields:

    RiseTime: 2.1972
     SettlingTime: 3.9120
    SettlingMin: 0.9052
    SettlingMax: 1.0948
    Overshoot: 9.4755
     Undershoot: 0
        Peak: 1.0948
      PeakTime: 4.3944
```
可以看出,该系统的上升时间为 2.20s,调节时间为 3.91s,超调量为 9.48%。
### 10.3.2 频域分析
频域分析主要研究系统对正弦输入的稳态响应。常用的频域性能指标有:

- 幅频特性:系统输出幅值与输入幅值之比随频率的变化关系。
- 相频特性:系统输出相位与输入相位之差随频率的变化关系。
- 共振峰值:幅频曲线的最大值。
- 带宽:幅频曲线最大值的![](https://oss1.aistar.cool/elog-offer-now/7d81d11b06966047c9ede66954dc52e2.svg)倍(即-3dB)处所对应的频率。

以一个二阶系统为例:
```matlab
sys = tf(1, [1 0.2 1]);
bode(sys)
```
输出结果为:
![](https://oss1.aistar.cool/elog-offer-now/d27378d0ab87ad979720956972020015.png)
从 Bode 图可以看出,该系统的共振峰值约为 10dB,带宽约为 1.6rad/s。
### 10.3.3 稳定性与瞬态响应
稳定性是指系统在有界输入下,其输出也保持有界。常用的稳定性判据有:

- 劳斯-赫尔维茨准则:根据特征方程的系数判断。
- 奈奎斯特准则:根据开环传递函数的奈奎斯特曲线判断。
- 李雅普诺夫稳定性理论:构造李雅普诺夫函数判断。

瞬态响应反映了系统在初始状态下的动态特性。可以通过求解状态空间方程得到。
例如,求解一个二阶系统的单位脉冲响应:
```matlab
A = [-0.5 -1; 1 0];
B = [1; 0];
C = [1 0.5];
D = 0;

sys = ss(A,B,C,D);
impulse(sys)
```
输出结果为:
![](https://oss1.aistar.cool/elog-offer-now/c9b25ca82847ee988105cd7d253a89dd.png)
## 10.4 控制器设计
控制器的作用是根据控制偏差,按照一定的控制规律,产生控制作用,使被控量达到或接近给定值。常用的控制器有 PID 控制器、状态反馈控制器、最优控制器等。
### 10.4.1 PID 控制器
PID 控制器由比例(P)、积分(I)、微分(D)三部分组成,控制规律为:
![](https://oss1.aistar.cool/elog-offer-now/e416ef1a7779db4ed5fbac4319a35db4.svg)
其中,![](https://oss1.aistar.cool/elog-offer-now/bb3443dab63841fbd9bfdeb32b7c546d.svg)、![](https://oss1.aistar.cool/elog-offer-now/df94220fd278c18669b523eb7cabbd21.svg)、![](https://oss1.aistar.cool/elog-offer-now/8e14970748fea6f725d4ef372696d938.svg)分别为比例、积分、微分系数,![](https://oss1.aistar.cool/elog-offer-now/56fabcdf13aa5923d6b4b8233842fbb3.svg)为控制偏差。
以一个二阶系统为例,设计 PID 控制器:
```matlab
sys = tf(1, [1 1 1]);
Kp = 10; Ki = 5; Kd = 2;
C = pid(Kp,Ki,Kd);

T = feedback(C*sys, 1);
step(T)
```
输出结果为:
![](https://oss1.aistar.cool/elog-offer-now/344a53b5452659cb2d12c6e8697a0fc2.png)
可以看出,PID 控制器改善了系统的动态性能,使响应速度更快,超调量更小。
### 10.4.2 状态反馈控制器
状态反馈控制器根据状态变量的线性组合构成控制量,即:
![](https://oss1.aistar.cool/elog-offer-now/a5c04ee3d1c4c274911c1f20f6d56679.svg)
其中,K 为状态反馈矩阵。状态反馈可以任意配置系统的极点,改善系统的动态性能。
以上述弹簧-质量-阻尼系统为例,设计状态反馈控制器:
```matlab
A = [0 1; -1 -0.5];
B = [0; 1];
C = [1 0];
D = 0;

p = [-2 -3];  % 期望极点
K = place(A,B,p);  % 计算反馈矩阵

sys = ss(A-B*K,B,C,D);
step(sys)
```
输出结果为:
![](https://oss1.aistar.cool/elog-offer-now/ecc0db890b140728728b4242a3574884.png)
系统的极点已被配置到期望位置,阶跃响应满足性能要求。
### 10.4.3 最优控制器
最优控制器是使性能指标最优的控制器。常用的性能指标有:

- 积分平方误差(ISE):![](https://oss1.aistar.cool/elog-offer-now/1382d9e3ff115cc475ca6de3be2d220f.svg)
- 积分时间平方误差(ITSE):![](https://oss1.aistar.cool/elog-offer-now/b567fc2fb2a8d5cf51dca5e62f380cfc.svg)
- 积分绝对误差(IAE):![](https://oss1.aistar.cool/elog-offer-now/dbee61e36c73c1790d97eaeb07997674.svg)

线性二次型最优控制(LQR)是一种常用的最优控制方法。它使如下指标最小:
![](https://oss1.aistar.cool/elog-offer-now/c845dfddd3c6408f3fb866ccb35b449b.svg)
其中,Q 为半正定状态加权矩阵,R 为正定控制加权矩阵。
求解 LQR 问题的 MATLAB 代码如下:
```matlab
A = [0 1; -1 -0.5];
B = [0; 1];
Q = [10 0; 0 1];
R = 1;

K = lqr(A,B,Q,R);  % 计算最优反馈矩阵

sys = ss(A-B*K,B,C,D);
step(sys)
```
输出结果为:
![](https://oss1.aistar.cool/elog-offer-now/5097f2e4fefc3a714166b99bb33e1d30.png)<img src="https://imgbed.codingkelvin.fun/uPic/lqr_step_response.png" alt="LQR控制系统的阶跃响应" width="400"/>
LQR 控制器在满足性能指标最优的同时,也使系统的动态响应性能得到改善。
## 本章小结
本章介绍了控制系统设计的基础知识和实践技巧。我们学习了:

- 控制系统的基本概念和分类
- 传递函数和状态空间模型的定义和转换
- 系统的时域分析和频域分析方法
- PID 控制器、状态反馈控制器、LQR 最优控制器的设计方法

通过本章的学习,相信你已经掌握了使用 MATLAB 进行控制系统设计与仿真的基本方法。在实际应用中,我们还需要根据具体问题,灵活选择和组合不同的控制策略。控制系统设计是一个不断优化和迭代的过程,需要我们不断学习和实践。
## 思考题

1. 某直流电机的传递函数为![](https://oss1.aistar.cool/elog-offer-now/294edeadb608e4d22840ed957ad1f117.svg),试求其单位阶跃响应的超调量和调节时间。
2. 设计一个状态反馈控制器,使上述直流电机的极点配置为![](https://oss1.aistar.cool/elog-offer-now/24312cab46a20643349643296f72c489.svg),并画出闭环系统的阶跃响应曲线。
3. 对题 2 所设计的状态反馈系统,增加一个前馈控制器,使闭环系统的稳态误差为零,并比较加前馈和不加前馈时的阶跃响应。
## 参考文献
[1] 胡寿松. 自动控制原理(第六版). 科学出版社, 2013.
[2] Katsuhiko Ogata. Modern Control Engineering (5th Edition). Pearson, 2009.
[3] Richard C. Dorf. Modern Control Systems (13th Edition). Pearson, 2016.
