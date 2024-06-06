---
title: 第五章：文件操作
urlname: en013flx6b8gtvyi
date: '2024-06-06 21:11:57'
updated: '2024-06-06 21:12:18'
description: 文件操作是编程中的一个重要部分，通过文件操作，我们可以将数据持久化存储在磁盘上，便于后续的读取与处理。本章将介绍如何在 Python 中进行文件的读写与操作。1. 文件读写1.1 打开与关闭文件在 Python 中，使用 open() 函数可以打开文件，使用 close() 函数可以关闭文件。...
---
文件操作是编程中的一个重要部分，通过文件操作，我们可以将数据持久化存储在磁盘上，便于后续的读取与处理。本章将介绍如何在 Python 中进行文件的读写与操作。

## 1. 文件读写

### 1.1 打开与关闭文件

在 Python 中，使用 `open()` 函数可以打开文件，使用 `close()` 函数可以关闭文件。`open()` 函数返回一个文件对象，支持两种模式：

- 读取模式：`r`
- 写入模式：`w`

```python
# 打开文件进行读取
file = open('example.txt', 'r')
# 读取文件内容
content = file.read()
print(content)
# 关闭文件
file.close()
```

为了避免忘记关闭文件，可以使用 `with` 语句，它会在代码块执行完毕后自动关闭文件：

```python
with open('example.txt', 'r') as file:
    content = file.read()
    print(content)
```

### 1.2 读取文件内容

可以通过多种方式读取文件内容：

- `read(size)`：读取指定大小的字符
- `readline()`：读取单行内容
- `readlines()`：读取所有行并返回一个列表

```python
with open('example.txt', 'r') as file:
    # 读取完整内容
    content = file.read()
    print(content)

    # 读取单行内容
    file.seek(0)  # 重置文件指针
    line = file.readline()
    print(line)

    # 读取所有行
    file.seek(0)  # 重置文件指针
    lines = file.readlines()
    print(lines)
```

### 1.3 写入文件内容

写入文件时，如果文件不存在将自动创建；如果文件存在则会覆盖原有内容。使用 `write()` 方法可以写入字符串内容。

```python
with open('example.txt', 'w') as file:
    file.write("Hello, Python!\n")
    file.write("This is a new line.")
```

可以使用追加模式 `a` 来在文件末尾追加内容：

```python
with open('example.txt', 'a') as file:
    file.write("\nAppending a new line.")
```

## 2. 文件与目录操作

除了读写文件内容，Python 还提供了一些模块用于文件与目录的操作。

### 2.1 文件与目录的创建、删除与重命名

使用 `os` 模块可以进行文件和目录的操作。

```python
import os

# 创建文件
with open('new_file.txt', 'w') as file:
    file.write("This is a new file.")

# 创建目录
os.mkdir('new_directory')

# 删除文件
os.remove('new_file.txt')

# 删除目录
os.rmdir('new_directory')

# 重命名文件
os.rename('example.txt', 'renamed_example.txt')
```

### 2.2 路径操作与文件检查

`os.path` 模块提供了对路径和文件检查的支持。

```python
import os

# 获取文件绝对路径
abs_path = os.path.abspath('renamed_example.txt')
print(abs_path)

# 检查文件是否存在
exists = os.path.exists('renamed_example.txt')
print(exists)

# 检查是否为文件
is_file = os.path.isfile('renamed_example.txt')
print(is_file)

# 检查是否为目录
is_dir = os.path.isdir('some_directory')
print(is_dir)
```

### 2.3 示例：读取配置文件

读取配置文件是文件操作的一个典型应用场景。以下是一个读取配置文件的示例：

假设我们有一个配置文件 `config.txt`，内容如下：

```
[settings]
username = admin
password = 12345
```

我们可以使用以下代码读取并解析配置文件：

```python
def read_config(file_path):
    config = {}
    with open(file_path, 'r') as file:
        for line in file:
            if '=' in line:
                key, value = line.strip().split('=')
                config[key.strip()] = value.strip()
    return config

config = read_config('config.txt')
print(config)
```

## 总结

通过本章的学习，我们掌握了 Python 中文件操作的基本方法，包括文件的读写、文件与目录的创建、删除与重命名以及路径操作与文件检查。在实际编程过程中，文件操作是一个非常常见的需求，熟练掌握这些操作将有助于提高我们的编程能力。

在下一章中，我们将深入学习异常处理，了解如何在代码中优雅地处理各种异常情况，确保程序的健壮性和稳定性。

