"use client";

import { ElogChapter } from "@/types/elog";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";

// 假设这是从哪里获取的章节数据
const chapters: ElogChapter[] = [
  // 示例数据，根据你的数据结构填充
];

// 导航组件
export default function Navigation({ chapters }: { chapters: ElogChapter[] }) {
  const path = usePathname();
  return (
    <NavigationMenu
      delayDuration={200}
      className="hidden md:flex  mr-10  md:mr-32 xl:mr-64"
    >
      <NavigationMenuList className=" space-x-3 ">
        {/* 有子目录的情况 */}
        {chapters.map((chapter: ElogChapter) =>
          chapter.children &&
          chapter.children.length > 0 &&
          subChildrenIsNav(chapter.children)
            ? chapter?.is_nav && (
                <NavigationMenuItem key={chapter.uuid} className="w-full">
                  <NavigationMenuTrigger
                    className={cn(
                      `${
                        path.includes(chapter.url)
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-600/30 dark:to-purple-600/30 border-blue-500/50"
                          : "bg-white/60 hover:bg-white/80 dark:bg-slate-800/60 dark:hover:bg-slate-700/80"
                      }`,
                      "px-4 py-2 text-sm font-medium rounded-lg",
                      "backdrop-blur-sm border border-gray-200/30 dark:border-slate-700/50",
                      "shadow-sm hover:shadow-md",
                      "transition-all duration-300",
                      "hover:scale-105 hover:border-blue-400/50 dark:hover:border-purple-400/50"
                    )}
                  >
                    {chapter.title}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent
                    className="px-3 py-2 flex flex-wrap justify-center 
                                  bg-white/90 dark:bg-slate-900/90 backdrop-blur-md
                                  border border-gray-200/50 dark:border-slate-700/50 rounded-lg shadow-lg
                                  opacity-100"
                  >
                    {chapter.children.map(
                      (child) =>
                        child?.is_nav && (
                          <Link
                            key={child.uuid}
                            href={child.url}
                            legacyBehavior
                            passHref
                            className="w-full "
                          >
                            <NavigationMenuLink
                              className={cn(
                                navigationMenuTriggerStyle(),
                                "h-full text-sm w-full font-medium rounded-md my-1",
                                "bg-white/70 hover:bg-blue-50 dark:bg-slate-800/70 dark:hover:bg-slate-700/90",
                                "border border-gray-200/30 dark:border-slate-700/50",
                                "hover:border-blue-400/50 dark:hover:border-purple-400/50",
                                "transition-all duration-200 hover:scale-[1.02]"
                              )}
                            >
                              {child.title}
                            </NavigationMenuLink>
                          </Link>
                        )
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            : chapter?.is_nav && (
                <NavigationMenuItem key={chapter.uuid} className="">
                  <Link href={chapter.url} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "shadow-sm hover:shadow-md text-sm font-medium rounded-lg",
                        `${
                          path.includes(chapter.url)
                            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-600/30 dark:to-purple-600/30 border-blue-500/50"
                            : "bg-white/60 hover:bg-white/80 dark:bg-slate-800/60 dark:hover:bg-slate-700/80"
                        }`,
                        "px-4 py-2 backdrop-blur-sm border border-gray-200/30 dark:border-slate-700/50",
                        "transition-all duration-300 hover:scale-105",
                        "hover:border-blue-400/50 dark:hover:border-purple-400/50"
                      )}
                    >
                      {chapter.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// 子章节中至少有一个is_nav的值是true,就返回true，否则false
export function subChildrenIsNav(chapters: ElogChapter[]): boolean {
  for (const chapter of chapters) {
    if (chapter.is_nav) {
      return true;
    }
  }
  return false;
}
