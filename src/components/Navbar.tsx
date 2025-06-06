"use client";
import { ChevronDown, Menu, Search, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useGetUserQuery } from "@/redux/features/auth/authApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllCategoryQuery } from "@/redux/features/category/category.api";
import { useAppSelector } from "@/redux/hooks";

import { useAuthActions } from "@/hooks/useAuthActions";
import { useSearchPosts } from "@/hooks/useSearchPosts";

import { navigationItemsLeftSite } from "@/lib/config/navigation";
import { logoutMenuItem, profileMenuItems } from "@/lib/config/profileMenu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const userData = useAppSelector(selectCurrentUser);
  const { data: user } = useGetUserQuery(undefined, {
    skip: !userData?.userId,
  });
  const { data: categories } = useGetAllCategoryQuery([]);

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    showSearchDropdown,
    setShowSearchDropdown,
    setCategoryId,
  } = useSearchPosts();

  const { handleLogout } = useAuthActions();

  const onSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // handleSearch(searchQuery, selectedCategory);
  };

  const handleSearchFocus = () => setShowSearchDropdown(true);
  const handleSearchBlur = () =>
    setTimeout(() => setShowSearchDropdown(false), 200);

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
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Search size={20} className="text-gray-600" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-full"
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
            <form
              onSubmit={onSubmitSearch}
              className="relative flex items-center"
            >
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCategoryId(e.target.value);
                  }}
                  className="h-full px-4 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none pr-8 bg-gray-50 border-r-0 rounded-l-lg"
                >
                  <option value="">সব ক্যাটাগরি</option>
                  {categories?.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
              </div>
              <div className="relative flex-grow">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  placeholder="কমিউনিটিতে অনুসন্ধান করুন"
                  className="w-full md:w-[400px] px-4 py-2.5 border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 border-x-0"
                />

                {showSearchDropdown && (
                  <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-50 max-h-[300px] overflow-auto">
                    {isLoading ? (
                      <div className="p-3 text-sm text-gray-500 text-center">
                        লোড হচ্ছে...
                      </div>
                    ) : searchResults.length > 0 ? (
                      searchResults.slice(0, 4).map((post) => (
                        <Link
                          key={post.id}
                          href={`/post/${post.id}`}
                          className="block p-3 hover:bg-gray-100 border-b last:border-b-0"
                          onClick={() => setShowSearchDropdown(false)}
                        >
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {post?.content}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            {post.category && (
                              <>
                                <span>•</span>
                                <span>{post.category.title}</span>
                              </>
                            )}
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-3 text-sm text-gray-500 text-center">
                        কোনো ফলাফল পাওয়া যায়নি
                      </div>
                    )}
                  </div>
                )}
                {/* {showSearchDropdown && searchResults.length > 0 && (
                  <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-50">
                    {searchResults.slice(0, 4).map((post) => (
                      <Link
                        key={post.id}
                        href={`/post/${post.id}`}
                        className="block p-3 hover:bg-gray-100 border-b last:border-b-0"
                        onClick={() => setShowSearchDropdown(false)}
                      >
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {post?.content}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          {post.category && (
                            <>
                              <span>•</span>
                              <span>{post.category.title}</span>
                            </>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )} */}
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm text-white bg-green-600 rounded-r-lg font-medium hover:bg-green-700 transition-colors border border-green-600"
              >
                অনুসন্ধান
              </button>
            </form>
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
                    <AvatarImage src={user?.avatar || "/assets/user.png"} />
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
    </nav>
  );
};

export default Navbar;
