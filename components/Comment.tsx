'use client'

import { useEffect } from 'react';
import Artalk from 'artalk';

const WalineComment = () => {
  useEffect(() => {
    Artalk.init({
      el: '#Comments',
      pageKey: "",
      pageTitle: "",
      server: 'http://api2.aistar.cool:8080',
      site: 'AirBlog',
      versionCheck: true,
    });
    //   // 确保Artalk.js在客户端加载
    //   const script = document.createElement('script');
    //   script.src = "http://api2.aistar.cool:8080/dist/Artalk.js";
    //   script.onload = () => {
    //     // 初始化Artalk评论系统

    //     Artalk.init({
    //       el: '#Comments',
    //       pageKey: "",
    //       pageTitle: "",
    //       server: 'http://api2.aistar.cool:8080',
    //       site: 'Artalk 的博客',
    //     });
    //   };
    //   document.body.appendChild(script);

    //   // 移除script标签以防止多次加载
    // return () => {
    //   Artalk.
    //   };
  }, []);

  return <div id="Comments"></div>;
}

export default WalineComment;
