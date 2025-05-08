"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  onError?: (error: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  onError,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      setIsUploading(true);

      try {
        const response = await fetch("/api/image-upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          onChange(data.url); // 获取并设置上传后的图片 URL
        } else {
          const errorData = await response.text();
          console.error("上传失败:", errorData);
          if (onError) {
            try {
              // 尝试解析错误 JSON
              const parsedError = JSON.parse(errorData);
              onError(parsedError);
            } catch {
              // 如果不是 JSON，直接传递错误文本
              onError(errorData);
            }
          }
        }
      } catch (error) {
        console.error("上传出错:", error);
        if (onError) onError(error);
      } finally {
        setIsUploading(false);
      }
    },
    [onChange, onError]
  );

  return (
    <div
      className="
        relative
        cursor-pointer
        hover:opacity-70
        transition
        border-dashed 
        border-2 
        p-20 
        border-neutral-300
        flex
        flex-col
        justify-center
        items-center
        gap-4
        text-neutral-600
      "
    >
      <input
        title="image upload"
        type="file"
        onChange={handleUpload}
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <TbPhotoPlus size={50} />
      <div className="font-semibold text-lg">
        {isUploading ? "上传中..." : "点击上传"}
      </div>
      {value && (
        <div className="absolute inset-0 w-full h-full">
          <Image fill style={{ objectFit: "cover" }} src={value} alt="House" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
