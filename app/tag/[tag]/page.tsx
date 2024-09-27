import { slug } from "github-slugger";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer";
import siteMetadata from "@/assets/siteMetadata";
import ListLayout from "@/app/tag/_component/ListLayoutWithTags";
import { allPosts } from "contentlayer/generated";
import tagData from "@/public/tag-data.json";
import { genPageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const tag = decodeURI(params.tag);
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: "./",
      types: {
        "application/rss+xml": `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  });
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }));
  return paths;
};

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag);
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(" ").join("-").slice(1);
  // @ts-ignore
  const filteredPosts = allCoreContent(
    // @ts-ignore
    sortPosts(
      // @ts-ignore
      allPosts.filter(
        (post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)
      )
    )
  );
  if (filteredPosts.length === 0) {
    return notFound();
  }
  // @ts-ignore
  return <ListLayout posts={filteredPosts} title={title} />;
}
