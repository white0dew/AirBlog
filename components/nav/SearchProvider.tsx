"use client";

import { KBarSearchProvider } from "pliny/search/KBar";
import { useRouter } from "next/navigation";
import { CoreContent } from "pliny/utils/contentlayer";
import { Post } from "contentlayer/generated";
import { ElogCacheData, GetPathByUuid } from "@/lib/elog";
import { mylog } from "@/lib/utils";

// @ts-ignore
export const SearchProvider = ({ children }) => {
  const router = useRouter();
  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: "search.json",
        defaultActions: [
          //   {
          //     id: "homepage",
          //     name: "Homepage",
          //     keywords: "",
          //     shortcut: ["h", "h"],
          //     section: "Home",
          //     perform: () => router.push("/"),
          //   },
          //   {
          //     id: "projects",
          //     name: "Projects",
          //     keywords: "",
          //     shortcut: ["p"],
          //     section: "Home",
          //     perform: () => router.push("/projects"),
          //   },
        ],
        onSearchDocumentsLoad(json) {
          // json 先过滤一遍，必须elogcachedata能够找到
          mylog("json b", json.length);
          json = json.filter((post: CoreContent<Post>) => {
            return ElogCacheData.docs.find(
              (item) => item.doc_id === post.urlname
            );
          });

          mylog("json", json.length);

          return json.map((post: CoreContent<Post>) => ({
            id: post.path,
            name: post.title,
            keywords: post?.description || "",
            section: "学校资料",
            subtitle: post.tags.join(", "),
            perform: () => {
              mylog("post", post.urlname);
              mylog("path", GetPathByUuid(post.urlname));
              router.push(GetPathByUuid(post.urlname));
            },
          }));
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  );
};
