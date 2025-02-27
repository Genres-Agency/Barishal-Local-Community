"use client";

import { Card } from "@/components/ui/card";

interface CommunityActivityProps {
  stats: {
    posts: number;
    comments: number;
    events: number;
  };
}

export default function CommunityActivity({ stats }: CommunityActivityProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700">
              মোট পোস্ট
            </h3>
            <p className="text-3xl font-bold text-green-600">{stats.posts}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700">
              কমেন্ট
            </h3>
            <p className="text-3xl font-bold text-blue-600">{stats.comments}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-700">
              ইভেন্ট অংশগ্রহণ
            </h3>
            <p className="text-3xl font-bold text-purple-600">{stats.events}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">
            সর্বশেষ অ্যাক্টিভিটি
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <p className="text-sm text-gray-600">২ ঘণ্টা আগে</p>
              <p className="mt-1">
                &ldquo;বরিশাল টেক মিট ২০২৪&rdquo; ইভেন্টে যোগদান করেছেন
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <p className="text-sm text-gray-600">৫ ঘণ্টা আগে</p>
              <p className="mt-1">একটি নতুন পোস্ট করেছেন</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <p className="text-sm text-gray-600">১ দিন আগে</p>
              <p className="mt-1">একটি পোস্টে মন্তব্য করেছেন</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}