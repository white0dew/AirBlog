"use client";

import { useEffect } from "react";
import Artalk from "artalk";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { mylog } from "@/lib/utils";

const ArtalkComment = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  // useEffect(
  //   artalk.setDarkMode(true)
  // ,[])
  // 使用query获取conment中的input元素，class是atk-name

  useEffect(() => {
    // artalk.setDarkMode(theme === 'dark')
    Artalk.init({
      el: "#Comments",
      server: "https://artalk.aistar.cool",
      site: "offernow",
      versionCheck: true,
      useBackendConf: true,
      darkMode: theme === "dark",
    });
  }, [theme]);

  useEffect(() => {
    mylog("useEffect querySelector");
    const input = document.querySelector(".atk-name") as HTMLInputElement;
    if (input) {
      input.value = "test";
    }

    input?.addEventListener("focus", () => {
      mylog("focus");
    });
    input?.addEventListener("blur", () => {
      mylog("blur");
    });
  }, []);

  return <div id="Comments"></div>;
};

export default ArtalkComment;
