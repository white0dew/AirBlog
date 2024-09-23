import { allAuthors, allPosts, Author } from "@/.contentlayer/generated";
import SidebarChapter from "@/components/SideChapterList";
import { ChapterList, ChapterTree } from "@/lib/elog";
import { ElogChapter } from "@/types/elog";
import { notFound } from "next/navigation";
import { ArticleRightSider } from "@/app/s/[...slug]/components/ArticleSider";
import { coreContent } from "pliny/utils/contentlayer";
import { ArticleContent } from "./components/ArticleContent";
import {
  IsEmptyString,
  mylog,
  RemoveYamlFrontMatterForDesc,
  truncateSummary,
} from "@/lib/utils";
import EmptyArticle from "./components/EmptyArticle";
import { Metadata } from "next";
import siteMetadata from "@/assets/siteMetadata";
import { ContentPrefixPath } from "@/constants/path";

export const dynamicParams = true;
export const revalidate = 3600; //60*60*1 s不能够写乘法，否则不生效
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [];
}

function findChapter(
  chapters: ElogChapter[],
  slug: string[]
): ElogChapter | null {
  let tempChapter = null;
  // 从一级开始找子目录，遍历
  for (const chapter of chapters) {
    // console.log(chapter.nav_path, chapter.is_nav)
    if (chapter.nav_path === slug[0]) {
      // 匹配顶级目录
      if (chapter.level === 0 && chapter.is_nav) {
        // 兜底一级目录，且is_nav为true
        tempChapter = chapter;
      }

      // 深入子章节
      const childChapter = findChapter(chapter.children, slug.slice(1));
      if (childChapter && childChapter.is_nav) {
        // 如果子章节存在且is_nav为true
        tempChapter = childChapter;
      }
    }
  }
  // 如果没有找到匹配的章节，返回null
  return tempChapter;
}

function findChapterV2(
  chapters: ElogChapter[],
  slug: string[]
): ElogChapter | null {
  let tempChapter = null;
  // 先根据slug找到chapter,拼接slug
  const chapterDocNav = ContentPrefixPath + "/" + slug.join("/");
  mylog("chapterDocNav slug", chapterDocNav);

  // 遍历ElogChapter，寻找匹配
  for (const chapter of chapters) {
    // mylog("chapterDocNav", chapter.url);
    if (chapter.url === chapterDocNav) {
      tempChapter = chapter;
      //   mylog("findChapterV2", chapter);
      break;
    }
  }

  // 根据elogChapter的parent，找到最上层的parent
  while (tempChapter && tempChapter.parent) {
    // mylog("tempChapter", tempChapter);
    tempChapter = tempChapter.parent;
  }

  // 如果没有找到匹配的章节，返回null
  return tempChapter;
}

function findPost(slug: string[], curChapter: ElogChapter | null) {
  // 取slug的最后
  const articleDocId = slug[slug.length - 1];

  // 从子目录种遍历寻找
  let article = allPosts.find((doc) => {
    if (doc.urlname === articleDocId) {
      mylog("findpost by urlname ");
      return true;
    }
  });

  // 从子目录种遍历寻找
  if (!article) {
    article = allPosts.find((doc) => {
      if (doc.nav_path === articleDocId) {
        mylog("findpost by nav_path ");
        return true;
      }
    });
  }

  return article;
}

type Props = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  //   const curChapter = findChapter(ChapterTree, params.slug);
  const curChapter = findChapterV2(ChapterList, params.slug);
  const curArticle = findPost(params.slug, curChapter);

  // 如果实在是找不到
  if (!curArticle) {
    return;
  }
  const authorList = curArticle?.authors || ["default"];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    return coreContent(authorResults as Author);
  });

  const publishedAt = new Date(curArticle.date).toISOString();
  const modifiedAt = new Date(
    curArticle.updated || curArticle.date
  ).toISOString();
  const authors = authorDetails.map((author) => author.name);
  //   let imageList = [siteMetadata.socialBanner]
  //   if (post.images) {
  //     imageList = typeof post.images === 'string' ? [post.images] : post.images
  //   }
  //   const ogImages = imageList.map((img) => {
  //     return {
  //       url: img.includes('http') ? img : siteMetadata.siteUrl + img,
  //     }
  //   })
  const description = IsEmptyString(curArticle.description ?? "")
    ? siteMetadata.description
    : truncateSummary(curArticle.description, 200);

  return {
    manifest: "/favicons/site.webmanifest",
    title: curArticle.title,
    description: RemoveYamlFrontMatterForDesc(description),
    openGraph: {
      title: curArticle.title,
      description: description,
      siteName: siteMetadata.title,
      locale: "zh_CN",
      type: "article",
      publishedTime: modifiedAt, // 发现很多只看publish
      modifiedTime: modifiedAt,
      url: "./",
      //   images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    applicationName: "OfferNow",
    generator: "Nextjs",
    authors: {
      url: "https://github.com/white0dew",
      name: "青玉白露",
    },
    keywords: curArticle.keywords ? curArticle.keywords : curArticle.tags,
    twitter: {
      card: "summary_large_image",
      title: curArticle.title,
      description: description,
    },
  };
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string[] };
}) {
  const curChapter = findChapterV2(ChapterList, params.slug);
  const curArticle = findPost(params.slug, curChapter);
  // 如果实在是找不到
  if (!curArticle && !curChapter) {
    return notFound();
  }
  return (
    <div
      className="relative mx-auto max-w-screen-xl justify-center space-x-3 px-4 py-2 
        md:flex md:flex-row md:py-2 lg:space-x-16"
    >
      <div
        className="sticky top-[90px] hidden h-[calc(100vh-20vh)] w-[284px] 
            md:flex md:shrink-0 md:flex-col md:justify-between
            overflow-y-auto scrollbar-thin"
      >
        <SidebarChapter chapters={curChapter?.children ?? []} />
      </div>

      {curArticle && !IsEmptyString(curArticle?.body.raw) ? (
        <ArticleContent article={curArticle} />
      ) : (
        <EmptyArticle />
      )}

      {curArticle && <ArticleRightSider />}
    </div>
  );
}
