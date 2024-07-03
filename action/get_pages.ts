"use server";

import { PageType } from "@/constants/common_enum";
import { mylog } from "@/lib/utils";

interface GetPageStruct {
  url: string;
  title: string;
  pv: string;
  date: string;
  id: number;
}

function getPageParam(pageType: PageType) {
  switch (pageType) {
    case PageType.MostNew:
      return "latest_pages";
    case PageType.MostPV:
      return "pv_most_pages";
    case PageType.Random:
      return "rand_pages";
    case PageType.MostComent:
      return "comment_most_pages";
    default:
      return "pv_most_pages";
  }
}

export async function GetPages(page_type: PageType, limit?: number) {
  const siteName = "offernow"; // 替换为实际的站点名
  const limitNum = limit ? limit : 15;

  const url = `https://artalk.aistar.cool/api/v2/stats/${getPageParam(page_type)}?
  site_name=${encodeURIComponent(siteName)}&limit=${limitNum}`;

  let res: GetPageStruct[] = [];
  await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      mylog("response", response); // 输出获取的数据
      return response.json();
    })
    .then(({ data }) => {
      mylog("GetPages data", data); // 输出获取的数据
      res = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      return res;
    });
  return res;
}
