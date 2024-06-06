---
title: 第二章：Python 基础语法
urlname: obdb3gm7ffdg1yho
date: '2024-06-06 21:10:05'
updated: '2024-06-06 21:10:32'
description: 在这一章中，我们将深入学习 Python 的基础语法，包括变量与数据类型、运算符与表达式以及字符串操作。这些是编写 Python 程序最基本的知识点，掌握它们将为你后续的学习打下坚实的基础。1. 变量与数据类型1.1 变量的定义与使用变量是存储数据的容器。你可以将不同类型的数据赋值给变量，并随...
---
在这一章中，我们将深入学习 Python 的基础语法，包括变量与数据类型、运算符与表达式以及字符串操作。这些是编写 Python 程序最基本的知识点，掌握它们将为你后续的学习打下坚实的基础。

## 1. 变量与数据类型

### 1.1 变量的定义与使用

变量是存储数据的容器。你可以将不同类型的数据赋值给变量，并随时更改它们的值。Python 的变量不需要声明类型，可以直接赋值。

```python
# 定义变量并赋值
name = "Alice"
age = 25
is_student = True

print(name)  # 输出：Alice
print(age)   # 输出：25
print(is_student)  # 输出：True
```

### 1.2 常见数据类型

Python 支持多种数据类型，以下是一些常见的数据类型：

- **整数（int）**：如 `1`、`42`
- **浮点数（float）**：如 `3.14`、`2.718`
- **字符串（str）**：如 `"Hello"`、`"Python"`
- **布尔值（bool）**：如 `True`、`False`

```python
# 示例：不同数据类型
integer_value = 10
float_value = 3.14
string_value = "Hello, Python!"
boolean_value = False

print(type(integer_value))  # 输出：<class 'int'>
print(type(float_value))    # 输出：<class 'float'>
print(type(string_value))   # 输出：<class 'str'>
print(type(boolean_value))  # 输出：<class 'bool'>
```

### 1.3 数据类型转换

有时你需要在不同数据类型之间进行转换，例如将字符串转换为整数或浮点数。Python 提供了多种类型转换函数。

```python
# 类型转换示例
num_str = "100"
num_int = int(num_str)  # 将字符串转换为整数
num_float = float(num_str)  # 将字符串转换为浮点数

print(num_int)   # 输出：100
print(num_float) # 输出：100.0
```

## 2. 运算符与表达式

### 2.1 算术运算符

Python 提供了丰富的算术运算符用于进行数学运算。

- 加法：`+`
- 减法：`-`
- 乘法：`*`
- 除法：`/`
- 取整除：`//`
- 取余：`%`
- 指数：`**`

```python
# 算术运算符示例
a = 10
b = 3

print(a + b)  # 输出：13
print(a - b)  # 输出：7
print(a * b)  # 输出：30
print(a / b)  # 输出：3.3333333333333335
print(a // b) # 输出：3
print(a % b)  # 输出：1
print(a ** b) # 输出：1000
```

### 2.2 比较运算符

比较运算符用于比较两个值，结果是布尔值。

- 等于：`==`
- 不等于：`!=`
- 大于：`>`
- 小于：`<`
- 大于等于：`>=`
- 小于等于：`<=`

```python
# 比较运算符示例
x = 5
y = 10

print(x == y)  # 输出：False
print(x != y)  # 输出：True
print(x > y)   # 输出：False
print(x < y)   # 输出：True
print(x >= y)  # 输出：False
print(x <= y)  # 输出：True
```

### 2.3 逻辑运算符

逻辑运算符用于组合多个条件，结果是布尔值。

- 与：`and`
- 或：`or`
- 非：`not`

```python
# 逻辑运算符示例
a = True
b = False

print(a and b)  # 输出：False
print(a or b)   # 输出：True
print(not a)    # 输出：False
```

## 3. 字符串操作

### 3.1 字符串的定义与操作

字符串可以使用单引号或双引号定义，并且可以进行多种操作，如拼接、重复等。

```python
# 字符串的定义与操作
str1 = 'Hello'
str2 = "World"

# 字符串拼接
print(str1 + ' ' + str2)  # 输出：Hello World

# 字符串重复
print(str1 * 3)  # 输出：HelloHelloHello
```

### 3.2 字符串切片与拼接

字符串切片允许你获取字符串的子串，通过指定起始和结束索引来截取。

```python
# 字符串切片示例
s = "Hello, Python!"

# 获取子串
print(s[0:5])  # 输出：Hello
print(s[7:13]) # 输出：Python
print(s[:5])   # 输出：Hello
print(s[7:])   # 输出：Python!
```

### 3.3 常用字符串方法

Python 提供了许多内置的字符串方法，可以方便地进行字符串操作。

```python
# 常用字符串方法示例
s = "  hello, world!  "

# 去除两边空格
print(s.strip())  # 输出：hello, world!

# 转换为大写
print(s.upper())  # 输出：  HELLO, WORLD!

# 转换为小写
print(s.lower())  # 输出：  hello, world!

# 替换子串
print(s.replace("world", "Python"))  # 输出：  hello, Python!

# 分割字符串
print(s.split(','))  # 输出：['  hello', ' world!  ']
```

