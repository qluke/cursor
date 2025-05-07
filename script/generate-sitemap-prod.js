const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

/**
 * Script to generate a sitemap.xml file by calling the production sitemap API
 * This allows you to create a static sitemap file for your production website
 */
async function generateSitemap() {
  try {
    console.log("Generating production sitemap.xml...");

    // Call the sitemap API endpoint from production
    const response = await fetch("https://www.cursor-cn.org/api/sitemap");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch sitemap: ${response.status} ${response.statusText}`
      );
    }

    // Get the XML content
    const sitemapXml = await response.text();

    // Write to the public directory
    const publicDir = path.resolve(process.cwd(), "public");
    const sitemapPath = path.join(publicDir, "sitemap.xml");

    fs.writeFileSync(sitemapPath, sitemapXml, "utf8");

    console.log(
      `✅ Successfully generated production sitemap.xml at ${sitemapPath}`
    );
    console.log(
      "The sitemap includes all documentation pages from your production website."
    );
  } catch (error) {
    console.error(
      "❌ Error generating production sitemap:",
      error.message || error
    );
    process.exit(1);
  }
}

// Execute the function
generateSitemap();
