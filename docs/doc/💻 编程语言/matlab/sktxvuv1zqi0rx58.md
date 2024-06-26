---
title: 第 7 章：图像处理
urlname: sktxvuv1zqi0rx58
date: '2024-06-25 22:29:30'
updated: '2024-06-25 22:29:46'
description: 'keywords: 图像处理,图像读取,图像显示,图像增强,图像分割,图像特征提取图像处理是 MATLAB 的一大应用领域。得益于 MATLAB 丰富的图像处理函数库,我们可以非常方便地使用 MATLAB 对图像进行各种操作,如读取、显示、变换、滤波、分割、特征提取等。本章我们将全面学习 MA...'
keywords: '图像处理,图像读取,图像显示,图像增强,图像分割,图像特征提取'
---
图像处理是 MATLAB 的一大应用领域。得益于 MATLAB 丰富的图像处理函数库,我们可以非常方便地使用 MATLAB 对图像进行各种操作,如读取、显示、变换、滤波、分割、特征提取等。本章我们将全面学习 MATLAB 图像处理的相关内容。
## 7.1 图像的读取与显示
在用 MATLAB 进行图像处理之前,首先需要将图像读入到 MATLAB 的工作空间中。MATLAB 支持读取多种常见的图像格式,如 bmp、jpg、png、tif 等。
### 7.1.1 读取图像文件
使用 `imread` 函数可以将图像文件读取到 MATLAB 中,其用法为:
```matlab
I = imread('filename')
```
其中 `'filename'` 是要读取的图像文件名(包含路径)。例如,读取一幅名为 `lena.jpg` 的图像:
```matlab
I = imread('lena.jpg');
```
如果图像是灰度图,则返回的 I 是一个二维数组,数组元素表示图像像素灰度值。如果图像是 RGB 彩色图,则返回的 I 是一个三维数组,前两维表示图像像素位置,第三维索引对应 R/G/B 三个通道。
### 7.1.2 显示图像
读取图像后,可以使用 `imshow` 函数在图形窗口中显示图像:
```matlab
imshow(I)
```
其中 I 是之前用 `imread` 读取的图像数组。例如:
```matlab
I = imread('cameraman.tif');
imshow(I)
```
显示效果如下:
![](https://oss1.aistar.cool/elog-offer-now/478c0064fcc0c50f007dd3769ee76e8e.jpg)
除了 `imshow`,还可以使用 `image` 或 `imagesc` 函数显示图像,它们对图像的处理和显示方式略有不同,可以根据需要选用。
### 7.1.3 图像的基本属性
图像读取后,我们可以通过一些函数获取图像的基本属性:

- 使用`size`函数获取图像的尺寸(高度和宽度)
- 使用`ndims`函数获取图像数组的维度
- 使用`class`函数获取图像数据的类型

例如:
```matlab
I = imread('rice.png');
[height, width] = size(I);
dims = ndims(I);
classname = class(I);

disp(['图像尺寸: ' num2str(height) '行 ' num2str(width) '列'])
disp(['图像维度: ' num2str(dims)])
disp(['数据类型: ' classname])
```
输出结果:
```
图像尺寸: 256 行 256 列
图像维度: 2
数据类型: uint8
```
可见该图像是一幅 256*256 的灰度图像。了解图像的这些基本属性,对于后续的图像处理很有帮助。
## 7.2 图像的基本操作
### 7.2.1 图像的裁剪与缩放
使用 `imcrop` 可以裁剪图像的指定区域,其调用格式为:
```matlab
J = imcrop(I, rect)
```
其中 `I` 为原图像,`rect` 是一个 1_4 的向量,指定了裁剪区域的左上角和右下角坐标。例如,裁剪上述 cameraman 图像的左上角 100_100 的区域:
```matlab
I = imread('cameraman.tif');
rect = [1 1 100 100];  % 指定裁剪区域
J = imcrop(I, rect);
imshow(J)
```
![](https://oss1.aistar.cool/elog-offer-now/958d36bdd657744f4b336471c7bd772c.jpg)
使用 `imresize` 可以缩放图像,其用法为:
```matlab
J = imresize(I, scale)
```
其中 `scale` 指定了缩放比例,可以是一个 1*2 的向量,分别表示行、列的缩放比例,也可以是一个标量,表示图像整体的缩放比例。
例如,将上述 cameraman 图像缩小为原来的一半:
```matlab
I = imread('cameraman.tif');
J = imresize(I, 0.5);
imshow(J)
```
![](https://oss1.aistar.cool/elog-offer-now/f4ecdc615398c8ed43336ca7290505f2.jpg)
### 7.2.2 图像的旋转与翻转
使用 `imrotate` 可以旋转图像,其调用格式为:
```matlab
J = imrotate(I, angle)
```
其中 `angle` 指定了顺时针旋转的角度,单位为度。例如,将图像逆时针旋转 30°:
```matlab
I = imread('cameraman.tif');
J = imrotate(I, -30);
imshow(J)
```
![](https://oss1.aistar.cool/elog-offer-now/4eb094b7b88d0edc915d80ad5c41fd37.jpg)
使用 `fliplr` 和 `flipud` 可以对图像进行左右翻转和上下翻转,用法很简单:
```matlab
J1 = fliplr(I);  % 左右翻转
J2 = flipud(I);  % 上下翻转
```
### 7.2.3 图像的颜色空间转换
彩色图像有多种颜色空间表示,常见的有 RGB、HSV、YCbCr 等。不同的颜色空间适合不同的处理。在 MATLAB 中可以方便地进行图像的颜色空间转换。
```matlab
I_hsv = rgb2hsv(I);  % RGB 转 HSV
I_ycbcr = rgb2ycbcr(I);  % RGB 转 YCbCr
I_gray = rgb2gray(I);  % RGB 转灰度
```
下面以一幅彩色图像为例,将其转换为 HSV 颜色空间,并分别显示 H、S、V 三个通道:
```matlab
I = imread('peppers.png');
hsv = rgb2hsv(I);
h = hsv(:, :, 1);
s = hsv(:, :, 2);
v = hsv(:, :, 3);

figure,
subplot(2,2,1), imshow(I), title('RGB')
subplot(2,2,2), imshow(h), title('Hue')
subplot(2,2,3), imshow(s), title('Saturation')
subplot(2,2,4), imshow(v), title('Value')
```
显示结果如下,可以看到 HSV 三个通道分别表示色调、饱和度和明度信息:
![](https://oss1.aistar.cool/elog-offer-now/d951c70d7159e9b9438a8b2460edbb0c.jpg)
## 7.3 图像的增强与修复
图像增强的目的是为了突出图像的某些特征,或者抑制图像的某些干扰,常用的方法有对比度增强、平滑、锐化等。图像修复则是去除图像中的噪声、污点等。下面介绍几种常用方法。
### 7.3.1 图像的平滑与锐化
图像平滑可以抑制图像噪声,使图像更加平滑,常用的方法有均值滤波和高斯滤波。例如,对图像进行 3*3 的均值滤波:
```matlab
I = imread('circuit.tif');
J = imfilter(I, fspecial('average', 3));
```
其中 `fspecial` 函数生成了一个 3*3 的均值滤波器,`imfilter` 函数用该滤波器对图像进行滤波。
图像锐化可以增强图像边缘,使图像更清晰,常用的方法有拉普拉斯算子和 unsharp 滤波器。例如,用拉普拉斯算子进行锐化:
```matlab
I = imread('moon.tif');
laplacian = [0 1 0; 1 -4 1; 0 1 0];
J = imfilter(I, laplacian);
```
其中定义了拉普拉斯滤波器,用它对图像进行卷积滤波,得到锐化后的图像。

| ![](https://oss1.aistar.cool/elog-offer-now/2d2fa3c6ce73b40eb0dd66e1ddb6f73b.jpg) | ![](https://oss1.aistar.cool/elog-offer-now/64318f9bd209d1b1858a8cba2dcb179e.jpg) |
| --- | --- |
| 原图 | 锐化后 |

### 7.3.2 图像的对比度调整
对比度反映了图像的明暗差异。提高对比度可以使图像更鲜明。常用的方法有灰度拉伸、直方图均衡化等。
灰度拉伸就是将图像灰度范围拉伸到 [0,1],提高对比度:
```matlab
I = imread('pout.tif');
J = imadjust(I, stretchlim(I));
```
其中 `stretchlim` 计算图像的灰度范围,`imadjust` 根据该范围对图像灰度进行拉伸。
直方图均衡化通过重新分布图像的灰度值,使分布更加均匀,从而增强对比度:
```matlab
I = imread('pout.tif');
J = histeq(I);
```
函数 `histeq` 实现了直方图均衡化。

| ![](https://oss1.aistar.cool/elog-offer-now/fd520805c940641f71ee09852765924e.jpg) | ![](https://oss1.aistar.cool/elog-offer-now/b8f2bb6480c1f2db12f7d9ce5c1c5fdf.jpg) |
| --- | --- |
| 原图 | 均衡化后 |

### 7.3.3 图像的修复与去噪
图像修复主要用于去除图像中的污点、划痕等。以去除椒盐噪声为例,可以用中值滤波:
```matlab
I = imread('eight.tif');
J = medfilt2(I);
```
其中 `medfilt2` 函数实现了二维中值滤波。

| ![](https://oss1.aistar.cool/elog-offer-now/7c01f3ace5191830c864e34f50482161.jpg) | ![](https://oss1.aistar.cool/elog-offer-now/04062abc0b73bc988a51d6233d6f84b8.jpg) |
| --- | --- |
| 有噪声 | 去噪后 |

## 7.4 图像的分割与特征提取
图像分割将图像分割成若干个区域,每个区域内具有相似的特征。特征提取则是提取图像的一些特征,如边缘、角点、纹理等,为后续的目标检测和识别做准备。
### 7.4.1 图像分割的基本方法
常用的图像分割方法有阈值分割、区域生长、分水岭等。以阈值分割为例:
```matlab
I = imread('coins.png');
bw = imbinarize(I);
```
其中 `imbinarize` 用 Otsu 算法自动确定二值化阈值,并对图像进行二值化,得到分割结果。
分水岭算法可以用于分割粘连的目标:
```matlab
I = imread('coins.png');
bw = imbinarize(I);
D = bwdist(~bw);
L = watershed(D);
```
其中 `bwdist` 计算二值图像的距离变换,将其作为分水岭算法的输入,最终得到分割标签矩阵 `L`。
### 7.4.2 边缘检测
边缘是图像灰度变化剧烈的地方,包含了图像的重要信息。常用的边缘检测算子有 Sobel、Canny 等。例如:
```matlab
I = imread('cameraman.tif');
BW1 = edge(I, 'sobel');
BW2 = edge(I, 'canny');
```
分别用 Sobel 和 Canny 算子提取图像边缘,得到二值化的边缘图。
![](https://oss1.aistar.cool/elog-offer-now/fd565a1b47ac8f1df4f4d7de86c8cbc4.jpg)
### 7.4.3 特征点提取与匹配
特征点是图像中一些特殊的点,如角点、斑点等,它们的位置和邻域信息可用于图像配准、目标跟踪等。常用的特征点检测算法有 Harris、SURF 等。
```matlab
I = imread('cameraman.tif');
corners = detectHarrisFeatures(I);
[features, valid_corners] = extractFeatures(I, corners);
```
上述代码用 Harris 算法检测图像的角点,并提取角点的特征描述子,可用于后续的特征匹配。
为了匹配两幅图像中的特征点,可以用特征描述子进行相似性度量。例如,用 `matchFeatures` 函数进行基于欧氏距离的特征匹配:
```matlab
I1 = imread('cameraman1.tif');
I2 = imread('cameraman2.tif');

corners1 = detectHarrisFeatures(I1);
corners2 = detectHarrisFeatures(I2);

[f1, valid_corners1] = extractFeatures(I1, corners1);
[f2, valid_corners2] = extractFeatures(I2, corners2);

indexPairs = matchFeatures(f1, f2);

matched_corners1 = valid_corners1(indexPairs(:,1),:);
matched_corners2 = valid_corners2(indexPairs(:,2),:);

figure, showMatchedFeatures(I1, I2, matched_corners1, matched_corners2);
```
![](https://oss1.aistar.cool/elog-offer-now/e8f210f0ed8ffbc70357e33d61924124.jpg)
上述代码首先分别在两幅图像中检测 Harris 角点,并提取角点特征。然后用 `matchFeatures` 匹配两幅图中的特征,最后用 `showMatchedFeatures` 显示匹配结果。
互动与进阶学习
 尝试用本章学到的知识完成以下小练习: 1. 读入一幅彩色图像,将其转为灰度图,并分别画出转换前后的图像直方图,比较两者的区别。 2. 用高斯滤波器对一幅图像进行平滑,并调节高斯滤波器的标准差,观察其对平滑效果的影响。 3. 对一幅低对比度的图像,分别用灰度拉伸和直方图均衡化进行增强,比较两种方法的增强效果。 4. 用 Canny 算子对图像进行边缘检测,并调节其阈值参数,观察阈值对检测结果的影响。尝试用不同的边缘检测算子,比较它们的检测效果。 如果你对图像处理感兴趣,这里有一些拓展学习资源推荐: - 《数字图像处理》(冈萨雷斯)：经典的图像处理入门教材,系统全面。 - 《MATLAB 图像处理》：专门介绍用 MATLAB 进行图像处理,有较多示例代码。 - MATLAB 官方图像处理工具箱文档：查阅图像处理函数的用法。 - 各种图像处理竞赛,如 kaggle 上的图像分类、分割比赛,可以学习他人的优秀代码。 
本章我们学习了 MATLAB 图像处理的基础知识,包括图像的读取显示、基本操作、增强修复、分割与特征提取等。MATLAB 图像处理函数强大而丰富,熟练掌握它们可以让我们轻松处理各种图像问题。在后续章节中,我们将继续学习更高级的图像处理技术,如图像配准、目标检测与识别等。
