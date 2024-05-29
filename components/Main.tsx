"use client"

import Link from '@/components/Link';
import Tag from '@/components/Tag';
import siteMetadata from '@/assets/siteMetadata';
import { formatDate, truncateSummary } from '@/lib/utils';
import { Post } from 'contentlayer/generated';
import { FaRegCommentDots, FaStreetView } from 'react-icons/fa6';
import { useEffect } from 'react';
import Artalk from 'artalk';

type Props = {
  posts: Post[]
}

const MAX_DISPLAY = 6;

export default function Home({ posts }: Props) {
  useEffect(
    () => {
      Artalk.loadCountWidget({
        server: 'https://artalk.aistar.cool',
        site: 'AirBlog',
        pvEl: '#ArtalkPV',
        countEl: '#ArtalkCount',
      });
    }, []
  )

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            最新文章
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, urlname, title, description, tags } = post;
            return (
              <li key={slug} className="py-4">
                <article>
                  <div className="space-y-1 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/posts/${urlname}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap py-1">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {truncateSummary(description)}
                        </div>
                      </div>
                      <div className="flex flex-row items-center  text-base font-medium leading-6">
                        <Link
                          href={`/posts/${urlname}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          查看更多 &rarr;
                        </Link>
                        <FaStreetView className="mr-1.5 ml-3.5" />
                        <text >阅读:<span id="ArtalkPV"
                          data-page-key={`/posts/${urlname}`}
                          className="ml-1">..</span></text>

                        <FaRegCommentDots className="mr-1.5 ml-3.5" />
                        <text >评论:<span id="ArtalkCount"
                          data-page-key={`/posts/${urlname}`}
                          className="ml-1">..</span></text>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/posts"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            全部文章 &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
