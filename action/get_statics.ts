"use server"

import { mylog } from "@/lib/utils";

export async function GetSiteVN() {
    const siteName = 'AirBlog'; // 替换为实际的站点名
    const url = `https://artalk.aistar.cool/api/v2/stats/latest_pages?site_name=${encodeURIComponent(siteName)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            mylog("response", response); // 输出获取的数据
            return response.json();
        })
        .then(({ data }) => {
            mylog("data", data); // 输出获取的数据
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}