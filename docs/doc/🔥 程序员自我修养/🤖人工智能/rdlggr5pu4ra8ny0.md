---
title: 逻辑回归与线性回归什么关系？
urlname: rdlggr5pu4ra8ny0
date: '2024-07-03 13:08:39'
updated: '2024-07-03 13:08:57'
cover: 'https://cdn.nlark.com/yuque/0/2021/png/22382235/1631866036846-a788ad5d-9fa0-4857-8195-cebf7a65997e.png'
description: '逻辑回归（LR，Logic Regression）链接逻辑回归是用来做分类算法的。通常结合sigmoid函数将输出值域归一化到[0,1]，从而通过设定阈值来进行输出结果的判断。以最简单的一维逻辑回归为例，y=ax+b。如果是以sigmoid函数作为结果的归一化函数，则其损失函数（log los...'
---
# 逻辑回归（LR，Logic Regression）
> [链接](https://blog.csdn.net/zouxy09/article/details/20319673)

逻辑回归是用来做**分类算法的**。**通常结合sigmoid函数将输出值域归一化到[0,1]**，从而通过设定阈值来进行输出结果的判断。

以最简单的一维逻辑回归为例，y=ax+b。如果是以sigmoid函数作为结果的归一化函数，则其**损失函数（log loss，对数似然函数）**为：
![image.png](https://oss1.aistar.cool/elog-offer-now/9c4c50181ad2696c29054180e8465198.png)
> **为什么要用log函数来处理误差（真实值-预测值）？**
> 是为了便于对模型进行训练，根据误差值的大小，**采用不同的惩罚力度**：
> 当真实样本为1是，但h=0，那么log0=∞，这就对**模型最大的惩罚力度**；当h=1时，那么log1=0，相当于没有惩罚，**也就是没有损失**。

> log函数的求导：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/a0fe281c3798ca81f535a8e40f63fa72.png)



**如何进行多分类？**
**多分类问题可以在二分类的基础上进行。**
例如，二分类之后，再次二分类，再次二分类······，如下图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/019dae0db646bbf9d8915ee0ae88a901.png)
下面我们来看看逻辑回归的相关推导公式。
## 似然函数
**似然函数：**似然函数是一种关于统计模型参数的函数。**给定输出x时**，关于**参数θ的似然函数L(θ|x)（在数值上）等于给定参数θ后变量X的概率**：		
L(θ|x)=P(X=x|θ)。
> **P{y|x}表示的是**“在x发生的条件下，y发生的概率为P”。
> 所以P{y=1|x}表示“在x发生或有意义的条件下，y=1的概率”。

在教科书中，**似然常常被用作“概率”的同义词**。
但是在统计学中，二者有截然不同的用法。概率描述了**已知参数时的随机变量的输出结果**；似然则用来**描述已知随机变量输出结果时，未知参数的可能取值**。

例如，
对于“一枚正反对称的硬币上抛十次”这种事件，我们可以问硬币落地时十次都是正面向上的“概率”是多少；
而对于“一枚硬币上抛十次”，我们则可以问，若已知“十次硬币正反次数都是五次”，则**这枚硬币正反面对称的“似然”程度是多少**。
以下面这个计算式子为例：
![image.png](https://oss1.aistar.cool/elog-offer-now/ceb612af2b0eb7453fd54e46b950468e.png)
这说明，如果参数的取值变成0.6的话，结果观测到连续两次正面朝上的概率要比假设0.5时更大。也就是说，参数取成0.6 要比取成0.5 更有说服力，更为“合理”。
**总之，似然函数的重要性不是它的具体取值，而是当参数变化时函数到底变小还是变大。**对同一个似然函数，如果存在一个参数值，**使得它的函数值达到最大的话，**那么这个值就是最为“合理”的参数值**。**
[
](https://mp.weixin.qq.com/s?__biz=MzU5ODA0OTU1NQ==&mid=2247484211&idx=1&sn=795f56aa11405f1f30602a978d2ccd8c&chksm=fe4b554fc93cdc596bfad31d28bc1aefd5ff9e68bf492287c54e7c16fbc936585f43278db289&token=457707948&lang=zh_CN#rd)
**总之，最大似然估计的思想就是**：如果我进行一次随机的观测，观测到球的质量为 x；那么我就认为随机变量X 的分布一定会使得X=x**这一事件发生的概率最大**。(所谓的后验概率)
> 如果还不理解什么**是极大似然估计（MLE），看这个：**[链接](https://mp.weixin.qq.com/s?__biz=MzU5ODA0OTU1NQ==&mid=2247484201&idx=1&sn=91a3c5862dcac3940f2282ee7145284f&chksm=fe4b5555c93cdc4364ed3e8b6b963dc275f8bd92e7c06bae8687e064ee086cffaab35dfb39d9&token=457707948&lang=zh_CN#rd)+[链接](https://mp.weixin.qq.com/s?__biz=MzU5ODA0OTU1NQ==&mid=2247484211&idx=1&sn=795f56aa11405f1f30602a978d2ccd8c&chksm=fe4b554fc93cdc596bfad31d28bc1aefd5ff9e68bf492287c54e7c16fbc936585f43278db289&token=457707948&lang=zh_CN#rd)

## 极大似然函数的导数
> 参考：[链接](https://blog.csdn.net/TaoTaoFu/article/details/52831965)

![image.png](https://oss1.aistar.cool/elog-offer-now/7dc06cb2c6cea756cdf5e5661e4a92b9.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/ad61a5058b9cb43ecd96a1c55a64749c.png)
**重点：**上式计算的是**某一维度的w**，要更新全部的w，**就需要计算全部的输出（实际计算时，使用的是tensor）！因此，梯度（导数）其实就是输出-sigmoid函数的输出！（即yi-π（xi））；**
> y＝lnx的导数为y＇＝1／x
> e^x的导数任然是e^x
> 在对wk求导数的时候，其他的参数导数为0，只保留xik那一项


> **logit模型**
> **Logit公式模型**的由来：[知乎链接](https://zhuanlan.zhihu.com/p/27188729)


> **概率probability和几率odd的意思区别很大:**
> 前者是**某事件发生的次数，除以总次数**
> 后者是**某事件发生的次数除以其他事件发生的次数**（或是某事件发生的概率除以不发生的概率）


> **梯度上升与梯度下降**
> [链接](https://blog.csdn.net/weixin_39631030/article/details/81260960)
> 这两者分别用在不同的地方。
> 前者是用在求最小误差时，**必须使用减去梯度**：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/261fd878ee9e0f388d1081873a8fce11.png)
> 
> 而后者必须用在求最大似然估计函数，**必须使用加法**：
> ![image.png](https://oss1.aistar.cool/elog-offer-now/36c920a3070fd18f93ffa63bc409ac9b.png)

## 代码实现
[代码链接](https://blog.csdn.net/csqazwsxedc/article/details/69690655)

# 线性回归
> 拟合输出到输入的映射关系
> [链接](https://blog.csdn.net/jiaoyangwm/article/details/81139362)

利用大量的样本![image.png](https://oss1.aistar.cool/elog-offer-now/640fa1aacda280309a08801762ea8ed3.png)，**通过有监督的学习，学习到由x到y的映射f**，利用该映射关系**对未知的数据进行预估**，因为y为连续值，所以是回归问题。

- **单变量问题**

![image.png](https://oss1.aistar.cool/elog-offer-now/2ff1b8939951dd56b08cf47d6d3d848e.png)

- 多变量情况下：**二维空间的直线，转换为高维空间的平面**。以三维为例：

![image.png](https://oss1.aistar.cool/elog-offer-now/8b31577d6ded0f89909b18032f394b23.png)
**机器学习是数据驱动的算法，数据驱动=数据+模型，模型就是输入到输出的映射关系。**

假设线性回归的的模型为：
![image.png](https://oss1.aistar.cool/elog-offer-now/ba4d99ad002bd04b3c1d4776626eeabc.png)
写成向量形式则为：
![image.png](https://oss1.aistar.cool/elog-offer-now/7b1e8ee494fe995ba242c17a6b66a701.png)
## 最小二乘法（MSE）
那么如何**衡量这个模型的好坏，即拟合程度？**
——利用损失函数来衡量，**损失函数度量预测值和标准答案的偏差**，不同的参数有不同的偏差，所以要通过最小化损失函数，**也就是最小化偏差来得到最好的参数**。
经典的损失函数为**最小二乘法**：![image.png](https://oss1.aistar.cool/elog-offer-now/197642de0761796178d1d7c91d8effb9.png)
> 即对每一个样本进行预测输出和实际输出的预测，而后进行平均
> 注意，**除以2是为了求导方便，往后看**

最小二乘法的导数需要采用偏导数的方式，对每一个θ求偏导数，而后结合梯度下降算法（**因为上面的损失函数是一个凹函数，求极小值**）：
![image.png](https://oss1.aistar.cool/elog-offer-now/d1e9da66a88d96216946889af4f43498.png)
## 正则化
为了防止过拟合，可以采用正则化的方式**控制参数的变化幅度，对变化大的参数进行惩罚，并限制参数的搜索空间。**
> 过拟合是给参数的**自由空间太大了**，可以通过简单的方式让参数变化太快，并未学习到底层的规律，模型抖动太大，很不稳定，**variance变大，对新数据没有泛化能力**。

如果对最小二乘法的**损失函数加上正则化项**，则结果为：
![image.png](https://oss1.aistar.cool/elog-offer-now/7b9f90ca4e08212f08a0e90bfd75fd0d.png)
λ：对误差的惩罚程度，λ 越大对误差的惩罚越大，**泛化能力好**，**λ 越小，对误差的惩罚越小**，对误差的**容忍度越大**，容易出现过拟合。

另外，θi^2是所采用的正则化方式，常用的正则化有两种，L1正则化和L2正则化：
![image.png](https://oss1.aistar.cool/elog-offer-now/8fa7fd9138c642d6330027654981705f.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/3da22329619a0f4c5e79085cc71e3151.png)
> 有关L1/L2正则化的详细推导，**直接参考**：[链接](https://zhuanlan.zhihu.com/p/29360425)

![image.png](https://oss1.aistar.cool/elog-offer-now/5747cd070e40a744e1abb08afa0cca26.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/01e0ae6fd4cc2f9227a12fe0dbf8bd62.png)
# 逻辑回归与线性回归的关系

- 虽然逻辑回归能够用于分类，**不过其本质还是线性回归**。它仅在线性回归的基础上，在特征到结果的映射中**加入了一层sigmoid函数（非线性）映射，即先把特征线性求和，然后使用sigmoid函数来预测**。
- 经典线性模型的优化目标函数是最小二乘，而逻辑回归则是似然函数。
- 线性回归在**整个实数域范围内进行预测，敏感度一致，而分类范围，需要在[0,1]**。逻辑 回归就是一种减小预测范围，将预测值限定为[0,1]间的一种回归模型，因而对于这类问题来说，逻辑回归的鲁棒性比线性回归的要好。
