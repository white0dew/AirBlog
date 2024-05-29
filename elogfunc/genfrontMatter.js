const frontMatterData = {
  title: "Blogging with Elog",
  classify: "关于Elog",
  description: "描述",
  cover_img: "https://example.com/test.jpg",
  tags: ["Blog", "CI/CD"],
};

function generateYAMLFrontMatter(data) {
  let yamlFrontMatter = "---\n";
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      yamlFrontMatter += `${key}:\n`;
      data[key].forEach((item) => {
        yamlFrontMatter += `- ${item}\n`;
      });
    } else {
      yamlFrontMatter += `${key}: ${data[key]}\n`;
    }
  });
  yamlFrontMatter += "---\n";
  return yamlFrontMatter;
}

const markdownContent = `This is your markdown content.`;

// Assuming `frontMatterData` is your data object
const fullMarkdownWithYAML =
  generateYAMLFrontMatter(frontMatterData) + markdownContent;

console.log(fullMarkdownWithYAML);
