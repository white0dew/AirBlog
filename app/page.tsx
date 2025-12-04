import { allPosts } from "contentlayer/generated";
import CustomLink from "@/components/Link";
import Image from "next/image";
import Logo from "@/public/images/home.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.18),transparent_26%)]" />
        <div className="container mx-auto px-6 py-24 md:py-28">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="relative w-28 h-28">
              <Image
                src={Logo}
                alt="OfferNow logo"
                fill
                className="object-contain drop-shadow-lg"
                sizes="120px"
                priority
              />
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                OfferNow-现在就拿下你的校招Offer！
              </h1>
               
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          <PromoCard
            title="校招信息汇总"
            description="一站式校招信息入口，按公司/城市/批次快速筛选，实时更新内推与网申链接。"
            href="https://oc.offernow.cn"
            cta="前往汇总站"
          />
          <PromoCard
            title="校招简历自动填写插件"
            description="自动填充常见网申表单，支持多站点同步资料，减少重复输入，专注投递本身。"
            href="https://cv.offernow.cn"
            cta="下载安装"
          />
        </div>
      </section>
    </div>
  );
}

type PromoCardProps = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

function PromoCard({ title, description, href, cta }: PromoCardProps) {
  return (
    <CustomLink
      href={href}
      className="group relative block overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl active:translate-y-[2px] active:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500/60 dark:border-slate-800/60 dark:bg-slate-900/70"
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-indigo-50/30 opacity-0 transition duration-500 group-hover:opacity-100 group-active:opacity-100 dark:from-slate-800/50 dark:via-transparent dark:to-slate-700/40" />
      <div className="relative space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition group-hover:gap-3 group-active:gap-3 dark:text-blue-300">
          {cta}
          <span aria-hidden>→</span>
        </div>
      </div>
    </CustomLink>
  );
}
