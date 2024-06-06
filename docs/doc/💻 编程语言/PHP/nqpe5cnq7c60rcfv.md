---
title: 第九章：项目实战：创建一个博客系统
urlname: nqpe5cnq7c60rcfv
date: '2024-06-06 21:04:15'
updated: '2024-06-06 21:05:23'
description: 这一章将带领你从零开始，逐步创建一个功能完备的博客系统。这不仅是对前面章节所学内容的实践和巩固，也是一次宝贵的项目经验积累。通过这个项目，你将深入理解 PHP 的应用，并掌握开发一个完整项目的流程和技巧。项目介绍与规划项目需求分析与功能规划在开始编码之前，明确项目的需求和功能非常重要。我们将实...
---
这一章将带领你从零开始，逐步创建一个功能完备的博客系统。这不仅是对前面章节所学内容的实践和巩固，也是一次宝贵的项目经验积累。通过这个项目，你将深入理解 PHP 的应用，并掌握开发一个完整项目的流程和技巧。

## 项目介绍与规划

### 项目需求分析与功能规划

在开始编码之前，明确项目的需求和功能非常重要。我们将实现一个简单但功能齐全的博客系统，包括以下功能：

1. 用户注册与登录
2. 文章的创建、编辑、删除和展示
3. 评论功能
4. 文章的分页展示
5. 权限管理（仅作者可以编辑和删除自己的文章）
6. 部署到生产环境

### 项目目录结构的设计

一个清晰的目录结构有助于项目的维护和扩展。以下是我们博客系统的目录结构：

```
blog/
│
├── config/         # 配置文件
│   └── config.php
│
├── public/         # 公开访问的文件
│   ├── index.php
│   └── css/
│       └── styles.css
│
├── src/            # 核心代码
│   ├── Controllers/
│   │   ├── ArticleController.php
│   │   └── UserController.php
│   ├── Models/
│   │   ├── Article.php
│   │   └── User.php
│   ├── Views/
│   │   ├── articles/
│   │   │   ├── create.php
│   │   │   ├── edit.php
│   │   │   └── index.php
│   │   └── users/
│   │       ├── login.php
│   │       └── register.php
│   └── Helpers/
│       └── Auth.php
│
├── tests/          # 测试代码
├── vendor/         # 第三方库
└── .htaccess       # Apache 配置
```

## 用户注册与登录

### 实现用户注册功能

#### 数据库设计

首先，我们需要在数据库中创建一个用于存储用户信息的表。以下是一个简单的 `users` 表的 SQL 创建语句：

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 用户注册表单

接下来，我们在 `Views/users/register.php` 文件中创建用户注册表单：

```php
<!DOCTYPE html>
<html>
<head>
    <title>用户注册</title>
</head>
<body>
    <h2>注册新用户</h2>
    <form action="/register" method="POST">
        <label for="username">用户名:</label>
        <input type="text" id="username" name="username" required><br>

        <label for="email">电子邮箱:</label>
        <input type="email" id="email" name="email" required><br>

        <label for="password">密码:</label>
        <input type="password" id="password" name="password" required><br>

        <input type="submit" value="注册">
    </form>
</body>
</html>
```

#### 处理用户注册请求

在 `Controllers/UserController.php` 中编写处理用户注册请求的逻辑：

```php
<?php

namespace Controllers;

use Models\User;
use Helpers\Auth;

class UserController
{
    public function register()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $username = $_POST['username'];
            $email = $_POST['email'];
            $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

            $user = new User();
            $user->username = $username;
            $user->email = $email;
            $user->password = $password;
            $user->save();

            header('Location: /login');
        } else {
            require 'Views/users/register.php';
        }
    }
}
```

#### 用户模型

在 `Models/User.php` 中定义 `User` 类：

```php
<?php

namespace Models;

use PDO;

class User
{
    public $id;
    public $username;
    public $email;
    public $password;
    public $created_at;

    public function save()
    {
        $pdo = new PDO('mysql:host=localhost;dbname=blog', 'root', '');
        $sql = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':username' => $this->username,
            ':email' => $this->email,
            ':password' => $this->password
        ]);
    }
}
```

### 实现用户登录功能

#### 用户登录表单

在 `Views/users/login.php` 文件中创建用户登录表单：

```php
<!DOCTYPE html>
<html>
<head>
    <title>用户登录</title>
</head>
<body>
    <h2>用户登录</h2>
    <form action="/login" method="POST">
        <label for="username">用户名:</label>
        <input type="text" id="username" name="username" required><br>

        <label for="password">密码:</label>
        <input type="password" id="password" name="password" required><br>

        <input type="submit" value="登录">
    </form>
</body>
</html>
```

#### 处理用户登录请求

在 `Controllers/UserController.php` 中添加处理用户登录请求的逻辑：

```php
<?php

namespace Controllers;

use Models\User;
use Helpers\Auth;

class UserController
{
    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $username = $_POST['username'];
            $password = $_POST['password'];

            $user = User::findByUsername($username);
            if ($user && password_verify($password, $user->password)) {
                Auth::login($user);
                header('Location: /dashboard');
            } else {
                echo "用户名或密码错误";
            }
        } else {
            require 'Views/users/login.php';
        }
    }
}
```

#### 用户认证与权限管理

在 `Helpers/Auth.php` 中编写用户认证和权限管理的辅助函数：

```php
<?php

namespace Helpers;

use Models\User;

class Auth
{
    public static function login($user)
    {
        session_start();
        $_SESSION['user_id'] = $user->id;
    }

    public static function logout()
    {
        session_start();
        session_destroy();
    }

    public static function user()
    {
        session_start();
        if (isset($_SESSION['user_id'])) {
            return User::findById($_SESSION['user_id']);
        }
        return null;
    }

    public static function check()
    {
        session_start();
        return isset($_SESSION['user_id']);
    }
}
```

## 文章管理

### 创建与编辑文章

#### 数据库设计

首先，为文章创建一个数据库表。以下是 `articles` 表的 SQL 创建语句：

```sql
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### 文章创建表单

在 `Views/articles/create.php` 文件中创建文章创建表单：

```php
<!DOCTYPE html>
<html>
<head>
    <title>创建文章</title>
</head>
<body>
    <h2>创建新文章</h2>
    <form action="/articles/create" method="POST">
        <label for="title">标题:</label>
        <input type="text" id="title" name="title" required><br>

        <label for="content">内容:</label>
        <textarea id="content" name="content" required></textarea><br>

        <input type="submit" value="发布">
    </form>
</body>
</html>
```

#### 处理文章创建请求

在 `Controllers/ArticleController.php` 中编写处理文章创建请求的逻辑：

```php
<?php

namespace Controllers;

use Models\Article;
use Helpers\Auth;

class ArticleController
{
    public function create()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $title = $_POST['title'];
            $content = $_POST['content'];
            $user_id = Auth::user()->id;

            $article = new Article();
            $article->title = $title;
            $article->content = $content;
            $article->user_id = $user_id;
            $article->save();

            header('Location: /articles');
        } else {
            require 'Views/articles/create.php';
        }
    }
}
```

#### 文章模型

在 `Models/Article.php` 中定义 `Article` 类：

```php
<?php

namespace Models;

use PDO;

class Article
{
    public $id;
    public $# 第九章：项目实战：创建一个博客系统 (续)

这一章继续带领你完成创建一个博客系统的实战项目，包括用户认证、文章管理和评论功能的实现。

## 文章管理 (续)

### 创建与编辑文章 (续)

#### 文章模型 (续)

在 `Models/Article.php` 中定义 `Article` 类：

```php
<?php

namespace Models;

use PDO;

class Article
{
    public $id;
    public $title;
    public $content;
    public $user_id;
    public $created_at;

    public function save()
    {
        $pdo = new PDO('mysql:host=localhost;dbname=blog', 'root', '');
        $sql = "INSERT INTO articles (title, content, user_id) VALUES (:title, :content, :user_id)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':title' => $this->title,
            ':content' => $this->content,
            ':user_id' => $this->user_id
        ]);
    }

    public static function findById($id)
    {
        $pdo = new PDO('mysql:host=localhost;dbname=blog', 'root', '');
        $sql = "SELECT * FROM articles WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetchObject(self::class);
    }
}
```

### 编辑文章功能

#### 文章编辑表单

在 `Views/articles/edit.php` 文件中创建文章编辑表单：

```php
<!DOCTYPE html>
<html>
<head>
    <title>编辑文章</title>
</head>
<body>
    <h2>编辑文章</h2>
    <form action="/articles/edit" method="POST">
        <input type="hidden" name="id" value="<?php echo $article->id; ?>">

        <label for="title">标题:</label>
        <input type="text" id="title" name="title" value="<?php echo $article->title; ?>" required><br>

        <label for="content">内容:</label>
        <textarea id="content" name="content" required><?php echo $article->content; ?></textarea><br>

        <input type="submit" value="更新">
    </form>
</body>
</html>
```

#### 处理文章编辑请求

在 `Controllers/ArticleController.php` 中添加处理文章编辑请求的逻辑：

```php
<?php

namespace Controllers;

use Models\Article;

class ArticleController
{
    public function edit()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id = $_POST['id'];
            $title = $_POST['title'];
            $content = $_POST['content'];

            $article = Article::findById($id);
            $article->title = $title;
            $article->content = $content;
            $article->save();

            header('Location: /articles');
        } else {
            $id = $_GET['id'];
            $article = Article::findById($id);
            require 'Views/articles/edit.php';
        }
    }
}
```

### 文章的展示与分页

#### 文章展示页面

在 `Views/articles/index.php` 文件中创建文章展示页面：

```php
<!DOCTYPE html>
<html>
<head>
    <title>文章列表</title>
</head>
<body>
    <h2>文章列表</h2>
    <a href="/articles/create">创建新文章</a>
    <ul>
        <?php foreach ($articles as $article): ?>
            <li>
                <a href="/articles/show?id=<?php echo $article->id; ?>"><?php echo $article->title; ?></a>
                <a href="/articles/edit?id=<?php echo $article->id; ?>">编辑</a>
                <a href="/articles/delete?id=<?php echo $article->id; ?>" onclick="return confirm('确定要删除吗？');">删除</a>
            </li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
```

#### 处理文章展示请求

在 `Controllers/ArticleController.php` 中添加处理文章展示请求的逻辑：

```php
<?php

namespace Controllers;

use Models\Article;

class ArticleController
{
    public function index()
    {
        $articles = Article::all();
        require 'Views/articles/index.php';
    }

    public function show()
    {
        $id = $_GET['id'];
        $article = Article::findById($id);
        require 'Views/articles/show.php';
    }

    public function delete()
    {
        $id = $_GET['id'];
        $article = Article::findById($id);
        $article->delete();

        header('Location: /articles');
    }
}
```

#### 文章分页

为了实现文章的分页展示，我们可以在 `Article` 类中添加分页方法：

```php
<?php

namespace Models;

use PDO;

class Article
{
    // ... 其他代码

    public static function paginate($limit, $offset)
    {
        $pdo = new PDO('mysql:host=localhost;dbname=blog', 'root', '');
        $sql = "SELECT * FROM articles LIMIT :limit OFFSET :offset";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS, self::class);
    }

    public static function count()
    {
        $pdo = new PDO('mysql:host=localhost;dbname=blog', 'root', '');
        $sql = "SELECT COUNT(*) as count FROM articles";
        $stmt = $pdo->query($sql);
        return $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    }
}
```

在 `ArticleController.php` 中修改 `index` 方法以支持分页：

```php
<?php

namespace Controllers;

use Models\Article;

class ArticleController
{
    public function index()
    {
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = 5;
        $offset = ($page - 1) * $limit;

        $articles = Article::paginate($limit, $offset);
        $total = Article::count();
        $pages = ceil($total / $limit);

        require 'Views/articles/index.php';
    }

    // ... 其他代码
}
```

在 `Views/articles/index.php` 中添加分页导航：

```php
<!DOCTYPE html>
<html>
<head>
    <title>文章列表</title>
</head>
<body>
    <h2>文章列表</h2>
    <a href="/articles/create">创建新文章</a>
    <ul>
        <?php foreach ($articles as $article): ?>
            <li>
                <a href="/articles/show?id=<?php echo $article->id; ?>"><?php echo $article->title; ?></a>
                <a href="/articles/edit?id=<?php echo $article->id; ?>">编辑</a>
                <a href="/articles/delete?id=<?php echo $article->id; ?>" onclick="return confirm('确定要删除吗？');">删除</a>
            </li>
        <?php endforeach; ?>
    </ul>

    <div>
        <?php for ($i = 1; $i <= $pages; $i++): ?>
            <a href="/articles?page=<?php echo $i; ?>"><?php echo $i; ?></a>
        <?php endfor; ?>
    </div>
</body>
</html>
```

### 评论功能的实现

#### 数据库设计

为评论创建一个数据库表。以下是 `comments` 表的 SQL 创建语句：

```sql
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### 评论表单

在 `Views/articles/show.php` 文件中添加评论表单：

```php
<!DOCTYPE html>
<html>
<head>
    <title><?php echo $article->title; ?></title>
</head>
<body>
    <h2><?php echo $article->title; ?></h2>
    <p><?php echo $article->content; ?></p>
    <hr>

    <h3>评论</h3>
    <ul>
        <?php foreach ($comments as $comment): ?>
            <li><?php echo $comment->content; ?> - <?php echo $comment->created_at; ?></li>
        <?php endforeach; ?>
    </ul>

    <h4>添加评论</h4>
    <form action="/comments/create" method="POST">
        <input type="hidden" name="article_id" value="<?php echo $article->id; ?>">

        <label for="content">内容:</label>
        <textarea id="content" name="content" required></textarea><br>

        <input type="submit" value="发布">
    </form>
</body>
</html>
```

#### 处理评论创建请求

在 `Controllers/CommentController.php` 中编写处理评论创建请求的逻辑：

```php
<?php

namespace Controllers;

use Models\Comment;
use Helpers\Auth;

class# 第九章：项目实战：创建一个博客系统 (续)

这一章继续带领你完成创建一个博客系统的实战项目，包括用户认证、文章管理和评论功能的实现。

## 文章管理 (续)

### 创建与编辑文章 (续)

#### 文章模型 (续)

在 `Models/Article.php` 中定义 `Article` 类：

```php
<?php

namespace Models;

use PDO;

class Article
{
    public $id;
    public $title;
    public $content;
    public $user_id;
    public $created_at;

    public function save()
    {
        $pdo = new PDO('mysql:host=localhost;dbname=blog', 'root', '');
        $sql = "INSERT INTO articles (title, content, user_id) VALUES (:title, :content, :user_id)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':title' => $this->title,
            ':content' => $this->content,
            ':user_id' => $this->user_id
        ]);
    }

    public static function findById($id)
    {
        $pdo = new PDO('mysql:host=localhost;dbname=blog', 'root', '');
        $sql = "SELECT * FROM articles WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetchObject(self::class);
    }
}
```

### 编辑文章功能

#### 文章编辑表单

在 `Views/articles/edit.php` 文件中创建文章编辑表单：

```php
<!DOCTYPE html>
<html>
<head>
    <title>编辑文章</title>
</head>
<body>
    <h2>编辑文章</h2>
    <form action="/articles/edit" method="POST">
        <input type="hidden" name="id" value="<?php echo $article->id; ?>">

        <label for="title">标题:</label>
        <input type="text" id="title" name="title" value="<?php echo $article->title; ?>" required><br>

        <label for="content">内容:</label>
        <textarea id="content" name="content" required><?php echo $article->content; ?></textarea><br>

        <input type="submit" value="更新">
    </form>
</body>
</html>
```

#### 处理文章编辑请求

在 `Controllers/ArticleController.php` 中添加处理文章编辑请求的逻辑：

```php
<?php

namespace Controllers;

use Models\Article;

class ArticleController
{
    public function edit()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id = $_POST['id'];
            $title = $_POST['title'];
            $content = $_POST['content'];

            $article = Article::findById($id);
            $article->title = $title;
            $article->content = $content;
            $article->save();

            header('Location: /articles');
        } else {
            $id = $_GET['id'];
            $article = Article::findById($id);
            require 'Views/articles/edit.php';
        }
    }
}
```

### 文章的展示与分页

#### 文章展示页面

在 `Views/articles/index.php` 文件中创建文章展示页面：

```php
<!DOCTYPE html>
<html>
<head>
    <title>文章列表</title>
</head>
<body>
    <h2>文章列表</h2>
    <a href="/articles/create">创建新文章</a>
    <ul>
        <?php foreach ($articles as $article): ?>
            <li>
                <a href="/articles/show?id=<?php echo $article->id; ?>"><?php echo $article->title; ?></a>
                <a href="/articles/edit?id=<?php echo $article->id; ?>">编辑</a>
                <a href="/articles/delete?id=<?php echo $article->id; ?>" onclick="return confirm('确定要删除吗？');">删除</a>
            </li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
```

#### 处理文章展示请求

在 `Controllers/ArticleController.php` 中添加处理文章展示请求的逻辑：

```php
<?php

namespace Controllers;

use Models\Article;

class ArticleController
{
    public function index()
    {
        $articles = Article::all();
        require 'Views/articles/index.php';
    }

    public function show()
    {
        $id = $_GET['id'];
        $article = Article::findById($id);
        require 'Views/articles/show.php';
    }

    public function delete()
    {
        $id = $_GET['id'];
        $article = Article::findById($id);
        $article->delete();

        header('Location: /articles');
    }
}
```

#### 文章分页

为了实现文章的分页展示，我们可以在 `Article` 类中添加分页方法：

```php
<?php

namespace Models;

use PDO;

class Article
{
    // ... 其他代码

    public static function paginate($limit, $offset)
    {
        $pdo = new PDO('mysql:host=localhost;dbname=blog', 'root', '');
        $sql = "SELECT * FROM articles LIMIT :limit OFFSET :offset";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS, self::class);
    }

    public static function count()
    {
        $pdo = new PDO('mysql:host=localhost;dbname=blog', 'root', '');
        $sql = "SELECT COUNT(*) as count FROM articles";
        $stmt = $pdo->query($sql);
        return $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    }
}
```

在 `ArticleController.php` 中修改 `index` 方法以支持分页：

```php
<?php

namespace Controllers;

use Models\Article;

class ArticleController
{
    public function index()
    {
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = 5;
        $offset = ($page - 1) * $limit;

        $articles = Article::paginate($limit, $offset);
        $total = Article::count();
        $pages = ceil($total / $limit);

        require 'Views/articles/index.php';
    }

    // ... 其他代码
}
```

在 `Views/articles/index.php` 中添加分页导航：

```php
<!DOCTYPE html>
<html>
<head>
    <title>文章列表</title>
</head>
<body>
    <h2>文章列表</h2>
    <a href="/articles/create">创建新文章</a>
    <ul>
        <?php foreach ($articles as $article): ?>
            <li>
                <a href="/articles/show?id=<?php echo $article->id; ?>"><?php echo $article->title; ?></a>
                <a href="/articles/edit?id=<?php echo $article->id; ?>">编辑</a>
                <a href="/articles/delete?id=<?php echo $article->id; ?>" onclick="return confirm('确定要删除吗？');">删除</a>
            </li>
        <?php endforeach; ?>
    </ul>

    <div>
        <?php for ($i = 1; $i <= $pages; $i++): ?>
            <a href="/articles?page=<?php echo $i; ?>"><?php echo $i; ?></a>
        <?php endfor; ?>
    </div>
</body>
</html>
```

### 评论功能的实现

#### 数据库设计

为评论创建一个数据库表。以下是 `comments` 表的 SQL 创建语句：

```sql
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### 评论表单

在 `Views/articles/show.php` 文件中添加评论表单：

```php
<!DOCTYPE html>
<html>
<head>
    <title><?php echo $article->title; ?></title>
</head>
<body>
    <h2><?php echo $article->title; ?></h2>
    <p><?php echo $article->content; ?></p>
    <hr>

    <h3>评论</h3>
    <ul>
        <?php foreach ($comments as $comment): ?>
            <li><?php echo $comment->content; ?> - <?php echo $comment->created_at; ?></li>
        <?php endforeach; ?>
    </ul>

    <h4>添加评论</h4>
    <form action="/comments/create" method="POST">
        <input type="hidden" name="article_id" value="<?php echo $article->id; ?>">

        <label for="content">内容:</label>
        <textarea id="content" name="content" required></textarea><br>

        <input type="submit" value="发布">
    </form>
</body>
</html>
```

#### 处理评论创建请求

在 `Controllers/CommentController.php` 中编写处理评论创建请求的逻辑：

```php
<?php

namespace Controllers;

use Models\Comment;
use Helpers\Auth;

class# 第九章：项目实战：创建一个博客系统 (续)

## 评论功能的实现 (续)

### 处理评论创建请求 (续)

在 `Controllers/CommentController.php` 中编写处理评论创建请求的逻辑：

```php
<?php

namespace Controllers;

use Models\Comment;
use Helpers\Auth;

class CommentController
{
    public function create()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $article_id = $_POST['article_id'];
            $content = $_POST['content'];
            $user_id = Auth::user()->id;

            $comment = new Comment();
            $comment->article_id = $article_id;
            $comment->content = $content;
            $comment->user_id = $user_id;
            $comment->save();

            header('Location: /articles/show?id=' . $article_id);
        }
    }
}
```

### 评论模型

在 `Models/Comment.php` 中定义 `Comment` 类：

```php
<?php

namespace Models;

use PDO;

class Comment
{
    public $id;
    public $article_id;
    public $user_id;
    public $content;
    public $created_at;

    public function save()
    {
        $pdo = new PDO('mysql:host=localhost;dbname=blog', 'root', '');
        $sql = "INSERT INTO comments (article_id, user_id, content) VALUES (:article_id, :user_id, :content)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':article_id' => $this->article_id,
            ':user_id' => $this->user_id,
            ':content' => $this->content
        ]);
    }

    public static function findByArticleId($article_id)
    {
        $pdo = new PDO('mysql:host=localhost;dbname=blog', 'root', '');
        $sql = "SELECT * FROM comments WHERE article_id = :article_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':article_id' => $article_id]);
        return $stmt->fetchAll(PDO::FETCH_CLASS, self::class);
    }
}
```

### 文章详情页面

在 `Views/articles/show.php` 中整合文章和评论的展示：

```php
<!DOCTYPE html>
<html>
<head>
    <title><?php echo $article->title; ?></title>
</head>
<body>
    <h2><?php echo $article->title; ?></h2>
    <p><?php echo $article->content; ?></p>
    <hr>

    <h3>评论</h3>
    <ul>
        <?php foreach ($comments as $comment): ?>
            <li><?php echo $comment->content; ?> - <?php echo $comment->created_at; ?></li>
        <?php endforeach; ?>
    </ul>

    <h4>添加评论</h4>
    <form action="/comments/create" method="POST">
        <input type="hidden" name="article_id" value="<?php echo $article->id; ?>">

        <label for="content">内容:</label>
        <textarea id="content" name="content" required></textarea><br>

        <input type="submit" value="发布">
    </form>
</body>
</html>
```

在 `Controllers/ArticleController.php` 中修改 `show` 方法以包括评论数据：

```php
<?php

namespace Controllers;

use Models\Article;
use Models\Comment;

class ArticleController
{
    public function show()
    {
        $id = $_GET['id'];
        $article = Article::findById($id);
        $comments = Comment::findByArticleId($id);
        require 'Views/articles/show.php';
    }
}
```

## 项目部署

项目开发完毕后，下一步就是将其部署到生产环境。我们将介绍如何在服务器上部署项目，并使用 Docker 进行容器化部署。

### 部署博客系统到服务器

1.  **准备服务器环境** 
   - 确保服务器已安装 LAMP 或 LEMP 环境（Linux, Apache/Nginx, MySQL, PHP）
   - 配置虚拟主机，将域名指向项目的 `public` 目录
2.  **上传项目文件** 
   - 将项目文件上传到服务器上的合适位置
   - 配置文件权限，确保 `config` 目录不可公开访问
3.  **配置数据库** 
   - 在服务器上创建数据库和用户，并导入本地开发环境中的数据库
4.  **更新配置文件** 
   - 修改项目中的数据库配置文件（如 `config/config.php`），确保连接正确

### 使用 Docker 进行容器化部署

1.  **编写 Dockerfile**
在项目根目录下创建一个 `Dockerfile` 文件，内容如下： 
```dockerfile
# 基础镜像
FROM php:7.4-apache

# 复制项目文件
COPY . /var/www/html/

# 安装必要的扩展
RUN docker-php-ext-install pdo pdo_mysql

# 设置工作目录
WORKDIR /var/www/html
```
 

2.  **编写 docker-compose.yml**
在项目根目录下创建一个 `docker-compose.yml` 文件，内容如下： 
```yaml
version: "3.7"
services:
  web:
    build: .
    ports:
      - "80:80"
    volumes:
      - .:/var/www/html
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: blog
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
```
 

3.  **启动容器**
在项目根目录下运行以下命令启动容器： 
```shell
docker-compose up -d
```

访问 `http://localhost`，你应该能看到博客系统的首页!

