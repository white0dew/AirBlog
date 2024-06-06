const { matterMarkdownAdapter } = require("@elog/cli");

/**
 * 自定义文档插件
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * * @param {ImageClient} imageClient 图床下载器，可用于图片上传
 * @return {Promise<DocDetail>} 返回处理后的文档对象
 */
const format = (doc) => {
  if (doc.body) {
    // 将语雀灰色高亮块转成 VitePress 支持的 紫色高亮块
    doc.body = doc.body?.replaceAll(":::tips", ":::tip");
    // 将语雀绿色高亮块同样转成 VitePress 支持的 紫色高亮块
    doc.body = doc.body?.replaceAll(":::success", ":::tip");
  }
  // doc.body = doc.body?.replaceAll(":::", ":::info");
  doc.body = matterMarkdownAdapter(doc);
  return doc;
};

module.exports = {
  format,
};

// TODO 还需要一个文件,将ecah里不存在的文档删除,否则会剩下多余的数据




