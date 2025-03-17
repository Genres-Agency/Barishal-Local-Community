import { PostProps } from "@/lib/constant";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const PostCard: React.FC<PostProps> = ({ content, photo }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
    <div className="flex items-start gap-3 mb-4">
      <Avatar>
        <AvatarImage className="object-cover " src={"/assets/profile.JPG"} />
        <AvatarFallback>{"ইমতিয়াজ হোসেন"}</AvatarFallback>
      </Avatar>
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900">{"ইমতিয়াজ হোসেন"}</h3>
          <div className="flex items-center gap-2">
            {/* {author.role && (
              <span className="text-sm text-gray-500">{"Modarator"}</span>
            )} */}
            <span className="text-sm text-gray-500">
              {"2025-03-12T14:16:04.496Z"}
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
      <button className="flex items-center gap-2 hover:text-red-500">
        <Heart size={20} />
        {/* <span>{likes}</span> */}
      </button>
      <button className="flex items-center gap-2 hover:text-blue-500">
        <MessageCircle size={20} />
        {/* <span>{comments}</span> */}
      </button>
      <button className="flex items-center gap-2 hover:text-green-500">
        <Share2 size={20} />
        {/* <span>{shares}</span> */}
      </button>
    </div>
  </div>
);

export default PostCard;
