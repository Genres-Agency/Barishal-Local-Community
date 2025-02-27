import React from "react";
import { feedNavigationItems } from "@/lib/config/navigation";
import Link from "next/link";

const FeedNavigation: React.FC = () => {
  return (
    <nav className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-3 sm:px-0">
      {feedNavigationItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`cursor-pointer flex flex-col items-center justify-center w-full shadow ${item.bgColor} ${item.textColor} ${item.hoverBg} transition-all duration-300 py-3 lg:py-7 px-2 rounded-lg`}
        >
          {React.createElement(item.icon, {
            className: `w-5 lg:w-7 h-5 lg:h-7 mb-2 ${item.textColor}`,
          })}
          <span className="text-sm font-semibold">{item.text}</span>
        </Link>
      ))}
    </nav>
  );
};

export default FeedNavigation;
