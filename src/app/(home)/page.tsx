import { CodeEditor } from "@/components/code-editor";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cursor 中文文档 - 首页",
  description: "Cursor 中文文档实时同步官方最新内容，翻译专业，助你快速上手。",
  keywords: "Cursor, 中文文档, AI 编辑器, 翻译工具, 开发者工具",
  openGraph: {
    title: "Cursor 中文文档",
    description: "实时同步官方最新内容，翻译专业，助你无障碍上手 Cursor。",
    url: "https://cursor-cn.org",
    siteName: "Cursor 中文文档",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Cursor 中文文档",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/gradient-hero-prerender.jpg"
          alt="Colorful background"
          fill
          priority
          className="object-cover"
        />
      </div>
      {/* Content */}
      <div className="container mx-auto px-4 pt-20 md:pt-32 pb-16 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          AI 代码编辑器
        </h1>
        <p className="text-xl md:text-2xl text-white font-mono mb-10">
          中文文档实时同步官方最新内容，翻译专业，助你无障碍上手 Cursor。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="https://www.cursor.com/downloads"
            className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
            </svg>
            下载 Windows
          </Link>
          <Link
            href="https://www.cursor.com/downloads"
            className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            所有下载
          </Link>
        </div>
      </div>

      {/* Code Editor */}
      <div className="w-full max-w-5xl mx-auto px-4 relative z-10 mb-16">
        <CodeEditor />
      </div>
      <footer className="w-full text-center pb-8 relative z-20">
        <p className="text-xs text-white/60 font-mono">
          本项目仅为 Cursor 官方文档的中文翻译，与 Cursor
          官方及其公司无任何关联。若有侵权请联系删除。
        </p>
      </footer>
    </main>
  );
}
