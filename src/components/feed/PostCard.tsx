import { PostProps } from "@/lib/constant";
import { useGetAuthorQuery } from "@/redux/features/auth/authApi";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function PostCard({ content, photo, authorId }: PostProps) {
  const { data: author } = useGetAuthorQuery(authorId);
  console.log("author", author);

  let role;
  if (author?.role === "SUPER_ADMIN") {
    role = "Admin";
  } else if (author?.role === "ADMIN") {
    role = "Modarator";
  }

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
}
