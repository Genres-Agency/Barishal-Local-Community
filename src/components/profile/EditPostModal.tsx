"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdatePostMutation } from "@/redux/features/post/post.api";
import { DialogDescription } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: string;
    content: string;
    photo?: string;
  };
}

export default function EditPostModal({
  isOpen,
  onClose,
  post,
}: EditPostModalProps) {
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [formData, setFormData] = useState({
    content: post.content || "",
    photo: null as File | null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        submitData.append(key, value);
      }
    });

    console.log("submitData ===>", submitData, post.id);

    try {
      await updatePost({
        postId: post.id,
        formData: submitData,
      }).unwrap();
      toast.success("পোস্ট আপডেট সফল হয়েছে");
      onClose();
    } catch (error) {
      toast.error("পোস্ট আপডেট ব্যর্থ হয়েছে");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] w-[90vw] p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-semibold">
            পোস্ট সম্পাদনা করুন
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            আপনার পোস্টের তথ্য পরিবর্তন করুন। সব ফিল্ড পূরণ করা বাধ্যতামূলক নয়।
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            {/* Post Content */}
            <div className="grid gap-2">
              <Label htmlFor="content">কন্টেন্ট</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="min-h-[150px]"
                placeholder="আপনার পোস্টের বিষয়বস্তু লিখুন"
              />
            </div>

            {/* Image Upload */}
            <div className="flex items-start gap-6 bg-gray-50 p-4 rounded-lg">
              {(formData.photo || post.photo) && (
                <div className="relative w-32 h-32">
                  <Image
                    src={
                      formData.photo
                        ? URL.createObjectURL(formData.photo)
                        : post.photo || "/assets/placeholder.png"
                    }
                    alt="Post image"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, photo: null })}
                    className="absolute -top-2 -right-2 bg-black bg-opacity-50 rounded-full p-1"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              )}
              <div className="flex-1">
                <Label htmlFor="image">পোস্টের ছবি</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                বাতিল
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? "আপডেট হচ্ছে..." : "সেভ করুন"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
