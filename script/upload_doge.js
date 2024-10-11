require("dotenv").config({ path: ".env.local" });
// 节省体积，只引入 S3 服务（推荐）
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const readDir = require("recursive-readdir");
const path = require("path");
const mime = require("mime-types");
const version = require("../package.json").version;

var axios = require("axios");
var crypto = require("crypto");
var querystring = require("querystring");
// Retrive all the files path in the build directory
const getDirectoryFilesRecursive = (dir, ignores = []) => {
  return new Promise((resolve, reject) => {
    readDir(dir, ignores, (err, files) => (err ? reject(err) : resolve(files)));
  });
};

// key看起来会像这样: _next/public/<buildid>/pages/index.js
// <buildid> 是每次nextJS 部署时生成的unique id
// 参考: [https://nextjs.org/blog/next-7/#static-cdn-support](https://nextjs.org/blog/next-7/#static-cdn-support)
const generateFileKey = (fileName, toReplace, replaced) => {
  const S3objectPath = fileName.split(toReplace)[1];
  console.log("S3objectPath", S3objectPath);

  return version + replaced + S3objectPath;
};

/**
  
  ● 处理前缀，结尾自动加上/
  ● @param  prefix 
  ● @return  {*|string} 
  */
const formattedPrefix = (prefix) => {
  // 如果没传，则默认为空
  if (!prefix) return "";
  let _prefix = prefix;
  // 如果开头无需/
  if (_prefix.startsWith("/")) {
    prefix = prefix.slice(1);
  }
  // 如果结尾需要/
  if (!_prefix.endsWith("/")) {
    _prefix = `${_prefix}/`;
  }
  return _prefix;
};

const uploadToS3 = async (fileArray, toReplace, replaced) => {
  try {
    console.log("init start");
    await dogecloudApi(
      "/auth/tmp_token.json",
      {
        channel: "OSS_FULL",
        scopes: ["*"],
      },
      true,
      function (err, data) {
        if (err) {
          console.log(err.Error);
          return;
        }
        try {
          // 这里推荐使用 Redis 之类的缓存将获取到的临时密钥缓存下来，两小时内有效
          const client = new S3({
            region: "automatic",
            endpoint: process.env.R2_ENDPOINT,
            credentials: data.Credentials,
            params: {
              Bucket: process.env.R2_BUCKET,
            },
          });

          console.log("init end");

          fileArray.map(async (file) => {
            // 配置s3对象参数
            // const S3params = {
            //   Bucket: process.env.AWS_S3_BUCKET_NAME,
            //   Body: fs.createReadStream(file),
            //   Key: generateFileKey(file, toReplace, replaced),
            //   ACL: "public-read",
            //   ContentType: String(mime.lookup(file)),
            //   ContentEncoding: "utf-8",
            //   CacheControl: "immutable,max-age=31536000,public",
            // };

            const params = {
              Bucket: process.env.R2_BUCKET,
              Key: generateFileKey(file, toReplace, replaced),
              Body: fs.createReadStream(file),
              ACL: "public-read",
              ContentType: String(mime.lookup(file)),
              ContentEncoding: "utf-8",
            };

            console.log("uploading", params.Key);
            try {
              await client.putObject(params, function (err, data) {
                if (err) console.error("uploadImg", err, err.stack);
                process.exitCode = 1;
                // else console.error(data);
              });
            } catch (e) {
              console.error("uploadImg", e, e.stack);
            }
          });
        } catch (e) {
          console.error("初始化出错", err.message);
        }
      }
    );
  } catch (e) {
    console.error("init初始化出错", e.message);
  }
};

function dogecloudApi(apiPath, data = {}, jsonMode = false, callback = null) {
  // 这里替换为你的多吉云永久 AccessKey 和 SecretKey，可在用户中心 - 密钥管理中查看
  // 请勿在客户端暴露 AccessKey 和 SecretKey，那样恶意用户将获得账号完全控制权
  const accessKey = process.env.R2_ACCESSKEYID;
  const secretKey = process.env.R2_SECRET_ACCESSKEY;

  const body = jsonMode ? JSON.stringify(data) : querystring.encode(data);
  const sign = crypto
    .createHmac("sha1", secretKey)
    .update(Buffer.from(apiPath + "\n" + body, "utf8"))
    .digest("hex");
  const authorization = "TOKEN " + accessKey + ":" + sign;

  return new Promise(function (resolve, reject) {
    try {
      axios
        .request({
          url: "https://api.dogecloud.com" + apiPath,
          method: "POST",
          data: body,
          responseType: "json",
          headers: {
            "Content-Type": jsonMode
              ? "application/json"
              : "application/x-www-form-urlencoded",
            Authorization: authorization,
          },
        })
        .then(function (response) {
          if (response.data.code !== 200) {
            // API 返回错误
            callback
              ? callback({ Error: "API Error: " + response.data.msg }, null)
              : reject({
                  errno: response.data.code,
                  msg: "API Error: " + response.data.msg,
                });
            return;
          }
          callback
            ? callback(null, response.data.data)
            : resolve(response.data.data);
        })
        .catch(function (err) {
          callback ? callback(err, null) : reject(err);
        });
    } catch (error) {
      callback ? callback(error, null) : reject(err);
    }
  });
}

//递归获取文件
const start = async function (dict) {
  for (var i = 0; i < dict.length; i++) {
    const files = await getDirectoryFilesRecursive(
      path.resolve(__dirname, dict[i].filePath),
      [".DS_Store", "BUILD_ID"]
    );
    uploadToS3(files, dict[i].toReplace, dict[i].replaced);
  }
};

// 调用 start 方法
start([
  {
    filePath: "../.next/static/",
    toReplace: ".next/",
    replaced: "/_next/",
  },
]);
