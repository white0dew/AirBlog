---
title: 第5章 MySQL主键、外键、唯一键
urlname: wg57uzpv5k9xaawf
date: '2024-05-24 11:51:49'
updated: '2024-06-27 19:05:58'
cover: 'https://cdn.nlark.com/yuque/__puml/7a724dba78148d402dc8940a912054b2.svg'
description: MySQL的数据完整性，包括主键与外键、唯一约束与检查约束的使用。通过这些内容，你将学会如何在数据库中确保数据的准确性和一致性，并理解MySQL约束的实现机制。5.1 主键与外键5.1.1 主键（Primary Key）主键是表中一列或多列的组合，其值在表中必须唯一，并且不能为NULL。主键用...
---
MySQL的数据完整性，包括主键与外键、唯一约束与检查约束的使用。通过这些内容，你将学会如何在数据库中确保数据的准确性和一致性，并理解MySQL约束的实现机制。

## 5.1 主键与外键

### 5.1.1 主键（Primary Key）

主键是表中一列或多列的组合，其值在表中必须唯一，并且不能为NULL。主键用于唯一标识表中的每一行记录。

#### 创建主键

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
```

#### 添加主键

```sql
ALTER TABLE users ADD PRIMARY KEY (id);
```

#### 删除主键

```sql
ALTER TABLE users DROP PRIMARY KEY;
```

### 5.1.2 外键（Foreign Key）

外键是用于建立和强制两个表之间的关系的键。外键在一张表中是一列或多列，其值必须在另一张表的主键或唯一键中存在。

#### 创建外键

```sql
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### 添加外键

```sql
ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(id);
```

#### 删除外键

```sql
ALTER TABLE orders DROP FOREIGN KEY fk_user_id;
```

### 5.1.3 底层原理：约束的实现机制

MySQL在创建和管理主键与外键时，会在表的数据字典中存储相应的元数据。主键约束确保每一行记录的唯一性，而外键约束确保数据的引用完整性。

#### 约束实现过程图示

为了更好地理解MySQL约束的实现机制，我们可以使用PlantUML绘制约束实现过程的图示，并使用样式和颜色进行美化。

![](https://oss1.aistar.cool/elog-offer-now/62fdc470dc7c1803e781f841f91b3549.svg)

## 5.2 唯一约束

### 5.2.1 唯一约束（Unique Key）

唯一约束确保表中的某一列或某些列的值是唯一的，不允许重复。

#### 创建唯一约束

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);
```

#### 添加唯一约束

```sql
ALTER TABLE users ADD UNIQUE (email);
```

#### 删除唯一约束

```sql
ALTER TABLE users DROP INDEX email;
```


MySQL在创建和管理唯一约束与检查约束时，会在表的数据字典中存储相应的元数据。唯一约束确保列中的值是唯一的，而检查约束确保列中的值符合特定条件。
### 5.2.2 底层原理:唯一约束
唯一约束实现过程图示
![](https://oss1.aistar.cool/elog-offer-now/2af10631b8a8e3ec0ce802d939c9ca7d.svg)## 5.3 检查约束

### 5.3.1 检查约束（Check Constraint）

检查约束用于确保列中的数据符合特定条件。MySQL 8.0及以上版本支持检查约束。

#### 创建检查约束

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT CHECK (age >= 18)
);
```

#### 添加检查约束

```sql
ALTER TABLE users ADD CONSTRAINT chk_age CHECK (age >= 18);
```

#### 删除检查约束

```sql
ALTER TABLE users DROP CHECK chk_age;
```

### 5.3.2 底层原理:约束的实现机制

![](https://oss1.aistar.cool/elog-offer-now/d29e163676a3344bc97add3f0b685fe3.svg)
在本章中，我们详细介绍了MySQL的数据完整性，包括主键与外键、唯一约束与检查约束的使用。我们通过示例和图示详细讲解了这些约束的使用方法和底层实现原理。
