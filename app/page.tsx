import { allPosts } from "contentlayer/generated";
import CustomLink from "@/components/Link";
import ProductList from "@/components/home/ProductShow";
import Image from "next/image";
import Logo from "@/public/images/home.png";

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
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r  from-teal-700 to-blue-500 text-white">
        <div className="m-2 animate-bounce flex justify-center">
          <Image src={Logo} alt="logo" width={150} height={150} />
        </div>
        <h1 className="text-6xl font-bold mb-4 animate-bounce">OffewNow</h1>

        <p className="text-xl">立即拿到Offer哦!</p>
        <p className="text-xl">分享最新的面试技巧、题库和编程知识</p>
        {/* 数据统计组件 */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <span className="text-2xl font-semibold">
            当前网站共有{" "}
            <span className="text-green-500">{allPosts.length}</span> 份学习资料
          </span>

          <div className="flex items-center justify-center ">
            <div className=" animate-bounce-right flex items-center self-center text-xl">
              👉
            </div>
            <CustomLink
              className="w-fit font-semibold bg-teal-500 dark:bg-teal-800 rounded-md py-1 px-2 hover:bg-teal-600"
              href={"/s/language"}
            >
              {" "}
              赶紧卷起来！
            </CustomLink>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <ProductList />
    </div>
  );
}
