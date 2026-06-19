import { useState } from "react";
import DomainsContent from "./DomainsContent";
import RecommendedContent from "./RecommendedContent";
import WordpressContent from "./WordpressContent";

const tabs = ["Domains", "Recommended", "WordPress and Security"];

export default function ThreePages() {
  const [activeTab, setActiveTab] = useState("Domains");

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">
        What's first up for your business?
      </h1>

      <div className="flex justify-center gap-3 my-10 items-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border rounded-3xl px-8 py-3 transition-colors ${
              activeTab === tab
                ? "bg-black text-white border-black"
                : "border-gray-300 text-gray-700 hover:border-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "Domains" && <DomainsContent />}
        {activeTab === "Recommended" && <RecommendedContent />}
        {activeTab === "WordPress and Security" && <WordpressContent />}
      </div>
    </div>
  );
}
