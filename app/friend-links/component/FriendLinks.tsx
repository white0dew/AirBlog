"use client";
import React from "react";
import FriendLink from "@/public/friend-links.json";
import { FriendWebsiteInfo } from "@/types/friend-link";
import Image from "next/image";
import Link from "next/link";
import { imageLoader } from "@/lib/image-loader";
import Comment from "@/components/Comment";
const friendLinks = FriendLink as FriendWebsiteInfo[];
export function FriendLinks() {
  return (
    <div className="flex mt-10 flex-col items-center space-y-10 h-full min-h-screen  dark:bg-gray-900">
      <h1 className="text-lg lg:text-2xl text-left font-semibold mb-2">
        一些优秀网站推荐
      </h1>
      <div className="flex flex-wrap justify-center gap-4 3xl:max-w-7xl">
        {friendLinks.map((website, idx) => (
          <Link
            target="_blank"
            href={website.url}
            key={website.name}
            className="flex flex-row items-center bg-white dark:bg-black p-8 rounded-lg shadow-md
             space-x-3 w-96 h-36 text-ellipsis line-clamp-1
            hover:shadow-xl hover:bg-gray-200 transition-shadow duration-300 hover:dark:bg-gray-800 dark:text-white
            animate-fade-up animate-ease-in-out"
            style={{
              animationDelay: `${Number(idx + 1) * 300}ms`,
            }}
          >
            <Image
              src={website.imageUrl}
              loader={imageLoader}
              alt={website.name}
              width={100}
              height={100}
              loading="lazy"
              className="rounded-full"
            />
            <div className=" flex flex-col">
              <h2 className="mt-4 text-lg font-semibold">{website.name}</h2>
              <p className="mt-2 ">{website.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <h1 className="text-lg   lg:text-2xl text-left font-semibold mb-2 mt-4">
        网站自荐
      </h1>
      <ul className=" text-lg">
        <li>● 申请前请先将本站点加入你的网站友链页面中</li>
        <li>
          ● 原则上只和技术类、知识类博客互换友链，且具有原创高质量文章优先。
        </li>
        <li>● 不与含有色情、暴力、政治敏感或其他法律法规禁止的网站互换。</li>
        <li>
          ●
          本站会使用脚本定期对所有友链进行检查，若发现一个月以上不能正常访问或友链被取消，则会取消该友链，望周知。
        </li>
        <li>● 本站信息及申请模板如下，请复制并评论在此页面</li>
      </ul>

      <h1 className="text-lg  lg:text-2xl text-left font-semibold mb-2 mt-4">
        本站信息及申请模板
      </h1>
      <ul className=" text-lg">
        <li>● 网站名称：OfferNow</li>
        <li>● 网站介绍：程序员的自我修养，让每个人了解计算机、编程、AI</li>
        <li>● 网站地址：https://www.offernow.cn</li>
        <li>
          ●
          网站头图：https://offernow.cn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome.877913bf.png&w=384&q=75
        </li>
        <li>● 友情链接页面：https://offernow.cn/friend-links</li>
      </ul>

      <div
        id="comment"
        className="lg:w-3/4 2xl:w-3/5 p-4 text-start text-gray-800 mt-5 w-full"
      >
        <Comment />
      </div>
    </div>
  );
}
