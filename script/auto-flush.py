# -*- coding: utf-8 -*-

# 自动刷新网站
# 可以使用conjob 定时运行python代码，或者使用宝塔面板进行处理


import requests

# 定义 API 的 URL
url = "https://serverless-api-elog.vercel.app/api/github"

# 定义查询参数
params = {
    "user": "**",
    "repo": "**",
    "event_type": "sync",
    "token": "**"
}



# 发送 GET 请求
response = requests.get(url, params=params)

# 检查请求是否成功
if response.status_code == 200:
    # 打印响应内容
    print("Response JSON:")
    print(response.json())
else:
    # 打印错误信息
    print(f"Request failed with status code {response.status_code}")
    print("Response text:")
    print(response.text)