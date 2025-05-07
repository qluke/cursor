const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

/**
 * Script to generate a sitemap.xml file by calling the sitemap API
 * This allows you to create a static sitemap file for your website
 */
async function generateSitemap() {
  try {
    console.log("Generating sitemap.xml...");

    // Call the sitemap API endpoint
    const response = await fetch("http://localhost:3000/api/sitemap");

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

    console.log(`✅ Successfully generated sitemap.xml at ${sitemapPath}`);
    console.log(
      "The sitemap includes all documentation pages from your website."
    );
  } catch (error) {
    console.error("❌ Error generating sitemap:", error.message || error);
    console.error(
      "Make sure the development server is running on http://localhost:3000"
    );
    process.exit(1);
  }
}

// Execute the function
generateSitemap();
