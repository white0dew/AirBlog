---
title: 实现一个mac-PC风格的浮空导航栏
urlname: ksy4hu9wabv473vi
date: '2024-10-10 13:28:55'
updated: '2024-10-11 13:14:51'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1728538182981-314375f7-23fd-421a-b52c-490d7dc93dbd.png'
description: '代码"use client"; import React, { useState } from "react";  const Navbar = () =&gt; {   const [isOpen, setIsOpen] = useState(true);    const toggleNavba...'
---
# 代码
```typescript
"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`duration-800 fixed bottom-0 left-1/2 flex 
        w-1/2 -translate-x-1/2 transform items-center justify-between rounded-2xl bg-gray-800 p-4 text-white transition-all ${isOpen ? "h-16" : "h-16 w-fit"}`}
    >
      <div className={`flex space-x-4 ${isOpen ? "" : "hidden"}`}>
        <button className="rounded-full bg-blue-500 p-2 hover:bg-blue-600 focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </button>
        <button className="rounded-full bg-blue-500 p-2 hover:bg-blue-600 focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </button>
        <button className="rounded-full bg-blue-500 p-2 hover:bg-blue-600 focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </button>
      </div>
      <div className={`flex space-x-4 ${isOpen ? "" : "hidden"}`}>
        <button className="rounded-full bg-blue-500 p-2 hover:bg-blue-600 focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </button>
        <button className="rounded-full bg-blue-500 p-2 hover:bg-blue-600 focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </button>
      </div>
      <button
        className="rounded-full bg-blue-500 p-2 hover:bg-blue-600 focus:outline-none"
        onClick={toggleNavbar}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M19 9l-7 7-7-7" : "M4 9l7 7 7-7"}
          ></path>
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;

```

# 演示
打开导航栏：

![](https://oss1.aistar.cool/elog-offer-now/1a579c05d9dcd442c69e7214a51a1269.png)



关闭导航栏：

![](https://oss1.aistar.cool/elog-offer-now/03dd49a9036ad87d63dff510593bb3e9.png)



# 优化-新增放大效果
接下来在图标上加入一个鼠标悬停时放大的效果。

```javascript
"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed bottom-0 left-1/2 flex w-1/2 -translate-x-1/2 transform items-center justify-between rounded-2xl bg-gray-800 p-4 text-white transition duration-700 ease-in-out ${isOpen ? "h-16" : "h-16 w-fit"}`}
    >
      <div className={`flex space-x-4 transition-opacity duration-700 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index}
            className="rounded-full bg-blue-500 p-2 hover:bg-blue-600 focus:outline-none transform transition-transform duration-200 hover:scale-125"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>

            </svg>

          </button>

        ))}
      </div>

      <button
        className="rounded-full bg-blue-500 p-2 hover:bg-blue-600 focus:outline-none"
        onClick={toggleNavbar}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M19 9l-7 7-7-7" : "M4 9l7 7 7-7"}
          ></path>

        </svg>

      </button>

    </nav>

  );
};

export default Navbar;
```

1. **添加过渡效果**：
    - 将鼠标悬停效果添加在按钮的`className`中：`transform transition-transform duration-200 hover:scale-125`。
    - `transform` 和 `transition-transform` 用于开启变换和过渡效果。
    - `duration-200` 设置了过渡效果的持续时间为200毫秒。
    - `hover:scale-125` 设置了悬停时的放大比例为1.25倍。

