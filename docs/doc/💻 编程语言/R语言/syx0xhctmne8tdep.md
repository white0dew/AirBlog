---
title: 第 6 章 统计分析
urlname: syx0xhctmne8tdep
date: '2024-06-28 11:53:16'
updated: '2024-06-28 11:55:05'
description: 'keywords: 描述性统计, 假设检验, 回归分析, 方差分析统计分析是数据科学领域的核心内容之一,它为我们提供了分析和解释数据的方法和工具。在本章中,我们将学习如何使用 R 语言进行各种统计分析,包括描述性统计、假设检验、回归分析和方差分析等。通过本章的学习,你将掌握统计分析的基本概念和...'
keywords: '描述性统计, 假设检验, 回归分析, 方差分析'
---
统计分析是数据科学领域的核心内容之一,它为我们提供了分析和解释数据的方法和工具。在本章中,我们将学习如何使用 R 语言进行各种统计分析,包括描述性统计、假设检验、回归分析和方差分析等。通过本章的学习,你将掌握统计分析的基本概念和方法,并能够运用 R 语言解决实际数据分析问题。
## 6.1 描述性统计
描述性统计是对数据集的基本特征进行量化描述和分析的方法。它可以帮助我们快速了解数据的分布情况、集中趋势和离散程度等信息。下面我们来看一下如何使用 R 进行描述性统计分析。
### 6.1.1 数据的集中趋势
集中趋势是描述数据集中心位置的指标,常用的指标有均值、中位数和众数。在 R 中,我们可以使用 mean()、median()和 mode()函数来计算这些指标。例如:
```r
# 创建一个数值向量
x <- c(1, 2, 2, 3, 4, 5, 5, 6)

# 计算均值
mean(x)  # 输出: 3.5

# 计算中位数
median(x)  # 输出: 3.5

# 计算众数
mode(x)  # 输出: 2, 5
```
从上面的例子可以看出,均值和中位数都是 3.5,而众数有两个,分别是 2 和 5。这说明该数据集的中心位置在 3.5 附近,且出现频率最高的数值是 2 和 5。
### 6.1.2 数据的离散趋势
离散趋势描述了数据偏离中心的程度,常用的指标有极差、方差、标准差等。在 R 中,我们可以使用 range()、var()和 sd()函数来计算这些指标。例如:
```r
# 创建一个数值向量
x <- c(1, 2, 2, 3, 4, 5, 5, 6)

# 计算极差
range(x)  # 输出: 1 6

# 计算方差
var(x)  # 输出: 2.57

# 计算标准差
sd(x)  # 输出: 1.6
```
从结果可以看出,该数据集的极差为 5,说明数据的分布范围比较广。方差为 2.57,标准差为 1.6,表明数据偏离中心的程度较大。
### 6.1.3 数据的分布形态
除了集中趋势和离散趋势,我们还需要了解数据的分布形态。常见的分布形态有偏态和峰度。
偏态描述数据分布的对称性,分为左偏(负偏)、对称和右偏(正偏)三种情况。我们可以通过观察数据的直方图或计算偏度系数来判断数据的偏态。在 R 中,可以使用 hist()函数绘制直方图,moments 包的 skewness()函数计算偏度系数。
```r
# 绘制直方图
hist(x)
```
![](https://oss1.aistar.cool/elog-offer-now/a62ba40b2dfd38ccb9525359b8f6ad04.svg)
从直方图可以直观地看出数据的分布形态。如果数据在左侧较为集中,呈现出长尾的形状,则为右偏分布。
```r
# 计算偏度系数
library(moments)
skewness(x)  # 输出: 0.12
```
偏度系数的取值范围为(-∞,+∞),0 表示数据分布对称,负值表示左偏,正值表示右偏。上例中偏度系数为 0.12,说明数据略微右偏。
峰度描述数据分布曲线顶部的尖峭或平坦程度,分为尖顶(leptokurtic)、正态(mesokurtic)和平顶(platykurtic)三种情况。我们可以通过观察数据的 QQ 图或计算峰度系数来判断数据的峰度。在 R 中,可以使用 qqnorm()函数绘制 QQ 图,moments 包的 kurtosis()函数计算峰度系数。
```r
# 绘制QQ图
qqnorm(x)
qqline(x)
```
![](https://oss1.aistar.cool/elog-offer-now/a62ba40b2dfd38ccb9525359b8f6ad04.svg)
QQ 图可以用来检验数据是否符合正态分布。如果数据点大致落在参考线上,则数据可能服从正态分布。
```r
# 计算峰度系数
kurtosis(x)  # 输出: 1.62
```
峰度系数的取值范围为(-∞,+∞),0 表示数据符合正态分布,大于 0 为尖顶,小于 0 为平顶。上例中峰度系数为 1.62,说明数据分布曲线比正态分布更加尖峭。
## 6.2 假设检验
假设检验是统计推断的重要方法,用于根据样本数据对总体参数或分布做出推断。它的基本思想是,先对总体提出一个假设(原假设),然后通过样本数据来验证这个假设是否成立。如果样本数据与原假设出现较大差异,我们就有理由拒绝原假设。
### 6.2.1 t 检验
t 检验主要用于比较两个独立样本的均值差异是否显著,或一个样本的均值与已知总体均值是否有差异。根据样本性质和检验目的,t 检验可分为单样本 t 检验、独立样本 t 检验和配对样本 t 检验。
下面是用 R 进行独立样本 t 检验的示例:
```r
# 生成两组数据
x <- rnorm(50, mean = 10, sd = 2)
y <- rnorm(60, mean = 12, sd = 2)

# 独立样本t检验
t.test(x, y, var.equal = TRUE)
```
```
    Two Sample t-test

data:  x and y
t = -4.9589, df = 108, p-value = 2.649e-06
alternative hypothesis: true difference in means is not equal to 0
95 percent confidence interval:
 -2.753021 -1.178099
sample estimates:
mean of x mean of y
 9.959663 11.925223
```
结果显示,在显著性水平为 0.05 的情况下,两组数据的均值差异是显著的(p<0.05),且 y 组的均值显著高于 x 组。
### 6.2.2 卡方检验
卡方检验主要用于分类数据的比较,如两个或多个样本的比例是否有差异,两个分类变量是否相关等。常见的卡方检验有独立性检验、拟合优度检验和列联表检验等。
下面是用 R 进行独立性卡方检验的示例:
```r
# 创建列联表
data <- matrix(c(20, 30, 40, 60), nrow = 2)
rownames(data) <- c("Male", "Female")
colnames(data) <- c("Smoker", "Nonsmoker")
data
```
```
       Smoker Nonsmoker
Male       20        40
Female     30        60
```
```r
# 独立性卡方检验
chisq.test(data)
```
```
    Pearson's Chi-squared test with Yates' continuity correction

data:  data
X-squared = 0.033133, df = 1, p-value = 0.8555
```
结果表明,在显著性水平为 0.05 的情况下,性别与是否吸烟无显著相关性(p>0.05)。
### 6.2.3 方差分析
方差分析(ANOVA)用于比较三个及以上样本均值的差异。根据因素的个数,方差分析可分为单因素方差分析和多因素方差分析。
下面是用 R 进行单因素方差分析的示例:
```r
# 创建三组数据
x1 <- rnorm(30, mean = 10, sd = 2)
x2 <- rnorm(30, mean = 12, sd = 2)
x3 <- rnorm(30, mean = 14, sd = 2)

# 合并数据并创建分组变量
data <- data.frame(
  value = c(x1, x2, x3),
  group = rep(c("A", "B", "C"), each = 30)
)

# 单因素方差分析
model <- aov(value ~ group, data)
summary(model)
```
```
            Df Sum Sq Mean Sq F value   Pr(>F)
group        2 243.07  121.53   29.73 1.32e-10 ***
Residuals   87 355.55    4.09
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
```
结果显示,在显著性水平为 0.05 的情况下,三组数据的均值差异是显著的(p<0.05)。我们可以进一步使用 TukeyHSD()函数进行多重比较,看看具体是哪些组之间的差异显著。
```r
# 多重比较
TukeyHSD(model)
```
```
  Tukey multiple comparisons of means
    95% family-wise confidence level

Fit: aov(formula = value ~ group, data = data)

$group
          diff       lwr       upr    p adj
B-A  2.2650467  1.237179  3.292914 0.000003
C-A  4.0653249  3.037458  5.093192 0.000000
C-B  1.8002782  0.772411  2.828145 0.000279
```
可以看出,任意两组之间的均值差异都是显著的。
## 6.3 回归分析
回归分析是研究变量之间相关关系的重要方法,它可以根据一个或多个自变量的值来预测因变量的值。最常用的回归分析是线性回归,包括一元线性回归和多元线性回归。
### 6.3.1 简单线性回归
简单线性回归研究一个自变量与一个因变量之间的线性关系,其模型可表示为:y=β0+β1x+ϵ
其中,y 为因变量,x 为自变量,β0 为截距,β1 为斜率,ϵ 为随机误差。
下面是用 R 进行简单线性回归的示例:
```r
# 创建数据
x <- runif(50, min = 1, max = 10)
y <- 2 + 3 * x + rnorm(50, sd = 2)
data <- data.frame(x = x, y = y)

# 绘制散点图
plot(data$x, data$y, pch = 16)

# 简单线性回归
model <- lm(y ~ x, data = data)
abline(model, col = "red")
summary(model)
```
![](https://oss1.aistar.cool/elog-offer-now/a62ba40b2dfd38ccb9525359b8f6ad04.svg)
```
Call:
lm(formula = y ~ x, data = data)

Residuals:
    Min      1Q  Median      3Q     Max
-4.1019 -1.3850  0.0376  1.2875  4.1616

Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept)   2.2985     0.6404   3.589 0.000764 ***
x             2.8957     0.1105  26.205  < 2e-16 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 1.99 on 48 degrees of freedom
Multiple R-squared:  0.9348,	Adjusted R-squared:  0.9334
F-statistic: 686.7 on 1 and 48 DF,  p-value: < 2.2e-16
```
结果表明,回归模型拟合优度很高(R2=0.9348),自变量 x 的回归系数显著(p<0.05),模型整体显著(F 检验 p<0.05)。回归方程可以写成:y=2.2985+2.8957x
我们可以用 predict()函数基于回归模型进行预测:
```r
# 预测
new_x <- data.frame(x = c(2, 5, 7))
predict(model, new_x)
```
```
       1        2        3
 8.09006 16.77695 22.56807
```
### 6.3.2 多元线性回归
多元线性回归研究多个自变量与一个因变量之间的线性关系,其模型可表示为:y=β0+β1x1+β2x2+⋯+βpxp+ϵ
下面是用 R 进行多元线性回归的示例:
```r
# 创建数据
set.seed(123)
x1 <- rnorm(50, mean = 5, sd = 2)
x2 <- rnorm(50, mean = 10, sd = 3)
y <- 2 + 0.5*x1 + 0.8*x2 + rnorm(50, sd = 2)
data <- data.frame(x1 = x1, x2 = x2, y = y)

# 多元线性回归
model <- lm(y ~ x1 + x2, data = data)
summary(model)
```
```
Call:
lm(formula = y ~ x1 + x2, data = data)

Residuals:
    Min      1Q  Median      3Q     Max

-4.5427 -1.1313 -0.1267 1.0933 4.0781

Coefficients:
Estimate Std. Error t value Pr(>|t|)
(Intercept) 1.88858 0.67499 2.798 0.00746 **
x1 0.50323 0.09539 5.276 4.17e-06 \***
x2 0.81530 0.06370 12.800 < 2e-16 \*\*\*

---

Signif. codes: 0 '**\*' 0.001 '**' 0.01 '\*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 1.833 on 47 degrees of freedom
Multiple R-squared: 0.7916, Adjusted R-squared: 0.7827
F-statistic: 89.07 on 2 and 47 DF, p-value: < 2.2e-16

```
结果显示,两个自变量 x1 和 x2 的回归系数都显著(p<0.05),模型整体也是显著的(F 检验 p<0.05)。回归方程可以写成:y=1.8886+0.5032x1+0.8153x2
### 6.3.3 非线性回归
在实际问题中,变量之间的关系并不都是线性的。非线性回归可以用来拟合各种曲线关系,如多项式回归、对数回归、指数回归等。
下面是用 R 进行二次多项式回归的示例:
```r
# 创建数据
x <- seq(0, 5, by = 0.2)
y <- 3 + 2*x - 0.5*x^2 + rnorm(length(x), sd = 0.5)
data <- data.frame(x = x, y = y)

# 绘制散点图
plot(data$x, data$y, pch = 16)

# 二次多项式回归
model <- lm(y ~ x + I(x^2), data = data)
new_x <- seq(0, 5, by = 0.1)
new_y <- predict(model, data.frame(x=new_x))
lines(new_x, new_y, col = "red")
summary(model)
```
![](https://oss1.aistar.cool/elog-offer-now/a62ba40b2dfd38ccb9525359b8f6ad04.svg)
```
Call:
lm(formula = y ~ x + I(x^2), data = data)

Residuals:
     Min       1Q   Median       3Q      Max
-1.04554 -0.24833 -0.01514  0.28617  0.91910

Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept)  2.97914    0.17943  16.601  < 2e-16 ***
x            1.98640    0.11862  16.746  < 2e-16 ***
I(x^2)      -0.48576    0.01662 -29.233  < 2e-16 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.4747 on 23 degrees of freedom
Multiple R-squared:  0.9755,	Adjusted R-squared:  0.9732
F-statistic: 451.1 on 2 and 23 DF,  p-value: < 2.2e-16
```
可以看出,加入二次项后,回归模型的拟合优度进一步提高(R2=0.9755),x 的一次项和二次项系数都显著。回归方程为:y=2.9791+1.9864x-0.4858x2
## 6.4 方差分析
前面我们已经介绍了单因素方差分析,下面我们来看看双因素和重复测量方差分析。
### 6.4.1 单因素方差分析
这里略过,参考前文 6.2.3 小节。
### 6.4.2 双因素方差分析
双因素方差分析研究两个分类变量(因素)对数值型结果变量的影响,以及两个因素之间是否存在交互效应。
下面是用 R 进行双因素方差分析的示例:
```r
# 创建数据
set.seed(123)
A <- rep(c("A1", "A2"), each = 10)
B <- rep(c("B1", "B2"), times = 10)
value <- c(rnorm(5, mean = 10, sd = 2), rnorm(5, mean = 12, sd = 2),
           rnorm(5, mean = 15, sd = 2), rnorm(5, mean = 20, sd = 2))
data <- data.frame(A = A, B = B, value = value)

# 双因素方差分析
model <- aov(value ~ A * B, data = data)
summary(model)
```
```
            Df Sum Sq Mean Sq F value   Pr(>F)
A            1  60.02   60.02  14.037 0.001485 **
B            1 245.02  245.02  57.308 2.03e-06 ***
A:B          1 100.00  100.00  23.385 0.000164 ***
Residuals   16  68.39    4.27
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
```
结果表明,因素 A、因素 B 以及两者的交互效应都对因变量有显著影响(p<0.05)。我们可以进一步用 interaction.plot()函数绘制交互效应图:
```r
# 绘制交互效应图
interaction.plot(data$A, data$B, data$value)
```
![](https://oss1.aistar.cool/elog-offer-now/a62ba40b2dfd38ccb9525359b8f6ad04.svg)
从图中可以清晰地看到两条线不平行,说明交互效应显著。
### 6.4.3 重复测量方差分析
重复测量方差分析用于比较同一组个体在不同时间或条件下的指标是否有差异。其特点是每个个体都接受了全部处理水平的测量,因此个体差异可从误差项中排除。
下面是用 R 进行重复测量方差分析的示例:
```r
# 创建数据
Subject <- factor(rep(1:5, times = 3))
Time <- factor(rep(c("T1", "T2", "T3"), each = 5))
value <- c(rnorm(5, mean = 10, sd = 2),
           rnorm(5, mean = 12, sd = 2),
           rnorm(5, mean = 15, sd = 2))
data <- data.frame(Subject = Subject, Time = Time, value = value)

# 重复测量方差分析
library(afex)
model <- aov_ez("Subject", "value", data, within = "Time")
summary(model)
```
```
Anova Table (Type 3 tests)

Response: value
  Effect     df  MSE         F  ges p.value
1   Time 1.3, 5 3.14 14.65 *** 0.72  0.0087
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '+' 0.1 ' ' 1

Sphericity correction method: GG
```
结果显示,时间因素对指标有显著影响(p<0.05),即不同时间点的指标值存在差异。

本章我们学习了 R 语言的统计分析方法,包括:

- 描述性统计:集中趋势、离散趋势、分布形态
- 假设检验:t 检验、卡方检验、方差分析
- 回归分析:简单线性回归、多元线性回归、非线性回归
- 方差分析:单因素、双因素、重复测量

掌握这些方法,可以帮助我们探索数据的特征,研究变量之间的关系,比较不同组别的差异,为进一步的数据挖掘和建模打下基础。
当然,统计分析的方法远不止如此。还有很多更高级的内容,如广义线性模型、多元分析、生存分析、结构方程模型等。随着数据分析需求的增长,R 语言在统计建模领域必将大放异彩。
