import Link from "@/components/Link";
import siteMetadata from "@/assets/siteMetadata";
import SocialIcon from "@/assets/social-icons";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="mt-16 flex flex-col items-center bg-black text-white pt-10 md:pt-10">
        <div className=" sm:flex sm:justify-between md:py-5 md:space-x-10">
          {/* Company Info & Links */}
          <div className="hidden md:flex flex-1 mb-6 sm:mb-0">
            <h5 className="text-lg font-bold  mb-2">关于我们</h5>
            <p>OfferNow, 分享知识的平台</p>
            <p>让每个人了解计算机、编程、AI</p>
          </div>

          <div className="hidden  md:flex flex-1 mb-6 sm:mb-0 space-y-1">
            <h5 className="text-lg font-bold  mb-2">联系方式</h5>
            <ul>
              <li>1373685219@qq.com</li>
              <li>
                官网:<Link href={"https://aistar.cool"}>aistar.cool </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex-1 mb-1 sm:mb-0">
            <h5 className="text-lg font-bold mb-2">关注我们</h5>
            <div className="mb-3 flex space-x-4 ">
              <Image
                src={
                  "https://oss1.aistar.cool/%E4%BA%8C%E8%BF%9B%E5%88%B6%E7%9A%84%E8%80%B3%E8%AF%AD.jpg "
                }
                width={100}
                height={100}
                alt=""
              />
            </div>
          </div>

          <div className="flex-1 flex mb-6 sm:mb-0 flex-col ">
            <h5 className="text-lg font-bold  mb-2 ">关于网站</h5>
            <div className="flex-row space-x-2 lg:flex-col">
              <Link href="/s/web/changelog">更新日志</Link>
              <Link href="/s/web/links">友情链接</Link>
              <Link href="/s/web/whitedew">网站作者</Link>
              <Link href="/sitemap.xml">站点地图</Link>
            </div>
          </div>
        </div>

        <div className="mb-2 flex flex-grow space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.headerTitle}</Link>
          <Link href="https://beian.miit.gov.cn/" target="_blank">
            蜀ICP备2024075438号
          </Link>
        </div>
      </div>
    </footer>
  );
}
