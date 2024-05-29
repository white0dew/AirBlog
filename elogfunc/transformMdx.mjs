import * as fs from 'fs'
import * as path from 'path'
const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)
const inputFolderPath = path.join(__dirname, '../../src/app/articles')
const outputFolderPath = path.join(__dirname, '../../src/app/articles')

// 读取文件夹中的所有文件
fs.readdir(inputFolderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err)
    return
  }

  // 遍历每个文件
  files.forEach(async (file) => {
    if (!/\.md$/.test(file)) {
      return console.log(`${file}不是md格式`)
    }
    const inputFilePath = path.join(inputFolderPath, file)
    const outputFilePath = path.join(
      outputFolderPath,
      file.replace(/\.md$/, ''),
    )
    console.log(inputFilePath)
    const isDir = await fs.promises.stat(inputFilePath).then((stats) => {
      return Promise.resolve(stats.isDirectory())
    })

    if (isDir) {
      console.log(`检测${inputFilePath}:是目录`)
      return
    }
    // // 读取 Markdown 文件
    let markdownContent = fs.readFileSync(inputFilePath, 'utf-8')
    // 同步创建文件夹
    fs.mkdirSync(outputFilePath, { recursive: true })
    // 将转换结果写入  文件
    fs.writeFileSync(
      path.join(outputFilePath, 'page.mdx'),
      markdownContent,
      'utf-8',
    )
    fs.unlinkSync(inputFilePath)

    console.log(`创建文件成功，outputFilePath：${outputFilePath}`)
  })
})
