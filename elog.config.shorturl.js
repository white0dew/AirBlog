const r2 = require("@elog/plugin-img-r2");
const dogeCloudUploader = require("./elog-doge-upload");

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
    },
    // 账号密码模式
    "yuque-pwd": {
      username: process.env.YUQUE_USERNAME,
      password: process.env.YUQUE_PASSWORD,
      login: process.env.YUQUE_LOGIN,
      repo: process.env.YUQUE_REPO,
      onlyPublic: false,
      onlyPublished: true,
      linebreak: false, // 会有问题
    },
  },
  deploy: {
    platform: "local",
    local: {
      outputDir: "./docs/doc",
      filename: "urlname",
      format: "markdown",
      catalog: true,
      formatExt: "./elog.format.js",
      frontMatter: {
        enable: true,
      },
    },
  },
  image: {
    enable: true,
    plugin: "./elog-doge-upload.js", // 使用自己的本地插件路径，放置在和elog.config.js同级目录
    // enableForExt: true,
    // plugin: r2, // 使用 npm 插件
    plugin: dogeCloudUploader, // 使用 npm 插件
    // plugin: require("r2"), // 使用 npm 插件
    dogeCloudUploader: {
      accessKeyId: process.env.R2_ACCESSKEYID,
      secretAccessKey: process.env.R2_SECRET_ACCESSKEY,
      bucket: process.env.R2_BUCKET,
      endpoint: process.env.R2_ENDPOINT,
      host: process.env.R2_HOST,
      prefixKey: "elog-offer-now",
    },
    // platform: "oss",

    // local: {
    //   outputDir: "./docs/images",
    //   pathFollowDoc: true,
    // },
  },
};
