"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetUserQuery } from "@/redux/features/auth/authApi";
import { useGetAllCategoryQuery } from "@/redux/features/category/category.api";
import { useAddPostMutation } from "@/redux/features/post/post.api";
import { Image as ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const PostCreator: React.FC = () => {
  const [postContent, setPostContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [addPost, { isLoading }] = useAddPostMutation();

  const { data: categories } = useGetAllCategoryQuery(undefined);
  const { data: userData } = useGetUserQuery(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (preview) URL.revokeObjectURL(preview);
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    if (categories?.length) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories]);

  const handlePostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("content", postContent);
      formData.append("categoryId", selectedCategory);
      formData.append("hashTag", "#programming");
      if (file) formData.append("image", file);

      const result = await addPost(formData);
      if ("data" in result) {
        toast.success("পোস্টটি সফলভাবে তৈরি হয়েছে");
        setPostContent("");
        setSelectedCategory("reports");
        if (preview) URL.revokeObjectURL(preview);
        setFile(null);
        setPreview(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error("পোস্ট তৈরি করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="px-2 md:px-3 sm:px-0">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-3 sm:p-4 mb-4">
        <div className="flex gap-3 sm:gap-4 items-center">
          <Avatar className="w-10 h-10 ring-2 ring-gray-100">
            <AvatarImage
              className="object-cover"
              src={userData?.avatar || "/assets/user.png"}
            />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 text-left px-4 py-2.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors duration-200"
          >
            আপনার মনের কথা শেয়ার করুন...
          </button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b sticky top-0 bg-white z-10">
            <DialogTitle className="text-center text-lg font-semibold">
              পোস্ট তৈরি করুন
            </DialogTitle>
          </DialogHeader>

          <div className="p-4 max-h-[calc(90vh-8rem)] overflow-y-auto">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-10 h-10 ring-2 ring-gray-100">
                <AvatarImage
                  className="object-cover"
                  src={userData?.avatar || "/assets/user.png"}
                />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">
                  {userData?.firstName} {userData?.lastName}
                </p>
                <p className="text-sm text-gray-500">পাবলিক পোস্ট</p>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="আপনার মনের কথা কি?"
                className="w-full min-h-[150px] border-0 text-lg focus:outline-none resize-none bg-transparent placeholder:text-gray-400 leading-relaxed"
                autoFocus
              />
              <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                {postContent.length > 0 && `${postContent.length} অক্ষর`}
              </div>
            </div>

            {preview && (
              <div className="mt-4 relative rounded-lg overflow-hidden bg-gray-50 border border-gray-100 group">
                <Image
                  src={preview}
                  alt="Selected image"
                  width={600}
                  height={400}
                  className="w-full max-h-[300px] object-contain"
                />
                <button
                  onClick={() => {
                    if (preview) URL.revokeObjectURL(preview);
                    setFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
                >
                  <X size={16} className="text-white" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white py-2 px-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {file?.name}
                </div>
              </div>
            )}

            <div className="border-t border-gray-100 mt-4 pt-4 space-y-4">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200 w-full"
                >
                  <ImageIcon size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-700">ছবি যোগ করুন</span>
                  <span className="text-sm text-gray-500 ml-auto">{file ? file.name : "কোনো ফাইল নির্বাচন করা হয়নি"}</span>
                </label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="space-y-3">
                <p className="font-medium text-gray-900">
                  পোস্টের ক্যাটাগরি নির্বাচন করুন:
                </p>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category: any) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                        className="cursor-pointer font-medium"
                      >
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="p-4 border-t sticky bottom-0 bg-white flex gap-3">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              className="flex-1 py-6 font-medium transition-colors duration-200"
            >
              বাতিল করুন
            </Button>
            <Button
              onClick={handlePostSubmit}
              disabled={(!postContent.trim() && !file) || isLoading}
              className="flex-1 bg-green-600 hover:bg-green-700 py-6 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
              {isLoading ? "পোস্ট করা হচ্ছে..." : "পোস্ট করুন"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostCreator;
