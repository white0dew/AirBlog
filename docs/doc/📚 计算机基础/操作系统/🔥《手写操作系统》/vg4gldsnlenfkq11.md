---
title: 1. HelloOS
urlname: vg4gldsnlenfkq11
date: '2024-05-24 13:02:41'
updated: '2024-06-13 22:33:24'
cover: 'https://cdn.nlark.com/yuque/0/2021/png/22382235/1628768372937-0c40859b-b4c8-47d3-8020-56d834c8fad9.png'
description: 让我们一起学习，由简单的Hello OS入手，最终码出一个属于自己的操作系统！前言为什么要学写一个操作系统？众所周知，操作系统是所有软件的基础（也是面试的三板斧之一！）。对于后端开发而言，操作系统层面的进程、线程、内存、I/O等相关知识根本逃不掉；对于WEB开发，性能调优更是离不开操作系统；对...
---
**让我们一起学习，由简单的Hello OS入手，最终码出一个属于自己的操作系统！**
# **前言**
**为什么要学写一个操作系统？**
众所周知，**操作系统是所有软件的基础（也是面试的三板斧之一！）。**
对于后端开发而言，**操作系统层面的进程、线程、内存、I/O等相关知识**根本逃不掉；
对于WEB开发，**性能调优更是离不开操作系统**；
对于运维、测试，如果操作系统学的好，那么在出现**问题时定位速度和解决bug的速度**一定会提升；
对于非专业人员来说，**操作系统在日常生活中更是无处不在**，手机、智能手表、电脑、路由器等等都是各种操作系统，了解一些操作系统的知识可以让你快乐（装逼）。
**总之，对于感兴趣的同学而言，操作系统不妨看一看，学一学。**
# Hello OS
## 引导程序
刚开始我们不来那么硬核的知识，而是直接动手写一个最微型的操作系统——Hello OS。等撸完了，**我们再回过头来看看它的细节**！
一般来说机器加电启动后，整个计算机第一个启动的程序就是固化在PC主板上的**BIOS固件，它启动之后**检测系统参数，如内存的大小、日期和时间、磁盘设备以及这些磁盘设备用来**引导的顺序**。BIOS寻找用于装载操作系统的指令。装载操作系统的这个程序就是boot loader。Linux系统默认的boot loader就是GRUB（GRand Unified Bootloader），于是PC上电以后系统启动流程如下：
![](https://oss1.aistar.cool/elog-offer-now/5a446473871a3aeb1acdb38e39f8cd12.png)
接下来我们要做的就是写一个由GRUB引导的“操作系统”——它会在屏幕上显示"Hello OS"。**注：****其实操作系统归根结底也是一个程序，只不过它在开机之后已经运行**，并且权限和功能高的吓人，你可以将它看成是整个计算机应用的**管家角色**。
## 环境准备
下载VMware，并安装Ubuntu16.04镜像，安装链接如下：
[https://blog.csdn.net/stpeace/article/details/78598333](https://blog.csdn.net/stpeace/article/details/78598333)
安装成功之后，打开虚拟机。
![](https://oss1.aistar.cool/elog-offer-now/8bff1af37304dc7c21ae8fc21aceefff.png)
## 下载源代码
在虚拟机（Vmware）中打开terminal，使用git clone下载[源代码](https://gitee.com/lmos/cosmos/tree/master/lesson02)。如果提示git command没找到，输入命令：
sudo apt-get install git
代码结构如下：
![](https://oss1.aistar.cool/elog-offer-now/61234918862f4b01056887d6d3464913.png)
其中，

- entry.asm：是一段汇编代码，**用作GRUB引导调用，关掉中断**，设定CPU工作模式，初始化寄存器及C语言运行环境等；
- hello.lds：进行链接调用，代码简单看看，反正也看不懂：
```
ENTRY(_start)
OUTPUT_ARCH(i386)
OUTPUT_FORMAT(elf32-i386)
SECTIONS
{
    . = 0x200000;
    __begin_start_text = .;
    .start.text : ALIGN(4) { *(.start.text) }
    __end_start_text = .;
    __begin_text = .;
    .text : ALIGN(4) { *(.text) }
    __end_text = .;
    __begin_data = .;
    .data : ALIGN(4) { *(.data) }
    __end_data = .;
    __begin_rodata = .;
    .rodata : ALIGN(4) { *(.rodata) *(.rodata.*) }
    __end_rodata = .;
    __begin_kstrtab = .;
    .kstrtab : ALIGN(4) { *(.kstrtab) }
    __end_kstrtab = .;
    __begin_bss = .;
       .bss : ALIGN(4) { *(.bss) }
    __end_bss = .;
}
```

- install.md:该文件中是GRUB引导的配置内容，需要将这个文件里的内容复制到**GRUB的cfg配置文件中**，才能使电脑开机时可以找到我们的Hello OS；
- main.c:我们Hello OS的主函数，它调用的printf可不是常见的C语言库函数哦，而是我们自己实现的printf！即下面要讲的vgastr.h：

![](https://oss1.aistar.cool/elog-offer-now/944a6152d18b3631012fdbe19fa4c43b.png)

- vgastr.h：控制**计算机屏幕VGABIOS固件程序显示特定字符**，后面详细介绍；
- Makefile：利用make工具来实现编译源代码，主要是将entry.asm、main.c、vgastr.h编译并链接。
## 编译操作系统
### **流程**
Makefile文件中其实已经写出了如何编译我们的操作系统，有兴趣的可以打开看看，篇幅太长就不放了。（**但这其实很重要，最好去看看，并学学make 或者cmake**）
整个编译流程就如图：
![](https://oss1.aistar.cool/elog-offer-now/22d87ceab9bdbe0cb59acbf92e935d58.png)
### **编译**
在当前文件路径下打开terminal，输出指令：
make all
emm.....果然不出所料没有**安装nasm编译器**：
![image.png](https://oss1.aistar.cool/elog-offer-now/a512a36ca942986d502620858e8a366e.png)
输入命令：
sudo apt-get install nasm
安装完毕之后再次运行，报了一个warning，暂时不管：
![image.png](https://oss1.aistar.cool/elog-offer-now/ee97d61537284a6cb7c7327c84c90597.png)
经过编译，我们的文件夹下多了很多的东西，.O属于中间生成的文件，不用理会，重点在于这个HelloOS.bin文件：
这个HelloOS.bin就好像是刻录有WIN10操作系统的硬盘，可是没那么值钱，说不定以后咱们的OS就贵了呢？！
### **安装**
好了，Hello OS都有了，那么怎么安装到我们电脑上？
别急，很简单，慢慢来。
先通过以下命令，**找到boot目录挂载分区**：
df /boot/
我的结果如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/7f73ea9e4584487442671319b5e1a3d9.png)
也就说我的虚拟机中ubuntu16.04的系统GRUB引导是在硬盘的第一分区。
然后**打开文件夹中的install.md，复制粘贴到****/boot/grub/grub.cfg中**，install.md主要是加载我们的Hello OS的启动项：
```
//install.md
menuentry 'HelloOS' {
    insmod part_msdos
    insmod ext2
    set root='hd0,msdos1' #注意boot目录挂载的分区，这是我机器上的情况
    multiboot2 /boot/HelloOS.bin
    boot
}
```
**注意！df /boot的结果在哪个sda？，set root=‘hd0，msdos？’中的？就填什么。**
而后，运行**将我们的****Hello OS.bin 文件复制到 /boot/ 目录下：**
sudo cp HelloOS.bin /boot
**最后重启计算机,等待中。**
### **失败？**
emm....第一次失败了，还是进入了ubuntu。
想起之前安装windows系统盘的经历，猜测是由于GRUB引导界面时间显示太短，百度了一下找到这个博客：
[https://jingyan.baidu.com/article/6dad50755e35d1a123e36ecc.html](https://jingyan.baidu.com/article/6dad50755e35d1a123e36ecc.html)
打开sudo gedit /etc/default/grub，**修改其中的GRUB_CMDLINE_LINUX_DEFAULT为“text”，并加“#”注释掉HIDDEN两行，如下**：
根据博客所说，**需要更新grub配置**：
sudo update-grub
**再次重启**！
![image.png](https://oss1.aistar.cool/elog-offer-now/9e4ae6dbea92c411fcb90f335cd4e9fe.png)
**芜湖！**运行一下看看（选中并enter）
当看到屏幕上显示的Hello OS的时候，恭喜，你的操作系统已经启动了！
以后你需要做的，就是不断的完善和拓展你的操作系统，使它的功能愈发强大！
# **细节补充**
## **显卡与printf**
在源代码的main.c中，我们调用了一个printf：
```
//彭东 @ 2021.01.09
#include "vgastr.h"
void main()
{
  printf("Hello OS!");
  return;
}
```
**printf()函数源码**在源文件vgastr.h中：
```
//彭东 @ 2021.01.09
void _strwrite(char* string)
{
  char* p_strdst = (char*)(0xb8000);//指向显存的开始地址
  while (*string)
  {
    *p_strdst = *string++;
    p_strdst += 2;
  }
  return;
}
void printf(char* fmt, ...)
{
  _strwrite(fmt);
  return;
}
```
可能有点看不懂上述代码是什么意思，这里需要补充一下：我们要在屏幕上显示字符，**就要编程操作显卡**。无论我们 PC 上是什么显卡，它们都支持一种叫 **VESA 的标准**，这种标准下有两种工作模式：**字符模式和图形模式**。显卡们为了兼容这种标准，不得不自己提供一种叫 VGABIOS 的固件程序。
### **字符模式**
图形模式较为复杂，并且我们显式“Hello OS”只需要简单的字符模式即可。在字符模式下显卡把**屏幕分成 24 行，每行 80 个字符**，把这（24*80）个位置映射到以 0xb8000 地址开始的内存中，每两个字节对应一个字符，其中一个字节是字符的 ASCII 码，另一个字节为字符的颜色值。如下图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/c2d6c1c59e6c53191446c1f59c3338bc.png)
**现在回过头来看代码**：rintf 函数直接**调用了 _strwrite 函数**，而 _strwrite 函数正是将字符串里每个字符依次**输入到 0xb8000 地址开始的显存中**，为了跳过字符的颜色信息空间，而 p_strdst 每次加 2。
# **思考题**
在printf 函数定义，其中有个形式参数很奇怪，请你思考下：为什么是“…”形式参数，这个形式参数有什么作用？
答：这其实是C语言可变长参数的应用。对于x86来说，函数参数入栈顺序为从右往左，因此，在知道第一个参数地址之后，我们能够通过地址偏移获取其他参数。
并且在这种方式下，栈顶元素就是printf第一个需要打印的元素，方便显卡打印。[更详细解释](https://cloud.tencent.com/developer/article/1523781)。
# 致谢
由衷感谢彭东老师带来的操作系统精讲，截止2021/05/19，课程更新到了第5讲，诚意满满，收获满满。
但这两天只是大致地看了一遍，而且由于之前学过操作系统，有些不以为意，并没有真正地去领会其内涵，特地写了这一个学习笔记性质的文章，与大家共同学习，一起进步！
[https://time.geekbang.org/column/intro/100078401?tab=catalog](https://time.geekbang.org/column/intro/100078401?tab=catalog)
[https://time.geekbang.org/column/article/369457](https://time.geekbang.org/column/article/369457)
课程大纲如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/c2978dcffd7d2aa81f112db23e86d1ba.png)
