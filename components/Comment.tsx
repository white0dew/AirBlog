'use client'

import { useEffect } from 'react';
import Artalk from 'artalk';
import { useTheme } from 'next-themes';

const WalineComment = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  // useEffect(
  //   artalk.setDarkMode(true)
  // ,[])


  useEffect(() => {
    // artalk.setDarkMode(theme === 'dark')
    Artalk.init({
      el: '#Comments',
      pageKey: "",
      pageTitle: "",
      server: 'https://artalk.aistar.cool',
      site: 'AirBlog',
      versionCheck: true,
      useBackendConf: true,
      darkMode: theme === 'dark',
    });
  }, [theme]);

  return <div id="Comments"></div>;
}

export default WalineComment;
