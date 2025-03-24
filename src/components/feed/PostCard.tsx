import { PostProps } from "@/lib/constant";
import { useGetAuthorQuery } from "@/redux/features/auth/authApi";
import { Heart, MessageCircle, Share2, Send, Copy, Facebook, Twitter, Linkedin, Link } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function PostCard({ content, photo, authorId }: PostProps) {
  const { data: author } = useGetAuthorQuery(authorId);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<{ text: string; author: string; avatar?: string }[]>([
    { text: "Great post!", author: "John Doe", avatar: "/assets/profile.JPG" },
    { text: "I agree with this", author: "Jane Smith" }
  ]);

  let role;
  if (author?.role === "SUPER_ADMIN") {
    role = "Admin";
  } else if (author?.role === "ADMIN") {
    role = "Modarator";
  }

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

  const handleAddComment = () => {
    if (commentText.trim()) {
      setComments([
        ...comments,
        {
          text: commentText,
          author: "You",
          avatar: "/assets/profile.JPG"
        }
      ]);
      setCommentText("");
      // Here you would typically call an API to save the comment
    }
  };

  const handleShare = (platform: string) => {
    // Create a shareable URL for this post
    const postUrl = `${window.location.origin}/post/${authorId}`;
    
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(postUrl)
          .then(() => alert('Link copied to clipboard!'))
          .catch(err => console.error('Failed to copy link: ', err));
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(content?.substring(0, 100) || '')}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`, '_blank');
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
            src={author?.avatar ? author?.avatar : "/assets/profile.JPG"}
          />
          <AvatarFallback>{author?.firstName}</AvatarFallback>
        </Avatar>
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">
              {`${author?.firstName} ${author?.lastName}`}{" "}
            </h3>
            <div className="flex items-center gap-2">
              {author?.role && (
                <span className="text-sm text-gray-500">{role}</span>
              )}
              <span className="text-sm text-gray-500">
                {moment(author?.createdAt).format("MMM ddd, yyyy, h:mm:ss a")}
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
          onClick={handleLikeClick}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          <span>{"23"}</span>
        </button>
        <button 
          className={`flex items-center gap-2 ${
            showComments ? "text-blue-500" : "hover:text-blue-500"
          }`}
          onClick={handleCommentClick}
        >
          <MessageCircle size={20} fill={showComments ? "currentColor" : "none"} />
          <span>{comments.length}</span>
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
              onClick={() => handleShare('copy')}
              className="flex flex-col items-center gap-1 hover:text-green-500"
            >
              <div className="bg-gray-100 p-3 rounded-full">
                <Copy size={20} />
              </div>
              <span className="text-xs">লিংক কপি</span>
            </button>
            <button 
              onClick={() => handleShare('facebook')}
              className="flex flex-col items-center gap-1 hover:text-blue-600"
            >
              <div className="bg-gray-100 p-3 rounded-full">
                <Facebook size={20} />
              </div>
              <span className="text-xs">ফেসবুক</span>
            </button>
            <button 
              onClick={() => handleShare('twitter')}
              className="flex flex-col items-center gap-1 hover:text-blue-400"
            >
              <div className="bg-gray-100 p-3 rounded-full">
                <Twitter size={20} />
              </div>
              <span className="text-xs">টুইটার</span>
            </button>
            <button 
              onClick={() => handleShare('linkedin')}
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
            {comments.map((comment, index) => (
              <div key={index} className="flex gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    className="object-cover"
                    src={comment.avatar || "/assets/profile.JPG"}
                  />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 p-2 rounded-lg flex-1">
                  <p className="font-medium text-sm">{comment.author}</p>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add comment input */}
          <div className="flex gap-2 items-center">
            <Avatar className="w-8 h-8">
              <AvatarImage
                className="object-cover"
                src="/assets/profile.JPG"
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
                  if (e.key === 'Enter') {
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
