---
title: 图像算法工程师面试
urlname: lk1hgmd5h9mrgodd
date: '2024-07-03 13:10:11'
updated: '2024-07-03 13:10:23'
cover: 'https://cdn.nlark.com/yuque/0/2021/png/22382235/1631113841304-d88a7820-816b-4490-972a-b6a11c636b0f.png'
description: 机器学习和深度学习的关系其实它俩都是AI中的子问题：机器学习是实现人工智能的方法；深度学习是一种实现机器学习的技术；如何防止过拟合？链接正则化L1、L2；L2如下：更大的数据集：数据增强（平移、切分、亮度、等等）；训练时间太长，提前终止训练；融合多种模型：bagging、Boosting；Dr...
---
# 机器学习和深度学习的关系
其实它俩都是AI中的子问题：
![image.png](https://oss1.aistar.cool/elog-offer-now/bee62a653e23883b2c7f4a1e7ad31778.png)
机器学习**是实现人工智能的方法**；
深度学习**是一种实现机器学习的技术**；
![image.png](https://oss1.aistar.cool/elog-offer-now/02f979293ede0a8b819a1156b4e87298.png)
# 如何防止过拟合？
> [链接]()

正则化L1、L2；L2如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/d2d9a105bc085477a9f26a299816f5d1.png)
更大的数据集：数据增强（平移、切分、亮度、等等）；
训练时间太长，提前终止训练；
融合多种模型：bagging、Boosting；
Dropout：随机概率掐灭神经元；
在输入中增加噪声；
选择更简单的模型；
# 经典的轻量级网络
> [链接](https://www.cnblogs.com/LXP-Never/p/14840280.html#blogTitle15)

MobileNet系列；
SequeezeNet；
ShuffleNet系列；
# 经典的机器学习算法
**SVM：Support Vector Machine 支持向量机**
a. SVM算法是**介于简单算法和神经网络之间的最好的算法**。是一种二分类模型，它的基本模型是定义在特征空间上的间隔最大的线性分类器。
b. 只通过**几个支持向量就确定了超平面**，说明它不在乎细枝末节，**所以不容易过拟合**，但不能确保一定不会过拟合。可以**处理复杂的非线性问题**。
c. **高斯核函数**
d. 缺点：**计算量大**
![image.png](https://oss1.aistar.cool/elog-offer-now/2d14dd92d3f2e407758ad1bdbdabc8a5.png)

**什么是支持向量？**
线性分类器：假设在一个二维线性可分的数据集中，我们要找到一个**超平面把两组数据分开**，已知的方法有我们已经学过的**线性回归和逻辑回归**，这条直线可以有很多种，如下图的H1、H2、H3哪一条直线的效果最好呢，也就是说哪条直线**可以使两类的空间大小相隔最大呢？**
![image.png](https://oss1.aistar.cool/elog-offer-now/5d4cc7736b76e75e33e35bb2a07c0d6f.png)
**我们凭直观感受应该觉得答案是H3**。首先H1不能把类别分开，这个分类器肯定是不行的；H2可以，但分割线与最近的**数据点只有很小的间隔**，如果测试数据有一些噪声的话可能**就会被H2错误分类(即对噪声敏感、泛化能力弱)**。H3以较大间隔将它们分开，这样就能容忍测试数据的一些噪声而正确分类，是一个泛化能力不错的分类器。

**因此我们把这个划分数据的决策边界就叫做超平面**。离这个**超平面最近的点就是”支持向量”**,点到超平面的距离叫做间隔，**支持向量机的意思就是使超平面和支持向量之间的间隔尽可能的大，**这样才可以使两类样本准确地分开。
![image.png](https://oss1.aistar.cool/elog-offer-now/1b976f8b75630f2e78a735f403b8d79c.png)
我们从图上可以看到，这条中间的实线代表的超平面离直线两边的数据的间隔最大，对训练集的数据的噪声有最大的包容力。
![image.png](https://oss1.aistar.cool/elog-offer-now/b39db57cf8bb859a053a3a63076a1c13.png)
对一个分类问题，我们假设：
![image.png](https://oss1.aistar.cool/elog-offer-now/35b001fd6b5ae4d4c9e21aaecb6a7fd7.png)
我们知道，**所谓的支持向量，就是使得上式等号成立，即最靠近两条虚边界线的向量**。为什么像上面的式子那么假设呢？其实是为了方便计算。
![image.png](https://oss1.aistar.cool/elog-offer-now/ba58e908f105ab2781ac94a835e1f5b8.png)
这就得到了我们要用的SVM的基本形式，通过求解上式就可以得到最优超平面ω和b。

**决策树**
a. 只接受离散特征，**属于分类决策树**。
b. 条件熵的计算 H(Label |某个特征) 这个条件熵反映了在知道该特征时，标签的混乱程度，可以帮助我们选择特征，选择下一步的决策树的节点。
c. Gini和entropy的效果没有大的差别，在scikit learn中默认用Gini是因为Gini指数不需要求对数，计算量少。
d. 把熵用到了集合上，把集合看成随机变量。
e. 决策树：贪心算法，无法从全局的观点来观察决策树，从而难以调优。
f. 叶子节点上的最小样本数，太少，缺乏统计意义。从叶子节点的情况，可以看出决策树的质量，发现有问题也束手无策。
g. 二分类，正负样本数目相差是否悬殊，投票机制
h. 决策树算法可以看成是把多个逻辑回归算法集成起来。
**优点：可解释性强，可视化。缺点：容易过拟合（通过剪枝避免过拟合），很难调优，准确率不高**
![image.png](https://oss1.aistar.cool/elog-offer-now/a5db0ed56c876267f1e006e020c5554b.png)

**随机森林**
随机森林如何缓解决策树的过拟合问题，又能提高精度？
a. Random Forest, 本质上是多个算法平等的聚集在一起。每个单个的决策树，都是随机生成的训练集（行），随机生成的特征集（列），来进行训练而得到的。
b. 随机性的引入使得随机森林不容易陷入过拟合，具有很好的抗噪能力，有效的缓解了单棵决策树的过拟合问题。
c. 每一颗决策树训练样本是随机的有样本的放回抽样。
[

](https://blog.csdn.net/qq_42379006/article/details/80741808)
**逻辑回归（线性回归）**
它是广义线性模型GLM的一种，可以看成是一个最简单的神经网络，损失函数是一个对数似然函数，损失函数的值越大越好。（梯度上升法）
a. 多次训练，多次测试，目的是看逻辑回归这个算法适不适合这个应用场景。
![image.png](https://oss1.aistar.cool/elog-offer-now/de258b81cf15139b1a61038fb264ce87.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/1d2affb5280e0028fce01d0ad4a40f51.png)

**K近邻算法（有监督算法，分类算法）**
K表示K个邻居，**不表示距离，因为需要求所有邻居的距离，所以效率低下**。
**优点：**可以用来填充缺失值，可以处理非线性问题
**调优方法：**K值的选择，k值太小，容易过拟合
**应用：**样本数少，特征个数较少，kNN更适合处理一些分类规则相对复杂的问题，在推荐系统大量使用
KNN算法和贝叶斯算法有某种神秘的联系，**用贝叶斯算法估算KNN的误差**。
![image.png](https://oss1.aistar.cool/elog-offer-now/776830e73a2be05bb10a666f9cc91d51.png)

**K均值（无监督算法，聚类算法，随机算法）**
a. 最常用的无监督算法
b. 计算距离方法：欧式距离，曼哈顿距离
c. **应用：去除孤立点，离群点（只针对度量算法）；可以离散化**
d. 最常用**归一化预处理方法**
f. k-means设置超参数k时，只需要设置最大的k值。
g. k-means算法最终肯定会得到稳定的k个中心点，可以用EM(Expectation Maximum)算法解释
h. k-means算法k个随机初始值怎么选？ 多选几次，比较，找出最好的那个
i. 调优的方法：1. bi-kmeans 方法（依次“补刀”）
j. 调优的方法：2. 层次聚类（逐步聚拢法）k=5 找到5个中心点，把中心点喂给k-means。初始中心点不同，收敛的结果也可能不一致。
k. 聚类效果怎么判断？用SSE误差平方和指标判断，SSE越小越好，也就是肘部法则的拐点处。也可以用轮廓系数法判断，值越大，表示聚类效果越好，簇与簇之间距离越远越好，簇内越紧越好。
l. **k-means算法最大弱点：只能处理球形的簇（理论）**
![image.png](https://oss1.aistar.cool/elog-offer-now/c84f21f93f5768c77810a541a7acc752.png)

**Adaboost（集成算法）**



**马尔科夫**
a. 马尔可夫线没有箭头，**马尔可夫模型允许有环路**。
b. affinity亲和力关系，energy(A,B,C),发现A,B,C之间有某种规律性东西，但不一定是概率，但是可以表示ABC之间的一种亲和力。
c. potential = e1*e2*e3*en potential函数一般来说不是概率
d. 归一化 -> 概率分布probability
e. **贝叶斯模型与马尔可夫模型：任何一个贝叶斯模型对应于唯一的一个马尔可夫模型，而任意一个马尔可夫模型，可以对应于多个贝叶斯模型。**
f. **贝叶斯模型类似于象棋，等级分明**；**马尔可夫模型类似于围棋，人人平等**。
g. 马尔可夫模型（Markov Model）**是一种统计模型，广泛应用在语音识别，词性自动标注**，音字转换，概率文法等各个自然语言处理等应用领域。
![image.png](https://oss1.aistar.cool/elog-offer-now/7d93e6dfb3c0f1ce6df5fa398053eb6e.png)
# 模型/权重初始化方式
> [链接](https://blog.csdn.net/weixin_30615767/article/details/94991200)

（1）**Gaussian** 满足mean=0，std=1的**高斯分布**x∼N(mean，std2)
（2）**Xavier** 满足x∼U(−a,+a)x∼U(−a,+a)**的均匀分布**， **其中 a = sqrt(3/n)**
（3）**MSRA** 满足x∼N(0,σ2)x∼N(0,σ2)的**高斯分布**，其中σ = **sqrt(2/n)**
（4）**Uniform** 满足**min=0,max=1的均匀分布**。x∼U(min,max)x∼U(min,max)

# 深度学习优化方式
> [链接](https://zhuanlan.zhihu.com/p/22252270)
> [链接](https://blog.csdn.net/qq_23269761/article/details/80901411)

SGD、Momentum、Adagrad

**SGD**
此处的SGD指mini-batch gradient descent，关于batch gradient descent, stochastic gradient descent, 以及 mini-batch gradient descent的具体区别就不细说了。
现在的SGD一般都指mini-batch gradient descent。SGD就是每一次迭代计算mini-batch的梯度，然后对参数进行更新，是最常见的优化方法了。即：
![image.png](https://oss1.aistar.cool/elog-offer-now/0035c174dbd9ef3de08453381dee5737.png)

其中，![image.png](https://oss1.aistar.cool/elog-offer-now/23a09ddb9b893afaf1560ee7b09f4235.png)是学习率，![image.png](https://oss1.aistar.cool/elog-offer-now/7382bc7aec4e1b86c992915e8d479fd5.png)是梯度。
SGD完全依赖于当前batch的梯度，所以![image.png](https://oss1.aistar.cool/elog-offer-now/23a09ddb9b893afaf1560ee7b09f4235.png)**可理解为允许当前batch的梯度多大程度影响参数更新**
**缺点**：（正因为有这些缺点才让这么多大神发展出了后续的各种算法）

- 选择合适的learning rate比较困难 - **对所有的参数更新使用同样的learning rate**。对于稀疏数据或者特征，有时我们可能想更新快一些对于不经常出现的特征，对于常出现的特征更新慢一些，这时候SGD就不太能满足要求了
- SGD容易收敛到局部最优，**并且在某些情况下可能被困在鞍点**

**Momentum**
**momentum是模拟物理里动量的概念，积累之前的动量来替代真正的梯度**。公式如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/7d1b616d731c751cfaa59ed0aa5504e9.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/5121a6794e9570459bac7060a843b877.png)
**Adagrad**
Adagrad其实是对学习率进行了一个约束。即：
![image.png](https://oss1.aistar.cool/elog-offer-now/c0de062d6d2c2414219bda09ccff4904.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/b52488129513cd25d4c01df44c15612e.png)
# BN层的作用和参数
> [链接](https://blog.csdn.net/jiang_ming_/article/details/82314287)

在batchnorm产生之前，**针对由于分布变化导致学习困难的问题**，主要解决办法是**使用较小的学习率**，和小心的初始化参数，**对数据做白化处理**，但是治标不治本，不能根本解决问题。

**batchnorm顾名思义是对每batch个数据同时做一个norm**，batchnorm是怎么做的，来看下边伪代码：
![image.png](https://oss1.aistar.cool/elog-offer-now/18d7b3d0cfc9b36e4ce6c22ea995e6d0.png)![image.png](https://oss1.aistar.cool/elog-offer-now/f03b26f29cc688a7c3364042a6f2de0c.png)
简单的实现代码：
```cpp
def Batchnorm_simple_for_train(x, gamma, beta, bn_param):
"""
param:x    : 输入数据，设shape(B,L)
param:gama : 缩放因子  γ
param:beta : 平移因子  β
param:bn_param   : batchnorm所需要的一些参数
    eps      : 接近0的数，防止分母出现0
    momentum : 动量参数，一般为0.9， 0.99， 0.999
    running_mean ：滑动平均的方式计算新的均值，训练时计算，为测试数据做准备
    running_var  : 滑动平均的方式计算新的方差，训练时计算，为测试数据做准备
"""
    running_mean = bn_param['running_mean']  #shape = [B]
    running_var = bn_param['running_var']    #shape = [B]
    results = 0. # 建立一个新的变量

    x_mean=x.mean(axis=0)  # 计算x的均值
    x_var=x.var(axis=0)    # 计算方差
    x_normalized=(x-x_mean)/np.sqrt(x_var+eps)       # 归一化
    results = gamma * x_normalized + beta            # 缩放平移

    running_mean = momentum * running_mean + (1 - momentum) * x_mean
    running_var = momentum * running_var + (1 - momentum) * x_var

    #记录新的值
    bn_param['running_mean'] = running_mean
    bn_param['running_var'] = running_var 

    return results , bn_param
```
batchnorm有了一个清晰的理解，首先计算均值和方差，然后归一化，**然后缩放和平移**，完事！但是这是在训练中完成的任务，每次训练给一个批量，然后计算批量的均值方差，但是在测试的时候可不是这样，测试的时候每次只输入一张图片，这怎么计算批量的均值和方差，于是，就有了代码中下面两行，在训练的时候实现计算好mean、var在测试的时候直接拿来用就行，不用计算均值和方差。
```cpp
running_mean = momentum * running_mean + (1 - momentum) * x_mean
running_var = momentum * running_var + (1 - momentum) * x_var
```
完整的测试代码：
```cpp
def Batchnorm_simple_for_test(x, gamma, beta, bn_param):
"""
param:x    : 输入数据，设shape(B,L)
param:gama : 缩放因子  γ
param:beta : 平移因子  β
param:bn_param   : batchnorm所需要的一些参数
    eps      : 接近0的数，防止分母出现0
    momentum : 动量参数，一般为0.9， 0.99， 0.999
    running_mean ：滑动平均的方式计算新的均值，训练时计算，为测试数据做准备
    running_var  : 滑动平均的方式计算新的方差，训练时计算，为测试数据做准备
"""
    running_mean = bn_param['running_mean']  #shape = [B]
    running_var = bn_param['running_var']    #shape = [B]
    results = 0. # 建立一个新的变量

    x_normalized=(x-running_mean )/np.sqrt(running_var +eps)       # 归一化
    results = gamma * x_normalized + beta            # 缩放平移

    return results , bn_param
```
**batchnorm降低了数据之间的绝对差异，有一个去相关的性质，更多的考虑相对差异性，因此在分类任务上具有更好的效果**。

# L1/L2的区别
1.**L1是模型各个参数的绝对值之和**。
L2**是模型各个参数的平方和**。

2.L1**会趋向于产生少量的特征，而其他的特征都是0**
因为最优的**参数值很大概率出现在坐标轴上，这样就会导致某一维的权重为0** ，产生稀疏权重矩阵
L2会选择更多的特征，这些特征都会接近于0。  
最优的参数值很小概率出现在坐标轴上，因此每一维的参数都不会是0。当最小化||w||时，就会使每一项趋近于0
[

](https://blog.csdn.net/u014073295/article/details/82728299)
L1范数：  　　
L1范数**符合拉普拉斯分布，是不完全可微的**。表现在图像上会有很多角出现。这些角和目标函数的接触机会远大于其他部分。就会造成最优值出现在坐标轴上，因此就会导致某一维的权重为0 ，产生稀疏权重矩阵，进而防止过拟合。  　

L2范数：  　　
L2范数符合高斯分布，是完全可微的。和L1相比，图像上的棱角被圆滑了很多。一般最优值不会在坐标轴上出现。在最小化正则项时，**可以是参数不断趋向于0.最后得到很小的参数**。
# 模型的加速与压缩
**模型压缩**算法能够有效降低参数冗余，**从而减少存储占用、通信带宽和计算复杂度**，有助于深度学习的应用部署，主流方向有：**量化、剪枝、蒸馏与NAS是主流方向。**

[链接](https://www.cnblogs.com/bonelee/p/14781693.html)
**量化：**1/2bits, INT4, INT8, FP16和BF16；——模型量化**以损失推理精度为代价**，**将网络中连续取值或离散取值**的浮点型参数（ 权重或张量）**线性映射为定点近似（int8 / uint8）的离散值**，取代原有的 float32 格式数据，**同时保持输入输出为浮点型**，从而达到减少模型尺寸大小、减少模型内存消耗及加快模型推理速度等目标。![image.png](https://oss1.aistar.cool/elog-offer-now/578d347d44390524f975c73cd15f09ea.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/d2e2005d201f5be49ee3742a6b5b54b9.png)
**剪枝：**Sparse Pruning, Channel pruning和Layer drop
**NAS：**网络结构搜索，暂略

**知识蒸馏：**通过引入与**教师网络（teacher network：复杂、但推理性能优越）**相关的软目标（soft-target）作为total loss的一部分，以**诱导学生网络（student network：精简、低复杂度）**的训练，实现知识迁移（knowledge transfer）。——知识蒸馏指的是模型压缩的思想，**通过一步一步地使用一个较大的已经训练好的网络去教导一个较小的网络确切地去做什么。**“软标签”指的是大网络在每一层卷积后输出的feature map。然后，通过尝试复制大网络在每一层的输出(不仅仅是最终的损失)，小网络被训练以学习大网络的准确行为。
![image.png](https://oss1.aistar.cool/elog-offer-now/34c1410597b72aa04cbfbf1fb0c75d8d.png)
什么原理？——显然，**模型越复杂，理论搜索空间越大**。但是，如果我们假设较小的网络也能实现相同(甚至相似)的收敛，**那么教师网络的收敛空间应该与学生网络的解空间重叠**。
具体的步骤：

- 训练teacher net：比较复杂的网络
- 构建对应关系：在设计学生网络时，**需要建立学生网络的中间输出与教师网络的对应关系**。
- teacher net进行前向传播
- 学生网络进行反向传播：从而模拟teacher net的输出

**模型加速：**一般需要借助其他的库，最常见的是TensorRT。

# 数据不平衡的问题
1.**对于不平衡类别**，模型无法充分考察样本，从而不能及时有效地优化模型参数。 
2.**它对验证和测试样本的获取造成了一个问题**，因为在一些类观测极少的情况下，很难在类中有代表性。换句话说，训练集中的数据过少，影响了模型对该类识别的泛化能力。

**数据方面：**

- 对数据不平衡的类别进行严格的数据增强；
- 利用大数据训练的模型（imagenet）进行transfer learning。

![image.png](https://oss1.aistar.cool/elog-offer-now/d66435907086754f21ff6229a5bd79da.png)

**权重平衡法通过改变每个训练样本在计算损失时的权重来平衡我们的数据**。通常，我们的损失函数中的每个样本和类具有相同的权重，即 1.0。但是有时候，我们可能希望某些更重要的特定类别或特定训练实例拥有更大的权重。再次参照我们买房的例子，既然“购买”类的准确率对我们来说是最重要的，那么该类中的训练示例应该对损失函数有显著的影响。**类似于SegNet所做的工作。**

# 腐蚀、膨胀、开闭运算
> [链接](https://www.cnblogs.com/shyzh/p/10940261.html)

**腐蚀**
> 结构元素  
> 设有两幅图象B，X。若X是被处理的对象，而B是用来处理X的，则称B为结构元素(structure element)，又被形象地称做刷子。**结构元素通常都是一些比较小的图象。**

把**结构元素B平移a后得到Ba**，**若Ba包含于X，我们记下这个a点**，所有满足上述条件的a点组成的集合称做X**被B腐蚀(Erosion)的结果**。如下图所示。
![image.png](https://oss1.aistar.cool/elog-offer-now/b75e0cb13a7f2d4ba7e5daaa134c276e.png)
其中X是被处理的对象，B是结构元素。对于任意一个在阴影部分的点a，Ba 包含于X，**所以X被B腐蚀的结果就是那个阴影部分。阴影部分在X的范围之内，且比X小，就象X被剥掉了一层似的**。
如同：![image.png](https://oss1.aistar.cool/elog-offer-now/b32272fd88b4ee010d39d21bd2518752.png)

**膨胀**
膨胀(dilation)**可以看做是腐蚀的对偶运算**，其定义是：把结构元素B平移a后得到Ba，若Ba击中X，我们记下这个a点。**所有满足上述条件的a点组成的集合称做X被B膨胀的结果**。如下图所示。
![image.png](https://oss1.aistar.cool/elog-offer-now/d7f3f8989fa2014cca4391dc24035958.png)
X是被处理的对象，**B是结构元素，不难知道，对于任意一个在阴影部分的点a，Ba击中X**，所以X被B膨胀的结果就是那个阴影部分。**阴影部分包括X的所有范围，就象X膨胀了一圈似的**。
如同：![image.png](https://oss1.aistar.cool/elog-offer-now/8c626a4b679f7e59d63482bf71070662.png)

**开操作**
**先腐蚀后膨胀的操作称之为开操作**。它具有**消除细小物体**，在**纤细处分离物体和平滑较大物体边界的作用**。
![image.png](https://oss1.aistar.cool/elog-offer-now/75bdb22cdd14aed2c80b25c9adeba00c.png)![image.png](https://oss1.aistar.cool/elog-offer-now/fe0c8fb2b78974d6e354db3845b39cf5.png)

**闭操作**
先膨胀后腐蚀的操作称之为闭操作。**它具有填充物体内细小空洞，连接邻近物体和平滑边界的作用**。
![image.png](https://oss1.aistar.cool/elog-offer-now/0f37847e639afdc8262dd9178087bbe4.png)![image.png](https://oss1.aistar.cool/elog-offer-now/085d7d758461ae099736e18107cee365.png)	
# 图像去噪方法
滤波：空间域滤波（基于空间域的中值滤波、最小最大化阈值）、变换域滤波（基于小波域的小波阈值去噪）、还可以使用开闭运算进行滤波；
# 边缘检测算子
> [链接](https://blog.csdn.net/baidu_21578557/article/details/51660466)

Sobel（索贝尔）、Laplacian、Canny算子

不同图像灰度不同，边界处一般会有明显的边缘，利用此特征可以分割图像。需要说明的是：**边缘和物体间的边界并不等同**，边缘指的是图像中像素的值**有突变的地方**，而物体间的边界指的是**现实场景中的存在于物体之间的边界。**有可能有边缘的地方并非边界，也有可能边界的地方并无边缘，因为现实世界中的物体是三维的，而图像只具有二维信息，从三维到二维的投影成像不可避免的会丢失一部分信息；另外，成像过程中的光照和噪声也是不可避免的重要因素。正是因为这些原因，基于边缘的图像分割仍然是当前图像研究中的世界级难题，目前研究者正在试图在**边缘提取中加入高层的语义信息**。

**Sobel**
 其主要用于**边缘检测**，在技术上它是以离散型的差分算子，用来运算图像亮度函数的梯度的近似值， Sobel算子是典型的基于一阶导数的边缘检测算子，由于该算子中引入了类似局部平均的运算，因此对噪声具有平滑作用，能很好的消除噪声的影响。

Sobel算子包含两组3x3的矩阵，分别为横向及纵向模板，将之与图像作平面卷积，即可分别得出横向及纵向的亮度差分近似值。实际使用中，常用如下两个模板来检测图像边缘。
![image.png](https://oss1.aistar.cool/elog-offer-now/b1e3828d13c06bb7fa59ea2fa8a992da.png)
![1.svg](https://oss1.aistar.cool/elog-offer-now/6989570d6e40575f091e50700629ca25.svg)
![2.svg](https://oss1.aistar.cool/elog-offer-now/aac6da8d44260f0300ab4932e80ae597.svg)

在以上例子中，**如果以上的角度Θ等于零，即代表图像该处拥有纵向边缘，左方较右方暗**。
缺点是Sobel算子并没有将图像的主题与背景严格地区分开来，换言之就是Sobel算子并没有基于图像灰度进行处理，由于Sobel算子并没有严格地模拟人的视觉生理特征，**所以提取的图像轮廓有时并不能令人满意**。

**laplacian算子**
Laplace**算子是一种各向同性算子，二阶微分算子**，在只关心边缘的位置而不考虑其周围的象素灰度差值时比较合适。Laplace算子对孤立象素的响应要比对边缘或线的响应要更强烈，因此只适用于无噪声图象。存在噪声情况下，**使用Laplacian算子检测边缘之前需要先进行低通滤波**。**所以，通常的分割算法都是把Laplacian算子和平滑算子结合起来生成一个新的模板**。
![image.png](https://oss1.aistar.cool/elog-offer-now/a6f3e1686ce3d85c976c517a12e6e76c.png)

**Canny算子**
> [链接](https://blog.csdn.net/fengye2two/article/details/79190759)

该算子功能比前面几种都要好，但是它实现起来较为麻烦，**Canny算子是一个具有滤波，增强，检测的多阶段的优化算子**，在进行处理前，Canny算子先利用高斯平滑滤波器来平滑图像以除去噪声，Canny分割算法采用一阶偏导的有限差分来计算梯度幅值和方向，在处理过程中，Canny算子还将经过一个非极大值抑制的过程，最后Canny算子还采用两个阈值来连接边缘。
step1: **用高斯滤波器平滑图象**；
step2: **用一阶偏导的有限差分来计算梯度的幅值和方向**；
step3: **对梯度幅值进行非极大值抑制**
step4: **用双阈值算法检测和连接边缘**
> 一般的边缘检测算法**用一个阈值来滤除噪声或颜色变化引起的小的梯度值**，而保留大的梯度值。Canny算法应用双阈值，即一个高阈值和一个低阈值来区分边缘像素。**如果边缘像素点梯度值大于高阈值，则被认为是强边缘点**。如果**边缘梯度值小于高阈值，大于低阈值，则标记为弱边缘点**。**小于低阈值的点则被抑制掉。**
> 

> 在完成这部分的操作之后，**还需要进行低阈值的处理**。强边缘点可以认为是真的边缘。**弱边缘点则可能是真的边缘，也可能是噪声或颜色变化引起的**。为得到精确的结果，后者引起的弱边缘点应该去掉。通常认为真实边缘引起的弱边缘点和强边缘点是连通的，而又噪声引起的弱边缘点则不会。所谓的滞后边界跟踪算法检查一个弱边缘点的8连通领域像素，只要有强边缘点存在，那么这个弱边缘点被认为是真是边缘保留下来。
> 
> 这个算法搜索所有连通的弱边缘，**如果一条连通的弱边缘的任何一个点和强边缘点连通**，则保留这条弱边缘，否则抑制这条弱边缘。搜索时可以用**广度优先或者深度优先算法**，我在这里实现了应该是最容易的深度优先算法。一次连通一条边缘的深度优先算法如下：
> - 准备一个栈s，一个队列q，设联通指示变量connected为假。从图像的第一个点开始，进入2。
> - 如果这个点是弱边界点并且没有被标记，把它标记，并把它作为第一个元素放入栈s中，同时把它放入记录连通曲线的队列q，进入3。如果这个点不是弱边界或者已经被标记过，到图像的下一个点，重复2。
> - 从栈s中取出一个元素，查找它的8像素领域。如果一个领域像素是弱边界并且没有被标记过，把这个领域像素标记，并加入栈s中，同时加入队列q。同时查找领域对应的强边界图，如果有一个像素是强边界，表示这条弱边界曲线和强边界联通，设置connected为真。重复3直到栈中没有元素了。如果connected为假，则依次从队列q中取出每个元素，清空标记。如果connected为真，保留标记。
> - 清空队列q，设置connected为假，移动到图像的下一个点，到2。

# 贝叶斯概率
> [链接](https://zhuanlan.zhihu.com/p/81728490)
> 求贝叶斯概率时，**最好的方式就是画图进行筛选**。

贝叶斯概率（Bayesian Probability）是由贝叶斯理论所提供的一种对概率的解释，**它采用将概率定义为某人对一个命题信任的程度的概念**。
贝叶斯推理的概括：**我们根据新的信息/证据/数据来更新看法/判断/信念**。
这句话可以分成三部分：

- 旧的看法/判断/信念
- 新的信息/证据/数据
- 新的看法/判断/信念

这三部分**可用数学语言概括如下**

- 先验概率（旧的看法/判断/信念）
- 条件概率（**新的信息**/证据/数据）
- 后验概率（新的看法/判断/信念）

典型的题型：王二喜欢鬼混，有一天忽觉身体不适，怀疑自己是不是得了花柳病。王二查资料发现，HIV在健康男性中**总体发病率为0.1%**。王二不放心，去医院检查，结果呈HIV阳性。医生告诉他，咱医院的设备还是很先进的，准**确率高达95%**；请问王二得艾滋病的概率是多少？
先验概率：
![image.png](https://oss1.aistar.cool/elog-offer-now/82b126a5008c5dddccaba9eed951cba6.png)
条件概率：
![image.png](https://oss1.aistar.cool/elog-offer-now/010108f6b1ddd55fa28979bcfbdf6e4e.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/064c8a255b9f8e6cc419cfde4085976c.png)
计算后验概率：
![image.png](https://oss1.aistar.cool/elog-offer-now/b40e52d767eef092cbbf7b707fe812bb.png)
最后的概率就是：1.8%。

# 贝叶斯公式
贝叶斯定理由英国数学家贝叶斯 ( Thomas Bayes 1702-1761 ) 发展，**用来描述两个条件概率之间的关系**，比如 P(A|B) 和 P(B|A)。**按照乘法法则，可以立刻导出：P(A∩B) = P(A)*P(B|A)=P(B)*P(A|B)。如上公式也可变形为：P(A|B)=P(B|A)*P(A)/P(B)**。
[https://github.com/NLP-LOVE/ML-NLP/tree/master/Machine%20Learning](https://github.com/NLP-LOVE/ML-NLP/tree/master/Machine%20Learning)
[http://blog.itpub.net/69942346/viewspace-2652334/](http://blog.itpub.net/69942346/viewspace-2652334/)
# 联邦学习
联邦学习（Federated Learning）是一种新兴的人工智能基础技术，在 2016 年由谷歌最先提出，原本用于解决安卓手机终端用户在本地更新模型的问题，其设计目标是在保障大数据交换时的信息安全、保护终端数据和个人数据隐私、保证合法合规的前提下，在多参与方或多计算结点之间开展高效率的机器学习。 
**联邦学习所要解决的就是秘密样本的联合训练。**联邦学习**系统构架由三部分构成**，如图所示。
![image.png](https://oss1.aistar.cool/elog-offer-now/fc39f5f8c4aef0201e23258d4de4ba6c.png)
**第一部分：加密样本对齐**。由于两家企业的用户群体并非完全重合，系统利用基于加密的用户样本对齐技术，在 A 和 B 不公开各自数据的前提下确认双方的共有用户，并且不暴露不互相重叠的用户，以便联合这些用户的特征进行建模。

**第二部分：加密模型训练。**在确定共有用户群体后，就可以利用这些数据训练机器学习模型。为了保证训练过程中数据的保密性，需要借助第三方协作者 C 进行加密训练。
以线性回归模型为例，训练过程可分为以下 4 步（如图  所示）： 
       第①步：协作者 C 把公钥分发给 A 和 B，用以对训练过程中需要交换的数据进行加密。
       第②步：A 和 B 之间以加密形式交互用于计算梯度的中间结果。
       第③步：A 和 B 分别基于加密的梯度值进行计算，同时 B 根据其标签数据计算损失，并把结果汇总给 C。C 通过汇总结果计算总梯度值并将其解密。
       第④步：C 将解密后的梯度分别回传给 A 和 B，A 和 B 根据梯度更新各自模型的参数。
      迭代上述步骤直至损失函数收敛，这样就完成了整个训练过程。在样本对齐及模型训练过程中，A 和 B 各自的数据均保留在本地，**且训练中的数据交互也不会导致数据隐私泄露。因此，双方在联邦学习的帮助下得以实现合作训练模型**。

**第三部分：效果激励**。联邦学习的一大特点就是它解决了为什么不同机构要加入联邦共同建模的问题，即建立模型以后模型的效果会在实际应用中表现出来，**并记录在永久数据记录机制（如区块链）上**。提供数据多的机构所获得的模型效果会更好，**模型效果取决于数据提供方对自己和他人的贡献**。这些模型的效果在联邦机制上会分发给各个机构反馈，并继续激励更多机构加入这一数据联邦。以上三部分的实施，既考虑了在多个机构间共同建模的隐私保护和效果，**又考虑了以一个共识机制奖励贡献数据多的机构。所以，联邦学习是一个「闭环」的学习机制**。
[

](https://blog.csdn.net/cao812755156/article/details/89598410)
