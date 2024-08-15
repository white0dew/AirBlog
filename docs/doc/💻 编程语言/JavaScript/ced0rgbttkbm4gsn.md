---
title: 第三章：控制结构
urlname: ced0rgbttkbm4gsn
date: '2024-06-07 10:34:15'
updated: '2024-08-15 16:39:21'
description: JavaScript 提供了丰富的控制结构，包括条件语句和循环语句。本章将详细介绍这些控制结构及其应用。1. 条件语句条件语句允许代码根据不同的条件执行不同的操作。这对于编写逻辑复杂的程序至关重要。if 语句if 语句是最基本的条件语句之一，通常用于在某个条件满足时执行代码块。其语法如下：if...
---
JavaScript 提供了丰富的控制结构，包括条件语句和循环语句。本章将详细介绍这些控制结构及其应用。

## 1. 条件语句

条件语句允许代码根据不同的条件执行不同的操作。这对于编写逻辑复杂的程序至关重要。

### if 语句

`if` 语句是最基本的条件语句之一，通常用于在某个条件满足时执行代码块。其语法如下：

```javascript
if (条件) {
  // 条件为 true 时执行的代码
}
```

**示例**：

```javascript
let age = 20;
if (age >= 18) {
  console.log("你已成年");
}
```

### if-else 语句

`if-else` 语句用于在条件不满足时执行另一段代码。其语法如下：

```javascript
if (条件) {
  // 条件为 true 时执行的代码
} else {
  // 条件为 false 时执行的代码
}
```

**示例**：

```javascript
let age = 16;
if (age >= 18) {
  console.log("你已成年");
} else {
  console.log("你未成年");
}
```

### if-elseif-else 语句

当有多个条件需要判断且每个条件对应不同的操作时，可以使用 `if-elseif-else` 语句。其语法如下：

```javascript
if (条件1) {
  // 条件1为 true 时执行的代码
} else if (条件2) {
  // 条件2为 true 时执行的代码
} else {
  // 条件1和条件2都为 false 时执行的代码
}
```

**示例**：

```javascript
let score = 85;
if (score >= 90) {
  console.log("成绩为A");
} else if (score >= 80) {
  console.log("成绩为B");
} else if (score >= 70) {
  console.log("成绩为C");
} else {
  console.log("成绩为D");
}
```

### 三元运算符

三元运算符是一种简洁的条件判断方式，适用于简单的条件语句。其语法如下：

```javascript
条件 ? 结果1 : 结果2;
```

**示例**：

```javascript
let age = 20;
let message = age >= 18 ? "你已成年" : "你未成年";
console.log(message);
```

## 2. 循环语句

循环语句允许代码重复执行，直到满足某个条件。常见的循环语句包括 `for` 循环、`while` 循环和 `do-while` 循环。

### for 循环

`for` 循环是最常用的循环语句之一，其语法如下：

```javascript
for (初始化; 条件; 更新) {
  // 循环体代码
}
```

**示例**：

```javascript
for (let i = 0; i < 5; i++) {
  console.log("当前值为：" + i);
}
```

### while 循环

`while` 循环在条件为 true 时重复执行代码块。其语法如下：

```javascript
while (条件) {
  // 循环体代码
}
```

**示例**：

```javascript
let i = 0;
while (i < 5) {
  console.log("当前值为：" + i);
  i++;
}
```

### do-while 循环

`do-while` 循环与 `while` 循环类似，但它会先执行一次代码块，然后再判断条件是否满足。其语法如下：

```javascript
do {
  // 循环体代码
} while (条件);
```

**示例**：

```javascript
let i = 0;
do {
  console.log("当前值为：" + i);
  i++;
} while (i < 5);
```

### 循环中的 break 与 continue

`break` 和 `continue` 是用于控制循环的两个关键字。

- **break**：终止当前循环。

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 3) {
    break;
  }
  console.log("当前值为：" + i);
}
```

- **continue**：跳过当前迭代，继续下一次循环。

```javascript
for (let i = 0; i < 5; i++) {
  if (i === 3) {
    continue;
  }
  console.log("当前值为：" + i);
}
```

## 3. 数组

数组是存储多个值的集合。JavaScript 提供了多种数组操作的方法。

### 数组的定义与操作

定义数组可以使用方括号 `[]`，并用逗号分隔元素。

```javascript
let fruits = ["苹果", "香蕉", "橙子"];
```

访问数组元素使用索引值，索引从 0 开始。

```javascript
console.log(fruits[0]); // 输出：苹果
```

### 常用数组方法

JavaScript 提供了丰富的数组操作方法：

- `push`：在数组末尾添加元素。

```javascript
fruits.push("葡萄");
console.log(fruits); // 输出：["苹果", "香蕉", "橙子", "葡萄"]
```

- `pop`：移除数组末尾的元素。

```javascript
fruits.pop();
console.log(fruits); // 输出：["苹果", "香蕉",```markdown
"橙子"]
```

- `shift`：移除数组开头的元素。

```javascript
fruits.shift();
console.log(fruits); // 输出：["香蕉", "橙子"]
```

- `unshift`：在数组开头添加元素。

```javascript
fruits.unshift("草莓");
console.log(fruits); // 输出：["草莓", "香蕉", "橙子"]
```

### 数组的迭代方法

JavaScript 还提供了一些用于数组迭代的高级方法，如 `forEach`、`map`、`filter` 和 `reduce` 等。

- `forEach`：对数组中的每个元素执行一次提供的函数。

```javascript
fruits.forEach(function (fruit) {
  console.log(fruit);
});
// 输出：
// 草莓
// 香蕉
// 橙子
```

- `map`：创建一个新数组，数组中的每个元素是对原数组中的每个元素执行一个提供的函数后的返回值。

```javascript
let lengths = fruits.map(function (fruit) {
  return fruit.length;
});
console.log(lengths); // 输出：[2, 2, 2]
```

- `filter`：创建一个新数组，数组中的元素是通过提供函数的测试的所有元素。

```javascript
let longerFruits = fruits.filter(function (fruit) {
  return fruit.length > 2;
});
console.log(longerFruits); // 输出：[]
```

- `reduce`：对数组中的每个元素执行一个提供的函数，将其结果累积为单个值。

```javascript
let totalLength = fruits.reduce(function (total, fruit) {
  return total + fruit.length;
}, 0);
console.log(totalLength); // 输出：6
```

### 实战练习

通过一个小练习来巩固我们对数组的理解和应用。我们将编写一个程序，计算一个班级学生的平均成绩。

```javascript
let scores = [85, 90, 78, 92, 88];

// Step 1: 计算总分
let totalScore = scores.reduce(function (total, score) {
  return total + score;
}, 0);

// Step 2: 计算平均分
let averageScore = totalScore / scores.length;

console.log("班级平均成绩为：" + averageScore);
```

在这段代码中，我们首先使用 `reduce` 方法计算总成绩，然后通过总成绩除以学生人数得到平均成绩。
