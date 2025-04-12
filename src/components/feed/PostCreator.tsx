"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetAllCategoryQuery } from "@/redux/features/category/category.api";
import { useAddPostMutation } from "@/redux/features/post/post.api";
import { Image, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const PostCreator: React.FC = () => {
  const [postContent, setPostContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("reports");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [addPost] = useAddPostMutation();

  const { data: categories } = useGetAllCategoryQuery(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview(URL.createObjectURL(selectedFile)); // Preview the image
    }
  };

  const handlePostSubmit = async () => {
    if (!postContent.trim() && !file) return;

    try {
      const data = new FormData();

      // Add data to FormData
      data.append("content", postContent);
      data.append("categoryId", selectedCategory);
      data.append("hashTag", "#programming");

      if (file) {
        data.append("image", file);
      }

      // Log what we're sending
      console.log("Sending post data:");
      for (let [key, value] of data.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Call the API and capture the response
      const result = await addPost(data);
      console.log("API Response:", result);

      // RTK Query returns an object with either 'data' or 'error'
      if ("data" in result) {
        console.log("Post created successfully:", result.data);

        // Reset form state
        setPostContent("");
        setSelectedCategory("reports");
        if (preview) {
          URL.revokeObjectURL(preview);
        }
        setFile(null);
        setPreview(null);
        setIsModalOpen(false);
      } else if ("error" in result) {
        // More detailed error logging
        console.error("API Error Response:", result.error);

        // Fix the type issue by using a type guard
        let errorMessage = "Failed to create post";

        // Use a safer approach to check for error data
        const errorData = result.error as any;
        if (errorData && typeof errorData === "object" && "data" in errorData) {
          errorMessage += `: ${JSON.stringify(errorData.data)}`;
        }

        console.log(errorMessage);
      }
    } catch (error) {
      console.error("Exception during post creation:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
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
          </div>
        </div>
      </div>

      {/* Post Creation Modal - Facebook style */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-auto max-h-[90vh]">
          <DialogHeader className="p-4 border-b sticky top-0 bg-white z-10">
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

            {/* Display image preview if available */}
            {preview && (
              <div className="mt-4 relative">
                <img
                  src={preview}
                  alt="Selected image"
                  className="w-full max-h-60 object-contain rounded-md"
                />
                <button
                  onClick={() => {
                    if (preview) {
                      URL.revokeObjectURL(preview);
                    }
                    setFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            )}

            {/* Image upload section */}
            <div className="border-t p-3 mt-4">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <Image size={20} className="text-gray-500" />
                  <span className="font-medium">ছবি যোগ করুন</span>
                </label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={preview ? "hidden" : ""}
                />
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
                {categories?.map((category: any) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem value={category.id} id={category.id} />
                    <Label htmlFor={category.id} className="cursor-pointer">
                      {category.title}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="p-3 sticky bottom-0 bg-white border-t">
            <Button
              onClick={handlePostSubmit}
              disabled={!postContent.trim() && !file}
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
