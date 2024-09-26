"use client";
import React, { useEffect, useRef, useState } from "react";
import ArticlePostLayout from "./ArticleLayout";
import MDViewer from "@/components/markdown/MarkdownView";
import Comment from "@/components/Comment";
import { Post } from "@/.contentlayer/generated/types";
import { usePathname } from "next/navigation";
import { ArticleSlideLinks } from "./ArticleSlide";
import Script from "next/script";
interface ArticleContentProps {
  article: Post;
}
export function ArticleContent({ article }: ArticleContentProps) {
  const itemRef = useRef<HTMLDivElement>(null); // 新增：用于引用目录项的DOM元素
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
      <Script strategy="lazyOnload">
        {`
        if (typeof window.btw === 'undefined') {
         const btw = new BTWPlugin();
         btw.init({
          id: 'container',
          blogId: '26297-1727313472990-650',
          name: '二进制的耳语',
          qrcode: 'https://oss1.aistar.cool/typora/2024/09/5e2d11f2bcc566c356014b9e5da4a4ad.jpg',
          keyword: '解锁',
          btnText: '原创不易，完成人机检测，阅读全文',
          cookieAge: 2400,
          displayPercentage: 0.4,
      });
        }
   `}
      </Script>
      <ArticlePostLayout curArticle={article}>
        <div
          id="container"
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
