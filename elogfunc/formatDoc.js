const getTemplate = ({ date, title, description, defaultBody }) => {
  const body = `
import { ArticleLayout } from '@/components/ArticleLayout';

export const article = {
    author: 'delong',
    date: "${date}",
    title: "${title}",
    description: "${description}",
  };
  
export const metadata = {
    title: article.title,
    description: article.description,
};
  
export default (props) => <ArticleLayout article={article} {...props} />;

${defaultBody.replace(/\[(description)\]\((?<content>.*?)\)/, '')}
  `
  return body
}

// 生成description 默认yuque 没有description 自己添加一个格式作为description,eg: [description](我是描述)
const generateDesc = (text) => {
  const reg = /\[(description)\]\((?<content>.*?)\)/
  return text.match(reg)?.groups?.content ?? ''
}

const formatDoc = async (doc) => {
  if (!doc.body) return
  const description = generateDesc(doc.body)
  const title = doc.properties.title
  const date = doc.properties.date
  doc.body = getTemplate({
    description,
    title,
    date,
    defaultBody: doc.body,
  })
  return doc
}

module.exports = {
  format: formatDoc,
}
