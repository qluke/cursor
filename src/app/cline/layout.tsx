import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "./layout.config";
import { clinesSource } from "@/lib/source-cline";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={clinesSource.pageTree} {...baseOptions}>
      {children}
    </DocsLayout>
  );
}
