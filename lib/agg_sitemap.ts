// 假设这是从sitemap解析得到的URL数组
interface UrlItem {
  loc: string;
}

// 示例数据，实际应用中应从sitemap解析得到
const urls: UrlItem[] = [
  { loc: "https://offernow.cn/s/self_improve" },
  { loc: "https://offernow.cn/s/self_improve/ai" },
  // 更多URL...
];

// 聚合分类函数
function aggregateUrls(urls: UrlItem[]): Record<string, string[]> {
  const aggregated: Record<string, string[]> = {};

  urls.forEach(({ loc }) => {
    const match = loc.match(/https:\/\/offernow\.cn\/s\/([^/]+)(\/|$)/);

    if (match) {
      const category = match[1];
      if (!aggregated[category]) {
        aggregated[category] = [];
      }
      aggregated[category].push(loc);
    }
  });

  return aggregated;
}

// 使用示例
const aggregatedUrls = aggregateUrls(urls);

console.log(aggregatedUrls);
