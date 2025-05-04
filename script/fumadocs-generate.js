const fs = require("fs");
const path = require("path");

// 解析 [标题](路径) 语法
function parseLink(str) {
  const m = str.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (m) return [m[1], m[2]];
  return null;
}

// kebab-case 转换
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
}

// 递归遍历 pages
function generatePages(pages, baseDir = "../content/cline") {
  if (!Array.isArray(pages)) {
    console.error("pages 不是数组，无法递归:", pages);
    return;
  }
  for (const item of pages) {
    if (typeof item === "string") {
      // 跳过分隔线
      if (/^---.*---$/.test(item.trim())) continue;
      // 如果是 [标题](路径) 语法的页面
      const link = parseLink(item.trim());
      if (link) {
        const [title, url] = link;
        // 跳过外链（以http开头）
        if (/^https?:\/\//.test(url)) continue;
        let filePath = url.replace(/^\//, "").replace(/\/$/, "");
        const absDir = path.join(baseDir, path.dirname(filePath));
        const name = toKebabCase(path.basename(filePath)) + ".mdx";
        if (!fs.existsSync(absDir)) fs.mkdirSync(absDir, { recursive: true });
        const mdx = `---
title: ${title}
description: 请补充页面描述
full: false
---

## 这里开始写正文内容
`;
        fs.writeFileSync(path.join(absDir, name), mdx, "utf8");
        console.log("生成:", path.join(absDir, name));
      } else {
        // 不是合法页面/分隔线
        console.warn("未知字符串项，已跳过:", item);
      }
    } else if (Array.isArray(item)) {
      // 二元数组 [title, url]
      const [title, url] = item;
      if (typeof title !== "string" || typeof url !== "string") {
        console.error("页面项格式错误:", item);
        continue;
      }
      // 跳过外链
      if (/^https?:\/\//.test(url)) continue;
      let filePath = url.replace(/^\//, "").replace(/\/$/, "");
      const absDir = path.join(baseDir, path.dirname(filePath));
      const name = toKebabCase(path.basename(filePath)) + ".mdx";
      if (!fs.existsSync(absDir)) fs.mkdirSync(absDir, { recursive: true });
      const mdx = `---
title: ${title}
description: 请补充页面描述
full: false
---

## 这里开始写正文内容
`;
      fs.writeFileSync(path.join(absDir, name), mdx, "utf8");
      console.log("生成:", path.join(absDir, name));
    } else if (typeof item === "object" && item.pages) {
      // 递归处理分组
      generatePages(item.pages, baseDir);
    } else {
      console.error("无法识别的 meta.json 项:", item);
    }
  }
}

// 读取 meta.json
const meta = require("../content/cline/meta.json");
generatePages(meta.pages);
