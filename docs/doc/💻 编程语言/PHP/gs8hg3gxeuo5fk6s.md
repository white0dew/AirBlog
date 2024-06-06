---
title: 第二章：PHP 基础语法
urlname: gs8hg3gxeuo5fk6s
date: '2024-06-06 20:55:36'
updated: '2024-06-06 20:56:07'
description: 变量与数据类型变量的定义与使用在 PHP 中，变量是临时存储数据的容器。变量的定义非常简单，使用 $ 符号加上变量的名称即可。变量名称必须以字母或下划线开头，后面可以跟字母、数字或下划线。示例：定义变量<?php $name = "John"; // 字符串类型 $age = 25; // 整...
---
### 变量与数据类型
#### 变量的定义与使用

在 PHP 中，变量是临时存储数据的容器。变量的定义非常简单，使用 `$` 符号加上变量的名称即可。变量名称必须以字母或下划线开头，后面可以跟字母、数字或下划线。

**示例：定义变量**

```php
<?php
$name = "John"; // 字符串类型
$age = 25; // 整数类型
$height = 1.75; // 浮点数类型
$is_student = true; // 布尔类型
?>
```

#### 常见数据类型

PHP 支持多种数据类型，常见的包括：

1. **整型（Integer）**：表示整数。
2. **浮点型（Float/Double）**：表示带小数点的数值。
3. **字符串（String）**：表示一串字符。
4. **布尔型（Boolean）**：表示 `true` 或 `false`。
5. **数组（Array）**：表示一组数据。
6. **对象（Object）**：表示一个类的实例。
7. **NULL**：表示一个空变量。

**示例：不同数据类型**

```php
<?php
$integer = 10;
$float = 10.5;
$string = "Hello, World!";
$boolean = true;
$array = array("apple", "banana", "cherry");
$object = new stdClass(); // 创建一个空对象
$null = null;
?>
```

#### 数据类型转换

在 PHP 中，可以显式地将一个变量转换为不同的数据类型。使用 `(type)` 语法进行类型转换。

**示例：数据类型转换**

```php
<?php
$number = "123";
$integer = (int)$number; // 转换为整型
$float = (float)$number; // 转换为浮点型
$boolean = (bool)$number; // 转换为布尔型
?>
```

### 运算符与表达式

#### 算术运算符

PHP 提供了一些基本的算术运算符，用于执行数学运算：

- `+`：加
- `-`：减
- `*`：乘
- `/`：除
- `%`：取模（余数）

**示例：算术运算符**

```php
<?php
$a = 10;
$b = 3;

$sum = $a + $b; // 13
$difference = $a - $b; // 7
$product = $a * $b; // 30
$quotient = $a / $b; // 3.3333...
$remainder = $a % $b; // 1
?>
```

#### 比较运算符

比较运算符用于比较两个值，并返回布尔结果（`true` 或 `false`）：

- `==`：等于
- `===`：全等（值和类型都相等）
- `!=`：不等于
- `!==`：不全等
- `>`：大于
- `<`：小于
- `>=`：大于等于
- `<=`：小于等于

**示例：比较运算符**

```php
<?php
$a = 10;
$b = "10";

$equal = ($a == $b); // true
$identical = ($a === $b); // false
$not_equal = ($a != $b); // false
$not_identical = ($a !== $b); // true
$greater = ($a > 5); // true
$less = ($a < 15); // true
$greater_equal = ($a >= 10); // true
$less_equal = ($a <= 10); // true
?>
```

#### 逻辑运算符

逻辑运算符用于结合多个条件：

- `&&`：逻辑与（AND）
- `||`：逻辑或（OR）
- `!`：逻辑非（NOT）

**示例：逻辑运算符**

```php
<?php
$a = true;
$b = false;

$and = ($a && $b); // false
$or = ($a || $b); // true
$not = !$a; // false
?>
```

### 字符串操作

#### 字符串的定义与操作

字符串可以用单引号或双引号定义。双引号中的变量会被解析，而单引号中的变量不会。

**示例：定义字符串**

```php
<?php
$single_quote = 'Hello, World!';
$double_quote = "Hello, $name!";
?>
```

#### 字符串连接与插值

使用 `.` 运算符连接字符串；双引号字符串支持变量插值。

**示例：字符串连接与插值**

```php
<?php
$first_name = "John";
$last_name = "Doe";

$full_name = $first_name . " " . $last_name; // John Doe
$greeting = "Hello, $first_name $last_name!"; // Hello, John Doe!
?>
```

#### 常用字符串函数

PHP 提供了许多内置的字符串函数：

- `strlen()`：获取字符串长度
- `strpos()`：查找子字符串的位置
- `substr()`：截取字符串
- `str_replace()`：替换字符串中的子字符串

**示例：字符串函数**

```php
<?php
$string = "Hello, World!";

$length = strlen($string); // 13
$position = strpos($string, "World"); // 7
$substring = substr($string, 7, 5); // World
$replaced = str_replace("World", "PHP", $string); // Hello, PHP!
?>
```

### 总结

在本章中，我们详细介绍了 PHP 的基础语法，包括变量与数据类型、运算符与表达式，以及字符串操作。这些基础知识是学习 PHP 编程的基石，掌握这些内容将为后续的学习打下坚实的基础。

