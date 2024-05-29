module.exports = {
  write: {
    platform: "yuque-pwd",
    // Token 模式（需要语雀超级会员）
    yuque: {
      token: process.env.YUQUE_TOKEN,
      login: process.env.YUQUE_LOGIN,
      repo: process.env.YUQUE_REPO,
      onlyPublic: false,
      onlyPublished: true,
      linebreak: false,
    },
    // 账号密码模式
    "yuque-pwd": {
      username: process.env.YUQUE_USERNAME,
      password: process.env.YUQUE_PASSWORD,
      login: process.env.YUQUE_LOGIN,
      repo: process.env.YUQUE_REPO,
      onlyPublic: false,
      onlyPublished: true,
      linebreak: true,
    },
  },
  deploy: {
    platform: "local",
    local: {
      outputDir: "./docs/doc",
      filename: "title",
      format: "markdown",
      catalog: true,
      formatExt: "./elog.format.js",
      frontMatter: {
        enable: true,
      },
    },
  },
  image: {
    enable: false,
    // platform: "local",
    // local: {
    //   outputDir: "./docs/images",
    //   pathFollowDoc: true,
    // },
  },
};
