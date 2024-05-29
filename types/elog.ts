export interface DocProperties {
  title: string;
  urlname: string;
  date: string;
  updated: string;
  author?: string;
  cover?: string;
  description?: string;
  is_nav?: boolean; // 是否是导航:一级和二级
  nav_path?: string; // 自定义导航路径
}

export interface Doc {
  id: number;
  doc_id: string;
  updated: number;
  properties: DocProperties;
  catalog: any[]; // 这里定义为 any[]，因为没有提供catalog的详细结构
  realName: string;
  relativePath: string;
  docPath: string;
}

export interface CatalogItem {
  uuid: string;
  type: string;
  title: string;
  url: string;
  slug?: string;
  id: number;
  doc_id: number;
  level: number;
  depth?: number;
  open_window: number;
  visible: number;
  prev_uuid: string;
  sibling_uuid: string;
  child_uuid: string;
  parent_uuid: string;
  _serializer?: string;
}

// 假设根对象代表整个Response
export interface ElogCache {
  docs: Doc[];
  catalog: CatalogItem[];
}

//  记录elog的层级
export interface ElogChapter {
  doc_id: string;
  uuid: string;
  title: string;
  url: string;
  urlname: string;
  parent_uuid?: string;

  level: number; // 新增 level 字段，表示目录层级
  is_nav: boolean; // 是否是导航,目前只支持二级导航
  nav_path: string; // 自定义导航路径
  children: ElogChapter[];
  parent: ElogChapter | null;
}
