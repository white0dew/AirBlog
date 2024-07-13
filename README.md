大家好，我是白露。



今天我想和大家分享我的今年的第一个开源项目 —— **基于语雀+Nextjs+Vercel实现免费的博客系统**。



简单来说，**你在语雀写博客，然后直接一键同步到个人网站上，网站自动部署！**



而且，整个过程几乎不需要额外的成本，**也不用充值语雀超级会员**，hh。这个项目不仅解决了我长期以来的一个痛点，还大大提高了我的内容创作效率。



我相信，**这个解决方案也能帮助到许多和我有同样困扰的技术博主们**。

## 1. 开发背景

作为一个热爱技术的程序员，我一直有记录和分享技术内容的习惯。



最近几年，我一直使用语雀作为我的主要写作平台。原因很简单：**语雀提供了优秀的编辑体验，特别是对于技术文档来说，它的代码块、表格和图表支持都非常出色**。



然而，虽然我在语雀上积累了大量的技术文章，但这些内容似乎被局限在了一个相对封闭的环境中。语雀更像是一个私密的知识库，而非一个能让更多人发现我内容的平台。



意识到这个问题后，我开始思考如何让我的内容触达更多的读者。很自然地，我想到了自建博客网站这个方案。自己的网站，意味着我可以完全控制内容的展示方式，也可以通过各种SEO手段来提高文章的可见性。



但是，自建博客又带来了新的挑战：**如何高效地管理内容**？我调研了市面上常见的两种方案：

1. 将博客内容以Markdown文件的形式直接存放在GitHub仓库中
2. 将博客内容写入数据库，通过后端API实时读取



第一种方案看似简单，但每次更新内容都需要手动将语雀的文档复制到GitHub，这个过程最主要的问题就是**太繁琐**，我不想每次都手动同步一遍，虽然现在我之前一段时间就是这么做的。。。



而第二种方案虽然灵活，但会大大增加博客系统的复杂度，对于个人博客来说有点过于重量级了。



正当我为这个问题苦恼时，一个想法突然闪现：**有没有可能创造一个系统，让我在语雀写完文档后，只需点击一个按钮，就能自动更新到我的个人网站呢**？并且我还可以通过编辑语雀文章，个性化地改变网站。



这个想法让我兴奋不已。如果能实现这样的自动化流程，不仅能解决内容同步的问题，还能让我专注于创作本身，而不是被繁琐的技术细节所困扰。



带着这个想法，我开始了深入的研究和实验。经过不断的尝试和改进，我最终设计出了一个令人满意的解决方案。这个方案不仅满足了我的需求，还具有很强的可扩展性和适应性。



接下来，让我们一起深入了解这个解决方案的细节，看看它是如何彻底改变我的内容创作和发布流程的。

## 2. 实现思路

我想先概述一下整个系统的核心思路。这个自动化的内容发布流水线主要包含以下几个关键组件：

1. **Elog**：这是整个系统的核心，负责将**语雀文档自动同步到GitHub仓库**。它就像是连接语雀和GitHub的一座桥梁。
2. **Contentlayer**：作为博客网站的主体框架，Contentlayer负责将Markdown文件转换为易于在React应用中使用的结构化数据。
3. **Vercel**：提供自动部署服务。每当GitHub仓库有更新时，Vercel就会自动触发新的部署，确保网站内容始终保持最新。
4. **YAML Front Matter**：通过在Markdown文件的开头添加YAML格式的元数据，我们可以为每篇文章定义各种属性，**如标题、日期、标签等**。这些数据可以被用来控制网页的导航栏和菜单。
5. **自动提交百度索引**：为了提高网站的SEO效果，我编写了一个脚本，在每次部署完成后自动将新的或更新的页面提交到百度索引。
6. **自动生成sitemap**：同样出于SEO考虑，系统会自动生成网站的sitemap，便于提交给各大搜索引擎。



整个系统的工作流程如下：

![img](https://oss1.aistar.cool/typora/2024/07/86b487f146412502b041126da9f8dde3.svg+xml)

1. 我在语雀上创作或更新文章。
2. 通过Elog，将语雀上的内容自动同步到GitHub仓库。
3. GitHub仓库更新触发Vercel的自动部署。
4. Contentlayer在构建过程中处理Markdown文件，转换为React组件可用的数据。
5. 网站更新后，自动提交新页面到百度索引，并更新sitemap。



这个流程的**美妙之处在于**，除了第一步的内容创作，其他步骤都是自动进行的。



这就意味着，我可以将全部精力集中在写作上，**而不需要担心技术细节**。**这简直太棒了**！



这个解决方案有以下几个主要优势：

1. **写作体验优先**：**继续使用熟悉的语雀平台进行写作**，无需改变现有的工作流程。**而且，我不觉得有我在自建网站上实现一个博客编辑器，有语雀编辑器更好。**
2. **自动化程度高**：从内容同步到网站部署，再到SEO优化，全程自动化，大大减少了人工操作的需求。
3. **灵活性强**：通过YAML Front Matter，可以轻松控制每篇文章的元数据和展示方式。
4. **性能出色**：由于使用了SSG，站点访问速度和SEO都很不错。
5. **成本低**：利用GitHub和Vercel的免费服务，**几乎没有额外的运营成本**。
6. **可扩展性好**：这个架构可以轻松适应未来可能的需求变化，如添加新的内容类型或功能。比如，你可以基于个人的爱好，对网页排版和内容等进行自定义改造。

## 3. 细节介绍

现在，让我们深入每个核心组件的细节，看看它们是如何协同工作的。

### 3.1 Elog：语雀到GitHub的桥梁

Elog是这个系统中最关键的组件之一。它的主要任务是将语雀上的文档自动同步到GitHub仓库。

Elog的强大之处在于它不仅支持语雀，还支持Notion、飞书等多个写作平台。

Elog的工作原理相对简单：

1. 通过API获取语雀上的文档列表和内容。
2. 将获取到的内容转换为Markdown格式。
3. 将转换后的Markdown文件推送到指定的GitHub仓库。



使用Elog非常简单，主要通过一个配置文件来控制其行为。以下是一个基本的配置示例：

```javascript
// elog.config.js
module.exports = {
  write: {
    platform: 'yuque',
    yuque: {
      token: 'your_yuque_token',
      login: 'your_yuque_login',
      repo: 'your_yuque_repo',
    },
  },
  deploy: {
    platform: 'github',
    repo: 'your_github_repo',
    branch: 'main',
    token: 'your_github_token',
  },
  image: {
    enable: true,
    platform: 'github',
    host: 'https://raw.githubusercontent.com',
  }
}
```

这个配置文件定义了：

- 从哪个语雀仓库获取文档
- 将文档同步到哪个GitHub仓库
- 如何处理文档中的图片（这里选择了上传到GitHub）

注意，语雀文档使用Elog有两种方式，**一种是使用Token（要钱，一年299）；另一种是使用账号密码（不要钱），而且不会被泄露。**



**这里我分享一些Elog的使用技巧**

1. **定期同步**：可以设置一个定时任务，比如每天凌晨自动运行Elog，确保内容始终保持最新。
2. **选择性同步**：Elog支持通过标签或目录来选择性同步文档，这对于管理大量文档很有帮助。
3. **图片处理**：Elog可以自动将语雀中的图片上传到指定的图床，解决了图片防盗链的问题。
4. **文档美化**：Elog在同步过程中可以对Markdown文档进行一些美化处理，如统一标题格式、添加水印等。

通过Elog，我们解决了内容同步的问题，实现了从语雀到GitHub的自动化流程。接下来，让我们看看如何处理同步到GitHub的Markdown文件。

### 3.2 Contentlayer：让内容管理更轻松

Contentlayer是一个强大的内容SDK，它可以将Markdown等格式的文件转换为结构化的JSON数据，使得在React应用中使用这些内容变得极其简单。

#### 3.2.1 Contentlayer的核心概念

1. **Document Types**：定义了内容的结构，类似于数据库中的表结构。
2. **Fields**：Document Type中的字段，可以定义字段的类型、是否必须等属性。
3. **Computed Fields**：可以基于其他字段计算得出的字段，非常适合用于生成URL slug等。

#### 3.2.2 配置Contentlayer

以下是一个基本的Contentlayer配置文件示例：

```typescript
// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    draft: { type: 'boolean', default: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
})
```

这个配置定义了一个名为"Post"的Document Type，包含标题、日期、标签和草稿状态等字段，以及一个计算得出的URL字段。

#### 3.2.3 在React组件中使用Contentlayer

配置好Contentlayer后，我们可以在React组件中非常方便地使用这些数据：

```jsx
import { allPosts } from 'contentlayer/generated'

export default function Home() {
  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {allPosts.map((post) => (
          <li key={post._id}>
            <a href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

这里，`allPosts`是Contentlayer自动生成的，包含了所有的博客文章数据。

#### 3.2.4 Contentlayer的优势

1. **类型安全**：Contentlayer生成TypeScript类型定义，提供了excellent的类型提示和错误检查。
2. **性能优秀**：Contentlayer在构建时处理内容，运行时几乎没有额外开销。
3. **灵活性高**：可以轻松定义复杂的内容结构，满足各种需求。
4. **与Next.js完美集成**：特别适合用于构建基于Next.js的博客网站。

通过Contentlayer，我们解决了如何在React应用中高效管理和使用Markdown内容的问题。接下来，让我们看看如何将这个应用部署到线上。

### 3.3 Vercel：自动部署

Vercel是一个面向前端开发者的云平台，它提供了极其简单的部署流程和强大的性能优化功能。在我们的博客系统中，Vercel担任了自动部署的角色。

**为什么选择Vercel？**最主要的原因是我一直在用**，**之前几个 AI 项目我都是使用Vercel部署的。还有就是：

1. **简单易用**：Vercel与GitHub完美集成，只需几次点击就可以设置自动部署。
2. **性能出色**：Vercel自动应用了许多性能优化，如自动CDN分发、图片优化等。

最重要的是，对于个人项目，**Vercel提供的免费额度通常绰绰有余**。



配置Vercel自动部署非常简单，主要步骤如下：

1. **连接GitHub仓库**：
   在Vercel控制台中，选择"New Project"，然后选择你的GitHub仓库。
2. **配置构建设置**：
   Vercel通常能自动检测项目类型并提供合适的构建命令。

1. **环境变量设置**：
   如果你的项目需要一些环境变量（比如API密钥），可以在Vercel的项目设置中添加。
2. **部署钩子**：
   Vercel会自动为你的仓库设置一个GitHub webhook，每当有新的提交时，就会触发新的部署。



并且Vercel还有其他功能，例如自定义域名、测试分支部署、性能分析等。



通过Vercel，我们实现了博客内容的自动部署。**每次Elog将更新的文章同步到GitHub后**，Vercel都会自动触发新的部署，确保网站内容始终保持最新。



### 3.4 YAML Front Matter：灵活控制文章属性

YAML Front Matter是Markdown文件中用于定义元数据的一种方式。它位于文件的顶部，用三个连字符（---）包围。通过YAML Front Matter，我可以为每篇文章定义各种属性，这些属性可以被Contentlayer识别并用于控制文章的展示方式。

#### 3.4.1 基本用法

一个典型的YAML Front Matter看起来是这样的：

```yaml
---
title: 如何实现语雀到个人博客的一键同步
date: 2023-04-01
tags: [技术, 博客, 自动化]
description: 本文详细介绍了如何建立一个从语雀到个人博客的自动化发布系统。
image: /images/blog-automation.jpg
draft: false
---

文章内容...
```

#### 3.4.2 自定义字段

除了常见的title、date、tags等字段，我们还可以根据需要添加自定义字段。例如：

```yaml
---
title: 深入理解React Hooks
nav_path:定义网站url别名
is_nav:是否要作为导航栏
---
```

这些自定义字段可以在Contentlayer中定义，然后在React组件中使用。

#### 3.4.3 在Contentlayer中处理YAML Front Matter

在Contentlayer的配置中，我们需要为这些字段定义相应的类型：

```typescript
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    description: { type: 'string' },
    image: { type: 'string' },
    draft: { type: 'boolean', default: false },
    ……
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
  },
}))
```

#### 3.4.4 在React组件中使用YAML Front Matter数据

有了这些定义，我们就可以在React组件中轻松使用这些数据：

```jsx
import { allPosts } from 'contentlayer/generated'

export default function PostList() {
  return (
    <div>
      {allPosts
        .filter(post => !post.draft)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(post => (
          <div key={post._id}>
            <h2><a href={post.url}>{post.title}</a></h2>
            <p>{post.description}</p>
            <div>难度: {post.difficulty}</div>
            <div>预计阅读时间: {post.estimatedReadingTime}分钟</div>
            <div>
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))
      }
    </div>
  )
}
```

通过YAML Front Matter，我们可以非常灵活地控制每篇文章的元数据，这些数据可以用于文章的展示、分类、搜索等多个方面，极大地增强了博客的功能性和可用性。

### 3.4 评论系统

我相信大部分作者都想能够有人对自己的文章评论吧？我也考虑到了，所以集成了我一直以来使用的评论系统 Artalk。



注意，这个是一个可选的功能，因为如果你需要使用Artalk评论系统的话，你得有一个后端服务器来存储数据。

![img](https://oss1.aistar.cool/typora/2024/07/43e61a811616db2465cd2a1fe9d23124.png)

### 3.5 SEO

为了提高博客的SEO效果，我们需要将新发布或更新的页面提交到搜索引擎的索引中。我主要做了两件事，自动提交网站url给百度，已经生成Sitemap。



百度提供了一个API，允许网站管理员主动提交页面到百度索引。使用这个API，我们可以在每次部署完成后自动提交新的或更新的页面。



Sitemap是一个XML文件，其中列出了网站上的所有重要页面。它帮助搜索引擎更好地理解你的网站结构，从而更有效地爬取和索引你的内容。在我们的博客系统中，我们可以实现自动生成sitemap的功能。



生成sitemap后，下一步是将它提交给主要的搜索引擎。对于Google，你可以使用Google Search Console来提交sitemap。



对于百度，我们可以使用之前讨论的API来提交。**但是个人用户无法直接给百度提交sitemap，只能一个网页一个网页提交，并且每天只有十次，lj百度**！！



通过实现自动生成和提交sitemap，我们可以确保搜索引擎能够全面地了解和索引我们的博客内容，从而提高网站的SEO效果。

## 4. 网页实际演示

### 4.1 首页

首页我设计的比较简单，大家可以自行修改，因人而异。

![img](https://oss1.aistar.cool/typora/2024/07/b05ba6af0f29a96768ee8add6ffc68b8.png)

主页下边我使用Artalk的计数功能来统计每个网页的观看人数。

![img](https://oss1.aistar.cool/typora/2024/07/ba8dc7856396b72a208971f552980f46.png)



### 4.2 导航菜单

![img](https://oss1.aistar.cool/typora/2024/07/67e7828d12c0a96bb9a70bdaa5625f31.png)

其实导航菜单就是根据语雀知识库里的排版来的，当然，你也可以根据yaml字段来自定义，比如，是不是需要上图这种下拉子菜单。

![img](https://oss1.aistar.cool/typora/2024/07/fa5aa60c883c680fb5a7bea1daf78b37.png)

如果想让某个菜单成为下拉菜单，只需要在正文开头这样写即可。

![img](https://oss1.aistar.cool/typora/2024/07/9a125c49ecbde610c03bbccf8152fe7e.png)

### 4.3 文章页

章节列表页我设计的也很简单，左侧就是文章列表，右侧就是文章目录。

![img](https://oss1.aistar.cool/typora/2024/07/7f079eb8d3e173788a4dc8ebc4973e2d.png)

在博客正文出，我设计了头像以及发布时间、阅读时间、阅读人数、评论人数等等。



### 4.4 友情链接

emmm……

友情链接页是我设计最粗糙的地方，我直接用表格来展示了！

但其实完全可以使用自定义组件来渲染markdown，后面有时间再改进吧！

![img](https://oss1.aistar.cool/typora/2024/07/50a6c658f7505ebbc708dc847f835dec.png)



### 4.5 网站体验地址

国内：https://offernow.cn/  我用docker部署的

国际：https://offer-now.vercel.app/ 我用vercel部署的



## TODO

尽管我们已经构建了一个功能相当完善的博客系统，但仍有一些方面值得进一步探索和改进。以下是一些未来可能的改进方向和尚未解决的问题：

1. **网站搜索功能：**不管是博客还是个人网站，搜索功能都是很常用的功能，后面我会计划新增搜索功能；
2. **国际化**：支持多语言内容，扩大博客的受众范围。
3. **内容变现**：探索如创建付费专栏、在线课程等内容变现的可能性。或者引流功能等，用户需要扫码才可以阅读文章。
4. **适配移动端：**由于我主要在PC使用，移动端的展示有很大的问题，以后需要慢慢解决。
5. **互动功能增强**：添加更多互动功能，如读者投票、问答板块等，增强与读者的互动。
6. **样式问题：**现在有不少样式展示存在问题，但是由于我是业余前端，得慢慢修。大家如果有时间，欢迎pull merge！比如右侧章节目录的一条线，始终不知道怎么去掉····

![img](https://oss1.aistar.cool/typora/2024/07/16cd45981d5f1b57126a72c92913bb76.png)



作为技术博主，我有幸站在技术发展的前沿，为整个技术社区贡献我们的智慧。希望这个项目能为其他技术博主提供一些启发，**也期待看到更多创新的内容发布解决方案涌现**。



让我们继续书写、分享，用技术的力量推动知识的传播，共同建设一个更加开放、互联的技术世界。



**写了这么多，大家不点赞或者start一下，说不过去了吧？**

**项目地址：**[**https://github.com/white0dew/OfferNow**](https://github.com/white0dew/OfferNow)

**网站-国内**：https://offernow.cn/  我用docker部署的

**网站-国际：**[**https://offer-now.vercel.app/**](https://offer-now.vercel.app/) 我用vercel部署的

**这是我今年分享的第一个开源项目，希望大家会希望！****🎇🎇**
