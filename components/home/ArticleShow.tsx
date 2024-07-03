// ArticleShow

import React, { useEffect, useState } from "react";
import ArticlesContainer from "@/components/article/ArticleContainer";
import { GetPages } from "@/action/get_pages";
import { PageType } from "@/constants/common_enum";

function transformDataToArticleProps(data: any) {
  const icons = ["🚀", "🌟", "💡", "📚", "🔍", "🎉", "✨", "🖋️", "🔥", "🎨"];
  // 假设今天的日期决定了图标的起始索引
  const startIndex = new Date().getDate() % icons.length;

  return data.map((item: any, index: number) => {
    return {
      id: item.id,
      title: item.title,
      // 如果您的数据真的有 summary 字段，请使用那个字段
      summary: item.site_name,
      icon: icons[(startIndex + index) % icons.length],
      link: item.url,
      pv: item.pv,
      date: item.date,
    };
  });
}

async function ArticlesShow() {
  const articleNews = await GetPages(PageType.MostNew);
  // 转换模型
  const articles = transformDataToArticleProps(articleNews);

  const articlePVs = await GetPages(PageType.MostPV);
  // 转换模型
  const articlePv = transformDataToArticleProps(articlePVs);

  return (
    <div className="container mx-auto mt-10">
      <div className="">
        <ArticlesContainer
          articles={articlePv}
          title="热点文章"
          subTitle="看看现在大家都喜欢看什么~"
        />
      </div>
      <div className=" ">
        <ArticlesContainer
          articles={articles}
          title="最新文章"
          subTitle="紧跟潮流，力争上游！"
        />
      </div>
      {/* 可以添加更多 ArticlesContainer 组件以展示不同类别的文章 */}
    </div>
  );
}

export default ArticlesShow;
