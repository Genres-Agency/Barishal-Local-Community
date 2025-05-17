"use client";

import { useGetSingleHelplineCategoryQuery } from "@/redux/features/helpline-category/helpline-category";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface Service {
  id: number;
  title: string;
  image: string;
  address: string;
  phone: string;
  description: string;
  subCategoryId: number;
  createdAt: string;
  updatedAt: string;
}

interface SubCategory {
  id: number;
  title: string;
  icon: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  services: Service[];
  communityCategory: Category;
}

interface Category {
  id: number;
  title: string;
  icon: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  subCommunityCategories: SubCategory[];
}

export default function HelplineCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  );

  const {
    data: category,
    isLoading,
    error,
  } = useGetSingleHelplineCategoryQuery(params.category);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error || !category) {
    return (
      <div className="container mx-auto px-4 py-8">Category not found</div>
    );
  }

  console.log("category ==> ", category);

  const filteredSubCategories = selectedSubCategory
    ? category.subCommunityCategories?.filter(
        (sub: SubCategory) => sub.id === selectedSubCategory
      )
    : category.subCommunityCategories;

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
          {category.subCommunityCategories?.map((subCategory: SubCategory) => (
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
        {filteredSubCategories?.map((subCategory: SubCategory) => (
          <div
            key={subCategory.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {subCategory.icon && (
                  <Image
                    src={subCategory.icon}
                    height={40}
                    width={40}
                    alt={subCategory.title}
                    className="rounded-full"
                  />
                )}
                <h3 className="text-2xl font-semibold">{subCategory.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                এই সার্ভিসের বিস্তারিত তথ্য খুব শীঘ্রই আসছে
              </p>
              <button
                onClick={() =>
                  router.push(
                    `/helpline/${params.category}/${encodeURIComponent(
                      subCategory.id
                    )}`
                  )
                }
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
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
