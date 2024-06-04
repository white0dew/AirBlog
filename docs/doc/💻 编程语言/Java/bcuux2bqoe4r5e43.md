---
title: Java Spring三大特性
urlname: bcuux2bqoe4r5e43
date: '2024-05-24 12:59:02'
updated: '2024-05-28 12:28:14'
description: 本文主要讲述，Java 三大特性：IoC、DI、AOP。一、控制反转（IoC）1. 什么是控制反转控制反转（IoC，Inversion of Control）是一种设计思想，主要用于将对象的创建和控制权交给容器管理，而不是在对象内部主动控制。这种方式实现了高内聚、低耦合。传统模式：资源的主控权...
---
本文主要讲述，Java 三大特性：IoC、DI、AOP。
## 一、控制反转（IoC）

### 1. 什么是控制反转

控制反转（IoC，Inversion of Control）是一种设计思想，主要用于将对象的创建和控制权交给容器管理，而不是在对象内部主动控制。这种方式实现了高内聚、低耦合。

- **传统模式**：资源的主控权在类中，类需要哪一项资源直接`new`出来。
- **IoC模式**：类所需的资源由Spring提供，类被动接收资源，资源的控制权被反转。

Spring框架控制的资源全部放置在Spring的底层容器中，这个容器被称为IoC容器。

```xml
<beans>
    <!-- bean标签定义Spring中的资源，受此标签定义的资源将受到Spring控制 -->
    <bean></bean>
</beans>
```

### 2. IoC能做什么

IoC并不是一种技术，而是一种思想，它指导我们设计出松耦合、更优良的程序。传统应用中类与类之间高耦合，难于测试；而有了IoC容器后，把创建和查找依赖对象的控制权交给容器，实现松散耦合，方便测试和功能复用，使得程序结构更灵活。

### 3. IoC和DI

依赖注入（DI，Dependency Injection）是控制反转的一种实现方式。通过DI，组件之间的依赖关系由容器在运行期决定，动态将依赖关系注入到组件中。通过简单配置即可指定目标需要的资源，无需关注具体的实现。

```xml
<bean>
    <!-- property标签：使用set方法的形式为bean提供资源 -->
    <property />
</bean>
```

注：为bean中的属性注入资源时，要求该属性必须提供可访问的set方法。

## 二、依赖注入（DI）

### 1. 什么是依赖注入

依赖注入（DI）是通过容器在运行期动态地将某个依赖关系注入到组件中。依赖注入的目的是提升组件重用的频率，并为系统搭建灵活、可扩展的平台。

### 2. DI的实例

依赖注入有多种方式，如构造器注入和setter方法注入。

```xml
<bean id="exampleBean" class="com.example.ExampleBean">
    <property name="exampleProperty" value="exampleValue"/>
</bean>
```

代码示例：

```java
public class ExampleBean {
    private String exampleProperty;

    public void setExampleProperty(String exampleProperty) {
        this.exampleProperty = exampleProperty;
    }
}
```

### 3. IoC和DI的关系

IoC和DI其实是同一个概念的不同角度描述。IoC更强调控制权的转移，而DI则更具体地描述了依赖关系的动态注入。

## 三、AOP编程

### 1. 什么是AOP

面向切面编程（AOP，Aspect Oriented Programming）弥补了面向对象编程（OOP）的不足，基于OOP进行横向开发。AOP关注OOP中的共性功能，围绕这些共性功能进行开发。

### 2. AOP的优点

- **提高代码的可重用性**：共性功能可以单独提取并复用。
- **业务代码编码更简洁**：业务逻辑清晰，减少重复代码。
- **业务代码维护更高效**：修改共性功能时，只需修改切面代码。
- **业务功能扩展更便捷**：增加新功能时，可以通过新增切面实现。

### 3. AOP术语

- **连接点（JoinPoint）**：程序执行过程中的特定位置，如方法调用前、后等。
- **通知（Advice）**：在连接点处执行的代码。
- **切入点（PointCut）**：定义在哪些连接点上织入通知。
- **通知器（Advisor）**：切入点和通知的结合。
- **切面（Aspect）**：切入点和通知的结合。
- **织入（Weaving）**：将切面代码织入到目标对象的过程。

### 4. AOP示例

定义一个切面类：

```java
@Aspect
@Component
public class BuyAspectJ {
    @Before("execution(* com.example.IBuy.buy(..))")
    public void beforeBuy() {
        System.out.println("准备购买...");
    }
}
```

使用AOP，实现如下效果：

```java
public class AppTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        Boy boy = context.getBean("boy", Boy.class);
        Girl girl = context.getBean("girl", Girl.class);
        boy.buy();
        girl.buy();
    }
}
```

代码输出：

```
准备购买...
男孩买了一个游戏机
准备购买...
女孩买了一件漂亮的衣服
```

### 5. 总结

- **IoC**：控制反转，将对象创建和管理的控制权交给容器。
- **DI**：依赖注入，通过容器动态注入依赖对象。
- **AOP**：面向切面编程，关注共性功能，提升代码重用性。

参考链接：
[Spring IoC](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans)
[Spring AOP](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#aop)
