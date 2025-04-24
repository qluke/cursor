"use client";

import { useState } from "react";
import { X, Maximize2, Minimize2, Settings } from "lucide-react";

export function CodeEditor() {
  const [activeTab, setActiveTab] = useState("mod.rs");
  const [activeSection, setActiveSection] = useState("CHAT");

  return (
    <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-800 bg-[#1e1e1e] text-gray-300 font-mono text-sm">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-2 bg-[#252526] border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 ml-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button title="Maximize2" className="p-1 hover:bg-gray-700 rounded">
            <Maximize2 className="w-4 h-4" />
          </button>
          <button title="Minimize2" className="p-1 hover:bg-gray-700 rounded">
            <Minimize2 className="w-4 h-4" />
          </button>
          <button title="Settings" className="p-1 hover:bg-gray-700 rounded">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Tabs */}
      <div className="flex border-b border-gray-800 bg-[#252526]">
        <div className="flex items-center px-3 py-2 border-r border-gray-800">
          <span className="text-gray-400 mr-1">⊙</span>
          <span>mod.rs</span>
          <button title="x" className="ml-2 text-gray-500 hover:text-gray-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex h-[400px]">
        {/* Left Side - Code */}
        <div className="flex-1 overflow-auto border-r border-gray-800">
          <div className="flex">
            {/* Line Numbers */}
            <div className="text-right pr-2 pl-2 pt-2 select-none bg-[#1e1e1e] text-gray-500 w-10">
              {[72, 73, 74, 75, 76, 77, 78].map((num) => (
                <div key={num} className="leading-6">
                  {num}
                </div>
              ))}
            </div>

            {/* Code Content */}
            <div className="p-2 overflow-auto w-full">
              {/* AI Suggestion Box */}
              <div className="mb-4 bg-[#252526] border border-gray-700 rounded p-3 relative">
                <div className="text-gray-300 mb-2">
                  Implement the cleanup function for the transport stack. Do not
                  make the upgrade listeners optional.
                </div>
                <div className="flex space-x-2 mt-2">
                  <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                    ⚡ Accept
                  </button>
                  <button className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                    ⚠ Reject
                  </button>
                  <span className="text-gray-500 text-xs flex items-center ml-4">
                    Follow-up instructions...{" "}
                    <span className="ml-2 text-gray-400">⌘JK</span>
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
              <div>
                <div className="leading-6">
                  <span className="text-blue-400">pub</span>
                  <span className="text-pink-400">(crate)</span>
                  <span className="text-blue-400"> struct </span>
                  <span className="text-green-400">TransportStack</span> {"{"}
                </div>
                <div className="leading-6 pl-4">
                  <span className="text-gray-500">14: </span>
                  <span className="text-green-400">ListenerEndpoint</span>,
                </div>
                <div className="leading-6 pl-4">
                  <span className="text-gray-500">tls: </span>
                  <span className="text-green-400">Option</span>
                  {"<"}
                  <span className="text-green-400">Arc</span>
                  {"<"}
                  <span className="text-green-400">Acceptor</span>
                  {">>"},
                </div>
                <div className="leading-6 pl-4 text-gray-500">
                  {
                    "// listeners sent from the old process for graceful upgrade"
                  }
                </div>
                <div className="leading-6 pl-4 text-gray-500">
                  {"#[cfg(unix)]"}
                </div>
                <div className="leading-6 pl-4 text-red-400">
                  <span className="text-gray-500">upgrade_listeners: </span>
                  <span>Option</span>
                  {"<"}
                  <span>ListenFds</span>
                  {">"},
                </div>
                <div className="leading-6 pl-4">
                  <span className="text-gray-500">upgrade_listeners: </span>
                  <span className="text-green-400">ListenFds</span>,
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Chat */}
        <div className="w-80 bg-[#252526] flex flex-col">
          {/* Chat Tabs */}
          <div className="flex border-b border-gray-800">
            <button
              className={`px-4 py-2 ${
                activeSection === "CHAT" ? "border-b-2 border-gray-300" : ""
              }`}
              onClick={() => setActiveSection("CHAT")}
            >
              CHAT
            </button>
            <button
              className={`px-4 py-2 ${
                activeSection === "COMPOSER" ? "border-b-2 border-gray-300" : ""
              }`}
              onClick={() => setActiveSection("COMPOSER")}
            >
              COMPOSER
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-auto p-4">
            <div className="mb-2 flex items-center">
              <span className="bg-gray-700 text-xs px-1.5 py-0.5 rounded mr-2">
                ⊙ mod.rs
              </span>
              <span className="text-xs text-gray-400">Current File</span>
            </div>

            <div className="text-sm mb-4">
              Could you make it easier to switch certificates in the transport
              listeners?
            </div>

            <div className="bg-gray-800 rounded p-3 text-sm">
              <p className="mb-2">
                I'll help modify the code to make certificate switching more
                flexible. The main changes will be to enhance the
                <span className="text-blue-400"> TlsAccept </span>
                trait and modify how certificates are handled in the
                <span className="text-blue-400"> TlsSettings</span>. Here are
                the key changes:
              </p>
            </div>

            <div className="mt-4 flex items-center">
              <span className="bg-gray-700 text-xs px-1.5 py-0.5 rounded mr-2">
                ⊙ mod.rs
              </span>
            </div>

            <div className="mt-2 text-gray-400 text-sm">
              // ... existing code ...
            </div>

            <div className="mt-4 flex justify-between">
              <button className="text-gray-400 text-xs flex items-center">
                <span className="mr-1">Ask</span>
              </button>
              <button className="text-gray-400 text-xs flex items-center">
                <span className="mr-1">Copy</span>
              </button>
              <button className="text-gray-400 text-xs flex items-center">
                <span className="mr-1">Apply</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
