---
title: '第 13 章 R语言实战项目一: 数据分析与可视化'
urlname: bpemebnfunhxkbg9
date: '2024-06-28 11:47:58'
updated: '2024-06-28 11:59:36'
description: 'keywords: R语言数据分析, 数据可视化, 统计分析, 项目实战本章我们将通过一个完整的项目案例,带领大家学习如何使用R语言进行数据分析和可视化。通过实战操作,你将掌握数据分析的基本流程,并能使用R强大的可视化功能,生动形象地展示分析结果。13.1 项目需求分析在开始一个数据分析项目之...'
keywords: 'R语言数据分析, 数据可视化, 统计分析, 项目实战'
---
本章我们将通过一个完整的项目案例,带领大家学习如何使用R语言进行数据分析和可视化。通过实战操作,你将掌握数据分析的基本流程,并能使用R强大的可视化功能,生动形象地展示分析结果。
## 13.1 项目需求分析
在开始一个数据分析项目之前,我们首先要明确项目的背景和目标。这将决定后续的分析思路和侧重点。
### 13.1.1 数据分析的背景
假设我们是一家航空公司的数据分析师,需要分析公司航班数据,以期发现一些有价值的规律和见解。我们掌握了过去几年公司所有航班的数据,包括起飞、到达机场,航班号,飞行距离,延误时间等信息。公司高层希望通过数据分析优化航线安排,改善航班准点率。
### 13.1.2 项目目标
本项目的目标主要包括:

1. 分析航班延误情况,找出延误多发的航线和时段
2. 研究航班延误与飞行距离、起降机场等因素的关系
3. 对航班数据进行统计汇总,为管理层决策提供数据支持
4. 使用数据可视化技术,直观展示分析结果

明确了项目目标,就可以着手准备数据了。
## 13.2 数据的获取和预处理
高质量的数据是一切分析的基础。我们需要将数据导入到R中,并对其进行必要的清洗和预处理,为后续分析做好准备。
### 13.2.1 数据的导入
我们的航班数据以CSV文件的格式存储。可以使用`read.csv()`函数将其读入R:
```r
flights <- read.csv("flights.csv")
```
导入后,使用`head()`和`str()`函数查看数据的基本情况:
```r
head(flights)
str(flights)
```
数据集包含了每个航班的日期、航班号、起飞机场、到达机场、飞行距离、延误时间等重要信息。
### 13.2.2 数据的清洗与转换
导入的原始数据往往存在一些问题,需要进行清洗和转换:

- 缺失值的处理。可以删除包含缺失值的记录,也可以进行合理的填补。
- 将日期、时间等字符串转换为相应的数据类型。如使用`as.Date()`将日期字符串转换为日期型。
- 根据分析需要,创建新的衍生变量。如用起飞和到达时间计算飞行时长。

下面的代码演示了一些常用的数据处理操作:
```r
# 剔除缺失记录
flights <- na.omit(flights)

# 转换日期型变量
flights$Date <- as.Date(flights$Date, format="%Y-%m-%d") 

# 提取航班延误情况
flights$isDelayed <- flights$ArrDelay > 0

# 计算飞行时长
flights$Duration <- flights$ArrTime - flights$DepTime

```
这样我们就得到了一个比较干净、可用的数据集。数据预处理需要耗费大量时间,但却是任何分析的根基。
## 13.3 数据的分析和统计
当数据准备就绪后,就可以开始进行探索性分析,挖掘数据中的信息。我们主要使用dplyr包来进行数据操作。
### 13.3.1 描述性统计分析
描述性统计可以帮助我们快速了解数据的基本特征。如使用`summarise()`计算延误时间的均值和中位数:
```r
flights %>% 
  summarise(
    delay_mean = mean(ArrDelay, na.rm = TRUE),
    delay_median = median(ArrDelay, na.rm = TRUE)
  )
```
使用`group_by()`和`summarise()`可以计算不同航线的延误情况:
```r
flights %>%
  group_by(UniqueCarrier) %>%
  summarise(
    num_flights = n(), 
    delay_mean = mean(ArrDelay, na.rm = TRUE)
  ) %>%
  arrange(desc(delay_mean))
```
### 13.3.2 相关性分析
我们可以分析航班延误与其他因素之间的相关性。如使用`geom_point()`绘制飞行距离与延误时间的散点图:
```r
ggplot(flights, aes(x = Distance, y = ArrDelay)) + 
  geom_point(alpha = 0.1) +
  geom_smooth()
```
从图中可以看出,飞行距离越长,延误时间也会越长。这符合常识,因为长途飞行受天气等因素影响更大。
### 13.3.3 假设检验
除了图形展示,我们还可以进行统计检验,判断一些假设是否成立。比如,我们想知道周末和工作日的航班延误时间是否有显著差异:
```r
# 提取周末和工作日数据
wday <- flights %>% filter(DayOfWeek %in% c(1, 2, 3, 4, 5)) 
wend <- flights %>% filter(DayOfWeek %in% c(6, 7))

# t检验
t.test(wday$ArrDelay, wend$ArrDelay)
```
结果表明,在统计上,周末航班的延误时间显著高于工作日。
## 13.4 数据的可视化展示
数据可视化是数据分析中不可或缺的一部分。一张好的图往往胜过大段的文字描述。R语言有多个强大的可视化扩展包,如ggplot2等。
### 13.4.1 绘制基本图形
使用ggplot2,我们可以方便地绘制各种图形。如绘制航班延误情况的直方图:
```r
ggplot(flights, aes(x=ArrDelay)) + 
  geom_histogram(binwidth=30, color="black", fill="blue", alpha=0.7) +
  labs(x="Arrival Delay (min)", y="Number of Flights", 
       title="Distribution of Arrival Delays")
```
 ```mermaid pie title 航班延误占比 "延误" : 62.3 "准点" : 37.7 ``` 
除了直方图,我们还可以根据需要绘制折线图(geom_line)、条形图(geom_bar)、箱线图(geom_boxplot)等。
### 13.4.2 多维数据的可视化
对于多维数据,我们可以使用分面(facet)图将其拆分。如下图展示了不同航空公司在一周内各天的平均延误时间:
```r
ggplot(flights, aes(x=DayOfWeek, y=ArrDelay, color=UniqueCarrier)) +
  geom_line(size=1) + 
  facet_wrap(~UniqueCarrier, nrow=3) +
  labs(x="Day of Week", y="Mean Arrival Delay (min)") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
```
 ```mermaid graph LR A[Monday] --> B[Tuesday] --> C[Wednesday] --> D[Thursday] --> E[Friday] --> F[Saturday] --> G[Sunday] style A fill:#CCEEFF style B fill:#AADDCC style C fill:#CCEEFF style D fill:#AADDCC style E fill:#CCEEFF style F fill:#FFCCDD style G fill:#FFCCDD ``` 
从图中可以清晰地看出,不同公司之间航班延误时间的差异,以及周末延误加剧的普遍趋势。这对于我们理解数据大有裨益。
### 13.4.3 动态可视化展示
除了静态图形,R还支持交互式的动态可视化。例如,我们可以使用plotly包创建一个可缩放、可筛选的延误时间热力图:
```r
# 按日期和小时分组
delay_by_hour <- flights %>%
  group_by(Date, CRSDepTime_hour) %>%
  summarise(AvgDelay = mean(DepDelay, na.rm = TRUE)) 

# 绘制热力图
p <- ggplot(delay_by_hour, aes(Date, CRSDepTime_hour, fill = AvgDelay)) +
  geom_tile(color = "white") +
  scale_fill_gradient2(low = "blue", mid = "white",  high = "red", 
                       midpoint = 0, limit = c(-30,120),
                       name="Delay (min)") +
  labs(title = "Delays by Time of Day and Date")

# 转化为交互式plotly图形
ggplotly(p)
```
生成的图形允许用户通过滑动、缩放等操作深入探索数据。这种交互式的可视化赋予了图形更多的维度,能够传递更丰富的信息。
数据可视化是一门艺术,需要在技术和审美之间寻找平衡。建议多学习优秀的可视化案例,并勤加练习。
