import random
import requests
from bs4 import BeautifulSoup
import time

# 假设你的 sitemap 文件是一个 XML 文件，并且 URL 在 <loc> 标签中
sitemap_url = 'https://offernow.cn/sitemap.xml'

# 记录已处理URL的文件
processed_urls_file = 'processed_urls.txt'

def get_urls_from_sitemap(sitemap_url):
    """从 sitemap 中提取所有的 URL"""
    response = requests.get(sitemap_url)
    soup = BeautifulSoup(response.content, 'xml')
    urls = [loc.text for loc in soup.find_all('loc')]
    return urls

def submit_urls_to_baidu(urls, token):
    """
    提交URL数组到百度的普通收录工具

    参数:
    urls (list): 要提交的URL列表
    site (str): 在搜索资源平台验证的站点
    token (str): 在搜索资源平台申请的推送用的准入密钥

    返回:
    dict: 返回百度接口的响应
    """
    api_url = f"http://data.zz.baidu.com/urls?site=https://offernow.cn&token={token}"
    headers = {
        'Content-Type': 'text/plain'
    }
    data = "\n".join(urls)

    response = requests.post(api_url, headers=headers, data=data)

    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        return None

def load_processed_urls():
    """从文件中加载已处理的URL列表"""
    try:
        with open(processed_urls_file, 'r') as f:
            return set(f.read().splitlines())
    except FileNotFoundError:
        return set()

def save_processed_url(url):
    print("保存已处理的URL")
    """将已处理的URL保存到文件中"""
    with open(processed_urls_file, 'a') as f:
        f.write(url + '\n')
    print(f"Saved URL: {url}")  # 调试信息

def clear_processed_urls():
    """清空已处理的URL文件"""
    with open(processed_urls_file, 'w') as f:
        f.write('')

# 示例使用
token = "M0sfIGdkUod4leN9"

def main():
    urls = get_urls_from_sitemap(sitemap_url)
    random.shuffle(urls)  # 随机排序URL列表
    processed_urls = load_processed_urls()
    num = 0

    for url in urls:
        if url in processed_urls:
            print(f"URL {url} 已处理过，跳过...")
            continue  # 跳过已处理的URL

        num += 1
        curUrl = {url}
        # 这里你可以按照你的需要处理每个页面的内容
        start_time = time.time()  # 请求前时间

        response = submit_urls_to_baidu(curUrl, token)

        elapsed_time = time.time() - start_time  # 请求后时间
        print(f"第{num}次，内容 {url}，耗时 {elapsed_time:.2f} 秒:")

        if response:
            print(f"推送成功的URL条数: {response.get('success')}")
            print(f"当天剩余可推送的URL条数: {response.get('remain')}")
            print(f"不是本站的URL: {response.get('not_same_site')}")
            print(f"不合法的URL: {response.get('not_valid')}")

        save_processed_url(url)  # 保存已处理的URL

        if num >= 10:
            break

    # 检查是否所有URL都已处理完毕, 清空已处理的URL文件
    # 通过比较两个集合的差异来判断是否所有URL都已处理完毕
    # urls所有都在processed_urls中，才清空
    if not set(urls) - processed_urls:
        clear_processed_urls()
        print("所有URL都已处理完毕，已清空已处理的URL文件。")
    
if __name__ == '__main__':
    main()