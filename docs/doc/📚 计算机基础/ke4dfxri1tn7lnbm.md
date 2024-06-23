---
title: ElasticSearch
urlname: ke4dfxri1tn7lnbm
date: '2024-05-28 15:14:51'
updated: '2024-06-21 17:10:26'
description: Elasticsearch（简称 ES）是一个基于 Lucene 的全文检索引擎。其核心功能是将数据进行分词后保存索引，从而实现高效的查询。虽然在频繁数据更新和关联查询方面不如 MySQL，但在处理和管理大数据量的查询上，Elasticsearch 展现出了极高的效率。索引的重要性nav_pa...
---

Elasticsearch（简称 ES）是一个基于 Lucene 的全文检索引擎。其核心功能是将数据进行分词后保存索引，从而实现高效的查询。虽然在频繁数据更新和关联查询方面不如 MySQL，但在处理和管理大数据量的查询上，Elasticsearch 展现出了极高的效率。

## 索引的重要性

---

nav_path:es
keywords: Elasticsearch, Lucene, 倒排索引, Term Dictionary, Term Index, FST
description: 了解Elasticsearch（简称ES）的核心功能及其基于Lucene的倒排索引技术，探索Term Dictionary和Term Index的优化方法，并解析FST在Elasticsearch中的应用。
---
在学习其他数据库时，我们了解到索引是数据库系统中至关重要的部分，直接决定着查询的效率。Elasticsearch 之所以能够实现高速查询，主要得益于其底层 Lucene 使用了倒排索引（Inverted Index）的方式，并通过多种优化提升性能。

### 什么是倒排索引？

首先，我们来了解一下正排索引。正排索引将 `doc_id` 作为主键索引 key，对应查询到的整行数据 value。如下表所示：

| doc_id | content |
| --- | --- |
| 1 | "Elasticsearch is powerful" |
| 2 | "Lucene forms its core" |


倒排索引则是反其道而行之。它将每句话按单词拆分，然后记录每个单词对应的 `doc_id` 列表。如下所示：

| Term | doc_id |
| --- | --- |
| Elasticsearch | [1] |
| is | [1] |
| powerful | [1] |
| Lucene | [2] |
| forms | [2] |
| its | [2] |
| core | [2] |


当需要查询包含某个单词的数据时，只需通过倒排索引找到对应的 `doc_id` 列表，再通过映射方式查询到具体的数据。例如，查询含有“Lucene”的数据，通过倒排索引会找到 `doc_id` 为 [2] 的文档，从而快速定位数据。


### Term Dictionary 和 Term Index

为了实现倒排索引，我们需要解决如何高效存储和查找 Term 的问题。所有的 Term 组成一个 Term Dictionary（单词词典）。英文分词相对简单，通过空格和标点符号分隔文本即可，而中文则相对复杂，但有许多开源工具支持。

#### Term Index 的引入

当文本量巨大时，分词后的 Term 数量也会大量增加。直接将 Term Dictionary 存放于内存是不现实的，但如果存放于磁盘，访问效率又不高。为此，Elasticsearch 引入了 Term Index，将 Term Dictionary 创建一个索引结构放入内存，从而减少磁盘IO。


Term Index 类似于字典的大章节表。如下所示：

- A 开头的 term ……………. Xxx 页
- C 开头的 term ……………. Yyy 页
- E 开头的 term ……………. Zzz 页

由于 term 未必都是英文字符，Term Index 实际上是一棵 trie 树（字典树），通过前缀共享的方式实现快速查找。


#### FST：有限状态转移器

在 Lucene 中，Term Index 使用了 FST（Finite State Transducers），这是一种变种的 trie 树，既共享前缀也共享后缀，极大地节省了空间。FST 使用 FSM（有限状态机）作为数据结构，将 term 以有限状态机的形式存储和检索。


#### 为什么 Elasticsearch 比 MySQL 快？

MySQL 只有一层 Term Dictionary，以 B-tree 排序方式存储在磁盘上。检索一个 term 需要多次随机读取磁盘。而 Lucene 在 Term Dictionary 基础上添加了 Term Index，加速检索过程。Term Index 以树的形式缓存在内存中，从 Term Index 查到对应的 Term Dictionary 块位置后，再去磁盘找 term，大大减少了磁盘随机访问次数。


## FST 的实现

FST 的实现需要我们了解如何使用确定无环有限状态接收机（FSA）来实现有序集合（Ordered Sets），以及通过确定无环状态转换器（FST）来实现有序映射（Ordered Maps）。

### 有序集合（Ordered Sets）

有序集合可以用二叉树或 B 树实现，无序集合通常使用哈希表。FSA 是 FSM 的一种，特性如下：

- 确定：每个状态最多只有一个转移路径。
- 无环：无法重复遍历同一个状态。
- 接收机：有限状态机只接受特定的输入序列，并终止于 final 状态。

通过 FSA 可以高效地判断一个 key 是否在集合内，查询时间复杂度取决于 key 的长度，而不是集合的大小。


### 有序映射（Ordered Maps）

有序映射类似于普通 map，但其 key 是有序的。FST 是一种 FSM，具有如下特性：

- 确定：每个状态最多只有一个转移路径。
- 无环：无法重复遍历同一个状态。
- transducer：特定序列输入时终止于 final 状态，并输出一个值。

FST 通过关联 output 值实现 key 的快速查找和值返回。其核心思想是在转移路径上分配和共享 outputs，使路径唯一。


### 构建 FST

构建 FST 的过程与 FSA 类似，主要区别在于如何在转移路径上放置和共享 outputs。例如，插入 key "mon:2" 后，FST 可能如下：


在构建 FST 时，会根据共享前缀和后缀进行状态合并和输出值分配，以实现高效的存储和检索。
### FST 的构建实例

为了更具体地说明 FST 的构建过程，我们来看一个包含多个 key 的集合。假设我们有以下词汇及其对应的值：

- "mon": 2
- "tues": 3
- "thurs": 5

#### 步骤1：插入 "mon:2"

从第1个 key "mon:2" 开始：


#### 步骤2：插入 "thurs:5"

插入第二个 key "thurs:5" 后，状态变为：


#### 步骤3：插入 "tues:3"

插入第三个 key "tues:3" 后，共享前缀 "tu" 会导致部分状态合并：


至此，FST 的状态转换图基本成型，通过共享前缀和后缀，有效地减少了状态和转移，节省了空间。

### 总结

Elasticsearch 的高效查询能力得益于其底层 Lucene 的倒排索引和多种优化技术。通过引入 Term Dictionary 和 Term Index 结构，并使用 FST 实现快速查找和存储，Elasticsearch 在处理大数据量和全文检索方面表现出色。
### 参考链接

- [Elasticsearch查询速度为什么这么快？](https://example.com)
- [ES倒排索引与B+Tree对比](https://example.com)
- [Mysql的磁盘IO次数](https://example.com)

