import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { postCreatorActions } from "@/lib/config/post-creator.config";

const PostCreator = () => {
  const [postContent, setPostContent] = useState("");

  const handlePostSubmit = () => {
    if (!postContent.trim()) return;
    // TODO: Implement post submission logic
    console.log("Post content:", postContent);
    setPostContent("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4">
      <div className="flex gap-2 sm:gap-4">
        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
          <AvatarImage src="/assets/profile.jpg" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full gap-3 sm:gap-4">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="আপনার মনের কথা শেয়ার করুন..."
            className="w-full min-h-20 sm:min-h-24 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-[#f9fafb]"
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1">
              {postCreatorActions.map((action) => (
                <button
                  key={action.id}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium"
                  title={action.tooltip}
                >
                  <action.icon size={18} className="text-gray-500" />
                  {action.label}
                </button>
              ))}
            </div>
            <button
              onClick={handlePostSubmit}
              disabled={!postContent.trim()}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              পোস্ট করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
