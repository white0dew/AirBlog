import { ElogChapter } from "@/types/elog";

// 分割URL层级
export function SplitUrlLevels(url: string): string[] {
  // 创建一个新的URL对象，它可以解析绝对和相对URL
  const urlObject = new URL(url, "http://example.com"); // 使用虚拟基础URL，以便也可以处理相对URL

  // 使用split方法分割pathname，并移除空字符串
  // 注意：URL对象的pathname属性以'/'开头，所以split结果的第一个元素通常是空字符串
  const pathSegments = urlObject.pathname
    .split("/")
    .filter((segment) => segment.length > 0);

  return pathSegments;
}

export function UrlIsMenu(): boolean {
  return true;
}

// 递归找父节点最后的菜单
export function FindLastMenu(curChild: ElogChapter): ElogChapter {
  if (!curChild) {
    return curChild;
  }

  // 看当前
  if (curChild.is_nav) {
    return curChild;
  }

  // 看父节点
  if (curChild.parent?.is_nav) {
    return curChild.parent;
  }

  return curChild;
}

// 示例使用
const url = "http://example.com/level1/level2/level3";
const levels = SplitUrlLevels(url);
console.log(levels); // 输出: ['level1', 'level2', 'level3']
