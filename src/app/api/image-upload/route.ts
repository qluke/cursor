import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: NextRequest) {
  try {
    // 读取请求中的文件数据
    const formData = await req.formData();
    const file = formData.get("file") as Blob;
    // 获取原始文件名
    const originalFileName =
      (formData.get("originalFileName") as string) || "material";

    if (!file) {
      return NextResponse.json({ message: "未找到文件" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer); // 将 ArrayBuffer 转换为 Buffer

    // 使用 sharp 处理图像 - 提高质量，不固定尺寸
    const resizedImage = await sharp(imageBuffer)
      .toFormat("webp", {
        quality: 80, // 更高的质量设置 (0-100)
        effort: 6, // 压缩效率 (0-6)，较高值提供更好的压缩但处理更慢
        lossless: false, // 有损压缩，但保持较高质量
      })
      // 不再强制固定尺寸，而是保持原图比例，仅在必要时缩小
      .resize({
        width: 1920, // 最大宽度
        height: 1080, // 最大高度
        fit: "inside", // 确保图片完全适合指定的尺寸，保持宽高比
        withoutEnlargement: true, // 不放大小图片
      })
      .toBuffer();

    console.log(`图片处理完成，转换为WebP格式，质量:80`);

    // 确保 endpoint 格式正确（必须包含 https://）
    const endpoint = process.env.NEXT_PUBLIC_MINIO_ENDPOINT || "";
    const fullEndpoint = endpoint.startsWith("http")
      ? endpoint
      : `https://${endpoint}`;
    const region = process.env.NEXT_PUBLIC_MINIO_REGION || "auto";
    const bucketName = process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME || "";

    // 记录非敏感配置信息（用于调试）
    console.log("R2 配置信息 (无敏感数据):", {
      endpoint: fullEndpoint,
      region,
      bucketName,
      hasAccessKey: !!process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY,
      hasSecretKey: !!process.env.NEXT_PUBLIC_MINIO_SECRET_KEY,
      hasPublicUrl: !!process.env.NEXT_PUBLIC_R2_PUBLIC_URL,
    });

    if (
      !process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY ||
      !process.env.NEXT_PUBLIC_MINIO_SECRET_KEY
    ) {
      throw new Error("缺少 R2 访问凭证，请检查环境变量");
    }

    if (!bucketName) {
      throw new Error(
        "缺少存储桶名称，请检查 NEXT_PUBLIC_MINIO_BUCKET_NAME 环境变量"
      );
    }

    // 设置 S3 客户端 - 针对 Cloudflare R2 的配置
    const s3Client = new S3Client({
      endpoint: fullEndpoint,
      region: region,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY,
      },
      forcePathStyle: true,
    });

    const timestamp = Date.now();
    const fileName = `${timestamp}.webp`;

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: resizedImage,
      ContentType: "image/webp",
    };

    console.log(`开始上传到 R2: ${bucketName}/${fileName}`);
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log("R2 上传成功");

    // 构建适用于 Cloudflare R2 的 URL
    let publicUrl = "";

    // 首选使用公共访问URL（如通过Workers或R2桶策略设置的）
    if (process.env.NEXT_PUBLIC_R2_PUBLIC_URL) {
      // 确保URL格式正确
      const baseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
      publicUrl = baseUrl.endsWith("/")
        ? `${baseUrl}${fileName}`
        : `${baseUrl}/${fileName}`;

      console.log(`使用自定义公共URL: ${publicUrl}`);
    } else {
      // 备用：直接使用R2 URL（注意：通常这不是直接可访问的，除非配置了公共访问权限）
      publicUrl = `${fullEndpoint}/${bucketName}/${fileName}`;
      console.log(`警告：使用直接R2 URL (可能不可公开访问): ${publicUrl}`);
    }

    return NextResponse.json({
      url: publicUrl,
      success: true,
      message: "上传成功",
      fileName,
      originalFileName,
      timestamp,
    });
  } catch (error) {
    console.error("上传失败:", error);

    // 提供更详细的错误信息
    let errorMessage = "上传失败";
    let errorDetails = null;

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack;
    }

    return NextResponse.json(
      {
        message: errorMessage,
        details: errorDetails,
        error: error instanceof Error ? error.toString() : String(error),
        success: false,
      },
      { status: 500 }
    );
  }
}
