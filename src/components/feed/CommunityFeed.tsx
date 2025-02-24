"use client";

import React, { useState } from "react";
import PostCreator from "./PostCreator";
import PostCard, { PostProps } from "./PostCard";

const CommunityFeed = () => {
  const [activeTab, setActiveTab] = useState<"latest" | "popular" | "network">(
    "latest"
  );

  const posts: PostProps[] = [
    {
      author: {
        name: "ইমতিয়াজ হোসেন",
        image: "/assets/user-1.jpg",
      },
      content: "আজকে আমার দেখা একটি জিনিস শেয়ার করতে চাই।",
      timestamp: "২ ঘন্টা আগে",
      likes: 258,
      comments: 0,
      shares: 0,
      image: "/assets/dog.png",
    },
  ];

  return (
    <div className="space-y-4">
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
      <PostCreator />
      {posts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
    </div>
  );
};

export default CommunityFeed;
