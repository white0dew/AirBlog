import { ReactNode } from 'react';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Post, Author } from 'contentlayer/generated';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import SectionContainer from '@/components/SectionContainer';
import Image from '@/components/Image';
import Tag from '@/components/Tag';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import ProgressBar from '@/components/ProgressBar';
import Comment from '@/components/Comment';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa6';
import { FaStreetView } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface LayoutProps {
  content: CoreContent<Post>
  authorDetails: CoreContent<Author>[]
  next?: { path: string; title: string, url: string }
  prev?: { path: string; title: string, url: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { path, date, title, tags, readingTime } = content;
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ProgressBar />
      <ScrollTopAndComment />
      <article>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 max-w-none">
          <header className="pt-6 pb-6">
            <div className="space-y-1 text-center">
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
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Reading time</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center">
                      <FaRegClock className="mr-1.5" />
                      {readingTime.text}

                      <FaStreetView className="mr-1.5 ml-1.5" />
                      <text >阅读:<span id="ArtalkPV" className="ml-1">..</span></text>

                      <FaRegCommentDots className="mr-1.5 ml-1.5" />
                      <text >评论:<span id="ArtalkCount" className="ml-1">..</span></text>
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
            {/* 作者 */}
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
          </header>

          <div id='post_content' className="max-w-none divide-y divide-gray-200 dark:divide-gray-700">
            <div className="flex justify-center mx-auto divide-y  space-x-2 divide-gray-200 dark:divide-gray-700  xl:pb-0">
              {/* 文章主体 */}
              <div className="js-toc-content  prose max-w-7xl pb-8 pt-10 dark:prose-invert">{children}</div>
            </div>

            <footer className="pb-6">
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700">
                {tags && (
                  <div className="py-4">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      标签
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          上一篇文章
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/posts/${prev.url}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          下一篇文章
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/posts/${next.url}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="全部文章"
                >
                  &larr; 全部文章
                </Link>
              </div>
            </footer>
            <div
              className="p-2 text-start text-gray-700 dark:text-gray-300"
              id="comment"
            >
              <Comment />
            </div>
          </div>


        </div>
      </article>
    </SectionContainer>
  );
}
