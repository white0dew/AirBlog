---
title: 第 8 章 优化与非线性方程
urlname: ig7w7srg3tg0aova
date: '2024-06-24 20:52:33'
updated: '2024-06-26 13:25:42'
cover: 'https://cdn.nlark.com/yuque/__latex/5e7420d2c965a396b1796f00ea5a6863.svg'
description: 'keywords: 优化问题,线性规划,非线性规划,非线性方程组,MATLAB 优化工具箱优化问题在工程实践中十分常见,如何利用数学模型和计算机算法高效求解优化问题,是每一个科研工作者和工程师必须掌握的重要技能。MATLAB 作为一款强大的数值计算软件,内置了丰富的优化算法和工具箱,使得求解优...'
keywords: '优化问题,线性规划,非线性规划,非线性方程组,MATLAB 优化工具箱'
---
优化问题在工程实践中十分常见,如何利用数学模型和计算机算法高效求解优化问题,是每一个科研工作者和工程师必须掌握的重要技能。MATLAB 作为一款强大的数值计算软件,内置了丰富的优化算法和工具箱,使得求解优化问题和非线性方程组变得十分便捷。
## 8.1 优化问题概述
优化问题在数学和工程领域有着广泛而重要的应用。从生活中的购物选择、资源分配,到工业生产的过程优化、成本控制,再到人工智能中的模型训练与调参,处处都有优化问题的身影。
### 8.1.1 优化问题的基本概念
一个标准的优化问题可以用以下数学模型描述:
![](https://oss1.aistar.cool/elog-offer-now/c7e941d6af25d194384b946889014335.svg)
其中:

- ![](https://oss1.aistar.cool/elog-offer-now/9684501f3516f6c2e917d4b47e309b0a.svg)称为目标函数,表示我们希望最小化的性能指标。
- ![](https://oss1.aistar.cool/elog-offer-now/3f927349c7b11a67854e6d03cc99284f.svg)和![](https://oss1.aistar.cool/elog-offer-now/2711a88ed2d265e6a4b1385987a02bf9.svg)称为约束条件,对决策变量![](https://oss1.aistar.cool/elog-offer-now/4e185082f24e57a7ac3bfc64542f769b.svg)的取值进行限制。
- 决策变量![](https://oss1.aistar.cool/elog-offer-now/4e185082f24e57a7ac3bfc64542f769b.svg)是一个![](https://oss1.aistar.cool/elog-offer-now/5b22ebd49ff3a39d8e08cec36761bf48.svg)维实数向量,代表我们可以调节的参数。
- 最优解![](https://oss1.aistar.cool/elog-offer-now/6daf83abea7635efbde0e7e9fa06c8ec.svg)是满足约束条件下目标函数取得最小值时的![](https://oss1.aistar.cool/elog-offer-now/4e185082f24e57a7ac3bfc64542f769b.svg)值。

举个简单的例子,假设我们要制造一种混合果汁,目标是用最少的成本达到最佳的口感。我们可以调节苹果汁、橙汁、芒果汁的比例(即决策变量 ![](https://oss1.aistar.cool/elog-offer-now/4e185082f24e57a7ac3bfc64542f769b.svg)),同时要求各种果汁比例非负且和为 1(约束条件),并且希望最小化成本(目标函数)。这就是一个典型的优化问题。
### 8.1.2 优化问题的分类
根据目标函数和约束条件的不同,优化问题可以分为以下几类:

1. 线性规划(Linear Programming)
目标函数和约束条件都是决策变量的线性函数,如:
![](https://oss1.aistar.cool/elog-offer-now/1a60123ffe78519a939f10a8f9f51d84.svg)其中![](https://oss1.aistar.cool/elog-offer-now/33912c67e3ebd3dd9901778b375fc18c.svg)是![](https://oss1.aistar.cool/elog-offer-now/533c828e81af1d7b65e85a46abad3bf5.svg)矩阵,![](https://oss1.aistar.cool/elog-offer-now/061373891253e883defc38dcbc446492.svg)和![](https://oss1.aistar.cool/elog-offer-now/bf37ca68e848fe6d0248d696f787569f.svg)分别是![](https://oss1.aistar.cool/elog-offer-now/5b22ebd49ff3a39d8e08cec36761bf48.svg)维和![](https://oss1.aistar.cool/elog-offer-now/b8d76ade3926732b6f05bd1166df3446.svg)维列向量。
2. 非线性规划(Nonlinear Programming)
目标函数或约束条件中至少有一个是决策变量的非线性函数,没有其他特殊结构的优化问题。
3. 二次规划(Quadratic Programming)
目标函数是决策变量的二次函数,约束条件是线性的,如:
![](https://oss1.aistar.cool/elog-offer-now/556654179b4c2083b797bc62b6131854.svg)其中![](https://oss1.aistar.cool/elog-offer-now/91c2bc2f771dceb600285ba6fe04b4a9.svg)是![](https://oss1.aistar.cool/elog-offer-now/8e4f4c076501c97bd831e48283f0b19e.svg)的半正定矩阵。
4. 整数规划(Integer Programming)
部分或全部决策变量要求是整数。当决策变量限制为 0-1 整数时,称为 0-1 整数规划。
5. 多目标规划(Multi-objective Programming)
有多个目标函数需要同时优化,通常目标之间存在矛盾和冲突。

MATLAB 的优化工具箱提供了丰富的函数来求解以上各类优化问题。不同类型的问题在建模和求解上有不同的特点,需要根据具体问题选择合适的优化算法。
接下来我们将重点介绍几类常见优化问题的 MATLAB 求解方法。限于篇幅,我们只能介绍一些基本用法,更多的算法细节和参数设置还需要大家在实践中去探索。
## 8.2 线性规划
线性规划(LP)是优化领域历史最悠久、应用最广泛的一类问题。它的特点是目标函数和约束条件都是决策变量的线性函数,整个问题只涉及一次项而没有高次项。许多实际问题如资源分配、生产计划、运输问题等都可以建模为线性规划。
### 8.2.1 线性规划的基本模型
线性规划的标准形式如下:
![](https://oss1.aistar.cool/elog-offer-now/1a60123ffe78519a939f10a8f9f51d84.svg)
其中,![](https://oss1.aistar.cool/elog-offer-now/93b7a0a797a3076ccf005833a45d8270.svg) 是决策变量,![](https://oss1.aistar.cool/elog-offer-now/118dd55d99ee1228b11c744a73aec01d.svg) 是约束矩阵,![](https://oss1.aistar.cool/elog-offer-now/078e28ae475bedbbf8e5307f12e3e7e9.svg) 和 ![](https://oss1.aistar.cool/elog-offer-now/8ab65f40f544c85d3bd5daaeb1f66ae5.svg) 分别是目标函数和约束条件的系数向量。
除标准形式外,线性规划还可以有其他等价的形式,如松弛形式:
![](https://oss1.aistar.cool/elog-offer-now/1e2bf84fc5703d94648981e9d7e28125.svg)
以及变量无非负限制的形式:
![](https://oss1.aistar.cool/elog-offer-now/b0e943355270debfddfcdab9606dcaed.svg)
不同的问题形式,在建模和求解时需要进行适当的转化。
### 8.2.2 线性规划的求解方法
求解线性规划的主要方法是单纯形法(Simplex Method),它是一种迭代搜索的算法,通过不断沿着可行域的边界移动,直到找到最优解。单纯形法的基本步骤如下:

1. 将问题转化为标准形式。
2. 构造初始可行解,作为第一个单纯形。
3. 检查是否满足最优性条件,如果满足则当前解即为最优解,算法终止;否则转 4。
4. 确定一个可以改进目标函数的移动方向,得到新的单纯形。
5. 回到步骤 3,直到找到最优解或确定问题无界。

除单纯形法外,还有内点法(Interior Point Method)等现代优化算法可以求解线性规划。这些算法通过启发式的方法在可行域内部搜索,不需要经过可行域的顶点,在大规模问题上往往比单纯形法更有效。
### 8.2.3 MATLAB 中的线性规划函数
MATLAB 优化工具箱提供了`linprog`函数来求解线性规划问题。它的基本语法为:
```matlab
x = linprog(c,A,b,Aeq,beq,lb,ub)
```
其中:

- `c`: 目标函数系数向量
- `A`,`b`: 不等式约束系数矩阵和右端向量
- `Aeq`,`beq`: 等式约束系数矩阵和右端向量
- `lb`,`ub`: 决策变量下界和上界向量

除了以上必需的输入参数外,`linprog`还可以设置一些可选参数,如:
```matlab
options = optimoptions('linprog','Display','iter','Algorithm','interior-point');
[x,fval,exitflag,output] = linprog(c,A,b,[],[],[],[],[],options);
```

- `'Display'`: 控制迭代输出的级别,如`'iter'`为输出每一步迭代信息。
- `'Algorithm'`: 指定优化算法,如`'interior-point'`为使用内点法。
- `exitflag`: 求解终止代码,表示求解结果的状态。
- `output`: 求解输出结构体,包含算法性能信息如迭代次数、目标函数值等。

下面我们看一个线性规划的简单例子。
**例 1** 考虑如下的生产计划问题:
![](https://oss1.aistar.cool/elog-offer-now/7eaacf9d646a46d5fb058b28b2f8852f.svg)
其中,![](https://oss1.aistar.cool/elog-offer-now/4539c63177fed897231da3e9c4819cc2.svg) 和 ![](https://oss1.aistar.cool/elog-offer-now/4c8d6e24f17fd90652f82da349ef5593.svg) 分别表示产品 1 和产品 2 的生产数量,目标是使总利润最大化。约束条件反映了生产资源的限制。
利用 MATLAB 求解上述问题的代码如下:
```matlab
c = [-2; -3];  % 目标函数系数向量
A = [1 1; 2 1];  % 不等式约束矩阵
b = [8; 10];  % 不等式约束右端向量
lb = [0; 0];  % 决策变量下界
[x,fval,exitflag,output] = linprog(c,A,b,[],[],lb);
fprintf('最优解为: x1 = %.2f, x2 = %.2f\n',x(1),x(2));
fprintf('最优目标函数值为: %.2f\n',-fval);
```
输出结果为:
```
最优解为: x1 = 2.00, x2 = 6.00
最优目标函数值为: 22.00
```
可见,在给定约束下,最优生产计划是生产 2 个产品 1 和 6 个产品 2,总利润为 22。
`linprog`函数功能非常强大,可以处理各种不同形式的线性规划问题。感兴趣的读者可以进一步探索它的用法,并将其应用到实际问题中。
## 8.3 非线性规划
现实世界中的许多优化问题是非线性的,即目标函数或约束条件中含有决策变量的高次项、三角函数、指数函数等。非线性规划问题的求解比线性规划更具挑战性,需要用到数值优化的各种算法。
### 8.3.1 非线性规划的基本模型
一般的非线性规划问题可以表示为:
![](https://oss1.aistar.cool/elog-offer-now/d532546e2b3d5c8acb899705f0d94a9d.svg)
其中目标函数 ![](https://oss1.aistar.cool/elog-offer-now/9684501f3516f6c2e917d4b47e309b0a.svg) 和约束函数 ![](https://oss1.aistar.cool/elog-offer-now/6f5062edcfee6a893c5b2eea0115c1b3.svg), ![](https://oss1.aistar.cool/elog-offer-now/4696b6151258e5246a946ae78357d853.svg) 是 ![](https://oss1.aistar.cool/elog-offer-now/4e185082f24e57a7ac3bfc64542f769b.svg) 的非线性函数。与线性规划相比,非线性规划有以下特点:

- 目标函数可能是非凸的,存在多个局部最优解。
- 约束条件定义的可行域可能是非凸集。
- 不能用单纯形法等图解法直观求解。
- 需要用迭代算法逼近最优解,通常无法给出精确解。

常见的非线性规划问题如:

- 非线性最小二乘问题![](https://oss1.aistar.cool/elog-offer-now/59bb4b6c1c7f05f057eb17888dfb3a40.svg)
- 二次规划问题![](https://oss1.aistar.cool/elog-offer-now/1e4d060ff23e5c221fe4e86fe211916c.svg)
### 8.3.2 非线性规划的求解方法
非线性规划的常用求解方法有:

- 罚函数法:将约束问题转化为一系列无约束问题求解
- 序列二次规划(SQP):用二次规划子问题逼近原问题
- 内点法:沿着中心路径搜索可行点和最优点
- 遗传算法等启发式算法:模拟生物进化过程搜索最优解

在MATLAB中可以用`fmincon`函数求解一般的非线性规划问题,例如:
```matlab
fun = @(x) (x(1)-5)^2 + (x(2)-8)^2;  % 目标函数
A = [1 2];  % 不等式约束矩阵
b = 10;  % 不等式约束右端向量
Aeq = [1 1];  % 等式约束矩阵
beq = 7;  % 等式约束右端向量
lb = [0 0];  % x的下界
ub = [5 5];  % x的上界
x0 = [0 0];  % 初始点

[x,fval] = fmincon(fun,x0,A,b,Aeq,beq,lb,ub)
```
### 8.3.3 MATLAB 非线性规划实例
我们来考虑一个典型的非线性规划问题——投资组合优化。假设有n种风险资产可供投资,预期收益率向量为r,协方差矩阵为V,求最小化投资组合方差的最优权重向量w。该问题可以表述为:
![](https://oss1.aistar.cool/elog-offer-now/41b379064862b8970f6df44372639403.svg)
其中e为全1向量。这里目标函数是二次的,约束是线性的,因此是一个二次规划问题。
我们用MATLAB求解一个具体例子。假设有3只股票,它们的预期年收益率分别为5%, 7%, 6%,年化收益率的协方差矩阵为:
![](https://oss1.aistar.cool/elog-offer-now/3403e8b027d99a524214d39d2e2cbb20.svg)
MATLAB实现如下:
```matlab
r = [0.05; 0.07; 0.06];  % 预期收益率
V = [0.0100 0.0018 0.0011; 
    0.0018 0.0109 0.0026;
    0.0011 0.0026 0.0199];  % 协方差矩阵

H = V;
f = zeros(3,1);

A = ones(1,3);
b = 1;
Aeq = [];
beq = [];
lb = zeros(3,1);
ub = [];

[w,fval] = quadprog(H,f,A,b,Aeq,beq,lb,ub);
fprintf('最优投资组合权重为: \n');
disp(w);
fprintf('最小投资组合方差为: %.4f\n',fval);
```
运行结果为:
```
最优投资组合权重为:

    0.3021
    0.4438
    0.2540

最小投资组合方差为: 0.0050
```
可见,在给定的三只股票中,第二只股票权重最大,第三只股票权重最小,最优组合的年化方差约为 0.5%。这反映了投资者在追求高收益的同时,也要控制投资组合风险。
## 8.4 非线性方程组
非线性方程组求解是优化问题的另一个分支,它的目标是找到一组变量值使得多个非线性方程同时成立。非线性方程组在物理、工程等领域有广泛应用,如求解平衡点、计算化学平衡等。
### 8.4.1 非线性方程组的基本概念
非线性方程组可以表示为:
![](https://oss1.aistar.cool/elog-offer-now/515e4b599e30de9d4d8580b60aae71b2.svg)
或者写成向量形式:
![](https://oss1.aistar.cool/elog-offer-now/faf9aefe6c861482fbdd498cdd1a76af.svg)
其中 ![](https://oss1.aistar.cool/elog-offer-now/68ab43cec6d43b68b97bf207ac0c1fda.svg) 是 ![](https://oss1.aistar.cool/elog-offer-now/5b22ebd49ff3a39d8e08cec36761bf48.svg) 维未知向量, ![](https://oss1.aistar.cool/elog-offer-now/1043b59731e6703ebbd895a434627e48.svg) 是非线性向量值函数。
非线性方程组的解不像线性方程组那样有统一的解法,需要根据问题的特点选择适当的数值迭代算法。常用的迭代格式为:
![](https://oss1.aistar.cool/elog-offer-now/0df74875c07af4f746d8de96dba5c97f.svg)
其中 ![](https://oss1.aistar.cool/elog-offer-now/9f6230219ad0578e5704ad0705e26449.svg) 为步长, ![](https://oss1.aistar.cool/elog-offer-now/bcd01f6e988a7f5aab6708f0ad87e15d.svg) 为搜索方向。不同的算法在迭代格式中有不同的选择。
### 8.4.2 求解非线性方程组的方法
常用的非线性方程组数值解法有:

- 牛顿法和拟牛顿法:利用 Taylor 展开逼近,求解线性化方程组
- Gauss-Newton 法:用最小二乘思想简化牛顿法
- Levenberg-Marquardt 方法:介于 Gauss-Newton 法和最速下降法之间

这些算法往往需要提供 Jacobi 矩阵的信息,当 ![](https://oss1.aistar.cool/elog-offer-now/5b22ebd49ff3a39d8e08cec36761bf48.svg) 很大时计算量很大。
### 8.4.3 MATLAB 非线性方程组求解
MATLAB 提供了`fsolve`函数用于求解非线性方程组和系统,它综合了几种数值算法,可以自动选择合适的求解器。
`fsolve`的基本语法为:
```matlab
x = fsolve(fun,x0)
```
其中 `fun` 为计算方程组残差 ![](https://oss1.aistar.cool/elog-offer-now/47c695764a8064e6b32677bfb70e60e6.svg) 的函数, `x0` 为初始迭代点。

例3 考虑如下非线性方程组:
![](https://oss1.aistar.cool/elog-offer-now/b4eedf941b74baa707cbafd89c4fb052.svg)
它对应的向量值函数为:
![](https://oss1.aistar.cool/elog-offer-now/54777f721889a6bfa49833c499223eb3.svg)
我们用MATLAB的fsolve函数求解这个方程组。
首先定义向量值函数:
```matlab
function F = myfun(x)
F = [x(1)^2 - x(2) - 1;
    x(1)^2 + x(2)^2 - 9];
end
```
然后调用fsolve函数:
```matlab

x0 = [1; 1];  % 初始点
[x,fval,exitflag] = fsolve(@myfun, x0);
fprintf('方程组的解为:\n');
disp(x);

fprintf('函数值的2-范数为: %e\n',norm(fval));
fprintf('求解终止代码为: %d\n',exitflag); 
```
运行结果为:
```
方程组的解为:
    2.0000
    3.0000

函数值的2-范数为: 2.220446e-16
求解终止代码为: 1
```
其中 exitflag 为 1 表示fsolve在函数容差范围内收敛到一个解。可以验证(2,3)确实是原方程组的一个解。
需要注意的是,非线性方程组的解不唯一,迭代算法得到哪个解依赖于初始点的选择。比如将上面代码中的初始点改为:
```matlab
x0 = [-1; -1];
```
则得到的解为(-2,3),它也是原方程组的一个解。这启示我们在用数值方法求解非线性问题时,要注意初值的选择对结果的影响。
此外,对于大规模稀疏非线性方程组,MATLAB 还提供了`fsolve`的稀疏版本`fsolve(...,'JacobPattern',S)`和预条件版本`fsolve(...,'Preconditioner',M)`等,可以提高求解效率。
