import { Author, Post } from "@/.contentlayer/generated/types";
import PageTitle from "@/components/PageTitle";
import ProgressBar from "@/components/ProgressBar"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"
import { mylog } from "@/lib/utils";
import { coreContent, CoreContent } from "pliny/utils/contentlayer";
import { ReactNode } from "react";
import { FaRegCalendarAlt, FaRegClock, FaRegCommentDots, FaStreetView } from "react-icons/fa";
import Image from '@/components/Image';
import Link from "@/components/Link";
import { allAuthors } from "@/.contentlayer/generated";

const postDateTemplate: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

interface LayoutProps {
    curArticle: Post
    content?: CoreContent<Post>
    next?: { path: string; title: string, url: string }
    prev?: { path: string; title: string, url: string }
    children: ReactNode
}

export default function ArticlePostLayout({ curArticle, content, next, prev, children }: LayoutProps) {
    const authorList = curArticle?.authors || ['default'];

    const authorDetails = authorList.map((author) => {
        const authorResults = allAuthors.find((p) => p.en_name === author)
        return coreContent(authorResults as Author)
    });
    mylog("authorDetails", JSON.stringify(allAuthors))
    const { urlname, date, title, tags, readingTime } = curArticle;

    return (
        <div className="w-full py-1 flex flex-col justify-center scroll-smooth ">
            <ProgressBar />
            <ScrollTopAndComment />
            <article className="divide-y divide-gray-200 dark:divide-gray-700 max-w-none">
                <header className="pt-6 pb-6">
                    <div className="space-y-1 text-center">
                        <div className="mb-4">
                            <PageTitle>{title}</PageTitle>
                        </div>
                        <dl className="space-y-10">
                            <div>
                                <dt className="sr-only">Published on</dt>
                                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                    <time dateTime={date} className="inline-flex items-center">
                                        <FaRegCalendarAlt className="mr-1.5" />
                                        {new Date(date).toLocaleDateString('zh-CN', postDateTemplate)}
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
                                        <text >阅读:<span id="" className="ml-1 artalk-pv-count" >..</span></text>

                                        <FaRegCommentDots className="mr-1.5 ml-1.5" />
                                        <text >评论:<span id="" className="ml-1 artalk-comment-count">..</span></text>
                                    </span>
                                </dd>

                            </div>
                        </dl>
                        <dl className="pt-6 xl:pt-4">
                            <dt className="sr-only">作者</dt>
                            <dd>
                                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                                    {authorDetails.map((author) => (
                                        <li className="flex items-center justify-center space-x-2" key={author.name}>
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
                                                <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                                                <dt className="sr-only">Github</dt>
                                                <dd>
                                                    {author.github && (
                                                        <Link
                                                            href={author.github}
                                                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                                        >
                                                            {author.github.replace('https://github.com/', '@')}
                                                        </Link>
                                                    )}
                                                </dd>
                                            </dl>
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </dl>
                    </div>
                    {/* 作者 */}

                </header>
                {children}
            </article>
        </div>
    )
}