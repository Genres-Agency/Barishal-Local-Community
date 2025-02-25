// src/components/NewsFeedNavigation.tsx
import React from "react";
import { feedNavigationItems } from "@/lib/config/navigation";

const FeedNavigation: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-5 gap-4">
      {feedNavigationItems.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center w-full ${item.bgColor} ${item.textColor} ${item.hoverBg} transition-all duration-300 py-7 px-2 rounded-lg`}
        >
          <item.icon className="size-7 mb-2" />
          <span className="text-sm font-semibold">{item.text}</span>
        </div>
      ))}
    </nav>
  );
};

export default FeedNavigation;
