---
title: 第四章：函数与模块
urlname: iktx8rplvlb9evix
date: '2024-06-06 21:11:18'
updated: '2024-06-06 21:11:56'
description: 函数和模块是 Python 编程中的两个核心概念。通过掌握它们，你可以显著提高代码的可重用性和组织性。在这一章中，我们将深入探讨函数的定义、调用、参数与返回值，匿名函数，以及模块和包的使用。1. 函数1.1 函数的定义与调用函数是组织好的、可重复使用的、用于实现单一或相关联功能的代码块。Pyt...
---
函数和模块是 Python 编程中的两个核心概念。通过掌握它们，你可以显著提高代码的可重用性和组织性。在这一章中，我们将深入探讨函数的定义、调用、参数与返回值，匿名函数，以及模块和包的使用。

## 1. 函数

### 1.1 函数的定义与调用

函数是组织好的、可重复使用的、用于实现单一或相关联功能的代码块。Python 使用 `def` 关键字来定义函数。

**示例：**

```python
def greet(name):
    print(f"Hello, {name}!")
```

调用函数：

```python
greet("Alice")
```

**输出：**

```
Hello, Alice!
```

### 1.2 函数参数与返回值

函数可以接收参数并返回值。

**示例：**

```python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)
```

**输出：**

```
8
```

#### 可选参数和默认值

你可以为参数指定默认值，从而使其成为可选参数。

**示例：**

```python
def greet(name="Stranger"):
    print(f"Hello, {name}!")

greet()
greet("Bob")
```

**输出：**

```
Hello, Stranger!
Hello, Bob!
```

### 1.3 匿名函数（lambda 表达式）

匿名函数使用 `lambda` 关键字定义，通常用于需要一个简单函数的场合。

**示例：**

```python
add = lambda x, y: x + y
print(add(2, 3))
```

**输出：**

```
5
```

## 2. 模块与包

模块和包是 Python 中组织代码的基本单位。

### 2.1 模块的导入与使用

模块是一个包含 Python 定义和语句的文件。通过 `import` 关键字可以引入模块。

**示例：**

```python
import math

print(math.sqrt(16))
```

**输出：**

```
4.0
```

你也可以引入模块中的特定函数或变量：

```python
from math import pi, sqrt

print(pi)
print(sqrt(16))
```

**输出：**

```
3.141592653589793
4.0
```

### 2.2 常用标准库模块

Python 提供了丰富的标准库模块，这里介绍几个常用的。

#### `math` 模块

提供了基本的数学函数和常量。

```python
import math

print(math.factorial(5))  # 阶乘
print(math.gcd(48, 180))  # 最大公约数
```

#### `random` 模块

用于生成随机数。

```python
import random

print(random.randint(1, 10))  # 随机整数
print(random.choice(['apple', 'banana', 'cherry']))  # 随机选择
```

#### `time` 模块

提供了与时间相关的函数。

```python
import time

print(time.time())  # 当前时间戳
time.sleep(2)  # 休眠2秒
print("Done")
```

### 2.3 自定义模块与包

你可以创建自己的模块，将相关的函数和类放在一个文件中，然后在其他文件中引入它们。

#### 创建模块

创建一个名为 `mymodule.py` 的文件：

```python
# mymodule.py

def hello():
    print("Hello from mymodule")
```

在另一个文件中使用这个模块：

```python
import mymodule

mymodule.hello()
```

#### 创建包

包是一个包含多个模块的目录。使用包可以更好地组织代码。

创建一个名为 `mypackage` 的目录，并在其中创建一个 `__init__.py` 文件和一些模块：

```
mypackage/
    __init__.py
    module1.py
    module2.py
```

`__init__.py` 文件可以是空的，但它表示 `mypackage` 是一个包。

在 `module1.py` 文件中定义一些函数：

```python
# module1.py

def foo():
    print("foo from module1")
```

在 `module2.py` 文件中定义一些函数：

```python
# module2.py

def bar():
    print("bar from module2")
```

现在你可以在其他文件中使用这个包：

```python
from mypackage import module1, module2

module1.foo()
module2.bar()
```

**输出：**

```
foo from module1
bar from module2
```

通过掌握这些知识，你可以更好地组织和管理你的 Python 项目，提高代码的可读性和可维护性。下一章我们将深入探讨 Python 的文件操作。

