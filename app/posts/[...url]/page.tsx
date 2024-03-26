import '@/assets/css/prism.css';
import '@/assets/css/toc.css';
import 'katex/dist/katex.css';

import PageTitle from '@/components/PageTitle';
import PostLayout from '@/layouts/PostLayout';
import { MDXLayoutRenderer } from '@/components/MDXLayoutRenderer';
import { allAuthors, allPosts, Author, Post } from 'contentlayer/generated';
import { sortPosts } from '@/lib/utils';
import { allCoreContent, coreContent } from 'pliny/utils/contentlayer';
import { Metadata } from 'next';
import siteMetadata from '@/assets/siteMetadata';
import { components } from '@/components/MDXComponents';
import Toc from '@/components/Toc';

type Props = {
  params: {
    url: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata | undefined> {
  const url = decodeURI(params.url);
  const post = allPosts.find((post) => post.url === url);
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Author)
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'zh_CN',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    applicationName: "AirBlog",
    generator: "Nextjs",
    authors: {
      url: "https://github.com/white0dew",
      name: "青玉白露"
    },
    keywords: post.tags,
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export async function generateStaticParams() {
  const paths = allPosts.map((post) => ({
    slug: post.slug.split('/')
  }));
  return paths;
}

export default function Page({ params }: Props) {
  const url = decodeURI(params.url);
  const sortedPosts = allCoreContent(sortPosts(allPosts));
  const postIndex = sortedPosts.findIndex((post) => post.url === url);
  // 未找到该文章
  if (postIndex === -1) {
    return (
      <div className="mt-24 text-center">
        <PageTitle>
          Under Construction{' '}
          <span role="img" aria-label="roadwork sign">
            🚧
          </span>
        </PageTitle>
      </div>
    );
  }

  const prev = sortedPosts[postIndex + 1];
  const next = sortedPosts[postIndex - 1];
  const post = allPosts.find((post) => post.url === url) as Post;

  const authorList = post?.authors || ['default'];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Author)
  });
  const mainContent = coreContent(post);
  const jsonLd = post.structuredData;
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    };
  });

  return (
    <div className='flex flex-row '>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostLayout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} />
      </PostLayout>
      <aside>
        <div className="hidden xl:block w-64 sticky top-72 pt-10 bg-blue-100 rounded-lg py-20 pl-4 ">
          <Toc />
        </div>
      </aside>
    </div>
  );
}
