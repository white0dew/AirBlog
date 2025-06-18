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
      className="group block transform transition-all duration-300 hover:scale-105"
    >
      <div
        className="max-w-sm rounded-xl overflow-hidden shadow-lg w-full h-full 
                    bg-white/60 backdrop-blur-sm border border-gray-200/30
                    dark:bg-gradient-to-br dark:from-slate-800/80 dark:to-slate-900/80 
                    dark:border-slate-700/30 dark:backdrop-blur-sm
                    hover:shadow-2xl hover:shadow-blue-500/10
                    dark:hover:shadow-purple-500/10
                    transition-all duration-500
                    animate-fade-up animate-ease-in-out"
      >
        {/* Icon section with enhanced background */}
        <div
          className="w-full h-20 text-6xl flex justify-center items-center 
                      bg-gradient-to-br from-gray-50 to-gray-100
                      dark:from-slate-800 dark:to-slate-700
                      group-hover:from-blue-50 group-hover:to-indigo-50
                      dark:group-hover:from-slate-700 dark:group-hover:to-slate-600
                      transition-all duration-300"
        >
          <span className="transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </span>
        </div>

        {/* Content section */}
        <div className="px-6 py-4">
          <div
            className="font-bold text-xl mb-3 line-clamp-1
                        bg-gradient-to-r from-gray-900 to-gray-700
                        dark:from-white dark:to-gray-300 bg-clip-text text-transparent
                        group-hover:from-blue-600 group-hover:to-purple-600
                        dark:group-hover:from-blue-400 dark:group-hover:to-purple-400
                        transition-all duration-300"
          >
            {trimTitle(title)}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span
              className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 
                           dark:group-hover:text-gray-300 transition-colors duration-300"
            >
              <span
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                             bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400
                             group-hover:bg-red-200 dark:group-hover:bg-red-900/50
                             transition-all duration-300"
              >
                🔥 {pv} 人在看
              </span>
            </span>
          </div>

          <p
            className="text-gray-500 text-sm mt-2 dark:text-gray-400 
                      group-hover:text-gray-600 dark:group-hover:text-gray-300
                      transition-colors duration-300"
          >
            📅 {date}
          </p>
        </div>

        {/* Hover effect line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                      from-blue-500 to-purple-500 transform scale-x-0 
                      group-hover:scale-x-100 transition-transform duration-300 origin-left"
        ></div>
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
