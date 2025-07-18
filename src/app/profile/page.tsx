"use client";

import CategoryList from "@/components/profile/CategoryList";
import CommunityActivity from "@/components/profile/CommunityActivity";
import CommunityHelplineCategory from "@/components/profile/CommunityHelplineCategory";
import CommunityHelplineSubCategory from "@/components/profile/CommunityHelplineSubCategory";
import CommunityServiceItem from "@/components/profile/CommunityServiceItem";
import Events from "@/components/profile/Events";
import PersonalInfo from "@/components/profile/PersonalInfo";
import Posts from "@/components/profile/Posts";
import ProfileEditModal from "@/components/profile/ProfileEditModal";
import Settings from "@/components/profile/Settings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUserQuery } from "@/redux/features/auth/authApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllCategoryQuery } from "@/redux/features/category/category.api";
import { useGetUserEventByIdQuery } from "@/redux/features/events/events.api";
import { useGetAllPostQuery } from "@/redux/features/post/post.api";
import {
  useGetUserDetailQuery,
  useGetUserPostByIdQuery,
} from "@/redux/features/user/userDetail.api";
import { useAppSelector } from "@/redux/hooks";
import { Edit2, MapPin } from "lucide-react";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function ProfileContent() {
  const currentUser = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const activeTab = tab || "personal";
  const { data: user } = useGetUserQuery(undefined);

  // console.log("User ==>", user);
  const { data: userPosts } = useGetUserPostByIdQuery(user?.id);
  const { data: pendingPosts } = useGetAllPostQuery({ status: "PENDING" });

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  // console.log("userPosts", userPosts);
  const { data: userEvents } = useGetUserEventByIdQuery(user?.id);

  // console.log("userEvents", userEvents);

  const { data: userDetails, isLoading: isLoadingDetails } =
    useGetUserDetailQuery(undefined);

  const { data: category, isLoading: isLoadingCategory } =
    useGetAllCategoryQuery(undefined);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoadingDetails) {
    return <Loading size="lg" className="min-h-[60vh]" />;
  }

  // console.log("userDetails", userDetails);

  const handleTabChange = (value: string) => {
    const newUrl = value === "personal" ? "/profile" : `/profile?tab=${value}`;
    router.push(newUrl);
  };
  if (!currentUser) {
    router.push("/auth");
  }
  return (
    <div className="container mx-auto py-8 px-4 mt-16">
      {/* Profile Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={user?.avatar ? user?.avatar : "/assets/user.png"}
            />
            <AvatarFallback>{user.firstName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{`${user?.firstName}  ${user?.lastName}`}</h1>
            {userDetails.location && (
              <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-2">
                <MapPin className="w-4 h-4" /> {userDetails?.location}
              </p>
            )}
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
        className="space-y-4 relative"
        onValueChange={handleTabChange}
      >
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />
        <TabsList className="bg-white p-2 rounded-lg shadow-sm w-full flex overflow-x-auto overflow-y-hidden no-scrollbar sticky top-0 z-10 border-b scroll-smooth backdrop-blur-sm bg-white/80">
          <div className="flex gap-2 px-2 pb-1 min-w-max">
            <TabsTrigger value="personal" className="whitespace-nowrap px-4">
              ব্যক্তিগত তথ্য
            </TabsTrigger>
            <TabsTrigger value="community" className="whitespace-nowrap px-4">
              কমিউনিটি একটিভিটি
            </TabsTrigger>
            <TabsTrigger value="posts" className="whitespace-nowrap px-4">
              পোস্টসমূহ
            </TabsTrigger>

            {isAdmin && (
              <>
                <TabsTrigger value="events" className="whitespace-nowrap px-4">
                  ইভেন্টস সমূহ
                </TabsTrigger>
                <TabsTrigger
                  value="pending-post"
                  className="whitespace-nowrap px-4"
                >
                  পেন্ডিং পোস্টসমূহ
                </TabsTrigger>
                <TabsTrigger
                  value="category"
                  className="whitespace-nowrap px-4 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-colors rounded-md"
                >
                  ক্যাটেগরি সমূহ
                </TabsTrigger>
                <TabsTrigger
                  value="helpline-category"
                  className="whitespace-nowrap px-4"
                >
                  হেল্পলাইন ক্যাটেগরি
                </TabsTrigger>
                <TabsTrigger
                  value="helpline-sub-category"
                  className="whitespace-nowrap px-4"
                >
                  হেল্পলাইন সাব ক্যাটেগরি
                </TabsTrigger>
                <TabsTrigger
                  value="helpline-service-item"
                  className="whitespace-nowrap px-4"
                >
                  হেল্পলাইন সার্ভিস আইটেম
                </TabsTrigger>
              </>
            )}
            <TabsTrigger value="settings" className="whitespace-nowrap px-4">
              সেটিংস
            </TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfo profile={userDetails} user={user} />
        </TabsContent>

        <TabsContent value="community">
          <CommunityActivity />
        </TabsContent>

        <TabsContent value="posts">
          <Posts posts={userPosts} />
        </TabsContent>
        <TabsContent value="events">
          <Events events={userEvents} />
        </TabsContent>
        {isAdmin && (
          <>
            {/* get all pending posts */}
            <TabsContent value="pending-post">
              <Posts posts={pendingPosts} />
            </TabsContent>
            <TabsContent value="category">
              <CategoryList categories={category} isAdmin={isAdmin} />
            </TabsContent>
            <TabsContent value="helpline-category">
              <CommunityHelplineCategory isAdmin={isAdmin} />
            </TabsContent>
            <TabsContent value="helpline-sub-category">
              <CommunityHelplineSubCategory isAdmin={isAdmin} />
            </TabsContent>
            <TabsContent value="helpline-service-item">
              <CommunityServiceItem isAdmin={isAdmin} />
            </TabsContent>
          </>
        )}

        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={userDetails}
        user={user}
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
