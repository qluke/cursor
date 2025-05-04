import { defineDocs, defineConfig } from "fumadocs-mdx/config";

// Options: https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  dir: "content/docs",
});

export const cline = defineDocs({
  dir: "content/cline",
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
