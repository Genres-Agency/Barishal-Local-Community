import React from "react";
import Navbar from "@/components/Navbar";
import LeftSidebar from "@/components/navigation/leftSide/LeftSidebar";
import CommunityFeed from "@/components/feed/CommunityFeed";
import CommunityEvent from "@/components/community-event/CommunityEvent";
import RightSidebar from "@/components/navigation/rightSide/RightSidebar";
import { EventSlider } from "@/components/community-event/EventSlider";

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      {/* Community Event Section */}
      <div className="relative z-40 mt-16 lg:mt-20">
        <CommunityEvent />

        <EventSlider />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Left Sidebar */}
          <aside className="sticky top-[4.5rem] h-[calc(100vh-4.5rem)] w-full md:w-64 lg:w-72 overflow-y-auto hidden md:block">
            <LeftSidebar />
          </aside>

          {/* Main Feed Section */}
          <main className="flex-1 py-6 min-h-[calc(100vh-4.5rem)] w-full">
            <CommunityFeed />
          </main>

          {/* Right Sidebar */}
          <aside className="sticky top-[4.5rem] h-[calc(100vh-4.5rem)] w-full lg:w-80 overflow-y-auto overflow-x-hidden hidden lg:block">
            <RightSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
