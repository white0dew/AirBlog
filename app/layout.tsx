import "@/assets/css/tailwind.css";
import "@/assets/css/toc.css";

import type { Metadata } from "next";
import siteMetadata from "@/assets/siteMetadata";
import { ThemeProviders } from "@/components/ThemeProviders";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { SearchConfig } from "pliny/search";
import { SearchProvider } from "@/components/nav/SearchProvider";

// 参考:https://github.com/shadcn-ui/ui/issues/94 中dongnez 的写法,解决下拉菜单的问题
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.title,
    // images: [siteMetadata.socialBanner],
    locale: "zh_CN",
    type: "website",
  },
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: "summary_large_image",
    // images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getBdAnalyticsTag = () => {
    return {
      __html: `
      var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?1fa0fbb316d670c3475396d96204996d";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`,
    };
  };

  return (
    <html lang={siteMetadata.language} suppressHydrationWarning>
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#fff"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000"
      />
      {/* 全局 CSS */}
      <meta name="baidu-site-verification" content="codeva-I0qCzKCAtu" />
      <meta name="sogou_site_verification" content="aSqvuC76gh" />
      <body
        className="bg-white w-screen max-w-screen
       overflow-x-hidden
      text-black antialiased dark:bg-gray-950 dark:text-white"
      >
        <script dangerouslySetInnerHTML={getBdAnalyticsTag()} />
        <ThemeProviders>
          <div
            className={cn(
              "  flex min-h-screen flex-col justify-between font-sans max-w-max",
              fontSans.variable
            )}
          >
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
              <Header />
              <main>{children}</main>
            </SearchProvider>
            <Footer />
          </div>
        </ThemeProviders>
      </body>
    </html>
  );
}
