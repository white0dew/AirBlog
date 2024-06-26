---
title: 第 13 章 项目一：数据分析与可视化
urlname: edqe2985pgw4ay41
date: '2024-06-25 22:26:08'
updated: '2024-06-25 22:26:25'
description: 'keywords: 数据分析,可视化,MATLAB,描述性统计,回归分析,差异分析数据分析与可视化是利用 MATLAB 进行科学研究和工程应用的重要内容。通过对数据的分析和图形化展示,我们可以更好地理解数据背后的规律和趋势,从而为决策提供有力支撑。本章将带领大家完成一个完整的数据分析与可视化项...'
keywords: '数据分析,可视化,MATLAB,描述性统计,回归分析,差异分析'
---
数据分析与可视化是利用 MATLAB 进行科学研究和工程应用的重要内容。通过对数据的分析和图形化展示,我们可以更好地理解数据背后的规律和趋势,从而为决策提供有力支撑。本章将带领大家完成一个完整的数据分析与可视化项目,深入体验 MATLAB 在该领域的强大功能。
## 13.1 项目需求分析
在开始具体的编码工作之前,我们需要对项目的背景和目标进行充分的了解和分析。只有明确了项目的需求,才能更好地开展后续工作。
### 13.1.1 数据分析的背景
假设我们获得了某城市近十年的空气质量数据,包括 PM2.5、PM10、SO2、NO2、CO 和 O3 的日均浓度值。我们希望通过对这些数据的分析,了解该城市空气质量的变化趋势,以及各污染物之间的关系,为环保部门制定相应政策提供参考。
### 13.1.2 项目的目标
本项目的主要目标包括:

1. 对数据进行预处理,剔除异常值,补全缺失值。
2. 进行描述性统计分析,计算各污染物的均值、方差等统计量,了解其分布特征。
3. 通过回归分析,研究各污染物之间的相关性。
4. 利用方差分析等方法,考察不同季节、不同年份之间空气质量的差异。
5. 运用多种可视化方法,直观展示数据分析的结果。
## 13.2 数据的获取和预处理
高质量的数据是开展分析工作的前提。我们需要获取所需数据,并对其进行必要的预处理,以提高数据的可用性。
### 13.2.1 数据的导入
假设我们已经获得了一个 Excel 文件 `AirQuality.xlsx`,其中包含了所需的空气质量数据。我们可以使用 MATLAB 的 `readtable` 函数将其读入:
```matlab
data = readtable('AirQuality.xlsx');
```
### 13.2.2 数据的清洗与转换
导入数据后,我们需要对其进行清洗和转换,常见的操作包括:

1. 检查并剔除异常值:
```matlab
% 剔除 PM2.5 浓度大于 1000 的异常值
data(data.PM25 > 1000, :) = [];
```

2. 补全缺失值。可以用均值、中位数等填充,或者采用插值法:
```matlab
% 用列均值填充缺失值
data = fillmissing(data, 'constant', 'mean');
```

3. 将日期字符串转换为`datetime`类型,便于后续分析:
```matlab
data.Date = datetime(data.Date, 'InputFormat', 'yyyy-MM-dd');
```
经过上述处理后,我们得到了一个相对干净、可用的数据集。
## 13.3 数据的分析和统计
在完成数据预处理后,我们就可以开展进一步的分析和统计工作了。MATLAB 提供了丰富的统计函数,能够帮助我们快速实现常用的分析方法。
### 13.3.1 描述性统计分析
首先,让我们对主要污染物进行描述性统计,了解其集中趋势和离散程度:
```matlab
vars = {'PM25', 'PM10', 'SO2', 'NO2', 'CO', 'O3'};
stats = table();
for i = 1:length(vars)
    stats.(vars{i}) = [mean(data.(vars{i})); std(data.(vars{i}))];
end
rownames(stats) = {'Mean', 'Std'};
disp(stats);
```
上面的代码循环计算各个污染物的均值和标准差,并将结果存入 `stats` 表格中显示出来,一目了然。
我们还可以绘制箱线图,直观比较不同污染物的分布情况:
```matlab
figure;
boxplot(data{:, vars}, 'Labels', vars);
ylabel('Concentration (ug/m^3)');
title('Distribution of Air Pollutants');
```
![](https://oss1.aistar.cool/elog-offer-now/2531d304e5051bb6c46e68be1aa139af.png)
从箱线图可以看出,PM10 和 O3 的浓度分布较为分散,而 SO2 和 CO 的浓度相对集中。
### 13.3.2 回归分析
接下来,让我们分析不同污染物之间的相关性。我们可以计算污染物两两之间的相关系数:
```matlab
R = corrcoef(data{:, vars});
figure;
h = heatmap(vars, vars, R);
h.Title = 'Correlation between Air Pollutants';
h.XLabel = 'Pollutant';
h.YLabel = 'Pollutant';
```
![](https://oss1.aistar.cool/elog-offer-now/3bcdf4b9619854ac81c2afbad86f7b53.png)
从相关系数热力图中可以看出,PM2.5 和 PM10 之间的相关性最强,CO 和 SO2 次之。
如果我们想进一步探究 PM2.5 和 PM10 的关系,可以进行线性回归分析:
```matlab
mdl = fitlm(data, 'PM25 ~ PM10');
mdl.plot();
```
![](https://oss1.aistar.cool/elog-offer-now/48a348c484ed69061ee30654573e402c.png)
从回归分析结果可以看出,PM2.5 和 PM10 之间存在显著的线性关系,决定系数 R^2 高达 0.8。
### 13.3.3 差异分析
最后,我们考察不同季节之间空气质量是否存在显著差异。首先根据日期提取季节信息:
```matlab
data.Season = month(data.Date);
data.Season(data.Season >= 3 & data.Season <= 5) = "Spring";
data.Season(data.Season >= 6 & data.Season <= 8) = "Summer";
data.Season(data.Season >= 9 & data.Season <= 11) = "Autumn";
data.Season(data.Season == 12 | data.Season <= 2) = "Winter";
```
然后利用单因素方差分析,检验不同季节 PM2.5 均值的差异:
```matlab
[p, anova_table, stats] = anova1(data.PM25, data.Season, 'off');
```
从方差分析的 p 值(假设 p<0.05)可以判断,不同季节的 PM2.5 浓度差异显著。我们还可以绘制不同季节 PM2.5 浓度的箱线图:
```matlab
figure;
boxplot(data.PM25, data.Season);
ylabel('PM2.5 Concentration (ug/m^3)');
title('PM2.5 Concentrations in Different Seasons');
```
![](https://oss1.aistar.cool/elog-offer-now/ef76a5c8b30596fb5776b009e47bfe15.png)
可以看出,冬季的 PM2.5 浓度显著高于其他季节,夏季浓度最低。
## 13.4 数据的可视化展示
前面我们已经运用了多个图形函数,如 `boxplot`、`heatmap` 等,生动展示了分析结果。MATLAB 还支持很多其他类型的可视化方法。
### 13.4.1 绘制基本图形
例如,我们可以绘制各污染物逐年均值的变化趋势:
```matlab
data.Year = year(data.Date);
yearly_mean = varfun(@mean, data, 'GroupingVariables', 'Year', 'InputVariables', vars);

figure;
plot(yearly_mean.Year, yearly_mean{:, 2:end});
xlabel('Year');
ylabel('Concentration (ug/m^3)');
title('Yearly Average Concentrations of Air Pollutants');
legend(vars);
```
![](https://oss1.aistar.cool/elog-offer-now/1d221f12e7ed2d05e7b7864f18e4c034.png)
### 13.4.2 多维数据的可视化
对于多维数据,我们可以采用平行坐标图、雷达图等方式展示:
```matlab
figure;
parallelcoords(yearly_mean, 'Group', [], 'Quantile', 0.25, vars);
xlabel('Air Pollutant');
ylabel('Concentration (ug/m^3)');
title('Yearly Average Concentrations');
```
![](https://oss1.aistar.cool/elog-offer-now/63f002637b28fef8fb84468f3f9b84d4.png)
```matlab
figure;
spider_plot(table2array(yearly_mean(:, 2:end)), 'AxesLabels', vars);
title('Radar Chart of Yearly Average Concentrations');
```
![](https://oss1.aistar.cool/elog-offer-now/94d0d8885cffe685f0e3e7f99f3fa446.png)
> 注:这里用到了一个自定义函数 `spider_plot`,其实现代码可以在 MATLAB 中心下载。

### 13.4.3 动态可视化展示
除了静态图形,我们还可以创建动态可视化,展示数据的时序变化。例如绘制 PM2.5 浓度的逐日变化动画:
```matlab
figure;
for d = min(data.Date):max(data.Date)
    plot(data.Date(data.Date <= d), data.PM25(data.Date <= d), 'b-', 'LineWidth', 1.5);
    xlabel('Date');
    ylabel('PM2.5 Concentration (ug/m^3)');
    title('Daily PM2.5 Concentration');
    xlim([min(data.Date), max(data.Date)]);
    ylim([0, max(data.PM25)]);
    drawnow;
    pause(0.01);
end
```
![](https://oss1.aistar.cool/elog-offer-now/bd64021c462b71cf28f2f3f9575b339d.gif)
## 本章小结
本章以一个空气质量数据分析项目为例,全面演示了如何利用 MATLAB 开展数据分析与可视化工作。我们从数据的导入与预处理开始,运用多种统计方法分析数据,并借助丰富的可视化手段展示结果。
通过本章的学习,相信大家已经初步掌握了 MATLAB 数据分析的基本流程和常用方法。这只是一个起点,希望大家能在此基础上,结合自己的实际需求,去探索更多有趣、有价值的数据分析项目。让我们一起利用 MATLAB 这个强大的工具,去发现数据背后的奥秘,创造更多价值!
如果大家在学习过程中有任何疑问或想法,欢迎在评论区留言讨论。让我们共同成长,一起进步!
