---
title: 6、Java并发编程
urlname: tkc45sgkfghf6cwq
date: '2024-05-24 09:47:02'
updated: '2024-05-24 09:51:33'
description: 并发编程是指同时执行多个任务，以提高程序的性能和响应速度。Java提供了丰富的并发编程工具和类。6.1 线程的创建与运行6.1.1 继承Thread类我们可以通过继承Thread类来创建线程。示例// 创建一个继承Thread类的自定义线程类 class MyThread extends Th...
---

并发编程是指同时执行多个任务，以提高程序的性能和响应速度。Java提供了丰富的并发编程工具和类。

## 6.1 线程的创建与运行

### 6.1.1 继承Thread类

我们可以通过继承`Thread`类来创建线程。

#### 示例

```java
// 创建一个继承Thread类的自定义线程类
class MyThread extends Thread {
    @Override
    public void run() {
        // run()方法中定义线程的具体任务
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + " - " + i);
            try {
                // 暂停线程1秒
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// 使用自定义线程类创建并启动线程
public class Main {
    public static void main(String[] args) {
        MyThread thread1 = new MyThread();
        MyThread thread2 = new MyThread();

        // 启动线程
        thread1.start();
        thread2.start();
    }
}
```

### 6.1.2 实现Runnable接口

我们还可以通过实现`Runnable`接口来创建线程，这种方式更灵活，因为它支持多继承。

#### 示例

```java
// 创建一个实现Runnable接口的自定义线程类
class MyRunnable implements Runnable {
    @Override
    public void run() {
        // run()方法中定义线程的具体任务
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + " - " + i);
            try {
                // 暂停线程1秒
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// 使用自定义Runnable类创建并启动线程
public class Main {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new MyRunnable());
        Thread thread2 = new Thread(new MyRunnable());

        // 启动线程
        thread1.start();
        thread2.start();
    }
}
```

## 6.2 并发工具类

Java提供了一些常用的并发工具类，帮助我们更好地管理线程。

### 6.2.1 Executors

`Executors`类用于创建和管理线程池。

#### 示例

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

// 创建一个实现Runnable接口的自定义任务类
class MyTask implements Runnable {
    @Override
    public void run() {
        // run()方法中定义任务的具体内容
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + " - " + i);
            try {
                // 暂停线程1秒
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// 使用Executors创建并管理线程池
public class Main {
    public static void main(String[] args) {
        // 创建固定大小的线程池
        ExecutorService executorService = Executors.newFixedThreadPool(2);

        // 提交任务给线程池执行
        executorService.submit(new MyTask());
        executorService.submit(new MyTask());

        // 关闭线程池
        executorService.shutdown();
    }
}
```

### 6.2.2 CountDownLatch

`CountDownLatch`是一个同步工具类，用于使一个或多个线程等待其他线程完成一组特定操作。

#### 示例

```java
import java.util.concurrent.CountDownLatch;

// 创建一个实现Runnable接口的自定义任务类
class Worker implements Runnable {
    private CountDownLatch latch;

    // 构造方法接收CountDownLatch对象
    public Worker(CountDownLatch latch) {
        this.latch = latch;
    }

    @Override
    public void run() {
        // run()方法中定义任务的具体内容
        System.out.println(Thread.currentThread().getName() + " is working");
        try {
            // 模拟任务执行时间
            Thread.sleep((int) (Math.random() * 1000));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        // 任务完成后，调用countDown()方法
        latch.countDown();
        System.out.println(Thread.currentThread().getName() + " finished working");
    }
}

// 使用CountDownLatch同步多个线程
public class Main {
    public static void main(String[] args) {
        // 创建CountDownLatch对象，设置计数为3
        CountDownLatch latch = new CountDownLatch(3);

        // 创建并启动多个Worker线程
        new Thread(new Worker(latch)).start();
        new Thread(new Worker(latch)).start();
        new Thread(new Worker(latch)).start();

        try {
            // 主线程等待所有Worker线程完成任务
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 所有Worker线程完成任务后，继续执行主线程
        System.out.println("All workers finished. Main thread continues.");
    }
}
```

## 6.3 Java内存模型与锁

Java内存模型（JMM）定义了Java程序中变量的读写规则和线程间的可见性。锁用于确保线程间的同步和数据一致性。

### 6.3.1 synchronized关键字

`synchronized`关键字用于方法或代码块，确保同一时间只有一个线程可以执行同步代码。

#### 示例

```java
// 创建一个共享资源类
class Counter {
    private int count = 0;

    // 使用synchronized方法确保线程安全
    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}

// 创建一个实现Runnable接口的自定义任务类
class IncrementTask implements Runnable {
    private Counter counter;

    // 构造方法接收Counter对象
    public IncrementTask(Counter counter) {
        this.counter = counter;
    }

    @Override
    public void run() {
        // run()方法中定义任务的具体内容
        for (int i = 0; i < 1000; i++) {
            counter.increment();
        }
    }
}

// 使用synchronized关键字同步线程操作
public class Main {
    public static void main(String[] args) {
        Counter counter = new Counter();

        // 创建并启动多个IncrementTask线程
        Thread thread1 = new Thread(new IncrementTask(counter));
        Thread thread2 = new Thread(new IncrementTask(counter));
        thread1.start();
        thread2.start();

        try {
            // 等待所有线程完成任务
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 获取并输出计数器的最终值
        System.out.println("Final count: " + counter.getCount());
    }
}
```

### 6.3.2 ReentrantLock

`ReentrantLock`是一个可重入的锁，提供了与`synchronized`相同的基本功能，但更灵活。

#### 示例

```java
import java.util.concurrent.locks.ReentrantLock;

// 创建一个共享资源类
class Counter {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();

    // 使用ReentrantLock确保线程安全
    public void increment() {
        lock.lock(); // 获取锁
        try {
            count++;
        } finally {
            lock.unlock(); // 释放锁
        }
    }

    public int getCount() {
        lock.lock(); // 获取锁
        try {
            return count;
        } finally {
            lock.unlock(); // 释放锁
        }
    }
}

// 创建一个实现Runnable接口的自定义任务类
class IncrementTask implements Runnable {
    private Counter counter;

    // 构造方法接收Counter对象
    public IncrementTask(Counter counter) {
        this.counter = counter;
    }

    @Override
    public void run() {
        // run()方法中定义任务的具体内容
        for (int i = 0; i < 1000; i++) {
            counter.increment();
        }
    }
}

// 使用ReentrantLock同步线程操作
public class Main {
    public static void main(String[] args) {
        Counter counter = new Counter();

        // 创建并启动多个IncrementTask线程
        Thread thread1 = new Thread(new IncrementTask(counter));
        Thread thread2 = new Thread(new IncrementTask(counter));
        thread1.start();
        thread2.start();

        try {
            // 等待所有线程完成任务
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 获取并输出计数器的最终值
        System.out.println("Final count: " + counter.getCount());
    }
}
```
