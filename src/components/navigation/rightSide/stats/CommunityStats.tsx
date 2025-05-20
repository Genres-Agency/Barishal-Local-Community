import React from "react";
import { communityStats } from "@/lib/config/stats";
import StatItem from "./StatsItem";
import { BriefcaseBusiness, CircleCheck, Users } from "lucide-react";
import { useGetAllUsersQuery} from "@/redux/features/user/userDetail.api"
import { useGetAllPostQuery } from "@/redux/features/post/post.api";
import { useGetAllCategoryQuery } from "@/redux/features/category/category.api";

export interface StatConfig {
  icon: typeof Users | typeof CircleCheck | typeof BriefcaseBusiness;
  label: string;
  value: string;
  description?: string;
  iconColor: string;
  bgColor: string;
}


const CommunityStats = () => {
  const {data: users} = useGetAllUsersQuery(undefined);
const {data: jobPosts} = useGetAllPostQuery({categoryId: 3});
const {data: posts} = useGetAllPostQuery(undefined);
const {data:category} = useGetAllCategoryQuery(undefined);

const getDailyPosts = () => {
  if (!posts) return 0;
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return posts.filter(post => new Date(post.updatedAt) > last24Hours).length;
};
  
 const communityStats: StatConfig[] = [
  {
    icon: Users,
    label: "মোট সদস্য",
    value: users?.length?.toString() || "০",
    description: `গত মাসে ${users?.length} নতুন সদস্য যোগদান করেছেন`  ,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: CircleCheck,
    label: "দৈনিক পোস্ট",
    value: getDailyPosts().toString() || "০",
    description: `গত ২৪ ঘন্টায় ${getDailyPosts()} টি পোস্ট করা হয়েছে`,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: BriefcaseBusiness,
    label: "চাকরির পোস্ট",
    value: jobPosts?.length?.toString() || "০",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];
  return (
    <div className="w-80 space-y-4 bg-white rounded-lg">
      <h2 className="text-lg font-semibold p-4 border-b">
        কমিউনিটি পরিসংখ্যান
      </h2>
      <div className="p-4 space-y-6">
        {communityStats.map((stat, index) => (
          <StatItem
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            iconColor={stat.iconColor}
            bgColor={stat.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityStats;
