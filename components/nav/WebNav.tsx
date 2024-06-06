"use client";

import { ElogChapter } from '@/types/elog';
import React from 'react';
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
} from "@/components/ui/navigation-menu"
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useParams, usePathname } from 'next/navigation';


// 假设这是从哪里获取的章节数据
const chapters: ElogChapter[] = [
    // 示例数据，根据你的数据结构填充
];

// 导航组件
export default function Navigation({ chapters }: { chapters: ElogChapter[] }) {
    const path = usePathname()
    return (
        <NavigationMenu delayDuration={200} className='hiddenmd:flex text-lg  mr-10  md:mr-64'>
            <NavigationMenuList className=' space-x-3'>
                {chapters.map((chapter: ElogChapter) => (
                    (chapter.children) && (chapter.children.length > 0) && subChildrenIsNav(chapter.children) ? (
                        (chapter?.is_nav && <NavigationMenuItem key={chapter.uuid} className='w-full'>
                            <NavigationMenuTrigger className={cn(
                                `${path.includes(chapter.url) ? 'bg-slate-300' : ''}`,
                                "px-2",
                                "shadow-md",

                            )}>{chapter.title}</NavigationMenuTrigger>

                            <NavigationMenuContent className=' border-1  px-2'>
                                {chapter.children.map((child) => (
                                    (child?.is_nav) && (<Link key={child.uuid} href={child.url} legacyBehavior passHref
                                        className='w-full'>
                                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "px-2")}>
                                            {child.title}
                                        </NavigationMenuLink>
                                    </Link>)
                                ))}
                            </NavigationMenuContent>
                        </NavigationMenuItem>)
                    ) : (
                        (chapter?.is_nav && <NavigationMenuItem key={chapter.uuid} className="">
                            <Link href={chapter.url} legacyBehavior passHref>
                                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "shadow-md",
                                    `${path.includes(chapter.url) ? 'bg-slate-300' : ''}`,
                                    "px-2"
                                )}>
                                    {chapter.title}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>)
                    )
                ))
                }
            </NavigationMenuList>
        </NavigationMenu >

    );
};

// 子章节中至少有一个is_nav的值是true,就返回true，否则false
export function subChildrenIsNav(chapters: ElogChapter[]): boolean {
    for (const chapter of chapters) {

        if (chapter.is_nav) {
            return true;
        }
    }
    return false;
}