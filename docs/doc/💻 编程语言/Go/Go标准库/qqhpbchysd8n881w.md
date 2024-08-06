---
title: 7天玩转 Golang 标准库之 flag
urlname: qqhpbchysd8n881w
date: '2024-06-19 23:18:07'
updated: '2024-08-06 19:29:54'
description: "在编写Golang命令行应用时，flag标准库无疑是一个很有价值的工具。它允许你以各种方式来定义和解析命令行参数。基础示例：定义与解析参数若想使用flag标准库，你必须首先定义你希望从命令行接收的参数。下面展示了几种常见的参数类型：package main  import ( \t\"flag\" ..."
---
> 在编写Golang命令行应用时，flag标准库无疑是一个很有价值的工具。
> 它允许你以各种方式来定义和解析命令行参数。

## 基础示例：定义与解析参数
若想使用flag标准库，你必须首先定义你希望从命令行接收的参数。下面展示了几种常见的参数类型：

```go
package main

import (
	"flag"
	"fmt"
)

func main() {
   wordPtr := flag.String("word", "go", "a string")
   numbPtr := flag.Int("number", 42, "an int")
   boolPtr := flag.Bool("fork", false, "a bool")

   var strVar string
   flag.StringVar(&strVar, "strVar", "flag", "a string var")

   flag.Parse()

   fmt.Println("word:", *wordPtr)
   fmt.Println("number:", *numbPtr)
   fmt.Println("fork:", *boolPtr)
   fmt.Println("strVar:", strVar)
}
```

在这个例子中，我们先在`flag`中定义了三种不同类型的参数`word`, `number`, `fork`，并通过函数`StringVar` 方法定义了一个字符串参数`strVar`。然后通过 `flag.Parse()`解析参数值到定义的几个参数。
## 进阶使用：自定义参数类型
有时，你可能需要使用一种flag库内置以外的参数类型。在这种情况下，你可以创建自定义的参数类型。

以下是自定义参数类型的一个例子：

```go
package main

import (
	"flag"
	"fmt"
	"strings"
)

type ArrayValue []string

func (s *ArrayValue) String() string {
	return fmt.Sprintf("%v", *s)
}

func (s *ArrayValue) Set(value string) error {
	*s = strings.Split(value, ",")
	return nil
}

var myValue ArrayValue

func main() {
	flag.Var(&myValue, "myValue", "my value")

	flag.Parse()

	fmt.Println(myValue)
}
```

在这个示例中，我们自定义了一个类型`ArrayValue`，它实现了flag包中的`Value`接口（该接口定义了`Set`和`String`两个方法）。

然后，我们用`flag.Var`方法定义了一个名为`myValue`的参数，并在命令行中使用逗号分隔的列表来赋值。
## 使用flag库处理子命令
许多命令行应用程序将使用子命令来处理某些任务。例如，git命令行工具就包括commit, push等子命令。我们可以用FlagSet实现对子命令的支持。

```json
package main

import (
    "flag"
    "fmt"
    "os"
)

func main() {
    addCommand := flag.NewFlagSet("add", flag.ExitOnError)
    addInputPtr := addCommand.String("name", "", "Name to add")

    listCommand := flag.NewFlagSet("list", flag.ExitOnError)

    if len(os.Args) < 2 {
        fmt.Println("expected 'add' or 'list' subcommands")
        os.Exit(1)
    }

    switch os.Args[1] {

    case "add":
        addCommand.Parse(os.Args[2:])
        fmt.Println("subcommand 'add'")
        fmt.Println("  name:", *addInputPtr)
    case "list":
        listCommand.Parse(os.Args[2:])
        fmt.Println("subcommand 'list'")
        fmt.Println("  list would print here.")
    }
}
```
在这个例子中，我们定义了两个子命令add和list。每一个子命令有他们独特的标志，和他们自己的标志处理逻辑。
## 结语
Golang的flag库是一款强大的工具，它无需任何额外安装就能支持创建功能丰富的命令行应用。

掌握flag库的使用，对于深化Golang的掌握和提高开发效率将起到非常有利的推动作用。
