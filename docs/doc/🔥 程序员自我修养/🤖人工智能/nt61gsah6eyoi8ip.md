---
title: 深度学习激活函数有哪些？
urlname: nt61gsah6eyoi8ip
date: '2024-07-03 13:10:52'
updated: '2024-07-03 13:11:06'
cover: 'https://cdn.nlark.com/yuque/0/2021/png/22382235/1630684292186-8199f38a-a2e4-4912-bf2a-50830df23763.png'
description: 参考链接1激活函数有什么用？在多层神经网络中，上层节点的输出和下层节点的输入之间具有一个函数关系，这个函数称为激活函数（又称激励函数）。——即是每经过一层节点，需要对该层的输出做一个效用评估，将最后的评估结果传递给下一个节点。而且每层节点的作用一般是线性的（加减乘除），激活函数却是非线性的，而...
---
> [参考链接1](https://www.cnblogs.com/XDU-Lakers/p/10557496.html)

# 激活函数有什么用？
在多层神经网络中，上层节点的输出和下层节点的输入之间具有一个函数关系，这个函数称为激活函数（又称激励函数）。——即是每经过一层节点，需要对该层的输出做一个效用评估，将最后的评估结果传递给下一个节点。而且每层节点的作用**一般是线性的（加减乘除），激活函数却是非线性的，而实际问题大多都是非线性的**。

**无激活函数网络**
以单层感知机为例，只有输入层和输出层：
![image.png](https://oss1.aistar.cool/elog-offer-now/782e2b05e4290814ff00c17cc628663f.png)
从右图可以看出，**单层感知机将划出一条线将平面分割开**。

以多个感知机组合为例，下图：
![image.png](https://oss1.aistar.cool/elog-offer-now/696cef9867a8e932db21c14613fc146b.png)
从右图可以看出，还是利用直线将平面进行切分。
不管再怎么组合，如果没有激活函数，**最终的处理结果其实都是线性的切割平面**，而往往我们需要的是曲线以及曲面等。

**有激活函数网络**
在神经网络**每一层神经元做完线性变换以后，加上一个非线性激励函数对线性变换的结果进行转换**，结果显而易见，输出立马变成一个不折不扣的非线性函数了，如图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/b9d32a8035a0c02420ed656b2398808a.png)
也就是说，加入非线性激励函数后，神经网络就有可能学习到平滑的曲线来**分割曲面，而不是用复杂的线性组合逼近平滑曲线来分割曲面**，使神经网络的表示能力更强了，能够更好的拟合目标函数。
# 激活函数分类
激活函数主要分为两类**饱和激活函数和非饱和激活函数：**
![image.png](https://oss1.aistar.cool/elog-offer-now/a9e70435fdd811aac4e893cf4155ca95.png)
所谓**饱和激活函数**：
![image.png](https://oss1.aistar.cool/elog-offer-now/d3ed19bd993e0caba1762fd760e2a3f6.png)
即是正负无穷的导数都趋近于0，不满足的就是**非饱和激活函数**。
由于使用sigmoid激活函数会造成神经网络的梯度消失和梯度爆炸问题，而使用“非饱和激活函数”的优势在于两点：**(1)"非饱和激活函数”能解决所谓的“梯度消失”问题。(2)它能加快收敛速度。**
## Sigmoid
其公式为：
![image.png](https://oss1.aistar.cool/elog-offer-now/ab85a578f5f666b484997e99cc9b905d.png)
其图像为：
![image.png](https://oss1.aistar.cool/elog-offer-now/d80a3efb126835cb6286a9305ba416ab.png)
其导数图像为：
![image.png](https://oss1.aistar.cool/elog-offer-now/693832c8d3078d4bc80200aba009218c.png)
Sigmoid函数以前很常用，但是因为几个问题，如今已经很少使用了：

- **梯度消失：**从导函数图像中可以看出sigmoid的导数都是小于0.25的，那么在进行反向传播的时候，梯度相乘结果会慢慢的趋*于0。**这样，几乎就没有梯度信号通过神经元传递到前面层的梯度更新中，因此这时前面层的权值几乎没有更新，这就叫梯度消失**。除此之外，为了防止饱和，必须对于权重矩阵的初始化特别留意。如果初始化权重过大，可能很多神经元得到一个比较小的梯度，致使神经元不能很好的更新权重提前饱和，神经网络就几乎不学习。
- **输出不是“零为中心”(zero-centered)**：一个多层的sigmoid神经网络，如果你的输入x都是正数，那么在反向传播中w的梯度传播到网络的某一处时，**权值的变化是要么全正要么全负**。![image.png](https://oss1.aistar.cool/elog-offer-now/1061cec18e102bf91feafc149b065d8a.png)

如上图所示：**当梯度从上层传播下来，w的梯度都是用x乘以f的梯度，因此如果神经元输出的梯度是正的**，那么所有w的梯度就会是正的，反之亦然。在这个例子中，我们会得到两种权值，权值范围分别位于图8中一三象限。当输入一个值时，w的梯度要么都是正的要么都是负的，当我们想要输入一三象限区域以外的点时，我们将会得到这种并不理想的曲折路线（zig zag path），图中红色曲折路线。假设最优化的一个w矩阵是在图8中的第四象限，那么要将w优化到最优状态，就必须走“之字形”路线，**因为你的w要么只能往下走(负数)，要么只能往右走(正的)。优化的时候效率十分低下，模型拟合的过程就会十分缓慢**。

- 指数函数的计算是**比较消耗计算资源的**。
## Tanh
Tanh激活函数其实是Sigmoid函数的变形：![image.png](https://oss1.aistar.cool/elog-offer-now/7c28f8b575f1859e9bc37d53f377c7b1.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/3996c0c9f7bda11fcc647e1c2fc49963.png)
tanh是“零为中心”的。因此，实际应用中，tanh会比sigmoid更好一些。但是在饱和神经元的情况下，**tanh还是没有解决梯度消失问题，并且依旧是指数运算**。
## Relu
Relu，Rectified Linear Unit，中文名字：修正线性单元。公式为：
![image.png](https://oss1.aistar.cool/elog-offer-now/ac3c9baf8567d1cbf4cae5363cfd0420.png)
图像为：
![image.png](https://oss1.aistar.cool/elog-offer-now/c2217c787acfb7b6aa5a1b9d97477b19.png)
**优点：**（1）ReLU解决了梯度消失的问题，至少x在正区间内，**神经元不会饱和**；（2）由于ReLU线性、非饱和的形式，在**SGD中能够快速收敛**；（3）算速度要快很多。ReLU函数只有线性关系，不需要指数计算，不管在前向传播还是反向传播，**计算速度都比sigmoid和tanh快**

 **缺点：**（1）ReLU的输出不是“零为中心”(Notzero-centered output)。（2）随着训练的进行，可能会出现神经元死亡，权重无法更新的情况。这种神经元的死亡是不可逆转的死亡？
> 训练神经网络的时候，一旦学习率没有设置好，第一次更新权重的时候，输入是负值，**那么这个含有ReLU的神经节点就会死亡，再也不会被激活**。因为：ReLU的导数在x>0的时候是1，**在x<=0的时候是0。如果x<=0**，那么ReLU的输出是0，**那么反向传播中梯度也是0，权重就不会被更新**，导致神经元不再学习。也就是说，这个ReLU激活函数在训练中将不可逆转的死亡，导致了训练数据多样化的丢失。在实际训练中，如果学习率设置的太高，可能会发现网络中40%的神经元都会死掉，且在整个训练集中这些神经元都不会被激活。所以，设置一个合适的较小的学习率，会降低这种情况的发生。**所以必须设置一个合理的学习率**。**为了解决神经元节点死亡的情况**，有人提出了Leaky ReLU、P-ReLu、R-ReLU、ELU等激活函数。


等等，**Relu到底是线性还是非线性啊**？**为什么relu这种“看似线性”（分段线性）的激活函数所形成的网络，居然能够增加非线性的表达能力？**
（1）relu是**非线性激活函数**。
（2）让我们先明白什么是线性网络?如果把线性网络看成一个大的矩阵M。那么输入样本A和B，则会经过同样的线性变换MA，MB（**这里A和B经历的线性变换矩阵M是一样的**）
（3）的确对于单一的样本A，经过由relu激活函数所构成神经网络，其过程确实可以等价是经过了一个线性变换M1，但是对于样本B，在经过同样的网络时，**由于每个神经元是否激活（0或者Wx+b）与样本A经过时情形不同了（不同样本）**，因此B所经历的线性变换M2并不等于M1。因此，relu构成的神经网络虽然对每个样本都是线性变换，但是不同样本之间经历的线性变换M并不一样，所以整个样本空间在经过relu构成的网络时其实是经历了非线性变换的。

## Leaky Relu
ReLU是将所有的负值设置为0，造成神经元节点死亡情况。相反，Leaky ReLU是给**所有负值赋予一个非零的斜率**。它的数学表达式如公式8所示：![image.png](https://oss1.aistar.cool/elog-offer-now/409d95b4e5338122ee0ae425f7616d24.png)
图像为：
![image.png](https://oss1.aistar.cool/elog-offer-now/c1b7bdc2c84520056a1a33f9eb9a1182.png)
Leaky ReLU很好的解决了“dead ReLU”的问题。
因为Leaky ReLU保留了x小于0时的梯度，在x小于0时，不会出现神经元死亡的问题。**对于Leaky ReLU给出了一个很小的负数梯度值α，这个值是很小的常数**。**比如：0.01。这样即修正了数据分布，又保留了一些负轴的值，使得负轴信息不会全部丢失**。但是这个α通常是通过先验知识人工赋值的。

## RRelu
RReLU的英文全称是“Randomized Leaky ReLU”，中文名字叫“随机修正线性单元”。RReLU是Leaky ReLU的随机版本。其公式如下：![image.png](https://oss1.aistar.cool/elog-offer-now/f21290cf78f8ebb99dc8d5f8c46a52ab.png)
图像如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/d53498f45a98b58f5cdb55d413213fcf.png)
 RReLU的核心思想是，在训练过程中，**α是从一个高斯分布**![image.png](https://oss1.aistar.cool/elog-offer-now/c8a258cefb42029c570d7c9fb1e9427b.png)**中随机出来的值**，**然后再在测试过程中进行修正**。在测试阶段，把训练过程中所有的![image.png](https://oss1.aistar.cool/elog-offer-now/e6b16763d7fbb7ffb8746e2798f6d98e.png)**取个平均值**。
特点：
（1）RReLU是Leaky ReLU的random版本，在训练过程中，α是从一个高斯分布中随机出来的，**然后再测试过程中进行修正**。
（2）数学形式与PReLU类似，**但RReLU是一种非确定性激活函数，其参数是随机的** 
## ELU
Exponential Linear Units，中文全称是“**指数线性单元**”。它试图将激活函数的输出平均值接近零，从而加快学习速度。同时，它还能通过正值的标识来避免梯度消失的问题。根据一些研究显示，ELU分类精确度是高于ReLU的。公式如12式所示。
![image.png](https://oss1.aistar.cool/elog-offer-now/5a61a12e5d219e4a44e39cc59eee6db7.png)
![image.png](https://oss1.aistar.cool/elog-offer-now/363a9f9d017628aba42260cf5ab669a9.png)
唯一的缺点就是采用指数运算。
## Maxout
它的激活函数、计算的变量、计算方式和普通的神经元完全不同，并有两组权重。其公式如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/3925f70114cd5d238c5fdcf026e01183.png)
其中![image.png](https://oss1.aistar.cool/elog-offer-now/85b3a6edcae584aa68f8c9d34b3cd1b0.png)，以二维的输出为例：![image.png](https://oss1.aistar.cool/elog-offer-now/7f6977bc311cb9c89b55fcfc4344c687.png)
分析公式14可以注意到，**ReLU和Leaky ReLU都是它的一个变形**。比如其中一个权重w为0的时候，就是ReLU。
Maxout的拟合能力非常强，**它可以拟合任意的凸函数。Goodfellow在论文中从数学的角度上也证明了这个结论，只需要2个Maxout节点就可以拟合任意的凸函数，前提是“隐含层”节点的个数足够多**。
优点：（1）Maxout具有ReLU的所有优点，线性、不饱和性。（2）同时没有ReLU的一些缺点。如：神经元的死亡。
缺点：（1）从这个激活函数的公式14中可以看出，每个neuron将有两组w，**那么参数就增加了一倍**。这就导致了整体参数的数量激增。
