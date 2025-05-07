const fetch = require("node-fetch");

const INDEXNOW_KEY = "119fc187d4fc4d4fa4deb2ad061d879a";
const HOST = "www.cursor-cn.org";
const KEY_LOCATION = `https://${HOST}/119fc187d4fc4d4fa4deb2ad061d879a.txt`;

// List of URLs to submit
const urls = [
  "https://www.cursor-cn.org/cline",
  "https://www.cursor-cn.org/cline/getting-started/what-is-cline",
  "https://www.cursor-cn.org/cline/getting-started",
  "https://www.cursor-cn.org/cline/improving-your-prompting-skills",
  "https://www.cursor-cn.org/cline/exploring-clines-tools",
  "https://www.cursor-cn.org/cline/enterprise-solutions",
  "https://www.cursor-cn.org/cline/mcp-servers",
  "https://www.cursor-cn.org/cline/custom-model-configs",
  "https://www.cursor-cn.org/cline/running-models-locally",
  "https://www.cursor-cn.org/cline/more-info",
];

async function submitToIndexNow() {
  try {
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
      console.log("Successfully submitted URLs to IndexNow");
      console.log("Response:", await response.text());
    } else {
      console.error("Failed to submit URLs:", await response.text());
    }
  } catch (error) {
    console.error("Error submitting to IndexNow:", error);
  }
}

submitToIndexNow();
