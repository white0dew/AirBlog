const { withContentlayer } = require("next-contentlayer2");
const NextOSSPlugin = require("next-oss-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 配置 CDN 地址
  // assetPrefix: isProd ? "https://cdn.example.com/offernow/" : "",
  swcMinify: true,
  output: "standalone",
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Next.js 开发模式默认会开启 React Strict Mode，会渲染2次，我们不需要
  reactStrictMode: false,
  // build 阶段禁止 ts 类型检查
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chev.contrails.space",
        port: "12650",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "oss1.aistar.cool",
        pathname: "/**/**",
      },
      {
        protocol: "https",
        hostname: ".*",
        port: "",
        pathname: "*/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  webpack: (config, { buildId }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // if (isProd && buildId) {
    //   config.plugins.push(
    //     new NextOSSPlugin({
    //       region: "oss-cn-hangzhou", // bucket所在区域
    //       accessKeyId: process.env.R2_ACCESSKEYI,
    //       accessKeySecret: process.env.R2_SECRET_ACCESSKEY,
    //       bucket: process.env.R2_BUCKET,

    //       filter: (assert) => /\.js$/.test(assert),
    //       assetPrefix: `${assetPrefix}/_next/`, // 上传资源前缀
    //       customizedOssPaths: [
    //         // 替换为 /:buildId/page/xxx.js ，使能正常访问
    //         { pattern: /bundles\/pages/g, replace: `${buildId}/page` },
    //       ],
    //     })
    //   );
    // }
    return config;
  },
};

module.exports = withContentlayer(nextConfig);
