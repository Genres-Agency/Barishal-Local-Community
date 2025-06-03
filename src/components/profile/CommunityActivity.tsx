"use client";
import { useGetUserActivityQuery } from "@/redux/features/activity/activity.api";
import { Loader2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";

export default function CommunityActivity() {
  const { data: activityData, isLoading } = useGetUserActivityQuery(undefined);
  // console.log("activityData: ", activityData);
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">
                মোট পোস্ট
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {activityData?.stats?.totalPosts || 0}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700">কমেন্ট</h3>
              <p className="text-3xl font-bold text-blue-600">
                {activityData?.stats?.totalComments || 0}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-700">
                ইভেন্ট অংশগ্রহণ
              </h3>
              <p className="text-3xl font-bold text-purple-600">
                {activityData?.stats?.totalEvents || 0}
              </p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-pink-700">মোট লাইক</h3>
              <p className="text-3xl font-bold text-pink-600">
                {activityData?.stats?.totalLikes || 0}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">সর্বশেষ অ্যাক্টিভিটি</h3>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            ) : (
              <div className="space-y-4">
                {activityData && activityData.posts.length > 0 ? (
                  activityData?.posts?.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white p-4 rounded-lg border"
                    >
                      <p className="text-sm text-gray-600">
                        {moment(post.createdAt).locale("bn").fromNow()}
                      </p>
                      <p className="mt-1">{post.content}</p>
                      {post.photo && (
                        <div className="mt-3 relative h-48 w-full overflow-hidden rounded-lg">
                          <Image
                            src={post.photo.replace(/`/g, "").trim()}
                            alt={post.content}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="mt-2 text-sm text-gray-500 flex gap-3">
                        <span>{post._count.likes} লাইক</span>
                        <span>{post._count.comments} কমেন্ট</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    কোন অ্যাক্টিভিটি নেই
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
