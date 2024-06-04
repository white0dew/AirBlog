
"use client"

import { useRouter } from "next/navigation";


// 示例产品数据
// 产品数据
// TODO 改成语雀可配置
const products = [
    { name: '程序员自我修养', description: '软技能同样重要。提升沟通、团队协作能力，培养解决问题的思维，助你成为更全面的开发者。', path: '/s/self_improve/screct_qas' },
    // ...更多产品
    { name: '编程语言', description: '掌握流行的编程语言是开发者的基础。详解Java、Golang、Python、JavaScript等语言特性，助你深入理解语法和应用场景。', path: '/s/language' },
    { name: '计算机基础', description: '精炼的计算机基础讲解，包括数据结构、算法、计算机网络等计算机基础知识，帮助你通过技术面试的第一关。', path: '/s/cs_base' },
    { name: '实践项目', description: '实战项目经验分享，包括项目规划、开发到部署的全过程，提升你的项目构建与管理能力。', path: '/s/project' },
    { name: '大厂面经', description: '来自一线大厂的真实面试经验总结，涵盖前端、后端到AI等多个领域，为你的求职之路增添砝码。', path: '/s/interview/chat_view' },
    { name: '区区算法', description: '汲取大厂资深面试官的智慧精华，提供全面的前端、后端及人工智能面试策略，助你在职场竞争中脱颖而出。', path: '/s/algorithm/hogrunp9g0bggri2' },
];


export default function ProductList() {
    const router = useRouter()
    return (
        <section className="container mx-auto mt-10 " >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <div key={index} className=" rounded shadow-lg overflow-hidden transform 
                    transition duration-500 hover:scale-105 hover:bg-teal-200 dark:bg-slate-800">
                        {/* Icon */}
                        <div className="p-6 cursor-pointer" onClick={() => {
                            router.push(product.path)
                        }} >
                            <h3 className="text-2xl font-semibold mb-2 dark:text-yellow-200">{product.name}</h3>
                            <p className="text-gray-700 dark:text-yellow-100 ">{product.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section >
    );
};
