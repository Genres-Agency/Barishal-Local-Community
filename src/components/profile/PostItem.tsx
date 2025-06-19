"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeletePostMutation } from "@/redux/features/post/post.api";
import { PostItemProps } from "@/types/global";
import { getStatusColor } from "@/utils/globals";
import { Edit2, Hash, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import EditPostModal from "./EditPostModal";

export default function PostItem({
  id,
  content,
  hashTag,
  photo,
  updatedAt,
  _count,
  categoryId,
  status,
}: PostItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletePost] = useDeletePostMutation();

  const handleDeletePost = async () => {
    try {
      await deletePost(id).unwrap();
      toast.success("পোস্টটি সফলভাবে মুছে ফেলা হয়েছে");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("পোস্টটি মুছে ফেলতে সমস্যা হয়েছে");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-600">
            {new Date(updatedAt).toLocaleDateString("bn-BD")}
          </p>
          {status && (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                status
              )}`}
            >
              {status}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit2 className="w-4 h-4 mr-2" /> এডিট
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" /> ডিলিট
          </Button>

          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
                <AlertDialogDescription>
                  এই পোস্টটি মুছে ফেলা হবে। এই ক্রিয়াটি অপরিবর্তনীয়।
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>বাতিল</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeletePost}
                  className="bg-red-600 hover:bg-red-700"
                >
                  মুছে ফেলুন
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      {photo && (
        <div className="relative w-full h-full  mt-4 rounded-lg overflow-hidden">
          <Image src={photo} alt="Post image" fill className="object-cover" />
        </div>
      )}
      <div className="text-gray-700 prose prose-lg max-w-none mb-6">
        <p className="whitespace-pre-wrap">
          {isExpanded ? content : content?.slice(0, 100)}
          {content?.length > 100 && !isExpanded && "..."}
        </p>
        {content?.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-2"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
      {hashTag?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {hashTag?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center text-sm text-blue-600"
            >
              <Hash className="w-3 h-3 mr-1" />
              {tag?.slug}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
        <span>👍 {_count.likes} লাইক</span>
        <span>💬 {_count.comments} কমেন্ট</span>
      </div>

      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={{
          id,
          content,
          // categoryId,
          // hashTagId: hashtag?.[0]?.id,
          photo,
        }}
      />
    </div>
  );
}
