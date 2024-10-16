import Script from "next/script";
import { ReactNode } from "react";
const isProduction = process.env.NODE_ENV === "production";
interface LayoutProps {
  children: ReactNode;
}

export default function ArticleLayout({ children }: LayoutProps) {
  return (
    <div className="w-full py-1 flex flex-col justify-center scroll-smooth">
      {/* {isProduction && (
        <Script
          src="https://readmore.openwrite.cn/js/readmore-2.0.js"
          type="text/javascript"
        />
      )} */}

      {children}
    </div>
  );
}
