// 引入 axios 和 fs 模块
import axios from 'axios';

// 定义API地址
const api = `http://data.zz.baidu.com/urls?site=https://offernow.cn&token=${process.env.BAIDU_SHOULU_TOKEN}`;
const maxSize = 10 //一次最多10，因此需要分组



// 从URL数组中随机选择10个元素
function getRandomUrls(urls: string[], count: number): string[] {
    if (urls.length <= count) {
        return urls;
    }

    const shuffled = [...urls].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count);
}

// 提交URLs到百度
export async function SubmitUrlsToBaidu(urls: string[]) {
    // 从URL数组中随机选择10个URL
    const urlsToSubmit = getRandomUrls(urls, 10);

    try {
        // 发起POST请求
        const response = await axios.post(api, urlsToSubmit.join('\n'), {
            headers: { 'Content-Type': 'text/plain' },
        });
        // 打印响应数据
        console.log('Submit response:', response.data);
    } catch (error) {
        // 错误处理
        console.error('Error submitting to Baidu:err');
        // console.error('Error submitting to Baidu:', error);
    }
}