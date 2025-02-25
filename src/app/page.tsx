import React from "react";
import Navbar from "@/components/Navbar";
import LeftSidebar from "@/components/navigation/leftSide/LeftSidebar";
import CommunityFeed from "@/components/feed/CommunityFeed";
import CommunityEvent from "@/components/CommunityEvent";
import RightSidebar from "@/components/navigation/rightSide/RightSidebar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CommunityEvent />
      <div className="container mx-auto">
        <div className="flex gap-6">
          <aside>
            <LeftSidebar />
          </aside>
          <main className="flex-1 py-6">
            <CommunityFeed />
          </main>
          <aside>
            <RightSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
