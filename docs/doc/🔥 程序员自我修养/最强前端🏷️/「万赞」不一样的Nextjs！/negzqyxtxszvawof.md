---
title: 「项目」开发一个导航网站
urlname: negzqyxtxszvawof
date: '2024-09-30 22:40:04'
updated: '2024-10-08 08:52:01'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1727781047419-0223592a-fe80-4c9b-b389-4e833643c4f9.png'
description: '背景在工作学习中，发现一个问题，那就是有一个导航网站非常重要！无意之中，看到一个很棒的导航网站，打算基于此开发一个，记录一下开发的过程。Demo仓库：https://github.com/wangfengyuan/frontend-nav记录tailwindcss的scrollbarhttps...'
---
# 背景
在工作学习中，发现一个问题，那就是有一个导航网站非常重要！



无意之中，看到一个很棒的导航网站，打算基于此开发一个，记录一下开发的过程。



Demo仓库：[https://github.com/wangfengyuan/frontend-nav](https://github.com/wangfengyuan/frontend-nav)



# 记录
## tailwindcss的scrollbar
[https://adoxography.github.io/tailwind-scrollbar/examples](https://adoxography.github.io/tailwind-scrollbar/examples)



## prisma的env没有读取到dababase_url
参考这个帖子：

[https://stackoverflow.com/questions/67796217/prisma-getting-environment-variable-not-found-error-message-when-running-graph](https://stackoverflow.com/questions/67796217/prisma-getting-environment-variable-not-found-error-message-when-running-graph)

[https://www.prisma.io/docs/orm/more/development-environment/environment-variables/managing-env-files-and-setting-variables#manage-env-files-manually](https://www.prisma.io/docs/orm/more/development-environment/environment-variables/managing-env-files-and-setting-variables#manage-env-files-manually)

两种解法：

1、安装dotenv

2、直接env.local改名为env



## 登陆怎么做？
### 测试账号
```typescript
test1997321@qq.com
  test1997322@qq.com
    test1997323@qq.com
    test1997324@qq.com
      test1997325@qq.com
      test1997326@qq.com ** admin
123456789	

email: '1373685219@qq.com',
  password: 'leilei1997321me',
```



### <font style="color:rgb(17, 17, 17);">bcrypt-ts到底怎么用?</font>
！！！注意！不能够把加盐的函数直接去比较，因为每次生产的都是不一样的！

![](https://oss1.aistar.cool/elog-offer-now/5b3f4eb25fd2485c267fac74c6ab1b25.png)







+ 如果是Github模式

0、参考[https://authjs.dev/getting-started/authentication/oauth](https://authjs.dev/getting-started/authentication/oauth)

1、先在github申请appid和secret，填写url链接

2、而后在nextjs的env中写上

![](https://oss1.aistar.cool/elog-offer-now/dafedf58f2ded0e54eaa829f0e455ba8.png)





+ 如果是账号密码模式

[https://authjs.dev/getting-started/authentication/credentials](https://authjs.dev/getting-started/authentication/credentials)

![](https://oss1.aistar.cool/elog-offer-now/8bf25afc09f6f8a26eddac0ae674ff08.png)



必须这样！！！官方文档是错的！！

![](https://oss1.aistar.cool/elog-offer-now/225bfa5746d131c00f74d01b18afb545.png)



### from的action类型错误?
不用管···



[https://www.reddit.com/r/nextjs/comments/1616bh9/form_action_not_working/](https://www.reddit.com/r/nextjs/comments/1616bh9/form_action_not_working/)

[https://github.com/vercel/next.js/discussions/56581](https://github.com/vercel/next.js/discussions/56581)



### client和server的调用方式不一样··
![](https://oss1.aistar.cool/elog-offer-now/b2ccc78c2593e903422fa45202e206f7.png)



![](https://oss1.aistar.cool/elog-offer-now/014c40e2908cf8a21fd4b2d44a3ab495.png)



### 客户端的组件又报错了CSRF···
![](https://oss1.aistar.cool/elog-offer-now/eacc76c02bab8c968a0d4a5c744a1d9a.png)



发现是环境变量错了，直接注释掉就行：

![](https://oss1.aistar.cool/elog-offer-now/fea872cb19874f9f49372edc3a78501c.png)

## shadcn/ui的Button没有loading，怎么办？
直接参考这个文章：[https://blog.typeart.cc/add-loading-spinner-in-shadcn-ui-button/](https://blog.typeart.cc/add-loading-spinner-in-shadcn-ui-button/)



```typescript
+ import { Loader2 } from 'lucide-react';


// ... 略過前面 cva 部份

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
+  loading?: boolean;
}

// 將 loading 與 children 從 props 取出來
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
+  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
+        disabled={loading}
        ref={ref}
        {...props}
      >
+        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';
```

## 怎么使用safe-server-action？
官方文档：[https://next-safe-action.dev/](https://next-safe-action.dev/)



## Zod应该怎么使用？比如声明了一个结构体，应该怎么赋值呢？
官方文档：[https://zod.dev/?id=basic-usage](https://zod.dev/?id=basic-usage)



这样:

```typescript
import { z } from "zod";

const User = z.object({
  username: z.string(),
});

User.parse({ username: "Ludwig" });

// extract the inferred type
type User = z.infer<typeof User>;
// { username: string }
```

## 怎么实现选择Emoji？
![](https://oss1.aistar.cool/elog-offer-now/aa0b3d1e7f8789bfd4e1e11e5b236816.png)



如上图，我需要在这个输入框，可以选择表情或者分组地址。



找到一个库，在这里：[https://ealush.com/emoji-picker-react/](https://ealush.com/emoji-picker-react/)

很好用，可以选择屏蔽某些不需要的Emoji，比如Flag····



当选择表情之后，会有一个callBack，输出的内容是当前的表情信息：

```typescript
{
    "activeSkinTone": "neutral",
    "emoji": "😆",
    "imageUrl": "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f606.png",
    "isCustom": false,
    "names": [
        "laughing",
        "satisfied",
        "smiling face with open mouth and tightly-closed eyes"
    ],
    "unified": "1f606",
    "unifiedWithoutSkinTone": "1f606"
}
```

## 发现一个问题useAction的操作是异步的！
```typescript
// 调用Action进行更新
  const AddCategoryAction = useAction(AddCategory)

<Button
            type="submit"
            variant="default"
            loading={AddCategoryAction.isPending}
            onClick={async () => {
              await AddCategoryAction.execute(newCategory)
              mylog("AddCategoryAction res", AddCategoryAction.result)

              if (AddCategoryAction.hasErrored) {
                mylog(
                  "AddCategory Err",
                  AddCategoryAction.result.validationErrors
                )
                toast(
                  JSON.stringify(AddCategoryAction.result.validationErrors) ??
                    "分类添加失败，请重试"
                )
              } else {
                toast("分类添加成功")
                // window.location.reload()
              }
            }}
          >
            保存
          </Button>
```

由于是hook来的，在onclick函数里是异步的，造成数据不一致，怎么办啊！



两种方法：

1、换成使用const res = await AddCategoryAction.**executeAsync**(newCategory)



2、使用useEffect来监听



```typescript
useEffect(() => {
    if (!AddCategoryAction.isPending) {
      if (AddCategoryAction.hasErrored) {
        toast(
          JSON.stringify(AddCategoryAction.result.validationErrors) ??
            "分类添加失败，请重试"
        )
      } else {
        toast("分类添加成功")
        // 你可以在这里执行其他操作，比如关闭对话框或重置表单
      }
    }
  }, [
    AddCategoryAction.isPending,
    AddCategoryAction.hasErrored,
    AddCategoryAction.result,
  ])
```

## Icon可以选择的网站~


[https://lucide.dev/guide/packages/lucide-react](https://lucide.dev/guide/packages/lucide-react)



## 如何从结构体中去除某个字段？-Omit
在 TypeScript 中没有严格意义上的“结构体”概念，但可以通过对象类型或接口来模拟。要从一个对象中去除某个字段，可以通过类型断言和对象解构的方式来实现。

假设你有一个类型如下：

```typescript
interface MyType {
  field1: string;
  field2: number;
  field3: boolean;
}
```

现在要去除 `field2` 字段，可以这样做：

```typescript
const obj: MyType = { field1: 'some string', field2: 123, field3: true };

const { field2,...rest } = obj;

const newObj = rest as Omit<MyType, 'field2'>;
console.log(newObj);
```

这里使用了对象解构和类型断言来创建一个新的对象，不包含指定的字段。

或者可以使用 `Omit` 类型工具来创建一个新的类型，然后将原对象转换为新类型：

```typescript
type NewType = Omit<MyType, 'field2'>;

const newObj2: NewType = obj as NewType;
console.log(newObj2);
```

## 遇到一个问题form的值没有更新啊！SetValue
有一个issue已经提到了：[https://github.com/react-hook-form/react-hook-form/issues/456](https://github.com/react-hook-form/react-hook-form/issues/456)



其实关键在于SetValue不会导致form的组件重新更新。



如果想实现setValue之后，组件内容更新，需要useEffect进行组件re-render。



## diaglog里的form数据没有被清空。
发现新建一个分类之后，再次点开新建，里面的内容还是上一次保存的数据，因此需要做一次清空。

![](https://oss1.aistar.cool/elog-offer-now/7e7a3ca698b98f5fe7d2e4c995ebee43.png)

## TODO 图片尺寸不对···
![](https://oss1.aistar.cool/elog-offer-now/f4de64e9a4eb419ac16e4bf5cacdc5ee.png)

源代码如下：

![](https://oss1.aistar.cool/elog-offer-now/a5313ba3b7c3cea1da0354b7dc945abc.png)



到底什么原因呢？



## 部署在vercel之后，一直报错Prisma is not defined
谷歌了半天，一直没找到问题出在哪··



发现是没有import····为什么编辑器没有提示啊？

![](https://oss1.aistar.cool/elog-offer-now/a08087d143007e00c946bee258021f86.png)



## TODO 怎么实现点击url跳转对应的页面，但是url不变？


