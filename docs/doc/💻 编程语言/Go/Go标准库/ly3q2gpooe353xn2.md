---
title: 7天玩转 Golang 标准库之 text/template
urlname: ly3q2gpooe353xn2
date: '2024-06-19 23:17:06'
updated: '2024-08-06 19:32:20'
description: 在许多编程场景中，我们经常需要把数据按照某种格式进行输出，比如生成HTML页面，或者生成配置文件。这时，我们就需要模板引擎的帮助。幸运的是，Go语言在标准库中就提供了两个强大的模板引擎：text/template和html/template。初级应用text/template库的使用text/...
---
在许多编程场景中，我们经常需要把数据按照某种格式进行输出，比如生成HTML页面，或者生成配置文件。这时，我们就需要模板引擎的帮助。

幸运的是，Go语言在标准库中就提供了两个强大的模板引擎：`text/template`和`html/template`。
# 初级应用
### text/template库的使用
`text/template`库用于生成任何基于文本的格式。它使用双大括号`{{`和`}}`来定义模板的动态部分。让我们通过一个简单的例子来看一下它的使用方法。
```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 模板字符串
	const tpl = `Hi, {{.Name}}! Welcome to {{.Website}}.`

	// 准备模板数据
	data := struct {
		Name    string
		Website string
	}{
		Name:    "Go语言中文网",
		Website: "https://studygolang.com",
	}

	// 创建模板对象并解析模板字符串
	tmpl, err := template.New("test").Parse(tpl)
	if err != nil {
		panic(err)
	}

	// 使用数据渲染模板，并将结果输出到标准输出
	err = tmpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

上面的代码中，我们首先定义了一个模板字符串`tpl`，然后创建一个模板对象并解析这个字符串，最后将准备好的数据传递给模板，模板就会按照预定的格式把数据渲染进去。
### html/template库的使用
`html/template`库实际上是`text/template`库的超集，它比`text/template`库多了一些针对HTML格式的功能。尤其是，`html/template`库能够对插入到HTML页面的内容进行适当的转义，以防止一些常见的安全问题，如XSS攻击。下面的例子展示了如何使用`html/template`库来生成一个HTML页面。
```go
package main

import (
	"html/template"
	"os"
)

type Person struct {
	Name string
	Age  int
}

func main() {
	const tpl = `
	<!DOCTYPE html>
	<html>
		<head>
			<title>Hello</title>
		</head>
		<body>
			<h1>Hello, {{.Name}}</h1>
			<p>You are {{.Age}} years old.</p>
		</body>
	</html>`

	data := Person{
		Name: "Go语言中文网",
		Age:  7,
	}

	tmpl, err := template.New("test").Parse(tpl)
	if err != nil {
		panic(err)
	}

	err = tmpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```
启动程序，你会在控制台看到生成的HTML代码。

这两个标准库使得在Golang中使用模板变得非常容易。在Go web开发中，进行HTML渲染时，我们通常会选用`html/template`库。而在需要处理一般的文本格式时，我们选择`text/template`库。
# 进阶应用
除了基本的模板渲染之外，`html/template` 和 `text/template` 库还提供了一些更高级的模板操作。这需要让我们理解模板的一个重要概念：管道(pipeline)。管道可以让我们在模板中进行更为复杂的逻辑处理，例如条件判断、循环以及自定义函数。

1.  **条件判断** 使用`{{if}}...{{end}}`和 `{{else}}`语句 
```go
 const tpl = `Hi, {{if .Married}}Mr{{else}}Miss{{end}}, {{.Name}}`
 tmpl, err := template.New("test").Parse(tpl)
 if err != nil {
     log.Fatal(err)
 }

 data := struct {
     Name    string
     Married bool
 }{
     Name:    "Go语言中文网",
     Married: false,
 }

 err = tmpl.Execute(os.Stdout, data)
 if err != nil {
     log.Fatal(err)
 }
```

2.  **循环** 使用`{{range}}...{{end}}`语句 
```go
 const tpl = `{{range .}} Hi, {{.Name}}.{{end}}`
 tmpl, err := template.New("test").Parse(tpl)
 if err != nil {
     log.Fatal(err)
 }

 data := [] struct {
     Name    string
 }{
     {"Go语言"},
     {"C语言"},
     {"Python"},
 }

 err = tmpl.Execute(os.Stdout, data)
 if err != nil {
     log.Fatal(err)
 }
```
 

3.  **自定义函数**
我们还可以定义自定义的函数，并在模板中使用它们。这是通过`Funcs`方法来实现的： 
```go
 func ToUpper(str string) string {
     return strings.ToUpper(str)
 }

 const tpl = `Hi, {{.Name | toUpper}}.`
 tmpl, err := template.New("test").Funcs(template.FuncMap{
     "toUpper": ToUpper,
 }).Parse(tpl)
 if err != nil {
     log.Fatal(err)
 }

 data := struct {
     Name string
 }{
     Name: "Go语言中文网",
 }

 err = tmpl.Execute(os.Stdout, data)
 if err != nil {
     log.Fatal(err)
 }
```
 如果上面的内容对你有帮助，请点赞收藏哦，我会分享更多的知识~
