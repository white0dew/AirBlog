---
title: pnpm lockfile版本不一致
urlname: ypqbhwx47hgka006
date: '2024-09-27 07:58:44'
updated: '2024-09-27 08:01:24'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1727395194770-ca1b2e5f-bc12-4612-9508-11aa49ca1532.png'
description: 背景最近在部署OfferNow的时候，每次推送到线上之后，repo的pnpm-lock就变了。纳闷啊，为什么呢？直到我发现了这个：原来每次我推送的时候lockfileVersion都是9.0.但是一旦从线上拉下来，就变成了6.0. 关键在于我在dockerfile里没有指定pnpm的版本解决以...
---
# 背景
最近在部署OfferNow的时候，每次推送到线上之后，repo的pnpm-lock就变了。



纳闷啊，为什么呢？



直到我发现了这个：

![](https://oss1.aistar.cool/elog-offer-now/a5cd5f5b9a0bfb1fd82a5119fe8fe63f.png)



原来每次我推送的时候lockfileVersion都是9.0.



但是一旦从线上拉下来，就变成了6.0. 关键在于我在dockerfile里没有指定pnpm的版本



# 解决
以下是如何在 `Dockerfile` 中指定 `pnpm` 版本的步骤：

### 1. 使用 `corepack` 启用 `pnpm` 并指定版本
`corepack` 是 Node.js 16.9.0 及以上版本自带的一个工具，用于管理包管理器的版本。你可以在 `deps` 阶段使用 `corepack` 来启用 `pnpm` 并指定特定版本。

### 2. 修改 `Dockerfile`
以下是修改后的 `Dockerfile`：

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Enable corepack and install specific version of pnpm
RUN corepack enable && corepack prepare pnpm@<version> --activate

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# runner阶段创建最小镜像以运行next应用
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

# 创建用户和组
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3020

ENV PORT 3020

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
# 启动服务
CMD ["node", "server.js"]
```

### 3. 替换 `<version>`
在 `corepack prepare pnpm@<version> --activate` 这一行中，将 `<version>` 替换为你想要使用的 `pnpm` 版本号，例如 `7.0.0`。

### 4. 构建和运行 Docker 镜像
保存修改后的 `Dockerfile`，然后构建和运行 Docker 镜像：

```bash
docker build -t my-nextjs-app .
docker run -p 3020:3020 my-nextjs-app
```

通过这种方式，可以在 `Dockerfile` 中指定 `pnpm` 的版本，确保在不同环境中使用一致的 `pnpm` 版本。

