import { IllustrationNotFound } from '@/components/illustrations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <div className="flex flex-col h-screen place-items-center space-y-3">
      <IllustrationNotFound className="size-[320px]" />
      <h3 className="text-center text-2xl font-semibold tracking-tight">
        Oh no,页面未找到
      </h3>
      <Button>
        <Link href="/">返回首页</Link>
      </Button>
    </div>
  );
}
