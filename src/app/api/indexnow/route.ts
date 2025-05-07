import { clinesSource } from "@/lib/source-cline";
import { NextResponse } from "next/server";

const INDEXNOW_KEY = "119fc187d4fc4d4fa4deb2ad061d879a";
const HOST = "www.cursor-cn.org";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

export async function GET() {
  try {
    // Get all pages from clinesSource
    const pages = clinesSource.getPages();

    // Generate URLs from pages
    const urls = pages.map((page) => {
      const slugPath = page.slugs.join("/");
      return `https://${HOST}/cline${slugPath ? `/${slugPath}` : ""}`;
    });

    // Add the main cline page
    if (!urls.includes(`https://${HOST}/cline`)) {
      urls.unshift(`https://${HOST}/cline`);
    }

    // Submit URLs to IndexNow
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: "Successfully submitted URLs to IndexNow",
        urls,
        count: urls.length,
      });
    } else {
      const errorText = await response.text();
      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit URLs to IndexNow",
          error: errorText,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error processing IndexNow submission",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
