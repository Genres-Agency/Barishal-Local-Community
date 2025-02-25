import React from "react";
import Link from "next/link";
import Image from "next/image";
import { navigationItemsLeftSite } from "@/lib/config/navigation";

const LeftSidebar = () => {
  return (
    <div className="w-64 space-y-6">
      {/* Navigation Menu */}
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

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg p-4 space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">আপকামিং ইভেন্টস</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Image
              src="/assets/community-event.png"
              alt="Community Event"
              width={60}
              height={60}
              className="rounded-lg"
            />
            <div>
              <h3 className="font-medium">বরিশাল টেক মিট ২০২৪</h3>
              <p className="text-sm text-gray-500">২৫ ফেব্রুয়ারি, ২০২৪</p>
              <p className="text-sm text-gray-600 mt-1">
                বরিশাল সিটি কলেজ অডিটোরিয়াম
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
