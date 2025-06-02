"use client";

import { useGetAllHelplineCategoryQuery } from "@/redux/features/helpline-category/helpline-category";
import "@/styles/scrollbar-hide.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface SubCategory {
  id: number;
  title: string;
  icon: string | null;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  title: string;
  icon?: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  subCommunityCategories: SubCategory[];
}

// Fallback categories in case API fails or during development
const fallbackCategories = [
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

export default function HelplineSection() {
  const router = useRouter();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const {
    data: categories,
    isLoading,
    error,
  } = useGetAllHelplineCategoryQuery([]);

  const scrollAmount = 300; // px to scroll per click

  const handleCategoryClick = (category: Category) => {
    const encodedTitle = encodeURIComponent(category.id);
    router.push(`/helpline/${encodedTitle}`);
  };

  const handleScroll = (direction: "left" | "right") => {
    if (marqueeRef.current) {
      const { scrollLeft } = marqueeRef.current;
      const newScroll =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      marqueeRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
    }
  };

  // Use fallback categories if API fails or during development
  const displayCategories: Category[] = categories;

  // console.log("categories from helpline section==>", categories);

  if (error) {
    return (
      <div className="container mx-auto py-3 px-4">
        <div className="text-center py-4 text-red-600">
          Error loading categories. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-3 px:2 md:px-4">
      <h1 className="text-3xl lg:text-5xl text-center py-4">
        কমিউনিটি হেল্পলাইন{" "}
      </h1>
      {/* <div className="relative overflow-hidden"> */}
      {/* Left Arrow */}
      {/* <button
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-2 transition-colors"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => handleScroll("left")}
          disabled={isLoading}
        >
          <ChevronLeft className="w-6 h-6" />
        </button> */}
      {/* Right Arrow */}
      {/* <button
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-2 transition-colors"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => handleScroll("right")}
          disabled={isLoading}
        >
          <ChevronRight className="w-6 h-6" />
        </button> */}
      {/* <div
          ref={marqueeRef}
          className="whitespace-nowrap pb-4 overflow-x-auto scrollbar-hide scroll-smooth flex space-x-4 px-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {displayCategories &&
            [...displayCategories, ...displayCategories].map(
              (category, index) => (
                <div
                  key={`${category.id}-${index}`}
                  onClick={() => handleCategoryClick(category)}
                  className="flex-shrink-0 flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-4 min-w-[100px] cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-200 mb-2">
                    <Image
                      src={category.icon}
                      alt={category.title}
                      className="w-6 h-6"
                      height={32}
                      width={32}
                    />
                  </div>
                  <span className="text-sm text-center font-medium">
                    {category.title}
                  </span>
                </div>
              )
            )}
        </div> */}
      {/* </div> */}

      <div
        // ref={marqueeRef}
        className=" pb-4 flex flex-wrap gap-4"
        // style={{ scrollBehavior: "smooth" }}
      >
        {displayCategories?.map((category, index) => (
          <div
            key={`${category.id}-${index}`}
            onClick={() => handleCategoryClick(category)}
            className=" flex flex-col items-center  bg-white rounded-lg shadow-sm p-4 min-w-[100px]  cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 mb-2">
              <Image
                src={category?.icon as string}
                alt={category?.title}
                className="w-6 h-6"
                height={32}
                width={32}
              />
            </div>
            <span className="text-sm text-center font-medium">
              {category.title}
            </span>
          </div>
        ))}
      </div>
      {isLoading &&
        displayCategories?.map((category, index) => (
          <div key={`${category.id}-${index}`} className="text-center py-4">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-full w-12 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
            </div>
          </div>
        ))}
    </div>
  );
}
