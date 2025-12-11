import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Post } from "contentlayer/generated";

// 这个是以最后的属性为准
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("zh-CN", options);
}

export function sortPosts(posts: Post[]) {
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function truncateSummary(text?: string, maxLength = 160) {
  if (!text) {
    return "";
  } else if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + "...";
  }
}

export function countWords(str: string) {
  const chWords = Array.from(str).filter((char) =>
    /[\u4e00-\u9fa5]/.test(char)
  ).length;

  const enWords = Array.from(str)
    .map((char) => (/[a-zA-Z0-9\s]/.test(char) ? char : " "))
    .join("")
    .split(/\s+/)
    .filter((s) => s).length;

  const words = chWords + enWords;
  const minutes = Math.round(words / 300);
  const text = minutes < 1 ? "小于一分钟" : `${minutes} 分钟`;

  return {
    words,
    minutes,
    text,
  };
}

export function mylog(message: any, ...optionalParams: any[]) {
  if (process.env.NODE_ENV === "development") {
    const styledMessage = "%c[AirBlog]";
    const style = "color: green; font-weight: bold;"; // 定义样式字符串

    // JSON.stringify的复用函数，用于处理BigInt
    const replacer = (key: string, value: any) =>
      typeof value === "bigint" ? value.toString() + "n" : value;

    // 尝试将message和optionalParams转换为字符串，如果失败则直接打印
    try {
      const stringifiedMessage = JSON.stringify(message, replacer);
      const stringifiedParams = optionalParams.map((param) =>
        JSON.stringify(param, replacer)
      );
      console.log(styledMessage, style, stringifiedMessage, ...stringifiedParams);
    } catch (error) {
      console.error("Logging error:", error);
      console.log(message, ...optionalParams); // 如果转换失败，直接输出原始数据
    }
  }
}

// 校验字符串是不是全空
// 注意换行符也要算在内
export function IsEmptyString(str: string): boolean {
  if (str === undefined || str === null) {
    return true;
  }
  mylog(str.trim().length === 0);
  return str.trim().length === 0;
}

export function RemoveYamlFrontMatterForDesc(text: string) {
  // 正则表达式匹配文档开头的YAML字段
  // 这里假设YAML块以三个短横线开始和结束
  const yamlBlockRegex = /---[\s\S]*?---/g;

  // 使用replace方法去除匹配到的YAML块
  const cleanedText = text.replace(yamlBlockRegex, "");
  mylog(cleanedText);
  return cleanedText;
}
