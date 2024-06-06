---
title: 第五章：文件操作
urlname: qws9bios7wl3p9rf
date: '2024-06-06 21:02:22'
updated: '2024-06-06 21:03:07'
description: 在本章中，我们将深入探讨 PHP 中的文件操作。这是一个非常重要的主题，因为许多应用程序需要处理文件输入和输出。我们将学习如何打开和关闭文件、读取和写入文件内容，以及进行文件和目录的操作。文件读写在 PHP 中，处理文件的基本步骤是打开文件、读取或写入内容，然后关闭文件。让我们详细了解这些步骤...
---
在本章中，我们将深入探讨 PHP 中的文件操作。这是一个非常重要的主题，因为许多应用程序需要处理文件输入和输出。我们将学习如何打开和关闭文件、读取和写入文件内容，以及进行文件和目录的操作。

## 文件读写

在 PHP 中，处理文件的基本步骤是打开文件、读取或写入内容，然后关闭文件。让我们详细了解这些步骤。

### 打开与关闭文件

在使用文件之前，我们首先需要打开它。PHP 提供了 `fopen()` 函数来执行这个操作。以下是一个简单的例子：

```php
<?php
$file = fopen("example.txt", "r"); // 以只读模式打开文件
if ($file) {
    echo "文件已成功打开。";
    fclose($file); // 关闭文件
} else {
    echo "无法打开文件。";
}
?>
```

在上面的代码中，`fopen()` 函数的第一个参数是要打开的文件路径，第二个参数是模式。常见的模式包括：

- `r`：只读模式
- `w`：写入模式，如果文件不存在则创建
- `a`：追加模式，如果文件不存在则创建
- `r+`：读写模式

### 读取文件内容

读取文件内容的函数有很多，例如 `fread()`, `fgets()` 和 `file_get_contents()`。下面是一些示例：

#### 使用 `fread()`

```php
<?php
$file = fopen("example.txt", "r");
if ($file) {
    $content = fread($file, filesize("example.txt")); // 读取文件内容
    echo $content;
    fclose($file);
} else {
    echo "无法打开文件。";
}
?>
```

#### 使用 `fgets()`

```php
<?php
$file = fopen("example.txt", "r");
if ($file) {
    while (($line = fgets($file)) !== false) {
        echo $line . "<br>";
    }
    fclose($file);
} else {
    echo "无法打开文件。";
}
?>
```

#### 使用 `file_get_contents()`

```php
<?php
$content = file_get_contents("example.txt");
echo $content;
?>
```

### 写入文件内容

写入文件内容也有多种方法，例如 `fwrite()`, `fputs()` 和 `file_put_contents()`。以下是一些示例：

#### 使用 `fwrite()` 和 `fputs()`

```php
<?php
$file = fopen("example.txt", "w");
if ($file) {
    fwrite($file, "这是写入的文本\n");
    fputs($file, "这是另一个写入的文本\n");
    fclose($file);
    echo "文件写入成功。";
} else {
    echo "无法打开文件。";
}
?>
```

#### 使用 `file_put_contents()`

```php
<?php
file_put_contents("example.txt", "这是使用 file_put_contents 写入的文本\n");
echo "文件写入成功。";
?>
```

## 文件与目录操作

除了读取和写入文件，PHP 还提供了许多函数来操作文件和目录，例如创建、删除和重命名。

### 创建、删除与重命名文件

#### 创建文件

```php
<?php
$file = fopen("newfile.txt", "w");
if ($file) {
    fclose($file);
    echo "文件已创建。";
} else {
    echo "无法创建文件。";
}
?>
```

#### 删除文件

```php
<?php
if (unlink("newfile.txt")) {
    echo "文件已删除。";
} else {
    echo "无法删除文件。";
}
?>
```

#### 重命名文件

```php
<?php
if (rename("oldname.txt", "newname.txt")) {
    echo "文件已重命名。";
} else {
    echo "无法重命名文件。";
}
?>
```

### 文件与目录的创建、删除与重命名

#### 创建目录

```php
<?php
if (mkdir("newdirectory")) {
    echo "目录已创建。";
} else {
    echo "无法创建目录。";
}
?>
```

#### 删除目录

```php
<?php
if (rmdir("newdirectory")) {
    echo "目录已删除。";
} else {
    echo "无法删除目录。";
}
?>
```

#### 重命名目录

```php
<?php
if (rename("olddirectory", "newdirectory")) {
    echo "目录已重命名。";
} else {
    echo "无法重命名目录。";
}
?>
```

### 路径操作与文件检查

PHP 提供了一些函数来处理文件路径和检查文件的状态。

#### 获取文件路径

```php
<?php
echo realpath("example.txt");
?>
```

#### 检查文件是否存在

```php
<?php
if (file_exists("example.txt")) {
    echo "文件存在。";
} else {
    echo "文件不存在。";
}
?>
```

#### 检查是否为文件或目录

```php
<?php
if (is_file("example.txt")) {
    echo "这是一个文件。";
} elseif (is_dir("example")) {
    echo "这是一个目录。";
} else {
    echo "既不是文件也不是目录。";
}
?>
```

#### 文件大小和最后修改时间

```php
<?php
echo "文件大小: " . filesize("example.txt") . " 字节";
echo "最后修改时间: " . date("F d Y H:i:s.", filemtime("example.txt"));
?>
```

