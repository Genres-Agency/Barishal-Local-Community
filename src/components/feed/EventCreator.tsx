"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ImageIcon, Loader2, MapPin, X } from "lucide-react";
import { useAddEventMutation } from "@/redux/features/events/events.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUserQuery } from "@/redux/features/auth/authApi";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const EventCreator = () => {
  const [addEvent, { isLoading }] = useAddEventMutation();
  const { data: userData } = useGetUserQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    image: null as File | null,
    description: "",
    status: "UPCOMING",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setFormData((prev) => ({ ...prev, image: file }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("location", formData.location);
      data.append("description", formData.description);
      data.append("status", formData.status);
      data.append("time", new Date(formData.date).toISOString());

      if (formData.image) {
        data.append("image", formData.image);
      }

      await addEvent(data).unwrap();

      toast.success("ইভেন্টটি সফলভাবে তৈরি হয়েছে!");
      setFormData({
        title: "",
        date: "",
        location: "",
        image: null,
        description: "",
        status: "UPCOMING",
      });
      setImagePreview(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error("ইভেন্ট তৈরি করতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="px-2 md:px-3 sm:px-0">
      <div className="bg-green-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-3 sm:p-4 mb-4">
        <div className="flex gap-3 sm:gap-4 items-center">
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 flex items-center gap-2 text-left   text-white transition-colors duration-200"
          >
            <Calendar className="w-5 h-5" />
            <span>নতুন ইভেন্ট তৈরি করুন...</span>
          </button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] h-full p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b sticky top-0 bg-white z-10">
            <DialogTitle className="text-center text-lg font-semibold">
              নতুন ইভেন্ট তৈরি করুন
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="p-4 space-y-4 h-[calc(95vh-8rem)] overflow-y-auto">
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
                <p className="text-sm text-gray-500">পাবলিক ইভেন্ট</p>
              </div>
            </div>
            <div className="space-y-1.5 ">
              <Label htmlFor="title">ইভেন্টের নাম</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="ইভেন্টের নাম লিখুন"
                className="focus-visible:ring-green-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="date">তারিখ ও সময়</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="focus-visible:ring-green-500 pl-9"
                  required
                />
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="location">স্থান</Label>
              <div className="relative">
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="ইভেন্টের স্থান লিখুন"
                  className="focus-visible:ring-green-500 pl-9"
                  required
                />
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="status">স্টেটাস</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                required
              >
                <option value="UPCOMING">আসন্ন</option>
                <option value="ACTIVE">চলমান</option>
                <option value="COMPLETED">সমাপ্ত</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label>ছবি</Label>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200 w-full"
                >
                  <ImageIcon size={20} className="text-gray-600" />
                  <span className="font-medium text-gray-700">ছবি যোগ করুন</span>
                  <span className="text-sm text-gray-500 ml-auto">
                    {formData.image ? formData.image.name : "কোনো ফাইল নির্বাচন করা হয়নি"}
                  </span>
                </label>
                <Input
                  id="image-upload"
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                  required
                />
              </div>

              {imagePreview && (
                <div className="mt-2 relative rounded-lg overflow-hidden bg-gray-50 border border-gray-100 group">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={600}
                    height={400}
                    className="w-full max-h-[300px] object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (imagePreview) URL.revokeObjectURL(imagePreview);
                      setFormData((prev) => ({ ...prev, image: null }));
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} className="text-white" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white py-2 px-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {formData.image?.name}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">বিবরণ</Label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="ইভেন্টের বিবরণ লিখুন"
                  className="w-full min-h-[150px] border-0 text-lg focus:outline-none resize-none bg-transparent placeholder:text-gray-400 leading-relaxed"
                  autoFocus
                />
                <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                  {formData.description.length > 0 && `${formData.description.length} অক্ষর`}
                </div>
              </div>
            </div>

            <div className=" bottom-0 -mx-4 -mb-4 px-4 py-4 bg-white border-t flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-6 font-medium transition-colors duration-200"
              >
                বাতিল করুন
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6 font-medium transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "তৈরি করা হচ্ছে..." : "তৈরি করুন"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventCreator;
