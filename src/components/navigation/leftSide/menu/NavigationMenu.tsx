"use client";

import { navigationItemsLeftSite } from "@/lib/config/navigation";
import Link from "next/link";

const NavigationMenu = () => {
  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      {navigationItemsLeftSite.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <item.icon className="w-6 h-6 text-gray-600" />
          <span className="text-gray-700">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavigationMenu;
