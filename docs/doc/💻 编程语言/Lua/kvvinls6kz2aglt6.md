---
title: 无标题文档
urlname: kvvinls6kz2aglt6
date: '2024-09-10 19:26:19'
updated: '2024-09-10 19:26:37'
description: '好的，我将为您详细展开第四章"表与数组"的内容。第四章：表与数组表是Lua中最重要且唯一的数据结构，它可以用来实现数组、字典、对象等多种编程概念。本章将深入探讨表的各种用法和特性。4.1 表的创建和访问表是Lua中用于存储各种值的容器，类似于其他语言中的数组或字典。创建表使用花括号 {} 来创...'
---
好的，我将为您详细展开第四章"表与数组"的内容。

# 第四章：表与数组
表是Lua中最重要且唯一的数据结构，它可以用来实现数组、字典、对象等多种编程概念。本章将深入探讨表的各种用法和特性。

## 4.1 表的创建和访问
表是Lua中用于存储各种值的容器，类似于其他语言中的数组或字典。

### 创建表
使用花括号 `{}` 来创建表：

```lua
local emptyTable = {}
local simpleTable = {10, 20, 30}
local mixedTable = {10, "hello", true, {1, 2}}
```

你也可以使用键值对创建表：

```lua
local person = {
    name = "Alice",
    age = 30,
    ["favorite color"] = "blue"
}
```

### 访问表元素
有两种主要方式访问表元素：

1. 使用点号（对于有效标识符的键）：

```lua
print(person.name)  -- 输出: Alice
```

2. 使用方括号（适用于所有类型的键）：

```lua
print(person["age"])  -- 输出: 30
print(person["favorite color"])  -- 输出: blue
```

### 表的动态性质
表是动态的，你可以随时添加或删除元素：

```lua
person.job = "Engineer"  -- 添加新元素
person.age = nil  -- 删除元素
```

## 4.2 表作为数组
在Lua中，数组实际上就是以连续整数为键的表。

### 创建和使用数组
```lua
local fruits = {"apple", "banana", "orange"}
print(fruits[1])  -- 输出: apple（注意：Lua的数组索引默认从1开始）
```

### 获取数组长度
使用 `#` 操作符获取数组长度：

```lua
print(#fruits)  -- 输出: 3
```

### 处理稀疏数组
Lua允许创建"洞"在数组中，这称为稀疏数组：

```lua
local sparseArray = {1, nil, 3, 4}
print(#sparseArray)  -- 输出可能不如预期，因为nil值的存在
```

## 4.3 表的遍历技巧
### 使用 pairs() 遍历表
`pairs()` 函数用于遍历表的所有键值对：

```lua
for key, value in pairs(person) do
    print(key, value)
end
```

### 使用 ipairs() 遍历数组部分
`ipairs()` 函数用于遍历数组部分（连续的数字索引）：

```lua
for index, value in ipairs(fruits) do
    print(index, value)
end
```

### 自定义遍历顺序
如果你需要特定的遍历顺序，可以先收集和排序键：

```lua
local keys = {}
for k in pairs(person) do table.insert(keys, k) end
table.sort(keys)
for _, k in ipairs(keys) do
    print(k, person[k])
end
```

## 4.4 表操作函数
Lua提供了一些内置函数来操作表。

### table.insert() 和 table.remove()
添加和删除元素：

```lua
table.insert(fruits, "grape")  -- 在末尾添加
table.insert(fruits, 2, "pear")  -- 在指定位置插入
local removed = table.remove(fruits)  -- 移除并返回最后一个元素
local removed2 = table.remove(fruits, 2)  -- 移除并返回指定位置的元素
```

### table.sort()
对表进行排序：

```lua
table.sort(fruits)  -- 默认按字母顺序排序

-- 自定义排序
table.sort(fruits, function(a, b) return #a < #b end)  -- 按长度排序
```

### table.concat()
连接数组元素：

```lua
local joined = table.concat(fruits, ", ")
print(joined)  -- 输出: apple, banana, orange, grape
```

## 4.5 元表基础
元表允许你自定义表的行为。

### 设置和获取元表
```lua
local t = {}
local mt = {}
setmetatable(t, mt)

local mt2 = getmetatable(t)
print(mt == mt2)  -- 输出: true
```

### __index 元方法
`__index` 元方法用于查找不存在的键：

```lua
mt.__index = function(table, key)
    return "Not found: " .. key
end

print(t.foo)  -- 输出: Not found: foo
```

### __newindex 元方法
`__newindex` 元方法用于拦截新索引的赋值：

```lua
mt.__newindex = function(table, key, value)
    print("Assigning", key, "=", value)
    rawset(table, key, value)
end

t.bar = 10  -- 输出: Assigning bar = 10
```

### 使用元表实现简单的面向对象编程
```lua
local function createPerson(name)
    local person = {name = name}
    local mt = {
        __index = {
            introduce = function(self)
                print("My name is " .. self.name)
            end
        }
    }
    setmetatable(person, mt)
    return person
end

local alice = createPerson("Alice")
alice:introduce()  -- 输出: My name is Alice
```

## 练习
1. 创建一个表示学生的表，包含姓名、年龄和成绩。实现一个函数来计算所有学生的平均成绩。
2. 实现一个简单的购物车系统，可以添加商品、移除商品、计算总价。
3. 使用元表创建一个简单的向量类，支持向量加法和标量乘法。

通过本章的学习，你应该能够熟练使用Lua的表来组织和操作数据，这为后续更复杂的编程任务打下了基础。在下一章中，我们将探讨Lua的模块和包管理系统。

