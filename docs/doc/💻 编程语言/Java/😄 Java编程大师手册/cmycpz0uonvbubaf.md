---
title: 3、面向对象的Java
urlname: cmycpz0uonvbubaf
date: '2024-05-24 09:45:53'
updated: '2024-05-24 09:46:41'
description: '3.1 类与对象：Java的心脏Java是一种面向对象的编程语言，类和对象是其核心概念。3.1.1 类的定义类是对象的模板，定义了对象的属性和行为。在Java中，类使用class关键字定义。public class Person {     String name;     int age; ...'
---
## 3.1 类与对象：Java的心脏

Java是一种面向对象的编程语言，类和对象是其核心概念。

### 3.1.1 类的定义

类是对象的模板，定义了对象的属性和行为。在Java中，类使用`class`关键字定义。

```java
public class Person {
    String name;
    int age;

    void introduce() {
        System.out.println("Hi, my name is " + name + " and I am " + age + " years old.");
    }
}
```

在这个例子中，`Person`类有两个属性：`name`和`age`，以及一个方法：`introduce()`。

### 3.1.2 创建对象

对象是类的实例，可以通过`new`关键字来创建。

```java
public class Main {
    public static void main(String[] args) {
        Person person = new Person(); // 创建Person对象
        person.name = "Alice";
        person.age = 30;
        person.introduce(); // 输出：Hi, my name is Alice and I am 30 years old.
    }
}
```

### 3.1.3 构造方法

构造方法用于初始化对象，方法名与类名相同，没有返回值。

```java
public class Person {
    String name;
    int age;

    // 构造方法
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void introduce() {
        System.out.println("Hi, my name is " + name + " and I am " + age + " years old.");
    }
}

// 使用构造方法创建对象
public class Main {
    public static void main(String[] args) {
        Person person = new Person("Bob", 25);
        person.introduce(); // 输出：Hi, my name is Bob and I am 25 years old.
    }
}
```

## 3.2 继承：站在巨人的肩膀上

继承是面向对象编程的重要特性，它允许我们创建一个新类，该新类继承现有类的属性和方法。

### 3.2.1 基本语法

使用`extends`关键字实现继承。

```java
public class Animal {
    void eat() {
        System.out.println("This animal eats food.");
    }
}

public class Dog extends Animal {
    void bark() {
        System.out.println("The dog barks.");
    }
}

// 使用继承
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();  // 输出：This animal eats food.
        dog.bark(); // 输出：The dog barks.
    }
}
```

### 3.2.2 方法重写

子类可以重写父类的方法，使用`@Override`注解来标识。

```java
public class Animal {
    void eat() {
        System.out.println("This animal eats food.");
    }
}

public class Dog extends Animal {
    @Override
    void eat() {
        System.out.println("The dog eats bones.");
    }
}

// 方法重写
public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat();  // 输出：The dog eats bones.
    }
}
```

## 3.3 封装：隐藏实现的艺术

封装是将对象的属性和方法私有化，并提供公共的方法来访问和修改这些属性。

### 3.3.1 使用访问修饰符

Java提供了四种访问修饰符：`private`、`default`（无修饰符）、`protected`和`public`。

```java
public class Person {
    private String name;
    private int age;

    // 提供公共的getter和setter方法
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

### 3.3.2 使用封装

```java
public class Main {
    public static void main(String[] args) {
        Person person = new Person();
        person.setName("Charlie");
        person.setAge(28);
        System.out.println("Name: " + person.getName()); // 输出：Name: Charlie
        System.out.println("Age: " + person.getAge());   // 输出：Age: 28
    }
}
```

## 3.4 多态：形态多变的Java

多态是同一个方法在不同对象中表现出不同行为的能力。多态可以通过方法重写和接口实现。

### 3.4.1 方法重写中的多态

```java
public class Animal {
    void makeSound() {
        System.out.println("Some generic animal sound");
    }
}

public class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Bark");
    }
}

public class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Meow");
    }
}

// 多态示例
public class Main {
    public static void main(String[] args) {
        Animal myDog = new Dog();
        Animal myCat = new Cat();
        myDog.makeSound();  // 输出：Bark
        myCat.makeSound();  // 输出：Meow
    }
}
```

### 3.4.2 接口实现中的多态

```java
public interface Animal {
    void makeSound();
}

public class Dog implements Animal {
    @Override
    public void makeSound() {
        System.out.println("Bark");
    }
}

public class Cat implements Animal {
    @Override
    public void makeSound() {
        System.out.println("Meow");
    }
}

// 接口多态示例
public class Main {
    public static void main(String[] args) {
        Animal myDog = new Dog();
        Animal myCat = new Cat();
        myDog.makeSound();  // 输出：Bark
        myCat.makeSound();  // 输出：Meow
    }
}
```

