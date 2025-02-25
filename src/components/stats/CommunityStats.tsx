import React from "react";
import { communityStats } from "@/lib/config/stats";
import StatItem from "./StatsItem";

const CommunityStats = () => {
  return (
    <div className="w-80 space-y-4 bg-white rounded-lg">
      <h2 className="text-lg font-semibold p-4 border-b">
        কমিউনিটি পরিসংখ্যান
      </h2>
      <div className="p-4 space-y-6">
        {communityStats.map((stat, index) => (
          <StatItem
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            iconColor={stat.iconColor}
            bgColor={stat.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityStats;
