import Image from "next/image";
import Toc from "@/components/markdown/Toc";
export function ArticleRightSider() {
  return (
    <div
      className="hidden sticky top-[90px]  h-[calc(100vh-20vh)] prose prose-blue
        dark:prose-invert
        w-[324px] xl:flex md:shrink-0 xl:flex-col md:justify-between"
    >
      <div
        className="overflow-y-auto scrollbar-thin h-fit min-h-64
        scrollbar-thumb-rounded-full
        scroll-m-2 scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-corner-ring scrollbar-w-1 
        dark:scrollbar-thumb-sky-500 overflow-x-hidden"
      >
        <Toc />
      </div>
      {/* 公告板块，介绍服务器 */}

      <div className="flex flex-col space-y-1 items-center mb-3 bg-slate-100 rounded-lg p-2 ml-4">
        <h5 className="text-lg text-center font-bold mb-2">公告</h5>
        <text>
          💬 国内服务器高性价比首选 - 2c2g香港服务器仅
          <p className="inline text-red-800 text-xl">￥20/月</p>，
          <a
            href="https://www.007idc.cn/aff/ANKQDIPE"
            target="_blank"
            className="text-sky-500"
          >
            点击查看
          </a>
          <p>可用于自建服务器、学习!</p>
        </text>
      </div>

      {/* 二维码模块 */}
      <div
        className="flex-1 flex flex-col 
            mt-5
            items-center mb-1 sm:mb-0 self-center h-fit"
      >
        <h5 className="text-lg text-center font-bold mb-2">关注获取更多内容</h5>
        <div className="mb-3 flex space-x-4 ">
          <Image
            src={
              "https://oss1.aistar.cool/%E4%BA%8C%E8%BF%9B%E5%88%B6%E7%9A%84%E8%80%B3%E8%AF%AD.jpg "
            }
            width={200}
            height={200}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
