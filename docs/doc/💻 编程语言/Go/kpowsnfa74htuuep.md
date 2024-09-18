---
title: Golang各版本特性
urlname: kpowsnfa74htuuep
date: '2024-09-18 15:10:23'
updated: '2024-09-18 15:13:27'
description: '---is_nav: falsenav_path: go_version---Go 1.22循环变量改进：解决for循环中循环变量意外共享问题，for range中的循环变量在每次迭代中有自己的变量，go work增加支持vendor特性，go mod init不再考虑GOPATH时代的包依赖...'
is_nav: false
nav_path: go_version
---
# Go 1.22
+ 循环变量改进：解决for循环中循环变量意外共享问题，for range中的循环变量在每次迭代中有自己的变量，go work增加支持vendor特性，go mod init不再考虑GOPATH时代的包依赖工具配置文件。
+ range支持整型表达式：for range循环的range表达式支持整型表达式。
+ 性能提升：运行时内存优化，CPU性能提高约1 - 3%，内存开销减少约1%，PGO功能进一步改进。
+ 标准库新增内容：引入`math/rand/v2`包，`net/http.ServeMux`的patterns接受方法和通配符，`database/sql`包新增`Null[T]`类型，`slices`包添加`Concat`函数。
+ 工具链：go vet工具取消对loop变量引用的警告，增加对空append、deferring time.Since和log/slog包方法调用时key - value pair不匹配的警告。

# Go 1.21
+ 包含多个安全修复和错误修复。

# Go 1.20：
+ 支持将slice直接转为数组，Comparable类型可比较，unsafe包添加4个函数。
+ 增加对RISC - V架构在FreeBSD操作系统的实验性支持，引入PGO。
+ 标准库加强：新增时间转换格式常量，新包`crypto/ecdh`支持密钥交换，新类型`http.ResponseController`和新钩子函数`httputil.ReverseProxy.Rewrite`，新方法`context.WithCancelCause`，`os/exec.Cmd`结构体新增字段。
+ 工具链：cover工具可收集整个程序覆盖率，go build等命令可接收 - pgo和 - cover标志，go test - json实现改进，vet在并行测试中可能更多循环变量引用错误，在无C工具链系统上默认禁用CGO。
+ 性能提升：编译器和GC优化减少内存开销，CPU性能整体提高2%，编译时间优化提升10%，Go发行版瘦身。

# Go 1.19
    - 修复泛型问题，修订Go memory model，修订go doc comment格式。
    - 新增runtime.SetMemoryLimit和GOMEMLIMIT环境变量，启动时默认提高打开文件限值。
    - race detector升级到v3版thread sanitizer，增加“unix” build tag，标准库net包使用EDNS，标准库flag包增加TextVar函数，正式支持64位龙芯cpu架构。
    - Go运行时根据goroutine历史平均栈使用率分配初始栈，sync/atomic包增加新的高级原子类型，Go编译器使用jump table重新实现switch语句，平均性能提升20%左右。

# Go 1.18
+ 支持泛型，引入Workspaces工作区，Go编译器与Go module有变化。
+ 纳入go fuzzing test，go get不再执行编译和安装工作，gofmt支持并发。
+ 内置函数Append扩容算法变化，新增net/netip包，tls client默认使用TLS 1.2版本，crypto/x509包默认拒绝SHA - 1哈希函数签名证书（自签发除外），strings包和bytes包新增Cut函数，runtime/pprof精确性提升，sync包新增一些方法。

# Go 1.17
+ 支持从切片到数组指针的转换，go modules支持“修剪模块图”。
+ 编译器带来额外改进，程序性能提高约5%，amd64平台二进制大小减少约2%，unsafe包新增两个函数，`go.mod`中添加弃用模块的注释。
+ net包的url参数解析、IP判断和ipv4地址格式有变化。

# Go 1.16
+ GO111MODULE默认为on，支持编译阶段打包静态资源文件并提供访问能力。

# Go 1.15
+ 改进对高核心数小对象的分配，编译器/汇编器/链接器优化，二进制大小减少约5%，内置time/tzdata包。

# Go 1.14
+ Go Module可用于生产使用，嵌入具有重叠方法集的接口，改进defer的性能，goroutines异步可抢占，页面分配器更高效，内部定时器更高效。

# Go 1.13
+ 优化sync.Pool，重构逃逸分析逻辑，减少堆上的分配次数。
+ go命令默认使用Go module mirror和Go checksum database，对数字文字进行改进，错误换行，默认开启TLS 1.3。

# Go 1.12
+ 改进Go modules，在analysis包基础上重写go vet命令。

# Go 1.11
+ 引入Go modules。

# Go 1.10
+ `go test`命令可缓存测试结果，`go build`命令缓存最近构建的包，明确预声明类型，移除某些限制，默认的GOROOT，增加GOTMPDIR变量，通过cache实现增量构建提高go tools性能，`go tool pprof`增加Web UI，标准库新增`strings.Builder`，`bytes`包的一些方法底层实现变化。

# Go 1.9
+ 提升垃圾收集器和编译器，增加类型别名，新增`sync.Map`，`time`包更安全，`testing`包新增helper方法，支持渐进式代码重构，引入类型别名并提升运行时和工具支持。

# Go 1.8
+ 优化编译，CPU时间在32位ARM系统上减少20 - 30%，64位x86系统有适度性能改进，编译器和链接器更快，编译时间比Go 1.7改进约15%。
+ 标准库更多package使用context，垃圾回收器改进，暂停时间减小到毫秒级，改进defer函数，部分标准库使用context包改造，`sort`包新增`Slice`函数。

# Go 1.7
+ `context`包转正，编译时间显著加快，二进制文件大小和CPU时间减少，垃圾收集器加速和标准库优化，`go tool trace`改进。

# Go 1.6
+ 增加对HTTP/2协议的默认支持，降低垃圾回收器的延迟，`runtime`改变打印程序结束恐慌的方式，默认启用`vendor`目录，`sort.Sort`内部算法改进，运行速度提高约10%。

# Go 1.5
+ 垃圾回收器重新设计实现，GC延迟显著降低，调度程序改进允许更改`GOMAXPROCS`值，`map`语法更改，发布`go tool trace`。

# Go 1.4
+ `For - range loops`支持新语法，发布官方支持包`golang.org/x/mobile`，运行时转换为Go语言实现且垃圾收集器更精准，堆栈大小减少，发布`go generate`命令，引入`Internal`包，项目代码管理工具切换为Git并迁移到Github。

# Go 1.3
+ 堆栈管理改善，发布`sync`包的`Pool`组件，改进`channel`的实现提升性能。

# Go 1.2
+ 支持三索引切片，`go test`命令支持代码覆盖率报告并提供新的`go tool cover`命令。

# Go 1.1
+ 增强语言特性（编译器、垃圾回收机制、映射、goroutine调度器）与性能。

# Go 1.0
+ 承诺兼容性，确保向后兼容。

