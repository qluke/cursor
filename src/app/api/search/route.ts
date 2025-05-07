import { clinesSource } from "@/lib/source-cline";
import { source } from "@/lib/source";
import { createSearchAPI } from "fumadocs-core/search/server";

// 合并两个源的页面
const allPages = [...source.getPages(), ...clinesSource.getPages()];

// 构造索引
const indexes = allPages.map((page) => ({
  title: page.data.title,
  description: page.data.description,
  url: page.url,
  id: page.url,
  structuredData: page.data.structuredData,
}));

// 暴露 GET 接口
export const { GET } = createSearchAPI("advanced", {
  indexes,
});
