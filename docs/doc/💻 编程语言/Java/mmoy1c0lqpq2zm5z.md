---
title: Filter和Interceptor什么区别？
urlname: mmoy1c0lqpq2zm5z
date: '2024-05-28 16:58:45'
updated: '2024-05-28 17:32:58'
description: 在Java Spring框架中，Filter和Interceptor是两个常见的组件，用于处理请求和响应的拦截逻辑。虽然它们有一些相似之处，但也有许多重要的区别。下面详细介绍它们的区别和各自的特点。Filter介绍Filter是Servlet规范的一部分，用于在请求到达Servlet之前和响应...
---
在Java Spring框架中，`Filter`和`Interceptor`是两个常见的组件，用于处理请求和响应的拦截逻辑。虽然它们有一些相似之处，但也有许多重要的区别。下面详细介绍它们的区别和各自的特点。

## Filter

### 介绍

`Filter`是Servlet规范的一部分，用于在请求到达Servlet之前和响应从Servlet返回之前执行过滤逻辑。它主要用于对请求和响应进行预处理，如字符编码设置、日志记录、安全检查等。

### 特点

- **作用范围**：`Filter`作用于整个应用程序，可以过滤所有的请求和响应。
- **配置方式**：通过在`web.xml`文件中配置或使用注解`@WebFilter`进行配置。
- **生命周期**：`Filter`在Web容器启动时初始化，并在Web容器关闭时销毁。
- **执行顺序**：`Filter`按配置的顺序依次执行，可以对请求和响应进行链式处理。

### 示例代码

```java
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter(urlPatterns = "/*")
public class MyFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Filter 初始化逻辑
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 预处理逻辑
        System.out.println("Filter: Pre-processing");
        
        // 继续请求处理链
        chain.doFilter(request, response);
        
        // 后处理逻辑
        System.out.println("Filter: Post-processing");
    }

    @Override
    public void destroy() {
        // Filter 销毁逻辑
    }
}
```

## Interceptor

### 介绍

`Interceptor`是Spring框架的一部分，用于在处理器（Controller）执行之前和之后执行拦截逻辑。它主要用于进行权限认证、日志记录、性能监控等功能。

### 特点

- **作用范围**：`Interceptor`作用于Spring MVC的处理器（Controller）层，可以对特定的控制器和方法进行拦截。
- **配置方式**：通过实现`HandlerInterceptor`接口，并在Spring配置中注册。
- **生命周期**：`Interceptor`随Spring容器的初始化和销毁而创建和销毁。
- **执行顺序**：`Interceptor`按配置的顺序依次执行，可以在处理器调用之前、之后和视图渲染之前执行逻辑。

### 示例代码

```java
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyInterceptor implements HandlerInterceptor {
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 处理器执行前的逻辑
        System.out.println("Interceptor: Pre-handle");
        return true; // 返回 true 表示继续处理，返回 false 表示中断请求
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // 处理器执行后的逻辑
        System.out.println("Interceptor: Post-handle");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // 视图渲染后的逻辑
        System.out.println("Interceptor: After completion");
    }
}
```

### 注册Interceptor

在Spring配置类中注册`Interceptor`：

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new MyInterceptor()).addPathPatterns("/**");
    }
}
```

## 区别总结

- **作用范围**：`Filter`作用于整个应用程序的请求和响应，而`Interceptor`作用于Spring MVC的处理器层。
- **配置方式**：`Filter`通过Servlet规范配置在`web.xml`或注解`@WebFilter`，`Interceptor`通过实现`HandlerInterceptor`接口并在Spring配置中注册。
- **生命周期**：`Filter`在Web容器启动和关闭时初始化和销毁，`Interceptor`随Spring容器的初始化和销毁而创建和销毁。
- **执行顺序**：`Filter`按链式顺序执行，可以对请求和响应进行预处理和后处理，`Interceptor`按配置顺序执行，可以在处理器前、后和视图渲染前执行逻辑。

通过理解`Filter`和`Interceptor`的区别，可以更好地选择合适的工具来实现请求拦截和处理逻辑。在实际开发中，`Filter`通常用于全局性的请求处理，而`Interceptor`则用于特定处理器的前后逻辑处理。
