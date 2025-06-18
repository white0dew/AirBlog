import { allPosts } from "contentlayer/generated";
import CustomLink from "@/components/Link";
import ProductList from "@/components/home/ProductShow";
import Image from "next/image";
import Logo from "@/public/images/home.png";
import ArticlesShow from "@/components/home/ArticleShow";
import { TagsWall } from "@/components/home/TagsWall";

// 示例产品数据
// 产品数据
const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    image: "/product1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description for Product 2",
    image: "/product2.jpg",
  },
  // ...更多产品
];

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 
                  dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
    >
      {/* Hero Section */}
      <section
        className="text-center py-40 bg-gradient-to-br 
       from-indigo-600 via-blue-600 to-purple-700 text-white
       relative overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="m-2 animate-bounce flex justify-center">
            <Image src={Logo} alt="logo" width={150} height={150} />
          </div>
          <h1 className="text-6xl font-bold mb-6 animate-bounce">OffewNow</h1>
          <p className="text-xl">
            关于
            <span className="text-3xl px-1 text-blue-300">
              计算机、编程&&AI
            </span>
            ,可能你只需要这
            <span className="text-3xl">一个</span>网站
          </p>

          {/* 数据统计组件 */}
          <div className="text-center space-y-3 flex flex-col items-center">
            <span className="text-2xl font-semibold">
              当前网站共有{" "}
              <span className="text-green-400">{allPosts.length}</span> 份资料
            </span>
            <div className="relative w-96 h-1 bg-black/30 overflow-hidden rounded-lg flex flex-row">
              <div
                className="absolute w-16 h-1 bg-gradient-to-r rounded-xl from-transparent
               via-white to-blue-400 animate-slide-right"
              ></div>
            </div>
            <div className="flex items-center justify-center ">
              <div className=" animate-bounce-right flex items-center self-center text-2xl">
                👉
              </div>
              <CustomLink
                className="w-fit font-semibold xl:text-xl bg-gradient-to-r from-emerald-500 to-teal-600 
                         hover:from-emerald-600 hover:to-teal-700 rounded-lg py-2 px-6
                         transform hover:scale-105 transition-all duration-300 shadow-lg"
                href={"#tag"}
              >
                赶紧学起来！
              </CustomLink>
            </div>

            <p className="text-xl">分享最新的面试技巧、题库和编程知识</p>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <ProductList />
      <div id="tag">
        <TagsWall />
      </div>
      <ArticlesShow />
    </div>
  );
}
