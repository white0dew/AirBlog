---
title: 7天玩转 Golang 标准库之 http/net
urlname: gcpnwwcv60ep0ley
date: '2024-06-19 23:17:42'
updated: '2024-06-19 23:17:50'
description: 在构建web应用时，我们经常需要处理HTTP请求、做网页抓取或者搭建web服务器等任务，而Go语言在这方面为我们提供了强大的内置工具：net/http标准库，它为我们操作和处理HTTP协议提供了便利。基础用法一：处理HTTP请求首先，我们来看看如何使用net/http标准库发送一个HTTP请求...
---
在构建web应用时，我们经常需要处理HTTP请求、做网页抓取或者搭建web服务器等任务，而Go语言在这方面为我们提供了强大的内置工具：net/http标准库，它为我们操作和处理HTTP协议提供了便利。
# 基础用法
## 一：处理HTTP请求
首先，我们来看看如何使用net/http标准库发送一个HTTP请求。net/http库中的`http.Get`函数可以快速地对一个URL发起GET请求。

```go
package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
)

func main() {
    res, err := http.Get("http://example.com/")
    if err != nil {
        log.Fatal(err)
    }
    defer res.Body.Close()

    body, err := ioutil.ReadAll(res.Body)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("%s", body)
}
```
## 二：创建和启动HTTP服务器
在Go语言中，我们可以使用`http.ListenAndServe`函数配合`http.HandleFunc`函数快速地创建一个HTTP服务器。
```go
package main

import (
    "fmt"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, Gopher!")
}

func main() {
    http.HandleFunc("/hello", helloHandler)
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatal(err)
    }
}
```
## 三：使用http.Client自定义请求行为
有时，我们需要对HTTP请求进行更细粒度的控制，比如设置超时时间、添加请求头等等。这个时候，我们可以使用`http.Client`和`http.Request`来自定义我们的请求行为。
```go
package main

import (
    "fmt"
    "net/http"
    "time"
)

func main() {
    client := http.Client{
        Timeout: 5 * time.Second,
    }

    req, err := http.NewRequest("GET", "http://example.com", nil)
    if err != nil {
        log.Fatal(err)
    }
    req.Header.Add("User-Agent", "myClient")

    resp, err := client.Do(req)
    if err != nil {
        log.Fatal(err)
    }
    defer resp.Body.Close()

    fmt.Printf("Response status: %s\n", resp.Status)
}
```

以上，我们简洁明了地介绍了如何使用Golang中的net/http标准库进行HTTP请求的发送、服务器的创建以及请求行为的自定义。但是，net/http库的功能远不止这些。
# 进阶用法
## 反向代理
反向代理是一个非常常见的需求，Golang的net/http库能简单地帮我们实现这一功能。
```go
package main

import (
    "log"
    "net/http"
    "net/http/httputil"
    "net/url"
)

func main() {
    targetUrl, _ := url.Parse("http://example.com")
    proxy := httputil.NewSingleHostReverseProxy(targetUrl)

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        proxy.ServeHTTP(w, r)
    })

    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

在上述代码中，我们通过`httputil.NewSingleHostReverseProxy`函数创建了一个反向代理处理器，然后在http处理函数中通过这个处理器来处理进来的http请求。
## 升级websocket
WebSocket提供了在单个 TCP 连接上进行全双工通信的能力。在Golang中，我们可以借助`golang.org/x/net/websocket`包（这不是标准库，但是是官方维护的包）轻松实现WebSocket。

```go
package main

import (
	"fmt"
	"golang.org/x/net/websocket"
	"net/http"
)

func Echo(ws *websocket.Conn) {
	var err error
	for {
		var reply string
		if err = websocket.Message.Receive(ws, &reply); err != nil {
			fmt.Println("Can't receive")
			break
		}
		fmt.Println("Received back from client: " + reply)
		msg := "Received:  " + reply
		fmt.Println("Sending to client: " + msg)
		if err = websocket.Message.Send(ws, msg); err != nil {
			fmt.Println("Can't send")
			break
		}
	}
}

func main() {
	http.Handle("/", websocket.Handler(Echo))
	if err := http.ListenAndServe(":1234", nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
```
在上面的例子中，我们创建了一个简单的回音服务，客户端发送一个消息到服务器，服务器会追加一个"Received: "前缀并发送回去。
需要注意的是，WebSocket 只能用于已具有兼容 WebSocket 的客户端（如一些现代 web 浏览器）的 HTTP 服务器。websocket包并不能用于一个普通的HTTP服务端。
当然，除了反向代理和Websocket， `net/http`包中还有诸多高级的使用方法。这里，我会介绍两个常见的高级应用场景：使用`http.RoundTripper`自定义HTTP请求过程和使用`http.CookieJar`接口处理Cookie。
## 自定义HTTP请求过程

如果你需要在发送HTTP请求时进行更多的自定义控制，如自定义DNS解析、TCP连接过程、TLS握手等等，那么你可以通过实现 `http.RoundTripper` 接口来满足需求。 
```go
package main

import (
    "fmt"
    "net/http"
    nethttp "net/http" // alias to avoid conflict
    "time"
)

type myTransport struct {
    transportation http.RoundTripper
}

func (t *myTransport) RoundTrip(req *http.Request) (*http.Response, error) {
    req.Header.Add("User-Agent", "myClient")
    resp, err := t.transportation.RoundTrip(req)
    if err != nil {
 	   return nil, err
    }

    // you can access Response here
    fmt.Println("Status:", resp.Status)

    return resp, nil
}

func main() {
    t := &myTransport{
 	   transportation: nethttp.DefaultTransport,
    }

    client := &http.Client{Transport: t}
    resp, err := client.Get("http://example.com")
    if err != nil {
 	   log.Fatal(err)
    }
    defer resp.Body.Close()

    fmt.Println("Response Status:", resp.Status)
}
```

在上述代码中，我们实现了自己的 `http.RoundTripper` 接口，在每次发送HTTP请求时，添加了自定义的User-Agent头，并在请求返回后打印了响应的状态码。 
##  处理Cookie

`http.CookieJar` 是一个接口，可以用来自定义HTTP请求中的cookie处理逻辑。Go标准库为我们提供了一个简单的内存CookieJar的实现 `net/http/cookiejar`。 
```go
package main

import (
    "net/http"
    "net/http/cookiejar"
    "net/url"
)

func main() {
    jar, err := cookiejar.New(nil)
    if err != nil {
 	   log.Fatal(err)
    }

    client := &http.Client{
 	   Jar: jar,
    }

    // Create a cookie on client side
    client.Jar.SetCookies(
 	   &url.URL{Scheme: "http", Host: "example.com"},
 	   []*http.Cookie{{Name: "cookieName", Value: "cookieValue"}},
    )

    // Check if the cookie has been set
    if cookies := client.Jar.Cookies(&url.URL{Scheme: "http", Host: "example.com"}); len(cookies) > 0 {
 	   fmt.Println("Cookie:", cookies[0])
    }
}
```

在上述例子中，我们首先创建了一个新的CookieJar实例，并将其用于一个新的HTTP客户端中。然后，我们在客户端上创建了一个新的cookie，并检查它是否已经被存储在了CookieJar中。 

如果这篇文章帮助了你，不妨一键三连哦？
