const fetch = require("node-fetch");

/**
 * Script to submit URLs to IndexNow using the API endpoint
 * This script replaces the old hardcoded URL list with the dynamically generated list from clinesSource
 */
async function submitToIndexNow() {
  try {
    console.log("Submitting URLs to IndexNow...");

    // Call the IndexNow API endpoint
    const response = await fetch("http://localhost:3000/api/indexnow");
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
    console.error(
      "Make sure the development server is running on http://localhost:3000"
    );
  }
}

// Execute the function
submitToIndexNow();
