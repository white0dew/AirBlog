import Script from "next/script";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function ArticleLayout({ children }: LayoutProps) {
  return (
    <div className="w-full py-1 flex flex-col justify-center scroll-smooth">
      <Script
        src="https://readmore.openwrite.cn/js/readmore-2.0.js"
        type="text/javascript"
      />
      {children}
    </div>
  );
}
