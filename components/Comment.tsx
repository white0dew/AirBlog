"use client";

import { useEffect, useRef } from "react";
import Artalk from "artalk";
import { useTheme } from "next-themes";
import { mylog } from "@/lib/utils";

const ArtalkComment = () => {
  const { theme } = useTheme();
  const artalkInstanceRef = useRef<any | null>(null);

  // 初始化 Artalk，仅执行一次，并在组件卸载时清理
  useEffect(() => {
    artalkInstanceRef.current = Artalk.init({
      el: "#Comments",
      server: "https://artalk.aistar.cool",
      site: "offernow",
      versionCheck: true,
      useBackendConf: true,
      darkMode: false, // 初始值，后续用 theme 统一更新
    });

    return () => {
      try {
        artalkInstanceRef.current?.destroy?.();
      } catch (error) {
        mylog("Artalk destroy error", error);
      }
      artalkInstanceRef.current = null;
    };
  }, []);

  // 监听主题变化，尽量通过 Artalk 实例更新暗色模式，而不是重复 init
  useEffect(() => {
    if (!artalkInstanceRef.current) return;

    try {
      artalkInstanceRef.current.setDarkMode?.(theme === "dark");
    } catch (error) {
      mylog("Artalk setDarkMode error", error);
    }
  }, [theme]);

  // 监听评论框昵称输入框的焦点/失焦事件，并在卸载时移除监听
  useEffect(() => {
    mylog("ArtalkComment attach name input listeners");
    const input = document.querySelector<HTMLInputElement>(".atk-name");
    if (!input) return;

    const handleFocus = () => {
      mylog("Artalk name input focus");
    };
    const handleBlur = () => {
      mylog("Artalk name input blur");
    };

    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);

    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    };
  }, []);

  return <div id="Comments"></div>;
};

export default ArtalkComment;
