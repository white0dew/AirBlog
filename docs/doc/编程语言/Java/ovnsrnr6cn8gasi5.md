---
title: "\U0001F4D6 Java速查手册"
urlname: ovnsrnr6cn8gasi5
date: '2024-05-22 08:50:43'
updated: '2024-05-24 12:49:57'
description: '---nav_path: java_instant_reference---下面是Java速查手册的一个大纲，涵盖了基本语法、常用类和方法、异常处理等内容。这样的手册对初学者和有经验的开发者都非常有用，可以节省查找文档和在线搜索的时间。1. 基本语法1.1 数据类型 基本数据类型： byte ...'
nav_path: java_instant_reference
---
下面是Java速查手册的一个大纲，涵盖了基本语法、常用类和方法、异常处理等内容。这样的手册对初学者和有经验的开发者都非常有用，可以节省查找文档和在线搜索的时间。
## 1. 基本语法
### 1.1 数据类型

-  **基本数据类型**： 
```java
byte b = 127;
short s = 32767;
int i = 2147483647;
long l = 9223372036854775807L;
float f = 3.14f;
double d = 3.141592653589793;
char c = 'A';
boolean bool = true;
```
 

-  **引用数据类型**： 
```java
String str = "Hello, World!";
int[] arr = {1, 2, 3, 4, 5};
```
 

### 1.2 变量与常量

-  **变量声明**： 
```java
int a = 10;
```
 

-  **常量声明**： 
```java
final int CONSTANT = 100;
```
 

### 1.3 运算符

-  **算术运算符**： 
```java
int sum = a + b;
int diff = a - b;
int product = a * b;
int quotient = a / b;
int remainder = a % b;
```
 

-  **比较运算符**： 
```java
boolean isEqual = (a == b);
boolean isNotEqual = (a != b);
boolean isGreater = (a > b);
boolean isLesser = (a < b);
boolean isGreaterOrEqual = (a >= b);
boolean isLesserOrEqual = (a <= b);
```
 

-  **逻辑运算符**： 
```java
boolean and = (a > b && c > d);
boolean or = (a > b || c > d);
boolean not = !(a > b);
```
 
### 1.4 控制结构

-  **条件语句**： 
```java
if (a > b) {
    System.out.println("a is greater than b");
} else if (a < b) {
    System.out.println("a is less than b");
} else {
    System.out.println("a is equal to b");
}
```
 

-  **循环语句**： 
```java
// for循环
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// while循环
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++;
}

// do-while循环
int j = 0;
do {
    System.out.println(j);
    j++;
} while (j < 10);
```
 

## 2. 面向对象编程

### 2.1 类与对象

-  **类的定义**： 
```java
public class Person {
    private String name;
    private int age;

    // 构造方法
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getter和Setter方法
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

    // 普通方法
    public void introduce() {
        System.out.println("Hi, my name is " + name + " and I am " + age + " years old.");
    }
}
```
 

-  **对象的创建**： 
```java
Person person = new Person("Alice", 30);
person.introduce();
```
 

### 2.2 继承

- **继承的使用**：
```java
public class Student extends Person {
    private String studentId;

    public Student(String name, int age, String studentId) {
        super(name, age);
        this.studentId = studentId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    @Override
    public void introduce() {
        super.introduce();
        System.out.println("My student ID is " + studentId);
    }
}
```
 

### 2.3 多态

- **多态的使用**：
```java
public class Animal {
    public void makeSound() {
        System.out.println("Some generic animal sound");
    }
}

public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Bark");
    }
}

public class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Meow");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myDog = new Dog();
        Animal myCat = new Cat();
        myDog.makeSound(); // 输出：Bark
        myCat.makeSound(); // 输出：Meow
    }
}
```
 

## 3. 常用类与方法

### 3.1 字符串处理

-  **字符串拼接**： 
```java
String greeting = "Hello" + " " + "World!";
```
 

-  **字符串长度**： 
```java
int length = greeting.length();
```
 

-  **字符串比较**： 
```java
boolean isEqual = greeting.equals("Hello World!");
```
 

-  **子字符串**： 
```java
String subStr = greeting.substring(0, 5);
```
 

### 3.2 集合框架

-  **ArrayList**： 
```java
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Cherry");

for (String fruit : list) {
    System.out.println(fruit);
}
```
 

-  **HashMap**： 
```java
Map<String, Integer> map = new HashMap<>();
map.put("Apple", 1);
map.put("Banana", 2);
map.put("Cherry", 3);

for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```
 

## 4. 异常处理

### 4.1 try-catch块

- **基本用法**：
```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
}
```
 

### 4.2 自定义异常

- **定义和使用自定义异常**：
```java
public class CustomException extends Exception {
    public CustomException(String message) {
        super(message);
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            throw new CustomException("This is a custom exception");
        } catch (CustomException e) {
            System.out.println(e.getMessage());
        }
    }
}
```
 

## 5. 输入输出（I/O）

### 5.1 文件操作

-  **读取文件**： 
```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class FileReadExample {
    public static void main(String[] args) {
        try (BufferedReader br = new BufferedReader(new FileReader("example.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
 

-  **写入文件**： 
```java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class FileWriteExample {
    public static void main(String[] args) {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("example.txt"))) {
            bw.write("Hello, World!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
 

## 6. 并发编程

### 6.1 创建线程

-  **继承Thread类**： 
```java
public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread is running");
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start();
    }
}
```
 

-  **实现Runnable接口**： 
```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread is running");
    }
}

public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread
```
 好的，下面是Java速查手册的继续部分。

---

## 6. 并发编程 (续)

### 6.1 创建线程

- **实现Runnable接口**：
```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread is running");
    }
}

public class Main {
    public static void main(String[] args) {
        Thread thread = new Thread(new MyRunnable());
        thread.start();
    }
}
```
 

### 6.2 并发工具类

-  **ExecutorService**： 
```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        
        executorService.submit(new MyRunnable());
        executorService.submit(new MyRunnable());
        
        executorService.shutdown();
    }
}
```
 

-  **CountDownLatch**： 
```java
import java.util.concurrent.CountDownLatch;

public class Worker implements Runnable {
    private CountDownLatch latch;

    public Worker(CountDownLatch latch) {
        this.latch = latch;
    }

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + " is working");
        try {
            Thread.sleep((int) (Math.random() * 1000));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        latch.countDown();
        System.out.println(Thread.currentThread().getName() + " finished working");
    }
}

public class Main {
    public static void main(String[] args) {
        CountDownLatch latch = new CountDownLatch(3);

        new Thread(new Worker(latch)).start();
        new Thread(new Worker(latch)).start();
        new Thread(new Worker(latch)).start();

        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("All workers finished. Main thread continues.");
    }
}
```
 

## 7. 网络编程

### 7.1 创建服务器

- **简单服务器**：
```java
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class SimpleServer {
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(8080)) {
            System.out.println("Server is listening on port 8080");

            while (true) {
                Socket socket = serverSocket.accept();
                System.out.println("New client connected");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
 

### 7.2 创建客户端

- **简单客户端**：
```java
import java.io.IOException;
import java.net.Socket;

public class SimpleClient {
    public static void main(String[] args) {
        try (Socket socket = new Socket("localhost", 8080)) {
            System.out.println("Connected to the server");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
 

## 8. 数据库操作

### 8.1 使用JDBC连接数据库

- **连接数据库**：
```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            if (conn != null) {
                System.out.println("Connected to the database");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```
 

### 8.2 执行SQL查询

- **查询数据**：
```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseQuery {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            String sql = "SELECT id, name, age FROM users";
            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");

                System.out.println("ID: " + id + ", Name: " + name + ", Age: " + age);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```
 

### 8.3 更新数据

- **更新数据**：
```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseUpdate {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            String sql = "UPDATE users SET age = 30 WHERE id = 1";
            int rowsAffected = stmt.executeUpdate(sql);

            System.out.println("Rows affected: " + rowsAffected);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```
 

### 8.4 插入数据

- **插入数据**：
```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseInsert {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            String sql = "INSERT INTO users (name, age) VALUES ('John Doe', 25)";
            int rowsAffected = stmt.executeUpdate(sql);

            System.out.println("Rows affected: " + rowsAffected);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```
 

### 8.5 删除数据

- **删除数据**：
```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseDelete {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase";
        String user = "root";
        String password = "password";

        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {

            String sql = "DELETE FROM users WHERE id = 1";
            int rowsAffected = stmt.executeUpdate(sql);

            System.out.println("Rows affected: " + rowsAffected);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```
 

## 9. 网络编程

### 9.1 创建服务器

- **简单服务器**：
```java
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class SimpleServer {
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(8080)) {
            System.out.println("Server is listening on port 8080");

            while (true) {
                Socket socket = serverSocket.accept();
                System.out.println("New client connected");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
 

### 9.2 创建客户端

- **简单客户端**：
```java
import java.io.IOException;
import java.net.Socket;

public class SimpleClient {
    public static void main(String[] args) {
        try (Socket socket = new Socket("localhost", 8080)) {
            System.out.println("Connected to the server");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
 

## 10. Web开发

### 10.1 创建Servlet

- **简单Servlet**：
```java
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Hello, World!</h1>");
        out.println("</body></html>");
    }
}
```
 

### 10.2 创建JSP页面

- **简单JSP页面**：
```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>JSP Example</title>
</head>
<body>
    <h1>Hello, JSP!</h1>
    <%
        // 在JSP中嵌入Java代码
        String message = "Welcome to JSP!";
        out.println("<p>" + message + "</p>");
    %>
</body>
</html>
```
 

### 10.3 Spring Boot

-  **创建Spring Boot应用主类**： 
```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```
 

-  **创建一个简单的REST控制器**： 
```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GreetingController {
    @GetMapping("/greeting")
    public String greeting() {
        return "Hello, RESTful Web Service!";
    }
}
```
 

-  **配置文件（application.properties）**： 
```properties
server.port=8080
```
 

### 10.4 Spring MVC

-  **创建控制器类**： 
```java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/home")
public class HomeController {
    @GetMapping
    public String home(Model model) {
        model.addAttribute("message", "Welcome to Spring MVC!");
        return "home";
    }
}
```
 

-  **创建视图模板（home.html）**： 
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Home</title>
</head>
<body>
    <h1 th:text="${message}">Welcome to Spring MVC!</h1>
</body>
</html>
```
 

## 11. 测试

### 11.1 使用JUnit

- **创建一个简单的JUnit测试**：
```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

public class CalculatorTest {
    @Test
    public void testAddition() {
        Calculator calculator = new Calculator();
        int result = calculator.add(2, 3);
        assertEquals(5, result, "2 + 3 should equal 5");
    }
}

class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}
```
 

### 11.2 使用Mockito

- **创建一个Mockito测试**：
```java
import static org.mockito.Mockito.*;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void testFindUserById() {
        MockitoAnnotations.openMocks(this);
        User user = new User("John");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.findUserById(1L);
        assertEquals("John", result.getName());
    }
}

class User {
    private String name;
    public User(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
}

interface UserRepository {
    Optional<User> findById(Long id);
}

class UserService {
    private UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public User findUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
```
 

## 12. 常见问题

### 12.1 NullPointerException

- **处理NullPointerException**：
```java
String str = null;
if (str != null) {
    System.out.println(str.length());
} else {
    System.out.println("String is null");
}
```
 

### 12.2 ClassCastException

- **处理ClassCastException**：
```java
Object obj = "Hello";
if (obj instanceof Integer) {
    Integer num = (Integer) obj;
} else {
    System.out.println("Object is not an Integer");
}
```
 

### 12.3 ArrayIndexOutOfBoundsException

- **处理ArrayIndexOutOfBoundsException**：
```java
int[] arr = {1, 2, 3};
int index = 3;
if (index >= 0 && index < arr.length) {
    System.out.println(arr[index]);
} else {
    System.out.println("Index is out of bounds");
}
```
 
