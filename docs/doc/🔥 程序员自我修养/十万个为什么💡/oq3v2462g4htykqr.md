---
title: ChatGPT为什么使用SSE而不是WebSocket？
urlname: oq3v2462g4htykqr
date: '2024-06-19 23:15:04'
updated: '2024-06-19 23:15:10'
description: 我在探索ChatGPT的使用过程中，发现了一个有趣的现象：ChatGPT在实现流式返回的时候，选择了SSE（Server-Sent Events），而非WebSocket。那么问题来了：为什么ChatGPT选择了SSE，而不是WebSocket呢。SSE是什么？SSE，全称Server-Sen...
---
我在探索ChatGPT的使用过程中，发现了一个有趣的现象：ChatGPT在实现流式返回的时候，选择了SSE（Server-Sent Events），而非WebSocket。
那么问题来了：为什么ChatGPT选择了SSE，而不是WebSocket呢。
### SSE是什么？
SSE，全称Server-Sent Events，译为服务器发送事件，它是一种Web技术，允许服务器端实时地向客户端推送信息。SSE运行在HTTP协议之上，它利用持久化的HTTP连接，以事件流（Event Stream）的形式将数据发送给客户端，由客户端监听后获取。服务器端会定期向这个连接发送更新，这些更新被封装在一个或多个HTTP包中，每个包含有更新的事件流。这样，当有新的更新时，服务器就不需要等待客户端的请求，而是直接将数据推送给客户端。当连接被关闭或出现故障时，客户端会自动重新发送请求，重新建立连接。这确保了数据传输的连续性和实时性。
那么，SSE有什么优点呢?

1. 单向通信：SSE只支持从服务器到客户端的单向通信，服务器可以主动发送数据，用户只能接收。
2. 高效实时：因使用持久化连接，服务器可以实时地将数据推送给客户端，而无需客户端频繁发起请求。

### 什么是WebSocket？
WebSocket是一种网络通信协议，它最早被提出来是为了解决HTTP连接的一大限制：HTTP协议中，一个客户端发送给服务端的请求必须由服务端返回一个响应，这使得服务端无法主动向客户端推送数据。WebSocket的通信过程如下：

1. 客户端通过发送一个特殊的HTTP请求向服务器请求建立WebSocket连接。这个请求类似于：GET /chat HTTP/1.1 Upgrade: websocket Connection: Upgrade
2. 服务器响应这个请求，确认建立WebSocket连接。这个响应类似于：HTTP/1.1 101 Switching Protocols Upgrade: websocket Connection: Upgrade
3. 之后，客户端和服务器就可以通过这个常开的连接自由地发送或接收消息。
### SSE与WebSocket的比较
你可能疑问，为什么不直接使用WebSocket，它似乎更为通用，也同样支持实时数据推送。这就是我们需要对比两者的理由。

1. 通信模式：SSE只支持服务器向客户端的单向通信，而WebSocket支持全双工通信，即服务器和客户端可以互相发送数据。对于ChatGPT这样的应用来说，大多数情况下，用户的请求是稀疏的，而服务器的响应是密集的，因此，SSE的单向通信模式更为合适。
2. 网络协议：SSE运行在HTTP协议上，因此，它可以提供更高的兼容性和灵活性。举个例子，如果你的产品已经部署在Web服务器上，那么你大概率无需做任何改动，就可以使用SSE技术。而WebSocket则需要单独的服务器和端口。

除此之外，SSE和WebSocket在消息大小、连接数量、跨域支持等方面都有一些细微的差别，我们在具体设计时需要根据实际需求和制约因素做出选择。
### 使用Golang和React实践SSE

首先，我们需要创建一个Golang服务器。这个服务器将监听8000端口，等待客户端的SSE连接请求，并定时向连接发送消息。为了简单起见，这里我们假设服务器每秒产生一条新消息。以下是Golang服务器的代码：

```
package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/events", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Connection", "keep-alive")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		for {
			fmt.Fprintf(w, "data: Message at %s\n\n", time.Now())
			if flusher, ok := w.(http.Flusher); ok {
				flusher.Flush()
			} else {
				log.Println("Streaming unsupported!")
				return
			}
			time.Sleep(time.Second)
		}
	})

	http.Handle("/", http.FileServer(http.Dir("static")))
	log.Println("Listening on localhost:8000")
	http.ListenAndServe("localhost:8000", nil)
}
```

然后，我们需要创建一个React客户端，这个客户端会建立与Golang服务器的SSE连接，并在收到新消息时更新页面。以下是React客户端的代码：

```javascript
import React, { useEffect, useState } from 'react';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000/events');
    eventSource.onmessage = (event) => {
      setEvents((prevState) => [...prevState, event.data]);
    };
  }, []);

  return (
    <div className="App">
      <h1>Live updates from server</h1>
      {events.map((event, i) => <p key={i}>{event}</p>)}
    </div>
  );
}
export default App;
```
这个应用程序将从服务器接收一个每秒更新一次的实时数据流，并在客户端将这些更新显示出来。
### 总结
通过以上的分析和代码示例，我们可以明白为什么ChatGPT会选择使用SSE而非WebSocket。请记住，无论选择哪种实时数据推送技术，必须考虑到你的应用程序的具体需求，例如数据更新的速度、服务器和客户端的能力、网络条件等等。

如果上面的内容对你有帮助，请点赞收藏哦，我会分享更多的经验~
