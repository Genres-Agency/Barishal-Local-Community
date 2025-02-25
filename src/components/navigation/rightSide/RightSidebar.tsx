import React from "react";
import CommunityStats from "./stats/CommunityStats";
import TrendingTopics from "./trending/TrendingTopics";

const RightSidebar = () => {
  return (
    <div className="py-6 space-y-6">
      <CommunityStats />
      <TrendingTopics />
    </div>
  );
};

export default RightSidebar;
