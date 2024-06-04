---
title: 4、Java中的基础类
urlname: eyigfudhdxqiuax4
date: '2024-05-24 09:46:42'
updated: '2024-05-24 09:49:13'
description: '4.1 字符串处理字符串是Java中常用的数据类型，用于表示和操作字符序列。Java提供了丰富的字符串处理类。4.1.1 创建字符串String str1 = "Hello, World!"; String str2 = new String("Hello, World!");4.1.2 字符...'
---
## 4.1 字符串处理

字符串是Java中常用的数据类型，用于表示和操作字符序列。Java提供了丰富的字符串处理类。

### 4.1.1 创建字符串

```java
String str1 = "Hello, World!";
String str2 = new String("Hello, World!");
```

### 4.1.2 字符串方法

#### 获取字符串长度

```java
String str = "Hello, World!";
int length = str.length();
System.out.println("Length: " + length); // 输出：Length: 13
```

#### 字符串拼接

```java
String firstName = "John";
String lastName = "Doe";
String fullName = firstName + " " + lastName;
System.out.println("Full Name: " + fullName); // 输出：Full Name: John Doe
```

#### 字符串比较

```java
String str1 = "Hello";
String str2 = "hello";
boolean isEqual = str1.equals(str2);
boolean isEqualIgnoreCase = str1.equalsIgnoreCase(str2);
System.out.println("isEqual: " + isEqual); // 输出：isEqual: false
System.out.println("isEqualIgnoreCase: " + isEqualIgnoreCase); // 输出：isEqualIgnoreCase: true
```

#### 查找子字符串

```java
String str = "Hello, World!";
int index = str.indexOf("World");
System.out.println("Index of 'World': " + index); // 输出：Index of 'World': 7
```

#### 截取子字符串

```java
String str = "Hello, World!";
String subStr = str.substring(7, 12);
System.out.println("Sub String: " + subStr); // 输出：Sub String: World
```

#### 转换大小写

```java
String str = "Hello, World!";
String upperStr = str.toUpperCase();
String lowerStr = str.toLowerCase();
System.out.println("Upper Case: " + upperStr); // 输出：Upper Case: HELLO, WORLD!
System.out.println("Lower Case: " + lowerStr); // 输出：Lower Case: hello, world!
```

## 4.2 集合框架：List、Set、Map

Java集合框架提供了一组接口和类，用于存储和操作一组数据。

### 4.2.1 List接口

`List`接口表示有序的元素集合，可以包含重复的元素。常用的实现类有`ArrayList`和`LinkedList`。

#### ArrayList示例

```java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");

        System.out.println("Fruits: " + fruits); // 输出：Fruits: [Apple, Banana, Orange]

        fruits.remove("Banana");
        System.out.println("After removal: " + fruits); // 输出：After removal: [Apple, Orange]

        String firstFruit = fruits.get(0);
        System.out.println("First Fruit: " + firstFruit); // 输出：First Fruit: Apple
    }
}
```

### 4.2.2 Set接口

`Set`接口表示不包含重复元素的集合。常用的实现类有`HashSet`和`TreeSet`。

#### HashSet示例

```java
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<String> fruits = new HashSet<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add("Apple"); // 重复添加不会生效

        System.out.println("Fruits: " + fruits); // 输出：Fruits: [Apple, Banana, Orange]
    }
}
```

### 4.2.3 Map接口

`Map`接口表示键值对映射。常用的实现类有`HashMap`和`TreeMap`。

#### HashMap示例

```java
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> fruitPrices = new HashMap<>();
        fruitPrices.put("Apple", 3);
        fruitPrices.put("Banana", 2);
        fruitPrices.put("Orange", 5);

        System.out.println("Fruit Prices: " + fruitPrices); // 输出：Fruit Prices: {Apple=3, Banana=2, Orange=5}

        int applePrice = fruitPrices.get("Apple");
        System.out.println("Price of Apple: " + applePrice); // 输出：Price of Apple: 3

        fruitPrices.remove("Banana");
        System.out.println("After removal: " + fruitPrices); // 输出：After removal: {Apple=3, Orange=5}
    }
}
```

## 4.3 异常处理：失败的艺术

异常处理是指程序在运行过程中出现错误时的处理机制。Java通过`try-catch`块来处理异常。

### 4.3.1 基本语法

#### try-catch

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // 可能抛出ArithmeticException
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Division by zero is not allowed."); // 输出：Error: Division by zero is not allowed.
        }
    }
}
```

#### try-catch-finally

```java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // 可能抛出ArithmeticException
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Division by zero is not allowed."); // 输出：Error: Division by zero is not allowed.
        } finally {
            System.out.println("This block is always executed."); // 输出：This block is always executed.
        }
    }
}
```

### 4.3.2 自定义异常

可以通过继承`Exception`类来创建自定义异常。

```java
class CustomException extends Exception {
    public CustomException(String message) {
        super(message);
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            throw new CustomException("This is a custom exception.");
        } catch (CustomException e) {
            System.out.println("Caught custom exception: " + e.getMessage()); // 输出：Caught custom exception: This is a custom exception.
        }
    }
}
```
