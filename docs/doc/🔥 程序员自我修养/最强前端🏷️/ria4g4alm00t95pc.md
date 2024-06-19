---
title: react-use-form的onSubmit没有被触发
urlname: ria4g4alm00t95pc
date: '2024-06-19 23:12:59'
updated: '2024-06-19 23:13:08'
cover: 'https://cdn.nlark.com/yuque/0/2024/png/22382235/1710676279519-3f43cddc-21c7-43de-acf1-e48fd6818ce0.png'
description: '背景今天在写Nextjs代码的时候，发现一个问题，我使用react-use-form的表单，点击提交按钮的时候：onSubmit没有被触发！！于是排查···源代码如下："use client"  import { AddLinkRequest } from ''@/app/api/link/ad...'
---
# 背景
今天在写Nextjs代码的时候，发现一个问题，我使用react-use-form的表单，**点击提交按钮的时候：onSubmit没有被触发！！**
**于是排查···**
**源代码如下：**
```jsx
"use client"

import { AddLinkRequest } from '@/app/api/link/add/route';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCircle } from 'react-icons/fi';


export default function AddLinkModal({ category, isOpen, onClose }: any) {
    const { register, handleSubmit, formState: { errors, isLoading } } = useForm();

    const onSubmit = async (data: any) => {
        console.log(data);
        console.log("cur data")

        // 构造更新类目请求体，从form里获取
        const newLinkData: AddLinkRequest = {
            title: '新分类',
            icon: 'https://cos.codefe.top/images/uinotes-icon.svg',
            description: '新分类的描述新分类的描述新分类的描述新分类的描述新分类的描述新分类的描述新分类的描述新分类的描述新分类的描述新分类的描述',
            userId: 0,
            rank: 0,
            url: 'https://cos.codefe.top/images/uinotes-icon.svg',
            categoryId: 3
        };

        try {
            const response = await addLink(newLinkData);

            if (!response.ok) {
                throw new Error(`${response.statusText}`);
            }

            const result = await response.json();
            console.log(result);
            onClose(); // 关闭弹窗
        } catch (error) {
            console.error('添加链接失败', error);
        }
    };

    if (!isOpen) return null;

    return (
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        <div className="/50 fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-80">
            <div className=" rounded bg-white p-2 shadow-lg md:p-5">
                <div className="modal-header mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">新Link</h3>
                    <button onClick={() => {
                        onClose()
                    }} className="text-md w-6 rounded-sm bg-slate-200 hover:bg-slate-500 focus:outline-none">
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-bold " htmlFor="category">
                            类别
                        </label>
                        <input
                            id="category"
                            disabled={true}
                            value={category.title}
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight  shadow focus:outline-none"
                            {...register('category', { required: true })}
                        ></input>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-bold " htmlFor="title">
                            名称
                        </label>
                        <input
                            type="text"

                            {...register('title', { required: true })}
                            id="title"
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight  shadow focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-bold " htmlFor="url">
                            地址
                        </label>
                        <input
                            type="text"
                            {...register('url', { required: true })}
                            id="url"
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight  shadow focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-bold " htmlFor="description">
                            描述
                        </label>
                        <textarea
                            {...register('description', { required: true })}
                            id="description"
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight  shadow focus:outline-none"
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            //loading态度
                            disabled={isLoading}
                            onClick={handleSubmit(onSubmit)}
                            className="focus:shadow-outline rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-600 focus:outline-none"
                        >
                            {isLoading ? <FiCircle /> : '添加'} {/* 根据加载状态切换按钮文本 */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    async function addLink(newLinkData: AddLinkRequest) {
        return await fetch("/api/link/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLinkData),
        });
    }
}
```
# 解决
翻阅了无数资料，终于找到了原因！！！[https://github.com/orgs/react-hook-form/discussions/8372](https://github.com/orgs/react-hook-form/discussions/8372)
根本原因是，表单有err！ 所以直接在submit前就被拦截了！
如何检测呢？增加一个函数+一个参数：
```
const onInvalid = (errors) => console.error(errors)

handleSubmit(onSubmit, onInvalid)
```
在我的项目里，我终于看到控制台输出错误了···
![image.png](https://oss1.aistar.cool/elog-offer-now/08a139fc87c21fa07e1ed09e8fefbe5c.png)
原来是参数错了！！
over！
