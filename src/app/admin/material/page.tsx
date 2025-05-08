"use client";

import ImageUpload from "@/components/ImageUpload";
import { useState, useEffect } from "react";
import { IoMdCopy } from "react-icons/io";
import { FiCheck } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MaterialUploadAdmin() {
  const [imageUrl, setImageUrl] = useState("");
  const [originalFileName, setOriginalFileName] = useState("material");
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  // 显示上传错误信息
  const handleUploadError = (err: any) => {
    console.error("上传错误:", err);
    setError(typeof err === "string" ? err : JSON.stringify(err, null, 2));
  };

  // 处理图片上传完成
  const handleImageChange = (url: string, fileName?: string) => {
    setImageUrl(url);
    if (fileName) {
      setOriginalFileName(fileName);
    }
  };

  // 复制文本到剪贴板
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess(type);
        setTimeout(() => setCopySuccess(null), 2000);
      },
      () => {
        alert("复制失败，请手动复制");
      }
    );
  };

  // 生成Markdown格式的图片链接，使用原始文件名
  const getMarkdownLink = () => {
    return `![${originalFileName}.webp](${imageUrl})`;
  };

  // 处理图片URL更新
  useEffect(() => {
    if (imageUrl) {
      // 重置图片加载状态
      setImageLoaded(false);
      setImageError(false);
    }
  }, [imageUrl]);

  // 处理图片加载错误，防止跳转错误页面
  const handleImageError = () => {
    console.error("图片加载失败:", imageUrl);
    setImageError(true);
  };

  // 处理图片加载成功
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">材料上传</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">
          使用此工具上传材料图片，图片将自动上传并存储到 Cloudflare R2。
        </p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 overflow-auto">
            <h3 className="font-medium mb-2">上传错误：</h3>
            <pre className="text-sm whitespace-pre-wrap">{error}</pre>
          </div>
        )}

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">上传图片</h2>
          <ImageUpload
            value={imageUrl}
            onChange={handleImageChange}
            onError={handleUploadError}
          />
        </div>

        {imageUrl && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">已上传图片预览：</h3>

            <div
              className="relative rounded overflow-hidden"
              style={{ height: "300px", maxWidth: "100%" }}
            >
              {imageError ? (
                <div className="flex items-center justify-center h-full bg-gray-100 border rounded">
                  <p className="text-red-500">图片加载失败，但URL已成功生成</p>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  {/* unoptimized 属性允许加载任何域的图片 */}
                  <Image
                    src={imageUrl}
                    alt={`${originalFileName}.webp`}
                    fill
                    className="object-contain rounded border shadow"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    unoptimized // 为 R2 等外部存储使用 unoptimized
                  />
                </div>
              )}
            </div>

            {/* 显示和复制URL */}
            <div className="mt-4 space-y-3">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="image-url"
                  className="font-medium text-sm text-gray-700"
                >
                  图片 URL:
                </label>
                <div className="flex items-center">
                  <input
                    id="image-url"
                    type="text"
                    readOnly
                    value={imageUrl}
                    aria-label="图片URL"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(imageUrl, "url")}
                    className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md flex items-center"
                    title="复制URL"
                    aria-label="复制图片URL"
                  >
                    {copySuccess === "url" ? (
                      <FiCheck size={18} />
                    ) : (
                      <IoMdCopy size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="markdown-url"
                  className="font-medium text-sm text-gray-700"
                >
                  Markdown 格式:
                </label>
                <div className="flex items-center">
                  <input
                    id="markdown-url"
                    type="text"
                    readOnly
                    value={getMarkdownLink()}
                    aria-label="Markdown格式的图片链接"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm font-mono"
                  />
                  <button
                    onClick={() =>
                      copyToClipboard(getMarkdownLink(), "markdown")
                    }
                    className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-r-md flex items-center"
                    title="复制Markdown"
                    aria-label="复制Markdown格式"
                  >
                    {copySuccess === "markdown" ? (
                      <FiCheck size={18} />
                    ) : (
                      <IoMdCopy size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* 文件名编辑区域 */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="file-name"
                  className="font-medium text-sm text-gray-700"
                >
                  自定义描述名称:
                </label>
                <div className="flex items-center">
                  <input
                    id="file-name"
                    type="text"
                    value={originalFileName}
                    onChange={(e) => setOriginalFileName(e.target.value)}
                    aria-label="文件名"
                    placeholder="输入自定义描述名称"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  修改此名称将更改Markdown格式中的图片描述，但不会更改实际URL
                </p>
              </div>

              {copySuccess && (
                <div className="text-sm text-green-600 font-medium py-1">
                  {copySuccess === "url"
                    ? "图片链接已复制到剪贴板"
                    : "Markdown格式已复制到剪贴板"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
