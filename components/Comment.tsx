'use client'

import { useEffect } from 'react';
import Artalk from 'artalk';

const WalineComment = () => {
  useEffect(() => {
    Artalk.init({
      el: '#Comments',
      pageKey: "",
      pageTitle: "",
      server: 'http://artalk.aistar.cool:8080',
      site: 'AirBlog',
      versionCheck: true,
      useBackendConf: true,
    });
  }, []);

  return <div id="Comments"></div>;
}

export default WalineComment;
