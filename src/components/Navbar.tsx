"use client";
import { navigationItemsLeftSite } from "@/lib/config/navigation";
import { logoutMenuItem, profileMenuItems } from "@/lib/config/profileMenu";

import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Menu, Search, User, X } from "lucide-react";
import Link from "next/link";
// import {useGetUserQuery} from '@/redux/features/user/userApi'
import { useRouter } from "next/navigation";
import { useState } from "react";
import LeftSidebar from "./navigation/leftSide/LeftSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { useGetUserQuery } from "@/redux/features/auth/authApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLogoutMutation } from "@/redux/features/auth/authApi";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [signOut] = useLogoutMutation()
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectCurrentUser);
  const { data: user } = useGetUserQuery(undefined, {
    // Skip the query if we don't have a token
    skip: !userData?.userId,
  });
  const router = useRouter();
  // console.log("user Data", userData);
  // console.log("user", user);

  const handleLogout = () => {
    dispatch(logout());
    signOut()
    router.push("/auth");
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 md:justify-between">
          <div className="flex items-center w-full md:w-auto justify-between">
            <Link href="/" className="text-xl font-bold">
              বরিশাল কমিউনিটি
            </Link>
            <div className="flex items-center gap-2 md:hidden">
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              >
                <Search size={20} className="text-gray-600" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="text-gray-600" />
                ) : (
                  <Menu size={20} className="text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div
            className={`relative w-full md:w-auto ${
              isMobileSearchOpen ? "block" : "hidden md:block"
            } transition-all duration-300 ease-in-out`}
          >
            <Search
              className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400"
              size={20}
            />
            <input
              type="search"
              placeholder="কমিউনিটিতে অনুসন্ধান করুন"
              className="w-full md:w-[532px] pl-10 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {!userData?.userId && (
              <Link
                href="/auth"
                className="px-4 py-2 text-sm text-green-600 font-medium hover:text-green-700 border border-green-600 rounded-md flex items-center gap-2"
              >
                <User size={18} /> সাইন ইন
              </Link>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-4 py-2 text-sm text-white bg-green-600 rounded-md font-medium hover:bg-green-700 flex items-center gap-2">
                  <Menu size={20} /> মেইন মেনু
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {navigationItemsLeftSite.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {userData?.userId && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="ml-4 cursor-pointer">
                    <AvatarImage src="assets/user.png" />
                    <AvatarFallback>USER</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {profileMenuItems.map((item, index) => (
                    <DropdownMenuItem key={index} asChild>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className={`flex items-center gap-2 cursor-pointer ${
                      logoutMenuItem.variant === "destructive"
                        ? "text-red-600 focus:text-red-600"
                        : ""
                    }`}
                  >
                    <logoutMenuItem.icon className="w-4 h-4" />
                    <span>{logoutMenuItem.label}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full overflow-y-auto">
            <div className="p-4 border-b">
              <Link
                href="/auth"
                className="w-full px-4 py-2 text-sm text-green-600 font-medium hover:text-green-700 border border-green-600 rounded-md flex items-center justify-center gap-2"
              >
                <User size={18} /> সাইন ইন
              </Link>
            </div>
            <LeftSidebar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
