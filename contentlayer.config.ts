import { defineDocumentType, makeSource, ComputedFields } from 'contentlayer/source-files';
import siteMetadata from './assets/siteMetadata';
import rehypePrismPlus from 'rehype-prism-plus';
import { remarkCodeTitles, remarkExtractFrontmatter, remarkImgToJsx } from 'pliny/mdx-plugins/index.js';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePresetMinify from 'rehype-preset-minify';
import { Pluggable } from 'unified';
import rehypeKatex from 'rehype-katex';
import { countWords } from './lib/utils';
import GithubSlugger from "github-slugger"
const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => countWords(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  }
};

// Define the shape of the document's data with TypeScript interfaces
interface Heading {
  level: string;
  text: string;
  slug?: string;
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `content/posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    url: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`
      }),
    },
    // 文章目录构建，参考：https://yusuf.fyi/posts/contentlayer-table-of-contents
    headings: {
      type: 'json',
      resolve: async (doc) => {
        const regXHeader = /(?:^|\n)(?<flag>#{1,6})\s+(?<content>[^\n]+)(?:\n|$)/gm;
        const slugger = new GithubSlugger();
        // @ts-ignore
        const headings: Heading[] = Array.from(doc.body.raw.matchAll(regXHeader))
          .filter(({ groups }) => groups?.flag && groups.flag.length <= 2)
          .map(({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              level: flag?.length === 1 ? 'one' : 'two',
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            };
          });
        return headings;
      },
    },
  },
}))

export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: 'content/authors/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' }
  },
  computedFields
}))

export default makeSource({
  contentDirPath: '.',
  contentDirInclude: ['content'],
  documentTypes: [Post, Author],
  mdx: {
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypePrismPlus, {
        defaultLanguage: 'js', ignoreMissing: true, showLineNumbers: false, alias: {
          js: 'javascript',
          html: 'markup',
          svg: 'markup',
          xml: 'markup',
          py: 'python',
          css: 'css',
          ts: 'typescript',
          tsx: 'typescript',
          jsx: 'typescript',
          md: 'markdown',
          mdx: 'markdown',
          sh: 'bash',
          bash: 'bash',
          bat: 'bat',
          // 添加更多语言别名对应关系
        }
      }],
      rehypePresetMinify as Pluggable<any[]>
    ]
  }
})
