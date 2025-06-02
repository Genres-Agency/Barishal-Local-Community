"use client";
import { useGetAllHashtagQuery } from "@/redux/features/hashtag/hashtag.api";

interface HashtagData {
  id: number;
  title: string;
  slug: string;
  authorId: number;
  _count?: {
    post: number;
  };
}

interface TrendingTopicsProps {
  onTrendTopicSelect: (hashtagId: number) => void;
}

const TrendingTopics = ({ onTrendTopicSelect }: TrendingTopicsProps) => {
  const { data: trends, isFetching } = useGetAllHashtagQuery(undefined);

  if (isFetching) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Loading...</h2>
        <div className="space-y-3">
          {Array.from({ length: 1 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Loading...</span>
                  {/* <span className="text-gray-500 text-xs">Loading...</span> */}
                </div>
              </div>
              <span className="text-gray-500 text-sm">Loading...</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">ট্রেন্ডিং টপিকস</h2>
      <div className="space-y-3">
        {trends?.map((topic: HashtagData, index: number) => (
          <div
            key={index}
            onClick={() => onTrendTopicSelect(topic?.id)}
            className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors"
          >
            <span className="text-blue-600 font-medium">{topic?.title}</span>
            <span className="text-gray-500 text-sm">
              {topic?._count?.post} টি পোস্ট
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
