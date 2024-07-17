---
title: C++多线程
urlname: vm62ytquukgy0sp8
date: '2024-05-24 13:05:57'
updated: '2024-05-24 13:06:08'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1716527165316-5b65a7b4-7ad5-44d5-bfd4-e238db553544.png'
description: '多线程学习笔记前言：这周学习学习了多线程并发的相关知识，写一个读书笔记以作记录。学习的教程是网易云课堂的：https://study.163.com/course/courseMain.htm?courseId=1006067356&trace_c_p_k2=217aa888da5741698...'
---
# **多线程学习笔记**

前言：这周学习学习了多线程并发的相关知识，写一个读书笔记以作记录。学习的教程是网易云课堂的：[https://study.163.com/course/courseMain.htm?courseId=1006067356&](https://study.163.com/course/courseMain.htm?courseId=1006067356&)_trace_c_p_k2_=217aa888da5741698cfb97e1e70009cd
更新：在最近的项目中使用到了多线程技术，发现有些知识遗漏或是不准确，已对下文进行更正和重新排版。2020/11/3

# **一、进程、线程、并发**

-  进程：简而言之就是一个运行的程序，如点开一个exe文件就打开了一个进程； 
-  线程：进程中的不同执行路径，即在一个进程中运行了多个功能；（每一个进程都至少包含有一个线程，即主线程，主线程与进程的关系是相互依存） 
-  并发：分为多线程和多进程，顾名思义就是多进程同时运行和多线程同时运行，如同时打开两个QQ客户端就是多进程，VStudio中多个窗口线程就是多线程并发； 

# **二、thread库**

以前由于系统环境的不同，如windows、linux，就需要选择不同的线程库进行代码编写，可移植性不高。

C++11之后有了标准的线程库：**std::thread**。

除此之外，C++还有另外三个库支持多线程编程，分别是**，，<condition_variable>和**，之后我会对其一一介绍，现在先来看看Thread库。

看看thread类，它是thread库多线程实现的基础。

## **构造函数**

从构造函数可以窥见“多线程”的一些实现思想。

**thread()默认构造函数**，创建一个空的 std::thread 执行对象（在线程池的实现中就需要提前创建一定数量的线程对象）；

**thread(Fn&& fn, Args&&...)**初始化构造函数，创建一个 **std::thread** 对象，该 std::thread 对象可被 joinable，新产生的线程**会调用 fn 函数（即可调用对象）**，该函数的参数由 args 给出。

**thread(const thread&) = delete**拷贝构造函数(被禁用)，意味着 std::thread 对象不可拷贝构造，这也可以理解，“线程”这个概念在同一时刻仅能由一个线程对象运行，所以不存在拷贝赋值之类的；

**thread(thread&& x)**转移/移动构造函数，，调用成功之后 x 不代表任何 std::thread 执行对象，相当于将“线程”的所有权转给了另外的线程对象。

下面这个例子就展示了如何创建线程：

```
//参考并稍加修改自博客：  https://blog.csdn.net/coolwriter/article/details/79883253
//example 1_1
#include <iostream>       // std::cout  
#include <thread>         // std::thread  
void func1()  
{  
    for (int i = 0; i != 10; ++i)  
    {  
        std::cout << "thread 1 print " << i << std::endl;  
    }  
}  

void func2(int n)  
{  
    std::cout << "thread 2 print " << n << std::endl;  
}  

int main()  
{  
    std::thread t1(func1);     
    std::thread t2(func2, 123);   
    std::cout << "main, foo and bar now execute concurrently...\n";  
    // synchronize threads:  
    t1.join();                // pauses until first finishes  
    t2.join();               // pauses until second finishes  
    std::cout << "thread 1 and htread 2 completed.\n";  
    system("pause");
    return 0;  
}
```

结果：

                 ![](https://oss1.aistar.cool/elog-offer-now/67bcc77db2bb01b0f670d7e785ee821e.png)

上述代码中，使用**两个重要成员函数。**

## **重要函数**

**join**，它可以阻塞主线程直到子线程执行完毕，即必须等待A.join()执行完毕，才会接着执行之后的代码；

**detach**，表示该线程和主线程分离，该线程被运行时库给接管，若是在linux环境下运行，会发现即便Ctrl+C退出了主线程，但是子线程依旧还在运行。

一旦线程执行完毕，它所分配的资源将会被释放。

另外，调用 detach 函数之后this不再代表任何的线程执行实例。

PS：值得一提的是，**多线程的调度机制可能会造成先创建的线程还未执行，而后面的线程就已经开始执行了**，比如上述例子在代码中的顺序应该是thread1 thread2 而后打印出main，但实际效果却并非如此，因此在多线程程序的编写要注意变量的互斥性，以及代码的鲁棒性。

至于其他的成员函数：

get_id：获取线程 ID，返回一个类型为 std::thread::id 的对象。

                 ![](https://oss1.aistar.cool/elog-offer-now/2fc55802ff98bde5c0e5307c538892e9.png)

joinable():检查线程是否可被 join。检查当前的线程对象是否表示了一个**活动的执行线程**，**由默认构造函数创建的线程是不能被 join 的**。

swap():Swap 线程，交换两个线程对象所代表的底层句柄即ID等资源，见下：

```
#include <iostream>
#include <thread>
#include <chrono>

void foo()
{
  std::this_thread::sleep_for(std::chrono::seconds(1));
}

void bar()
{
  std::this_thread::sleep_for(std::chrono::seconds(1));
}

int main()
{
  std::thread t1(foo);
  std::thread t2(bar);

  std::cout << "thread 1 id: " << t1.get_id() << std::endl;
  std::cout << "thread 2 id: " << t2.get_id() << std::endl;

  std::swap(t1, t2);

  std::cout << "after std::swap(t1, t2):" << std::endl;
  std::cout << "thread 1 id: " << t1.get_id() << std::endl;
  std::cout << "thread 2 id: " << t2.get_id() << std::endl;

  t1.swap(t2);

  std::cout << "after t1.swap(t2):" << std::endl;
  std::cout << "thread 1 id: " << t1.get_id() << std::endl;
  std::cout << "thread 2 id: " << t2.get_id() << std::endl;

  t1.join();
  t2.join();
}
```

结果如下：

                 ![](https://oss1.aistar.cool/elog-offer-now/6eb541f16e5ccb0c3cda7965cf0e448d.png)

yield: 当前线程放弃执行，操作系统调度另一线程继续执行。

sleep_until: 线程休眠至某个指定的时刻(time point)，该线程才被重新唤醒，详见[连接](https://blog.csdn.net/huhaoxuan2010/article/details/76034520)。

sleep_for: 线程休眠某个指定的时间片(time span)，该线程才被重新唤醒，不过由于线程调度等原因，实际休眠时间可能比 sleep_duration 所表示的时间片更长。

```
#include <iostream>
#include <chrono>
#include <thread>

int main()
{
  std::cout << "Hello waiter" << std::endl;
  std::chrono::milliseconds dura( 2000 );
  std::this_thread::sleep_for( dura );
  std::cout << "Waited 2000 ms\n";
}
```

# **三、mutex库**

## **互斥**

在介绍mutex之间，先简要介绍一下何为互斥。

互斥是指散布在不同任务之间的**若干程序片断，当某个任务运行其中一个程序片段时，其它任务就不能运行它们之中的任一程序片段，只能等到该任务运行完这个程序片段后才可以运行。**

最基本的场景就是：**一个公共资源同一时刻只能被一个进程或线程使用，多个进程或线程不能同时使用公共资源。**

mutex主要是对临界区进行互斥操作，防止多线程同时访问该资源，造成系统错误。

## **常用函数**

该库中所要使用的类及函数有以下这些：

```
mutex类4种
	   std::mutex，最基本的 Mutex 类。 
	   std::recursive_mutex，支持递归的 Mutex类。 
	   std::time_mutex，定时 Mutex 类。 
	   std::recursive_timed_mutex，定时递归Mutex 类。 

Lock 类（两种） 
	   std::lock_guard，方便线程对互斥量上锁；
       std::unique_lock，比unique更灵活；
       std::try_to_lock_t ，尝试同时对多个互斥量上锁。
       std::lock，可以同时对多个互斥量上锁。 
       std::call_once，如果多个线程需要同时调用某个函数，可以保证多个线程对该函数只调用一次。
```

在介绍这些函数之前，先提一个概念——“锁”。

什么是锁？

——简单的理解就是，谁拿到了锁，谁就资源去拿屋子的东西！

体现在多线程之中则是：只有某个线程拿到锁时，它才能访问和修改锁对应的资源，其他的任何线程都只有等待！

### **mutex类**

**std::mutex** 是最基本的互斥量，不支持递归地对 std::mutex 对象上锁，而 std::recursive_lock 则可以。

mutxe的成员函数：

1、构造函数，std::mutex**不允许拷贝构造**，不允许 move 拷贝，**开始产生的 mutex 对象是处于 unlocked 状态的**。

2、lock()，该线程将锁住互斥量。会发生下面 3 种情况：

-  如果该互斥量不被锁住，则调用线程将该互斥量锁住，直到调用 unlock之前，该线程一直拥有该锁。 
-  如果当前互斥量被其他线程锁住，则当前的调用线程被阻塞。 
-  如果当前互斥量被当前调用线程锁住，则会产生死锁。 

**PS：什么是死锁？**

多个线程各占据了一部分资源的锁，但是需要所有资源才可以继续运行，但是大家都不放所，如此相持的局面。——就好比江湖人士各有一片神功秘籍残片，但是人人都不愿意交给其他人，所有人都死盯着对方放手。

3、unlock()， 解锁，释放对互斥量的所有权。

4、try_lock()，尝试锁住互斥量，如果互斥量被其他线程占有，**则当前线程也不会被阻塞。**线程调用该函数也会出现下面 3 种情况：

- 如果当前互斥量没有被其他线程占有，则该线程锁住互斥量，直到该线程调用 unlock 释放互斥量。
- 如果当前互斥量被其他线程锁住，则当前调用线程返回 false，而并不会被阻塞掉。
- 如果当前互斥量被当前调用线程锁住，则会产生死锁。

**std::recursive_mutex** 与 std::mutex 一样，也是一种可以被上锁的对象，但是和 std::mutex 不同的是，recursive_mutex 允许**同一个线程对互斥量多次上锁（即递归上锁）**，来获得对互斥量对象的**多层所有权，**std::recursive_mutex **释放互斥量时需要调用与该锁层次深度相同次数的 unlock()**，可理解为 lock() 次数和 unlock() 次数相同，除此之外，std::recursive_mutex 的特性和 std::mutex 大致相同。

**std::time_mutex** 比 std::mutex 多了两个成员函数，	try_lock_for()，try_lock_until()。

- try_lock_for 函数接受一个时间范围，**表示在这一段时间范围之内线程如果没有获得锁则被阻塞住**（与 std::mutex 的 try_lock() 不同，**try_lock 如果被调用时没有获得锁则直接返回 false**），如果在此期间其他线程释放了锁，则该线程可以获得对互斥量的锁，如果超时（即在指定时间内还是没有获得锁），**则返回 false**。
- try_lock_until 函数则接受一个时间点作为参数，**在指定时间点未到来之前线程如果没有获得锁则被阻塞住**，如果在此期间其他线程释放了锁，则该线程可以获得对互斥量的锁，**如果超时（即在指定时间内还是没有获得锁）**，则返回 false。

### **lock类**

std::lock_gurad 是 C++11 中定义的模板类。

lock_guard 对象通常用于管理某个锁(Lock)对象，因此与 Mutex RAII 相关，方便线程对互斥量上锁，**即在某个 lock_guard 对象的声明周期内，它所管理的锁对象会一直保持上锁状态；而 lock_guard 的生命周期结束之后，它所管理的锁对象会被解锁**(注：类似 shared_ptr 等智能指针管理动态分配的内存资源)。

**在 lock_guard 对象构造时，传入的 Mutex 对象会被当前线程锁住。在lock_guard 对象被析构时，它所管理的 Mutex 对象会自动解锁，即不需要程序员手动调用 lock 和 unlock 对 Mutex 进行上锁和解锁操作**，这种情况下在程序抛出异常后先前已被上锁的 Mutex 对象可以正确进行解锁操作，极大地简化了程序员编写与 Mutex 相关的异常处理代码。

值得注意的是，lock_guard 对象并不负责管理 Mutex 对象的生命周期，lock_guard 对象只是简化了 Mutex 对象的上锁和解锁操作：即在某个 lock_guard 对象的声明周期内，它所管理的锁对象会一直保持上锁状态；而 lock_guard 的生命周期结束之后，它所管理的锁对象会被解锁。（一般是以{}来作为一个生命周期）

例如以下代码：

```
// 参考https://blog.csdn.net/coolwriter/article/details/79884298
// example  1-4 
#include <iostream>       // std::cout  
#include <thread>         // std::thread  
#include <mutex>          // std::mutex, std::lock_guard  
#include <stdexcept>      // std::logic_error  
std::mutex mtx;
void print_even(int x) {
	if (x % 2 == 0) std::cout << x << " is even\n";
	else throw (std::logic_error("not even"));
}
void print_thread_id(int id) {
	try {
		// using a local lock_guard to lock mtx guarantees unlocking on destruction / exception:  
		std::lock_guard<std::mutex> lck(mtx);
		print_even(id);
	}
	catch (std::logic_error&) {
		std::cout << "[exception caught]\n";
	}
}

int main()
{
	std::thread threads[10];
	// spawn 10 threads:  
	for (int i = 0; i<10; ++i)
		threads[i] = std::thread(print_thread_id, i + 1);

	for (auto& th : threads) th.join();
	system("pause");
	return 0;
}
```

最后的输出为：

```
[exception caught]
2 is even
[exception caught]
4 is even
[exception caught]
6 is even
[exception caught]
8 is even
[exception caught]
10 is even
请按任意键继续. . .
```

综上所述：lock_guard 最大的特点就是**安全易于使用**，在异常抛出的时候通过 lock_guard 对象管理的 Mutex 可以得到正确地解锁。**但它的缺点也很明显：那就是过于简单，不具有灵活性**。

针对这一缺点，C++11有如下新特性：**unique_lock**

unique_lock 对象以独占所有权的方式管理 mutex 对象的上锁和解锁操作，**所谓独占所有权**，即该mutex 对象的所有权只能由该unique_lock占有。

在构造(或移动(move)赋值)时，unique_lock 对象需要传递一个 Mutex 对象作为它的参数，新创建的 unique_lock 对象负责传入的 Mutex 对象的上锁和解锁操作。

std::unique_lock **对象也能保证在其自身析构时它所管理的 Mutex 对象能够被正确地解锁（即使没有显式地调用 unlock 函数）**。因此，和 lock_guard 一样，这也是一种简单而又安全的上锁和解锁方式，尤其是在程序抛出异常后先前已被上锁的 Mutex 对象可以正确进行解锁操作，极大地简化了程序员编写与 Mutex 相关的异常处理代码。

值得注意的是，unique_lock 对象同样也不负责管理 Mutex 对象的生命周期，unique_lock 对象只是简化了 Mutex 对象的上锁和解锁操作。unique_lock 的生命周期结束之后，它所管理的锁对象会被解锁，这一点和 lock_guard 类似，但 unique_lock 给程序员提供了更多的自由。

# **四、条件变量condition_variable**

条件变量(Condtion Variable)是在多线程程序中用来实现**“等待->唤醒”逻辑常用的方法。**

举个简单的例子，**应用程序A中包含两个线程t1和t2。t1需要在bool变量test_cond为true时才能继续执行**，而test_cond的值是由t2来改变的，这种情况下，如何来写程序呢？可供选择的方案有两种：

- 第一种是t1定时的去轮询变量test_cond，如果test_cond为false，则继续休眠；如果test_cond为true，则开始执行。
- 第二种就是上面提到的条件变量，t1在test_cond为false时调用cond_wait进行等待，t2在改变test_cond的值后，调用cond_signal，唤醒在等待中的t1，告诉t1 test_cond的值变了，这样t1便可继续往下执行。

很明显，上面两种方案中，第二种方案是比较优的。在第一种方案中，**在每次轮询时，如果t1休眠的时间比较短，会导致cpu资源浪费很厉害**；如果t1休眠的时间比较长，又会导致应用逻辑处理不够及时，致使应用程序性能下降。第二种方案就是为了解决轮询的弊端而生的。（参考自https://blog.csdn.net/erickhuang1989/article/details/8754357）

请看如下例子：

```
//example 1-7
#include <thread>                // std::thread
#include <mutex>                // std::mutex, std::unique_lock
#include <condition_variable>    // std::condition_variable
#include<iostream>
std::mutex mtx; // 全局互斥锁.
std::condition_variable cv; // 全局条件变量.
bool ready = false; // 全局标志位.

void do_print_id(int id)
{
	std::unique_lock <std::mutex> lck(mtx);
	while (!ready) // 如果标志位不为 true, 则等待...
		cv.wait(lck); // 当前线程被阻塞, 当全局标志位变为 true 之后,
					  // 线程被唤醒, 继续往下执行打印线程编号id.
	std::cout << "thread " << id << '\n';
}

void go()
{
	std ::unique_lock <std::mutex> lck(mtx);
	ready = true; // 设置全局标志位为 true.
	cv.notify_all(); // 唤醒所有线程.
}

int main()
{
	std::thread threads[10];
	// spawn 10 threads:
	for (int i = 0; i < 10; ++i)
		threads[i] = std::thread(do_print_id, i);

	std::cout << "10 threads ready to race...\n";
	go(); // go!

	for (auto & th : threads)
		th.join();
	system("pause");
	return 0;
}
```

结果为：

```
10 threads ready to race...
thread 9
thread 6
thread 8
thread 5
thread 7
thread 2
thread 1
thread 4
thread 3
thread 0
请按任意键继续. . .
```

代码中判断是否ready的时候，**使用的是while()，而不是	if(q.empty())，这是因为wait()从阻塞到返回，不一定就是由于notify_one()函数造成的**，还有可能由于系统的不确定原因唤醒（可能和条件变量的实现机制有关），这个的时机和频率都是不确定的，**被称作伪唤醒**，如果在错误的时候被唤醒了，执行后面的语句就会错误，**所以需要再次判断队列是否为空，如果还是为空，就继续wait()阻塞**。

std::condition_variable提供了两种 wait() 函数。一是当前线程调用 wait() 后将被阻塞(此时当前线程应该获得了锁（mutex），不妨设获得锁 lck)，直到另外某个线程调用 notify_* 唤醒了当前线程。

在线程被阻塞时，该函数会自动调用 lck.unlock() 释放锁，使得其他被阻塞在锁竞争上的线程得以继续执行。另外，一旦当前线程获得通知(notified，通常是另外某个线程调用 notify_ 唤醒了当前线程)*，wait()函数也是自动调用 lck.lock()，使得lck的状态和 wait 函数被调用时相同。

在第二种情况下（即设置了 Predicate），**只有当 pred 条件为false 时调用 wait() 才会阻塞当前线程，并且在收到其他线程的通知后只有当 pred 为 true 时才会被解除阻塞。**请注意以下代码跟之前的区别：

```
#include <thread>                // std::thread, std::this_thread::yield#include <mutex>                // std::mutex, std::unique_lock#include <condition_variable>    // std::condition_variable#include <iostream>std::mutex mtx;std::condition_variable cv;int cargo = 0;bool shipment_available(){	return cargo != 0;}// 消费者线程.void consume(int n){	for (int i = 0; i < n; ++i) {		std::unique_lock <std::mutex> lck(mtx);		cv.wait(lck, shipment_available);		std::cout << cargo << '\n';		cargo = 0;	}}int main(){	std::thread consumer_thread(consume, 10); // 消费者线程.											  // 主线程为生产者线程, 生产 10 个物品.	for (int i = 0; i < 10; ++i) {		while (shipment_available())			std::this_thread::yield();//当前线程“放弃”执行（在一个时间拍片的时间内），让操作系统调度另一线程继续执行,也就是主线程放弃执行，让子线程先进行		std::unique_lock <std::mutex> lck(mtx);		cargo = i + 1;		cv.notify_one();	}	consumer_thread.join();	system("pause");	return 0;}
```

结果为：

```
12345678910请按任意键继续. . .
```

与std::condition_variable::wait() 类似，**不过 wait_for可以指定一个时间段，在当前线程收到通知或者指定的时间 rel_time 超时之前，该线程都会处于阻塞状态。**而一旦超时或者收到了其他线程的通知，wait_for返回，剩下的处理步骤和 wait()类似。

另外，wait_for 的重载版本的最后一个参数pred表示 wait_for的预测条件，**只有当 pred条件为false时调用 wait()才会阻塞当前线程**，**并且在收到其他线程的通知后只有当 pred为 true时才会被解除阻塞**。

详见：[https://www.2cto.com/kf/201506/411327.html](https://www.2cto.com/kf/201506/411327.html)

**值得注意的是：**

在C++的condition_variable中，当 std::condition_variable对象的**某个wait函数被调用的时候**，它使用 std::unique_lock(通过 std::mutex) **来锁住当前线程**。**当前线程会一直被阻塞**，直到另外一个线程在相同的 std::condition_variable 对象上调用了 **notification 函数来唤醒当前线程**。

std::condition_variable 对象通常使用 std::unique_lock 来等待，如果需要使用另外的 lockable 类型，可以使用std::condition_variable_any类。

这里需要注意，在管理互斥锁的时候，使用的是std::unique_lock而不是std::lock_guard，而且事实上也不能使用std::lock_guard，**这需要先解释下wait()函数所做的事情。**

可以看到，在wait()函数之前，使用互斥锁保护了，如果wait的时候什么都没做？那生产者也会一直卡住，不能够将数据放入队列中了。所以，wait()函数会先调用互斥锁的unlock()函数，然后再将自己睡眠，在被唤醒后，又会继续持有锁，保护后面变量。而lock_guard没有lock和unlock接口，而unique_lock提供了。**这就是必须使用unique_lock的原因**。

有关这个部分的进一步解释请参考：

[https://blog.csdn.net/shichao1470/article/details/89856443](https://blog.csdn.net/shichao1470/article/details/89856443)

[https://www.cnblogs.com/lidabo/p/11423825.html](https://www.cnblogs.com/lidabo/p/11423825.html)

# **五、异步调用future**

在上文的代码中基本都用到的thread对象，它是C11中提供同步创建多线程的工具。但是我们想要从线程中**返回异步任务结果**，一般需要**依靠全局变量**；从安全角度看，有些不妥；为此C11提供了std::future类模板，**future对象提供访问异步操作结果的机制**，很轻松解决从异步任务中返回结果。

创建方法如下：

```
auto futureFunction = std::async(helloFunction, “function”);//参考博客：https://blog.csdn.net/y396397735/article/details/82381874
```

跟线程的创建一样：一个可调用的对象以及可选的入口参数；

运行futureFunction.get()即可获取该调用对象的返回值；

这个时候需要了解两种策略：**Eager or lazy evaluation（急速或惰性求值） 是计算表达式结果的两种策略**。

在急速求值的情况下，**将立即计算评估表达式**。

在惰性求值的情况下，**只会在需要的情况下评估表达式**。

通常惰性求值被称为call-by-need,按需调用。

值得注意的是，通常情况下, std::async 立即开始执行它的工作包。

C++运行时会决定, 计算是发生在同一个线程还是一个新的线程。

使用std::launch::async参数的话，**std::async 将在一个新线程中运行它**。

相反，使用参数 std::launch::deferred, **std::async将在同一个线程中运行它的工作包，这属于惰性求值**。

这意味着，急速求值是立即执行的，惰性求值的策略std::launch::deferred是随着future调用get()后才开始执行。

参考如下代码：

```
//example 1-8#include <future>#include <iostream>#include<string>using namespace std;bool is_prime(int x){	for (int i = 1; i<x; i++)	{		if (x % i == 0)			return false;	}	return true;}int main(){	std::future<bool> fut = std::async(is_prime, 700020007);	std::cout << "please wait";	std::chrono::milliseconds span(1);	while (fut.wait_for(span) != std::future_status::ready)		std::cout << ".";	std::cout << std::endl;	bool ret = fut.get();	std::cout << "final result: " << std::to_string(ret) << std::endl;	system("pause");	return 0;}
```

std::async会首先创建线程执行is_prime(700020007)， 任务创建之后，std::async立即返回一个std::future对象。

主线程既可使用std::future::get获取结果，如果调用过程中，任务尚未完成，则主线程阻塞至任务完成。

主线程也可使用std::future::wait_for等待结果返回，wait_for可设置超时时间，如果在超时时间之内任务完成，则返回std::future_status::ready状态；如果在超时时间之内任务尚未完成，则返回std::future_status::timeout状态。（参考https://www.cnblogs.com/taiyang-li/p/5914167.html）

**Std::promise**

std::promise是C++11并发编程中常用的一个类，常配合std::future使用。其作用是在一个线程t1中保存一个类型typename T的值，可供相绑定的std::future对象在另一线程t2中获取。

Std::launch是枚举类型，用于启动异步任务时，传递给函数async的参数，它的定义如下：

```
enum class launch {async = 0x1,创建线程的时候就开始调用（创建新线程）deferred = 0x2延迟调用，等到wait或者get的时候才进行调用（直接在原有的线程进行）；};
```

补充：async与thread的区别：关于系统资源紧张与否、返回值获取的难易程度；thread必定会创建线程，而这可能会造成系统崩溃；

# **六、atomic**

std::atomic为C++11封装的原子数据类型。

从功能上看，简单地说，原子数据类型不会发生数据竞争，能直接用在多线程中而不必我们用户对其进行添加互斥资源锁的类型。从实现上，大家可以理解为这些原子类型内部自己加了锁。

atomic的变量支持–,++,+=等对本体的操作，**但是类似于=+1的操作就会出错（相当于调用了两次）**;

std::atomic_flag

std::atomic_flag是一个原子的布尔类型，可支持两种原子操作：

- test_and_set, 如果atomic_flag对象被设置，则返回true; 如果atomic_flag对象未被设置，则设置之，返回false
- clear, 清楚atomic_flag对象

std::atomic_flag可用于多线程之间的同步操作，类似于linux中的信号量。使用atomic_flag可实现mutex，请参考如下代码.

```
//来自https://www.cnblogs.com/taiyang-li/p/5914331.html
#include <iostream>
#include <atomic>
#include <vector>
#include <thread>
#include <sstream>

std::atomic_flag lock = ATOMIC_FLAG_INIT;
std::stringstream stream;
void append_numer(int x)
{
  while (lock.test_and_set());
  stream << "thread#" << x << "\n";
  lock.clear();
}

int main()
{
  std::vector<std::thread> ths;
  for (int i=0; i<10; i++)
    ths.push_back(std::thread(append_numer, i));
  for (int i=0; i<10; i++)
    ths[i].join();
  std::cout << stream.str();
  return 0;
}
```

std::atomic对int, char, bool等数据结构进行原子性封装，在多线程环境中，对std::atomic对象的访问不会造成竞争-冒险。利用std::atomic可实现数据结构的无锁设计。如下列代码：

```
//来自https://www.cnblogs.com/taiyang-li/p/5914331.html
#include <iostream>
#include <atomic>
#include <vector>
#include <thread>
#include <sstream>

std::atomic<bool> ready(false);
std::atomic_flag winner = ATOMIC_FLAG_INIT;

void count1m(int i)
{
  while (!ready);
  for (int i=0; i<1000000; i++);
  if (!winner.test_and_set())
    std::cout << "winner: " << i << std::endl;
}

int main()
{
  std::vector<std::thread> ths;
  for (int i=0; i<10; i++)
    ths.push_back(std::thread(count1m, i));
  ready = true;
  for (int i=0; i<10; i++)
    ths[i].join();
  return 0;
}
```

# **参考资料**

[https://www.runoob.com/w3cnote/cpp-std-thread.html](https://www.runoob.com/w3cnote/cpp-std-thread.html)

[https://github.com/forhappy/Cplusplus-Concurrency-In-Practice/blob/master/zh/chapter3-Thread/Introduction-to-Thread.md](https://github.com/forhappy/Cplusplus-Concurrency-In-Practice/blob/master/zh/chapter3-Thread/Introduction-to-Thread.md)
