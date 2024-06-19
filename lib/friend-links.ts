const fs = require("fs");
//   function extractWebsiteInfoFromMarkdown(markdown: string): WebsiteInfo[] {
//     // 移除YAML头部
//     const contentWithoutYaml = markdown.replace(/---[\s\S]?---/, '');
//     console.log("contentWithoutYaml",contentWithoutYaml)
//     // 定义正则表达式来匹配所需信息
//     const regex = /> 网站名称:(.?)\n> 网站介绍:(.?)\n> 网站地址:(.?)\n> 网站头图:(.*?)(?=\n|$)/g;

//     // 存储所有匹配的信息
//     const websitesInfo: WebsiteInfo[] = [];
//     let match;

//     // 使用循环来找到所有匹配项
//     while ((match = regex.exec(contentWithoutYaml))) {
//       const [_, name, description, url, imageUrl] = match;
//       websitesInfo.push({
//         name: name.trim(),
//         description: description.trim(),
//         url: url.trim(),
//         imageUrl: imageUrl.trim(),
//       });
//     }

//     // 返回提取的网站信息
//     return websitesInfo;
//   }

interface WebsiteInfo {
  name: string;
  description: string;
  url: string;
  imageUrl: string;
}

function extractInfoFromMarkdownTable(markdownTable: string): WebsiteInfo[] {
  // 分割字符串为行
  const lines = markdownTable.split("\n").filter((line) => line.trim() !== "");

  // 假设第一行是标题，从第三行开始是数据（第二行是分隔符）
  const dataLines = lines.slice(2);

  // 提取信息
  const websites: WebsiteInfo[] = dataLines.map((line) => {
    // 移除行首尾的 "|" 字符，然后按 "|" 分割每列
    const columns = line
      .slice(1, -1)
      .split("|")
      .map((col) => col.trim());

    // 根据列的位置提取数据
    return {
      name: columns[1],
      description: columns[2],
      url: columns[3],
      imageUrl: columns[4],
    };
  });

  return websites;
}

// 示例使用
const markdownTable = `
网站名称	网站介绍	网站地址	网站头图
OfferNow	让每个人了解计算机、编程、AI1111fasfasfafafsafasfafasfsfasfafsafaafas	https://www.offernow.cn	https://offernow.cn/img1.png
OfferNow2	让每个人了解计算机、编程、AI2	https://www.offernow.cn2	https://offernow.cn/img2.png
`;
const websitesInfo = extractInfoFromMarkdownTable(markdownTable);
console.log(websitesInfo);
// 将提取的信息保存为JSON文件
const saveInfoAsJson = (data: object[], filePath: string) => {
  const jsonData = JSON.stringify(data, null, 2); // 格式化JSON字符串，使其更易于阅读

  fs.writeFile(filePath, jsonData, "utf8", (err: any) => {
    if (err) {
      console.error("An error occurred while writing JSON Object to File.");
      return console.error(err);
    }
    console.log("JSON file has been saved.");
  });
};

// 调用函数，保存信息到websitesInfo.json文件
saveInfoAsJson(websitesInfo, "./public/websitesInfo.json");
