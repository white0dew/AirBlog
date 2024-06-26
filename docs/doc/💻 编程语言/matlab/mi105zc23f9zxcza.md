---
title: 第 6 章：信号处理
urlname: mi105zc23f9zxcza
date: '2024-06-25 22:29:50'
updated: '2024-06-25 22:30:18'
description: 'keywords: 信号处理, 滤波器设计, 傅里叶变换, 小波变换信号处理是 MATLAB 的一个重要应用领域。在本章中，我们将深入探讨如何使用 MATLAB 进行信号的表示、操作、滤波、变换等处理。通过学习本章内容，你将掌握信号处理的基本概念和方法，并能够运用 MATLAB 解决实际的信号...'
keywords: '信号处理, 滤波器设计, 傅里叶变换, 小波变换'
---
信号处理是 MATLAB 的一个重要应用领域。在本章中，我们将深入探讨如何使用 MATLAB 进行信号的表示、操作、滤波、变换等处理。通过学习本章内容，你将掌握信号处理的基本概念和方法，并能够运用 MATLAB 解决实际的信号处理问题。
## 6.1 信号的表示与操作
### 6.1.1 信号的基本概念
信号是随时间或空间变化的物理量，可以用数学函数或数字序列来表示。在 MATLAB 中，我们通常使用向量或矩阵来表示离散时间信号，连续时间信号则可以通过采样得到离散表示。
下面是一个简单的正弦信号的例子：
```matlab
t = 0:0.01:1;  % 时间向量
f = 10;        % 信号频率
A = 1;         % 信号幅值
x = A*sin(2*pi*f*t);  % 正弦信号

plot(t, x);
xlabel('Time (s)');
ylabel('Amplitude');
title('Sinusoidal Signal');
```
运行上述代码，你将看到一个正弦信号的图形：
![](https://oss1.aistar.cool/elog-offer-now/3bd23c2e8e6cdd7a4613cc322e502df3.png)
### 6.1.2 信号的采样与重建
连续时间信号需要通过采样转换为离散时间信号，才能在计算机中进行处理。采样过程中需要注意采样定理，即采样频率应至少为信号最高频率的两倍，以避免混叠现象的发生。
下面的代码演示了信号的采样和重建过程：
```matlab
t = 0:0.001:1;     % 原始信号时间向量
f = 10;            % 信号频率
x = sin(2*pi*f*t); % 原始信号

fs = 50;           % 采样频率
ts = 0:1/fs:1;     % 采样时间向量
xs = sin(2*pi*f*ts); % 采样信号

tr = 0:0.001:1;    % 重建时间向量
xr = interp1(ts, xs, tr); % 信号重建

subplot(3,1,1);
plot(t, x);
title('Original Signal');

subplot(3,1,2);
stem(ts, xs);
title('Sampled Signal');

subplot(3,1,3);
plot(tr, xr);
title('Reconstructed Signal');
```
运行上述代码，你将看到原始信号、采样信号和重建信号的图形：
![](https://oss1.aistar.cool/elog-offer-now/3a7953f22b33b013c89b46e544c21e08.png)
### 6.1.3 信号的基本操作
MATLAB 提供了一系列函数用于对信号进行基本操作，如加减、乘除、移位、翻转等。下面是一些常用的信号操作函数：

- `+`、`-`、`*`、`/`：信号的加减乘除运算
- `circshift()`：循环移位
- `flip()`：翻转信号
- `conv()`：信号卷积

下面的代码演示了信号的移位和卷积操作：
```matlab
x = [1, 2, 3, 4, 5];  % 原始信号
y = circshift(x, 2);  % 循环右移 2 个位置
z = conv(x, y);       % 信号卷积

subplot(3,1,1);
stem(x);
title('Original Signal');

subplot(3,1,2);
stem(y);
title('Shifted Signal');

subplot(3,1,3);
stem(z);
title('Convolved Signal');
```
运行上述代码，你将看到原始信号、移位信号和卷积结果的图形：
![](https://oss1.aistar.cool/elog-offer-now/d78ec0bd3bb4d7f2ecd1f2495a8623cc.png)
## 6.2 滤波器设计
### 6.2.1 滤波器的基本类型
滤波器是信号处理中常用的工具，用于从信号中提取所需的频率成分，或去除干扰和噪声。常见的滤波器类型包括：

- 低通滤波器：允许低频信号通过，衰减高频信号
- 高通滤波器：允许高频信号通过，衰减低频信号
- 带通滤波器：允许特定频带的信号通过，衰减其他频率的信号
- 带阻滤波器：衰减特定频带的信号，允许其他频率的信号通过

在 MATLAB 中，我们可以使用 `fdesign` 工具箱来设计各种类型的滤波器。
### 6.2.2 FIR 滤波器设计
FIR（Finite Impulse Response）滤波器是一种常用的数字滤波器，其输出只依赖于输入信号，因此具有线性相位特性。我们可以使用 `fir1()` 函数来设计 FIR 滤波器。
下面的代码演示了如何设计一个 50 阶的低通 FIR 滤波器：
```matlab
n = 50;        % 滤波器阶数
fc = 0.2;      % 截止频率
b = fir1(n, fc); % 设计 FIR 滤波器

[h, w] = freqz(b, 1); % 计算频率响应

subplot(2,1,1);
plot(w/pi, 20*log10(abs(h)));
title('Magnitude Response');
xlabel('Normalized Frequency');
ylabel('Magnitude (dB)');

subplot(2,1,2);
plot(w/pi, unwrap(angle(h)));
title('Phase Response');
xlabel('Normalized Frequency');
ylabel('Phase (rad)');
```
运行上述代码，你将看到设计的 FIR 滤波器的幅频响应和相频响应：
![](https://oss1.aistar.cool/elog-offer-now/0099427b9bd20a468873a86a8b067a1d.png)
### 6.2.3 IIR 滤波器设计
IIR（Infinite Impulse Response）滤波器是另一种常用的数字滤波器，其输出不仅依赖于输入信号，还依赖于过去的输出值。与 FIR 滤波器相比，IIR 滤波器可以用更低的阶数实现相同的滤波性能。
在 MATLAB 中，我们可以使用 `butter()`、`cheby1()`、`cheby2()`、`ellip()` 等函数来设计 IIR 滤波器。下面的代码演示了如何设计一个 5 阶的巴特沃斯低通 IIR 滤波器：
```matlab
n = 5;         % 滤波器阶数
fc = 0.2;      % 截止频率
[b, a] = butter(n, fc); % 设计巴特沃斯 IIR 滤波器

[h, w] = freqz(b, a); % 计算频率响应

subplot(2,1,1);
plot(w/pi, 20*log10(abs(h)));
title('Magnitude Response');
xlabel('Normalized Frequency');
ylabel('Magnitude (dB)');

subplot(2,1,2);
plot(w/pi, unwrap(angle(h)));
title('Phase Response');
xlabel('Normalized Frequency');
ylabel('Phase (rad)');
```
运行上述代码，你将看到设计的巴特沃斯 IIR 滤波器的幅频响应和相频响应：
![](https://oss1.aistar.cool/elog-offer-now/26ea6e5ef4be1732844b7096c2fb7243.png)
## 6.3 傅里叶变换
### 6.3.1 傅里叶变换的基本原理
傅里叶变换是信号处理中的重要工具，它将时域信号转换为频域信号，揭示了信号的频率成分。对于连续时间信号，我们使用连续时间傅里叶变换（CTFT）；对于离散时间信号，我们使用离散时间傅里叶变换（DTFT）。
在 MATLAB 中，我们可以使用 `fft()` 函数计算离散傅里叶变换（DFT），使用 `ifft()` 函数计算逆离散傅里叶变换（IDFT）。
### 6.3.2 离散傅里叶变换（DFT）
下面的代码演示了如何使用 MATLAB 计算信号的 DFT：
```matlab
fs = 1000;     % 采样频率
t = 0:1/fs:1;  % 时间向量
f1 = 50;       % 第一个正弦信号频率
f2 = 120;      % 第二个正弦信号频率
x = sin(2*pi*f1*t) + 0.5*sin(2*pi*f2*t); % 原始信号

N = length(x); % 信号长度
X = fft(x);    % 计算 DFT
f = (0:N-1)*(fs/N); % 频率向量

subplot(2,1,1);
plot(t, x);
title('Original Signal');
xlabel('Time (s)');
ylabel('Amplitude');

subplot(2,1,2);
plot(f, abs(X));
title('Frequency Spectrum');
xlabel('Frequency (Hz)');
ylabel('Magnitude');
```
运行上述代码，你将看到原始信号和它的频谱图：
![](https://oss1.aistar.cool/elog-offer-now/bd0396ba8608eb3341cf81a4a7bd538b.png)
### 6.3.3 快速傅里叶变换（FFT）
快速傅里叶变换（FFT）是一种高效计算 DFT 的算法，它利用了 DFT 的对称性和周期性，大大减少了计算量。在 MATLAB 中，`fft()` 函数实际上就是使用 FFT 算法计算 DFT。
下面的代码演示了如何使用 FFT 对信号进行频谱分析：
```matlab
fs = 1000;     % 采样频率
t = 0:1/fs:1;  % 时间向量
f1 = 50;       % 第一个正弦信号频率
f2 = 120;      % 第二个正弦信号频率
x = sin(2*pi*f1*t) + 0.5*sin(2*pi*f2*t); % 原始信号

N = length(x);   % 信号长度
X = fft(x, N);   % 计算 N 点 FFT
f = (0:N-1)*(fs/N); % 频率向量

subplot(2,1,1);
plot(t, x);
title('Original Signal');
xlabel('Time (s)');
ylabel('Amplitude');

subplot(2,1,2);
plot(f, abs(X));
title('Frequency Spectrum (FFT)');
xlabel('Frequency (Hz)');
ylabel('Magnitude');
```
运行上述代码，你将看到使用 FFT 得到的信号频谱图：
![](https://oss1.aistar.cool/elog-offer-now/c8c34ca06227975dd6a01cdc3ae78bc2.png)
## 6.4 小波变换
### 6.4.1 小波变换的基本原理
小波变换是另一种重要的信号处理工具，它通过缩放和平移一个母小波函数，得到一组基函数，然后用这些基函数来表示信号。与傅里叶变换相比，小波变换能够同时提供信号的时间和频率信息，因此特别适合分析非平稳信号。
在 MATLAB 中，我们可以使用 Wavelet Toolbox 进行小波变换分析。
### 6.4.2 连续小波变换（CWT）
连续小波变换（CWT）将信号与一组连续的小波基函数进行内积运算，得到信号在不同尺度和位置上的小波系数。下面的代码演示了如何使用 MATLAB 计算信号的 CWT：
```matlab
fs = 1000;     % 采样频率
t = 0:1/fs:1;  % 时间向量
f1 = 30;       % 第一个正弦信号频率
f2 = 60;       % 第二个正弦信号频率
x = sin(2*pi*f1*t) + sin(2*pi*f2*t); % 原始信号

wavename = 'cmor3-3'; % 选择小波函数
scales = 1:100;       % 尺度向量
coefs = cwt(x, scales, wavename); % 计算 CWT 系数

subplot(2,1,1);
plot(t, x);
title('Original Signal');
xlabel('Time (s)');
ylabel('Amplitude');

subplot(2,1,2);
imagesc(t, scales, abs(coefs));
title('Continuous Wavelet Transform');
xlabel('Time (s)');
ylabel('Scales');
```
运行上述代码，你将看到原始信号和它的 CWT 结果：
![](https://oss1.aistar.cool/elog-offer-now/507eed6c94b4b9a24fa98e14ebbebdb4.png)
### 6.4.3 离散小波变换（DWT）
离散小波变换（DWT）通过对信号进行多尺度分解，得到一组离散的小波系数。DWT 常用于信号压缩、去噪和特征提取等领域。下面的代码演示了如何使用 MATLAB 计算信号的 DWT：
```matlab
fs = 1000;     % 采样频率
t = 0:1/fs:1;  % 时间向量
f1 = 30;       % 第一个正弦信号频率
f2 = 60;       % 第二个正弦信号频率
x = sin(2*pi*f1*t) + sin(2*pi*f2*t); % 原始信号

wavename = 'db4'; % 选择小波函数
level = 4;        % 分解层数
[c, l] = wavedec(x, level, wavename); % 计算 DWT 系数

a4 = wrcoef('a', c, l, wavename, 4); % 第 4 层近似系数
d4 = wrcoef('d', c, l, wavename, 4); % 第 4 层细节系数
d3 = wrcoef('d', c, l, wavename, 3); % 第 3 层细节系数
d2 = wrcoef('d', c, l, wavename, 2); % 第 2 层细节系数
d1 = wrcoef('d', c, l, wavename, 1); % 第 1 层细节系数

subplot(6,1,1);
plot(t, x);
title('Original Signal');
xlabel('Time (s)');
ylabel('Amplitude');

subplot(6,1,2);
plot(t, a4);
title('Approximation Coefficients (Level 4)');
xlabel('Time (s)');
ylabel('Amplitude');

subplot(6,1,3);
plot(t, d4);
title('Detail Coefficients (Level 4)');
xlabel('Time (s)');
ylabel('Amplitude');

subplot(6,1,4);
plot(t, d3);
title('Detail Coefficients (Level 3)');
xlabel('Time (s)');
ylabel('Amplitude');

subplot(6,1,5);
plot(t, d2);
title('Detail Coefficients (Level 2)');
xlabel('Time (s)');
ylabel('Amplitude');

subplot(6,1,6);
plot(t, d1);
title('Detail Coefficients (Level 1)');
xlabel('Time (s)');
ylabel('Amplitude');
```
运行上述代码，你将看到原始信号和它的 DWT 分解结果：
![](https://oss1.aistar.cool/elog-offer-now/5a321fee447287b7d08db22d9200a01d.png)
使用 DWT，我们可以将信号分解为不同尺度的近似系数和细节系数，这为进一步的信号分析和处理提供了便利。
## 本章小结
在本章中，我们深入探讨了 MATLAB 在信号处理领域的应用。我们学习了如何表示和操作信号，如何设计 FIR 和 IIR 滤波器，以及如何使用傅里叶变换和小波变换分析信号的频率特性。通过本章的学习，你应该掌握了以下内容：

- 信号的采样、量化和编码
- 信号的时域和频域表示
- FIR 和 IIR 滤波器的设计方法
- 傅里叶变换的基本原理和应用
- 小波变换的基本原理和应用

信号处理是一个广泛而深入的领域，还有许多有趣的话题值得探索，如自适应滤波、信号检测、时频分析等。希望本章的内容能够激发你进一步学习的兴趣，掌握更多的信号处理知识和技能。
在下一章中，我们将讨论 MATLAB 在图像处理领域的应用，敬请期待！
