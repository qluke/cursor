import { guides } from "@/.source";
import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const sourceGuides = loader({
  // it assigns a URL to your pages
  baseUrl: "/guides",
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
  source: guides.toFumadocsSource(),
});
