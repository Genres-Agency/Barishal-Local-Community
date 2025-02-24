import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import CommunityFeed from "@/components/feed/CommunityFeed";
import CommunityStats from "@/components/stats/CommunityStats";
import CommunityEvent from "@/components/CommunityEvent";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CommunityEvent />
      <div className="container mx-auto">
        <div className="flex gap-6">
          <Sidebar />
          <main className="flex-1 py-6">
            <CommunityFeed />
          </main>
          <aside className="py-6">
            <CommunityStats />
          </aside>
        </div>
      </div>
    </div>
  );
}
