"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/gradient-hero-prerender.jpg"
          alt="Colorful background"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl font-bold text-white mb-4">出错了</h1>
        <h2 className="text-2xl text-white mb-6">页面加载失败</h2>
        <p className="text-white/80 mb-8">抱歉，加载页面时发生错误。</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            重试
          </button>
          <Link
            href="/"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    </main>
  );
}
