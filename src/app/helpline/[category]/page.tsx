"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface SubCategory {
  id: number;
  title: string;
  icon?: string;
}

interface Category {
  id: number;
  title: string;
  icon: string;
  subCategories?: SubCategory[];
}

const helplineCategories: Category[] = [
  {
    id: 1,
    title: " শপিং মল",
    icon: "/assets/helpline/shoping-mall.png",
    subCategories: [
      { id: 101, title: " সুপার মল" },
      { id: 102, title: " স্থানীয় বাজার" },
      { id: 103, title: " প্লাজা" },
      { id: 104, title: " ফ্যাশন আউটলেট" },
      { id: 105, title: " ফুড কোর্ট" },
    ],
  },
  {
    id: 2,
    title: " পার্ক",
    icon: "/assets/helpline/park.png",
    subCategories: [
      { id: 201, title: " পাবলিক পার্ক" },
      { id: 202, title: " শিশু পার্ক" },
      { id: 203, title: " পশু পার্ক" },
      { id: 204, title: " জগিং ট্র্যাক পার্ক" },
      { id: 205, title: " ইকো/প্রাকৃতিক পার্ক" },
    ],
  },
  {
    id: 3,
    title: " রেস্টুরেন্ট",
    icon: "/assets/helpline/restaurant.png",
    subCategories: [
      { id: 301, title: " বাঙালি খাবার" },
      { id: 302, title: " ফাস্ট ফুড" },
      { id: 303, title: " এশিয়ান/চাইনিজ খাবার" },
      { id: 304, title: " পিৎজা প্লেস" },
      { id: 305, title: " ডেজার্ট ও ক্যাফে" },
      { id: 306, title: " হেলদি/ইকো ফুড" },
    ],
  },
  {
    id: 4,
    title: " হাসপাতাল ও ক্লিনিক",
    icon: "/assets/helpline/hospital.png",
    subCategories: [
      { id: 401, title: " সরকারি হাসপাতাল" },
      { id: 402, title: " প্রাইভেট হাসপাতাল" },
      { id: 403, title: " ক্লিনিক" },
      { id: 404, title: " ডেন্টাল ক্লিনিক" },
      { id: 405, title: " ডায়াগনস্টিক সেন্টার" },
    ],
  },
  {
    id: 5,
    title: " ধর্মীয় স্থান",
    icon: "/assets/helpline/mosque.png",
    subCategories: [
      { id: 501, title: " মসজিদ" },
      { id: 502, title: " মন্দির" },
      { id: 503, title: " গির্জা" },
      { id: 504, title: " সিনাগগ" },
    ],
  },
  {
    id: 6,
    title: " পর্যটন আকর্ষণ",
    icon: "/assets/helpline/tourist.png",
    subCategories: [
      { id: 601, title: " ঐতিহাসিক স্থান" },
      { id: 602, title: " সৈকত / নদীতীর" },
      { id: 603, title: " রিসোর্ট" },
      { id: 604, title: " স্মৃতিসৌধ" },
      { id: 605, title: " পাহাড় / প্রাকৃতিক দৃশ্য" },
    ],
  },
  {
    id: 7,
    title: " শিক্ষা প্রতিষ্ঠান",
    icon: "/assets/helpline/school.png",
    subCategories: [
      { id: 701, title: " স্কুল" },
      { id: 702, title: " কলেজ" },
      { id: 703, title: " বিশ্ববিদ্যালয়" },
      { id: 704, title: " বিজ্ঞান ও গবেষণা প্রতিষ্ঠান" },
      { id: 705, title: " কোচিং সেন্টার" },
    ],
  },
  {
    id: 8,
    title: " হোটেল ও রিসোর্ট",
    icon: "/assets/helpline/hotel.png",
    subCategories: [
      { id: 801, title: " ৩-তারকা হোটেল" },
      { id: 802, title: " ৫-তারকা হোটেল" },
      { id: 803, title: " বাজেট হোটেল" },
      { id: 804, title: " রিসোর্ট" },
      { id: 805, title: " ইকো লজ" },
    ],
  },
  {
    id: 9,
    title: " সুপারমার্কেট ও মুদি দোকান",
    icon: "/assets/helpline/store.png",
    subCategories: [
      { id: 901, title: " কনভিনিয়েন্স স্টোর" },
      { id: 902, title: " ডিপার্টমেন্টাল স্টোর" },
      { id: 903, title: " কসমেটিকস / হাউজহোল্ড" },
      { id: 904, title: " ফ্রেশ ফুড মার্কেট" },
      { id: 905, title: " মাংস / মাছের বাজার" },
    ],
  },
  {
    id: 10,
    title: " পরিবহন কেন্দ্র",
    icon: "/assets/helpline/transportation.png",
    subCategories: [
      { id: 1001, title: " রেল স্টেশন" },
      { id: 1002, title: " বাস টার্মিনাল" },
      { id: 1003, title: " ফেরি / লঞ্চ টার্মিনাল" },
      { id: 1004, title: " রাইড বুকিং স্ট্যান্ড" },
      { id: 1005, title: " পার্কিং জোন" },
    ],
  },
  {
    id: 11,
    title: " বিমানবন্দর",
    icon: "/assets/helpline/airport.png",
    subCategories: [
      { id: 1101, title: " আন্তর্জাতিক বিমানবন্দর" },
      { id: 1102, title: " অভ্যন্তরীণ বিমানবন্দর" },
      { id: 1103, title: " কার্গো টার্মিনাল" },
      { id: 1104, title: " ভিআইপি লাউঞ্জ" },
    ],
  },
];

export default function HelplineCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  );

  const category = helplineCategories.find(
    (cat) => encodeURIComponent(cat.id) === params.category
  );

  if (!category) {
    return <div>Category not found</div>;
  }

  const filteredServices = selectedSubCategory
    ? category.subCategories?.filter((sub) => sub.id === selectedSubCategory)
    : category.subCategories;

  return (
    <div className="container mx-auto px-4 relative z-40 mt-16 lg:mt-20 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100">
          <Image
            src={category.icon}
            height={30}
            width={30}
            alt={category.title}
            className="w-6 h-6"
          />
        </div>
        <h1 className="text-4xl font-bold">{category.title}</h1>
      </div>

      {/* Filter Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">সাব-ক্যাটাগরি ফিল্টার</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedSubCategory(null)}
            className={`px-4 py-2 rounded-full transition-colors ${
              !selectedSubCategory
                ? "bg-green-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            সকল
          </button>
          {category.subCategories?.map((subCategory) => (
            <button
              key={subCategory.id}
              onClick={() => setSelectedSubCategory(subCategory.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedSubCategory === subCategory.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {subCategory.title}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices?.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-4">
                এই সার্ভিসের বিস্তারিত তথ্য খুব শীঘ্রই আসছে
              </p>
              <button
                onClick={() =>
                  router.push(
                    `/helpline/${params.category}/${encodeURIComponent(
                      service.id
                    )}`
                  )
                }
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
              >
                বিস্তারিত দেখুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
