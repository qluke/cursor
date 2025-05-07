const fetch = require("node-fetch");

/**
 * Script to submit URLs to IndexNow using the production API endpoint
 * This script is meant to be used in production environments
 */
async function submitToIndexNow() {
  try {
    console.log("Submitting URLs to IndexNow in production environment...");

    // Call the IndexNow API endpoint on the production site
    const response = await fetch("https://www.cursor-cn.org/api/indexnow");
    const data = await response.json();

    if (data.success) {
      console.log(`✅ Successfully submitted ${data.count} URLs to IndexNow!`);
      console.log("\nSubmitted URLs:");
      data.urls.forEach((url, index) => {
        console.log(`${index + 1}. ${url}`);
      });
    } else {
      console.error("❌ Failed to submit URLs to IndexNow");
      console.error("Error:", data.error || "Unknown error");
    }
  } catch (error) {
    console.error("❌ Error submitting to IndexNow:", error.message || error);
  }
}

// Execute the function
submitToIndexNow();
