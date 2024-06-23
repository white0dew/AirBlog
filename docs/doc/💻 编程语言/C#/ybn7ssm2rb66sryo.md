---
title: 第 2 章：C#的基本语法
urlname: ybn7ssm2rb66sryo
date: '2024-06-20 19:57:08'
updated: '2024-06-21 16:35:49'
description: 本章将介绍 C#的基本语法，包括变量和数据类型、运算符、条件语句以及循环语句。这些知识是编程的基础，掌握这些内容将使你能够编写简单但功能强大的程序。
keywords: '变量, 数据类型, 运算符, 条件语句, 循环语句'
---
在学习任何编程语言时，理解其基础语法是至关重要的。C#作为一种强类型语言，具有丰富的语法特性。接下来，我们将通过几个主要的部分来详细讲解 C#的基本语法。
## 变量和数据类型
### 什么是变量？
变量是用于存储数据的命名存储位置。在 C#中，每个变量都有一个特定的数据类型，该数据类型决定了变量可以存储的数据的种类和大小。
### 数据类型
C#支持多种数据类型，主要分为以下几类：

- **值类型**：存储实际数据的变量。例如，`int`、`float`、`char`等。
- **引用类型**：存储数据的引用（或地址）。例如，`string`、`object`、`class`等。
```csharp
int age = 25;          // 整型
float height = 5.9f;   // 浮点型
char grade = 'A';      // 字符型
string name = "Alice"; // 字符串类型
```
### 变量声明和初始化
在 C#中，变量的声明和初始化可以在一行中完成：
```csharp
int x = 10; // 声明并初始化一个整型变量
```
当然，也可以先声明，后初始化：
```csharp
int y;   // 仅声明
y = 20;  // 后初始化
```
## 运算符
运算符是对变量和值进行操作的符号。C#中常用的运算符包括：
### 算术运算符

- `+`：加法
- `-`：减法
- `*`：乘法
- `/`：除法
- `%`：取模
```csharp
int a = 10;
int b = 3;
int sum = a + b;       // 13
int difference = a - b; // 7
int product = a * b;    // 30
int quotient = a / b;   // 3
int remainder = a % b;  // 1
```
### 关系运算符

- `==`：等于
- `!=`：不等于
- `>`：大于
- `<`：小于
- `>=`：大于等于
- `<=`：小于等于
```csharp
bool isEqual = (a == b);     // false
bool isNotEqual = (a != b);  // true
bool isGreater = (a > b);    // true
bool isLess = (a < b);       // false
```
### 逻辑运算符

- `&&`：逻辑与
- `||`：逻辑或
- `!`：逻辑非
```csharp
bool isAdult = (age >= 18) && (age < 60);
bool canVote = (age >= 18) || (citizen == true);
bool isNotMinor = !(age < 18);
```
## 条件语句
条件语句用于根据条件的真或假来决定程序的运行路径。常用的条件语句包括`if`、`else`和`switch`。
### if 语句
```csharp
if (age >= 18) {
    Console.WriteLine("You are an adult.");
}
```
### if-else 语句
```csharp
if (age >= 18) {
    Console.WriteLine("You are an adult.");
} else {
    Console.WriteLine("You are a minor.");
}
```
### if-else if-else 语句
```csharp
if (age < 18) {
    Console.WriteLine("You are a minor.");
} else if (age < 60) {
    Console.WriteLine("You are an adult.");
} else {
    Console.WriteLine("You are a senior.");
}
```
### switch 语句
当有多个条件需要判断时，`switch`语句是一个很好的选择。
```csharp
int day = 3;
switch (day) {
    case 1:
        Console.WriteLine("Monday");
        break;
    case 2:
        Console.WriteLine("Tuesday");
        break;
    case 3:
        Console.WriteLine("Wednesday");
        break;
    default:
        Console.WriteLine("Invalid day");
        break;
}
```
## 循环语句
循环语句用于重复执行一段代码。C#中常用的循环语句包括`for`、`while`和`do-while`。
### for 循环
```csharp
for (int i = 0; i < 5; i++) {
    Console.WriteLine("i = " + i);
}
```
### while 循环
```csharp
int i = 0;
while (i < 5) {
    Console.WriteLine("i = " + i);
    i++;
}
```
### do-while 循环
```csharp
int i = 0;
do {
    Console.WriteLine("i = " + i);
    i++;
} while (i < 5);
```
### 循环示意图
```
graph TD
A[开始] --> B{条件}
B -- 真 --> C[执行语句]
C --> B
B -- 假 --> D[结束]
```

通过本章的学习，你应该已经掌握了 C#的基本语法，包括变量和数据类型的声明与使用、各种运算符、条件语句以及循环语句。
这些基础知识将为你编写更复杂的 C#程序打下坚实的基础。在接下来的章节中，我们将继续深入探讨 C#的更高级特性和编程技巧。
