import React from "react";
import Navbar from "@/components/Navbar";
import LeftSidebar from "@/components/navigation/LeftSidebar";
import CommunityFeed from "@/components/feed/CommunityFeed";
import CommunityStats from "@/components/stats/CommunityStats";
import CommunityEvent from "@/components/CommunityEvent";
import TrendingTopics from "@/components/trending/TrendingTopics";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CommunityEvent />
      <div className="container mx-auto">
        <div className="flex gap-6">
          <aside className="py-6">
            <LeftSidebar />
          </aside>
          <main className="flex-1 py-6">
            <CommunityFeed />
          </main>
          <aside className="py-6 space-y-6">
            <CommunityStats />
            <TrendingTopics />
          </aside>
        </div>
      </div>
    </div>
  );
}
