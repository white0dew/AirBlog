---
title: 8、Java 8新特性
urlname: uey01tcc9noh9y0w
date: '2024-05-24 09:47:28'
updated: '2024-05-24 09:57:04'
description: Java 8引入了许多强大且实用的新特性，使得Java编程更加简洁和高效。本章将介绍其中一些最重要的特性。8.1 Lambda表达式与函数式编程Lambda表达式是Java 8引入的一种新语法，用于实现函数式编程。它允许你以更简洁的方式来表示匿名函数。8.1.1 Lambda表达式的语法Lam...
---
Java 8引入了许多强大且实用的新特性，使得Java编程更加简洁和高效。本章将介绍其中一些最重要的特性。

## 8.1 Lambda表达式与函数式编程

Lambda表达式是Java 8引入的一种新语法，用于实现函数式编程。它允许你以更简洁的方式来表示匿名函数。

### 8.1.1 Lambda表达式的语法

Lambda表达式的基本语法如下：

```java
(parameters) -> expression

// 或者

(parameters) -> { statements; }
```

#### 示例

```java
// 使用Lambda表达式实现Runnable接口
Runnable runnable = () -> {
    for (int i = 0; i < 5; i++) {
        System.out.println("Hello from Lambda Runnable!");
    }
};

// 启动线程
new Thread(runnable).start();
```

#### 使用Lambda表达式替代匿名类

```java
// 使用匿名类
Comparator<String> comparator1 = new Comparator<String>() {
    @Override
    public int compare(String s1, String s2) {
        return s1.compareTo(s2);
    }
};

// 使用Lambda表达式
Comparator<String> comparator2 = (s1, s2) -> s1.compareTo(s2);

// 使用Lambda表达式的Comparator进行排序
List<String> list = Arrays.asList("apple", "banana", "cherry");
Collections.sort(list, comparator2);
System.out.println(list); // 输出：[apple, banana, cherry]
```

### 8.1.2 方法引用

方法引用是Lambda表达式的一种简洁语法，用于直接引用现有的方法或构造函数。

#### 四种方法引用类型

1. 静态方法引用：`ClassName::staticMethodName`
2. 实例方法引用：`instance::instanceMethodName`
3. 对象的任意实例的方法引用：`ClassName::instanceMethodName`
4. 构造函数引用：`ClassName::new`

#### 示例

```java
// 使用静态方法引用
Function<String, Integer> parseInt = Integer::parseInt;
Integer num = parseInt.apply("123");
System.out.println(num); // 输出：123

// 使用实例方法引用
String str = "Hello, World!";
Supplier<Integer> stringLength = str::length;
System.out.println(stringLength.get()); // 输出：13

// 使用构造函数引用
Supplier<List<String>> listSupplier = ArrayList::new;
List<String> list = listSupplier.get();
list.add("apple");
System.out.println(list); // 输出：[apple]
```

## 8.2 Stream API：数据流处理

Stream API允许我们以声明式的方式对集合数据进行操作，如过滤、排序和聚合。

### 8.2.1 创建Stream

Stream可以通过集合、数组或生成函数创建。

#### 示例

```java
// 从集合创建Stream
List<String> list = Arrays.asList("apple", "banana", "cherry");
Stream<String> stream1 = list.stream();

// 从数组创建Stream
String[] array = {"apple", "banana", "cherry"};
Stream<String> stream2 = Arrays.stream(array);

// 使用Stream生成函数
Stream<String> stream3 = Stream.of("apple", "banana", "cherry");
```

### 8.2.2 常用操作

#### 过滤（filter）

```java
List<String> fruits = Arrays.asList("apple", "banana", "cherry", "date");
Stream<String> filteredFruits = fruits.stream()
                                      .filter(fruit -> fruit.startsWith("a"));
filteredFruits.forEach(System.out::println); // 输出：apple
```

#### 映射（map）

```java
List<String> fruits = Arrays.asList("apple", "banana", "cherry");
Stream<Integer> fruitLengths = fruits.stream()
                                     .map(String::length);
fruitLengths.forEach(System.out::println); // 输出：5, 6, 6
```

#### 归约（reduce）

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
int sum = numbers.stream()
                 .reduce(0, Integer::sum);
System.out.println(sum); // 输出：15
```

#### 聚合操作

```java
List<String> fruits = Arrays.asList("apple", "banana", "cherry", "date");
long count = fruits.stream()
                   .filter(fruit -> fruit.length() > 5)
                   .count();
System.out.println(count); // 输出：2（banana和cherry）
```

## 8.3 Optional：优雅的空指针处理

`Optional`类是一个容器类，用于表示可能包含或不包含值的对象，通过显式地处理null值，避免空指针异常。

### 8.3.1 创建Optional对象

#### 示例

```java
// 创建空的Optional
Optional<String> empty = Optional.empty();

// 使用非null值创建Optional
Optional<String> nonEmpty = Optional.of("Hello");

// 使用可能为null的值创建Optional
Optional<String> nullable = Optional.ofNullable(null);
```

### 8.3.2 使用Optional对象

#### 示例

```java
Optional<String> optional = Optional.of("Hello, World!");

// 检查是否有值
if (optional.isPresent()) {
    System.out.println(optional.get());
}

// 使用ifPresent进行消费
optional.ifPresent(value -> System.out.println("Value: " + value));

// 设置默认值
String defaultValue = optional.orElse("Default Value");
System.out.println(defaultValue); // 输出：Hello, World!

// 使用orElseGet提供默认值
String defaultValue2 = optional.orElseGet(() -> "Default Value");
System.out.println(defaultValue2); // 输出：Hello, World!

// 使用orElseThrow抛出异常
String value = optional.orElseThrow(() -> new RuntimeException("Value is not present"));
System.out.println(value); // 输出：Hello, World!
```

### 8.3.3 Optional的链式操作

#### 示例

```java
Optional<String> optional = Optional.of("Hello, World!");

// 链式操作
optional.map(String::toUpperCase)
        .filter(value -> value.startsWith("HELLO"))
        .ifPresent(System.out::println); // 输出：HELLO, WORLD!
```

