import React from "react";
import Comment from "@/components/Comment";

export default function EmptyArticle() {
  return (
    <div
      className="w-auto  py-1 flex flex-col justify-center scroll-smooth js-toc-content prose
        line-break break-words mx-auto
        prose-blue dark:prose-invert min-h-screen  "
    >
      <h1 className="text-4xl font-bold">该内容正在火速建设中……🚧🚧</h1>
      <p className="text-xl">可以先查看其他内容哦！抱歉啦~</p>

      <div id="comment" className="p-4 text-start text-gray-800 mt-10 w-full">
        <Comment />
      </div>
    </div>
  );
}
