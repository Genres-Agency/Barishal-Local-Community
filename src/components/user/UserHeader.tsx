import Image from "next/image";

import { userInfo } from "@/lib/constant";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserHeader() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="mb-4 ">
        <Image
          src={userInfo.backgroundImage}
          alt="Post content"
          width={600}
          height={400}
          className="rounded-lg w-full  object-cover"
        />
      </div>
      <div className="flex items-center justify-center gap-3 mb-4 -mt-20">
        <Avatar className="w-32 h-32 border-4 border-white ">
          <AvatarImage className="object-cover" src={userInfo.image} />
          <AvatarFallback>{userInfo.name}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center justify-center flex-col ">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold ">{userInfo.name} </h2>
          <Image
            src="/assets/verified.svg"
            alt="Post content"
            width={14}
            height={14}
            className="rounded-lg  w-4 h-4"
          />
        </div>
        <p className="text-[#142E209E]">{userInfo.username}</p>
        <small className="py-1">
          Followers {userInfo.followers} হাজার | Following {userInfo.following}
        </small>
      </div>
    </div>
  );
}
