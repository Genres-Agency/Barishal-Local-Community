"use client";
import { useGetUserActivityQuery } from "@/redux/features/activity/activity.api";
import { Loader2 } from "lucide-react";
import moment from "moment";

export default function CommunityActivity() {
  const { data: activityData, isLoading } = useGetUserActivityQuery();
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">
                মোট পোস্ট
              </h3>
              <p className="text-3xl font-bold text-green-600">{activityData?.stats.posts || 0}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700">
                কমেন্ট
              </h3>
              <p className="text-3xl font-bold text-blue-600">{activityData?.stats.comments || 0}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-700">
                ইভেন্ট অংশগ্রহণ
              </h3>
              <p className="text-3xl font-bold text-purple-600">{activityData?.stats.events || 0}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              সর্বশেষ অ্যাক্টিভিটি
            </h3>
            <div className="space-y-4">
              {activityData?.recentActivities?.map((activity) => (
                <div key={activity.id} className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">
                    {moment(activity.createdAt).locale('bn').fromNow()}
                  </p>
                  <p className="mt-1">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) }
     
      
    </div>
  );
}