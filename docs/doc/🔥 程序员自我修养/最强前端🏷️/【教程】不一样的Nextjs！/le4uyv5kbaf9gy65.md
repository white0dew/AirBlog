---
title: 「推荐」如何安全地使用Nextjs的server-action？
urlname: le4uyv5kbaf9gy65
date: '2024-09-30 11:39:36'
updated: '2024-09-30 11:42:58'
description: 在现代 Web 开发中，安全性、类型检查和代码效率至关重要。Next.js 的 Server Actions 为我们提供了在服务器端执行操作的强大工具，而 next-safe-action 库则进一步增强了这一功能。本文将深入探讨如何利用 next-safe-action 来创建更安全、更高效...
---
在现代 Web 开发中，安全性、类型检查和代码效率至关重要。



Next.js 的 Server Actions 为我们提供了在服务器端执行操作的强大工具，而 next-safe-action 库则进一步增强了这一功能。



本文将深入探讨如何利用 next-safe-action 来创建更安全、更高效的 Server Actions。

## Server Actions 基础
首先，让我们回顾一下 Next.js 中 Server Actions 的基本概念。

Server Actions 是在 Next.js 13 中引入的功能，允许开发者直接在组件中定义和调用服务器端函数。这些函数使用 "use server" 指令标记，可以在服务器组件和客户端组件中使用。

### 基本示例
```typescript
"use server"

async function handleSubmit(formData: FormData) {
  const name = formData.get('name')
  // 服务器端逻辑
  console.log(`Server received: ${name}`)
}
```

这个简单的例子展示了 Server Action 的基本用法。然而，在实际应用中，我们通常需要处理更复杂的场景，包括数据验证、错误处理和类型安全。

## next-safe-action 介绍
next-safe-action 是一个专为 Next.js Server Actions 设计的库，旨在解决以下问题：

1. 类型安全：确保输入和输出都有正确的类型定义。
2. 数据验证：集成 Zod 等验证库，轻松进行数据校验。
3. 错误处理：提供统一的错误处理机制。
4. 代码简化：减少样板代码，提高开发效率。

## 深入对比：传统 Server Action vs next-safe-action
让我们通过一个更复杂的例子来深入比较这两种方法。

### 场景：用户注册功能
假设我们正在开发一个用户注册功能，需要验证用户输入，处理可能的错误，并返回适当的响应。

#### 传统 Server Action 实现
```typescript
// src/app/actions/register.ts
"use server"

import { z } from 'zod'

const UserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
})

type User = z.infer<typeof UserSchema>

type ReturnType = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function registerUser(userData: User): Promise<ReturnType> {
  const result = UserSchema.safeParse(userData)

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors
    }
  }

  try {
    // 模拟用户注册逻辑
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 检查邮箱是否已被使用
    if (userData.email === "test@example.com") {
      throw new Error("Email already in use")
    }

    return {
      success: true,
      message: "User registered successfully"
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred"
    }
  }
}
```

#### 使用 next-safe-action 的实现
```typescript
// src/app/actions/register.ts
"use server"

import { z } from 'zod'
import { actionClient } from "@/lib/safe-action"

const UserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
})

export const registerUserAction = actionClient
  .schema(UserSchema)
  .action(async ({ parsedInput }) => {
    try {
      // 模拟用户注册逻辑
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 检查邮箱是否已被使用
      if (parsedInput.email === "test@example.com") {
        throw new Error("Email already in use")
      }

      return {
        success: true,
        message: "User registered successfully"
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "An unknown error occurred")
    }
  })
```

### 主要区别分析
1. **代码结构**：next-safe-action 版本的代码结构更清晰，将验证逻辑和业务逻辑明确分开。
2. **错误处理**：传统方法需要手动构建错误对象，而 next-safe-action 允许直接抛出错误，简化了错误处理流程。
3. **类型安全**：next-safe-action 自动推断输入和输出类型，减少了手动类型定义的需要。
4. **验证集成**：在 next-safe-action 中，验证逻辑直接集成到 action 定义中，无需额外的验证步骤。
5. **返回值处理**：传统方法需要手动构建返回对象，而 next-safe-action 允许直接返回结果，库会自动处理响应格式。

## 客户端实现对比
现在，让我们看看如何在客户端组件中使用这些 Server Actions。

### 传统方法
```tsx
"use client"

import { useState } from 'react'
import { registerUser } from '@/app/actions/register'

export default function RegisterForm() {
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userData = Object.fromEntries(formData)

    const result = await registerUser(userData)

    if (result.success) {
      setMessage(result.message)
      setErrors({})
    } else {
      setMessage(result.message)
      setErrors(result.errors || {})
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
      <button type="submit">Register</button>

      {message && <p>{message}</p>}
      {Object.entries(errors).map(([field, messages]) => (
        <p key={field}>{field}: {messages.join(', ')}</p>

      ))}
    </form>

  )
}
```

### 使用 next-safe-action
```tsx
"use client"

import { useAction } from "next-safe-action/hooks"
import { registerUserAction } from '@/app/actions/register'

export default function RegisterForm() {
  const { execute, result, isExecuting } = useAction(registerUserAction)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userData = Object.fromEntries(formData)

    execute(userData)
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
      <button type="submit" disabled={isExecuting}>
        {isExecuting ? 'Registering...' : 'Register'}
      </button>

      {result?.data && <p>{result.data.message}</p>}
      {result?.validationErrors && (
        <ul>
          {Object.entries(result.validationErrors).map(([field, errors]) => (
            <li key={field}>{field}: {errors?.join(', ')}</li>

          ))}
        </ul>

      )}
      {result?.serverError && <p>Server Error: {result.serverError}</p>}
    </form>

  )
}
```

### 客户端实现的主要区别
1. **状态管理**：next-safe-action 版本使用 `useAction` hook 管理状态，无需手动设置 state。
2. **类型安全**：`useAction` hook 提供类型安全的结果对象，包括数据、验证错误和服务器错误。
3. **加载状态**：next-safe-action 提供 `isExecuting` 状态，便于处理加载状态。
4. **错误处理**：验证错误和服务器错误的处理更加直观和统一。
5. **代码简洁性**：整体代码结构更加简洁，减少了样板代码。

## next-safe-action 的高级特性
除了基本用法，next-safe-action 还提供了一些高级特性：

### 1. 中间件支持
你可以添加中间件来处理认证、日志记录等横切关注点：

```typescript
import { actionClient } from "@/lib/safe-action"

const authenticatedAction = actionClient.middleware(async () => {
  const user = await getUser()
  if (!user) throw new Error("Unauthorized")
  return { user }
})

export const protectedAction = authenticatedAction
  .schema(SomeSchema)
  .action(async ({ parsedInput, user }) => {
    // 使用 user 和 parsedInput
  })
```

### 2. 自定义错误处理
你可以自定义错误的处理方式：

```typescript
import { actionClient } from "@/lib/safe-action"

const customErrorAction = actionClient
  .schema(SomeSchema)
  .action(async ({ parsedInput }) => {
    // ...
  })
  .error((error) => {
    // 自定义错误处理逻辑
    return { customError: error.message }
  })
```

### 3. 重用验证逻辑
你可以在多个 actions 中重用相同的验证逻辑：

```typescript
const baseAction = actionClient.schema(BaseSchema)

export const action1 = baseAction.action(async ({ parsedInput }) => {
  // 实现 action1
})

export const action2 = baseAction.action(async ({ parsedInput }) => {
  // 实现 action2
})
```

## 性能考虑
使用 next-safe-action 可能会带来一些性能优势：

1. **减少网络请求**：由于验证在服务器端进行，可以减少无效请求。
2. **优化构建**：next-safe-action 支持树摇（tree shaking），有助于减小构建大小。
3. **缓存友好**：可以更容易地实现结果缓存，提高响应速度。

## 最佳实践
1. **始终使用 Zod 或类似库进行数据验证**：这不仅提供了类型安全，还确保了数据的完整性。
2. **利用中间件进行认证和授权**：这可以集中管理安全性，减少重复代码。
3. **合理使用错误处理**：自定义错误处理可以提供更好的用户体验。
4. **考虑使用 React Query 或 SWR**：这些库可以与 next-safe-action 很好地配合，提供更强大的数据管理能力。
5. **定期更新依赖**：确保你使用的是 next-safe-action 的最新版本，以获得最新的功能和安全修复。

## 结论
next-safe-action 为 Next.js 的 Server Actions 带来了显著的改进。它不仅简化了代码，还提供了更强的类型安全和错误处理能力。通过使用 next-safe-action，开发者可以更专注于业务逻辑，减少处理样板代码和错误情况的时间。

对于追求代码质量、开发效率和应用安全性的团队来说，next-safe-action 是一个值得考虑的工具。它使得 Server Actions 的使用更加直观和安全，是 Next.js 开发中的一个强大补充。

无论你是正在构建新项目还是优化现有代码库，next-safe-action 都值得一试。它可能会成为你 Next.js 工具箱中不可或缺的一部分，帮助你构建更加健壮和高效的 Web 应用。

通过本文的深入探讨和实际例子，我们看到了 next-safe-action 如何改变我们处理 Server Actions 的方式。它不仅提高了代码的可读性和可维护性，还为开发者提供了更多的信心来处理复杂的服务器端逻辑。在未来的 Next.js 项目中，考虑将 next-safe-action 纳入你的技术栈，你可能会发现它是提升开发体验和应用质量的关键工具。

