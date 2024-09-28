import React from "react";
import { slug } from "github-slugger";
import tagData from "@/app/tag-data.json";
import Link from "next/link";
import { Badge } from "../ui/badge";
// 基于nextjs 实现标签墙

export function TagsWall() {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            文章标签
          </h1>
          <p className=" text-center">(待补充)</p>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && "No tags found."}
          {sortedTags.map((t) => {
            return (
              <Badge
                key={t}
                className="mb-2 mr-5 mt-2 text-lg"
                variant="default"
              >
                <Link
                  href={`/tag/${slug(t)}`}
                  className="-ml-2 text-sm lg:text-lg font-semibold uppercase "
                  aria-label={`View posts tagged ${t}`}
                >
                  {` ${t}(${tagCounts[t]})`}
                </Link>
              </Badge>
            );
          })}
        </div>
      </div>
    </>
  );
}
