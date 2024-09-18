---
title: 第三章：控制结构与函数
urlname: pg1rblzimdlhg4lt
date: '2024-09-10 19:00:33'
updated: '2024-09-18 16:09:20'
description: 控制结构和函数是任何编程语言的核心部分，Lua也不例外。本章将详细介绍Lua中的条件语句、循环结构以及函数的定义和使用。3.1 条件语句 (if-else)条件语句允许程序根据不同的条件执行不同的代码块。Lua提供了灵活的if-else结构来实现条件判断。基本if语句最简单的if语句语法如下：...
---
控制结构和函数是任何编程语言的核心部分，Lua也不例外。



本章将详细介绍Lua中的条件语句、循环结构以及函数的定义和使用。

## 3.1 条件语句 (if-else)
条件语句允许程序根据不同的条件执行不同的代码块。Lua提供了灵活的if-else结构来实现条件判断。

### 基本if语句
最简单的if语句语法如下：

```lua
if condition then
    -- 代码块
end
```

例如：

```lua
local age = 18
if age >= 18 then
    print("You are an adult.")
end
```

### if-else语句
当条件不满足时，我们可能想执行另一段代码。这时可以使用if-else结构：

```lua
if condition then
    -- 条件为真时执行的代码
else
    -- 条件为假时执行的代码
end
```

例如：

```lua
local age = 16
if age >= 18 then
    print("You are an adult.")
else
    print("You are a minor.")
end
```

### if-elseif-else多重条件语句
对于多个条件的判断，我们可以使用if-elseif-else结构：

```lua
if condition1 then
    -- 代码块1
elseif condition2 then
    -- 代码块2
elseif condition3 then
    -- 代码块3
else
    -- 默认代码块
end
```

例如：

```lua
local score = 75

if score >= 90 then
    print("A")
elseif score >= 80 then
    print("B")
elseif score >= 70 then
    print("C")
elseif score >= 60 then
    print("D")
else
    print("F")
end
```

### 嵌套条件语句
条件语句可以嵌套使用：

```lua
local x = 10
local y = 20

if x > 0 then
    if y > 0 then
        print("Both x and y are positive")
    else
        print("x is positive, but y is not")
    end
else
    print("x is not positive")
end
```

### 使用and和or进行复合条件判断
Lua允许使用逻辑运算符来组合多个条件：

```lua
local age = 25
local hasLicense = true

if age >= 18 and hasLicense then
    print("You can drive")
end

if age < 18 or not hasLicense then
    print("You cannot drive")
end
```

## 3.2 循环 (while, repeat-until, for)
循环允许我们多次执行相同的代码块。Lua提供了几种不同类型的循环结构。

### while循环
while循环在条件为真时重复执行代码块：

```lua
while condition do
    -- 循环体
end
```

例如：

```lua
local count = 1
while count <= 5 do
    print(count)
    count = count + 1
end
```

### repeat-until循环
repeat-until循环至少执行一次循环体，然后在条件为真时结束循环：

```lua
repeat
    -- 循环体
until condition
```

例如：

```lua
local num = 1
repeat
    print(num)
    num = num + 1
until num > 5
```

### 数值for循环
数值for循环用于在一个数值范围内进行迭代：

```lua
for var = start, end, step do
    -- 循环体
end
```

例如：

```lua
for i = 1, 5 do
    print(i)
end

-- 使用步长
for i = 10, 1, -2 do
    print(i)
end
```

### 泛型for循环
泛型for循环可以遍历表或其他可迭代对象：

```lua
for key, value in pairs(table) do
    -- 循环体
end
```

例如：

```lua
local fruits = {"apple", "banana", "orange"}
for index, fruit in ipairs(fruits) do
    print(index, fruit)
end
```

### 循环控制：break和goto
`break`语句用于立即退出当前循环：

```lua
for i = 1, 10 do
    if i > 5 then
        break
    end
    print(i)
end
```

Lua 5.2及以上版本支持`goto`语句，可以用于复杂的流程控制：

```lua
for i = 1, 10 do
    if i == 5 then
        goto continue
    end
    print(i)
    ::continue::
end
```

## 3.3 函数定义和调用
函数是Lua中的一等公民，可以像其他值一样被操作。

### 基本函数定义和调用
```lua
function greet(name)
    print("Hello, " .. name)
end

greet("Alice")  -- 输出: Hello, Alice
```

### 局部函数和全局函数
使用`local`关键字定义局部函数：

```lua
local function add(a, b)
    return a + b
end
```

### 匿名函数
函数可以不需要名字，直接赋值给变量：

```lua
local multiply = function(a, b)
    return a * b
end

print(multiply(4, 5))  -- 输出: 20
```

### 函数作为参数
```lua
function applyOperation(func, a, b)
    return func(a, b)
end

print(applyOperation(function(x, y) return x + y end, 2, 3))  -- 输出: 5
```

## 3.4 参数和返回值
### 可变参数函数
使用`...`定义可变参数函数：

```lua
function sum(...)
    local result = 0
    for _, v in ipairs({...}) do
        result = result + v
    end
    return result
end

print(sum(1, 2, 3, 4))  -- 输出: 10
```

### 多返回值
Lua函数可以返回多个值：

```lua
function getNameAndAge()
    return "Alice", 30
end

local name, age = getNameAndAge()
print(name, age)  -- 输出: Alice 30
```

## 3.5 闭包和递归
### 闭包
闭包是一个函数以及其相关的引用环境的组合：

```lua
function counter()
    local count = 0
    return function()
        count = count + 1
        return count
    end
end

local c = counter()
print(c())  -- 输出: 1
print(c())  -- 输出: 2
```

### 递归
递归是函数调用自身的过程：

```lua
function factorial(n)
    if n == 0 then
        return 1
    else
        return n * factorial(n - 1)
    end
end

print(factorial(5))  -- 输出: 120
```

这就是Lua控制结构和函数的基本概念。



通过这些工具，你可以构建复杂的程序逻辑和算法。

