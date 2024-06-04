---
title: 3.开发环境与内核架构
urlname: rgbxy15tudl9mcvw
date: '2024-05-24 13:03:01'
updated: '2024-05-24 13:03:02'
cover: 'https://cdn.nlark.com/yuque/0/2021/png/22382235/1628769614112-3d6ae298-2e61-400c-a2ac-1ce9d2ee9604.png'
description: 之前介绍了简单的Hello OS以及代码是如何运行的。接下来我们会真正动手开始往我们的Hello OS中增加功能，但是——操作系统架构是一个极其精细的活。如老话所言“凡事三思而后行”，虽说是手写操作系统，但也得先想清楚内核的细节、一步一步的来构建操作系统不是？这一次，我们先跟着彭老师的课程在M...
---
之前介绍了简单的Hello OS以及代码是如何运行的。接下来我们会真正动手开始往我们的Hello OS中增加功能，但是——**操作系统架构是一个极其精细的活**。如老话所言“凡事三思而后行”，虽说是手写操作系统，但也得先想清楚内核的细节、一步一步的来构建操作系统不是？
这一次，我们先跟着[彭老师的课程](https://time.geekbang.org/column/article/372609)**在Mac环境或Windows环境下进行内核开发环境的构建**，并启动我们所配置的操作系统。而后再来看看操作系统的内核设计，最后建立以后进行内核开发的环境。
# 环境建立
工欲善其事必先利其器，就跟开发其他应用一样，**首先，我们需要一个内核开发环境**！
为了方便开发和测试，我们选择VirtualBox（VMware其实也可以，不过有一些步骤你得自己摸索一下，因此建议使用VirtualBox）来进行操作系统内核的开发。
笔者的开发环境是是Mac Pro与VirtualBox6.1.22。
注：**Windows环境下也可以按照之后的教程进行环境的配置和开发，笔者在两个环境下都进行了相关的测试**。
注：**如果电脑本身就是Linux（Ubuntu）环境**，那么可以参考[原版教程](https://time.geekbang.org/column/article/379291)进行相关的环境安装。
## 准备工作
VirtualBox的安装可以参考：
[https://blog.csdn.net/u011046452/article/details/115054449](https://blog.csdn.net/u011046452/article/details/115054449)
Ubuntu16.04镜像的下载：
[https://www.jianshu.com/p/123489c8b991](https://www.jianshu.com/p/123489c8b991)
VirtualBox安装Ubuntu可以参考：
[https://www.huaweicloud.com/articles/28f9f8529b6e0317167c56f25d825fee.html](https://www.huaweicloud.com/articles/28f9f8529b6e0317167c56f25d825fee.html)
### 新建虚拟机Ubuntu
本次环境配置一共需要建立两个虚拟机，一个虚拟机是用作开发的Linux（ubuntu）环境的虚拟机Ubuntu；另一个是用作加载**我们内核观察结果的虚拟机COMOS**；
**第一个虚拟机 Ubuntu**——建立一个Linux-Ubuntu16.04的虚拟机，取名为Ubuntu：
![image.png](https://oss1.aistar.cool/elog-offer-now/0765d132d51f6afc63ca4e211620198c.png)
建议内存分配4g，CPU分配4核（根据自身电脑性能而定）：
![image.png](https://oss1.aistar.cool/elog-offer-now/1e96dbb6d399bfb954b6edb9fff8ae11.png)
下一步根据向导创建虚拟硬盘，我分配了10G，且为动态分配，直接点击运行无法启动虚拟机，需要在配置中加载**已经下载好的Ubuntu镜像（.iso后缀），而后才能运行：**
![image.png](https://oss1.aistar.cool/elog-offer-now/8086fb57f010b78a9da2c8cfdf5e774c.png)
启动虚拟机之后，提示安装Ubuntu，根据提示完成安装需要十分钟左右的时间：
![image.png](https://oss1.aistar.cool/elog-offer-now/c8cbcb228f2fc41edbcb94fb28459a4e.png)
安装完毕之后，关闭该虚拟机。
### 新建虚拟硬盘
点击**虚拟机Ubuntu设**置的存储，**添加虚拟 硬盘**：
![image.png](https://oss1.aistar.cool/elog-offer-now/1bda7e78a8174a293b11a4c1dbd60073.png)
根据提示一步一步走就好，注意**创建硬盘的格式应该为VDI，且为固定大小，**由于我们的内核比较小，因此分配100M的大小就好了：
![image.png](https://oss1.aistar.cool/elog-offer-now/2c90a03dd6d600f0ff72539de65d6d20.png)
### 新建虚拟机COSMOS
接下来需要建立另外一个虚拟机了——COSMOS！
这个虚拟机以后将会运行我们所编写的内核，意义重大。
![image.png](https://oss1.aistar.cool/elog-offer-now/28d29d59df71810250a8c33b8942be49.png)
注意，这个虚拟机现在只需要按照默认配置往下走就好，不需要自己配置参数，不过在添加硬盘时，**注意添加已有硬盘hd.vid，也就是在上一步我们建立的那个硬盘**。
![image.png](https://oss1.aistar.cool/elog-offer-now/425b26623390dc5d9fba4b6b98fa9d6f.png)
OK，COSMOS就创建完毕了，不过现在新硬盘hd.vdi里面什么都没有，COSMOS即便启动了也会报错说找不到的系统内核。
## 安装GRUB
也许大家已经注意到了：**虚拟硬盘hd.vdi既跟Ubuntu虚拟机关联又跟COSMOS虚拟机关联。**
这是为什么呢？
**——因为我们将使用Ubuntu虚拟机在hd.vdi上面进行内核的编写，而后在COSMOS虚拟机上加载hd.vdi上的内核进行测试！**
接下来，我们需要在**hd.vdi这块硬盘上进行相关配置并安装GRUB引导**，使它以后能够加载我们所写的系统。
先打开虚拟机Ubuntu，输入lsblk命令查看当前的块设备：
![image.png](https://oss1.aistar.cool/elog-offer-now/2ce4a25277d4bc04435fb7af8b869d5e.png)
可以看到一共有两块硬盘：**sda、sdb**，其中sda是Ubuntu系统的专用硬盘，sdb就是我们的目标硬盘hd.vdi。
首先，依次输入以下命令：
```bash
//sdb设备只是一块新的硬盘，上面需要建立文件系统才能够使用 
//mkfs.ext4即是在sdb上建立ext4文件系统 
sudo mkfs.ext4 /dev/sdb 
//进入~目录建立hdisk文件夹作为sdb的挂载目录 
cd ~ mkdir hdisk 
//将/dev/sdb挂载在hdisk目录下，这样我们就能通过访问hdisk目录访问sdb硬盘 
mount /dev/sdb ./hdisk
```
**再次输入lsblk命令，可以看到sdb设备已经被加载到了hdisk目录下（可以认为访问hdisk就是访问sdb硬盘）：**
![image.png](https://oss1.aistar.cool/elog-offer-now/5aea8f197bd3486dcc230fda83a314cc.png)
而后创建boot目录，作为内核的加载目录：
```bash
sudo mkdir ./hdisk/boot
//将grub安装到boot中（grub可以看做是bootloader，是用来加载操作系统的）
//这需要借助grub-install工具：
sudo grub-install --boot-directory=./hdisk/boot/ --force --allow-floppy /dev/sdb
```
若无误则表明grub安装完毕，进入boot目录可以看到多出了grub文件夹。
现在还需做一件事情，那就是配置grub的启动项，在boot目录下新建一个grub.cfg，其中的内容如下：
//设置HelloOS是启动系统的第一个选项 menuentry 'COSMOS' { #加载part_msdos、ext2模块 #这是grub的语法 insmod part_msdos insmod ext2 set root='hd0' #只有一个硬盘，因此设置根目录为hd0(就是hd.vdi) multiboot2 /boot/COSMOSOS.eki #加载boot目录下的.eki内核文件 boot #加载启动内核文件 } #设置过时样式为目录 set timeout_style=menu #设置过时时间 if [ "${timeout}" = 0 ]; then   set timeout=10 #等待10秒钟自动启动 fi
注：**上述grub.cfg文件内容暂时不懂没关系，语法的学习可以参考：**[GRUB2语法学习](http://www.jinbuguo.com/linux/grub.cfg.html)**，并且在下一节课会对GRUB、Boot、efi等概念做一个总结，到时候一切都明白了**。
保存后关闭虚拟机Ubuntu，启动虚拟机COSMOS。
注：两个虚拟机不能同时开启，因为两者都挂载了hd.vdi，两个同时开启会出现文件冲突。
## **启动COSMOS**
启动COSMOS之后可以看到下面的结果：
![image.png](https://oss1.aistar.cool/elog-offer-now/459547024dcd48ae95b28341227aa23b.png)
选中COSMOS并回车，提示找不到eki文件：
![image.png](https://oss1.aistar.cool/elog-offer-now/c41b9e32bb912882934c1cf2ca674830.png)
之所以找不到eki文件，**是因为我们暂时还没有往hd.vdi硬盘中放入内核文件**，而这就是我们以后要做的工作——**将内核编译为eki文件放入grub文件夹下**，而后利用虚拟机COSMOS进行测试！
# 内核架构
## 管理资源
内核架构，即是我们所说的操作系统架构。
内核——也就是操作系统——**其实就是在应用程序与计算机硬件、软件之间的一个桥梁，它负责负责管理计算机资源。**其实在手写操作系统(2)中已经提到过了，**计算机资源分为硬件资源和软件资源**。
**硬件资源是指计算机物理存在的介质**，包括CPU、内存、硬盘、数据总线等，如下图所示：
![image.png](https://oss1.aistar.cool/elog-offer-now/272159f577bf1cb7742ebb620b876c77.png)
**软件资源即是计算机中的各种数据**，如文件、应用程序等等。
内核就是上述硬件、软件资源的管理者，其内部逻辑大致有：

- **管理CPU**：CPU是用来执行程序的，可以简单理解为管理进程/线程；
- **管理内存**：负责分配、释放内存；
- **管理硬盘**：主要是指管理硬盘的文件系统；
- **管理各种IO设备**：包括但不限于显卡、网卡、U盘、键盘等等。

由于各种硬件的性能不同，种类不同，**内核想使用这些硬件就需要一个帮助程序，那就是我们常听到的驱动程序**。有的时候游戏画面出了问题，很有可能就是因为驱动程序版本不对。
那么现在的问题就是：**如何让内核来组织并管理这些资源呢？应该采用一个怎样的形式？**
关于这一点，几十年来的前辈们已经帮我们思考了很多种架构了，比如**宏内核、微内核以及混合内核**。
## **宏内核**
宏，即所谓的大。
宏内核架构就是将上述所提到的**所有的资源组件的相关代码编译链接在一起，形成一个更大的执行程序，值得注意的是，这个更大的执行程序是运行在处理器特权级别**（手写操作系统5会讲）。其结构图如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/c624d86cdc2dd0deaded8853244f2b5c.png)
注意，**内核层之下的各个接口、安全组件等不是层级结构**，**严格来说是并行的**，上图只是为了方便阅读。
**举个例子，若宏内核需要为某个应用分配内存**：

- 应用程序**调用内存分配的API**，如C的malloc；
- **CPU在特权级别运行内核代码**；
- **内核代码中的内存管理组件分配一块内存**；
- 将上述分配的内存首地址返回给API；
- 应用程序获得API返回的内存地址；

宏内核可以说是一种**简单的混杂思想**，即将所有东西直接组装在一起，简单粗暴。
优点很明显，**那就是内核包括所有组件，可以互相调用，性能很好**。缺点也很明显，**多个执行库链接在一起，没有模块化，扩展性不强，如果其中某个组件新增功能，整个系统需要重新编译，若一个组件出错，则系统崩溃**。**Linux就是采用的宏内核架构，所以它的性能很好**。
## **微内核**
微内核的设计与宏内核就有点不一样了：**宏内核巴不得内核具有所有的功能，恨不得囊括寰宇**。
而微内核则**尽可能减少内核的规模，只给它一些基本且必须的功能**，如进程调度、进程通信中断、内存空间映射等等。
由于此时微内核的功能较少，为了配合内核的工作，**将各种进程管理、内存管理、设备管理等功能设计为一个一个的服务进程**。内核需要实现某种功能时，则交给对应的服务进程来处理。它与这些服务进程之间的通信是通过**消息来传输的**。其结构如下：
![image.png](https://oss1.aistar.cool/elog-offer-now/3a598c88936c5684eb90c93613321788.png)
**同样以是给进程分配内存为例**，在微内核架构中流程如下：

- 进程调用微内核的API（申请内存的）；
- 内核切换到特权级别，运行内核代码；
- **内核将相关信息以消息机制发送给管理内存的服务进程，由它来处理**；
- **内存管理服务进程收到消息之后，分配内存**；
- 将内存信息以消息机制发送给内核；
- 内核将内存信息发送给进程。

从上述过程可以看出来，**宏内核就是古代中央集权的典范**。而微内核架构下**，内核的功能就像是一个中转站，**它负责将进程需要的服务传递给对应的服务进程，是一种**分而治之**的思想。这种结构的方式缺点很明显，**相比于宏内核多了很多步骤，性能不好。**优点也很明显， 当需要增加一个新功能，增加一个服务进程即可。
## **COSMOS**
了解了宏内核与微内核的相关的知识，现在轮到我们开始选择了——我们的操作系统内核应该采用什么架构？
综合考虑之下，我们不想单独选择两者中的某一种，而打算结合它们的优点，设计一种混合架构：
![image.png](https://oss1.aistar.cool/elog-offer-now/69ae206ecd3e66de8156a31c029e97fb.png)
将我们的操作系统**命名为COMOS**，之所以这么取名，意指包罗宇宙，囊括万物之意。
从上图可以看出，COMOS的**内核架构大致分为三层**：

1. **内核接口层**

定义了一套Unix接口的子集（学习和研究方便），这些接口代码主要是检查参数合法性，而后调用更下层的函数进行处理。

2. **内核功能层**

内核功能层是内核接口层的具体实现，根据功能的不同大致分为进程管理、内存管理、中断管理、设备管理。

3. **内核硬件层**

这一层其实主要是与电脑硬件有关的设置，主要是完成初始、中断设置等等。
上述这种内核架构，即有了微内核的简洁和高扩展性，又有宏内核加载驱动程序进入内核的高度耦合性，充分发挥设备的性能，因此才被称为混合结构。具有**高内聚，低耦合的特点。**
其实，Windows NT就是采用的混合架构，难怪会成为有史以来最成功的商业操作系统。
# Linux、Windows、MacOS
**Linux内核的结构如下：**
![image.png](https://oss1.aistar.cool/elog-offer-now/a4376e5f5826f2f11ead94e715a3c38f.png)
可以看出，Linux采用宏内核，各个模块之间互相调用。性能强劲，但是一旦出现错误会很难排查。不过由于Linux是开源的，可以进行个性化的定制和优化，也是其独特的一点。稍微总结一下，**Linux大致分为五大重要组件，且每个组件从上到贯穿各个层次**：
![image.png](https://oss1.aistar.cool/elog-offer-now/510ec3825e7c6837385f4345d82e6ee3.png)
**Windows内核NT的内部结构如下，采用的是混合内核架构（图形驱动程序还在内核中，因此图像性能强劲）：**
![image.png](https://oss1.aistar.cool/elog-offer-now/80ac15ddb7b2223b4f0e90ad9b5f48fa.png)
**苹果Darwin结构如下**，采用双层内核架构，主要是为了兼容之前的系统内核：
![image.png](https://oss1.aistar.cool/elog-offer-now/2184ca0bc976c2ecffc6bf7d7c1a02a5.png)
Linux 性能良好，**结构异常复杂，不利于问题的排查和功能的扩展，**而 Darwin-XNU 和 Windows 结构良好，层面分明，**利于功能扩展，不容易产生问题且性能稳定**。 
PS：宏内核和微内核要好好区分。 宏内核是内核的功能很多，所以性能好，但是不方便更改；微内核是性能稳定，便于寻找问题和优化。
# 参考资料
[10 设置工作模式和环境](https://time.geekbang.org/column/article/379291)（课程及neohope的留言）
[Ubuntu下Grub配置详解](https://blog.csdn.net/gatieme/article/details/52722955)
