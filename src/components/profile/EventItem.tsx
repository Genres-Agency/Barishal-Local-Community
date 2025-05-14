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
import { useDeleteEventMutation } from "@/redux/features/events/events.api";
import { Event } from "@/types/global";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import EditEventModal from "./EditEventModal";

export default function EventItem({
  id,
  title,
  time,
  location,
  description,
  image,
  createdAt,
  updatedAt,
  authorId,
  status,
}: Event) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletePost] = useDeleteEventMutation();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
    <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDate(createdAt)}
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {location}
            </span>
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
      {image && (
        <div className="relative w-full h-64 mt-4 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="text-gray-700 prose prose-lg max-w-none my-6">
        <p className="whitespace-pre-wrap">
          {isExpanded ? description : description?.slice(0, 150)}
          {description?.length > 150 && !isExpanded && "..."}
        </p>
        {description?.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-2 flex items-center"
          >
            {isExpanded ? "Show Less" : "Show More"}
            <svg
              className={`w-4 h-4 ml-1 transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>

      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={{
          id,
          title,
          time,
          location,
          description,
          image,
          status,
        }}
      />
    </div>
  );
}
