"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("error js", error);
  }, [error]);

  return (
    <div className="prose mx-auto flex flex-col items-center justify-center space-y-3 pt-20">
      <h2>不好意思,网站好像出现问题了,烦请刷新重试</h2>
      <p>如果一直出现问题,你可以联系我们处理</p>
      <p>你可以：</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            reset();
            router.refresh();
          }
        }
      >
        1：再试一次
      </Button>

      <Button
        onClick={() => {
          // Attempt to recover by trying to re-render the segment
          router.push("/");
          return;
        }}
      >
        2：返回主页
      </Button>
    </div>
  );
}
