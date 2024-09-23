import React from "react";
import ArticleCard, { ArticleCardProps } from "./ArticleCard";

interface ArticlesContainerProps {
  articles: ArticleCardProps[];
  title: string;
  subTitle: string;
}

function ArticlesContainer({
  articles,
  title,
  subTitle,
}: ArticlesContainerProps) {
  return (
    <div className="py-8 ">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <h4 className="text-md font-semibold mb-4 text-center">{subTitle}</h4>
      {/* 使用grid布局，并通过gap-4设置网格项之间的间距 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles.map((article, idx) => (
          <ol
            key={idx}
            className="animate-fade-up animate-ease-in-out"
            style={{
              animationDelay: `${Number(idx + 1) * 200}ms`,
            }}
          >
            <ArticleCard key={article.id} {...article} />
          </ol>
        ))}
      </div>
    </div>
  );
}

export default ArticlesContainer;
