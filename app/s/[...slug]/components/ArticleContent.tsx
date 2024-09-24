"use client";
import React, { useEffect, useRef, useState } from "react";
import ArticlePostLayout from "./ArticleLayout";
import MDViewer from "@/components/markdown/MarkdownView";
import Comment from "@/components/Comment";
import { Post } from "@/.contentlayer/generated/types";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArticleSlideLinks } from "./ArticleSlide";
interface ArticleContentProps {
  article: Post;
}
export function ArticleContent({ article }: ArticleContentProps) {
  const itemRef = useRef<HTMLDivElement>(null); // 新增：用于引用目录项的DOM元素
  const router = useRouter();
  // 当前搜索参数
  const searchParams = useSearchParams();
  // 搜索参数是否编辑
  const isEditing = searchParams.get("edit") === "1";
  const path = usePathname();
  // 新增：useEffect钩子，监听path的变化
  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: "auto", // 平滑滚动
        block: "start", // 在视图中心
      });

      // 防止window undefined

      if (window) {
        window.scrollBy(0, -50);
      }
    }
  }, [path]);
  return (
    <div
      className=" w-max lg:min-w-2xl lg:max-w-2xl py-10 min-h-screen 
              md:flex-1 px-1 md:px-6  dark:bg-slate-800 2xl:max-w-3xl xl:min-w-3xl "
      ref={itemRef} // 新增：设置ref
    >
      {isEditing && (
        <div className=" w-full flex justify-end">
          <button
            className=" self-center items-center bg-green-400 siz"
            onClick={() => {
              // 去掉末尾两个.md
              router.push(
                `https://www.yuque.com/qingyubailou/gygiq6/${article.urlname}`,
                {
                  scroll: false,
                }
              );
            }}
          >
            编辑原文
          </button>
        </div>
      )}
      <ArticlePostLayout curArticle={article}>
        <div
          className="js-toc-content prose
              line-break break-words
              prose-blue dark:prose-invert min-h-screen w-max"
        >
          <MDViewer source={article.body.raw} />
        </div>
      </ArticlePostLayout>
      <div className="w-full px-5 mt-5">
        <ArticleSlideLinks path={path} />
      </div>
      <div id="comment" className="p-4 text-start text-gray-800 mt-5 w-full">
        <Comment />
      </div>
    </div>
  );
}
