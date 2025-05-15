"use client";

import { useGetSingleHelplineCategoryQuery } from "@/redux/features/helpline-category/helpline-category";
import Image from "next/image";
import { useParams } from "next/navigation";

interface ServiceItem {
  id: number;
  title: string;
  image: string;
  address: string;
  phone: string;
  description: string;
  subCategoryId: number;
  createdAt: string;
  updatedAt: string;
  subCommunityCategory: {
    id: number;
    title: string;
    icon: string | null;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
  };
}

interface SubCategory {
  id: number;
  title: string;
  icon: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  services: ServiceItem[];
  communityCategory: {
    id: number;
    title: string;
    icon: string;
    authorId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export default function SubCategoryPage() {
  const params = useParams();
  const {
    data: subCategory,
    isLoading,
    isError,
  } = useGetSingleHelplineCategoryQuery(params.subcategory);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">লোড হচ্ছে...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">সেবা লোড করতে সমস্যা হয়েছে</div>
      </div>
    );
  }

  if (!subCategory?.services?.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">কোন সেবা পাওয়া যায়নি</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100">
          <Image
            src={subCategory.icon}
            height={30}
            width={30}
            alt={subCategory.title}
            className="w-6 h-6"
          />
        </div>
        <h1 className="text-4xl font-bold">{subCategory.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subCategory.services.map((service: ServiceItem) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={service.image.replace(/[`\s]/g, "")}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-2">{service.address}</p>
              <p className="text-gray-600 mb-2">{service.phone}</p>
              <p className="text-gray-700">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
