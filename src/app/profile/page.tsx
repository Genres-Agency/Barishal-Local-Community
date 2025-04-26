"use client";

import CommunityActivity from "@/components/profile/CommunityActivity";
import PersonalInfo from "@/components/profile/PersonalInfo";
import Posts from "@/components/profile/Posts";
import ProfileEditModal from "@/components/profile/ProfileEditModal";
import Settings from "@/components/profile/Settings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUserProfile, posts } from "@/lib/config/profile";
import { useGetUserDetailQuery } from "@/redux/features/user/userDetail.api";
import { Edit2, MapPin } from "lucide-react";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const activeTab = tab || "personal";

  // const { data: userData, isLoading } = useGetAuthorQuery(user?.id);
  const { data: userDetails, isLoading: isLoadingDetails } =
    useGetUserDetailQuery(undefined);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoadingDetails) {
    return <Loading size="lg" className="min-h-[60vh]" />;
  }
  // console.log("userData", userData);
  // console.log("userDetails", userDetails);

  const handleTabChange = (value: string) => {
    const newUrl = value === "personal" ? "/profile" : `/profile?tab=${value}`;
    router.push(newUrl);
  };

  return (
    <div className="container mx-auto py-8 px-4 mt-16">
      {/* Profile Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={
                userDetails?.user?.avatar
                  ? userDetails?.user?.avatar
                  : "/assets/user.png"
              }
            />
            <AvatarFallback>{mockUserProfile.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{`${userDetails?.user?.firstName}  ${userDetails?.user?.lastName}`}</h1>
            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-2">
              <MapPin className="w-4 h-4" /> {mockUserProfile?.location}
            </p>
            <p className="text-gray-600 mt-2">
              কমিউনিটি মেম্বার সিনস {moment(userDetails?.createdAt).fromNow()}
            </p>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit2 className="w-4 h-4 mr-2" /> প্রোফাইল এডিট
          </Button>
        </div>
      </div>

      {/* Profile Tabs */}
      <Tabs
        defaultValue="personal"
        value={activeTab}
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
          <PersonalInfo profile={userDetails} />
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
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={userDetails}
      />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-8 px-4 mt-16">
          <Loading size="lg" className="min-h-[60vh]" />
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
