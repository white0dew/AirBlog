import { slug } from 'github-slugger';
import { allPosts, type Post } from 'contentlayer/generated';

const isProduction = process.env.NODE_ENV === 'production';

export function getAllTags(allPosts: Post[]) {
  const tagCount: Record<string, number> = {};
  // allPosts.forEach((post) => {
  //   if (post.tags && (!isProduction || post !== true)) {
  //     post.tags.forEach((tag) => {
  //       const formattedTag = slug(tag);
  //       if (formattedTag in tagCount) {
  //         tagCount[formattedTag] += 1;
  //       } else {
  //         tagCount[formattedTag] = 1;
  //       }
  //     });
  //   }
  // });
  return tagCount;
}

const allTags = getAllTags(allPosts);

export default allTags;
