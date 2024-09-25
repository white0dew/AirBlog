---
title: artalk的几个邮件通知模板
urlname: xf27pqyhtdno058e
date: '2024-09-25 21:32:26'
updated: '2024-09-25 22:14:36'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1727271225596-cf33d76c-72eb-4bdf-a802-17d4175db587.png'
description: 'artalk是一个开源的评论组件。根据自己修改以及网上收集，找到了几种好看的样式。信封样式代码：   '
---
artalk是一个开源的评论组件。



根据自己修改以及网上收集，找到了几种好看的样式。



# 信封样式
代码：

```go
<head>
  <style>
      * {
          margin: 0;
          padding: 0;
      }
      img {
          -webkit-user-drag: none;
      }
      .tk-owo-emotion {
          width: 3em;
          height: auto;
          max-width: 300px;
          max-height: 300px;
          vertical-align: middle;
      }
  </style>
</head>
</body>
  <div style="border-radius:5px;font-size:13px;width:680px;margin:30px auto 0;max-width:100%">
      <div style="box-shadow:0 0 30px 0 rgb(219 216 214);border-radius:5px;width:630px;margin:auto;max-width:100%;margin-bottom:-30px">
          <div style="width:200px;height:40px;margin-top:-20px;margin-left:0;text-align:center;line-height:40px;text-decoration:none;color:#fff;background-color:#94a9b9;border-radius:5px 0">Hi, {{nick}} !</div>
          <div style="line-height:180%;padding:0 15px 12px;margin:30px auto;color:#555;font-size:12px;margin-bottom:0">
              <h2 style="border-bottom:1px solid #ddd;font-size:14px;font-weight:400;padding:13px 0 10px 8px">
                  <span style="color:#de6561;font-weight:700">&gt;</span>&nbsp;您在 offernow.cn /&nbsp;<a style="text-decoration:none;color:#12addb" href="{{page_url}}" target="_blank">{{page_title}}</a>&nbsp;上的留言有人给你回复啦~</h2>
              <div style="padding:0 12px 0 12px;margin-top:18px">
                  <div class="Messages_box">
                      <p style="display:flex;justify-content:flex-end">您曾经的评论：</p>
                      <div class="ax_post_box-comments-single Messages-author" style="display: flex;justify-content: flex-end;margin-bottom: 5px;margin-top: 7px;">
                          <div class="ax_post_box-comment-avatar" style="width: auto;flex: none;order: 2">
                              <img src="https://cravatar.cn/avatar/{{parent_comment.email_encrypted}}?d=monsterid&s=80" style="width: 40px;height: 40px;border-radius: 5px">
                          </div>
                          <div class="ax_post_box-comment-text" style="position: relative;margin-right: 10px">
                              <span class="ax_post_box-comment-text-before" style="width: 0;height: 0;border-top:8px solid transparent;border-bottom:8px solid transparent;border-left:8px solid;border-left-color:#f4f4f4;border-right:0;border-right-color:transparent;right: -7px;left: auto;top: 12px;position: absolute"></span>
                              <div class="ax_post_box-comment-text-inner" style="background-color: #f1f3fa;padding: 10px;border-radius: 9px;margin-bottom: 3px">{{content}}</div>
                          </div>
                      </div>
                      <p><strong>{{reply_nick}}</strong> 回复您：</p>
                      <div class="ax_post_box-comments-single Messages-user" style="display: flex;margin-bottom: 5px;margin-top: 7px;">
                          <div class="ax_post_box-comment-avatar" style="width: auto;flex: none">
                              <img src="https://cravatar.cn/avatar/{{comment.email_encrypted}}?d=monsterid&s=80" style="width: 40px;height: 40px;border-radius: 5px">
                          </div>
                          <div class="ax_post_box-comment-text" style="position: relative;margin-left: 10px">
                              <span class="ax_post_box-comment-text-before" style="width: 0;height: 0;border-top: 8px solid transparent;border-bottom: 8px solid transparent;border-right: 8px solid;border-right-color: #f4f4f4;left: -7px;right: auto;top: 12px;position: absolute"></span>
                              <div class="ax_post_box-comment-text-inner" style="background-color: #f1f3fa;padding: 10px;border-radius: 9px;margin-bottom: 3px">{{reply_content}}</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div style="text-align:center">
              <a style="text-decoration:none;color:#fff;background-color:#94a9b9;padding:5px 20px;border-radius:4px;position:absolute;margin-left:-35px;margin-top:10px" href="{{link_to_reply}}" target="_blank">查看</a>
          </div>
      </div>
      <div style="width:100%;height:105px;background-repeat:no-repeat;border-radius:5px 5px 0 0;background-image:url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2fa930c8-feec-4942-ac88-ba3781377bb0/eab533f6-d947-407e-a79e-6de525abd099.png);background-size:cover;background-position:50% 50%;">
      </div>
      <div style="color:#8c8c8c;font-size:10px;width:100%;text-align:center;margin-top:20px">
          <p>本邮件为系统自动发送，请勿直接回复~</p>
      </div>
      <div style="color:#8c8c8c;font-size:10px;width:100%;text-align:center;margin-top: 5px;margin-bottom: 5px;">
          <p>Copyright © 2024 <a href="{{site_url}}" target="_blank" style="color: #0083ff; text-decoration: none">
            {{site_name}}
          </a></p>
      </div>
  </div>
<body>

```



示例图：

![](https://oss1.aistar.cool/elog-offer-now/9420532eb06268fbf33f28ecd035ca55.png)

# 简洁样式
代码：

```go
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>邮件通知</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
        }
        .content h2 {
            font-size: 18px;
            color: #333333;
            margin-top: 0;
        }
        .content p {
            font-size: 14px;
            color: #555555;
        }
        .content a {
            color: #007bff;
            text-decoration: none;
        }
        .comment {
            background-color: #f9f9f9;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 20px;
        }
        .comment img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
        }
        .comment .author {
            font-weight: bold;
            color: #333333;
        }
        .comment .text {
            margin-top: 10px;
            color: #555555;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f4f4f4;
            border-radius: 0 0 10px 10px;
            font-size: 12px;
            color: #888888;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>您有新的回复</h1>
        </div>
        <div class="content">
            <h2>Hi, {{nick}}!</h2>
            <p>您在 <a href="{{page_url}}" target="_blank">{{page_title}}</a> 上的留言有人回复了。</p>
            <div class="comment">
                <img src="https://cravatar.cn/avatar/{{parent_comment.email_encrypted}}?d=monsterid&s=80" alt="Avatar">
                <span class="author">您曾经的评论：</span>
                <div class="text">{{content}}</div>
            </div>
            <div class="comment">
                <img src="https://cravatar.cn/avatar/{{comment.email_encrypted}}?d=monsterid&s=80" alt="Avatar">
                <span class="author">{{reply_nick}} 回复您：</span>
                <div class="text">{{reply_content}}</div>
            </div>
            <p>点击 <a href="{{link_to_reply}}" target="_blank">这里</a> 查看回复。</p>
        </div>
        <div class="footer">
            <p>本邮件为系统自动发送，请勿直接回复。</p>
            <p>Copyright © 2024 <a href="{{site_url}}" target="_blank">{{site_name}}</a></p>
        </div>
    </div>
</body>
</html>
```

示例图：

![](https://oss1.aistar.cool/elog-offer-now/b50d882e374d35252e1945ec17b714a2.png)

