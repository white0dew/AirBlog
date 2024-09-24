// ArticleCard

import React from "react";
import { Icons } from "../Icons";

// 定义一个包含备选图标的数组
const icons = ["🚀", "🌟", "💡", "📚", "🔍", "🎉", "✨", "🖋️", "🔥", "🎨"];

// 根据当前日期计算起始索引
const today = new Date();
const startIndex = today.getDate() % icons.length;

// 获取一个图标，给定文章的索引
function getIconForArticle(articleIndex: number): string {
  // 确保索引总是在图标数组的有效范围内
  const iconIndex = (startIndex + articleIndex) % icons.length;
  return icons[iconIndex];
}

// 假设您有一些文章数据
const articlesData = [
  {
    id: "1",
    title: "探索React的未来",
    summary: "深入探讨React框架的发展方向...",
    link: "#",
  },
  // 假设还有更多文章...
];

// 将图标分配给每篇文章
const articlesWithIcons = articlesData.map((article, index) => ({
  ...article,
  icon: getIconForArticle(index),
}));

// 然后，您可以将 articlesWithIcons 传递给之前创建的 ArticlesContainer 组件

export interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  icon?: string;
  link: string;
  pv: number;
  date: string;
}

function ArticleCard({
  title,
  summary,
  icon,
  link,
  pv,
  date,
}: ArticleCardProps) {
  return (
    <a
      href={link}
      className="block transform transition duration-300 hover:scale-105 hover:bg-blue-100 
      dark:bg-slate-800"
    >
      <div className="max-w-sm rounded overflow-hidden shadow-lg w-full h-full animate-fade-up animate-ease-in-out">
        <div className="w-full h-20 text-6xl flex justify-center items-center ">
          {icon}
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 dark:text-yellow-200 line-clamp-1">
            {trimTitle(title)}
          </div>
          <span className="dark:text-yellow-200">
            {" "}
            {/* 保证在深色模式下文字颜色为黄色 */}
            <span className="text-red-500 dark:text-red-300 text-lg px-1">
              {pv}
            </span>
            人在看
          </span>
          <p className="text-gray-700 text-base dark:text-yellow-200">
            更新:{date}
          </p>
        </div>
      </div>
    </a>
  );
}

export default ArticleCard;

function trimTitle(title: string): string {
  // 使用 "|" 作为分割符来分割字符串
  const parts = title.split(" | ");
  // 返回分割后的第一部分
  return parts[0];
}

// 示例用法
