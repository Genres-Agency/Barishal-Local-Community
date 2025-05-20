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

// interface Post {
//   id: number;
//   content: string;
//   photo: string | null;
//   authorId: number;
//   categoryId: number;
//   createdAt: string;
//   updatedAt: string;
//   hashtag: {
//     id: number;
//     title: string;
//     slug: string;
//     authorId: number;
//   }[];
//   _count: {
//     likes: number;
//     comments: number;
//   };
// }

interface CommunityFeedProps {
  selectedTrendTopic?: number;
}

const CommunityFeed = ({ selectedTrendTopic }: CommunityFeedProps) => {
  const user = useAppSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState<"latest" | "popular" | "network">(
    "latest"
  );

  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();

  console.log("selectedTrendTopic", selectedTrendTopic);
  const { data: postData, isFetching } = useGetAllPostQuery({
    categoryId: selectedCategory,
    hashTagId: selectedTrendTopic,
  });

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(
      categoryId === selectedCategory ? undefined : categoryId
    );
  };

  console.log("postData", postData);
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  return (
    <div className="space-y-4">
      {/* Feed Navigation ---------------- */}
      <FeedNavigation onCategorySelect={handleCategorySelect} />
      {/* Post Creator Field --------------- */}
      {user?.userId && (
        <>
          <PostCreator />
          
        </>
      )}
      {/* Event Creator Field --------------- */}
      {isAdmin && <EventCreator />}

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
      {isFetching ? (
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : (
        <div className="px-3 sm:px-0">
          {postData?.map((post: any, index: any) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;
