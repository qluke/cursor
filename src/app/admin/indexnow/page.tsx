import { IndexNowButton } from "@/components/IndexNowButton";

export default function IndexNowAdmin() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">IndexNow Submission</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">
          Use this tool to submit your Cline documentation URLs to search
          engines through the IndexNow API. This will help search engines
          discover and index your content faster.
        </p>

        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <h2 className="text-lg font-semibold mb-2">Key Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Key:{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">
                119fc187d4fc4d4fa4deb2ad061d879a
              </code>
            </li>
            <li>
              Key Location:{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">
                https://www.cursor-cn.org/119fc187d4fc4d4fa4deb2ad061d879a.txt
              </code>
            </li>
            <li>
              Host:{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">
                www.cursor-cn.org
              </code>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Submit URLs</h2>
          <p className="mb-2">
            Click the button below to automatically submit all your
            documentation URLs to IndexNow. This process uses the{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded">
              clinesSource
            </code>{" "}
            from Fumadocs to generate the complete list of URLs based on your
            documentation structure.
          </p>
          <IndexNowButton />
        </div>

        <div className="text-sm text-gray-600 mt-8 pt-4 border-t">
          <h3 className="font-medium mb-1">About IndexNow</h3>
          <p>
            IndexNow is a protocol that enables website owners to notify search
            engines about the latest content changes on their websites. When you
            submit URLs, search engines like Bing and Yandex are immediately
            notified, which can lead to faster indexing.
          </p>
        </div>
      </div>
    </div>
  );
}
