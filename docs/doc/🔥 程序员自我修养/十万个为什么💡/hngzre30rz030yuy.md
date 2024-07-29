---
title: 【入职必备】Git 入门指南
urlname: hngzre30rz030yuy
date: '2024-07-29 12:15:07'
updated: '2024-07-29 12:19:15'
cover: 'https://cdn.nlark.com/yuque/__mermaid_v3/b0346fdb7e3a2a4b8ec9887cd17d361e.svg'
description: '适合实习生学习使用。让我们从基础开始,逐步深入Git的核心概念和常用操作。1. Git 是什么?Git 是一个分布式版本控制系统,用于跟踪文件的变化,协调多人协作。想象一下,Git 就像一个时光机,让你可以穿梭于项目的不同版本之间。2. 安装 Git首先,我们需要安装 Git。访问 Git 官...'
---
适合实习生学习使用。让我们从基础开始,逐步深入Git的核心概念和常用操作。
## 1. Git 是什么?
Git 是一个分布式版本控制系统,用于跟踪文件的变化,协调多人协作。想象一下,Git 就像一个时光机,让你可以穿梭于项目的不同版本之间。
![](https://oss1.aistar.cool/elog-offer-now/e741febc3746f2153a9e730674fbebf5.svg)## 2. 安装 Git
首先,我们需要安装 Git。访问 [Git 官网](https://git-scm.com/downloads) 下载适合你操作系统的版本。
安装完成后,打开终端(命令行),输入:
```bash
git --version
```
如果显示 Git 版本号,说明安装成功。
## 3. 配置 Git
在使用 Git 之前,我们需要进行一些基本配置:
```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```
这些信息会与你的提交关联。
## 4. 创建一个 Git 仓库
让我们创建一个新的项目并初始化 Git 仓库:
```bash
mkdir my_project
cd my_project
git init
```
这会在 `my_project` 文件夹中创建一个新的 Git 仓库。
## 5. Git 的基本工作流
Git 的工作流主要包含三个区域:

1. 工作目录(Working Directory)
2. 暂存区(Staging Area)
3. Git 仓库(Git Repository)
![](https://oss1.aistar.cool/elog-offer-now/0d362fa611f4988fc260865541145c15.svg)## 6. 添加和提交文件
创建一个新文件:
```bash
echo "Hello, Git!" > hello.txt
```
将文件添加到暂存区:
```bash
git add hello.txt
```
提交更改:
```bash
git commit -m "Add hello.txt file"
```
## 7. 查看状态和历史
查看仓库状态:
```bash
git status
```
查看提交历史:
```bash
git log
```
## 8. 分支操作
创建新分支:
```bash
git branch feature
```
切换到新分支:
```bash
git checkout feature
```
或者,创建并切换到新分支:
```bash
git checkout -b feature
```
![](https://oss1.aistar.cool/elog-offer-now/0547c5f5876e5eb8e3f32715423ea72c.svg)## 9. 合并分支
假设我们在 `feature` 分支上完成了工作,现在要合并回 `main` 分支:
```bash
git checkout main
git merge feature
```
## 10. 远程仓库操作
添加远程仓库:
```bash
git remote add origin https://github.com/username/repo.git
```
推送到远程仓库:
```bash
git push -u origin main
```
从远程仓库拉取:
```bash
git pull origin main
```
## 11. 解决冲突
当合并分支或拉取远程更改时,可能会遇到冲突。Git 会在文件中标记冲突区域:
```
<<<<<<< HEAD
你的更改
=======
其他人的更改
>>>>>>> branch-name
```
手动编辑文件解决冲突,然后:
```bash
git add conflicted_file.txt
git commit -m "Resolve merge conflict"
```
当然,我很高兴能够补充一些额外的内容,以使这个Git教程更加全面和实用。以下是一些重要的补充内容：
## 12. gitignore 文件
在项目中,有些文件我们不希望被Git追踪,例如编译生成的文件、临时文件或包含敏感信息的配置文件。我们可以使用 `.gitignore` 文件来告诉Git忽略这些文件。
创建 `.gitignore` 文件:
```bash
touch .gitignore
```
在 `.gitignore` 文件中添加规则,例如:
```
# 忽略所有 .log 文件
*.log

# 忽略 node_modules 目录
node_modules/

# 忽略 .env 文件
.env
```
## 15. 撤销操作
撤销暂存的文件:
```bash
git reset HEAD <file>
```
撤销最后一次提交:
```bash
git commit --amend
```
## 16. Git 标签
为重要的提交添加标签,通常用于标记发布版本:
```bash
git tag -a v1.0 -m "Version 1.0"
```
推送标签到远程仓库:
```bash
git push origin --tags
```
## 17. Git Hooks
Git钩子是在Git执行特定事件时自动运行的脚本。例如,在提交前运行测试:
在 `.git/hooks` 目录下创建 `pre-commit` 文件:
```bash
#!/bin/sh
npm test
```
确保脚本有执行权限:
```bash
chmod +x .git/hooks/pre-commit
```
## 18. Git 重基操作 (Rebase)
重基是一种整理和修改提交历史的方法:
```bash
git checkout feature
git rebase main
```
这会将 `feature` 分支的基础移动到 `main` 分支的最新提交。
![](https://oss1.aistar.cool/elog-offer-now/976bd4ce3713e8699cde93472c1f79db.svg)## 19. 使用 Git Stash
当你需要切换分支但又不想提交当前的更改时,可以使用 stash:
```bash
git stash
git checkout another-branch
# 做一些工作
git checkout original-branch
git stash pop
```
## 附录：常见 Git 问题和解答
### merge 和 rebase 的区别是什么？应该用哪个？
merge 和 rebase 都是用于整合不同分支的变更，但它们的工作方式不同。
#### Merge

- 创建一个新的合并提交
- 保留完整的历史记录
- 不改变现有的提交历史
![](https://oss1.aistar.cool/elog-offer-now/01c1f283956b8abf718d084ab6fe4e26.svg)#### Rebase

- 将一个分支的提交移动到另一个分支的顶端
- 创建一个线性的历史记录
- 改变提交历史
![](https://oss1.aistar.cool/elog-offer-now/976bd4ce3713e8699cde93472c1f79db.svg)#### 使用建议：

- 使用 merge 当：
   - 你想保留完整的历史记录
   - 处理公共分支（如 main）
- 使用 rebase 当：
   - 你想要一个干净的、线性的历史记录
   - 处理个人的功能分支

总的来说，在团队协作中，对于公共分支通常推荐使用 merge，而在个人分支上可以使用 rebase 来保持历史整洁。
### 2. 如何撤销一个已经推送到远程仓库的提交？
这是一个常见但棘手的问题。以下是步骤：

1. 使用 `git revert` （推荐）:
```bash
git revert <commit-hash>
git push origin main
```
这会创建一个新的提交来撤销之前的更改。

1. 使用 `git reset` （谨慎使用）:
```bash
git reset --hard <previous-commit-hash>
git push origin main --force
```
这会彻底删除提交历史，可能会影响其他协作者。
### 3. 什么是 Cherry-pick，何时使用它？
Cherry-pick 允许你选择特定的提交并将其应用到另一个分支。
```bash
git cherry-pick <commit-hash>
```
使用场景：

- 当你只需要另一个分支的某个特定更改时
- 当你意外地在错误的分支上进行了提交时
### 4. 如何解决合并冲突？

1. 使用 `git status` 查看冲突文件
2. 打开冲突文件，查找冲突标记（<<<<<<, =======, >>>>>>>）
3. 手动编辑文件解决冲突
4. 使用 `git add` 标记冲突已解决
5. 使用 `git commit` 完成合并
### 5. 什么是 Git 工作流（Git Flow）？
Git Flow 是一种流行的分支管理模型，定义了一套使用 Git 分支的标准流程。
主要分支：

- main：稳定的生产版本
- develop：开发分支
- feature/*：新功能分支
- release/*：发布准备分支
- hotfix/*：紧急修复分支
![](https://oss1.aistar.cool/elog-offer-now/89fff9e1e421748fbcc2135ebf4c9ae0.svg)### 6. 如何使用 Git 进行代码审查？

1. 创建一个功能分支
2. 在功能分支上进行开发
3. 创建 Pull Request（GitHub）或 Merge Request（GitLab）
4. 审查者审查代码，提供反馈
5. 开发者根据反馈进行修改
6. 审查通过后，合并到主分支
