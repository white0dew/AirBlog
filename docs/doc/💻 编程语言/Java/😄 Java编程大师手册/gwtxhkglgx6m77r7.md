---
title: 5、Java玩转I/O
urlname: gwtxhkglgx6m77r7
date: '2024-05-24 09:47:03'
updated: '2024-05-24 09:50:13'
description: 5.1 文件操作Java提供了丰富的类和方法用于文件操作，例如读取和写入文件。5.1.1 读取文件使用FileReader和BufferedReader类可以读取文件内容。import java.io.BufferedReader; import java.io.FileReader; imp...
---
## 5.1 文件操作

Java提供了丰富的类和方法用于文件操作，例如读取和写入文件。

### 5.1.1 读取文件

使用`FileReader`和`BufferedReader`类可以读取文件内容。

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class FileReadExample {
    public static void main(String[] args) {
        String filePath = "example.txt";

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 5.1.2 写入文件

使用`FileWriter`和`BufferedWriter`类可以向文件写入内容。

```java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class FileWriteExample {
    public static void main(String[] args) {
        String filePath = "example.txt";
        String content = "Hello, this is a test content.";

        try (BufferedWriter bw = new BufferedWriter(new FileWriter(filePath))) {
            bw.write(content);
            System.out.println("Content written to file.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 5.2 网络编程基础

Java提供了丰富的网络编程接口，主要包括`java.net`包中的类和接口。

### 5.2.1 创建一个简单的服务器

使用`ServerSocket`类可以创建一个简单的服务器。

```java
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class SimpleServer {
    public static void main(String[] args) {
        int port = 8080;

        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Server is listening on port " + port);

            while (true) {
                Socket socket = serverSocket.accept();
                System.out.println("New client connected");

                // 在这里可以处理客户端请求
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 5.2.2 创建一个简单的客户端

使用`Socket`类可以创建一个简单的客户端。

```java
import java.io.IOException;
import java.net.Socket;

public class SimpleClient {
    public static void main(String[] args) {
        String hostname = "localhost";
        int port = 8080;

        try (Socket socket = new Socket(hostname, port)) {
            System.out.println("Connected to the server");

            // 在这里可以发送请求或接收响应
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 5.3 Java NIO：高效I/O的秘密

Java NIO（New I/O）提供了更高效的I/O操作，特别适用于高性能的网络和文件操作。

### 5.3.1 读取文件

使用`Files`类和`Paths`可以更简洁地读取文件内容。

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class NIOFileReadExample {
    public static void main(String[] args) {
        String filePath = "example.txt";

        try {
            List<String> lines = Files.readAllLines(Paths.get(filePath));
            for (String line : lines) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 5.3.2 写入文件

使用`Files`类和`Paths`可以更简洁地写入文件内容。

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Arrays;
import java.util.List;

public class NIOFileWriteExample {
    public static void main(String[] args) {
        String filePath = "example.txt";
        List<String> lines = Arrays.asList("Hello, NIO!", "This is a test content.");

        try {
            Files.write(Paths.get(filePath), lines, StandardOpenOption.CREATE);
            System.out.println("Content written to file.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 5.3.3 非阻塞I/O

Java NIO的非阻塞I/O特别适用于高并发的网络应用。

#### 示例：非阻塞服务器

```java
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;

public class NonBlockingServer {
    public static void main(String[] args) {
        int port = 8080;

        try {
            Selector selector = Selector.open();
            ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
            serverSocketChannel.bind(new InetSocketAddress(port));
            serverSocketChannel.configureBlocking(false);
            serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

            System.out.println("Server is listening on port " + port);

            while (true) {
                selector.select();
                Iterator<SelectionKey> keys = selector.selectedKeys().iterator();

                while (keys.hasNext()) {
                    SelectionKey key = keys.next();
                    keys.remove();

                    if (key.isAcceptable()) {
                        ServerSocketChannel server = (ServerSocketChannel) key.channel();
                        SocketChannel client = server.accept();
                        client.configureBlocking(false);
                        client.register(selector, SelectionKey.OP_READ);
                        System.out.println("New client connected");
                    } else if (key.isReadable()) {
                        SocketChannel client = (SocketChannel) key.channel();
                        ByteBuffer buffer = ByteBuffer.allocate(256);
                        client.read(buffer);
                        String message = new String(buffer.array()).trim();
                        System.out.println("Message received: " + message);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

