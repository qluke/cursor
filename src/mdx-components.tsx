import defaultMdxComponents from "fumadocs-ui/mdx";
import { Mermaid } from "@/components/mdx/mermaid";
import type { MDXComponents } from "mdx/types";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Mermaid,
    img: (props) => <ImageZoom {...(props as any)} />,
    ...components,
  };
}
