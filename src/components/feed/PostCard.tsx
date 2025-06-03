"use client";

import {
  useGetAuthorQuery,
  useGetUserQuery,
} from "@/redux/features/auth/authApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleCategoryQuery } from "@/redux/features/category/category.api";
import {
  useAddCommentMutation,
  useGetSingleCommentQuery,
} from "@/redux/features/comment/comment.api";
import {
  useGetSingleLikeQuery,
  useToggleLikeMutation,
} from "@/redux/features/likes/like.api";
import { useAppSelector } from "@/redux/hooks";
import { extractLink, getCleanContent } from "@/utils/globals";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface IHashTag {
  id: number;
  title: string;
  slug: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

interface PostCardProps {
  content: string;
  photo?: string;
  authorId: number;
  id: number;
  categoryId: number;
  createdAt: string;
  hashTag: IHashTag[];
}

interface IComments {
  id: number;
  content: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
  updatedAt: string;
}

export default function PostCard({
  content,
  photo,
  authorId,
  id,
  categoryId,
  createdAt,
  hashTag,
}: PostCardProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: author } = useGetAuthorQuery(authorId);
  const { data: comment } = useGetSingleCommentQuery(id);
  const { data: category } = useGetSingleCategoryQuery(categoryId);
  const { data: user } = useGetUserQuery(undefined);

  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(comment?.comments || []);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  // console.log("comments", comment);
  // console.log('user==>', user)

  const [toggleLike] = useToggleLikeMutation();
  const { data: likes, refetch } = useGetSingleLikeQuery(id);

  // Add comment
  const [addComment] = useAddCommentMutation();
  // console.log("likes", likes);

  // console.log("user ==>", user);
  // Fix the handleLike function to ensure id is properly converted to a number
  const handleLike = async () => {
    // console.log("current user id ==>", currentUser);
    try {
      if (!currentUser) {
        return router.push("/auth");
      }
      // console.log("post id is before like ==>", id);

      await toggleLike({ postId: id });
      // console.log("post after like id is ==>>>>>>>", id);
      refetch(); // refresh likes count
      // Update the local state to reflect the change
      setIsLiked(!isLiked);
    } catch (err) {
      // console.error("Failed to toggle like", err);
    }
  };

  let role;
  if (author?.role === "SUPER_ADMIN") {
    role = "Admin";
  } else if (author?.role === "ADMIN") {
    role = "Modarator";
  } else if (author?.role === "USER") {
    role = "User";
  }

  // console.log("Author", author);
  // console.log("user from post card", user);

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
      if (!currentUser) {
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
    <div className="bg-white rounded-lg shadow-sm p-3 lg:p-4 mb-4">
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
                {moment(createdAt).fromNow()}

                {/* {moment(comment.createdAt).fromNow()} */}
              </span>
            </div>
          </div>

          <button className="mt-2 h-7 px-3 rounded-md bg-[#ffeaea] text-[#af1e1e] text-xs font-bold">
            {category?.title}
          </button>
        </div>
      </div>
      <div className="text-gray-700 prose prose-lg max-w-none mb-6">
        <p className="whitespace-pre-wrap">
          {isExpanded
            ? getCleanContent(content)
            : getCleanContent(content)?.slice(0, 70)}
          {getCleanContent(content)?.length > 70 && !isExpanded && "..."}
        </p>
        {getCleanContent(content)?.length > 70 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-2"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )}
        {/* link  */}
        {extractLink(content) && (
          <div className="mt-4">
            <Link
              href={extractLink(content) as string}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-2"
            >
              {extractLink(content) as string}
            </Link>
          </div>
        )}
        {/* hashTag */}
        {hashTag?.map((hashTag) => {
          return (
            <Link
              href={`/category/${hashTag?.slug}`}
              key={hashTag?.id}
              className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-8"
            >
              #{hashTag?.slug}
            </Link>
          );
        })}
      </div>

      {photo && (
        <Link href={`/post/${id}`}>
          <div className="mb-4">
            <Image
              src={photo}
              alt="Post content"
              width={600}
              height={400}
              // className="rounded-lg w-full lg:h-[368px] object-cover"
              className="rounded-lg w-full  object-contain"
            />
          </div>
        </Link>
      )}
      <div className="flex items-center gap-6 text-gray-500">
        <button
          className={`flex items-center gap-2 ${
            likes?.count ? "text-red-500" : "hover:text-red-500"
          }`}
          onClick={handleLike}
        >
          <Heart size={20} fill={likes?.count ? "currentColor" : "none"} />
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
          {/* <span>{"4"}</span> */}
        </button>
      </div>

      {/* Share options */}
      {showShareOptions && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-3">শেযার করুন</h4>
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
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">
              মন্তব্য ({comment?.count || 0})
            </h4>
            {comment?.count > 0 && (
              <button className="text-sm text-gray-500 hover:text-gray-700">
                সব দেখুন
              </button>
            )}
          </div>

          {/* Comment list */}
          <div className="space-y-4 mb-6">
            {comment?.comments?.map((comment: IComments) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarImage
                    className="object-cover"
                    src={
                      comment?.user ? comment?.user?.avatar : "/assets/user.png"
                    }
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">
                        {comment?.user?.firstName || "Anonymous"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {moment(comment.updatedAt).fromNow()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment?.content}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-1 pl-3">
                    <button className="text-xs text-gray-500 hover:text-gray-700">
                      Like
                    </button>
                    <button className="text-xs text-gray-500 hover:text-gray-700">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add comment input */}
          <div className="flex gap-3 items-start">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarImage
                className="object-cover"
                src={user?.avatar ? user?.avatar : "/assets/user.png"}
              />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex gap-2 bg-gray-50 rounded-lg px-4 py-2">
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
                  className={`text-blue-500 hover:text-blue-600 transition-colors ${
                    !commentText.trim() && "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!commentText.trim()}
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1 pl-3">
                Press Enter to post
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
