---
title: 4/15 腾讯面试官考了我Spring的AOP
urlname: gq8mqmknp0ciuwvr
date: '2024-06-13 21:14:40'
updated: '2024-06-13 21:14:48'
description: 最近腾讯云智基础平台的实习机会火爆异常，据说他们的面试题目广泛且深入，特别是对于Java相关的技术栈，涵盖了Spring的IOC和AOP，循环依赖的解决方法，以及类加载机制等。一位名叫“讲义气的小太阳在努力”的同学分享了自己的面试经历，让我们一起来看看他是如何应对的，也许能给打算申请的你一些灵...
---
最近腾讯云智基础平台的实习机会火爆异常，据说他们的面试题目广泛且深入，特别是对于Java相关的技术栈，涵盖了Spring的IOC和AOP，循环依赖的解决方法，以及类加载机制等。一位名叫“讲义气的小太阳在努力”的同学分享了自己的面试经历，让我们一起来看看他是如何应对的，也许能给打算申请的你一些灵感呢。

【提醒】你将复习到以下知识点：

- Spring框架的IOC和AOP
- 解决Spring循环依赖的三级缓存机制
- 类加载器以及双亲委派模型
- ArrayList与LinkedList的区别
- IO与NIO的区别

![](https://oss1.aistar.cool/elog-offer-now/53599936f96c8421c420da2ec2183891.jpeg)

**面试官**: 你好，欢迎来到腾讯云的面试。请你先自我介绍一下。

**求职者**: 大家好，我是***

**面试官**: 好的，听起来你有不少项目经验。能不能先讲讲你是如何在项目中使用自定义注解和AOP的？

**求职者**: 当然，我在项目中通过自定义注解来定义特定的业务逻辑，比如一个权限校验的注解。然后结合Spring的AOP，我会在运行时对这些注解标注的方法进行拦截，执行权限校验的切面逻辑。

**面试官**: 很不错，那你能详细解释一下AOP和IOC在Spring框架中是如何工作的吗？

**求职者**: 当然可以。**IOC（控制反转）**是一种设计原则，可以用来减低计算机代码之间的耦合度。在Spring框架中，IOC容器负责实例化、配置和组装对象。而**AOP（面向切面编程）**则允许我们对某些方法或字段进行横切逻辑的插入，而不需要修改实际的业务逻辑代码。这都是通过Spring Framework提供的特殊配置和编程方式来完成的。

**面试官**: 对，这是Spring核心功能之一。那在使用Spring时，你是怎样解决循环依赖的问题的？

**求职者**: 在Spring中，循环依赖是指两个或者更多的bean相互依赖，形成闭环，这在创建bean的时候会导致问题，因为在创建一个bean之前，它依赖的bean必须先创建。Spring解决这个问题的方法是通过使用**三级缓存**。在创建bean的过程中，Spring容器会将创建中的bean的一个原始版本放在一个缓存中，这样如果另一个bean需要依赖于正在创建中的bean，它就可以使用这个原始版本来完成自己的创建，从而打破循环依赖。

**面试官**: 说得很清晰。那你能深入讲讲Spring的三级缓存吗？

**求职者**: 当然。Spring的三级缓存包括**一级缓存**、**二级缓存**和**三级缓存**。一级缓存是一个单例池，用于存放完全初始化好的bean；二级缓存是早期暴露对象的缓存，存放的是bean的早期引用；三级缓存则是存放bean工厂对象，用来解决循环依赖问题。在bean的创建过程中，如果发现有循环依赖的情况，Spring会通过三级缓存来进行处理，以确保每个bean都能够被正确创建。

**面试官**: 非常好。那关于AOP，你能详细解释一下它的实现机制和应用场景吗？

**求职者**: AOP的实现机制主要是通过代理模式。Spring AOP默认使用JDK动态代理来为目标对象创建代理，如果目标对象实现了接口的话。如果目标对象没有实现接口，则会使用CGLIB库来创建代理对象。AOP可以应用于日志记录、权限校验、事务处理等多种场景，它可以将这些跨越应用程序多个部分的关注点模块化成特殊的类，这些类被称为切面。

**面试官**: 好的，你对AOP的理解非常到位。现在我们切换到Java的基础上，你能解释一下**类加载器以及双亲委派机制**吗？ 

**面试官**: 这个基类很好，那么我们对加减乘除的操作该如何实现呢？

**求职者**: 好的，我们会对`Operation`类进行继承，创建`Add`、`Sub`、`Mul`、`Div`等子类，每个子类都会重写`getResult`方法，实现具体的计算逻辑。例如，`Add`类的`getResult`方法会返回`numberA`和`numberB`的和。

```java
public class Add extends Operation {
    public double getResult() {
        double result = 0;
        result = numberA + numberB;
        return result;
    }
}
```

**面试官**: 明白了，这样我们就可以通过创建不同的子类实例来进行不同的计算。那么，如何决定创建哪种子类的实例呢？

**求职者**: 这就是简单工厂模式的主要内容了。我们会创建一个`OperationFactory`类，它包含一个静态方法`createOperation`，这个方法根据传入的运算符来决定创建哪种`Operation`子类的实例。

```java
public class OperationFactory {
    public static Operation createOperation(String operate) {
        Operation oper = null;
        switch (operate) {
            case "+":
                oper = new Add();
                break;
            case "-":
                oper = new Sub();
                break;
            case "*":
                oper = new Mul();
                break;
            case "/":
                oper = new Div();
                break;
        }
        return oper;
    }
}
```

**面试官**: 我看明白了，`OperationFactory`类就是我们的工厂，我们根据需要制造出不同的`Operation`子类的实例。那么，用这种方式有什么优点？

**求职者**: 使用简单工厂模式的主要优点就是**可以实现对象的创建和使用分离**，客户端不需要关心对象是如何创建的，只需要知道如何使用。此外，当需要添加新的运算操作时，我们只需要在工厂类中添加一个新的case即可，不需要修改客户端代码，这符合**开放封闭原则**。

**面试官**: 那这个模式有什么缺点呢？

**求职者**: 其实主要的问题就是，由于工厂类集中了所有实例的创建逻辑，一旦需要添加新的类，就可能需要修改工厂类的代码，这在一定程度上违反了**开放封闭原则**。因此我们在实际项目中可能会使用工厂方法模式或者抽象工厂模式，来解决这个问题。

**面试官**: 非常好，从代码层面和实际应用层面详细地解释了简单工厂模式，我对你的理解和应用深度十分满意。现在，我们来聊聊你刚刚提到的工厂方法模式和抽象工厂模式，你能简单介绍一下这两个模式吗？

**求职者**: 当然，**工厂方法模式**是简单工厂模式的一个进一步抽象和推广。在工厂方法模式中，一个抽象产品类对应一个抽象工厂类，具体的产品子类对应具体的工厂子类。这样当系统扩展新的产品时，无需修改现有系统代码，只需要添加新的产品类和对应的工厂类即可。这种模式给系统带来了更好的**可扩展性**和**可维护性**。

```java
public interface OperationFactory {
    Operation createOperation();
}

public class AddFactory implements OperationFactory {
    public Operation createOperation() {
        return new Add();
    }
}
```

而**抽象工厂模式**则是工厂方法模式的进一步推广。当有多个产品族，且产品族中存在多个产品时，抽象工厂模式可以在一个工厂类中提供创建多个产品实例的方法。这样就可以创建出多个系列的产品，每个系列的产品由同一个工厂创建。这样不仅可以保持客户端与具体产品的解耦，还可以保持系列产品之间的一致性。

```java
public interface AbstractFactory {
    Operation createAddOperation();
    Operation createSubOperation();
    // 可以添加更多的方法来创建其他操作
}

public class ConcreteFactory implements AbstractFactory {
    public Operation createAddOperation() {
        return new Add();
    }
    public Operation createSubOperation() {
        return new Sub();
    }
    // 实现创建其他操作的方法
}
```

**面试官**: 这个讲解非常到位。既然提到了设计模式和类的创建，我们不妨再深入一点，说说你对**单例模式**的理解，以及如何在java中实现一个线程安全的单例模式。

**求职者**: 单例模式是一种确保一个类只有一个实例，并提供该实例的全局访问点的模式。在Java中实现线程安全的单例模式有多种方式。最简单的一种是使用**饿汉式**，即在类加载时就创建实例。但这种方式不能实现懒加载。为了实现懒加载并保证线程安全，我们可以使用**双重检查锁定（Double-Checked Locking）**或者**静态内部类**的方式。

使用双重检查锁定时，我们会在实例创建方法中进行两次null检查，确保只有第一次调用时才创建实例，这样既保证了懒加载，也保证了线程安全。

```java
public class Singleton {
    private volatile static Singleton instance;
    private Singleton() {}
    
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

而使用静态内部类的方式，是利用Java类加载机制保证实例的唯一性和线程安全，同时实现懒加载。

```java
public class Singleton {
    private static class SingletonHolder {
        private static final Singleton INSTANCE = new Singleton();
    }
    private Singleton() {}
    
    public static Singleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}
```

**面试官**: 很好，你对单例模式的理解和代码实现都非常专业。现在，我们聊一聊Java中的集合。你能告诉我**ArrayList和LinkedList的区别**，以及在什么情况下会选择使用它们吗？

**求职者**: 当然可以。**ArrayList** 和 **LinkedList** 是Java中两种常用的List实现，它们在内部结构和性能特性上有所不同。

**ArrayList** 是基于动态数组的数据结构，它允许快速的随机访问。因为数据是连续存储的，所以可以直接通过索引来快速访问对应的元素。但是，ArrayList在列表中间插入或删除元素时可能效率较低，因为这需要移动元素来填补空间或创建空间。

```java
List<Integer> arrayList = new ArrayList<>();
arrayList.add(1); // 添加元素
int elem = arrayList.get(0); // 快速随机访问
```

与此相反，**LinkedList** 是基于双向链表的数据结构，它支持高效的元素插入和删除操作，特别是在List的开头或结尾进行操作，因为不需要移动其他元素。但是，LinkedList的随机访问需要顺序遍历，所以访问速度慢于ArrayList。

```java
List<Integer> linkedList = new LinkedList<>();
linkedList.add(1); // 添加元素
linkedList.remove(0); // 移除第一个元素，效率高
```

根据这些特性，我们通常会在需要频繁随机访问列表元素时选择使用**ArrayList**，而在需要频繁插入和删除操作时，尤其是在列表的头部或尾部，会优先选择**LinkedList**。

**面试官**: 很好，你描述了两种List的使用场景和原因。那你能解释一下**IO和NIO的区别**及它们各自的使用场景吗？

**求职者**: 当然。**IO**（Input/Output）指的是Java的标准IO，它主要是面向流的编程，每次读写操作都会阻塞，直到数据准备就绪。**NIO**（New Input/Output）是Java提供的一种新的IO API，它支持非阻塞的方式，可以进行缓冲操作，拥有更高的效率和更好的资源利用率。

IO是阻塞的，不管是读操作还是写操作，如果没有数据可读或者可写，线程都会阻塞在那里。而NIO是非阻塞的，它可以使用**选择器(Selector)**来监听多个通道的事件，如数据到达、连接打开等，从而让单个线程管理多个并发连接。

在需要管理多个并发连接，而每个连接的数据量都比较小的情况下，推荐使用NIO，因为这样可以提高系统资源的使用率，提升效率。而在连接数较少，但是每个连接上的数据量大，或者通信的延迟性不是非常关键的场景下，可以使用IO。

**面试官**: 非常详细的回答。现在让我们回到算法问题。在面试中你提到了在一次循环中完成数组的排序。尽管你没有当场给出解答，现在你有想法了吗？或者，你能写一个简单的快速排序算法吗？

**求职者**: 是的，我可以写一个快速排序的算法。快速排序是一种分而治之的策略，它通过递归的方式将数组分为较小的数组，然后进行排序。快速排序算法的基本思想是选择一个元素作为基准，然后把数组中所有小于基准的元素放到基准的左边，所有大于基准的元素放到基准的右边，然后对左边和右边的两个子数组再次进行排序。

```java
public class QuickSort {
    public void sort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            sort(arr, low, pivotIndex - 1);
            sort(arr, pivotIndex + 1, high);
        }
    }
    
    private int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}
```

**面试官**: 很好，快速排序是一种效率很高的排序算法，你实现得很好。最后，有没有什么想反问的？

**求职者**: 是的，我注意到职位描述中提到了主要使用Golang进行云平台的开发。我想知道，腾讯云智基础平台在Golang开发方面有哪些具体的应用场景和技术挑战？

**面试官**: 非常好的问题。我们腾讯云智基础平台使用Golang主要是因为它在并发处理、内存管理和快速编译方面的优势，这对于云平台的高性能和高可用性要求是非常关键的。具体到应用场景，我们使用Golang开发了包括但不限于云资源管理、微服务架构支持、以及大数据处理等一系列的服务和工具。 在技术挑战方面，随着服务规模的扩大，我们面临着服务管理和微服务治理的挑战，如服务发现、负载均衡、熔断限流等问题。此外，高并发下的性能优化、内存泄露排查也是我们需要不断解决的技术难题。 

**面试官**: 对了，既然你对Golang感兴趣，我们团队非常欢迎有兴趣在这方面深入探索和解决实际问题的同学。你有什么特别想了解或者关注的技术方向吗？ 

**求职者**: 感谢您的分享。我特别感兴趣的是微服务架构下如何确保服务的稳定性和高可用性，以及如何有效地管理和监控大规模的服务。如果有机会的话，我也很想深入了解Golang在微服务架构中的最佳实践和模式。

**面试官**: 很好，这些正是我们团队目前关注和努力的方向。如果你加入我们，将有机会与团队成员一起探索这些问题的解决方案，我们也会提供必要的培训和技术支持，帮助你快速成长。

**面试官**: 最后，我想说我们非常欣赏你对技术的热情和探索精神。这次面试我很满意，你的技术基础扎实，思维活跃，对问题的理解和分析都非常到位。接下来，我们的HR会与你联系，讨论后续的流程。再次感谢你今天的参与，期待未来有机会与你一起工作。

**求职者**: 非常感谢这次面试的机会以及您的分享和鼓励。我也非常期待能够加入腾讯云智基础平台的团队，一起面对新的挑战，实现更多的技术突破。谢谢！ 

