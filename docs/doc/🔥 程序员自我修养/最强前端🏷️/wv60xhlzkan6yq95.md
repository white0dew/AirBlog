---
title: 怎么将中文字符等转换为url友好的字符串？
urlname: wv60xhlzkan6yq95
date: '2024-10-12 15:34:08'
updated: '2024-10-13 09:24:07'
description: '最近在做一个导航网站，需要将中文转成url。尝试了两种。选型第一种 pinyin很大使用量的库，https://www.npmjs.com/package/pinyin?activeTab=versions。但……不知道为什么，在nextjs14下无法正常使用，没办法，只能放弃了。import...'
---
最近在做一个导航网站，需要将中文转成url。



尝试了两种。

# 选型
## 第一种 pinyin
很大使用量的库，[https://www.npmjs.com/package/pinyin?activeTab=versions](https://www.npmjs.com/package/pinyin?activeTab=versions)。



但……



不知道为什么，在nextjs14下无法正常使用，没办法，只能放弃了。



```typescript
import pinyin from "pinyin";

console.log(pinyin("中心"));    // [ [ 'zhōng' ], [ 'xīn' ] ]

console.log(pinyin("中心", {
  heteronym: true,              // 启用多音字模式
}));                            // [ [ 'zhōng', 'zhòng' ], [ 'xīn' ] ]

console.log(pinyin("中心", {
  heteronym: true,              // 启用多音字模式
  segment: true,                // 启用分词，以解决多音字问题。默认不开启，使用 true 开启使用 Intl.Segmenter 分词库。
}));                            // [ [ 'zhōng' ], [ 'xīn' ] ]

console.log(pinyin("中心", {
  segment: "@node-rs/jieba",    // 指定分词库，可以是 "Intl.Segmenter", "nodejieba"、"segmentit"、"@node-rs/jieba"。
}));                            // [ [ 'zhōng' ], [ 'xīn' ] ]

console.log(pinyin("我喜欢你", {
  segment: "segmentit",         // 启用分词
  group: true,                  // 启用词组
}));                            // [ [ 'wǒ' ], [ 'xǐhuān' ], [ 'nǐ' ] ]

console.log(pinyin("中心", {
  style: "initials",            // 设置拼音风格。
  heteronym: true,              // 即使有多音字，因为拼音风格选择，重复的也会合并。
}));                            // [ [ 'zh' ], [ 'x' ] ]

console.log(pinyin("华夫人", {
  mode: "surname",              // 姓名模式。
}));                            // [ ['huà'], ['fū'], ['rén'] ]
```

## 第二种 pinyin-pro
不亏死pro！



用起来是真的舒服！

```typescript
import { pinyin } from "pinyin-pro";

// 获取字符串格式拼音
pinyin("汉语拼音"); // 'hàn yǔ pīn yīn'

// 获取数组格式拼音
pinyin("汉语拼音", { type: "array" }); // ["hàn", "yǔ", "pīn", "yīn"]

// 获取不带音调格式拼音
pinyin("汉语拼音", { toneType: "none" }); // "han yu pin yin"

// 获取不带音调数组格式拼音
pinyin("汉语拼音", { toneType: "none", type: "array" }); // ["han", "yu", "pin", "yin"]

// 音调以数字形式显示
pinyin("汉语拼音", { toneType: "num" }); // "han4 yu3 pin1 yin1"

// 自动识别多音字
pinyin("睡着了"); // "shuì zháo le"
```

[https://www.npmjs.com/package/pinyin-pro](https://www.npmjs.com/package/pinyin-pro)

参考文档：[https://pinyin-pro.cn/use/pinyin.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%86%E9%9A%94%E7%AC%A6](https://pinyin-pro.cn/use/pinyin.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%86%E9%9A%94%E7%AC%A6)

# 实现代码
这下就简单了，直接进行字符串的转换:

```typescript
// 将传入的字符串转换为url友好的链接
// 如果是汉字，转换为拼音
export function NameToUrl(name: string) {
  // p// 获取不带声调的拼音
  const res = pinyin(name, {
    toneType: "none",
    separator: "-",
    nonZh: "consecutive",
  })

  return res
}

```







