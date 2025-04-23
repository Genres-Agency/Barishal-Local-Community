"use client";

import { feedTabs } from "@/lib/constant";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllPostQuery } from "@/redux/features/post/post.api";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

import EventCreator from "./EventCreator";
import FeedNavigation from "./FeedNavigation";
import PostCard from "./PostCard";
import PostCreator from "./PostCreator";

const CommunityFeed = () => {
  const user = useAppSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState<"latest" | "popular" | "network">(
    "latest"
  );

  console.log("user.id", user?.userId);

  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const { data: postData } = useGetAllPostQuery(selectedCategory);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId === selectedCategory ? undefined : categoryId);
  };

  // console.log("postData", postData);
  return (
    <div className="space-y-4">
      {/* Feed Navigation ---------------- */}
      <FeedNavigation onCategorySelect={handleCategorySelect} />
      {/* Post Creator Field --------------- */}
      {user?.userId && (
        <>
          <PostCreator />
          <EventCreator />
        </>
      )}

      {/* Tab Navigation ---------------- */}
      <div className="flex gap-6 mb-4 pt-2 border-b px-3 sm:px-0">
        {feedTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`pb-1 md:pb-4 lg:font-bold ${
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
      <div className="px-3 sm:px-0">
        {postData?.map((post: any, index: any) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
