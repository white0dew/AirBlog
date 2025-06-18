"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

// 示例产品数据
// 产品数据
// TODO 改成语雀可配置
const products = [
  {
    name: "🔥程序员自我修养",
    description:
      "软技能同样重要。提升沟通、团队协作能力，培养解决问题的思维，助你成为更全面的开发者。",
    path: "/s/self_improve/install_env",
  },
  // ...更多产品
  {
    name: "📚编程语言",
    description:
      "掌握流行的编程语言是开发者的基础。详解Java、Golang、Python、JavaScript等语言特性，助你深入理解语法和应用场景。",
    path: "/s/language",
  },
  {
    name: "💻计算机基础",
    description:
      "精炼的计算机基础讲解，包括数据结构、算法、计算机网络等计算机基础知识，帮助你通过技术面试的第一关。",
    path: "/s/cs_base",
  },
  {
    name: "🧰实践项目",
    description:
      "实战项目经验分享，包括项目规划、开发到部署的全过程，提升你的项目构建与管理能力。",
    path: "/s/project",
  },
  {
    name: "💹大厂面经",
    description:
      "来自一线大厂的真实面试经验总结，涵盖前端、后端到AI等多个领域，为你的求职之路增添砝码。",
    path: "/s/interview/chat_view",
  },
  {
    name: "⬇️区区算法",
    description:
      "汲取大厂资深面试官的智慧精华，提供全面的前端、后端及人工智能面试策略，助你在职场竞争中脱颖而出。",
    path: "/s/algorithm/hogrunp9g0bggri2",
  },
];

export default function ProductList() {
  const router = useRouter();
  return (
    <section className="container mx-auto mt-10 ">
      <h2 className="text-2xl font-bold mb-4 text-center">
        哈哈，你终于来啦!😊
      </h2>
      <h4 className="text-md font-semibold mb-4 text-center">
        这里有你想学习计算机、编程、校招、实习、AI……所有需要的东西！
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="group relative rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-lg overflow-hidden 
                    transform transition-all duration-500 hover:scale-105 hover:shadow-2xl
                    dark:bg-gradient-to-br dark:from-slate-800/70 dark:to-slate-900/70 
                    dark:border-slate-700/50 dark:backdrop-blur-sm
                    hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50
                    dark:hover:from-slate-800 dark:hover:to-slate-700"
          >
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 
                          dark:from-transparent dark:to-white/5 opacity-0 group-hover:opacity-100 
                          transition-opacity duration-500"
            ></div>

            {/* Content */}
            <Link
              className="relative p-6 cursor-pointer block h-full"
              href={product.path}
            >
              <h3
                className="text-2xl text-center font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700
                           dark:from-white dark:to-gray-300 bg-clip-text text-transparent
                           group-hover:from-blue-600 group-hover:to-purple-600
                           dark:group-hover:from-blue-400 dark:group-hover:to-purple-400
                           transition-all duration-300"
              >
                {product.name}
              </h3>
              <p
                className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 
                           dark:group-hover:text-gray-200 transition-colors duration-300"
              >
                {product.description}
              </p>

              {/* Hover indicator */}
              <div
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 
                            transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
              >
                <div
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                              flex items-center justify-center text-white text-sm"
                >
                  →
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
