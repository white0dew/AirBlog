---
title: 10、Java项目实战
urlname: egdut651nmx8bwzm
date: '2024-05-24 09:55:54'
updated: '2024-05-24 09:56:59'
description: 本章将通过一个实战项目演示如何应用前面所学的Java知识，构建一个完整的个人记账本Web应用。10.1 实战项目：个人记账本Web应用10.1.1 项目概述我们将构建一个简单的个人记账本Web应用，用户可以记录和查看他们的收入和支出。10.1.2 技术栈Spring Boot：用于快速构建和部...
---
本章将通过一个实战项目演示如何应用前面所学的Java知识，构建一个完整的个人记账本Web应用。

## 10.1 实战项目：个人记账本Web应用

### 10.1.1 项目概述

我们将构建一个简单的个人记账本Web应用，用户可以记录和查看他们的收入和支出。

### 10.1.2 技术栈

- **Spring Boot**：用于快速构建和部署Web应用。
- **Spring Data JPA**：用于数据持久化。
- **H2 Database**：嵌入式数据库，用于快速开发和测试。
- **Thymeleaf**：用于服务器端模板引擎，生成动态HTML页面。

## 10.2 项目架构设计与实现

### 10.2.1 创建项目结构

使用Spring Initializr创建一个新的Spring Boot项目，包含以下依赖：

- Spring Web
- Spring Data JPA
- H2 Database
- Thymeleaf

### 10.2.2 定义实体类

#### 示例：定义交易记录实体类

```java
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type; // "income" or "expense"
    private double amount;
    private String description;
    private LocalDate date;

    // Getters and setters
    // ... 省略getter和setter代码
}
```

### 10.2.3 创建JPA仓库接口

#### 示例：创建交易记录仓库

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // JPA会自动生成CRUD操作的方法
}
```

### 10.2.4 创建服务类

#### 示例：创建交易记录服务

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}
```

### 10.2.5 创建控制器类

#### 示例：创建交易记录控制器

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/transactions")
public class TransactionController {
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping
    public String getAllTransactions(Model model) {
        List<Transaction> transactions = transactionService.getAllTransactions();
        model.addAttribute("transactions", transactions);
        return "transactions"; // 返回的视图名称
    }

    @GetMapping("/new")
    public String showNewTransactionForm(Model model) {
        model.addAttribute("transaction", new Transaction());
        return "new_transaction";
    }

    @PostMapping
    public String saveTransaction(@ModelAttribute("transaction") Transaction transaction) {
        transactionService.saveTransaction(transaction);
        return "redirect:/transactions";
    }

    @GetMapping("/delete/{id}")
    public String deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return "redirect:/transactions";
    }
}
```

### 10.2.6 创建视图模板

#### 示例：创建显示交易记录的视图模板

**transactions.html**

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Transaction List</title>
</head>
<body>
    <h1>All Transactions</h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
        </tr>
        <tr th:each="transaction : ${transactions}">
            <td th:text="${transaction.id}">1</td>
            <td th:text="${transaction.type}">income</td>
            <td th:text="${transaction.amount}">100.0</td>
            <td th:text="${transaction.description}">Salary</td>
            <td th:text="${transaction.date}">2024-05-24</td>
            <td>
                <a th:href="@{/transactions/delete/{id}(id=${transaction.id})}">Delete</a>
            </td>
        </tr>
    </table>
    <a href="/transactions/new">Add New Transaction</a>
</body>
</html>
```

#### 示例：创建新增交易记录的视图模板

**new_transaction.html**

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>New Transaction</title>
</head>
<body>
    <h1>New Transaction</h1>
    <form th:action="@{/transactions}" th:object="${transaction}" method="post">
        <label>Type:</label>
        <select th:field="*{type}">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>
        <br>

        <label>Amount:</label>
        <input type="text" th:field="*{amount}" />
        <br>

        <label>Description:</label>
        <input type="text" th:field="*{description}" />
        <br>

        <label>Date:</label>
        <input type="date" th:field="*{date}" />
        <br>

        <button type="submit">Save</button>
    </form>
</body>
</html>
```

## 10.3 测试与部署

### 10.3.1 单元测试

使用JUnit和Spring Test来编写和运行单元测试，以确保代码的正确性。

#### 示例：测试交易记录服务

```java
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TransactionServiceTest {
    @Autowired
    private TransactionService transactionService;

    @Test
    void testSaveTransaction() {
        Transaction transaction = new Transaction();
        transaction.setType("income");
        transaction.setAmount(100.0);
        transaction.setDescription("Test Income");
        transaction.setDate(LocalDate.now());

        Transaction savedTransaction = transactionService.saveTransaction(transaction);
        assertNotNull(savedTransaction);
        assertEquals("income", savedTransaction.getType());
    }
}
```

### 10.3.2 集成测试

集成测试用于测试完整系统的功能，确保各个部分协同工作。

### 10.3.3 部署应用

将应用打包为JAR文件或WAR文件，并部署到服务器（如Tomcat）或云平台（如AWS、Heroku）。

#### 示例：打包和运行Spring Boot应用

```shell
# 打包应用
mvn clean package

# 运行JAR文件
java -jar target/myapp-0.0.1-SNAPSHOT.jar
```

