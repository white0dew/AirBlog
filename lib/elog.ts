import { CatalogItem, Doc, ElogCache, ElogChapter } from "@/types/elog";
import elogCache from "../elog.cache.json" assert { type: "json" };
import { ContentPrefixPath } from "../constants/path";
import { mylog } from "./utils";

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
    // 如果not_show为ture直接跳过
    if (DocIDMap.get(item.url)?.properties?.not_show) {
      return;
    }
    itemMap.set(item.uuid, {
      not_show: DocIDMap.get(item.url)?.properties?.not_show,
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
      skip_nav: DocIDMap.get(item.url)?.properties?.skip_nav ?? false,
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
      currentChapter.parent = parentChapter ?? null;
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
        let oldUrl = item.url;
        item.url = itemMap.get(item.parent_uuid)?.url + "/" + item.url;

        // 跳过父节点的路径
        if (itemMap.get(item.parent_uuid)?.skip_nav) {
          mylog("skip_nav", item.url, item.parent_uuid, item.parent?.url);
          let parentPath = itemMap.get(item.parent_uuid)?.url;
          mylog("parentPath", parentPath);
          parentPath = parentPath?.replace(
            "/" + itemMap.get(item.parent_uuid)?.nav_path,
            ""
          );
          mylog("parentPath", parentPath);
          item.url = parentPath + "/" + oldUrl;
        }
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

  return tree;
}

// 使用上述函数构建整个章节目录树
const ChapterTree = buildChapterTree(ElogCacheData.catalog, null);

function flattenTree(node: ElogChapter): ElogChapter[] {
  // 检查节点是否具有children属性
  if (node.children && node.children.length > 0) {
    // 如果有children，递归调用flattenTree函数，并将当前节点与其子节点的展开结果合并
    return [node, ...node.children.flatMap(flattenTree)];
  } else {
    // 如果没有children，只返回当前节点
    return [node];
  }
}

// 假设ChapterTree是一个具有嵌套children属性的树状结构
export const ChapterList = ChapterTree.flatMap(flattenTree);

// 定义一个方法，用于传入uuid，找到对应path
function GetPathByUuid(uuid: string): string {
  function findPath(node: ElogChapter): string | null {
    // mylog("findPath", node.urlname, uuid);
    if (node.urlname === uuid) {
      return node.url;
    }
    for (const child of node.children) {
      const result = findPath(child);
      if (result) {
        return result;
      }
    }
    return null;
  }

  for (const chapter of ChapterTree) {
    const path = findPath(chapter);
    if (path) {
      return path;
    }
  }

  return "";
}

console.log("buildChapterTree success");
export { ChapterTree, ElogCacheData, DocIDMap, GetPathByUuid };
