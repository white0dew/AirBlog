---
title: 一文搞懂Java注解
urlname: kr08pwsfxwyvmygv
date: '2024-05-24 13:00:06'
updated: '2024-05-28 12:28:26'
description: Java注解是Java 5引入的一种新功能，用于为Java代码提供元数据。作为元数据，注解不直接影响代码的执行，但有些类型的注解可以用于此目的。注解为我们在代码中添加信息提供了一种形式化的方法，帮助我们更快捷地编写代码。注解的作用注解主要有以下四个作用：生成文档：将元数据生成为Javadoc文...
---
Java注解是Java 5引入的一种新功能，用于为Java代码提供元数据。作为元数据，注解不直接影响代码的执行，但有些类型的注解可以用于此目的。注解为我们在代码中添加信息提供了一种形式化的方法，帮助我们更快捷地编写代码。

### 注解的作用

注解主要有以下四个作用：

1. **生成文档**：将元数据生成为Javadoc文档。
2. **编译检查**：编译器在编译阶段会对代码进行检查，例如`@Override`注解会提示编译器查看其是否重写了父类的方法。
3. **编译时动态处理**：用于动态生成代码，例如一些帮助类、方法，通过注解实现自动生成。
4. **运行时动态处理**：使用反射来注入实例。

### Java提供的三种注解

1. **标准注解**：Java自带的注解，如`@Override`, `@Deprecated`, `@SuppressWarnings`等。
2. **元注解**：用于修饰注解的注解，如`@Retention`, `@Target`, `@Inherited`, `@Documented`, `@Repeatable`等。
3. **自定义注解**：用户可以根据需要自定义注解。

### 常见注解

一些Java及Spring等常见的注解如下：

1. [**@Deprecated **](/Deprecated )** **：标注内容不再被建议使用。
2. [**@Override **](/Override )** **：只能标注方法，表示该方法覆盖父类中的方法。
3. [**@SuppressWarnings **](/SuppressWarnings )** **：标注内容产生的警告，编译器会对这些警告保持静默。
4. [**@interface **](/interface )** **：用于定义一个注解。
5. [**@Documented **](/Documented )** **：将标注内容包含到Javadoc中。
6. [**@Inherited **](/Inherited )** **：只能用来标注“Annotation类型”，它所标注的Annotation具有继承性。
7. [**@Retention **](/Retention )** **：指定注解的保留阶段是源码、字节码还是运行期。
8. [**@Target **](/Target )** **：指定注解的作用范围，如接口、类、字段、方法、构造函数等。
9. [**@Repeatable **](/Repeatable )** **：表明该注解可以多次作用于同一对象。

### 注解的生命周期

注解的生命周期分为以下三种：

- **SOURCE**：注解只在源码中存在，编译时会被丢弃。
- **CLASS**：注解在字节码文件中存在，但在运行时会被丢弃。
- **RUNTIME**：注解在运行时也存在，JVM可以读取。

### Spring的一些重要注解

1. [**@Configuration **](/Configuration )** **：标注在类上，相当于Spring的XML配置文件中的`<beans>`，用来配置Spring容器。
2. [**@Bean **](/Bean )** **：标注在方法上，注册Bean对象，默认作用域为单例。
3. [**@ComponentScan **](/ComponentScan )** **：标注在类上，用于对组件进行扫描。
4. [**@Component **](/Component )** **：一般标注在类上，表明其是一个组件，告知Spring该类会创建Bean。
5. [**@Repository **](/Repository )** **：表明该对象是数据访问层使用的。
6. [**@Service **](/Service )** **：表明该对象是业务逻辑层使用的。
7. [**@Controller **](/Controller )** **：表明该对象在展现层使用。

### 依赖注入相关注解

1. [**@Resource **](/Resource )** **：自动依赖注入（Spring容器去找依赖），默认按照Name注入。
2. [**@Autowired **](/Autowired )** **：自动依赖注入（Spring容器去找依赖），按照Type注入。
3. [**@Inject **](/Inject )** **：手动依赖注入。

### 其他常见注解

1. [**@Profile **](/Profile )** **：指定类或方法在特定的Profile环境生效。
2. [**@Data **](/Data )** **：注在类上，提供类的get、set、equals、hashCode、canEqual、toString方法。
3. [**@AllArgsConstructor **](/AllArgsConstructor )** **：注在类上，提供类的全参构造。
4. [**@NoArgsConstructor **](/NoArgsConstructor )** **：注在类上，提供类的无参构造。
5. **@Log4j/**[**@Slf4j **](/Slf4j )** **：注在类上，提供对应的Logger对象，变量名为log。
6. [**@After **](/After )** **：表明该方法在其他方法执行之后执行。
7. [**@Before **](/Before )** **：表明该方法在其他方法执行之前执行。
8. [**@Around **](/Around )** **：表明该方法在其他方法执行之前和之后都执行。
9. [**@Conditional **](/Conditional )** **：类似于`if...else...then`，根据条件决定是否注册Bean。

### @Qualifier与[@Primary ](/Primary ) 

- [**@Primary **](/Primary )** **：在存在多个相同类型的Bean时，@Primary注解定义了优先选择的Bean。
- [**@Qualifier **](/Qualifier )** **：指定特定名称的类型注入。

### @Scope设置作用域

- [**@Scope **](/Scope )** **：可以将Bean的作用域设置为singleton、prototype、request、session、global session。

### @PostConstruct与[@PreDestroy ](/PreDestroy ) 

- [**@PostConstruct **](/PostConstruct )** **：在Bean初始化后运行一次，执行顺序在构造函数之后。
- [**@PreDestroy **](/PreDestroy )** **：在Bean销毁前运行一次，用于释放资源。

### 自定义注解

自定义注解可以减少代码量，使得代码结构更加简洁和清晰。例如：

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface LogExecutionTime {
}
```

结合AOP和反射的思想，可以优雅地实现自定义注解的处理逻辑。

参考资料：
[Java Annotations](https://docs.oracle.com/javase/tutorial/java/annotations/)
[Spring Framework Documentation](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-annotation-config)
