---
title: 第三章：控制结构
urlname: mrlpifpqy4nyfcl1
date: '2024-06-06 21:10:33'
updated: '2024-06-06 21:11:16'
description: 1. 条件语句在编程中，条件语句用于根据不同的条件执行不同的代码片段。Python 提供了多种条件语句，使得程序能够根据判断结果选择性地执行代码。1.1 if 语句if 语句用于判断一个条件是否为真，如果为真，则执行相应的代码块。# 示例：判断一个数字是否为正数 num = 10  if nu...
---
## 1. 条件语句

在编程中，条件语句用于根据不同的条件执行不同的代码片段。Python 提供了多种条件语句，使得程序能够根据判断结果选择性地执行代码。

### 1.1 if 语句

`if` 语句用于判断一个条件是否为真，如果为真，则执行相应的代码块。

```python
# 示例：判断一个数字是否为正数
num = 10

if num > 0:
    print("这是一个正数")
```

### 1.2 if-else 语句

`if-else` 语句在判断条件为假时执行另一个代码块。

```python
# 示例：判断一个数字是正数还是负数
num = -5

if num > 0:
    print("这是一个正数")
else:
    print("这是一个负数")
```

### 1.3 if-elif-else 语句

`if-elif-else` 语句用于处理多个条件。

```python
# 示例：判断一个数字是正数、负数还是零
num = 0

if num > 0:
    print("这是一个正数")
elif num < 0:
    print("这是一个负数")
else:
    print("这是零")
```

## 2. 循环语句

循环语句允许我们多次执行一段代码，直到满足特定的条件为止。Python 提供了 `for` 循环和 `while` 循环。

### 2.1 for 循环

`for` 循环用于遍历一个序列（如列表、元组、字符串等）。

```python
# 示例：遍历一个列表并打印每个元素
fruits = ["苹果", "香蕉", "橙子"]

for fruit in fruits:
    print(fruit)
```

### 2.2 while 循环

`while` 循环在条件为真时反复执行代码块。

```python
# 示例：打印 1 到 5
i = 1

while i <= 5:
    print(i)
    i += 1
```

### 2.3 循环中的 break 与 continue

`break` 语句用于提前退出循环，`continue` 语句用于跳过当前的迭代并继续下一个迭代。

```python
# 示例：在遍历列表时提前退出循环
fruits = ["苹果", "香蕉", "橙子"]

for fruit in fruits:
    if fruit == "香蕉":
        break
    print(fruit)

# 示例：在遍历列表时跳过某些元素
for fruit in fruits:
    if fruit == "香蕉":
        continue
    print(fruit)
```

## 3. 列表与字典

列表和字典是 Python 中常用的两种数据结构，分别用于存储有序和无序的数据集。

### 3.1 列表的定义与操作

列表是一种可变的有序集合，使用方括号 `[]` 定义。

```python
# 定义一个列表
fruits = ["苹果", "香蕉", "橙子"]

# 访问列表中的元素
print(fruits[0])  # 输出：苹果

# 修改列表中的元素
fruits[1] = "草莓"
print(fruits)  # 输出：['苹果', '草莓', '橙子']

# 添加元素
fruits.append("葡萄")
print(fruits)  # 输出：['苹果', '草莓', '橙子', '葡萄']

# 删除元素
fruits.remove("草莓")
print(fruits)  # 输出：['苹果', '橙子', '葡萄']
```

### 3.2 字典的定义与操作

字典是一种无序的键值对集合，使用花括号 `{}` 定义。

```python
# 定义一个字典
person = {"姓名": "张三", "年龄": 25, "城市": "北京"}

# 访问字典中的值
print(person["姓名"])  # 输出：张三

# 修改字典中的值
person["年龄"] = 26
print(person)  # 输出：{'姓名': '张三', '年龄': 26, '城市': '北京'}

# 添加键值对
person["职业"] = "工程师"
print(person)  # 输出：{'姓名': '张三', '年龄': 26, '城市': '北京', '职业': '工程师'}

# 删除键值对
del person["城市"]
print(person)  # 输出：{'姓名': '张三', '年龄': 26, '职业': '工程师'}
```

### 3.3 列表与字典的常用方法

#### 列表的常用方法

- `append(item)`：在列表末尾添加一个元素。
- `remove(item)`：移除列表中的一个元素。
- `pop(index)`：移除并返回指定位置的元素，默认移除最后一个元素。
- `sort()`：对列表进行排序。

```python
# 示例：使用列表的常用方法
numbers = [3, 1, 4, 1, 5, 9]
numbers.sort()
print(numbers)  # 输出：[1, 1, 3, 4, 5, 9]
```

#### 字典的常用方法

- `keys()`：返回字典中的所有键。
- `values()`：返回字典中的所有值。
- `items()`：返回字典中的所有键值对。
- `get(key, default=None)`：返回指定键的值，如果键不存在，则返回默认值。

```python
# 示例：使用字典的常用方法
person = {"姓名": "张三", "年龄": 25, "城市": "北京"}

for key, value in person.items():
    print(f"{key}: {value}")

# 输出：
# 姓名: 张三
# 年龄: 25
# 城市: 北京
```

【本章节完毕】
