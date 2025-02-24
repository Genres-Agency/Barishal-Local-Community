import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menu, Search, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              বরিশাল কমিউনিটি
            </Link>
          </div>
          <div className="relative">
            <Search
              className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400"
              size={20}
            />
            <input
              type="search"
              placeholder="কমিউনিটিতে অনুসন্ধান করুন"
              className="w-[532px] pl-10 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-sm text-green-600 font-medium hover:text-green-700 border border-green-600 rounded-md flex items-center gap-2">
              <User size={18} /> সাইন ইন
            </button>
            <button className="px-4 py-2 text-sm text-white bg-green-600 rounded-md font-medium hover:bg-green-700 flex items-center gap-2">
              <Menu size={20} /> মেইন মেনু
            </button>

            <Avatar className="ml-4">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
