import { clinesSource } from "@/lib/source-cline";
import { source } from "@/lib/source";
import { NextResponse } from "next/server";
import { sourceGuides } from "@/lib/source-guides";

const HOST = "www.cursor-cn.org";
const CURRENT_DATE = new Date().toISOString().split("T")[0];

export async function GET() {
  try {
    // Get all pages from sources
    const clinesPages = clinesSource.getPages();
    const docsPages = source.getPages();
    const sourcePages = sourceGuides.getPages();

    // Generate URLs from clinesPages
    const clinesUrls = clinesPages.map((page) => {
      const slugPath = page.slugs.join("/");
      return {
        url: `https://${HOST}/cline${slugPath ? `/${slugPath}` : ""}`,
        lastmod: CURRENT_DATE,
        priority: "0.8",
      };
    });

    // Generate URLs from docsPages
    const docsUrls = docsPages.map((page) => {
      const slugPath = page.slugs.join("/");
      return {
        url: `https://${HOST}/docs${slugPath ? `/${slugPath}` : ""}`,
        lastmod: CURRENT_DATE,
        priority: "0.8",
      };
    });

    // Generate URLs from sourcePages
    const guidesUrls = sourcePages.map((page) => {
      const slugPath = page.slugs.join("/");
      return {
        url: `https://${HOST}/guides${slugPath ? `/${slugPath}` : ""}`,
        lastmod: CURRENT_DATE,
        priority: "0.8",
      };
    });

    // Add main pages
    const mainUrls = [
      { url: `https://${HOST}/`, lastmod: CURRENT_DATE, priority: "1.0" },
      { url: `https://${HOST}/cline`, lastmod: CURRENT_DATE, priority: "0.9" },
      { url: `https://${HOST}/docs`, lastmod: CURRENT_DATE, priority: "0.9" },
      { url: `https://${HOST}/guides`, lastmod: CURRENT_DATE, priority: "0.9" },
    ];

    // Combine all URLs and make sure there are no duplicates
    const allUrls = [...mainUrls];

    // Add docs, cline and guides URLs without duplicates
    [...clinesUrls, ...docsUrls, ...guidesUrls].forEach((item) => {
      if (!allUrls.some((existing) => existing.url === item.url)) {
        allUrls.push(item);
      }
    });

    // Generate XML for sitemap
    const sitemap = generateSitemapXml(allUrls);

    // Return sitemap XML with appropriate headers
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error generating sitemap",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

function generateSitemapXml(
  urls: Array<{ url: string; lastmod: string; priority?: string }>
) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach((item) => {
    xml += "  <url>\n";
    xml += `    <loc>${item.url}</loc>\n`;
    xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    if (item.priority) {
      xml += `    <priority>${item.priority}</priority>\n`;
    }
    xml += "  </url>\n";
  });

  xml += "</urlset>";
  return xml;
}
