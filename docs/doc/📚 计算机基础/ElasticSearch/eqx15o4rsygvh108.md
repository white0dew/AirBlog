---
title: Elasticsearch 的 Mapping设置
urlname: eqx15o4rsygvh108
date: '2024-09-26 12:36:28'
updated: '2024-09-26 12:37:45'
description: 在 Elasticsearch 中，Mapping（映射）是非常重要的概念，它定义了文档中各个字段的类型、存储方式、分析器等属性。正确地设置 Mapping 可以确保数据能够被有效地存储和检索。本文将详细介绍 Elasticsearch Mapping 文件的设置。一、Mapping 的作用M...
---
在 Elasticsearch 中，Mapping（映射）是非常重要的概念，它定义了文档中各个字段的类型、存储方式、分析器等属性。



正确地设置 Mapping 可以确保数据能够被有效地存储和检索。本文将详细介绍 Elasticsearch Mapping 文件的设置。



# 一、Mapping 的作用
Mapping 类似于数据库中的表结构定义，它决定了数据在 Elasticsearch 中的存储方式和搜索行为。



通过 Mapping，我们可以指定字段的数据类型、是否被索引、是否存储、分析器等属性。这使得 Elasticsearch 能够根据我们的需求对数据进行高效的存储和检索。

# 二、创建 Mapping
在 Elasticsearch 中，可以通过多种方式创建 Mapping。以下是两种常见的方法：

1. 自动创建 Mapping
    - 当我们向一个不存在的索引中插入文档时，Elasticsearch 会自动根据文档的结构创建 Mapping。这种方式很方便，但可能会导致一些不可预测的结果，因为 Elasticsearch 会根据文档的内容猜测字段的类型。
    - 例如，如果我们插入一个包含字符串字段的文档，Elasticsearch 可能会将该字段的类型猜测为 `text`，并自动创建一个合适的分析器。
2. 手动创建 Mapping
    - 手动创建 Mapping 可以更好地控制字段的类型和属性。我们可以使用 Elasticsearch 的 API 或者配置文件来定义 Mapping。
    - 以下是一个使用 API 创建 Mapping 的示例：

```json
PUT /my_index
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "standard"
      },
      "description": {
        "type": "text",
        "analyzer": "english"
      },
      "price": {
        "type": "double"
      }
    }
  }
}
```

在这个例子中，我们创建了一个名为 `my_index` 的索引，并定义了三个字段：`title`、`description` 和 `price`。



`title` 和 `description` 字段被定义为 `text` 类型，并分别使用了 `standard` 和 `english` 分析器。`price` 字段被定义为 `double` 类型。

# 三、Mapping 的属性
1. `type`（数据类型）
    - Elasticsearch 支持多种数据类型，包括字符串、数字、日期、布尔值等。选择合适的数据类型非常重要，因为它会影响数据的存储方式和搜索性能。
    - 例如，`text` 类型适用于全文搜索，而 `keyword` 类型适用于精确匹配。`integer` 和 `double` 类型适用于数字，`date` 类型适用于日期。
2. `index`（是否被索引）
    - 如果一个字段被设置为 `"index": true`，那么它的值会被索引，以便可以进行搜索。如果设置为 `"index": false`，则该字段不会被索引，不能进行搜索。
    - 默认情况下，大多数字段类型都会被索引，除非明确设置为 `"index": false`。
3. `store`（是否存储）
    - 如果一个字段被设置为 `"store": true`，那么它的值会被独立存储在索引中。如果设置为 `"store": false`，则该字段的值不会被独立存储，而是从索引中派生出来。
    - 默认情况下，字段的值不会被独立存储，除非明确设置为 `"store": true`。
4. `analyzer`（分析器）
    - 分析器用于将文本字段的值分解为词项，以便进行全文搜索。Elasticsearch 提供了多种内置的分析器，也可以自定义分析器。
    - 例如，`standard` 分析器是 Elasticsearch 的默认分析器，它会将文本分割成词项，并进行小写转换和去除标点符号等操作。`english` 分析器则专门用于英语文本，它会进行词干提取等操作。

# 四、更新 Mapping
一旦 Mapping 被创建，就不能轻易地修改。但是，在某些情况下，我们可能需要更新 Mapping。例如，添加新的字段或者修改现有字段的属性。



在 Elasticsearch 中，可以使用 `_mapping` API 来更新 Mapping。但是，这种方式只能添加新的字段，不能修改现有字段的类型。



以下是一个添加新字段的示例：

```json
PUT /my_index/_mapping
{
  "properties": {
    "new_field": {
      "type": "text",
      "analyzer": "standard"
    }
  }
}
```

在这个例子中，我们向 `my_index` 索引中添加了一个名为 `new_field` 的字段。



你会了吗？

