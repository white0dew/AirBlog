---
title: 第3章 MySQL查询数据
urlname: aatkm5bcecwh82zb
date: '2024-05-24 11:33:04'
updated: '2024-05-24 12:29:07'
description: 本章将介绍MySQL的数据查询，包括基本查询语法、条件查询、排序与分页、聚合函数与分组查询等内容。通过这些内容，你将学会如何从数据库中检索所需的数据，并理解MySQL查询的执行过程。3.1 基本查询语法3.1.1 SELECT语句SELECT语句用于从数据库中检索数据。最简单的查询语法如下：S...
---
本章将介绍MySQL的数据查询，包括基本查询语法、条件查询、排序与分页、聚合函数与分组查询等内容。通过这些内容，你将学会如何从数据库中检索所需的数据，并理解MySQL查询的执行过程。

## 3.1 基本查询语法

### 3.1.1 SELECT语句

`SELECT`语句用于从数据库中检索数据。最简单的查询语法如下：

```sql
SELECT column1, column2 FROM table_name;
```

- `column1, column2`：要检索的列。
- `table_name`：要查询的表名。

#### 示例

```sql
SELECT name, email FROM users;
```

### 3.1.2 查询所有列

如果要查询表中的所有列，可以使用`*`符号：

```sql
SELECT * FROM table_name;
```

#### 示例

```sql
SELECT * FROM users;
```

## 3.2 条件查询

### 3.2.1 WHERE子句

`WHERE`子句用于指定查询条件，只返回满足条件的记录。

```sql
SELECT column1, column2 FROM table_name WHERE condition;
```

- `condition`：查询条件。

#### 示例

```sql
SELECT name, email FROM users WHERE name = 'Alice';
```

### 3.2.2 常见条件运算符

- **等于**：`=`
- **不等于**：`!=` 或 `<>`
- **大于**：`>`
- **小于**：`<`
- **大于等于**：`>=`
- **小于等于**：`<=`
- **LIKE**：用于模式匹配

#### 示例

```sql
SELECT name, email FROM users WHERE email LIKE '%example.com';
```

### 3.2.3 逻辑运算符

- **AND**：用于连接多个条件，所有条件都必须为真。
- **OR**：用于连接多个条件，任意一个条件为真即可。
- **NOT**：用于取反，将条件的结果取反。

#### 示例

```sql
SELECT name, email FROM users WHERE name = 'Alice' AND email LIKE '%example.com';
```

## 3.3 排序与分页

### 3.3.1 ORDER BY子句

`ORDER BY`子句用于对查询结果进行排序。

```sql
SELECT column1, column2 FROM table_name ORDER BY column1 ASC;
```

- `ASC`：升序排列。
- `DESC`：降序排列。

#### 示例

```sql
SELECT name, email FROM users ORDER BY name ASC;
```

### 3.3.2 LIMIT子句

`LIMIT`子句用于限制查询结果的数量。

```sql
SELECT column1, column2 FROM table_name LIMIT number OFFSET offset;
```

- `number`：要返回的记录数。
- `offset`：偏移量，从第几条记录开始返回。

#### 示例

```sql
SELECT name, email FROM users ORDER BY name ASC LIMIT 10 OFFSET 20;
```

## 3.4 聚合函数与分组查询

### 3.4.1 聚合函数

聚合函数用于对一组值执行计算，并返回一个单一的结果。

- **COUNT**：计算行数。
- **SUM**：计算总和。
- **AVG**：计算平均值。
- **MAX**：计算最大值。
- **MIN**：计算最小值。

#### 示例

```sql
SELECT COUNT(*) FROM users;
SELECT AVG(age) FROM users;
SELECT MAX(age) FROM users;
SELECT MIN(age) FROM users;
SELECT SUM(balance) FROM users;
```

### 3.4.2 GROUP BY子句

`GROUP BY`子句用于将查询结果按一个或多个列进行分组，然后对每个分组进行聚合计算。

```sql
SELECT column1, COUNT(column2) FROM table_name GROUP BY column1;
```

#### 示例

```sql
SELECT department, COUNT(*) FROM employees GROUP BY department;
```

### 3.4.3 HAVING子句

`HAVING`子句用于过滤分组后的结果，类似于`WHERE`子句，但`HAVING`作用于分组结果。

```sql
SELECT column1, COUNT(column2) FROM table_name GROUP BY column1 HAVING COUNT(column2) > 1;
```

#### 示例

```sql
SELECT department, COUNT(*) FROM employees GROUP BY department HAVING COUNT(*) > 10;
```

## 3.5 底层原理：查询执行过程

### 3.5.1 查询优化器

查询优化器是MySQL中的一个重要组件，它负责生成高效的查询执行计划。查询优化器的目标是找到最优的查询路径，以最小的成本完成查询。

#### 查询优化的主要步骤

1. **解析器**：将SQL查询解析成语法树。
2. **预处理器**：检查权限、解析视图和子查询。
3. **优化器**：生成多个执行计划，选择成本最低的执行计划。
4. **执行器**：按照优化器生成的执行计划执行查询。

### 3.5.2 查询执行计划

使用`EXPLAIN`命令可以查看查询的执行计划，帮助理解和优化查询。

```sql
EXPLAIN SELECT name, email FROM users WHERE email LIKE '%example.com';
```

**示例解释输出**：

```
+----+-------------+-------+------+----------------+------+---------+------+-------+-------------+
| id | select_type | table | type | possible_keys  | key  | key_len | ref  | rows  | Extra       |
+----+-------------+-------+------+----------------+------+---------+------+-------+-------------+
|  1 | SIMPLE      | users | ALL  | NULL           | NULL | NULL    | NULL | 100   | Using where |
+----+-------------+-------+------+----------------+------+---------+------+-------+-------------+
```

### 3.5.3 查询执行过程图示

为了更好地理解MySQL查询的执行过程，我们可以使用Mermaid绘制查询执行过程的图示，并进行美化。


## 小结

在本章中，我们详细介绍了MySQL的数据查询，包括基本查询语法、条件查询、排序与分页、聚合函数与分组查询。我们还讲解了MySQL查询的执行过程，并通过Mermaid图示帮助理解其工作原理。

这些查询操作是使用MySQL进行数据检索的基础，掌握这些内容将为后续的数据处理和分析打下坚实的基础。
