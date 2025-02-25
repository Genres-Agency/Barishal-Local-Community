import React from "react";
import Image from "next/image";

const UpcomingEvents = () => {
  return (
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
  );
};

export default UpcomingEvents;
