---
title: 第2章 MySQL基本操作
urlname: pz0w9p1xmrhrw4vc
date: '2024-05-24 11:31:15'
updated: '2024-06-27 18:50:10'
cover: 'https://cdn.nlark.com/yuque/__puml/3ee2c7e3b83a484ac20acb8b2eb6770c.svg'
description: MySQL的基本操作，包括如何连接数据库、创建和删除数据库、创建和删除表，以及插入、更新和删除数据。这些操作是使用MySQL进行数据管理的基础。2.1 连接数据库2.1.1 使用MySQL命令行客户端连接数据库启动MySQL命令行客户端mysql -u root -p-u root：指定用户名...
---
MySQL的基本操作，包括如何连接数据库、创建和删除数据库、创建和删除表，以及插入、更新和删除数据。这些操作是使用MySQL进行数据管理的基础。

## 2.1 连接数据库

### 2.1.1 使用MySQL命令行客户端连接数据库

#### 启动MySQL命令行客户端

```shell
mysql -u root -p
```

- `-u root`：指定用户名为 `root`。
- `-p`：提示输入密码。

输入密码后，你将进入MySQL命令行界面。

#### 连接到特定数据库

```shell
mysql -u root -p testdb
```

- `testdb`：指定要连接的数据库名称。

### 2.1.2 使用MySQL Workbench连接数据库

#### 打开MySQL Workbench

1. 启动MySQL Workbench应用程序。
2. 点击“+”号图标创建一个新的连接。
3. 填写连接详细信息，如连接名称、主机名、端口、用户名和密码。
4. 点击“Test Connection”测试连接是否成功。
5. 成功后点击“OK”保存连接配置。

#### 连接到数据库

1. 在MySQL Workbench主界面，点击刚刚创建的连接。
2. 输入密码并点击“OK”。
3. 成功连接后，你将看到数据库和表的列表。

## 2.2 创建和删除数据库

### 2.2.1 创建数据库

#### 使用命令行客户端创建数据库

```sql
CREATE DATABASE mydatabase;
```

- `mydatabase`：要创建的数据库名称。

#### 使用MySQL Workbench创建数据库

1. 连接到MySQL服务器。
2. 在左侧的“Navigator”面板中右键点击“Schemas”。
3. 选择“Create Schema…”。
4. 在弹出的对话框中输入数据库名称，然后点击“Apply”。
5. 点击“Apply SQL Script”执行创建数据库的SQL语句，最后点击“Finish”。

### 2.2.2 删除数据库

#### 使用命令行客户端删除数据库

```sql
DROP DATABASE mydatabase;
```

- `mydatabase`：要删除的数据库名称。

#### 使用MySQL Workbench删除数据库

1. 连接到MySQL服务器。
2. 在左侧的“Navigator”面板中找到要删除的数据库。
3. 右键点击数据库名称，选择“Drop Schema…”。

## 2.3 创建和删除表

### 2.3.1 创建表

#### 使用命令行客户端创建表

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
```

- `users`：指定要创建的表名称。
- `id`、`name`、`email`：指定表的字段名称和数据类型。
- `AUTO_INCREMENT PRIMARY KEY`：指定 `id` 为主键，并自动递增。

#### 使用MySQL Workbench创建表

1. 连接到数据库。
2. 在左侧的“Navigator”面板中展开数据库名称。
3. 右键点击“Tables”并选择“Create Table…”。
4. 在表格视图中手动添加列和数据类型。
5. 点击“Apply”保存表结构。

### 2.3.2 删除表

#### 使用命令行客户端删除表

```sql
DROP TABLE users;
```

- `users`：指定要删除的表名称。

#### 使用MySQL Workbench删除表

1. 连接到数据库。
2. 在左侧的“Navigator”面板中找到要删除的表。
3. 右键点击表名称，选择“Drop Table…”。

## 2.4 插入、更新和删除数据

### 2.4.1 插入数据

#### 使用命令行客户端插入数据

```sql
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com');
```

- `users`：指定要插入数据的表名称。
- `name`、`email`：指定要插入数据的字段名称。
- `'Alice'`、`'alice@example.com'`：插入的具体数据。

#### 使用MySQL Workbench插入数据

1. 连接到数据库。
2. 在左侧的“Navigator”面板中展开数据库和表名称。
3. 右键点击表名称，选择“Select Rows – Limit 1000”。
4. 在表格视图中手动输入数据，然后点击“Apply”。

### 2.4.2 更新数据

#### 使用命令行客户端更新数据

```sql
UPDATE users SET email = 'alice_new@example.com' WHERE name = 'Alice';
```

- `users`：指定要更新数据的表名称。
- `email = 'alice_new@example.com'`：更新的具体字段和值。
- `WHERE name = 'Alice'`：条件限制，只更新符合条件的记录。

#### 使用MySQL Workbench更新数据

1. 连接到数据库。
2. 在左侧的“Navigator”面板中展开数据库和表名称。
3. 右键点击表名称，选择“Select Rows – Limit 1000”。
4. 在表格视图中找到要更新的记录，手动修改数据，然后点击“Apply”。

### 2.4.3 删除数据

#### 使用命令行客户端删除数据

```sql
DELETE FROM users WHERE name = 'Alice';
```

- `users`：指定要删除数据的表名称。
- `WHERE name = 'Alice'`：条件限制，只删除符合条件的记录。

#### 使用MySQL Workbench删除数据

1. 连接到数据库。
2. 在左侧的“Navigator”面板中展开数据库和表名称。
3. 右键点击表名称，选择“Select Rows – Limit 1000”。
4. 在表格视图中找到要删除的记录，右键点击选择“Delete Row”，然后点击“Apply”。

## 2.5 底层原理：存储引擎架构
存储引擎是MySQL用于存储、处理和检索数据的模块。不同的存储引擎提供不同的功能和特性，例如事务支持、外键、全文索引等。
![](https://oss1.aistar.cool/elog-offer-now/409ba50f9af2d15796d8ddbf63bfdf87.svg)### 2.5.2 常用的存储引擎

- **InnoDB**：支持事务、外键和崩溃恢复，是MySQL的默认存储引擎。
- **MyISAM**：不支持事务和外键，但提供高效的表级锁和全文索引。
- **MEMORY**：将数据存储在内存中，提供极快的访问速度，但数据在重启后会丢失。

