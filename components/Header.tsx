import Link from '@/components/Link';
import Logo from '@/public/blog.svg';
import headerNavLinks from '@/assets/headerNavLinks';
import siteMetadata from '@/assets/siteMetadata';
import ThemeSwitch from '@/components/ThemeSwitch';
import MobileNav from '@/components/MobileNav';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-10">
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
      <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden sm:block font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400"
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
