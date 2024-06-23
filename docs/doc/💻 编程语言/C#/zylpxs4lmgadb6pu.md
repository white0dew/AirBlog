---
title: 第 5 章：字符串
urlname: zylpxs4lmgadb6pu
date: '2024-06-21 16:37:36'
updated: '2024-06-21 16:37:48'
description: 本章将深入探讨 C#中的字符串操作，包括拼接、截取、分割等基本操作，及其常用方法和正则表达式的应用。
keywords: '字符串操作, 字符串方法, 正则表达式, C#基础, 编程学习'
---
## 前言

字符串是程序中常见的数据类型之一，无论是处理用户输入、生成输出，还是进行数据处理，字符串都扮演着重要的角色。本章将详细介绍 C#中的字符串及其基本操作和常用方法，同时深入探讨正则表达式在字符串操作中的应用。

## 5.1 什么是字符串

字符串（String）是一种字符序列，通常用于表示文本数据。在 C#中，字符串是不可变的，这意味着一旦创建，就不能修改其内容。每次对字符串进行操作，都会生成一个新的字符串对象。

```csharp
string greeting = "Hello, World!";
Console.WriteLine(greeting);
```

在上述代码中，`greeting`变量保存了一个字符串。当我们输出`greeting`时，控制台会显示“Hello, World!”。

## 5.2 字符串的基本操作

### 5.2.1 拼接

字符串拼接是将两个或多个字符串连接在一起的操作。在 C#中，有多种方式可以进行字符串拼接：

- 使用加号 (`+`) 运算符
- 使用 `String.Concat` 方法
- 使用 `StringBuilder` 类

```csharp
string firstName = "John";
string lastName = "Doe";

// 使用 + 号拼接
string fullName = firstName + " " + lastName;
Console.WriteLine(fullName); // 输出: John Doe

// 使用 String.Concat 方法
fullName = String.Concat(firstName, " ", lastName);
Console.WriteLine(fullName); // 输出: John Doe

// 使用 StringBuilder
StringBuilder sb = new StringBuilder();
sb.Append(firstName);
sb.Append(" ");
sb.Append(lastName);
fullName = sb.ToString();
Console.WriteLine(fullName); // 输出: John Doe
```

### 5.2.2 截取

截取字符串的一部分是常见的操作。C#提供了多种截取字符串的方法，包括 `Substring` 和 `Split`。

```csharp
string sentence = "The quick brown fox jumps over the lazy dog";

// 使用 Substring 方法
string quickBrownFox = sentence.Substring(4, 15);
Console.WriteLine(quickBrownFox); // 输出: quick brown fox

// 使用 Split 方法
string[] words = sentence.Split(' ');
foreach (string word in words)
{
    Console.WriteLine(word);
}
// 依次输出: The, quick, brown, fox, jumps, over, the, lazy, dog
```

### 5.2.3 分割

分割字符串是将一个字符串拆分成多个子字符串的过程，通常依据某个分隔符进行分割。上面的 `Split` 方法已经展示了如何按照空格分割字符串。

```csharp
string csv = "apple,banana,orange";
string[] fruits = csv.Split(',');

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
// 依次输出: apple, banana, orange
```

## 5.3 字符串的常用方法

C#中的 `String` 类提供了许多实用的方法来操作字符串。以下是一些常用的方法：

### 5.3.1 Contains

检查字符串是否包含指定的子字符串。

```csharp
string sentence = "The quick brown fox";
bool containsQuick = sentence.Contains("quick");
Console.WriteLine(containsQuick); // 输出: True
```

### 5.3.2 IndexOf 和 LastIndexOf

查找子字符串在字符串中的位置。`IndexOf` 从头开始查找，`LastIndexOf` 从尾开始查找。

```csharp
string sentence = "The quick brown fox jumps over the lazy dog";
int index = sentence.IndexOf("quick");
Console.WriteLine(index); // 输出: 4

int lastIndex = sentence.LastIndexOf("the");
Console.WriteLine(lastIndex); // 输出: 31
```

### 5.3.3 Replace

替换字符串中的子字符串。

```csharp
string sentence = "The quick brown fox jumps over the lazy dog";
string newSentence = sentence.Replace("fox", "cat");
Console.WriteLine(newSentence); // 输出: The quick brown cat jumps over the lazy dog
```

### 5.3.4 Trim

移除字符串两端的空白字符。

```csharp
string paddedString = "   Hello, World!   ";
string trimmedString = paddedString.Trim();
Console.WriteLine(trimmedString); // 输出: Hello, World!
```

## 5.4 正则表达式

正则表达式（Regular Expression，简称 regex）是一种模式匹配技术，用于查找、替换和验证字符串。C#中的 `System.Text.RegularExpressions` 命名空间提供了对正则表达式的支持。

### 5.4.1 基本用法

使用正则表达式进行模式匹配和替换。

```csharp
using System.Text.RegularExpressions;

string input = "The quick brown fox jumps over the lazy dog";
string pattern = @"\b\w{4}\b"; // 匹配所有四个字符的单词
MatchCollection matches = Regex.Matches(input, pattern);

foreach (Match match in matches)
{
    Console.WriteLine(match.Value);
}
// 依次输出: quick, over, lazy
```

### 5.4.2 验证输入

使用正则表达式验证字符串是否符合某种模式，例如邮箱地址。

```csharp
string email = "example@example.com";
string pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";

bool isValid = Regex.IsMatch(email, pattern);
Console.WriteLine(isValid); // 输出: True
```

### 5.4.3 替换字符串

使用正则表达式进行字符串替换。

```csharp
string input = "The quick brown fox jumps over the lazy dog";
string pattern = @"\b\w{4}\b"; // 匹配所有四个字符的单词
string replacement = "****";
string result = Regex.Replace(input, pattern, replacement);

Console.WriteLine(result); // 输出: The **** brown fox jumps **** the **** dog
```

本章详细介绍了 C#中的字符串及其基本操作和常用方法，包括拼接、截取、分割等。同时，还探讨了正则表达式在字符串操作中的应用。通过本章的学习，读者可以掌握如何在 C#中高效地进行字符串处理，为后续的编程学习打下坚实的基础。
