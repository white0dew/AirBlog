---
title: golang中stringbuilder字符串拼接性能对比
urlname: ml8rzewka106hl4m
date: '2024-09-12 10:25:26'
updated: '2024-09-12 10:34:33'
description: golang的str直接相加和strbuilder性能差距有多大？对比测试在 Go 语言中，string是不可变类型，使用+操作符连接字符串时，每次操作都会创建一个新的字符串，涉及到内存分配和数据复制，对于大量的字符串连接操作，性能可能会比较低。而strings.Builder是为了高效地构建...
---
<font style="color:rgba(0, 0, 0, 0.85);">golang的str直接相加和strbuilder性能差距有多大？</font>

# 对比测试
在 Go 语言中，`string`是不可变类型，使用`+`操作符连接字符串时，每次操作都会创建一个新的字符串，涉及到内存分配和数据复制，对于大量的字符串连接操作，性能可能会比较低。

而`strings.Builder`是为了高效地构建字符串而设计的。它可以减少不必要的内存分配和复制，因为它在内部维护一个可变的字节切片，当需要连接字符串时，直接将字节追加到这个切片中，最后再将字节切片转换为字符串。

以下是一个简单的性能对比示例，新建一个strbuilder_test.go文件：

```go
package main

import (
    "bytes"
    "fmt"
    "strings"
    "testing"
)

const n = 10000

func BenchmarkStringPlus(b *testing.B) {
    s := ""
    for i := 0; i < b.N; i++ {
        for j := 0; j < n; j++ {
            s += "a"
        }
    }
}

func BenchmarkStringsBuilder(b *testing.B) {
    var builder strings.Builder
    for i := 0; i < b.N; i++ {
        for j := 0; j < n; j++ {
            builder.WriteString("a")
        }
    }
    _ = builder.String()
}

func BenchmarkBytesBuffer(b *testing.B) {
    var buffer bytes.Buffer
    for i := 0; i < b.N; i++ {
        for j := 0; j < n; j++ {
            buffer.WriteString("a")
        }
    }
    _ = buffer.String()
}
```

使用以下命令运行性能测试：

```bash
go test -bench=. -benchmem
```

输出如下：

```plain
cpu: VirtualApple @ 2.50GHz
BenchmarkStringPlus-10                98         658164470 ns/op        4939979293 B/op    10170 allocs/op
BenchmarkStringsBuilder-10         10000            101719 ns/op           61522 B/op          0 allocs/op
BenchmarkBytesBuffer-10            23876             51263 ns/op           32838 B/op          0 allocs/op
PASS
```

1. **第一列（例如 BenchmarkStringPlus-8）**：
    - 这是性能测试的名称标识，这里的“StringPlus”表示使用字符串相加（`+`操作符）进行连接的测试，“StringsBuilder”表示使用`strings.Builder`进行连接的测试，“BytesBuffer”表示使用`bytes.Buffer`进行连接的测试。最后的“-8”通常表示使用的 Go 语言处理器核心数量等运行时参数相关的信息。
2. **第二列（例如 98、10000、23876）**：
    - 这是性能测试的迭代次数。它表示在测试过程中，该测试函数被执行的次数。数值越大，通常表示测试的稳定性越好。
3. **第三列（例如 658164470 ns/op、101719 ns/op、51263 ns/op）**：
    - 这是每次操作的平均时间。具体单位是纳秒（ns）每操作（op）。例如“50274387 ns/op”表示在使用字符串相加的测试中，平均每次操作花费 50274387 纳秒。这个时间越低，说明性能越好。
4. **第四列（例如 4939979293 B/op、61522 B/op、32838 B/op）**：
    - 这是每次操作分配的平均字节数。它表示在执行测试函数的过程中，平均每次操作分配的内存大小。字节数越低，说明内存使用效率越高。
5. **第五列（例如 10170 allocs/op、1 allocs/op、1 allocs/op）**：
    - 这是每次操作的平均分配次数。它表示在执行测试函数的过程中，平均每次操作进行内存分配的次数。分配次数越低，说明内存分配的效率越高，对垃圾回收的压力也越小。

从这个结果可以看出，`strings.Builder`和`bytes.Buffer`在性能上比直接使用`+`操作符连接字符串有很大的提升。特别是在内存分配次数和每次操作的时间上。

需要注意的是，具体的性能差距会因字符串的大小、连接次数以及运行环境的不同而有所变化。但一般来说，在大量字符串连接的场景下，应该优先考虑使用`strings.Builder`或`bytes.Buffer`来提高性能。

# 分析
在 Go 语言中，`strings.Builder`和直接使用字符串相加（`+`操作符）有以下主要区别，这也导致了性能差距：

**一、字符串相加（**`+`**操作符）**

1. 内存分配与复制：
    - 每次使用`+`连接字符串时，都会创建一个新的字符串。这是因为`string`在 Go 中是不可变类型。例如，当连接两个字符串 `"Hello"` 和 `" world"` 时，会分配一块新的内存空间来容纳连接后的结果 `"Hello world"`，并将原字符串的数据复制到新的内存空间中。
    - 如果进行大量的字符串连接操作，就会频繁地进行内存分配和数据复制，这是非常耗时的操作，并且会产生大量的临时对象，增加垃圾回收的压力。

**二、**`strings.Builder`

1. 可变字节切片：
    - `strings.Builder`内部使用一个可变的字节切片来存储正在构建的字符串。当需要连接字符串时，它直接将字节追加到这个切片中，而不是创建新的字符串对象。
    - 这样可以避免频繁的内存分配和数据复制，因为它可以在现有的内存空间上进行扩展，而不需要为每个连接操作创建新的字符串。
2. 高效的内存管理：
    - `strings.Builder`会根据需要动态地扩展其内部的字节切片，以容纳更多的字符串数据。它通常会采用一些策略来尽量减少内存分配的次数和大小，例如预分配一定的空间，或者在需要扩展时以较大的步长进行扩展，以减少频繁的小内存分配。
3. 最终转换为字符串：
    - 当需要获取最终的字符串结果时，`strings.Builder`会将其内部的字节切片转换为字符串类型。这个转换操作通常只需要进行一次，而不是像字符串相加那样每次连接都可能产生新的字符串对象。

综上所述，`strings.Builder`通过使用可变的字节切片和高效的内存管理策略，避免了频繁的内存分配和数据复制，从而在大量字符串连接操作时具有更好的性能。相比之下，直接使用字符串相加会产生大量的临时对象和内存分配操作，导致性能下降。

