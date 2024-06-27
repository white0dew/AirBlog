---
title: 第1章 MySQL简介与安装
urlname: rggr746er445f1as
date: '2024-05-24 11:30:28'
updated: '2024-06-27 18:46:38'
description: 本章将介绍MySQL的基本概念、特点和应用场景，并详细讲解在不同操作系统上安装和配置MySQL的方法。通过这些内容，你将了解MySQL的基本特性，并成功安装和配置MySQL数据库。1.1 什么是MySQL1.1.1 定义MySQL是一个开源的关系型数据库管理系统（RDBMS），由瑞典公司MyS...
---
本章将介绍MySQL的基本概念、特点和应用场景，并详细讲解在不同操作系统上安装和配置MySQL的方法。通过这些内容，你将了解MySQL的基本特性，并成功安装和配置MySQL数据库。

## 1.1 什么是MySQL

### 1.1.1 定义

MySQL是一个开源的关系型数据库管理系统（RDBMS），由瑞典公司MySQL AB开发，现由Oracle公司维护和发展。它使用结构化查询语言（SQL）来管理和操作数据。

### 1.1.2 历史

- **1995年**：MySQL的第一个版本发布。
- **2008年**：Sun Microsystems公司收购MySQL AB。
- **2010年**：Oracle收购Sun Microsystems，成为MySQL的主要维护者。

### 1.1.3 应用场景

- **Web应用**：如WordPress、Joomla、Drupal等内容管理系统。
- **电子商务平台**：如Magento、PrestaShop等。
- **企业级应用**：如ERP、CRM系统等。

### 1.1.4 MySQL的特点和优势

- **高性能**：MySQL具有高效的存储引擎和查询优化机制，能够处理大量并发访问。
- **开源且免费**：MySQL的开源许可证使其成为免费且可定制的解决方案。
- **跨平台**：MySQL支持多种操作系统，如Windows、Linux和MacOS。
- **广泛的社区支持**：作为流行的数据库管理系统，MySQL拥有庞大的用户和开发者社区。

## 1.2 安装MySQL

### 1.2.1 安装前准备

在安装MySQL之前，确保系统满足以下基本要求：

- **操作系统**：Windows、Linux、macOS。
- **内存**：至少1GB（推荐2GB或更多）。
- **硬盘空间**：至少500MB。

### 1.2.2 安装MySQL

#### 在Windows上安装MySQL

1.  **下载MySQL安装包**： 
   - 访问[MySQL官方网站](https://dev.mysql.com/downloads/installer/)下载最新版本的MySQL安装包。
2.  **运行安装程序**： 
   - 双击下载的安装包，启动安装程序。
3.  **选择安装类型**： 
   - 在安装类型选择界面，选择"Developer Default"或者根据需要选择其他安装类型。
4.  **配置MySQL服务器**： 
   - 设置Root密码，并配置MySQL实例名称、端口等参数。
5.  **完成安装**： 
   - 完成安装向导，启动MySQL服务。

#### 在Linux上安装MySQL

1.  **更新包索引**： 
```shell
sudo apt-get update
```
 

2.  **安装MySQL**： 
```shell
sudo apt-get install mysql-server
```
 

3.  **启动MySQL服务**： 
```shell
sudo service mysql start
```
 

4.  **运行安全安装脚本**： 
```shell
sudo mysql_secure_installation
```
 

#### 在macOS上安装MySQL

1.  **使用Homebrew安装MySQL**： 
```shell
brew install mysql
```
 

2.  **启动MySQL服务**： 
```shell
brew services start mysql
```
 

3.  **设置Root用户密码**： 
```shell
mysql_secure_installation
```
 

### 1.2.3 配置MySQL

MySQL的配置文件通常位于`/etc/mysql/my.cnf`（Linux）或`/usr/local/etc/my.cnf`（macOS），在Windows上则是`my.ini`文件。这个文件包含了MySQL服务器的各种配置选项。

#### 配置文件示例

```properties
[mysqld]
port = 3306
datadir = /var/lib/mysql
socket = /var/lib/mysql/mysql.sock
symbolic-links = 0

# Custom configuration
max_connections = 200
default-storage-engine = InnoDB
```

### 1.2.4 启动与停止MySQL服务

#### 在Windows上

-  **启动MySQL服务**： 
```shell
net start mysql
```
 

-  **停止MySQL服务**： 
```shell
net stop mysql
```
 

#### 在Linux上

-  **启动MySQL服务**： 
```shell
sudo service mysql start
```
 

-  **停止MySQL服务**： 
```shell
sudo service mysql stop
```
 

#### 在macOS上

-  **启动MySQL服务**： 
```shell
brew services start mysql
```
 

-  **停止MySQL服务**： 
```shell
brew services stop mysql
```
 

## 1.3 验证安装

### 1.3.1 使用命令行工具连接MySQL

#### 启动MySQL命令行客户端

```shell
mysql -u root -p
```

- `-u root`：指定用户名为`root`。
- `-p`：提示输入密码。

输入密码后，你将进入MySQL命令行界面。

#### 检查MySQL服务状态

```sql
SHOW VARIABLES LIKE "%version%";
```

你应该看到与MySQL版本相关的信息，如：
```
+-------------------------+-------------------------+
| Variable_name           | Value                   |
+-------------------------+-------------------------+
| innodb_version          | 8.0.26                  |
| protocol_version        | 10                      |
| slave_type_conversions  |                         |
| tls_version             | TLSv1,TLSv1.1,TLSv1.2   |
| version                 | 8.0.26                  |
| version_comment         | MySQL Community Server  |
| version_compile_machine | x86_64                  |
| version_compile_os      | Linux                   |
+-------------------------+-------------------------+
```

### 1.3.2 创建测试数据库

#### 创建数据库

```sql
CREATE DATABASE testdb;
```

#### 切换到测试数据库

```sql
USE testdb;
```

#### 创建测试表

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
```

#### 插入测试数据

```sql
INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');
```

#### 查询测试数据

```sql
SELECT * FROM users;
```

你应该看到插入的测试数据，如：

```
+----+----------+-----------------+
| id | name     | email           |
+----+----------+-----------------+
|  1 | John Doe | john@example.com|
+----+----------+-----------------+
```

