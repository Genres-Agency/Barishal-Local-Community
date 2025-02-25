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
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="/assets/profile.jpg" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full gap-4">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="আপনার মনের কথা শেয়ার করুন..."
            className="w-full min-h-24 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-[#f9fafb]"
          />

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              {postCreatorActions.map((action) => (
                <button
                  key={action.id}
                  className="p-2 hover:bg-gray-100 rounded-full flex items-center gap-2 text-sm font-medium"
                  title={action.tooltip}
                >
                  <action.icon size={20} className="text-gray-500" />
                  {action.label}{" "}
                </button>
              ))}
            </div>
            <button
              onClick={handlePostSubmit}
              disabled={!postContent.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
