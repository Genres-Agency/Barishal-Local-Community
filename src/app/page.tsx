"use client";
import CommunityEvent from "@/components/community-event/CommunityEvent";
import CommunityFeed from "@/components/feed/CommunityFeed";
import HelplineSection from "@/components/helpline/HelplineSection";
import LeftSidebar from "@/components/navigation/leftSide/LeftSidebar";
import RightSidebar from "@/components/navigation/rightSide/RightSidebar";

import { useState } from "react";
// interface Hashtag {
//   id: number;
//   title: string;
//   slug: string;
//   authorId: number;
// }
export default function Home() {
  const [selectedTrendTopic, setSelectedTrendTopic] = useState<
    number | undefined
  >();

  const handleTrendTopicSelect = (hashtagId: number) => {
    setSelectedTrendTopic((prevSelected) =>
      prevSelected === hashtagId ? undefined : hashtagId
    );
  };
  return (
    <div className="">
      {/* Community Event Section */}
      <div className="relative z-40 mt-16 lg:mt-20">
        <CommunityEvent />
      </div>
      <div className="relative z-40 mt-16 lg:mt-20">
        <HelplineSection />
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
            <CommunityFeed selectedTrendTopic={selectedTrendTopic} />
          </main>

          {/* Right Sidebar */}
          <aside className="sticky top-[4.5rem] h-[calc(100vh-4.5rem)] w-full lg:w-80 overflow-y-auto overflow-x-hidden hidden lg:block">
            <RightSidebar onTrendTopicSelect={handleTrendTopicSelect} />
          </aside>
        </div>
      </div>
    </div>
  );
}
