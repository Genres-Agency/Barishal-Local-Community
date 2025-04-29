"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetUserQuery } from "@/redux/features/auth/authApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useAddCommentMutation,
  useGetSingleCommentQuery,
} from "@/redux/features/comment/comment.api";
import {
  useGetSingleLikeQuery,
  useToggleLikeMutation,
} from "@/redux/features/likes/like.api";
import { useGetSinglePostQuery } from "@/redux/features/post/post.api";
import { useAppSelector } from "@/redux/hooks";
import { Heart, MessageCircle, Send } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: post, isLoading } = useGetSinglePostQuery(id);
  const { data: comment } = useGetSingleCommentQuery(id);
  const { data: user } = useGetUserQuery(undefined);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [toggleLike] = useToggleLikeMutation();
  const { data: likes, refetch } = useGetSingleLikeQuery(id);
  const [addComment] = useAddCommentMutation();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-96 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">পোস্ট পাওয়া যায়নি</h1>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("bn-BD", options);
  };

  return (
    <div className="relative z-40 mt-16 lg:mt-20">
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {post?.photo && (
          <div className="relative w-full h-[400px]">
            <Image
              src={post.photo}
              alt="Post image"
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
            <span>{formatDate(post.createdAt)}</span>
          </div>

          <div className="prose prose-lg max-w-none mb-6 whitespace-pre-wrap">
            {post.content}
          </div>

          <div className="flex items-center gap-6 text-gray-600">
            <button
              className={`flex items-center gap-2 ${
                likes?.count ? "text-red-500" : "hover:text-red-500"
              }`}
              onClick={async () => {
                if (!currentUser) return router.push("/auth");
                await toggleLike({ postId: id });
                refetch();
              }}
            >
              <Heart size={20} fill={likes?.count ? "currentColor" : "none"} />
              <span>{likes?.count || 0}</span>
            </button>
            <button
              className={`flex items-center gap-2 ${
                showComments ? "text-blue-500" : "hover:text-blue-500"
              }`}
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle
                size={20}
                fill={showComments ? "currentColor" : "none"}
              />
              <span>{comment?.count || 0}</span>
            </button>
          </div>

          {showComments && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-3">মন্তব্য</h4>

              <div className="space-y-3 mb-4">
                {comment?.comments?.map(
                  (comment: {
                    id: string | number;
                    content: string;
                    updatedAt: string;
                  }) => (
                    <div key={comment.id} className="flex gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          className="object-cover"
                          src={user ? user?.avatar : "/assets/user.png"}
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 p-2 rounded-lg flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-sm">{comment?.content}</p>
                          <span className="text-xs text-gray-500">
                            {moment(comment.updatedAt).fromNow()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="flex gap-2 items-center">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    className="object-cover"
                    src={user?.avatar ? user?.avatar : "/assets/user.png"}
                  />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2 bg-gray-100 rounded-full px-3 py-1">
                  <input
                    type="text"
                    placeholder="আপনার মন্তব্য লিখুন..."
                    className="bg-transparent flex-1 outline-none text-sm"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (!currentUser) return router.push("/auth");
                        addComment({ postId: id, content: commentText });
                        setCommentText("");
                      }
                    }}
                  />
                  <button
                    onClick={async () => {
                      if (!currentUser) return router.push("/auth");
                      await addComment({ postId: id, content: commentText });
                      setCommentText("");
                    }}
                    className="text-blue-500"
                    disabled={!commentText.trim()}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
