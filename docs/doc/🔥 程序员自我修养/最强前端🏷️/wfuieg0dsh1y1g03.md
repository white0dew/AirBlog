---
title: Omit是什么意思？
urlname: wfuieg0dsh1y1g03
date: '2024-09-11 16:02:28'
updated: '2024-09-11 16:04:19'
description: '代码如下：const [inputParams, updateInputParams] = useSetState<     Omit<GetBlogsDTO, ''pageIndex'' | ''pageSize''>   >({     title: undefined,     publishe...'
---
代码如下：

```java
const [inputParams, updateInputParams] = useSetState<
    Omit<GetBlogsDTO, 'pageIndex' | 'pageSize'>
  >({
    title: undefined,
    published: undefined,
    tags: undefined,
  });
```

这个Omit是什么意思？



在这个上下文中，`Omit<GetBlogsDTO, 'pageIndex' | 'pageSize'>` 表示创建一个新的类型，该类型是从 `GetBlogsDTO` 类型中排除 `'pageIndex'` 和 `'pageSize'` 属性后的类型。



**`Omit` 是 TypeScript 中的一个工具类型，用于从一个现有类型中排除指定的属性，从而创建一个新的类型。**



所以，`inputParams` 和 `updateInputParams` 是基于这个新类型进行操作的，它们不包含 `'pageIndex'` 和 `'pageSize'` 属性。

