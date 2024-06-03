// 引入 axios 和 fs 模块
import axios from 'axios';

// 定义API地址
const api = `http://data.zz.baidu.com/urls?site=https://offernow.cn&token=${process.env.BAIDU_SHOULU_TOKEN}`;
const maxSize = 10 //一次最多10，因此需要分组
// 提交URLs到百度
export async function SubmitUrlsToBaidu(urls: string[]) {
    // 20一批
    const groups = [];
    for (let i = 0; i < urls.length; i += maxSize) {
        groups.push(urls.slice(i, i + maxSize));
    }
    for (const group of groups) {
        try {
            const response = await axios.post(api, group.join('\n'), {
                headers: { 'Content-Type': 'text/plain' },
            });
            console.log('Submit response:', response.data);
        } catch (error) {
            console.error('Error submitting to Baidu:', error);
        }
    }
}