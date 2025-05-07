import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "./layout.config";
import { sourceGuides } from "@/lib/source-guides";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={sourceGuides.pageTree}
      {...baseOptions}
      sidebar={{
        tabs: [
          {
            title: "Documentation",
            description: "文档",
            url: "/docs",
          },
          {
            title: "Guides",
            description: "指南",
            url: "/guides",
          },
        ],
      }}
    >
      {children}
    </DocsLayout>
  );
}
