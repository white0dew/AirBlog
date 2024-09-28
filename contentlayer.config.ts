import {
  defineDocumentType,
  makeSource,
  ComputedFields,
} from "contentlayer2/source-files";
import siteMetadata from "./assets/siteMetadata";
import rehypePrismPlus from "rehype-prism-plus";
import generateSitemap from "./lib/sitemap";
import {
  remarkCodeTitles,
  remarkExtractFrontmatter,
  remarkImgToJsx,
  extractTocHeadings,
} from "pliny/mdx-plugins/index.js";
import { slug } from "github-slugger";
import path from "path";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePresetMinify from "rehype-preset-minify";
import rehypeKatex from "rehype-katex";
import { countWords, mylog } from "./lib/utils";
import rehypeCitation from "rehype-citation";
import { writeFileSync } from "fs";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";
import { Post } from "./.contentlayer/generated";
import { FriendWebsiteInfo } from "@/types/friend-link";
const root = process.cwd();
const isProduction = process.env.NODE_ENV === "production";

const computedFields: ComputedFields = {
  readingTime: { type: "json", resolve: (doc) => countWords(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
  },
  path: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: "list", resolve: (doc) => extractTocHeadings(doc.body.raw) },
};

function createSearchIndex(allBlogs: any) {
  if (
    siteMetadata?.search?.provider === "kbar" &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${path.basename(siteMetadata.search.kbarConfig.searchDocumentsPath)}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    );
    console.log("Local search index generated...");
  }
}

function createTagCount(allBlogs: any) {
  console.log("Generating tag count...");
  const tagCount: Record<string, number> = {};
  allBlogs.forEach((file: Post) => {
    if (file.tags && !isProduction) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });
  console.log("Tag count generated...");
  console.log(JSON.stringify(tagCount));
  writeFileSync("./app/tag-data.json", JSON.stringify(tagCount));
}

// 生成友情链接
function createFriendLinks(allBlogs: Post[]) {
  // 只查看友情链接的配置
  for (const file of allBlogs) {
    if (file.title === "友情链接") {
      mylog("生成友情链接...");
      // 去除首位的换行符
      let tmpStr = file.body.raw.trim();
      const tableContent = tmpStr;
      mylog(JSON.stringify(tableContent));
      const lines = tableContent.split("\n");
      const headers = lines[1]
        .split("|")
        .map((item) => item.trim())
        .slice(1, -1);
      const websiteInfos: FriendWebsiteInfo[] = [];

      for (let i = 2; i < lines.length; i++) {
        const values = lines[i]
          .split("|")
          .map((item) => item.trim())
          .slice(1, -1);
        if (values.length === headers.length) {
          const url = values[1]
            .replace(/\[|\]/g, "")
            .split("(")[1]
            .split(")")[0];

          // 使用正则表达式提取 URL
          const markdownImageUrlRegex =
            /!\[.*?\]\((https?:\/\/.*?\.(?:webp|png|jpg|jpeg|gif))\)/;

          const matches = values[3].match(markdownImageUrlRegex);
          let imageUrl = "";
          if (matches && matches.length > 1) {
            imageUrl = matches[1]; // 第一个捕获组是 URL
            console.log(imageUrl); // 输出 URL
          } else {
            console.log("No URL found");
            imageUrl = "";
          }
          const websiteInfo: FriendWebsiteInfo = {
            name: values[0],
            url: url,
            description: values[2],
            imageUrl: imageUrl,
          };
          websiteInfos.push(websiteInfo);
        }
      }

      mylog("生成友情链接完成");
      console.log(websiteInfos);

      writeFileSync(`public/friend-links.json`, JSON.stringify(websiteInfos));
    }
  }
}

export const PostBlog = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `docs/doc/**/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    urlname: { type: "string", required: true },
    is_nav: { type: "boolean", default: false },
    nav_path: { type: "string" },
    updated: { type: "date" },
    skip_nav: { type: "boolean" },
    not_show: { type: "boolean", default: false },
    description: { type: "string" },
    cover: { type: "string" },
    tags: { type: "list", of: { type: "string" }, default: [] },
    keywords: { type: "string" },
    authors: { type: "list", of: { type: "string" }, default: ["whitedew"] },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "ComPost",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.updated || doc.date,
        description: doc.description,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
  },
}));

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: "docs/authors/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    en_name: { type: "string" },
    avatar: { type: "string" },
    occupation: { type: "string" },
    company: { type: "string" },
    email: { type: "string" },
    twitter: { type: "string" },
    linkedin: { type: "string" },
    github: { type: "string" },
    layout: { type: "string" },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: ".",
  contentDirInclude: ["docs/authors", "docs/doc"],
  documentTypes: [PostBlog, Author],
  markdown: {
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings],
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, "data") }],
      [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  mdx: {
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings],
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, "data") }],
      [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    generateSitemap();
    const { allPosts } = await importData();
    createTagCount(allPosts);
    createSearchIndex(allPosts);
    createFriendLinks(allPosts);
  },
});
