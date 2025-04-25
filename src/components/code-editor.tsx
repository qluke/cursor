"use client";

import { useState, useEffect } from "react";
import {
  X,
  Maximize2,
  Minimize2,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function CodeEditor() {
  const [activeTab, setActiveTab] = useState("mod.rs");
  const [activeSection, setActiveSection] = useState("CHAT");
  const [isMobile, setIsMobile] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(true);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-800 bg-[#1e1e1e] text-gray-300 font-mono text-xs sm:text-sm">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-1 sm:p-2 bg-[#252526] border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 ml-1">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="flex space-x-1 sm:space-x-2">
          <button
            title="Maximize2"
            className="p-0.5 sm:p-1 hover:bg-gray-700 rounded"
          >
            <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button
            title="Minimize2"
            className="p-0.5 sm:p-1 hover:bg-gray-700 rounded"
          >
            <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button
            title="Settings"
            className="p-0.5 sm:p-1 hover:bg-gray-700 rounded"
          >
            <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Editor Tabs */}
      <div className="flex border-b border-gray-800 bg-[#252526] overflow-x-auto">
        <div className="flex items-center px-2 sm:px-3 py-1 sm:py-2 border-r border-gray-800 whitespace-nowrap">
          <span className="text-gray-400 mr-1">⊙</span>
          <span className="text-xs sm:text-sm">mod.rs</span>
          <button
            title="x"
            className="ml-1 sm:ml-2 text-gray-500 hover:text-gray-300"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Editor Content - Responsive Layout */}
      <div
        className={`flex flex-col md:flex-row ${
          isMobile
            ? "h-auto"
            : "h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
        }`}
      >
        {/* Left Side - Code */}
        <div className="flex-1 overflow-auto border-b md:border-b-0 md:border-r border-gray-800">
          <div className="flex">
            {/* Line Numbers */}
            <div className="text-right pr-1 sm:pr-2 pl-1 sm:pl-2 pt-2 select-none bg-[#1e1e1e] text-gray-500 w-6 sm:w-8 md:w-10">
              {[72, 73, 74, 75, 76, 77, 78].map((num) => (
                <div
                  key={num}
                  className="leading-5 sm:leading-6 text-[10px] sm:text-xs"
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Code Content */}
            <div className="p-1 sm:p-2 overflow-auto w-full">
              {/* AI Suggestion Box */}
              <div className="mb-3 sm:mb-4 bg-[#252526] border border-gray-700 rounded p-2 sm:p-3 relative text-[10px] sm:text-xs">
                <div className="text-gray-300 mb-1 sm:mb-2">
                  Implement the cleanup function for the transport stack. Do not
                  make the upgrade listeners optional.
                </div>
                <div className="flex flex-wrap gap-2 mt-1 sm:mt-2">
                  <button className="bg-blue-600 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs">
                    ⚡ Accept
                  </button>
                  <button className="bg-gray-700 text-gray-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs">
                    ⚠ Reject
                  </button>
                  <span className="text-gray-500 text-[10px] sm:text-xs flex items-center ml-1 sm:ml-4 whitespace-nowrap">
                    Follow-up instructions...{" "}
                    <span className="ml-1 sm:ml-2 text-gray-400 hidden sm:inline">
                      ⌘JK
                    </span>
                  </span>
                </div>
                <button
                  title="x"
                  className="absolute top-1 right-1 text-gray-500 hover:text-gray-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* Code with syntax highlighting */}
              <div className="text-[10px] sm:text-xs">
                <div className="leading-5 sm:leading-6">
                  <span className="text-blue-400">pub</span>
                  <span className="text-pink-400">(crate)</span>
                  <span className="text-blue-400"> struct </span>
                  <span className="text-green-400">TransportStack</span> {"{"}
                </div>
                <div className="leading-5 sm:leading-6 pl-2 sm:pl-4">
                  <span className="text-gray-500">14: </span>
                  <span className="text-green-400">ListenerEndpoint</span>,
                </div>
                <div className="leading-5 sm:leading-6 pl-2 sm:pl-4">
                  <span className="text-gray-500">tls: </span>
                  <span className="text-green-400">Option</span>
                  {"<"}
                  <span className="text-green-400">Arc</span>
                  {"<"}
                  <span className="text-green-400">Acceptor</span>
                  {">>"},
                </div>
                <div className="leading-5 sm:leading-6 pl-2 sm:pl-4 text-gray-500">
                  {
                    "// listeners sent from the old process for graceful upgrade"
                  }
                </div>
                <div className="leading-5 sm:leading-6 pl-2 sm:pl-4 text-gray-500">
                  {"#[cfg(unix)]"}
                </div>
                <div className="leading-5 sm:leading-6 pl-2 sm:pl-4 text-red-400">
                  <span className="text-gray-500">upgrade_listeners: </span>
                  <span>Option</span>
                  {"<"}
                  <span>ListenFds</span>
                  {">"},
                </div>
                <div className="leading-5 sm:leading-6 pl-2 sm:pl-4">
                  <span className="text-gray-500">upgrade_listeners: </span>
                  <span className="text-green-400">ListenFds</span>,
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Toggle for Chat Section */}
        {isMobile && (
          <button
            className="flex items-center justify-center py-1 bg-[#252526] border-t border-gray-800 text-xs"
            onClick={() => setChatExpanded(!chatExpanded)}
          >
            {chatExpanded ? (
              <>
                <span className="mr-1">Hide Chat</span>
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                <span className="mr-1">Show Chat</span>
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        )}

        {/* Right Side - Chat (Responsive) */}
        {(!isMobile || (isMobile && chatExpanded)) && (
          <div className="w-full md:w-64 lg:w-80 bg-[#252526] flex flex-col">
            {/* Chat Tabs */}
            <div className="flex border-b border-gray-800">
              <button
                className={`px-2 sm:px-4 py-1 sm:py-2 text-xs ${
                  activeSection === "CHAT" ? "border-b-2 border-gray-300" : ""
                }`}
                onClick={() => setActiveSection("CHAT")}
              >
                CHAT
              </button>
              <button
                className={`px-2 sm:px-4 py-1 sm:py-2 text-xs ${
                  activeSection === "COMPOSER"
                    ? "border-b-2 border-gray-300"
                    : ""
                }`}
                onClick={() => setActiveSection("COMPOSER")}
              >
                COMPOSER
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-auto p-2 sm:p-4">
              <div className="mb-2 flex items-center">
                <span className="bg-gray-700 text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded mr-1 sm:mr-2">
                  ⊙ mod.rs
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400">
                  Current File
                </span>
              </div>

              <div className="text-[10px] sm:text-sm mb-3 sm:mb-4">
                Could you make it easier to switch certificates in the transport
                listeners?
              </div>

              <div className="bg-gray-800 rounded p-2 sm:p-3 text-[10px] sm:text-sm">
                <p className="mb-2">
                  I'll help modify the code to make certificate switching more
                  flexible. The main changes will be to enhance the
                  <span className="text-blue-400"> TlsAccept </span>
                  trait and modify how certificates are handled in the
                  <span className="text-blue-400"> TlsSettings</span>. Here are
                  the key changes:
                </p>
              </div>

              <div className="mt-3 sm:mt-4 flex items-center">
                <span className="bg-gray-700 text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded mr-1 sm:mr-2">
                  ⊙ mod.rs
                </span>
              </div>

              <div className="mt-1 sm:mt-2 text-gray-400 text-[10px] sm:text-sm">
                // ... existing code ...
              </div>

              <div className="mt-3 sm:mt-4 flex justify-between">
                <button className="text-gray-400 text-[10px] sm:text-xs flex items-center">
                  <span className="mr-1">Ask</span>
                </button>
                <button className="text-gray-400 text-[10px] sm:text-xs flex items-center">
                  <span className="mr-1">Copy</span>
                </button>
                <button className="text-gray-400 text-[10px] sm:text-xs flex items-center">
                  <span className="mr-1">Apply</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
