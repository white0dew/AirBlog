import fs from "fs";
import { create } from "xmlbuilder2";
import path from "path";
import { ChapterTree, DocIDMap } from "./elog";
import { SubmitUrlsToBaidu } from "./baidu-seo";
import { submitUrlsToIndexNow } from "./bing-seo";
// 假设ElogChapter接口和实例的树状数组已经定义好了
export interface ElogChapter {
  doc_id: string;
  uuid: string;
  title: string;
  url: string;
  urlname: string;
  parent_uuid?: string;
  level: number;
  is_nav: boolean;
  nav_path: string;
  children: ElogChapter[];
  parent: ElogChapter | null;
}

const siteUrl = "https://offernow.cn";
const sitemapPath = "./public/sitemap.xml";

// 生成sitemap XML
const buildSitemapXml = (rootUrl: string, chapters: ElogChapter[]): string => {
  const root = create({ version: "1.0", encoding: "UTF-8" }).ele("urlset", {
    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
  });

  // 站点url数组
  let urls: string[] = [];

  // 递归函数遍历树
  const addUrls = (chapter: ElogChapter) => {
    let tmpDoc = DocIDMap.get(chapter.urlname);
    let tmpDate = new Date();
    if (tmpDoc) {
      tmpDate = new Date(tmpDoc.updated);
    }

    const urlElement = root.ele("url");
    urlElement
      .ele("loc")
      .txt(`${rootUrl}${chapter.url.startsWith("/") ? "" : "/"}${chapter.url}`);
    urlElement.ele("changefreq").txt("weekly");
    urlElement.ele("priority").txt(chapter.level === 1 ? "1.0" : "0.5"); // 假设子级优先级降低
    urlElement.ele("lastmod").txt(tmpDate.toISOString());
    urls.push(
      `${rootUrl}${chapter.url.startsWith("/") ? "" : "/"}${chapter.url}`
    );
    // 递归添加子章节
    chapter.children.forEach(addUrls);
  };

  // 开始遍历树
  chapters.forEach(addUrls);
  SubmitUrlsToBaidu(urls);
  submitUrlsToIndexNow(urls);
  return root.end({ prettyPrint: true });
};

// 生成并保存sitemap
export default function generateSitemap() {
  const sitemapXml = buildSitemapXml(siteUrl, ChapterTree);
  fs.mkdirSync(path.dirname(sitemapPath), { recursive: true });
  fs.writeFileSync(sitemapPath, sitemapXml);
  console.log("Sitemap generated successfully!");
}
