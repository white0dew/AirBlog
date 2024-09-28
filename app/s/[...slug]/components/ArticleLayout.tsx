import { Author, Post } from "contentlayer/generated";
import PageTitle from "@/components/PageTitle";
import ProgressBar from "@/components/ProgressBar";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import { mylog } from "@/lib/utils";
import { coreContent, CoreContent } from "pliny/utils/contentlayer";
import { ReactNode } from "react";
import {
  FaRegCalendarAlt,
  FaRegClock,
  FaRegCommentDots,
  FaStreetView,
} from "react-icons/fa";
import Image from "@/components/Image";
import Link from "@/components/Link";
import { allAuthors } from "contentlayer/generated";
import { Badge } from "@/components/ui/badge";
import { badgeVariants } from "@/components/ui/badge";

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

interface LayoutProps {
  curArticle: Post;
  content?: CoreContent<Post>;
  next?: { path: string; title: string; url: string };
  prev?: { path: string; title: string; url: string };
  children: ReactNode;
}

export default function ArticlePostLayout({
  curArticle,
  content,
  next,
  prev,
  children,
}: LayoutProps) {
  const authorList = curArticle?.authors || ["default"];

  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.en_name === author);
    return coreContent(authorResults as Author);
  });

  const { urlname, date, title, tags, readingTime, updated } = curArticle;

  return (
    <div className="w-auto mx-10 py-1 flex flex-col justify-center scroll-smooth ">
      <ProgressBar />
      <ScrollTopAndComment />
      <article className=" divide-gray-200 dark:divide-gray-700 max-w-none">
        <div className="flex flex-col space-y-1 text-center mb-2">
          <div className="mb-4 max-w-full">
            <PageTitle>{title}</PageTitle>
          </div>
          <div className="flex flex-row justify-center space-x-2 ">
            {tags &&
              tags.length > 0 &&
              tags.map((tag) => {
                return (
                  <Badge className="bg-red-300 px-2  hover:bg-red-500 text-sm">
                    <Link href={`/tag/${tag}`} className="text-md p-1">
                      {tag}
                    </Link>
                  </Badge>
                );
              })}
          </div>

          <div className="flex space-x-4 flex-row justify-center items-center">
            <dl className="">
              <dt className="sr-only">作者</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li
                      className="flex items-center justify-center space-x-2"
                      key={author.name}
                    >
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          {/* {author.name} */}
                          {author.name && (
                            <Link
                              href={`https://www.yuque.com/qingyubailou/gygiq6/${curArticle.urlname}`}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.name}
                            </Link>
                          )}
                        </dd>
                        <dt className="sr-only">Github</dt>
                        <dd>
                          {author.github && (
                            <Link
                              href={author.github}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.github.replace(
                                "https://github.com/",
                                "@"
                              )}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>

            <div>
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Modified on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time
                      dateTime={updated ?? date}
                      className="inline-flex items-center"
                    >
                      <FaRegCalendarAlt className="mr-1.5" />
                      {new Date(updated ?? date).toLocaleDateString(
                        "zh-CN",
                        postDateTemplate
                      )}
                    </time>
                  </dd>
                </div>
              </dl>

              <dl className="space-y-20">
                <div>
                  <dt className="sr-only">Reading time</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center">
                      <FaRegClock className="mr-1.5" />
                      {readingTime.text}

                      <FaStreetView className="mr-1.5 ml-1.5" />
                      <text>
                        阅读:
                        <span id="" className="ml-1 artalk-pv-count">
                          ..
                        </span>
                      </text>

                      <FaRegCommentDots className="mr-1.5 ml-1.5" />
                      <text>
                        评论:
                        <span id="" className="ml-1 artalk-comment-count">
                          ..
                        </span>
                      </text>
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {children}
      </article>
    </div>
  );
}
