---
title: "C++杂谈：指针、常量、数组？\U0001F4D6"
urlname: dnlzg5c1knqo7vq0
date: '2024-05-24 12:33:59'
updated: '2024-05-28 16:47:30'
description: '《C++杂谈》探讨了指针与常量、迭代器与失效、内联函数、数组名及常量指针等核心概念，剖析了其用法和实现原理。指针数组和数组指针？变量类型区分要区分某个变量是指针数组还是数组指针，只需要看 * 修饰的是哪个变量！int main() {     int a[3] = {1, 2, 3};  //...'
---
《C++杂谈》探讨了指针与常量、迭代器与失效、内联函数、数组名及常量指针等核心概念，剖析了其用法和实现原理。
## 指针数组和数组指针？变量类型区分
要区分某个变量是指针数组还是数组指针，只需要看 `*` 修饰的是哪个变量！
```cpp
int main() {
    int a[3] = {1, 2, 3};  // 数组
    int* b[3];             // 指针数组
    int(*c)[3];            // 数组指针
    int(*e[3]);            // 指针数组，跟 b 一样

    void (*funcName)(int a);  // 函数指针
    funcName = getName;
    funcName(1);

    void (*funcNameArr[3])(int a);      // 函数指针的一维数组
    void (**funcNameArr1[3])(int a);    // 函数指针的二维数组

    int randomNum = 1997;
    int randomNum2 = 1998;
    const int* constp1 = &randomNum;  // 指针常量
    constp1 = &randomNum2;            // 编译通过
    //*constp1 = 1;                    // 编译失败
    
    int* const constp2 = &randomNum;  // 常量指针
    *constp2 = 2;                     // 编译通过
    //constp2 = &randomNum2;           // 编译失败
    
    cout << "end!" << endl;
}
```

## 指针常量与常量指针

指针常量与常量指针经常容易混淆。通过实际代码，我们可以更好地理解它们的区别。

### 方法1: 常量指针

```cpp
const double* ptr;  // const 读作常量，* 读作指针，按照顺序读作常量指针
```

### 方法2: 常量指针

```cpp
double const* ptr;  // const 读作常量，* 读作指针，按照顺序读作常量指针
```

### 指针常量

```cpp
double* const ptr;  // const 读作常量，* 读作指针，按照顺序读作指针常量
```

### 常量的意思

在 C/C++ 中，常量的关键词是 `const`，即无法被改变。在编译阶段，编译器若发现对常量进行了修改，就会出现提示。基于此，常量在声明时就必须初始化，而且之后都不能改变。

#### 若不初始化：

```cpp
const int x;  // 编译失败，必须初始化
```

#### 若尝试改变：

```cpp
const int x = 10;
x = 20;  // 编译失败
```

### 指针的概念

简单来说，指针就是一个盒子，里边放着的东西是一把钥匙，我们可以通过这把钥匙去打开一个对应的保险箱并取出东西。

- **盒子 = 指针**：根据系统位数32/64位数不同，这个盒子的大小可能为4/8字节大小。
- **钥匙 = 内存地址**：根据系统位数32/64不同，这个钥匙大小也是4/8字节。
- **保险箱 = 内存空间**：利用钥匙中隐藏的内存地址，访问对应内存地址的内存空间，取出其中的宝藏！

### 常量指针与指针常量

#### 指针常量

指针本身是常量，指针内部存的钥匙是无法改变的，但指针指向的内容是可以改变的。

```cpp
int randomNum = 1997;
int* const constp2 = &randomNum;  // 常量指针
*constp2 = 2;                     // 编译通过
//constp2 = &randomNum2;          // 编译失败
```

#### 常量指针

指针指向常量，指针本身可以改变，但指针指向的内容不能改变。

```cpp
int randomNum = 1997;
const int* constp1 = &randomNum;  // 指向常量的指针
// *constp1 = 1;                  // 编译失败
int randomNum2 = 1998;
constp1 = &randomNum2;            // 编译通过
```

### 示例代码

```cpp
int main() {
    int randomNum = 1997;
    int randomNum2 = 1998;
    
    // 指向常量的指针
    const int* constp1 = &randomNum;
    constp1 = &randomNum2;  // 编译通过
    //*constp1 = 1;         // 编译失败
    
    // 常量指针
    int* const constp2 = &randomNum;
    *constp2 = 2;           // 编译通过
    //constp2 = &randomNum2; // 编译失败

    cout << "end!" << endl;
}
```

### 总结

- **指针常量**：指针本身不能改变，但指针指向的内容可以改变。
- **常量指针**：指针本身可以改变，但指针指向的内容不能改变。

## 字符串和字符串数组

- **字符串**：存储在代码段中的字符串数组，无法修改。
- **字符串数组**：存储在栈区的数组，可以修改。

## 全局变量、全局函数同名

- **全局变量和全局函数**：不能同名（函数可以同名，因为重载）。
- **全局函数和局部变量**：可以同名。

## 迭代器与失效

### 迭代器的作用

STL标准库一共有六大部件：分配器、容器、迭代器、算法、仿函数、适配器。迭代器是用来“联结”算法、仿函数与容器的纽带。

### 迭代器模式

迭代器模式是一种设计模式，提供了一种方法，在不需要暴露某个容器的内部表现形式情况下，使之能依次访问该容器中的各个元素。这种设计思维在STL中得到了广泛的应用，是STL的关键所在。

### 迭代器的实现

#### vector

在vector中，迭代器被定义成了我们传入的类型参数T的指针。

```cpp
template<typename T, class Alloc = alloc>
class vector {
public:
    typedef T value_type;
    typedef value_type* iterator;
    // 其他代码省略
};
```

#### List

以下是一个简单的 List 迭代器实现：

```cpp
#ifndef CPP_PRIMER_MY_LIST_H
#define CPP_PRIMER_MY_LIST_H

#include <iostream>

template<typename T>
class node {
public:
    T value;
    node* next;
    node() : next(nullptr) {}
    node(T val, node* p = nullptr) : value(val), next(p) {}
};

template<typename T>
class my_list {
private:
    node<T>* head;
    node<T>* tail;
    int size;

private:
    class list_iterator {
    private:
        node<T>* ptr; // 指向 list 容器中的某个元素的指针

    public:
        list_iterator(node<T>* p = nullptr) : ptr(p) {}
        
        // 重载 ++、--、*、-> 等基本操作
        // 返回引用，方便通过 *it 来修改对象
        T& operator*() const {
            return ptr->value;
        }

        node<T>* operator->() const {
            return ptr;
        }

        list_iterator& operator++() {
            ptr = ptr->next;
            return *this;
        }

        list_iterator operator++(int) {
            node<T>* tmp = ptr;
            // this 是指向 list_iterator 的常量指针，因此 *this 就是 list_iterator 对象，前置++已经被重载过
            ++(*this);
            return list_iterator(tmp);
        }

        bool operator==(const list_iterator& t) const {
            return t.ptr == this->ptr;
        }

        bool operator!=(const list_iterator& t) const {
            return t.ptr != this->ptr;
        }
    };

public:
    typedef list_iterator iterator; // 类型别名
    my_list() {
        head = nullptr;
        tail = nullptr;
        size = 0;
    }

    // 从链表尾部插入元素
    void push_back(const T& value) {
        if (head == nullptr) {
            head = new node<T>(value);
            tail = head;
        } else {
            tail->next = new node<T>(value);
            tail = tail->next;
        }
        size++;
    }

    // 打印链表元素
    void print(std::ostream& os = std::cout) const {
        for (node<T>* ptr = head; ptr != tail->next; ptr = ptr->next) {
            os << ptr->value << std::endl;
        }
    }

public:
    // 操作迭代器的方法
    // 返回链表头部指针
    iterator begin() const {
        return list_iterator(head);
    }

    // 返回链表尾部指针
    iterator end() const {
        return list_iterator(tail->next);
    }

    // 其他成员函数 insert/erase/emplace
};

#endif // CPP_PRIMER_MY_LIST_H
```

### 其他容器迭代器分析

**vector**: 迭代器具有所有指针算术运算能力，种类为 Random Access Iterator。

**list**: 由于是双向链表，迭代器只有双向读写，但不能随机访问元素，种类为 Bidirectional Iterator。

### 迭代器分类

在 STL 中，除了原生指针以外，迭代器被分为五类：

1. **Input Iterator**：只读迭代器，支持 ==、!=、++、*、-> 操作。
2. **Output Iterator**：只写迭代器，支持 ++、* 操作。
3. **Forward Iterator**：单向读写迭代器，支持 Input Iterator 和 Output Iterator 的所有操作。
4. **Bidirectional Iterator**：双向读写迭代器，支持 Forward Iterator 的所有操作，并支持 -- 操作。
5. **Random Access Iterator**：支持所有指针操作，适用于随机访问，支持前四种迭代器的所有操作，并支持 it + n、it - n、it += n、it -= n、it1 - it2 和 it[n] 操作。

### 迭代器失效

当使用一个容器的 insert 或 erase 函数通过迭代器插入、删除或者修改元素时，可能会导致迭代器失效。

#### vector 迭代器失效情况

1. 插入（push_back）一个元素后，end 操作返回的迭代器肯定失效。
2. 当插入(push_back)一个元素后，如果 capacity 返回值与没有插入元素之前相比有变化，则 first 和 end 操作返回的迭代器都会失效。
3. 删除操作（erase，pop_back）后，指向删除点的迭代器和删除点后面的元素的迭代器都会失效。

#### list 迭代器失效情况

1. 插入操作（insert）和接合操作（splice）不会导致原有的 list 迭代器失效。
2. 删除操作（erase）仅仅会使指向被删除元素的迭代器失效，其他迭代器不受影响。

#### 关联容器迭代器失效情况

对于关联容器（如 map, set, multimap, multiset），删除当前的迭代器仅会使当前迭代器失效。为了避免危险，应该重新获取新的有效的迭代器。

## a++和a++的代码实现

a++ 和 ++a 的区别在于，前者是值，后者是引用。

### 示例代码

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 10;
    printf("%d\n", a++);
    printf("%d\n", ++a);
    a = a++;
    printf("%d\n", a);
    return 0;
}
```

### 结果分析

```
10
12
12
```

### 实现

#### 后缀实现

```cpp
T T::operator++(int) {
    T old(*this);
    *this = *this + 1;
    return old;
}
```

#### 前缀实现

```cpp
T& T::operator++() {
    *this = *this + 1;
    return *this;
}
```

## C语言与汇编

### 编译过程

1. **预处理**：完成文本替换、宏展开以及删除注释，生成 `.i` 文件。
2. **编译**：将 `.i` 文件翻译为 `.s`，得到汇编程序语言。
3. **汇编**：将 `.s` 文件翻译成机器语言指令，生成目标文件 `.o`。
4. **链接**：将目标文件与库文件链接，生成可执行文件。

### 查看汇编代码

使用 gcc/g++ 查看各阶段代码：

```shell
gcc -S test.c -o test.s
```

### 示例代码

#### 有函数调用版本

```cpp
#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    int a = 1;
    int b = 2;
    int c;
    c = add(a, b);
    return 0;
}
```

### 汇编代码

```
.file   "test_inline_call.c"
.text
.globl  add
.type   add, @function
add:
.LFB0:
    .cfi_startproc
    pushq   %rbp
    .cfi_def_cfa_offset 16
    .cfi_offset 6, -16
    movq    %rsp, %rbp
    .cfi_def_cfa_register 6
    movl    %edi, -4(%rbp)
    movl    %esi, -8(%rbp)
    movl    -4(%rbp), %edx
    movl    -8(%rbp), %eax
    addl    %edx, %eax
    popq    %rbp
    .cfi_def_cfa 7, 8
    ret
    .cfi_endproc
.LFE0:
    .size   add, .-add
.globl  main
.type   main, @function
main:
.LFB1:
    .cfi_startproc
    pushq   %rbp
    .cfi_def_cfa_offset 16
    .cfi_offset 6, -16
    movq    %rsp, %rbp
    .cfi_def_cfa_register 6
    subq    $16, %rsp
    movl    $1, -12(%rbp)
    movl    $2, -8(%rbp)
    movl    -8(%rbp), %edx
    movl    -12(%rbp), %eax
    movl    %edx, %esi
    movl    %eax, %edi
    call    add
    movl    %eax, -4(%rbp)
    movl    $0, %eax
    leave
    .cfi_def_cfa 7, 8
    ret
    .cfi_endproc
.LFE1:
    .size   main, .-main
    .ident  "GCC: (Ubuntu 5.4.0-6ubuntu1~16.04.12) 5.4.0 20160609"
    .section    .note.GNU-stack,"",@progbits
```

### 无函数调用版本

```cpp
#include <stdio.h>

int main() {
    int a = 1;
    int b = 2;
    int c;
    c = a + b;
    return 0;
}
```

### 汇编代码

```
.file   "test_inline_nocall.c"
.text
.globl  main
.type   main, @function
main:
.LFB0:
    .cfi_startproc
    pushq   %rbp
    .cfi_def_cfa_offset 16
    .cfi_offset 6, -16
    movq    %rsp, %rbp
    .cfi_def_cfa_register 6
    movl    $1, -12(%rbp)
    movl    $2, -8(%rbp)
    movl    -12(%rbp), %edx
    movl    -8(%rbp), %eax
    addl    %edx, %eax
    movl    %eax, -4(%rbp)
    movl    $0, %eax
    popq    %rbp
    .cfi_def_cfa 7, 8
    ret
    .cfi_endproc
.LFE0:
    .size   main, .-main
    .ident  "GCC: (Ubuntu 5.4.0-6ubuntu1~16.04.12) 5.4.0 20160609"
    .section    .note.GNU-stack,"",@progbits
```

### 对比

- 带函数调用的版本在多了参数入栈、控制权转移、栈帧恢复等汇编代码。
- 使用内联函数可以减少这些开销。

### 内联函数版本

```cpp
#include <stdio.h>

__attribute__((always_inline))
inline int add(int a, int b) {
    return a + b;
}

int main() {
    int a = 1;
    int b = 2;
    int c;
    c = add(a, b);
    return 0;
}
```

### 汇编代码

```
.file   "test_inline.c"
.text
.globl  main
.type   main, @function
main:
.LFB1:
    .cfi_startproc
    pushq   %rbp
    .cfi_def_cfa_offset 16
    .cfi_offset 6, -16
    movq    %rsp, %rbp
    .cfi_def_cfa_register 6
    movl    $1, -20(%rbp)
    movl    $2, -16(%rbp)
    movl    -20(%rbp), %eax
    movl    %eax, -8(%rbp)
    movl    -16(%rbp), %eax
    movl    %eax, -4(%rbp)
    movl    -8(%rbp), %edx
    movl    -4(%rbp), %eax
    addl    %edx, %eax
    movl    %eax, -12(%rbp)
    movl    $0, %eax
    popq    %rbp
    .cfi_def_cfa 7, 8
    ret
    .cfi_endproc
.LFE1:
    .size   main, .-main
    .ident  "GCC: (Ubuntu 5.4.0-6ubuntu1~16.04.12) 5.4.0 20160609"
    .section    .note.GNU-stack,"",@progbits
```

### 对比分析

- 函数调用版本多了栈帧更新、控制权转移等操作。
- 内联函数版本避免了这些操作，将函数代码直接嵌入调用处。

### 小结

内联函数通过嵌入代码，减少了函数调用的开销。虽然会增加代码膨胀，但对于小型、频繁调用的函数，可以显著提升性能。

## 数组名与常量指针

### 示例代码

```cpp
char* s = "abc";
char a[4];

s = a;  // 合法
a = s;  // 非法，数组名是常量指针
```

### 数组名不是常量指针的情况

1. 数组名作为 `sizeof` 操作符的操作数时，表示整个数组。
2. 数组名作为 `&` 操作符的操作数时，表示整个数组。

### 示例

#### sizeof 操作符

```cpp
int arr[5] = {1, 2, 3, 4, 5};
int arrSize = sizeof(arr);  // arr 表示整个数组，arrSize = 20
```

#### & 操作符

```cpp
int arr[5] = {1, 2, 3, 4, 5};
int* p = &arr;  // arr 表示整个数组，p 的值为数组首元素的地址
```

## 指针数组与数组指针

### 示例代码

```cpp
char* p[4];       // 指针数组，p 指向的是一个数组，里面存的是4个指针
char (*p)[4];     // 数组指针，p 是指向一个数组首地址，这个数组里的每个元素都是 char
```

### 总结

- 指针数组：数组中的每个元素都是指针。
- 数组指针：指向一个数组的指针。
