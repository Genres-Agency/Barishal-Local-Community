import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImageIcon, Video, Globe } from "lucide-react";

const PostCreator = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex w-full">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/assets/user-avatar.jpg" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <input
              type="text"
              placeholder="আপনার মনের কথা শেয়ার করুন..."
              className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ImageIcon size={20} className="text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Video size={20} className="text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Globe size={20} className="text-gray-500" />
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
            পোস্ট করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
