import { allAuthors, Author } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';
import { MDXLayoutRenderer } from '@/components/MDXLayoutRenderer';
import AuthorLayout from '@/layouts/AuthorLayout';
import { genPageMetadata } from '@/lib/seo';

export const metadata = genPageMetadata({ title: '关于' })

export default function About() {
  const author = allAuthors.find((p) => p.slug === 'authors/default') as Author;
  const mainContent = coreContent(author)


  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  );
}

