"use client";
import { useEffect } from "react";
import * as tocbot from "tocbot";

export default function Toc() {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".js-toc", // Select the wrapper of toc
      contentSelector: ".js-toc-content", // Select the warpper of contents
      headingSelector: "h1,h2, h3", // Choose the heading tags
      /* Optional 1.
            Enable these if you have a sticky header and adjust the offset value
            */
      headingsOffset: 100,
      scrollSmoothOffset: -100,

      /* Optional 2. 
            Enable this if 'active' class on scroll won't work properly
            */
      orderedList: false,
      hasInnerContainers: true,
      linkClass: "toc-link",
    });

    return () => tocbot.destroy();
  }, []);

  return (
    <div className="ml-5 ">
      <span className="text-lg font-semibold py-6 dark:text-white">
        文章目录
      </span>
      <div
        className="js-toc text-decoration-none break-words 
             no-underline
            underline-offset-[-1] text-decoration-none"
      ></div>
    </div>
  );
}
