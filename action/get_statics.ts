"use server";

import { mylog } from "@/lib/utils";

// TODO 使用redis作为缓存，防止db爆炸
export async function GetSiteVN() {
  const siteName = "AirBlog"; // 替换为实际的站点名
  const url = `https://artalk.aistar.cool/api/v2/stats/page_pv?site_name=${encodeURIComponent(
    siteName
  )}`;

  try {
    const response = await fetch(url, {
      // 使用 Next.js 内置缓存，减轻接口压力
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      mylog("GetSiteVN response not ok", response.status, response.statusText);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    mylog("GetSiteVN data", data); // 输出获取的数据
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    // 保持 server action 的调用方语义清晰：返回 null 表示失败
    return null;
  }
}
