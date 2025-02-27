"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Edit2, MapPin } from "lucide-react";
import PersonalInfo from "@/components/profile/PersonalInfo";
import CommunityActivity from "@/components/profile/CommunityActivity";

interface UserProfile {
  name: string;
  location: string;
  memberSince: string;
  email: string;
  phone: string;
  bio: string;
  website: string;
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
  };
  stats: {
    posts: number;
    comments: number;
    events: number;
  };
}

const mockUserProfile: UserProfile = {
  name: "আতাউল্লাহ",
  location: "বরিশাল, বাংলাদেশ",
  memberSince: "২০২৩",
  email: "ataullahm100@gmail.com",
  phone: "+880 1719-199967",
  bio: "বরিশাল কমিউনিটির একজন সক্রিয় সদস্য। সফটওয়্যার ডেভেলপার হিসেবে কাজ করি।",
  website: "https://ataullah.com",
  social: {
    facebook: "https://facebook.com/username",
    twitter: "https://twitter.com/username",
    linkedin: "https://linkedin.com/in/username",
  },
  stats: {
    posts: 24,
    comments: 128,
    events: 8,
  },
};

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
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">আতাউল্লাহ</h1>
            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-2">
              <MapPin className="w-4 h-4" /> বরিশাল, বাংলাদেশ
            </p>
            <p className="text-gray-600 mt-2">কমিউনিটি মেম্বার সিনস ২০২৩</p>
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
          <Card className="p-6">
            <div className="space-y-6">
              {/* Post Items */}
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">বরিশালে ডেভেলপার মিটআপ</h3>
                    <p className="text-sm text-gray-600 mt-1">২ দিন আগে</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4 mr-2" /> এডিট
                    </Button>
                  </div>
                </div>
                <p className="mt-4">
                  আগামী শনিবার বরিশালে একটি ডেভেলপার মিটআপের আয়োজন করা
                  হয়েছে...
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                  <span>👍 ২৪ লাইক</span>
                  <span>💬 ১২ কমেন্ট</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">
                      নতুন আইটি প্রশিক্ষণ কেন্দ্র
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">৫ দিন আগে</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4 mr-2" /> এডিট
                    </Button>
                  </div>
                </div>
                <p className="mt-4">
                  বরিশালে নতুন একটি আইটি প্রশিক্ষণ কেন্দ্র চালু হতে যাচ্ছে...
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                  <span>👍 ১৮ লাইক</span>
                  <span>💬 ৮ কমেন্ট</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  অ্যাকাউন্ট সেটিংস
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>ভাষা পছন্দ</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>বাংলা</option>
                      <option>English</option>
                    </select>
                  </div>
                  <div>
                    <Label>টাইম জোন</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>ঢাকা (GMT+6)</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  নোটিফিকেশন সেটিংস
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>ইমেইল নোটিফিকেশন</Label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>পুশ নোটিফিকেশন</Label>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-red-600">
                  অ্যাকাউন্ট ডিলিট
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  আপনার অ্যাকাউন্ট ডিলিট করলে সব তথ্য মুছে যাবে। এই প্রক্রিয়া
                  অপরিবর্তনীয়।
                </p>
                <Button variant="destructive">অ্যাকাউন্ট ডিলিট করুন</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
