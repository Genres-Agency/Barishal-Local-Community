"use client";

import "@/styles/scrollbar-hide.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const helplineCategories = [
  {
    title: "হাসপাতাল",
    icon: "/assets/icons/hospital.svg",
  },
  {
    title: "থানা ও ডাক্তার",
    icon: "/assets/icons/police.svg",
  },
  {
    title: "রক্তদাতা",
    icon: "/assets/icons/blood.svg",
  },
  {
    title: "খাদ্য পণ্য",
    icon: "/assets/icons/food.svg",
  },
  {
    title: "কৃষি পণ্য",
    icon: "/assets/icons/agriculture.svg",
  },
  {
    title: "পরিবহন তথ্য",
    icon: "/assets/icons/transport.svg",
  },
  {
    title: "ঘোষণার ইভেন্ট",
    icon: "/assets/icons/event.svg",
  },
  {
    title: "হাসপাতাল",
    icon: "/assets/icons/hospital.svg",
  },
  {
    title: "থানা ও ডাক্তার",
    icon: "/assets/icons/police.svg",
  },
  {
    title: "রক্তদাতা",
    icon: "/assets/icons/blood.svg",
  },
  {
    title: "খাদ্য পণ্য",
    icon: "/assets/icons/food.svg",
  },
  {
    title: "কৃষি পণ্য",
    icon: "/assets/icons/agriculture.svg",
  },
  {
    title: "ঘোষণার ইভেন্ট",
    icon: "/assets/icons/event.svg",
  },
  {
    title: "হাসপাতাল",
    icon: "/assets/icons/hospital.svg",
  },
  {
    title: "থানা ও ডাক্তার",
    icon: "/assets/icons/police.svg",
  },
];

import { useRef } from "react";

export default function HelplineSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const scrollAmount = 300; // px to scroll per click

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

  return (
    <div className="container mx-auto py-3 px-4">
      <h1 className="text-5xl text-center py-4">কমিউনিটি হেল্পলাইন </h1>
      <div className="relative overflow-hidden">
        {/* Left Arrow */}
        <button
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-2 transition-colors"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        {/* Right Arrow */}
        <button
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-2 transition-colors"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => handleScroll("right")}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div
          ref={marqueeRef}
          className="whitespace-nowrap pb-4 overflow-x-auto scrollbar-hide scroll-smooth flex space-x-4 px-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {[...helplineCategories, ...helplineCategories].map(
            (category, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-4 min-w-[100px] cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 mb-2">
                  <img
                    src={category.icon}
                    alt={category.title}
                    className="w-6 h-6"
                  />
                </div>
                <span className="text-sm text-center font-medium">
                  {category.title}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
