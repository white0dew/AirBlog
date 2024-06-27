---
title: 第8章 MySQL存储引擎
urlname: wfq73pht526qgytk
date: '2024-05-24 12:14:31'
updated: '2024-06-27 19:29:00'
cover: 'https://cdn.nlark.com/yuque/__mermaid_v3/2c8ad32b5ae3599765ae964abd3259a4.svg'
description: 本章将介绍MySQL的存储引擎，包括不同存储引擎的概述、特点、使用场景以及存储引擎的底层实现原理。通过这些内容，你将学会如何选择和使用最适合的存储引擎，并理解MySQL存储引擎的工作机制。8.1 存储引擎概述8.1.1 什么是存储引擎存储引擎是MySQL用于存储、处理和检索数据的模块。不同的存...
---
本章将介绍MySQL的存储引擎，包括不同存储引擎的概述、特点、使用场景以及存储引擎的底层实现原理。通过这些内容，你将学会如何选择和使用最适合的存储引擎，并理解MySQL存储引擎的工作机制。

## 8.1 存储引擎概述

### 8.1.1 什么是存储引擎

存储引擎是MySQL用于存储、处理和检索数据的模块。不同的存储引擎提供不同的功能和特性，如事务支持、外键、全文索引等。

### 8.1.2 查看可用存储引擎

使用以下SQL语句可以查看MySQL支持的存储引擎：

```sql
SHOW ENGINES;
```

## 8.2 InnoDB存储引擎

### 8.2.1 InnoDB的概述

InnoDB是MySQL的默认存储引擎，支持ACID事务、行级锁和外键。在数据一致性和并发处理方面具有优越的性能。

### 8.2.2 InnoDB的特点

- **支持事务**：InnoDB支持ACID事务，使用MVCC（多版本并发控制）和行级锁提高并发性能。
- **数据完整性**：InnoDB支持外键，确保数据引用完整性。
- **崩溃恢复**：InnoDB通过重做日志和撤销日志实现崩溃恢复，保证数据的持久性。

### 8.2.3 使用InnoDB

#### 创建InnoDB表

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
) ENGINE=InnoDB;
```

#### 修改表引擎为InnoDB

```sql
ALTER TABLE users ENGINE=InnoDB;
```

## 8.3 MyISAM存储引擎

### 8.3.1 MyISAM的概述

MyISAM是MySQL的另一种常用存储引擎，不支持事务和外键，但在读取操作和全文索引方面具有较高的性能。

### 8.3.2 MyISAM的特点

- **不支持事务**：MyISAM不支持ACID事务，适用于对数据一致性要求不高的应用。
- **高效读操作**：MyISAM使用表级锁，适用于大量读操作的场景。
- **全文索引**：MyISAM支持全文索引，适用于文本搜索。

### 8.3.3 使用MyISAM

#### 创建MyISAM表

```sql
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    FULLTEXT (content)
) ENGINE=MyISAM;
```

#### 修改表引擎为MyISAM

```sql
ALTER TABLE users ENGINE=MyISAM;
```

## 8.4 MEMORY存储引擎

### 8.4.1 MEMORY的概述

MEMORY存储引擎将数据存储在内存中，提供极快的访问速度，但数据在服务器重启后会丢失。

### 8.4.2 MEMORY的特点

- **高速访问**：MEMORY存储引擎将数据存储在内存中，提供极快的读取和写入速度。
- **数据易失性**：MEMORY存储引擎的数据在服务器重启后会丢失，适用于临时数据存储。

### 8.4.3 使用MEMORY

#### 创建MEMORY表

```sql
CREATE TABLE cache (
    id INT PRIMARY KEY,
    value VARCHAR(255) NOT NULL
) ENGINE=MEMORY;
```

#### 修改表引擎为MEMORY

```sql
ALTER TABLE users ENGINE=MEMORY;
```

## 8.5 底层原理：存储引擎的架构与实现

### 8.5.1 存储引擎的架构

MySQL的存储引擎架构将SQL层和存储引擎层分离。SQL层负责解析、优化和执行SQL语句，而存储引擎层负责数据的存储和检索。

### 8.5.2 InnoDB的实现原理

InnoDB存储引擎使用B+树作为索引结构，通过MVCC实现高效的并发控制。InnoDB还使用重做日志和撤销日志实现数据的持久性和崩溃恢复。

### 8.5.3 MyISAM的实现原理

MyISAM存储引擎使用B树作为索引结构，通过表级锁实现并发控制。MyISAM支持全文索引和压缩表，适用于大量读操作的场景。

### 8.5.4 存储引擎架构图示

为了更好地理解MySQL存储引擎的架构和实现原理，我们绘制存储引擎架构的图示。

![](https://oss1.aistar.cool/elog-offer-now/e765f151b7d21c707d884176ecfda87a.svg)
在本章中，我们详细介绍了MySQL的存储引擎，包括不同存储引擎的概述、特点、使用场景以及存储引擎的底层实现原理。我们通过示例和图示详细讲解了这些存储引擎的使用方法和工作机制。

存储引擎是MySQL的核心组件，掌握这些内容将大大提高你的数据库管理和优化能力。

