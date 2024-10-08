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
                      `${path.includes(chapter.url) ? "bg-slate-300" : ""}`,
                      "px-2 py-2 text-md",
                      "shadow-lg",
                      "border-2"
                    )}
                  >
                    {chapter.title}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="  px-2 flex flex-wrap justify-center opacity-100">
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
                                "h-full text-sm w-full font-semibold rounded-b-none border-solid border-b-2 border-sky-800"
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
                        "shadow-md text-md",
                        `${path.includes(chapter.url) ? "bg-slate-300 dark:bg-slate-200 " : ""}`,
                        "px-2 border-2"
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
