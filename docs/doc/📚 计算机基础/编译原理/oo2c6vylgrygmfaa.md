---
title: 3、编译语法分析
urlname: oo2c6vylgrygmfaa
date: '2024-05-28 18:59:35'
updated: '2024-05-31 11:11:00'
cover: 'https://cdn.nlark.com/yuque/__mermaid_v3/f26cb428fabdb38140beef4650dc7a4b.svg'
description: 3.1 语法分析的概述语法分析（Syntax Analysis）是编译过程中的第二个阶段。语法分析器的任务是根据词法分析器生成的记号（Token）序列，构造语法树或抽象语法树（AST），并检查源代码是否符合语言的语法规则。3.1.1 语法分析的功能构造语法树：根据记号序列构造程序的语法结构。语...
---
## 3.1 语法分析的概述

语法分析（Syntax Analysis）是编译过程中的第二个阶段。语法分析器的任务是根据词法分析器生成的记号（Token）序列，构造语法树或抽象语法树（AST），并检查源代码是否符合语言的语法规则。

### 3.1.1 语法分析的功能

- **构造语法树**：根据记号序列构造程序的语法结构。
- **语法检查**：检查源代码是否符合语言的语法规则。
- **报告语法错误**：检测和报告语法错误，帮助程序员快速定位和修复问题。

### 3.1.2 语法分析器的输入和输出

- **输入**：词法分析器生成的记号序列。
- **输出**：语法树或抽象语法树（AST）。

## 3.2 上下文无关文法

上下文无关文法（Context-Free Grammar, CFG）是描述编程语言语法的常用形式。CFG 由一组产生式规则组成，每条产生式规则定义了一种语法结构。

### 3.2.1 文法的组成部分

- **非终结符**：表示语法结构的一类符号，如 `<expr>`、`<term>` 等。
- **终结符**：表示具体的符号或记号，如 `+`、`*`、`id` 等。
- **产生式**：定义非终结符可以展开为哪些符号序列。
- **开始符**：表示文法的起始符号，通常用 `<start>` 表示。

### 3.2.2 示例文法

以下是一个简单的上下文无关文法示例，用于描述算术表达式：

```
<expr>   ::= <term> | <expr> + <term>
<term>   ::= <factor> | <term> * <factor>
<factor> ::= ( <expr> ) | id | num
```

### 上下文无关文法示意图


## 3.3 语法分析树与抽象语法树

语法分析树和抽象语法树是语法分析器生成的两种树形表示，用于表示程序的语法结构。

### 3.3.1 语法分析树

语法分析树（Parse Tree）是根据上下文无关文法的产生式规则生成的一棵树。树的每个节点表示一个非终结符或终结符，树的结构反映了程序的语法结构。

### 3.3.2 抽象语法树

抽象语法树（Abstract Syntax Tree, AST）是一种简化的语法树，它省略了不必要的语法细节，保留了程序的语义结构。AST 更适合用于后续的语义分析和代码生成。

### 语法分析树与抽象语法树示意图

#### 语法分析树


#### 抽象语法树


## 3.4 自顶向下语法分析

自顶向下语法分析是一种从文法的开始符号出发，逐步展开非终结符，直到匹配输入字符串的方法。常见的自顶向下语法分析方法包括递归下降分析和预测分析。

### 3.4.1 递归下降分析

递归下降分析是一种基于递归调用的语法分析方法，每个非终结符对应一个递归函数。递归下降分析器的实现通常较为简单，但对于左递归文法不适用。

### 示例：递归下降分析

```java
// 示例：递归下降分析器（Java）
public class RecursiveDescentParser {
    private Token currentToken;
    private Lexer lexer;

    public RecursiveDescentParser(Lexer lexer) {
        this.lexer = lexer;
        this.currentToken = lexer.nextToken();
    }

    public void parse() {
        expr();
    }

    private void expr() {
        term();
        while (currentToken.type == TokenType.PLUS) {
            match(TokenType.PLUS);
            term();
        }
    }

    private void term() {
        factor();
        while (currentToken.type == TokenType.MUL) {
            match(TokenType.MUL);
            factor();
        }
    }

    private void factor() {
        if (currentToken.type == TokenType.ID) {
            match(TokenType.ID);
        } else if (currentToken.type == TokenType.NUM) {
            match(TokenType.NUM);
        } else if (currentToken.type == TokenType.LPAREN) {
            match(TokenType.LPAREN);
            expr();
            match(TokenType.RPAREN);
        } else {
            throw new RuntimeException("语法错误");
        }
    }

    private void match(TokenType type) {
        if (currentToken.type == type) {
            currentToken = lexer.nextToken();
        } else {
            throw new RuntimeException("语法错误");
        }
    }
}
```

### 3.4.2 预测分析

预测分析是一种消除左递归的自顶向下语法分析方法，通常使用预测表（Predictive Parsing Table）来指导分析过程。预测分析适用于 LL(1) 文法，即每个非终结符的产生式在当前输入符号下具有唯一的选择。

### 自顶向下语法分析示意图

![](https://oss1.aistar.cool/elog-offer-now/2e2e0588e551540d00c138271af63fb1.svg)
## 3.5 自底向上语法分析

自底向上语法分析是一种从输入字符串的最底层开始，逐步将其还原为文法的开始符号的方法。常见的自底向上语法分析方法包括简单优先分析和 LR 分析。

### 3.5.1 自底向上分析的基本思想

自底向上分析器通过识别输入符号序列的“句柄”（Handle），逐步进行归约（Reduction），直到整个输入字符串被归约为文法的开始符号。

### 3.5.2 LR 分析

LR 分析是最常用的自底向上语法分析技术，分为 SLR（简单 LR）、LR(1) 和 LALR（Look-Ahead LR）等几种类型。LR 分析器通过构造 LR 分析表（LR Parsing Table），指导归约过程。

### 3.5.3 LR 分析表的构造

LR 分析表由移进（Shift）、归约（Reduce）、接受（Accept）和错误（Error）四种动作组成。通过构造和使用 LR 分析表，LR 分析器可以有效地进行语法分析。

### 自底向上语法分析示意图


### 示例：LR 分析器的工作过程

以下是一个简单的 LR 分析过程示例：

1. **输入字符串**：`id + id * id`
2. **移进**：将 `id` 移进分析栈
3. **归约**：根据文法规则，将 `id` 归约为 `<factor>`
4. **移进**：将 `+` 移进分析栈
5. **移进**：将 `id` 移进分析栈
6. **归约**：根据文法规则，将 `id` 归约为 `<factor>`
7. **移进**：将 `*` 移进分析栈
8. **移进**：将 `id` 移进分析栈
9. **归约**：根据文法规则，将 `id` 归约为 `<factor>`
10. **归约**：根据文法规则，将 `<factor> * <factor>` 归约为 `<term>`
11. **归约**：根据文法规则，将 `<factor> + <term>` 归约为 `<expr>`
12. **接受**：输入字符串成功归约为文法的开始符号 `<expr>`

## 3.6 语法分析中的错误处理

在语法分析过程中，可能会遇到各种各样的语法错误。语法分析器需要有效地检测和报告这些错误，以便程序员可以快速定位和修复问题。

### 3.6.1 常见语法错误类型

- **缺少符号**：如缺少括号、分号等。
- **多余符号**：如多余的括号、逗号等。
- **不匹配的符号**：如括号不匹配、运算符位置错误等。

### 3.6.2 错误处理策略

- **忽略错误**：跳过错误符号并继续分析。
- **插入符号**：插入缺失的符号来继续分析。
- **删除符号**：删除多余的符号来继续分析。
- **错误恢复**：尝试从错误中恢复，继续处理后续符号。

### 语法分析中的错误处理流程


## 3.7 语法分析工具

### 3.7.1 Yacc 和 Bison

Yacc（Yet Another Compiler-Compiler）和 Bison 是常用的语法分析器生成工具。它们允许用户通过定义文法规则，自动生成语法分析器代码。

### 示例：使用 Bison 生成语法分析器

以下是一个简单的 Bison 文件示例：

```
%{
#include <stdio.h>
#include "ast.h"
%}

%token ID NUM
%left '+' '-'
%left '*' '/'

%%

expr: expr '+' expr { $$ = new_expr('+', $1, $3); }
    | expr '-' expr { $$ = new_expr('-', $1, $3); }
    | expr '*' expr { $$ = new_expr('*', $1, $3); }
    | expr '/' expr { $$ = new_expr('/', $1, $3); }
    | '(' expr ')'  { $$ = $2; }
    | ID            { $$ = new_id($1); }
    | NUM           { $$ = new_num($1); }
    ;

%%

int main() {
    yyparse();
    return 0;
}

void yyerror(const char* s) {
    fprintf(stderr, "语法错误: %s\n", s);
}
```

### 使用 Bison 生成语法分析器的步骤


## 3.8 语法分析的性能优化

为了提高语法分析器的性能，可以采用以下几种优化策略：

### 3.8.1 使用 LR 分析

LR 分析适用于更广泛的文法，并且可以处理复杂的语法结构。通过使用 LR 分析，可以提高语法分析器的效率和准确性。

### 3.8.2 简化文法

通过简化文法规则，可以减少语法分析器的复杂度，提高分析速度。例如，消除左递归和公共前缀。

### 3.8.3 预测分析表优化

通过优化预测分析表，可以减少分析器在处理输入时的冲突，提高分析效率。例如，合并相同的预测集。

### 语法分析的性能优化流程

![](https://oss1.aistar.cool/elog-offer-now/32e6deada38786078c300f991f7bbf2d.svg)
## 3.9 语法分析器的调试与测试

语法分析器是编译器的核心组件之一，其正确性和效率对于整个编译过程至关重要。为了确保语法分析器的正确性和性能，需要进行充分的调试与测试。

### 3.9.1 调试语法分析器

调试语法分析器时，可以使用的技术和工具包括：

- **断点调试**：在关键代码处设置断点，逐步调试语法分析过程。
- **日志记录**：在语法分析过程中记录详细的日志信息，帮助定位和分析问题。
- **单元测试**：为各个语法分析功能编写单元测试，确保各功能模块的正确性。

### 3.9.2 测试语法分析器

测试语法分析器时，可以采用以下策略：

- **覆盖测试**：确保测试用例覆盖所有文法规则和边界情况。
- **随机测试**：生成大量随机的测试输入，检查语法分析器的健壮性。
- **回归测试**：在修改语法分析器后，重新运行所有测试用例，确保没有引入新的错误。

### 语法分析器的调试与测试流程

### 示例：单元测试用例（使用 Java）

以下是一个简单的单元测试用例示例，用于测试语法分析器的正确性：

```java
import static org.junit.Assert.*;
import org.junit.Test;

public class ParserTest {

    @Test
    public void testValidExpression() {
        Lexer lexer = new Lexer("id + num * id");
        Parser parser = new Parser(lexer);
        try {
            parser.parse();
            assertTrue(true);
        } catch (Exception e) {
            fail("Valid expression should not throw exception");
        }
    }

    @Test
    public void testInvalidExpression() {
        Lexer lexer = new Lexer("id + + num");
        Parser parser = new Parser(lexer);
        try {
            parser.parse();
            fail("Invalid expression should throw exception");
        } catch (Exception e) {
            assertTrue(true);
        }
    }
}
```

## 3.10 总结

在本章中，我们详细介绍了语法分析的基本概念、上下文无关文法、语法分析树与抽象语法树、自顶向下和自底向上的语法分析方法、语法分析中的错误处理、语法分析工具以及性能优化方法。通过结合 Mermaid 图表，我们直观地展示了语法分析器的工作原理和各个步骤的具体实现。

在接下来的章节中，我们将深入探讨语义分析的基本概念和实现方法，进一步了解编译器的第三个重要阶段。

### 关键要点

- 语法分析器的任务是根据词法分析器生成的记号序列，构造语法树或抽象语法树，并检查源代码是否符合语言的语法规则。
- 上下文无关文法（CFG）用于描述编程语言的语法结构。
- 自顶向下语法分析方法包括递归下降分析和预测分析，自底向上语法分析方法包括 LR 分析。
- 语法分析中的错误处理策略包括忽略错误、插入符号、删除符号和错误恢复。
- 语法分析器的性能优化策略包括使用 LR 分析、简化文法和优化预测分析表。
- 调试与测试语法分析器时应采用覆盖测试、随机测试和回归测试等策略。

