"use client";

import { useState } from "react";

export function IndexNowButton() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    try {
      setStatus("loading");
      const response = await fetch("/api/indexnow");
      const data = await response.json();

      setResult(data);
      setStatus(data.success ? "success" : "error");
    } catch (error) {
      setStatus("error");
      setResult({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  return (
    <div className="my-4">
      <button
        onClick={handleSubmit}
        disabled={status === "loading"}
        className={`px-4 py-2 rounded font-medium ${
          status === "loading"
            ? "bg-gray-300 text-gray-700"
            : status === "success"
            ? "bg-green-500 text-white"
            : status === "error"
            ? "bg-red-500 text-white"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {status === "loading"
          ? "Submitting to IndexNow..."
          : status === "success"
          ? "Successfully Submitted!"
          : status === "error"
          ? "Submission Failed"
          : "Submit to IndexNow"}
      </button>

      {result && (
        <div className="mt-4 p-4 rounded border">
          <h3 className="font-bold">Result:</h3>
          {status === "success" && (
            <div>
              <p>Successfully submitted {result.count} URLs to IndexNow.</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-blue-500 hover:text-blue-700">
                  View submitted URLs
                </summary>
                <ul className="mt-2 pl-4 list-disc">
                  {result.urls?.map((url: string, index: number) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 overflow-hidden text-ellipsis"
                    >
                      {url}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          )}
          {status === "error" && (
            <div className="text-red-500">
              <p>{result.message || "An error occurred during submission."}</p>
              {result.error && <p className="text-sm">{result.error}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
