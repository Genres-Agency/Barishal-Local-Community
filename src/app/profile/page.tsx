"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit2, MapPin } from "lucide-react";
import PersonalInfo from "@/components/profile/PersonalInfo";
import CommunityActivity from "@/components/profile/CommunityActivity";
import { mockUserProfile, posts } from "@/lib/config/profile";
import Posts from "@/components/profile/Posts";
import Settings from "@/components/profile/Settings";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "personal";

  const handleTabChange = (value: string) => {
    router.push(`/profile?tab=${value}`);
  };
  return (
    <div className="container mx-auto py-8 px-4 mt-16">
      {/* Profile Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/assets/profile.jpg" />
            <AvatarFallback>{mockUserProfile.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{mockUserProfile.name}</h1>
            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-2">
              <MapPin className="w-4 h-4" /> {mockUserProfile.location}
            </p>
            <p className="text-gray-600 mt-2">
              কমিউনিটি মেম্বার সিনস {mockUserProfile.memberSince}
            </p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Edit2 className="w-4 h-4 mr-2" /> প্রোফাইল এডিট
          </Button>
        </div>
      </div>

      {/* Profile Tabs */}
      <Tabs
        defaultValue={tab}
        value={tab}
        className="space-y-4"
        onValueChange={handleTabChange}
      >
        <TabsList className="bg-white p-1 rounded-lg shadow-sm w-full flex flex-wrap justify-start gap-2">
          <TabsTrigger value="personal" className="flex-1 md:flex-none">
            ব্যক্তিগত তথ্য
          </TabsTrigger>
          <TabsTrigger value="community" className="flex-1 md:flex-none">
            কমিউনিটি একটিভিটি
          </TabsTrigger>
          <TabsTrigger value="posts" className="flex-1 md:flex-none">
            পোস্টসমূহ
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1 md:flex-none">
            সেটিংস
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfo profile={mockUserProfile} />
        </TabsContent>

        <TabsContent value="community">
          <CommunityActivity stats={mockUserProfile.stats} />
        </TabsContent>

        <TabsContent value="posts">
          <Posts posts={posts} />
        </TabsContent>

        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
