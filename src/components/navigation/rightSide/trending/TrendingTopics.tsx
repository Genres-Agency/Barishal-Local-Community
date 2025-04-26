"use client";
import { useGetAllHashtagQuery } from "@/redux/features/hashtag/hashtag.api";
import { useGetAllPostQuery } from "@/redux/features/post/post.api";

const TrendingTopics = () => {
  const { data: trends } = useGetAllHashtagQuery(undefined);
  console.log("trends", trends);

  const { data: post } = useGetAllPostQuery(undefined);
  console.log("post", post);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">ট্রেন্ডিং টপিকস</h2>
      <div className="space-y-3">
        {trends?.map((topic: any, index: any) => (
          <div
            key={index}
            className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors"
          >
            <span className="text-blue-600 font-medium">{topic?.title}</span>
            <span className="text-gray-500 text-sm">
              {topic?._count?.posts} পোস্ট
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
