import { lazy, Suspense } from "react";
import { useState } from "react";
const DomainsContent = lazy(() => import("./DomainsContent"));
const RecommendedContent = lazy(() => import("./RecommendedContent"));
const WordpressContent = lazy(() => import("./WordpressContent"));

const tabs = ["Domains", "Recommended", "WordPress and Security"];

export default function ThreePages() {
  const [activeTab, setActiveTab] = useState("Domains");

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">
        What's first up for your business?
      </h1>

      <div className="flex justify-center gap-3 mt-10 items-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border rounded-3xl px-8 py-3 transition-all hover:scale-105 hover:cursor-pointer ${
              activeTab === tab
                ? "bg-black text-white border-black hover:border-gray-700"
                : "border-gray-300 text-black hover:border-black"
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
