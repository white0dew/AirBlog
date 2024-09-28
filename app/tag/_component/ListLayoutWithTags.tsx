"use client";

import { usePathname } from "next/navigation";
import { slug } from "github-slugger";
import { formatDate } from "pliny/utils/formatDate";
import { CoreContent } from "pliny/utils/contentlayer";
import type { Post } from "contentlayer/generated";
import Link from "@/components/Link";
import Tag from "@/components/Tag";
import siteMetadata from "@/assets/siteMetadata";
import { truncateSummary } from "@/lib/utils";
import { FaRegCommentDots, FaStreetView } from "react-icons/fa6";
import React from "react";
import tagData from "@/public/tag-data.json";
import { GetPathByUuid } from "@/lib/elog";
interface PaginationProps {
  totalPages: number;
  currentPage: number;
}
interface ListLayoutProps {
  posts: CoreContent<Post>[];
  title: string;
  initialDisplayPosts?: CoreContent<Post>[];
  pagination?: PaginationProps;
}

// 读取map
function getUrlByUrlname(urlname: string) {
  return `/s/${urlname}`;
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const basePath = pathname.split("/")[1];
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            上一页
          </button>
        )}
        {prevPage && (
          <Link
            href={
              currentPage - 1 === 1
                ? `/${basePath}/`
                : `/${basePath}/page/${currentPage - 1}`
            }
            rel="prev"
          >
            上一页
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            下一页
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            下一页
          </Link>
        )}
      </nav>
    </div>
  );
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  // useEffect(() => {
  //   Artalk.loadCountWidget({
  //     server: "https://artalk.aistar.cool",
  //     site: "AirBlog",
  //     pvEl: "#ArtalkPV",
  //     countEl: "#ArtalkCount",
  //   });
  // }, []);

  const pathname = usePathname();
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  const displayPosts =
    initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="pb-6 pt-2">
        <h1
          className=" text-2xl font-extrabold leading-9 
        tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 uppercase"
        >
          筛选标签:{title}
        </h1>
      </div>

      <div className="flex sm:space-x-10 mx-2 lg:mx-24 w-full justify-center">
        <div
          className="hidden max-h-screen h-full sm:flex flex-wrap
         bg-gray-50 dark:bg-gray-900/70 shadow-md pt-5 dark:shadow-gray-800/40 rounded min-w-[280px] max-w-[280px] overflow-auto"
        >
          <div className="py-4 px-6">
            <h3 className="text-primary-500 font-bold uppercase text-2xl">
              全部文章
            </h3>
            <ul>
              {sortedTags.map((t) => {
                return (
                  // 打印

                  <li key={t} className="my-3">
                    {pathname.split("/tag/")[1] ===
                    encodeURIComponent(slug(t)) ? (
                      <h3 className="text-md  inline py-2 px-3 uppercase lg:text-xl font-bold text-blue-600">
                        {`${t} (${tagCounts[t]})`}
                      </h3>
                    ) : (
                      <Link
                        href={`/tag/${slug(t)}`}
                        className="py-2 px-3 uppercase text-md lg:text-xl  font-medium text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500"
                        aria-label={`View posts tagged ${t}`}
                      >
                        {`${t} (${tagCounts[t]})`}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-2/4">
          <ul className="flex flex-row">
            {displayPosts.map((post) => {
              const { path, date, urlname, title, description, tags } = post;
              return (
                <li key={path} className="py-5 w-1/3 max-h-48 min-h-48">
                  <article className="space-y-2 flex flex-col xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            href={`${GetPathByUuid(urlname)}`}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-3">
                        {truncateSummary(description)}
                      </div>
                      <div className="flex text-sm flex-row items-center">
                        <FaStreetView className="mr-1.5 ml-3.5" />
                        <text>
                          阅读:
                          <span
                            data-page-key={`${GetPathByUuid(urlname)}`}
                            className="ml-1 artalk-pv-count"
                          >
                            ..
                          </span>
                        </text>

                        <FaRegCommentDots className="mr-1.5 ml-3.5" />
                        <text>
                          评论:
                          <span
                            data-page-key={`${GetPathByUuid(urlname)}`}
                            className="ml-1 artalk-comment-count"
                          >
                            ..
                          </span>
                        </text>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
}
