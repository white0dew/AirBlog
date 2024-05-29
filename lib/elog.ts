import { CatalogItem, Doc, ElogCache, ElogChapter } from "@/types/elog";
import elogCache from "../elog.cache.json" assert { type: "json" };
import { ContentPrefixPath } from "../constants/path";

const ElogCacheData = elogCache as ElogCache;

// 映射,doc和catelog
const DocIDMap = new Map<string, Doc>();
ElogCacheData.docs.forEach((doc) => {
  DocIDMap.set(doc.doc_id, doc);
});

// 构建章节目录树的函数
function buildChapterTree(
  catalog: CatalogItem[],
  parentUuid: string | null = null
): ElogChapter[] {
  // 首先，创建一个映射，以便于通过 uuid 查找目录项
  const itemMap = new Map<string, ElogChapter>();
  catalog.forEach((item) => {
    itemMap.set(item.uuid, {
      doc_id: item.doc_id.toString(), // 其实就是URLName
      uuid: item.uuid,
      children: [],
      title: item.title,
      url: DocIDMap.get(item.url)?.properties?.nav_path ?? item.url,
      level: item.level,
      nav_path: DocIDMap.get(item.url)?.properties?.nav_path ?? item.url,
      is_nav: DocIDMap.get(item.url)?.properties?.is_nav ?? false,
      parent_uuid: item.parent_uuid ? item.parent_uuid : undefined,
      parent: null,
      urlname: item.url,
    });
  });

  // 其次，构建树状结构
  const tree: ElogChapter[] = [];

  // 遍历
  catalog.forEach((item) => {
    const currentChapter = itemMap.get(item.uuid);
    if (!currentChapter) {
      return;
    }

    // 有父节点，那么它是一个子节点
    if (item.parent_uuid) {
      const parentChapter = itemMap.get(item.parent_uuid);
      parentChapter?.children.push(currentChapter);
    } else {
      // 顶级章节没有 parent_uuid
      tree.push(currentChapter);
    }
  });

  // 一个方法从父到子，对所有的节点的url进行拼接，即父节点的nav_path + 自己的nav_path 等于最终的url
  function genFinalUrl(curTree: ElogChapter[]) {
    curTree.forEach((item) => {
      if (item.parent_uuid && itemMap.get(item.parent_uuid)) {
        item.url = itemMap.get(item.parent_uuid)?.url + "/" + item.url;
      } else {
        item.url = ContentPrefixPath + "/" + item.url;
      }
      if (item.children.length > 0) {
        genFinalUrl(item.children);
      }
    });
  }
  // 从父到子，对所有的节点的url进行拼接
  genFinalUrl(tree);
  console.log("buildChapterTree success");

  // 填充父节点
  tree.forEach((item) => {
    if (item.parent_uuid && itemMap.get(item.parent_uuid)) {
      item.parent = itemMap.get(item.parent_uuid) ?? null;
    }
  });

  return tree;
}

// 使用上述函数构建整个章节目录树
const ChapterTree = buildChapterTree(ElogCacheData.catalog, null);

export { ChapterTree, ElogCacheData, DocIDMap };
