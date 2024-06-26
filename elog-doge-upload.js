const {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} = require("@aws-sdk/client-s3");
// 节省体积，只引入 S3 服务（推荐）
const S3 = require("aws-sdk/clients/s3");
// const dogecloudApi = require("./lib/doge-sdk"); // 请替换为正确的dogecloudApi函数路径
var axios = require("axios");
var crypto = require("crypto");
var querystring = require("querystring");

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

class DogeCloudUploader {
  constructor(config) {
    this.config = config.dogeCloudUploader;
    this.config.prefixKey = formattedPrefix(this.config.prefixKey);
    // 该 API 参考文档： https://docs.dogecloud.com/oss/api-tmp-token
    this.init();
  }

  async init() {
    try {
      console.log("init start");
      await this.dogecloudApi(
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

            this.client = client;
          } catch (e) {
            console.error("初始化出错", err.message);
          }
        }.bind(this)
      );
    } catch (e) {
      console.error("init初始化出错", err.message);
    }
  }

  async hasImage(fileName) {
    try {
      if (!this.client) {
        await this.init();
      }
      // 如果后缀是svg直接跳过
      if (fileName.endsWith(".svg")) {
        return;
      }

      let tdata = null;
      let terr = null;
      await this.client.copyObject(
        {
          Bucket: "s-gz-6611-oss1-1258813047", // 这里替换为目标空间的 s3Bucket 值
          CopySource:
            "/" +
            process.env.R2_BUCKET +
            "/" +
            this.config.prefixKey +
            fileName, // sourceS3Bucket 替换为源空间的 s3Bucket 值
          Key: "_copy/" + this.config.prefixKey + fileName, // 目标路径
        },
        function (err, data) {
          if (err) console.error("hasImage", err.name); // 出错
        }
      );

      return undefined;
    } catch (err) {
      if (err.name === "NoSuchKey") {
        return undefined;
      }
      console.error("检查图片出错", err.message);
    }
  }

  async uploadImg(imgBuffer, fileName) {
    try {
      const params = {
        Bucket: process.env.R2_BUCKET,
        Key: this.config.prefixKey + fileName,
        Body: imgBuffer,
        // ContentType: "image/svg+xml",
        // 如果需要可以在这里设置更多的上传参数，例如 ContentType 等
      };
      // 根据后缀类型设置对应的contentType
      switch (fileName.split(".").pop()) {
        case "svg":
          params.ContentType = "image/svg+xml";
          break;
        case "png":
          params.ContentType = "image/png";
          break;
        case "jpg":
          params.ContentType = "image/jpeg";
          break;
        case "jpeg":
          params.ContentType = "image/jpeg";
          break;
        case "gif":
          params.ContentType = "image/gif";
          break;
        case "webp":
          params.ContentType = "image/webp";
          break;
        default:
          params.ContentType = "image/jpeg";
          break;
      }

      await this.client.putObject(params, function (err, data) {
        if (err) console.error("uploadImg", err, err.stack);
        // else console.error(data);
      });
      return `https://${process.env.R2_HOST}/${
        this.config.prefixKey + fileName
      }`;
    } catch (err) {
      console.error("上传图片出错", err.message);
      // throw err; 不抛出错误
    }
  }

  dogecloudApi(apiPath, data = {}, jsonMode = false, callback = null) {
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
}

module.exports = DogeCloudUploader;
