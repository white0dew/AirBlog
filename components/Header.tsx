"use client";
import Link from "@/components/Link";
import Logo from "@/public/images/home.png";
import siteMetadata from "@/assets/siteMetadata";
import ThemeSwitch from "@/components/nav/ThemeSwitch";
import MobileNav from "@/components/nav/MobileNav";
import Navigation from "./nav/WebNav";
import { ChapterTree } from "@/lib/elog";
import Image from "next/image";

export default function Header() {
  // 检查当前路径是否包含特定的路径段

  return (
    <header
      className="sticky w-screen min-w-screen px-1 md:px-10 xl:px-20 z-50 flex  bg-slate-50 
    dark:bg-slate-700
    justify-between 
    opacity-95 top-0"
    >
      <meta name="sogou_site_verification" content="7AxJ6lhO0l" />
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="m-2">
              <Image src={Logo} alt="logo" width={50} height={50} />
            </div>
            {typeof siteMetadata.headerTitle === "string" ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
        <link
          href="https://artalk.aistar.cool/dist/Artalk.css"
          rel="stylesheet"
        />
      </div>

      <div className="flex items-center px-4 lg:pr-14">
        <Navigation chapters={ChapterTree} />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
}

function getCurTab(input: string) {
  if (input.includes("/posts")) {
    return "/posts";
  }

  if (input.includes("/projects")) {
    return "/projects";
  }

  if (input.includes("/tags")) {
    return "/tags";
  }

  if (input.includes("/about")) {
    return "/about";
  }

  if (input.includes("/archive")) {
    return "/archive";
  }

  return input;
}
