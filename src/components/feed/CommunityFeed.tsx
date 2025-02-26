"use client";

import React, { useState } from "react";
import PostCreator from "./PostCreator";
import PostCard from "./PostCard";
import { posts, feedTabs } from "@/lib/constant";
import FeedNavigation from "./FeedNavigation";

const CommunityFeed = () => {
  const [activeTab, setActiveTab] = useState<"latest" | "popular" | "network">(
    "latest"
  );

  return (
    <div className="space-y-4">
      {/* Feed Navigation ---------------- */}
      <FeedNavigation />

      {/* Post Creator Field --------------- */}
      <PostCreator />

      {/* Tab Navigation ---------------- */}
      <div className="flex gap-6 mb-4 pt-2 border-b">
        {feedTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`pb-4 font-bold ${
              activeTab === tab.value
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* All Posts ------------------ */}
      {posts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
    </div>
  );
};

export default CommunityFeed;
