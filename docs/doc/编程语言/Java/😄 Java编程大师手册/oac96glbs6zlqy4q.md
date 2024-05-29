---
title: 2、Java基础语法
urlname: oac96glbs6zlqy4q
date: '2024-05-24 09:45:13'
updated: '2024-05-24 09:45:58'
description: 2.1 变量与数据类型在Java中，变量是用来存储数据的命名内存位置。数据类型决定了变量可以存储的数据的类型。2.1.1 基本数据类型Java中有八种基本数据类型：byte：8位整数，范围是-128到127。short：16位整数，范围是-32768到32767。int：32位整数，范围是-2...
---
## 2.1 变量与数据类型

在Java中，变量是用来存储数据的命名内存位置。数据类型决定了变量可以存储的数据的类型。

### 2.1.1 基本数据类型

Java中有八种基本数据类型：

- **byte**：8位整数，范围是-128到127。
- **short**：16位整数，范围是-32768到32767。
- **int**：32位整数，范围是-2147483648到2147483647。
- **long**：64位整数，范围是-9223372036854775808到9223372036854775807。
- **float**：单精度浮点数，32位。
- **double**：双精度浮点数，64位。
- **char**：单个字符，16位Unicode字符。
- **boolean**：布尔值，只能是`true`或`false`。

### 2.1.2 声明变量

声明变量时需要指定数据类型和变量名，例如：

```java
int age = 25;
double salary = 50000.0;
char grade = 'A';
boolean isEmployed = true;
```

### 2.1.3 类型转换

Java支持自动类型转换和强制类型转换。

-  **自动类型转换**：小范围类型可以自动转换为大范围类型。 
```java
int num = 100;
double d = num; // int自动转换为double
```
 

-  **强制类型转换**：需要显式地进行转换。 
```java
double d = 9.78;
int num = (int) d; // double强制转换为int
```
 

## 2.2 运算符与表达式

运算符是用来执行操作的符号。Java提供了多种运算符。

### 2.2.1 算术运算符

- **加法**：`+`
- **减法**：`-`
- **乘法**：`*`
- **除法**：`/`
- **取余**：`%`

示例代码：

```java
int a = 10;
int b = 3;
System.out.println("a + b = " + (a + b)); // 输出：a + b = 13
System.out.println("a - b = " + (a - b)); // 输出：a - b = 7
System.out.println("a * b = " + (a * b)); // 输出：a * b = 30
System.out.println("a / b = " + (a / b)); // 输出：a / b = 3
System.out.println("a % b = " + (a % b)); // 输出：a % b = 1
```

### 2.2.2 关系运算符

- **等于**：`==`
- **不等于**：`!=`
- **大于**：`>`
- **小于**：`<`
- **大于等于**：`>=`
- **小于等于**：`<=`

示例代码：

```java
int x = 5;
int y = 10;
System.out.println("x == y: " + (x == y)); // 输出：x == y: false
System.out.println("x != y: " + (x != y)); // 输出：x != y: true
System.out.println("x > y: " + (x > y));   // 输出：x > y: false
System.out.println("x < y: " + (x < y));   // 输出：x < y: true
System.out.println("x >= y: " + (x >= y)); // 输出：x >= y: false
System.out.println("x <= y: " + (x <= y)); // 输出：x <= y: true
```

### 2.2.3 逻辑运算符

- **与**：`&&`
- **或**：`||`
- **非**：`!`

示例代码：

```java
boolean a = true;
boolean b = false;
System.out.println("a && b: " + (a && b)); // 输出：a && b: false
System.out.println("a || b: " + (a || b)); // 输出：a || b: true
System.out.println("!a: " + (!a));         // 输出：!a: false
System.out.println("!b: " + (!b));         // 输出：!b: true
```

### 2.2.4 赋值运算符

- **赋值**：`=`
- **加赋值**：`+=`
- **减赋值**：`-=`
- **乘赋值**：`*=`
- **除赋值**：`/=`
- **取余赋值**：`%=`

示例代码：

```java
int num = 10;
num += 5; // 等价于 num = num + 5
System.out.println("num += 5: " + num); // 输出：num += 5: 15
num -= 3; // 等价于 num = num - 3
System.out.println("num -= 3: " + num); // 输出：num -= 3: 12
num *= 2; // 等价于 num = num * 2
System.out.println("num *= 2: " + num); // 输出：num *= 2: 24
num /= 4; // 等价于 num = num / 4
System.out.println("num /= 4: " + num); // 输出：num /= 4: 6
num %= 3; // 等价于 num = num % 3
System.out.println("num %= 3: " + num); // 输出：num %= 3: 0
```

## 2.3 控制流程：条件语句与循环语句

在编程中，控制流程语句用于控制程序的执行顺序。

### 2.3.1 条件语句

#### if语句

```java
int age = 18;
if (age >= 18) {
    System.out.println("You are an adult.");
} else {
    System.out.println("You are not an adult.");
}
```

#### if-else if-else语句

```java
int score = 85;
if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");
} else if (score >= 70) {
    System.out.println("Grade: C");
} else {
    System.out.println("Grade: D");
}
```

#### switch语句

```java
int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    case 4:
        System.out.println("Thursday");
        break;
    case 5:
        System.out.println("Friday");
        break;
    case 6:
        System.out.println("Saturday");
        break;
    case 7:
        System.out.println("Sunday");
        break;
    default:
        System.out.println("Invalid day");
        break;
}
```

### 2.3.2 循环语句

#### for循环

```java
for (int i = 0; i < 5; i++) {
    System.out.println("i: " + i);
}
```

#### while循环

```java
int count = 0;
while (count < 5) {
    System.out.println("count: " + count);
    count++;
}
```

#### do-while循环

```java
int num = 0;
do {
    System.out.println("num: " + num);
    num++;
} while (num < 5);
```

---

这就是第二章的详细内容，希望您觉得有趣且有用。如果有任何修改或添加的需求，请随时告诉我。
