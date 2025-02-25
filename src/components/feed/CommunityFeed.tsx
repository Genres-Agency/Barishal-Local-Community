"use client";

import React, { useState } from "react";
import PostCreator from "./PostCreator";
import PostCard from "./PostCard";
import { posts } from "@/lib/constant";
import FeedNavigation from "./FeedNavigation";

const CommunityFeed = () => {
  const [activeTab, setActiveTab] = useState<"latest" | "popular" | "network">(
    "latest"
  );

  return (
    <div className="space-y-4">
      {/* Feed Navigation ---------------- */}
      <FeedNavigation />

      {/* Tab Navigation ---------------- */}
      <div className="flex gap-6 mb-4 border-b">
        <button
          onClick={() => setActiveTab("latest")}
          className={`pb-4 font-medium ${
            activeTab === "latest"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
          }`}
        >
          সর্বশেষ
        </button>
        <button
          onClick={() => setActiveTab("popular")}
          className={`pb-4 font-medium ${
            activeTab === "popular"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
          }`}
        >
          জনপ্রিয়
        </button>
        <button
          onClick={() => setActiveTab("network")}
          className={`pb-4 font-medium ${
            activeTab === "network"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
          }`}
        >
          আমার নেটওয়ার্ক
        </button>
      </div>

      {/* Post Creator Field --------------- */}
      <PostCreator />

      {/* All Posts ------------------ */}
      {posts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
    </div>
  );
};

export default CommunityFeed;
