"use client"
import Link from '@/components/Link';
import Logo from '@/public/blog.svg';
import headerNavLinks from '@/assets/headerNavLinks';
import siteMetadata from '@/assets/siteMetadata';
import ThemeSwitch from '@/components/ThemeSwitch';
import MobileNav from '@/components/MobileNav';
import { useRouter, usePathname } from 'next/navigation'

export default function Header() {
  const router = useRouter();
  const pathname = usePathname()
  console.log(pathname)
  // 检查当前路径是否包含特定的路径段
  // const isPostRoute = router.includes('/posts/');

  // // 根据路径动态设置背景色类名
  // const postButtonClassName = isPostRoute
  //   ? 'bg-gray-100' // 当前路径为/posts/时的背景色
  //   : 'hover:bg-gray-100'; // 非/posts/路径时的hover背景色

  return (
    <header className=" top-1 z-999 flex items-center justify-between py-10 ">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
        <link href="https://artalk.aistar.cool/dist/Artalk.css" rel="stylesheet" />
      </div>
      <div className="flex  items-center leading-5 space-x-4 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`hidden rounded-md md:px-3 sm:block text-lg font-medium
               text-gray-900 dark:text-gray-400
                hover:text-primary-600
                 hover:bg-gray-100 dark:hover:text-primary-400 
                 ${link.href == getCurTab(pathname) ? 'bg-gray-300' : ""}`}
            >
              {link.title}
            </Link>
          ))}
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
}

function getCurTab(input: string) {
  if (input.includes("/posts")) {
    return "/posts"
  }

  if (input.includes("/projects")) {
    return "/projects"
  }

  if (input.includes("/tags")) {
    return "/tags"
  }

  if (input.includes("/about")) {
    return "/about"
  }

  if (input.includes("/archive")) {
    return "/archive"
  }

  return input
}