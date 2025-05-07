import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
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
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl text-white mb-6">页面未找到</h2>
        <p className="text-white/80 mb-8">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <Link
          href="/"
          className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </main>
  );
}
