---
title: 「加餐」关于Next Image你可能不知道的事情
urlname: fh0i0wlmcihk1f0s
date: '2024-10-09 13:19:12'
updated: '2024-10-09 13:31:17'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1728451253027-87e5e1dc-6464-4e01-b71c-2d976ffd7030.png'
description: 如果您使用过 Next.js，您可能遇到过 Next Image 组件。这种无忧的图像优化解决方案不仅提供对 webp 和 avif 等现代格式的支持，而且还生成针对不同屏幕尺寸定制的多个版本。要利用这种魔力，只需将以下代码添加到您的页面即可：import Image from 'next/i...
---
<font style="color:rgb(0, 0, 0);">如果您使用过 Next.js，您可能遇到过 Next Image 组件。这种无忧的图像优化解决方案不仅提供对 webp 和 avif 等现代格式的支持，而且还生成针对不同屏幕尺寸定制的多个版本。</font>

<font style="color:rgb(0, 0, 0);"></font>

<font style="color:rgb(0, 0, 0);">要利用这种魔力，只需将以下代码添加到您的页面即可：</font>

```typescript
import Image from 'next/image';

export default function Page() {
  return (
    <Image
      src="/profile.png"
      width={500}
  height={500}
  alt="Picture of the author"
    />
    );
}

```



<font style="color:rgb(0, 0, 0);">然而，与任何魔法一样，都需要有坚实的努力基础才能使其顺利发挥作用。在本文中，我们将探讨 Next Image 的工作原理，并澄清一些围绕它的常见误解。</font>

<font style="color:rgb(0, 0, 0);"></font>

# <font style="color:rgb(0, 0, 0);">核心架构</font>


`<font style="color:rgb(0, 0, 0);">next/image</font>`<font style="color:rgb(0, 0, 0);">的底层架构主要由三个组件组成：</font>

+ <font style="color:rgb(0, 0, 0);">React Next Image Component</font>
+ <font style="color:rgb(0, 0, 0);">Image API</font>
+ <font style="color:rgb(0, 0, 0);">Image Optimizer</font>

<font style="color:rgb(0, 0, 0);"></font>

![](https://oss1.aistar.cool/elog-offer-now/3035f01c1a6b2582042dd18b4656eb46.png)

### React
<font style="color:rgb(0, 0, 0);">该组件的主要功能是根据提供的属性生成正确的 HTML 图像输出，并构造多个要填充到</font>`<font style="color:rgb(0, 0, 0);">srcset</font>`<font style="color:rgb(0, 0, 0);">和</font>`<font style="color:rgb(0, 0, 0);">src</font>`<font style="color:rgb(0, 0, 0);">属性中的 URL。以下是下一个图像组件的输出示例：</font>

```typescript
<img 
  alt="Example"
  loading="lazy" 
  width="500" 
  height="500" 
  decoding="async" 
  data-nimg="1" 
  style="color:transparent" 
  srcset="/_next/image?url=%2Fimages%2Fexample.jpg&amp;w=640&amp;q=75 1x, 
      /_next/image?url=%2Fimages%2Fexample.jpg&amp;w=1080&amp;q=75 2x" 
  src="/_next/image?url=%2Fimages%2Fexample.jpg&amp;w=1080&amp;q=75"
>

```



<font style="color:rgb(0, 0, 0);">让我们仔细看看生成的 URL：</font>

```typescript
/_next/image?url=/images/example.jpg&w=640&q=75

```

<font style="color:rgb(0, 0, 0);">此编码 URL 接受两个参数： </font>`<font style="color:rgb(0, 0, 0);">w</font>`<font style="color:rgb(0, 0, 0);"> （宽度）和</font>`<font style="color:rgb(0, 0, 0);">q</font>`<font style="color:rgb(0, 0, 0);"> （质量），这两个参数在解码版本中更加明显。您可以发现没有</font>`<font style="color:rgb(0, 0, 0);">h</font>`<font style="color:rgb(0, 0, 0);"> （高度）属性，但我们将在本文后面讨论这一点。</font>

<font style="color:rgb(0, 0, 0);"></font>

### <font style="color:rgb(0, 0, 0);">Next Image API</font>
<font style="color:rgb(0, 0, 0);">Next Image API 用作图像代理，类似于</font>[<font style="color:rgb(0, 0, 0);">IPX</font>](https://github.com/unjs/ipx)<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">。它执行以下任务：</font>

+ <font style="color:rgb(0, 0, 0);">Accepts an</font><font style="color:rgb(0, 0, 0);"> </font>**<font style="color:rgb(0, 0, 0);">image URL</font>**<font style="color:rgb(0, 0, 0);">,</font><font style="color:rgb(0, 0, 0);"> </font>**<font style="color:rgb(0, 0, 0);">width</font>**<font style="color:rgb(0, 0, 0);">, and</font><font style="color:rgb(0, 0, 0);"> </font>**<font style="color:rgb(0, 0, 0);">quality</font>**<font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">接受</font>**<font style="color:rgb(0, 0, 0);">图像 URL</font>**<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">、</font>**<font style="color:rgb(0, 0, 0);">宽度</font>**<font style="color:rgb(0, 0, 0);">和</font>**<font style="color:rgb(0, 0, 0);">质量</font>**
+ <font style="color:rgb(0, 0, 0);">Validates parameters</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">验证参数</font>
+ <font style="color:rgb(0, 0, 0);">Determines cache control policies</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">确定缓存控制策略</font>
+ <font style="color:rgb(0, 0, 0);">Processes the image</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">处理图像</font>
+ <font style="color:rgb(0, 0, 0);">Serves the image in a format supported by the user's browser</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">以用户浏览器支持的格式提供图像</font>

<font style="color:rgb(0, 0, 0);">As things begin to make more sense, let's briefly discuss the final piece of the puzzle before we draw some conclusions from this arrangement.  
</font><font style="color:rgb(0, 0, 0);">随着事情开始变得更有意义，在我们从这种安排中得出一些结论之前，让我们先简要讨论一下这个难题的最后一块。</font>

<font style="color:rgb(0, 0, 0);"></font>

### <font style="color:rgb(0, 0, 0);">Image Optimizer</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">图像优化器</font>
<font style="color:rgb(0, 0, 0);">Next Image utilizes different image optimization libraries - Sharp or Squoosh - depending on certain conditions:</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">Next Image 根据特定条件使用不同的图像优化库 - Sharp 或 Squoosh：</font>

<font style="color:rgb(0, 0, 0);">Sharp is a fast and efficient image optimization Node.js module that makes use of the native</font><font style="color:rgb(0, 0, 0);"> </font>[<font style="color:rgb(0, 0, 0);">libvips</font>](https://github.com/libvips/libvips)<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">library.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">Sharp 是一个快速高效的图像优化 Node.js 模块，它利用本机</font>[<font style="color:rgb(0, 0, 0);">libvips</font>](https://github.com/libvips/libvips)<font style="color:rgb(0, 0, 0);">库。</font>

<font style="color:rgb(0, 0, 0);">Squoosh is a fully node-based image optimization solution. It's slower, but it doesn't require any additional libraries to be installed on a machine. For this reason, Sharp is recommended for production use, whereas Squoosh is used by default in local environments.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">Squoosh 是一个完全基于节点的图像优化解决方案。它速度较慢，但不需要在计算机上安装任何额外的库。因此，建议在生产环境中使用 Sharp，而在本地环境中默认使用 Squoosh。</font>

<font style="color:rgb(0, 0, 0);">I advise using Sharp in local environments as well. While both Sharp and Squoosh optimize images quite similarly, Sharp's compression algorithms can lead to color degradation compared to Squoosh.  
</font><font style="color:rgb(0, 0, 0);">我建议在本地环境中也使用 Sharp。虽然 Sharp 和 Squoosh 优化图像的方式非常相似，但与 Squoosh 相比，Sharp 的压缩算法可能会导致颜色退化。  
</font><font style="color:rgb(0, 0, 0);">This can result in visually different behavior between production and local environments, particularly when trying to match the background color of an image with the page background.  
</font><font style="color:rgb(0, 0, 0);">这可能会导致生产环境和本地环境之间出现视觉上不同的行为，特别是在尝试将图像的背景颜色与页面背景相匹配时。</font>

<font style="color:rgb(0, 0, 0);"></font>

## <font style="color:rgb(0, 0, 0);">Outcomes</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">结果</font>
<font style="color:rgb(0, 0, 0);">Having understood the primary architecture behind </font>`next/image`<font style="color:rgb(0, 0, 0);">, we can debunk common misconceptions and glean more insights on how to utilize it more effectively.  
</font><font style="color:rgb(0, 0, 0);">了解了</font>`next/image`<font style="color:rgb(0, 0, 0);">背后的主要架构后，我们可以揭穿常见的误解，并收集有关如何更有效地利用它的更多见解。</font>

<font style="color:rgb(0, 0, 0);"></font>

### <font style="color:rgb(0, 0, 0);">next/image does not crop</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">下一个/图像不裁剪</font>
<font style="color:rgb(0, 0, 0);">A common misconception among developers is that </font>`next/image`<font style="color:rgb(0, 0, 0);"> can crop their images. This confusion arises because you can pass width, height, and fill properties to the component, creating an impression that the image has been cropped. In reality, this isn't the case.  
</font><font style="color:rgb(0, 0, 0);">开发人员中的一个常见误解是</font>`next/image`<font style="color:rgb(0, 0, 0);">可以裁剪他们的图像。出现这种混乱的原因是您可以将宽度、高度和填充属性传递给组件，从而造成图像已被裁剪的印象。事实上，情况并非如此。  
</font><font style="color:rgb(0, 0, 0);">The Next Image component primarily requires width and height for assigning to the img tag to prevent layout shifts.  
</font><font style="color:rgb(0, 0, 0);">下一个图像组件主要需要分配给 img 标签的宽度和高度，以防止布局移位。</font>

![](https://oss1.aistar.cool/elog-offer-now/018d680a1660fd970482ba2c979d4482.png)



<font style="color:rgb(0, 0, 0);">As we've already discussed, the Image API does not accept a height parameter, meaning it currently isn't possible to change the original image's aspect ratio. If you don't use the fill property, the image will merely stretch or shrink in the event of width-height mismatches.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">正如我们已经讨论过的，图像 API 不接受高度参数，这意味着当前无法更改原始图像的长宽比。如果不使用 fill 属性，则在宽度高度不匹配的情况下，图像只会拉伸或收缩。</font>

<font style="color:rgb(0, 0, 0);">However, if you're using TailwindCSS, it behaves differently due to its default global CSS rule:  
</font><font style="color:rgb(0, 0, 0);">但是，如果您使用 TailwindCSS，由于其默认的全局 CSS 规则，它的行为会有所不同：</font>

```typescript
img,
video {
  max-width: 100%;
  height: auto;
}

```

<font style="color:rgb(0, 0, 0);">This makes layout shift issues harder to detect.  
</font><font style="color:rgb(0, 0, 0);">这使得布局移位问题更难以检测。</font>

<font style="color:rgb(0, 0, 0);"></font>

### <font style="color:rgb(0, 0, 0);">Displayed image width ≠ loaded image width</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">显示图像宽度≠加载图像宽度</font>
<font style="color:rgb(0, 0, 0);">Another potential point of confusion is that the width property passed to </font>`next/image`<font style="color:rgb(0, 0, 0);"> doesn't represent the actual width to which the image will be resized. As we noted from the example at the start of the article, passing </font>`width={500}`<font style="color:rgb(0, 0, 0);"> to a component will result in the image being resized to a width of 640px, as evident in the generated URL:  
</font><font style="color:rgb(0, 0, 0);">另一个潜在的混淆点是传递给</font>`next/image`<font style="color:rgb(0, 0, 0);"> width 属性并不代表图像将调整大小的实际宽度。正如我们在文章开头的示例中指出的，将</font>`width={500}`<font style="color:rgb(0, 0, 0);">传递给组件将导致图像大小调整为 640px 的宽度，如生成的 URL 所示：</font>

```typescript
/_next/image?url=/images/example.jpg&w=640&q=75
```

<font style="color:rgb(0, 0, 0);"></font>

<font style="color:rgb(0, 0, 0);">If you expect the x2 retina version to utilize an image width of 1000px or 1280px, you're in for a surprise. The actual width used will be 1080px. Naturally, you might wonder where these numbers are coming from.  
</font><font style="color:rgb(0, 0, 0);">如果您期望 x2 视网膜版本使用 1000 像素或 1280 像素的图像宽度，那么您将会感到惊讶。实际使用的宽度将为 1080px。当然，您可能想知道这些数字是从哪里来的。</font>

![](https://oss1.aistar.cool/elog-offer-now/86fd6f1c87b993a27ddf4e680e7191ba.png)



<font style="color:rgb(0, 0, 0);">Next.js resizes images to the closest size from an array of</font>`<font style="color:rgb(0, 0, 0);">deviceSizes</font>`<font style="color:rgb(0, 0, 0);"> and </font>`<font style="color:rgb(0, 0, 0);">imageSizes</font>`<font style="color:rgb(0, 0, 0);"> that you can define in </font>`<font style="color:rgb(0, 0, 0);">next.config.js</font>`<font style="color:rgb(0, 0, 0);">. By default, these are:  
</font><font style="color:rgb(0, 0, 0);">Next.js 将图像大小调整为您可以在</font>`next.config.js`<font style="color:rgb(0, 0, 0);">中定义的</font>`deviceSizes`<font style="color:rgb(0, 0, 0);">和</font>`imageSizes`<font style="color:rgb(0, 0, 0);">数组中最接近的大小。默认情况下，这些是：</font>

```typescript
module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

```

<font style="color:rgb(0, 0, 0);">What's crucial to note here is that using the default configuration can negatively impact performance, leading to a reduced score in Lighthouse's Page Speed Insights. This becomes particularly evident when you attempt to display large images on a page.  
</font><font style="color:rgb(0, 0, 0);">这里需要注意的重要一点是，使用默认配置会对性能产生负面影响，导致 Lighthouse 的页面速度洞察分数降低。当您尝试在页面上显示大图像时，这一点变得尤其明显。</font>  
<font style="color:rgb(0, 0, 0);">For instance, if you want to render an image with a width of 1250px, the actual loaded image width will be 1920px. The discrepancy between the required size and the actual loaded size becomes even greater for x2 retina versions, as these will be resized to 3840px.  
</font><font style="color:rgb(0, 0, 0);">例如，如果要渲染宽度为 1250px 的图像，则实际加载的图像宽度将为 1920px。对于 x2 视网膜版本，所需尺寸和实际加载尺寸之间的差异甚至更大，因为这些版本的尺寸将调整为 3840 像素。</font>  
<font style="color:rgb(0, 0, 0);">However, you can remedy this by adding more sizes to the </font>`<font style="color:rgb(0, 0, 0);">deviceSizes</font>`<font style="color:rgb(0, 0, 0);"> or </font>`<font style="color:rgb(0, 0, 0);">imageSizes</font>`<font style="color:rgb(0, 0, 0);"> arrays(</font>[docs](https://nextjs.org/docs/app/api-reference/components/image#devicesizes)<font style="color:rgb(0, 0, 0);">).  
</font><font style="color:rgb(0, 0, 0);">但是，您可以通过向</font>`deviceSizes`<font style="color:rgb(0, 0, 0);">或</font>`imageSizes`<font style="color:rgb(0, 0, 0);">数组添加更多尺寸来解决此问题（</font>[<font style="color:rgb(0, 0, 0);">文档</font>](https://nextjs.org/docs/app/api-reference/components/image#devicesizes)<font style="color:rgb(0, 0, 0);">）。</font>

![](https://oss1.aistar.cool/elog-offer-now/fa80d61edcf74feb87be01d508f8ef81.png)



### <font style="color:rgb(0, 0, 0);">Image optimization can be used without the next/image component</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">图像优化可以在没有next/image组件的情况下使用</font>
<font style="color:rgb(0, 0, 0);">With an understanding of the core architecture, it's easy to see that you can use the Image API without necessarily using</font><font style="color:rgb(0, 0, 0);"> </font>`next/image`<font style="color:rgb(0, 0, 0);">. There are several scenarios in which this can be beneficial.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">了解核心架构后，很容易看出您可以使用 Image API 而不必使用</font>`next/image`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">。在多种情况下，这可能是有益的。</font>

<font style="color:rgb(0, 0, 0);">First, you can render optimized images inside a canvas. Regardless of whether you're loading images onto a canvas from external sources or from local storage, you can pass the correct URL to the API and have it work seamlessly.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">首先，您可以在画布内渲染优化的图像。无论您是从外部源还是从本地存储将图像加载到画布上，您都可以将正确的 URL 传递给 API 并使其无缝运行。</font>

<font style="color:rgb(0, 0, 0);">Additionally, you can use it to optimize OG images or create your own</font><font style="color:rgb(0, 0, 0);"> </font>`<picture>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">tag-based component for better</font><font style="color:rgb(0, 0, 0);"> </font>[<font style="color:rgb(0, 0, 0);">art direction</font>](https://web.dev/codelab-art-direction/)<font style="color:rgb(0, 0, 0);">.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">此外，您可以使用它来优化 OG 图像或创建您自己的基于</font>`<picture>`<font style="color:rgb(0, 0, 0);">标签的组件，以获得更好的</font>[<font style="color:rgb(0, 0, 0);">艺术指导</font>](https://web.dev/codelab-art-direction/)<font style="color:rgb(0, 0, 0);">。</font>

<font style="color:rgb(0, 0, 0);">The Image API is located under the </font>`/_next/image`<font style="color:rgb(0, 0, 0);"> route and accepts just three additional parameters: URL, width (w), and quality (q).  
</font><font style="color:rgb(0, 0, 0);">Image API 位于</font>`/_next/image`<font style="color:rgb(0, 0, 0);">路径下，仅接受三个附加参数：URL、宽度 (w) 和质量 (q)。</font>

```typescript
/_next/image?url=https://example.com/test.jpg&w=640&q=75

```

<font style="color:rgb(0, 0, 0);">Remember, the width parameter is checked by the API and can only be a number sourced from either the deviceSizes or imageSizes configuration.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">请记住，宽度参数由 API 检查，并且只能是来自 deviceSizes 或 imageSizes 配置的数字。</font>

### <font style="color:rgb(0, 0, 0);">Use import for local images</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">使用导入本地图像</font>
<font style="color:rgb(0, 0, 0);">With </font>`next/image`<font style="color:rgb(0, 0, 0);">, there are two methods you can use to load local images:  
</font><font style="color:rgb(0, 0, 0);">使用</font>`next/image`<font style="color:rgb(0, 0, 0);"> ，您可以使用两种方法来加载本地图像：</font>

```typescript
import Image from 'next/image';
import profileImg from './profile.jpg';

export default function Page() {
  return (
    <>
      {/* Using absolute path */}
      <Image src="/profile.png" width={500} height={500} alt="Picture of the author" />
      {/* Using imported image via relative path */}
      <Image src={profileImg} alt="Picture of the author" />
    </>
  );
}

```



<font style="color:rgb(0, 0, 0);">Using an absolute path is common when dealing with local images in examples, tutorials, or even open-source projects. It's easy to assume that there's no significant difference aside from the automatic width/height assignment. However, there is a difference.  
</font><font style="color:rgb(0, 0, 0);">在处理示例、教程甚至开源项目中的本地图像时，使用绝对路径是很常见的。很容易假设除了自动宽度/高度分配之外没有显着差异。然而，还是有区别的。</font>  
<font style="color:rgb(0, 0, 0);">When you access images by an absolute path from a public folder, Next.js adheres to the cache policies of the destination server, which by default results in a 30-day cache policy rather than </font>`<font style="color:rgb(0, 0, 0);">public,max-age=31536000,immutable</font>`<font style="color:rgb(0, 0, 0);">. Using a 30-day cache policy for image assets can significantly lower your Lighthouse score.  
</font><font style="color:rgb(0, 0, 0);">当您通过公共文件夹的绝对路径访问图像时，Next.js 会遵守目标服务器的缓存策略，默认情况下会导致 30 天的缓存策略，而不是 </font>`public,max-age=31536000,immutable`<font style="color:rgb(0, 0, 0);"> 。对图像资源使用 30 天的缓存策略会显着降低您的 Lighthouse 分数。</font>

<font style="color:rgb(0, 0, 0);"></font>

### <font style="color:rgb(0, 0, 0);">Understanding Sizes and the 100vw Technique</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">了解尺寸和 100vw 技术</font>
<font style="color:rgb(0, 0, 0);">The </font>`next/image`<font style="color:rgb(0, 0, 0);"> component accepts a property known as 'sizes', akin to the html img sizes attribute. However, in line with other aspects we've discussed, it performs some unique operations too.  
</font>`next/image`<font style="color:rgb(0, 0, 0);">组件接受一个称为“sizes”的属性，类似于 html img 尺寸属性。然而，与我们讨论的其他方面一致，它也执行一些独特的操作。  
</font><font style="color:rgb(0, 0, 0);">The 'sizes' attribute works in concert with 'srcset' and accepts a list of browser conditions and image widths for which they should be activated. If you're unfamiliar with this, I recommend taking a look at </font>[<font style="color:rgb(0, 0, 0);">these docs</font>](https://www.dofactory.com/html/img/sizes)<font style="color:rgb(0, 0, 0);">, and this </font>[<font style="color:rgb(0, 0, 0);">codesandbox example</font>](https://codesandbox.io/s/hungry-brattain-vw78xf?file=/index.html:1653-1685)<font style="color:rgb(0, 0, 0);">. Here's an example of an image using 'sizes':  
</font><font style="color:rgb(0, 0, 0);">“sizes”属性与“srcset”协同工作，并接受应激活它们的浏览器条件和图像宽度列表。如果您对此不熟悉，我建议您查看</font>[<u><font style="color:rgb(0, 0, 0);">这些文档</font></u>](https://www.dofactory.com/html/img/sizes)<font style="color:rgb(0, 0, 0);">和这个</font>[<u><font style="color:rgb(0, 0, 0);">codesandbox</font></u><font style="color:rgb(0, 0, 0);"> 示例</font>](https://codesandbox.io/s/hungry-brattain-vw78xf?file=/index.html:1653-1685)<font style="color:rgb(0, 0, 0);">。这是使用“尺寸”的图像示例：</font>

<font style="color:rgb(0, 0, 0);"></font>

```typescript
<img srcset="/img/html/vangogh-sm.jpg 120w,
             /img/html/vangogh.jpg 193w,
             /img/html/vangogh-lg.jpg 278w"
     sizes="(max-width: 710px) 120px,
            (max-width: 991px) 193px,
            278px">

```

<font style="color:rgb(0, 0, 0);">Let's dive into the details for better understanding. When you utilize Next Image without specifying the 'sizes' property, your 'srcset' will include two URLs: one for the standard version (x1) and another for the Retina version (x2).  
</font><font style="color:rgb(0, 0, 0);">让我们深入了解细节以便更好地理解。当您使用 Next Image 而不指定“sizes”属性时，您的“srcset”将包含两个 URL：一个用于标准版本 (x1)，另一个用于 Retina 版本 (x2)。  
</font><font style="color:rgb(0, 0, 0);">With this setup, the browser will invariably opt for the Retina version when used on a Retina device. This preference arises due to the use of 1x and 2x syntax within the 'srcset'.  
</font><font style="color:rgb(0, 0, 0);">通过此设置，在 Retina 设备上使用时，浏览器将始终选择 Retina 版本。这种偏好的产生是由于在“srcset”中使用了 1x 和 2x 语法。</font>

```typescript
<img
  srcset="
    /_next/image?url=%2Fimages%2Fexample.jpg&amp;w=640&amp;q=75  1x,
    /_next/image?url=%2Fimages%2Fexample.jpg&amp;w=1080&amp;q=75 2x
  "
/>

```

<font style="color:rgb(0, 0, 0);">The browser essentially interprets this as: "Load this URL for 2x pixel density, and this other one for 1x pixel density." Thus, if you have a design where the image version on desktop is smaller than on mobile or tablet, the browser will consistently load the larger version with the default Next Image syntax.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">浏览器基本上将其解释为：“以 2 倍像素密度加载此 URL，以 1 倍像素密度加载另一个 URL。”因此，如果您的设计中桌面上的图像版本小于移动设备或平板电脑上的图像版本，则浏览器将始终使用默认的 Next Image 语法加载较大的版本。</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">Unfortunately, this could result in suboptimal performance and a lower Lighthouse score.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">不幸的是，这可能会导致性能不佳和 Lighthouse 得分较低。</font>

<font style="color:rgb(0, 0, 0);">There is, however, a method to instruct the browser to load images based on suitable width. Instead of providing 1x, 2x parameters to the 'srcset' URL, you specify the width of the image. For example, check these instructions to the browser:  
</font><font style="color:rgb(0, 0, 0);">然而，有一种方法可以指示浏览器根据合适的宽度加载图像。您无需向“srcset”URL 提供 1x、2x 参数，而是指定图像的宽度。例如，检查浏览器的以下说明：</font>

```typescript
<img
  srcset="
    /_next/image?url=%2Fimages%2Fexample.jpg&amp;w=640&amp;q=75   640w,
    /_next/image?url=%2Fimages%2Fexample.jpg&amp;w=1080&amp;q=75 1080w
  "
/>

```

<font style="color:rgb(0, 0, 0);">In this case, the browser selects the most appropriate image for the current size used on the page. If a mobile image has a width of 600px (1200px for Retina), it will choose the</font><font style="color:rgb(0, 0, 0);"> </font>`1080w`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">version. Meanwhile, if a desktop image only uses 300px (600px for Retina), the browser opts for</font><font style="color:rgb(0, 0, 0);"> </font>`640w`<font style="color:rgb(0, 0, 0);">.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">在这种情况下，浏览器会选择最适合页面当前使用尺寸的图像。如果移动图像的宽度为 600px（Retina 为 1200px），它将选择</font>`1080w`<font style="color:rgb(0, 0, 0);">版本。同时，如果桌面图像仅使用 300px（Retina 为 600px），则浏览器会选择</font>`640w`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">。</font>

<font style="color:rgb(0, 0, 0);">The advantage of this approach lies in loading the most fitting images for the current screen size, thereby enhancing performance due to reduced image size. Now that we understand the benefits, we can apply this strategy with Next Image using the</font><font style="color:rgb(0, 0, 0);"> </font>`100vw`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">trick. While you cannot directly instruct Next Image to use the width (</font>`w`<font style="color:rgb(0, 0, 0);">) parameters near the URL instead of pixel-density (</font>`1x`<font style="color:rgb(0, 0, 0);">**) options, you can apply a workaround arising from how Next Image is coded:</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">这种方法的优点在于加载最适合当前屏幕尺寸的图像，从而由于减小图像尺寸而提高性能。现在我们了解了好处，我们可以使用</font>`100vw`<font style="color:rgb(0, 0, 0);">技巧将此策略应用于 Next Image。虽然您无法直接指示 Next Image 使用 URL 附近的宽度 (</font><font style="color:rgb(0, 0, 0);"> </font>`w`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">) 参数而不是像素密度 (</font><font style="color:rgb(0, 0, 0);"> </font>`1x`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">**) 选项，但您可以应用由 Next Image 编码方式产生的解决方法：</font>

1. <font style="color:rgb(0, 0, 0);">If your 'sizes' attribute contains</font><font style="color:rgb(0, 0, 0);"> </font>`vw`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">numbers, it will only keep those sizes larger than the smallest</font><font style="color:rgb(0, 0, 0);"> </font>`deviceSize`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">(640 by default) multiplied by the percentage(</font>`100vw`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">= 1,</font><font style="color:rgb(0, 0, 0);"> </font>`50vw`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">= 0.5). Specifying</font><font style="color:rgb(0, 0, 0);"> </font>`100vw`<font style="color:rgb(0, 0, 0);">, you will end up with 8 URLs.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">如果您的“sizes”属性包含</font>`vw`<font style="color:rgb(0, 0, 0);">数字，则只会保留大于最小</font>`deviceSize`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">（默认为 640）乘以百分比（</font><font style="color:rgb(0, 0, 0);"> </font>`100vw`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">= 1,</font><font style="color:rgb(0, 0, 0);"> </font>`50vw`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">= 0.5）的尺寸。指定</font>`100vw`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">，您最终将得到 8 个 URL。</font>
2. <font style="color:rgb(0, 0, 0);">If your 'sizes' property has non-</font>`vw`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">numbers, your 'srcset' will contain ALL SIZES (i.e., all possible combinations of</font><font style="color:rgb(0, 0, 0);"> </font>`deviceSizes`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">and</font><font style="color:rgb(0, 0, 0);"> </font>`imageSizes`<font style="color:rgb(0, 0, 0);">), yielding a total of 16 URLs.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">如果您的“sizes”属性具有非</font>`vw`<font style="color:rgb(0, 0, 0);">编号，则您的“srcset”将包含所有 SIZES（即</font>`deviceSizes`<font style="color:rgb(0, 0, 0);">和</font>`imageSizes`<font style="color:rgb(0, 0, 0);">的所有可能组合），总共产生 16 个 URL。</font>

<font style="color:rgb(0, 0, 0);">To illustrate, let's examine the generated code for</font><font style="color:rgb(0, 0, 0);"> </font>`100vw`<font style="color:rgb(0, 0, 0);">:</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">为了说明这一点，让我们检查一下</font>`100vw`<font style="color:rgb(0, 0, 0);">生成的代码：</font>

```typescript
<img
 sizes="100vw"
 srcset="
 /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexample.6be618a3.jpg&amp;w=640&amp;q=75 640w,
 /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexample.6be618a3.jpg&amp;w=750&amp;q=75 750w,
 /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexample.6be618a3.jpg&amp;w=828&amp;q=75 828w,
 /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexample.6be618a3.jpg&amp;w=1080&amp;q=75 1080w,
 /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexample.6be618a3.jpg&amp;w=1200&amp;q=75 1200w,
 /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexample.6be618a3.jpg&amp;w=1920&amp;q=75 1920w,
 /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexample.6be618a3.jpg&amp;w=2048&amp;q=75 2048w,
 /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexample.6be618a3.jpg&amp;w=3840&amp;q=75 3840w
 "
 src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexample.6be618a3.jpg&amp;w=3840&amp;q=75"
/>
```

<font style="color:rgb(0, 0, 0);">If you include a</font><font style="color:rgb(0, 0, 0);"> </font>`px`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">value within 'sizes'(eg.</font><font style="color:rgb(0, 0, 0);"> </font>`(max-width: 1024px) 800px, 300px`<font style="color:rgb(0, 0, 0);">), the list of URLs expands even further, reaching 16 in a default configuration.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">如果您在“尺寸”中包含</font>`px`<font style="color:rgb(0, 0, 0);">值（例如</font><font style="color:rgb(0, 0, 0);"> </font>`(max-width: 1024px) 800px, 300px`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">），URL 列表进一步扩展，在默认配置下达到 16 个。</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">Ideally, I would prefer to generate 4 URLs for a specific image, similar to other frameworks, rather than bloating the HTML with many unnecessary options, none of which may be perfectly sized for my needs.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">理想情况下，我更愿意为特定图像生成 4 个 URL，类似于其他框架，而不是用许多不必要的选项来使 HTML 膨胀，而这些选项的大小都可能无法完美满足我的需求。</font>

<font style="color:rgb(0, 0, 0);">This discussion underscores a key point: to populate 'srcset' with more versions for better performance across a variety of resolutions, you can simply set 'sizes' to</font><font style="color:rgb(0, 0, 0);"> </font>`100vw`<font style="color:rgb(0, 0, 0);">. This trick forces the creation of URLs for 8 sizes, starting from 640px.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">此讨论强调了一个关键点：要使用更多版本填充“srcset”以在各种分辨率下获得更好的性能，您可以简单地将“sizes”设置为</font>`100vw`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">。这个技巧强制创建 8 种尺寸的 URL，从 640px 开始。</font>

<font style="color:rgb(0, 0, 0);">However, because this method can easily inflate your HTML size - especially if you've added extra</font><font style="color:rgb(0, 0, 0);"> </font>`imageSizes`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">or</font><font style="color:rgb(0, 0, 0);"> </font>`deviceSizes`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">- it's recommended to apply this approach carefully.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">但是，由于此方法很容易增大 HTML 大小 - 特别是如果您添加了额外的</font>`imageSizes`<font style="color:rgb(0, 0, 0);">或</font>`deviceSizes`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">- 建议谨慎应用此方法。</font>

<font style="color:rgb(0, 0, 0);">While I can only speculate about the exact reasoning behind this architecture, I assume that for large-scale projects with various image ratios used in many different places, this approach of generating average-sized versions might prove beneficial.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">虽然我只能推测这种架构背后的确切原因，但我认为对于在许多不同地方使用不同图像比例的大型项目，这种生成平均大小版本的方法可能会被证明是有益的。</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">These versions could cater to most scenarios and potentially hit the cache more frequently, all the while maintaining ease of use.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">这些版本可以满足大多数场景，并可能更频繁地访问缓存，同时保持易用性。</font>

## <font style="color:rgb(0, 0, 0);">Conclusions</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">结论</font>
<font style="color:rgb(0, 0, 0);">Though Next Image simplifies image management and provides significant advantages, it could benefit from additional features like advanced cropping and precise resizing, similar to third-party solutions. Incorporating a specialized</font><font style="color:rgb(0, 0, 0);"> </font>`<picture>`<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">component for fine-tuned art direction would also be advantageous. I'd particularly appreciate an automated method for generating four image versions at 0.25x, 0.5x, 1x, and 2x the supplied width.</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">尽管 Next Image 简化了图像管理并提供了显着的优势，但它可以受益于高级裁剪和精确调整大小等附加功能，类似于第三方解决方案。结合专门的</font>`<picture>`<font style="color:rgb(0, 0, 0);">组件进行微调艺术指导也将是有利的。我特别欣赏一种自动方法，可以生成 0.25 倍、0.5 倍、1 倍和 2 倍提供宽度的四个图像版本。</font>

<font style="color:rgb(0, 0, 0);">Nevertheless, for most use cases, the developer experience and efficiency of Next Image will more than enough.  
</font><font style="color:rgb(0, 0, 0);">尽管如此，对于大多数用例来说，Next Image 的开发者体验和效率已经足够了。</font>



原文：[https://pixelpoint.io/blog/next-image/](https://pixelpoint.io/blog/next-image/)

