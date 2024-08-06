---
title: 京东秋招实习面经
urlname: cfd64u2k9y1i2kk9
date: '2024-08-02 19:13:22'
updated: '2024-08-02 22:35:47'
cover: 'https://cdn.nlark.com/yuque/__puml/254e87cf2b01fc509e44845a6d3b363d.svg'
description: 京东实习面经你之前说你的项目这边涉及大数据这块比较多，那你代码工程是怎么样的一个工程，就是直接用一些have的SQL去搞这种直接数据的开发，还是怎么去做的这种系统的编程。这个工程是怎么搭出来的对外提供什么接口，系统之间是怎么调接口的传输方式，就是说不同部门之间怎么去调一个服务Java通常使用什...
---
# 京东实习面经
你之前说你的项目这边涉及大数据这块比较多，那你代码工程是怎么样的一个工程，就是直接用一些have的SQL去搞这种直接数据的开发，还是怎么去做的这种系统的编程。这个工程是怎么搭出来的

对外提供什么接口，系统之间是怎么调接口的传输方式，就是说不同部门之间怎么去调一个服务

Java通常使用什么方式实现http的调用

http里面的get和post有什么区别

从controller到service都用到什么SpringMVC注解

举一些线程安全的例子

有了解哪些线程安全的数据结构吗

concurrentHashMap和synchronizedHashMap有什么区别

concurrentHashMap锁粒度

线城池的参数都是怎么去支撑线程池的运作的

拒绝策略都有哪些，实际都用过哪些

SpringBoot stater是什么，你有自己实现过吗？

redis数据结构都有哪些，你在项目中都用过哪些

重写和重载，返回值不一样算重载吗

# 参考回答
### 京东实习面经
#### 1. 你之前说你的项目这边涉及大数据这块比较多，那你代码工程是怎么样的一个工程，就是直接用一些have的SQL去搞这种直接数据的开发，还是怎么去做的这种系统的编程。这个工程是怎么搭出来的？
项目中，我们使用的工程方式是将数据处理和系统编程分开。首先，我们会用SQL进行数据的初步清洗和处理，然后将处理好的数据通过ETL（抽取、转换、加载）流程加载到数据仓库中。接下来，我们利用大数据框架如Hadoop、Spark进行更复杂的数据处理和分析。系统编程部分，我们使用Spring Boot构建后端服务，集成这些数据处理流程，实现自动化和模块化。
![](https://oss1.aistar.cool/elog-offer-now/22f029d44eac5bc0ac1893c1c41be2ef.svg)
#### 2. 对外提供什么接口，系统之间是怎么调接口的传输方式，就是说不同部门之间怎么去调一个服务？
对外提供的接口通常是RESTful API，传输方式主要是HTTP。不同部门之间通过RESTful API进行服务调用，数据传输格式一般为JSON或XML。在需要高性能和高并发的情况下，我们还会使用消息队列（如RabbitMQ、Kafka）进行异步通信。
![](https://oss1.aistar.cool/elog-offer-now/61b1908197f332b5f5a7fec61e35e55e.svg)
#### 3. Java通常使用什么方式实现HTTP的调用？
Java中实现HTTP调用的方式有很多，常用的是使用Apache HttpClient、OkHttp或Spring的RestTemplate进行HTTP请求的发送和接收。
#### 4. HTTP里面的GET和POST有什么区别？

- GET：用于请求数据，参数包含在URL中，通常用于查询操作，参数在URL中明文传输，长度有限制。
- POST：用于提交数据，参数包含在请求体中，通常用于提交表单、上传文件等操作，参数在请求体中传输，没有长度限制，较为安全。
#### 5. 从Controller到Service都用到什么SpringMVC注解？

- @Controller：标注一个类为控制器。
- @RequestMapping：配置URL映射。
- @GetMapping, @PostMapping：简化的请求映射注解。
- @Autowired：自动注入依赖。
- @Service：标注一个类为服务层组件。
- @Transactional：管理事务。
![](https://oss1.aistar.cool/elog-offer-now/e6b64252788d64050fdcd1e4829f117c.svg)
#### 6. 举一些线程安全的例子

- 使用`synchronized`关键字对方法或代码块加锁。
- 使用`ReentrantLock`进行显式锁定。
- 使用线程安全的集合类如`ConcurrentHashMap`、`CopyOnWriteArrayList`。
- 原子变量如`AtomicInteger`、`AtomicReference`。
#### 7. 有了解哪些线程安全的数据结构吗？

- `ConcurrentHashMap`
- `CopyOnWriteArrayList`
- `ConcurrentLinkedQueue`
- `BlockingQueue`（如`ArrayBlockingQueue`、`LinkedBlockingQueue`）
#### 8. ConcurrentHashMap和synchronizedHashMap有什么区别？

- `ConcurrentHashMap`：采用分段锁机制，锁的粒度较小，允许更高的并发度，性能更高。
- `synchronizedHashMap`：对整个Map加锁，锁的粒度较大，并发性能较低。
#### 9. ConcurrentHashMap锁粒度
`ConcurrentHashMap`使用的是分段锁（Segment），每个Segment包含一部分桶（Bucket），只有操作同一Segment的线程才会竞争同一个锁，提升并发性能。
![](https://oss1.aistar.cool/elog-offer-now/055b642fcf5603f634e066794ea09fab.svg)
#### 10. 线程池的参数都是怎么去支撑线程池的运作的？

- 核心线程数（corePoolSize）：线程池维护的最小线程数。
- 最大线程数（maximumPoolSize）：线程池允许的最大线程数。
- 存活时间（keepAliveTime）：空闲线程终止前的存活时间。
- 工作队列（workQueue）：用于存储等待执行的任务。
- 线程工厂（threadFactory）：用于创建新线程。
- 拒绝策略（RejectedExecutionHandler）：当任务无法执行时的处理策略。
#### 11. 拒绝策略都有哪些，实际都用过哪些？

- `AbortPolicy`：直接抛出RejectedExecutionException。
- `CallerRunsPolicy`：由调用线程处理该任务。
- `DiscardPolicy`：丢弃无法处理的任务。
- `DiscardOldestPolicy`：丢弃队列中最旧的任务。

实际项目中常用的是`CallerRunsPolicy`，保证任务不会丢失。
#### 12. SpringBoot Starter是什么，你有自己实现过吗？
Spring Boot Starter是一个方便的依赖描述符，封装了特定技术或框架的默认配置和依赖。我自己实现过自定义Starter，用于封装公司内部常用的配置和工具，简化项目初始化配置。
#### 13. Redis数据结构都有哪些，你在项目中都用过哪些？

- String
- List
- Set
- Sorted Set
- Hash
- Bitmap
- HyperLogLog

在项目中，常用的有String用于缓存单个值，Hash用于存储对象属性，List用于消息队列，Set用于去重，Sorted Set用于排行榜。
#### 14. 重写和重载，返回值不一样算重载吗？
重载（Overloading）是指在同一个类中，方法名相同但参数列表不同。返回值不同不算重载，必须是参数列表不同。重写（Overriding）是子类对父类方法的重新实现，方法签名必须相同。
