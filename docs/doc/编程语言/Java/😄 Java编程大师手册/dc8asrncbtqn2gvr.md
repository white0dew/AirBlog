---
title: 9、Java Web开发
urlname: dc8asrncbtqn2gvr
date: '2024-05-24 09:55:02'
updated: '2024-05-24 09:57:02'
description: 本章介绍如何使用Java进行Web开发，包括Servlet与JSP、Spring框架入门以及如何构建RESTful Web服务与Spring Boot应用。9.1 Servlet与JSPServlet和JSP是Java Web开发的基础技术，Servlet用于处理请求和响应，JSP用于生成动态...
---
本章介绍如何使用Java进行Web开发，包括Servlet与JSP、Spring框架入门以及如何构建RESTful Web服务与Spring Boot应用。

## 9.1 Servlet与JSP

Servlet和JSP是Java Web开发的基础技术，Servlet用于处理请求和响应，JSP用于生成动态网页内容。

### 9.1.1 什么是Servlet

Servlet是运行在服务器上的Java程序，用于处理客户端的HTTP请求。

#### 示例：创建一个简单的Servlet

```java
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// 使用@WebServlet注解定义Servlet URL模式
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // 设置响应内容类型
        response.setContentType("text/html");
        
        // 获取PrintWriter对象，用于向客户端发送响应
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Hello, World!</h1>");
        out.println("</body></html>");
    }
}
```

### 9.1.2 什么是JSP

JSP（JavaServer Pages）是一种基于HTML的技术，用于创建动态网页。

#### 示例：创建一个简单的JSP页面

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

### 9.1.3 Servlet与JSP的结合使用

结合使用Servlet和JSP，可以实现MVC（Model-View-Controller）架构。

#### 示例：通过Servlet传递数据到JSP

```java
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// 使用@WebServlet注解定义Servlet URL模式
@WebServlet("/greet")
public class GreetingServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // 设置请求属性
        request.setAttribute("name", "John");
        
        // 转发请求到JSP页面
        request.getRequestDispatcher("/greeting.jsp").forward(request, response);
    }
}
```

```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Greeting</title>
</head>
<body>
    <h1>Hello, <%= request.getAttribute("name") %>!</h1>
</body>
</html>
```

## 9.2 Spring框架入门

Spring是一个功能强大的Java框架，用于构建企业级应用。本节将介绍Spring的基础概念和基本使用方法。

### 9.2.1 什么是Spring框架

Spring框架提供了一系列模块和工具，用于简化Java应用的开发，包括依赖注入、AOP、数据访问和Web开发等。

### 9.2.2 依赖注入

依赖注入是Spring的核心概念之一，允许对象之间的依赖关系通过配置文件或注解来设置。

#### 示例：使用Spring管理Bean

```java
// 定义一个简单的Service类
public class HelloService {
    public String sayHello() {
        return "Hello, Spring!";
    }
}

// 定义Spring配置类
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public HelloService helloService() {
        return new HelloService();
    }
}

// 使用Spring容器创建和获取Bean
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
    public static void main(String[] args) {
        // 创建Spring应用上下文
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        // 获取HelloService Bean
        HelloService helloService = context.getBean(HelloService.class);
        System.out.println(helloService.sayHello()); // 输出：Hello, Spring!
    }
}
```

## 9.3 RESTful Web服务与Spring Boot

Spring Boot简化了Spring应用的开发和配置，特别适合构建RESTful Web服务。

### 9.3.1 什么是RESTful Web服务

REST（Representational State Transfer）是一种架构风格，用于设计网络应用的API。RESTful Web服务使用标准的HTTP方法（GET、POST、PUT、DELETE）进行通信。

### 9.3.2 Spring Boot简介

Spring Boot是Spring框架的子项目，通过自动配置和内置的服务器（如Tomcat），简化了Spring应用的开发。

### 9.3.3 使用Spring Boot构建RESTful Web服务

#### 示例：创建一个简单的Spring Boot应用

1. **搭建Spring Boot项目**

使用Spring Initializr生成一个Spring Boot项目，包含以下依赖：

- Spring Web

2. **创建Spring Boot应用的主类**

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

3. **创建一个REST控制器**

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

// 使用Spring Boot启动应用后，访问http://localhost:8080/api/greeting
// 输出：Hello, RESTful Web Service!
```

### 9.3.4 使用DTO和服务层

为了实现更好的代码组织和松耦合，可以使用DTO（Data Transfer Object）和服务层。

#### 示例：添加DTO和服务层

1. **创建DTO类**

```java
public class Greeting {
    private String message;

    public Greeting(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
```

2. **创建服务类**

```java
import org.springframework.stereotype.Service;

@Service
public class GreetingService {
    public Greeting getGreeting() {
        return new Greeting("Hello, RESTful Web Service with DTO!");
    }
}
```

3. **修改控制器类**

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GreetingController {
    private final GreetingService greetingService;

    @Autowired
    public GreetingController(GreetingService greetingService) {
        this.greetingService = greetingService;
    }

    @GetMapping("/greeting")
    public Greeting greeting() {
        return greetingService.getGreeting();
    }
}
```
