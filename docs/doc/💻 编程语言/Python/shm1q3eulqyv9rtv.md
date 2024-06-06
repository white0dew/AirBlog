---
title: 第九章：项目实战：创建一个 Web 应用
urlname: shm1q3eulqyv9rtv
date: '2024-06-06 21:13:39'
updated: '2024-06-06 21:15:44'
description: 项目介绍与规划在本章中，我们将带领大家创建一个简单但功能齐全的 Web 应用，通过实践来巩固前面的学习内容。我们将使用 Flask 框架，逐步实现用户注册与登录功能，以及数据展示与交互功能。最后，我们讨论如何将应用部署到云平台。项目需求分析与功能规划在开始编码之前，我们需要对项目进行需求分析和...
---
## 项目介绍与规划

在本章中，我们将带领大家创建一个简单但功能齐全的 Web 应用，通过实践来巩固前面的学习内容。我们将使用 Flask 框架，逐步实现用户注册与登录功能，以及数据展示与交互功能。最后，我们讨论如何将应用部署到云平台。

### 项目需求分析与功能规划

在开始编码之前，我们需要对项目进行需求分析和功能规划。以下是我们将实现的主要功能：

1. **用户注册与登录** 
   - 用户可以注册新账户
   - 用户可以使用已注册账户登录
2. **数据展示与交互** 
   - 登录成功后，用户可以看到一个欢迎页面
   - 用户可以查看和更新个人信息

### 项目目录结构的设计

为了保持代码的整洁和组织有序，我们将采用如下的目录结构：

```
flask_app/
│
├── app/
│   ├── static/
│   ├── templates/
│   ├── __init__.py
│   ├── routes.py
│   └── models.py
│
├── venv/
│
├── config.py
├── run.py
├── requirements.txt
└── README.md
```
## 
## 开发与实现

### 使用 Flask 创建 Web 应用

首先，我们需要创建一个虚拟环境并安装 Flask：

```bash
# 创建虚拟环境
python3 -m venv venv

# 激活虚拟环境（Unix 或 macOS）
source venv/bin/activate

# 激活虚拟环境（Windows）
venv\Scripts\activate

# 安装 Flask
pip install Flask
```

### 项目初始化

在 `flask_app` 目录下创建 `run.py` 文件，并编写如下代码：

```python
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
```

接着，在 `app` 目录下创建 `__init__.py` 文件，并编写如下代码：

```python
from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your_secret_key'

    from .routes import main
    app.register_blueprint(main)

    return app
```

### 实现用户注册与登录功能

#### 创建数据库模型

在 `app` 目录下创建 `models.py` 文件，并编写如下代码：

```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
```

#### 创建注册与登录路由

在 `app` 目录下创建 `routes.py` 文件，并编写如下代码：

```python
from flask import Blueprint, render_template, redirect, url_for, request, flash
from .models import User, db
from werkzeug.security import generate_password_hash, check_password_hash

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()
        if user:
            flash('Username already exists')
            return redirect(url_for('main.signup'))

        new_user = User(username=username, password=generate_password_hash(password, method='sha256'))
        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for('main.login'))

    return render_template('signup.html')

@main.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()
        if not user or not check_password_hash(user.password, password):
            flash('Invalid username or password')
            return redirect(url_for('main.login'))

        return redirect(url_for('main.profile'))

    return render_template('login.html')

@main.route('/profile')
def profile():
    return render_template('profile.html')
```

#### 创建模板文件

在 `app/templates` 目录下创建以下 HTML 文件：

**index.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Home</title>
  </head>
  <body>
    <h1>Welcome to the Flask Web App!</h1>
    <a href="{{ url_for('main.signup') }}">Sign Up</a>
    <a href="{{ url_for('main.login') }}">Log In</a>
  </body>
</html>
```

**signup.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Sign Up</title>
  </head>
  <body>
    <h1>Sign Up</h1>
    <form method="POST">
      <label>Username:</label>
      <input type="text" name="username" required />
      <label>Password:</label>
      <input type="password" name="password" required />
      <button type="submit">Sign Up</button>
    </form>
    <a href="{{ url_for('main.login') }}">Log In</a>
  </body>
</html>
```

**login.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Log In</title>
  </head>
  <body>
    <h1>Log In</h1>
    <form method="POST">
      <label>Username:</label>
      <input type="text" name="username" required />
      <label>Password:</label>
      <input type="password" name="password" required />
      <button type="submit">Log In</button>
    </form>
    <a href="{{ url_for('main.signup') }}">Sign Up</a>
  </body>
</html>
```

**profile.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Profile</title>
  </head>
  <body>
    <h1>Welcome to your profile page!</h1>
    <a href="{{ url_for('main.index') }}">Home</a>
  </body>
</html>
```

### 实现数据展示与交互功能

#### 更新用户信息

在 `routes.py` 文件中，添加如下路由：

```python
@main.route('/update_profile', methods=['GET', 'POST'])
def update_profile():
    if request.method == 'POST':
        username = request.form.get('username')
        user = User.query.filter_by(username=username).first()

        if user:
            user.username = request.form.get('new_username')
            db.session.commit()
            flash('Profile updated successfully')
        else:
            flash('User not found')

        return redirect(url_for('main.profile'))

    return render_template('update_profile.html')
```

#### 创建更新用户信息模板

在 `app/templates` 目录下创建 `update_profile.html` 文件，并编写如下代码：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Update Profile</title>
  </head>
  <body>
    <h1>Update Profile</h1>
    <form method="POST">
      <label>Current Username:</label>
      <input type="text" name="username" required />
      <label>New Username:</label>
      <input type="text" name="new_username" required />
      <button type="submit">Update</button>
    </form>
    <a href="{{ url_for('main.profile') }}">Profile</a>
  </body>
</html>
```

### 部署与发布

#### 部署到 Heroku

1.  创建 `Procfile` 文件并添加以下内容： 
```
web: gunicorn run:app
```
 

2.  创建 `requirements.txt` 文件： 
```bash
pip freeze > requirements.txt
```
 

3.  将项目推送到 GitHub 仓库： 
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your_repository_url>
git push -u origin master
```
 

4.  在 Heroku 创建一个新的应用并部署： 
```bash
heroku create <your_app_name>
git push heroku master
```
 

#### 使用 Docker 进行容器化部署

1.  创建 `Dockerfile` 文件并添加以下内容： 
```
FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "-b", "0.0.0.0:8000", "run:app"]
```
 

2.  构建 Docker 镜像并运行容器： 
```bash
docker build -t flask_app .
docker run -d -p 8000:8000 flask_app
```
 

3.  验证应用在 Docker 容器中运行：
打开浏览器，访问 `http://localhost:8000`，确保应用正常运行。 



### 实现数据展示与交互功能

#### 更新用户信息

在 `routes.py` 文件中，添加如下路由：

```python
@main.route('/update_profile', methods=['GET', 'POST'])
def update_profile():
    if request.method == 'POST':
        username = request.form.get('username')
        user = User.query.filter_by(username=username).first()

        if user:
            user.username = request.form.get('new_username')
            db.session.commit()
            flash('Profile updated successfully')
        else:
            flash('User not found')

        return redirect(url_for('main.profile'))

    return render_template('update_profile.html')
```

#### 创建更新用户信息模板

在 `app/templates` 目录下创建 `update_profile.html` 文件，并编写如下代码：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Update Profile</title>
  </head>
  <body>
    <h1>Update Profile</h1>
    <form method="POST">
      <label>Current Username:</label>
      <input type="text" name="username" required />
      <label>New Username:</label>
      <input type="text" name="new_username" required />
      <button type="submit">Update</button>
    </form>
    <a href="{{ url_for('main.profile') }}">Profile</a>
  </body>
</html>
```

## 结论

通过本章的项目实战，我们成功创建了一个功能齐全的 Web 应用，并通过 Flask 框架实现了用户注册与登录功能，以及数据展示与交互功能。我们还学习了如何将应用部署到 Heroku 和使用 Docker 进行容器化部署。这些实践不仅巩固了我们对 Python 基础和进阶知识的理解，也为我们提供了一个完整的 Web 开发工作流示例，帮助我们更好地理解实际开发中的各个环节。
