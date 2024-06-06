---
title: 第七章：面向对象编程
urlname: tbm5xx6o52l7wl3q
date: '2024-06-06 21:03:27'
updated: '2024-06-06 21:03:44'
description: 面向对象编程（OOP）是一种程序设计范式，它将程序结构化为由数据和行为组成的对象。PHP 支持面向对象编程，这使得代码更加模块化、易于维护和重用。在这一章中，我们将深入探讨 PHP 中的 OOP 概念及其应用。1. 类与对象类的定义与实例化类是对象的蓝图，定义了对象的属性和方法。对象是类的实例...
---
面向对象编程（OOP）是一种程序设计范式，它将程序结构化为由数据和行为组成的对象。PHP 支持面向对象编程，这使得代码更加模块化、易于维护和重用。在这一章中，我们将深入探讨 PHP 中的 OOP 概念及其应用。

## 1. 类与对象

### 类的定义与实例化

类是对象的蓝图，定义了对象的属性和方法。对象是类的实例，通过类来创建。

```php
<?php
class Car {
    public $color;
    public $model;

    public function __construct($color, $model) {
        $this->color = $color;
        $this->model = $model;
    }

    public function message() {
        return "My car is a " . $this->color . " " . $this->model . ".";
    }
}

$myCar = new Car("red", "Toyota");
echo $myCar->message();
?>
```

在上面的示例中，我们定义了一个 `Car` 类，并通过 `Car` 类创建了一个对象 `$myCar`。构造函数 `__construct` 用于初始化对象的属性。

### 类的属性与方法

属性是对象的变量，方法是对象的函数。我们可以通过类定义属性与方法。

```php
<?php
class Person {
    public $name;
    public $age;

    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }

    public function introduce() {
        return "Hi, I'm " . $this->name . " and I'm " . $this->age . " years old.";
    }
}

$person1 = new Person("Alice", 25);
echo $person1->introduce();
?>
```

### 构造函数与析构函数

构造函数 `__construct` 在对象创建时调用，用于初始化对象。析构函数 `__destruct` 在对象销毁时调用，用于清理资源。

```php
<?php
class Test {
    public function __construct() {
        echo "Constructor called\n";
    }

    public function __destruct() {
        echo "Destructor called\n";
    }
}

$testObj = new Test();
?>
```

## 2. 继承与多态

### 继承的基本概念

继承是面向对象编程的一个重要特性，允许我们创建一个新类，该类继承自已存在的类。新类称为子类，已存在的类称为父类。子类继承父类的属性和方法，并可以添加新的属性和方法。

```php
<?php
class Animal {
    public $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function makeSound() {
        return "Some generic sound";
    }
}

class Dog extends Animal {
    public function makeSound() {
        return "Bark";
    }
}

$dog = new Dog("Buddy");
echo $dog->makeSound(); // 输出：Bark
?>
```

### 方法重写与多态

子类可以重写父类的方法，以提供特定的实现。这种重写机制称为多态。

```php
<?php
class Cat extends Animal {
    public function makeSound() {
        return "Meow";
    }
}

$cat = new Cat("Whiskers");
echo $cat->makeSound(); // 输出：Meow
?>
```

### 使用 parent 关键字

子类可以使用 `parent` 关键字调用父类的方法。

```php
<?php
class Bird extends Animal {
    public function makeSound() {
        return parent::makeSound() . " but specifically chirp";
    }
}

$bird = new Bird("Tweety");
echo $bird->makeSound(); // 输出：Some generic sound but specifically chirp
?>
```

## 3. 接口与抽象类

### 接口的定义与实现

接口定义了一组方法，这些方法必须由实现接口的类来定义。接口不能包含具体的实现。

```php
<?php
interface Shape {
    public function area();
}

class Circle implements Shape {
    private $radius;

    public function __construct($radius) {
        $this->radius = $radius;
    }

    public function area() {
        return pi() * $this->radius * $this->radius;
    }
}

$circle = new Circle(5);
echo $circle->area(); // 输出：78.539816339745
?>
```

### 抽象类的定义与使用

抽象类是一种不能被实例化的类，它可以包含具体的实现和抽象的方法。抽象方法必须在子类中实现。

```php
<?php
abstract class Vehicle {
    abstract public function startEngine();

    public function honk() {
        return "Honking!";
    }
}

class Motorbike extends Vehicle {
    public function startEngine() {
        return "Motorbike engine started";
    }
}

$bike = new Motorbike();
echo $bike->startEngine(); // 输出：Motorbike engine started
echo $bike->honk(); // 输出：Honking!
?>
```

