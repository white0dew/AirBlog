---
title: 1、Java的安装与配置
urlname: ewu8fhrp6gm1yvpa
date: '2024-05-24 09:44:39'
updated: '2024-05-24 09:45:14'
description: 1.1 选择并下载JDKJava开发工具包（JDK）是我们编写、编译和运行Java程序的必备工具。您可以从Oracle官网或OpenJDK下载最新版本的JDK。安装步骤： 下载JDK：访问Oracle官网或OpenJDK网站，选择适合您操作系统的JDK版本进行下载。  安装JDK：双击下载的安...
---
### 1.1 选择并下载JDK

Java开发工具包（JDK）是我们编写、编译和运行Java程序的必备工具。您可以从[Oracle官网](https://www.oracle.com/java/technologies/javase-downloads.html)或[OpenJDK](https://openjdk.java.net/)下载最新版本的JDK。

#### 安装步骤：

1.  **下载JDK：**
访问Oracle官网或OpenJDK网站，选择适合您操作系统的JDK版本进行下载。 
2.  **安装JDK：**
双击下载的安装包，按照提示进行安装。建议安装在默认路径。 
3.  **配置环境变量：**
安装完毕后，需要配置环境变量，以便在命令行中能够直接使用`java`和`javac`命令。 
   -  **Windows：** 
      1. 右键点击“此电脑”或“我的电脑”，选择“属性”。
      2. 选择“高级系统设置”，点击“环境变量”。
      3. 在“系统变量”中，找到名为`Path`的变量，点击“编辑”。
      4. 在变量值末尾添加JDK的`bin`目录路径，例如：`C:\Program Files\Java\jdk-15.0.1\bin`。
      5. 新建一个名为`JAVA_HOME`的变量，值为JDK的安装路径，例如：`C:\Program Files\Java\jdk-15.0.1`。
   -  **Mac/Linux：**
打开终端，编辑`~/.bash_profile`或`~/.zshrc`文件，添加以下内容： 
```shell
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-15.0.1.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
```

保存文件并运行`source ~/.bash_profile`或`source ~/.zshrc`使配置生效。 

4.  **验证安装：**
打开命令行或终端，输入以下命令确认安装成功： 
```shell
java -version
javac -version
```

您应该看到类似如下的输出： 
```shell
java version "15.0.1" 2020-10-20
Java(TM) SE Runtime Environment (build 15.0.1+9-18)
Java HotSpot(TM) 64-Bit Server VM (build 15.0.1+9-18, mixed mode, sharing)
```
 

### 1.2 第一个Java程序：Hello World!

现在我们已经安装并配置好Java开发环境，接下来我们编写第一个Java程序：Hello World!

#### 编写Hello World程序：

1.  打开您喜欢的文本编辑器或IDE（如Eclipse、IntelliJ IDEA、VS Code）。 
2.  新建一个文件，保存为`HelloWorld.java`。 
3.  输入以下代码： 
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```
 

#### 解释代码：

- `public class HelloWorld`：定义一个名为`HelloWorld`的公共类。
- `public static void main(String[] args)`：这是程序的入口方法，Java程序从这里开始执行。
- `System.out.println("Hello, World!");`：向控制台输出“Hello, World!”。

#### 编译并运行程序：

1.  打开命令行或终端，导航到保存`HelloWorld.java`文件的目录。 
2.  输入以下命令编译Java文件： 
```shell
javac HelloWorld.java
```

该命令会生成一个名为`HelloWorld.class`的字节码文件。 

3.  输入以下命令运行编译后的程序： 
```shell
java HelloWorld
```

您应该看到以下输出： 
```shell
Hello, World!
```
 

恭喜您！您已经成功编写并运行了您的第一个Java程序。
