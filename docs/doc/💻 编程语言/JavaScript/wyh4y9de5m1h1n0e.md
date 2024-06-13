---
title: 第二章：JavaScript 基础语法
urlname: wyh4y9de5m1h1n0e
date: '2024-06-07 10:33:50'
updated: '2024-06-07 10:34:14'
description: 1. 变量与数据类型变量的声明在 JavaScript 中，我们可以使用 var、let 和 const 这三种关键词来声明变量。下面是每种声明方式的详细解释和示例：var 关键词var 是 JavaScript 中最早用来声明变量的关键词。它有一些特性需要注意：var name = "Ali...
---
## 1. 变量与数据类型

### 变量的声明

在 JavaScript 中，我们可以使用 `var`、`let` 和 `const` 这三种关键词来声明变量。下面是每种声明方式的详细解释和示例：

#### var 关键词

`var` 是 JavaScript 中最早用来声明变量的关键词。它有一些特性需要注意：

```javascript
var name = "Alice";
console.log(name); // 输出：Alice

var name = "Bob";
console.log(name); // 输出：Bob
```

特性：

1. 变量可以重新声明。
2. 变量提升，即变量可以在声明之前使用（但值为 `undefined`）。

#### let 关键词

`let` 是 ES6 引入的，用来声明局部变量，它比 `var` 更加严格和安全。

```javascript
let age = 25;
console.log(age); // 输出：25

age = 26;
console.log(age); // 输出：26
```

特性：

1. 变量不能重新声明。
2. 变量提升，但不能在声明之前使用。

#### const 关键词

`const` 也是 ES6 引入的，用来声明常量，一旦声明，不能更改。

```javascript
const PI = 3.14;
console.log(PI); // 输出：3.14

// PI = 3.1415; // 会报错：Assignment to constant variable.
```

特性：

1. 变量不能重新声明和更改。
2. 变量提升，但不能在声明之前使用。

### 常见数据类型

JavaScript 提供了多种数据类型，分为原始类型和引用类型。

#### 原始类型

1. **数字（Number）**
```javascript
let count = 10;
let price = 99.99;
```
 

2. **字符串（String）**
```javascript
let greeting = "Hello, World!";
```
 

3. **布尔值（Boolean）**
```javascript
let isActive = true;
let isLogged = false;
```
 

4. **null**
```javascript
let emptyValue = null;
```
 

5. **undefined**
```javascript
let notAssigned;
console.log(notAssigned); // 输出：undefined
```
 

#### 引用类型

1.  **对象（Object）** 
```javascript
let person = {
  name: "John",
  age: 30,
};
```
 

2.  **数组（Array）** 
```javascript
let numbers = [1, 2, 3, 4, 5];
```
 

3.  **函数（Function）** 
```javascript
function greet() {
  console.log("Hello!");
}
```
 

### 数据类型转换

JavaScript 允许我们在不同的数据类型之间进行转换。

#### 显式转换

通过 JavaScript 提供的内置函数进行转换：

1.  **转为字符串** 
```javascript
let num = 123;
let str = String(num);
console.log(str); // 输出："123"
```
 

2.  **转为数字** 
```javascript
let str = "123";
let num = Number(str);
console.log(num); // 输出：123
```
 

3.  **转为布尔值** 
```javascript
let truthyStr = "Hello";
let falsyStr = "";
console.log(Boolean(truthyStr)); // 输出：true
console.log(Boolean(falsyStr)); // 输出：false
```
 

#### 隐式转换

JavaScript 会在某些情况下自动进行类型转换：

1.  **字符串与数字相加** 
```javascript
let result = 1 + "2";
console.log(result); // 输出："12"
```
 

2.  **布尔值与数字相乘** 
```javascript
let result = true * 2;
console.log(result); // 输出：2
```
 

## 2. 运算符与表达式

### 算术运算符

JavaScript 提供了多种算术运算符用于数学计算：

1.  **加法运算符 (+)** 
```javascript
let sum = 10 + 5;
console.log(sum); // 输出：15
```
 

2.  **减法运算符 (-)** 
```javascript
let difference = 10 - 5;
console.log(difference); // 输出：5
```
 

3.  **乘法运算符 (*)** 
```javascript
let product = 10 * 5;
console.log(product); // 输出：50
```
 

4.  **除法运算符 (/)** 
```javascript
let quotient = 10 / 5;
console.log(quotient); // 输出：2
```
 

5.  **取余运算符 (%)** 
```javascript
let remainder = 10 % 3;
console.log(remainder); // 输出：1
```
 

### 比较运算符

用于比较两个值，并返回布尔值：

1.  **等于 (****) 和全等 (****=)** 
```javascript
console.log(5 == "5"); // 输出：true
console.log(5 === "5"); // 输出：false
```
 

2.  **不等于 (!=) 和全不等 (!==)** 
```javascript
console.log(5 != "5"); // 输出：false
console.log(5 !== "5"); // 输出：true
```
 

3.  **大于 (>) 和大于等于 (>=)** 
```javascript
console.log(5 > 3); // 输出：true
console.log(5 >= 5); // 输出：true
```
 

4.  **小于 (<) 和小于等于 (<=)** 
```javascript
console.log(5 < 3); // 输出：false
console.log(5 <= 5); // 输出：true
```
 

### 逻辑运算符

用于逻辑判断：

1.  **逻辑与 (&&)** 
```javascript
console.log(true && false); // 输出：false
```
 

2.  **逻辑或 (||)** 
```javascript
console.log(true || false); // 输出：true
```
 

3.  **逻辑非 (!)** 
```javascript
console.log(!true); // 输出：false
```
 

## 3. 字符串操作

### 字符串的定义与操作

字符串可以用单引号、双引号或反引号定义：

```javascript
let singleQuoteStr = "Hello";
let doubleQuoteStr = "World";
let templateStr = `Hello, World!`;
```

### 字符串连接与模板字符串

1.  **字符串连接** 
```javascript
let greeting = "Hello, " + "World!";
console.log(greeting); // 输出："Hello, World!"
```
 

2.  **模板字符串** 
```javascript
let name = "Alice";
let greeting = `Hello, ${name}!`;
console.log(greeting); // 输出："Hello, Alice!"
```
 

### 常用字符串方法

1.  **length 属性** 
```javascript
let str = "Hello";
console.log(str.length); // 输出：5
```
 

2.  **toUpperCase() 和 toLowerCase() 方法** 
```javascript
let str = "Hello";
console.log(str.toUpperCase()); // 输出：HELLO
console.log(str.toLowerCase()); // 输出：hello
```
 

3.  **charAt() 方法** 
```javascript
let str = "Hello";
console.log(str.charAt(0)); // 输出：H
```
 

4.  **substring() 方法** 
```javascript
let str = "Hello, World!";
console.log(str.substring(0, 5)); // 输出：Hello
```
 

5.  **split() 方法** 
```javascript
let str = "apple, banana, cherry";
let fruits = str.split(", ");
console.log(fruits); // 输出：["apple", "banana", "cherry"]
```
 

6.  **trim() 方法** 
```javascript
let str = "   Hello, World!   ";
console.log(str.trim()); // 输出："Hello, World!"
```
 

7.  **replace() 方法** 
```javascript
let str = "Hello, World!";
let newStr = str.replace("World", "JavaScript");
console.log(newStr); // 输出："Hello, JavaScript!"
```
 

## 4. 数组

### 数组的定义与操作

数组是一种特殊的对象，用于存储有序的集合：

```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // 输出：apple
```

### 常用数组方法

1.  **push() 和 pop() 方法** 
```javascript
let fruits = ["apple", "banana"];
fruits.push("cherry");
console.log(fruits); // 输出：["apple", "banana", "cherry"]

let lastFruit = fruits.pop();
console.log(lastFruit); // 输出：cherry
console.log(fruits); // 输出：["apple", "banana"]
```
 

2.  **shift() 和 unshift() 方法** 
```javascript
let fruits = ["apple", "banana"];
let firstFruit = fruits.shift();
console.log(firstFruit); // 输出：apple
console.log(fruits); // 输出：["banana"]

fruits.unshift("cherry");
console.log(fruits); // 输出：["cherry", "banana"]
```
 

3.  **concat() 方法** 
```javascript
let fruits1 = ["apple", "banana"];
let fruits2 = ["cherry", "date"];
let allFruits = fruits1.concat(fruits2);
console.log(allFruits); // 输出：["apple", "banana", "cherry", "date"]
```
 

4.  **slice() 方法** 
```javascript
let fruits = ["apple", "banana", "cherry", "date"];
let someFruits = fruits.slice(1, 3);
console.log(someFruits); // 输出：["banana", "cherry"]
```
 

5.  **splice() 方法** 
```javascript
let fruits = ["apple", "banana", "cherry"];
fruits.splice(1, 1, "date");
console.log(fruits); // 输出：["apple", "date", "cherry"]
```
 

6.  **indexOf() 方法** 
```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits.indexOf("banana")); // 输出：1
```
 

7.  **includes() 方法** 
```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits.includes("banana")); // 输出：true
```
 

### 数组的迭代方法

1.  **forEach() 方法** 
```javascript
let fruits = ["apple", "banana", "cherry"];
fruits.forEach(function (fruit) {
  console.log(fruit);
});
// 输出：
// apple
// banana
// cherry
```
 

2.  **map() 方法** 
```javascript
let numbers = [1, 2, 3];
let doubleNumbers = numbers.map(function (num) {
  return num * 2;
});
console.log(doubleNumbers); // 输出：[2, 4, 6]
```
 

3.  **filter() 方法** 
```javascript
let numbers = [1, 2, 3, 4, 5];
let evenNumbers = numbers.filter(function (num) {
  return num % 2 === 0;
});
console.log(evenNumbers); // 输出：[2, 4]
```
 

4.  **reduce() 方法** 
```javascript
let numbers = [1, 2, 3, 4, 5];
let sum = numbers.reduce(function (total, num) {
  return total + num;
}, 0);
console.log(sum); // 输出：15
```
 
