"use client";
import { mylog } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

// 假设这是你的博客数据
const blogData = [
  { id: 1, title: "Blog 1", tags: ["react", "javascript"] },
  { id: 2, title: "Blog 2", tags: ["nodejs", "express"] },
  { id: 3, title: "Blog 3", tags: ["react", "redux"] },
  { id: 4, title: "Blog 4", tags: ["javascript", "typescript"] },
];

// 获取所有标签
// @ts-ignore
const allTags = [...new Set(blogData.flatMap((blog) => blog.tags))];

export default function TagPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.getAll("tag");
  const searchJson = search.join(","); // 将数组转换为字符串
  mylog("search", search);

  const [filteredBlogs, setFilteredBlogs] = useState(blogData);

  useEffect(() => {
    if (search) {
      // @ts-ignore
      const filtered = blogData.filter((blog) => blog.tags.includes(search));
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogData);
    }
  }, [searchJson]);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  // tag=1&tag=2 来表示多个查询
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(name, value);
      return newSearchParams.toString();
    },
    [searchParams]
  );

  const handleTagClick = (tag: string) => {
    // 先查看当前是否已经选中了这个标签，如果已经选中，那就是删除
    if (search.includes(tag)) {
      const newSearch = search.filter((item) => item !== tag);
      // 生成url如果多个，用&
      const res = newSearch.map((item) => `tag=${item}`).join("&");

      router.push(`${pathname}?${res}`);
      return;
    }
    // 如果没有选中那就是新增
    const newSearch = [...search, tag];
    // 生成url如果多个，用&
    const res = newSearch.map((item) => `tag=${item}`).join("&");
    router.push(`${pathname}?${res}`);
  };

  return (
    <div className="flex flex-col  justify-start  h-full items-center w-full">
      <div className="mb-4 ">
        <h2 className="text-xl font-bold text-center mb-2">标签</h2>

        <div className="flex space-x-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`px-3 py-1 rounded ${search === tag ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        {/* 清空按钮 */}
        {search.length > 0 && (
          <button
            className="px-3 py-1 rounded bg-gray-200"
            onClick={() => router.push(pathname)}
          >
            清空
          </button>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold">文章列表</h2>
        <ul>
          {filteredBlogs.map((blog) => (
            <li key={blog.id} className="mb-2">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p>Tags: {blog.tags.join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
