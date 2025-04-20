"use client";

import { useRouter } from "next/navigation";

import { PostProps } from "@/lib/constant";
import { useGetAuthorQuery } from "@/redux/features/auth/authApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useAddCommentMutation,
  useGetSingleCommentQuery,
} from "@/redux/features/comment/comment.api";
import {
  useGetSingleLikeQuery,
  useToggleLikeMutation,
} from "@/redux/features/likes/like.api";
import { useAppSelector } from "@/redux/hooks";
import {
  Copy,
  Facebook,
  Heart,
  Linkedin,
  MessageCircle,
  Send,
  Share2,
  Twitter,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function PostCard({
  content,
  photo,
  authorId,
  _count,
  id,
}: PostProps) {
  const { data: author } = useGetAuthorQuery(authorId);
  const { data: comment } = useGetSingleCommentQuery(id);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(comment?.comments || []);
  const router = useRouter();

  // console.log("comment", comment);

  const user = useAppSelector(selectCurrentUser);
  const [toggleLike, { isLoading }] = useToggleLikeMutation();
  const { data: likes, refetch } = useGetSingleLikeQuery(id);

  // Add comment
  const [addComment, { isLoading: isCommentLoading }] = useAddCommentMutation();
  // console.log("likes", likes);

  console.log("user ==>", user);
  // Fix the handleLike function to ensure id is properly converted to a number
  const handleLike = async () => {
    try {
      if (!user) {
        return router.push("/auth");
      }
      console.log("post id is before like ==>", id);

      await toggleLike({ postId: id });
      // console.log("post after like id is ==>>>>>>>", id);
      refetch(); // refresh likes count
      // Update the local state to reflect the change
      setIsLiked(!isLiked);
    } catch (err) {
      // console.error("Failed to toggle like", err);
    }
  };

  // Remove the unused handleLikeClick function since you're using handleLike
  // const handleLikeClick = () => {
  //   setIsLiked(!isLiked);
  //   // Here you would typically call an API to update the like status
  // };
  let role;
  if (author?.role === "SUPER_ADMIN") {
    role = "Admin";
  } else if (author?.role === "ADMIN") {
    role = "Modarator";
  } else if (author?.role === "USER") {
    role = "User";
  }

  console.log("Author", author);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    // Here you would typically call an API to update the like status
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
    if (showShareOptions) setShowShareOptions(false);
  };

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
    if (showComments) setShowComments(false);
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      if (!user) {
        return router.push("/auth");
      }
      await addComment({ postId: id, content: commentText });
      const updatedComments = Array.isArray(comments) ? comments : [];
      setComments([
        ...updatedComments,
        {
          id: Date.now(), // Temporary ID for new comment
          content: commentText,
          createdAt: new Date().toISOString(),
        },
      ]);
      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleShare = (platform: string) => {
    // Create a shareable URL for this post
    const postUrl = `${window.location.origin}/post/${authorId}`;

    switch (platform) {
      case "copy":
        navigator.clipboard
          .writeText(postUrl)
          .then(() => alert("Link copied to clipboard!"))
          .catch((err) => console.error("Failed to copy link: ", err));
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            postUrl
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            postUrl
          )}&text=${encodeURIComponent(content?.substring(0, 100) || "")}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            postUrl
          )}`,
          "_blank"
        );
        break;
    }

    setShowShareOptions(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-start gap-3 mb-4">
        <Avatar>
          <AvatarImage
            className="object-cover "
            src={author?.avatar ? author?.avatar : "/assets/user.png"}
          />
          <AvatarFallback>{author?.firstName}</AvatarFallback>
        </Avatar>
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">
              {`${author?.firstName} ${author?.lastName}`}{" "}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{role}</span>

              <span className="text-sm text-gray-500">
                {moment(author?.createdAt).format("dddd, MMMM Do YYYY")}

                {/* {moment(comment.createdAt).fromNow()} */}
              </span>
            </div>
          </div>

          <button className="mt-2 h-7 px-3 rounded-md bg-[#ffeaea] text-[#af1e1e] text-xs font-bold">
            রিপোর্ট এন্ড লস্ট
          </button>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{content}</p>
      {photo && (
        <div className="mb-4">
          <Image
            src={photo}
            alt="Post content"
            width={600}
            height={400}
            className="rounded-lg w-full object-cover"
          />
        </div>
      )}
      <div className="flex items-center gap-6 text-gray-500">
        <button
          className={`flex items-center gap-2 ${
            isLiked ? "text-red-500" : "hover:text-red-500"
          }`}
          onClick={handleLike}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          <span>{likes?.count || 0}</span>
        </button>
        <button
          className={`flex items-center gap-2 ${
            showComments ? "text-blue-500" : "hover:text-blue-500"
          }`}
          onClick={handleCommentClick}
        >
          <MessageCircle
            size={20}
            fill={showComments ? "currentColor" : "none"}
          />
          <span>{comment?.count}</span>
        </button>
        <button
          className={`flex items-center gap-2 ${
            showShareOptions ? "text-green-500" : "hover:text-green-500"
          }`}
          onClick={handleShareClick}
        >
          <Share2 size={20} fill={showShareOptions ? "currentColor" : "none"} />
          <span>{"4"}</span>
        </button>
      </div>

      {/* Share options */}
      {showShareOptions && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-3">শেয়ার করুন</h4>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleShare("copy")}
              className="flex flex-col items-center gap-1 hover:text-green-500"
            >
              <div className="bg-gray-100 p-3 rounded-full">
                <Copy size={20} />
              </div>
              <span className="text-xs">লিংক কপি</span>
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="flex flex-col items-center gap-1 hover:text-blue-600"
            >
              <div className="bg-gray-100 p-3 rounded-full">
                <Facebook size={20} />
              </div>
              <span className="text-xs">ফেসবুক</span>
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className="flex flex-col items-center gap-1 hover:text-blue-400"
            >
              <div className="bg-gray-100 p-3 rounded-full">
                <Twitter size={20} />
              </div>
              <span className="text-xs">টুইটার</span>
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="flex flex-col items-center gap-1 hover:text-blue-700"
            >
              <div className="bg-gray-100 p-3 rounded-full">
                <Linkedin size={20} />
              </div>
              <span className="text-xs">লিংকডইন</span>
            </button>
          </div>
        </div>
      )}

      {/* Comments section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-3">মন্তব্য</h4>

          {/* Comment list */}
          <div className="space-y-3 mb-4">
            {comment?.comments?.map(
              (comment: {
                id: string | number;
                content: string;
                createdAt: string;
              }) => (
                <div key={comment.id} className="flex gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      className="object-cover"
                      src={"/assets/user.png"}
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 p-2 rounded-lg flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm">{comment.content}</p>
                      <span className="text-xs text-gray-500">
                        {moment(comment.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Add comment input */}
          <div className="flex gap-2 items-center">
            <Avatar className="w-8 h-8">
              <AvatarImage className="object-cover" src="/assets/profile.JPG" />
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
                    handleAddComment();
                  }
                }}
              />
              <button
                onClick={handleAddComment}
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
  );
}
