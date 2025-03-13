"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { postCreatorActions } from "@/lib/config/post-creator.config";
import { useState } from "react";

const PostCreator = () => {
  const [postContent, setPostContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("general");

  // Four categories
  const categories = [
    { id: "general", name: "সাধারণ" },
    { id: "question", name: "প্রশ্ন" },
    { id: "discussion", name: "আলোচনা" },
    { id: "announcement", name: "ঘোষণা" },
  ];

  const handlePostSubmit = () => {
    if (!postContent.trim()) return;
    // TODO: Implement post submission logic
    console.log("Post content:", postContent);
    console.log("Selected category:", selectedCategory);
    setPostContent("");
    setSelectedCategory("general");
    setIsModalOpen(false);
  };

  return (
    <div className="px-3 sm:px-0">
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4">
        <div className="flex gap-2 sm:gap-4">
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
            <AvatarImage className="object-cover" src="/assets/profile.jpg" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex flex-col w-full gap-3 sm:gap-4">
            {/* This is now a button that opens the modal */}
            <div
              onClick={() => setIsModalOpen(true)}
              className="w-full min-h-12 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm bg-[#f9fafb] text-gray-500 cursor-pointer flex items-center"
            >
              আপনার মনের কথা শেয়ার করুন...
            </div>

            <div className="flex flex-wrap items-center gap-1">
              {postCreatorActions.map((action) => (
                <button
                  key={action.id}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium"
                  title={action.tooltip}
                  onClick={() => setIsModalOpen(true)}
                >
                  <action.icon size={18} className="text-gray-500" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Post Creation Modal - Facebook style */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="text-center text-lg font-semibold">
              পোস্ট তৈরি করুন
            </DialogTitle>
          </DialogHeader>

          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  className="object-cover"
                  src="/assets/profile.jpg"
                />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">আশিক রহমান</p>
              </div>
            </div>

            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="আপনার মনের কথা কি?"
              className="w-full min-h-[150px] border-0 text-lg focus:outline-none resize-none"
              autoFocus
            />
            <div className="border-t p-3">
              <div className="flex items-center justify-between p-2 border rounded-md">
                <span className="font-medium">আপনার পোস্টে যোগ করুন</span>
                <div className="flex gap-2">
                  {postCreatorActions.map((action) => (
                    <button
                      key={action.id}
                      className="p-2 hover:bg-gray-100 rounded-full"
                      title={action.tooltip}
                    >
                      <action.icon size={20} className="text-gray-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Category Radio Options */}
            <div className="mt-4 border-t pt-4">
              <p className="font-medium mb-2">
                পোস্টের ক্যাটাগরি নির্বাচন করুন:
              </p>
              <RadioGroup
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="flex flex-wrap gap-4"
              >
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={category.id} id={category.id} />
                    <Label htmlFor={category.id} className="cursor-pointer">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="p-3">
            <Button
              onClick={handlePostSubmit}
              disabled={!postContent.trim()}
              className="w-full bg-green-600 hover:bg-green-700 py-5 text-white rounded-md font-medium"
            >
              পরবর্তী
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostCreator;
