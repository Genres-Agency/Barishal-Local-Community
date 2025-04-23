import React from "react";
import { useGetAllCategoryQuery } from "@/redux/features/category/category.api";
import { Search, Calendar, Briefcase, Store } from "lucide-react";
import { getCategoryStyle } from "@/lib/config/navigation";



interface FeedNavigationProps {
  onCategorySelect: (categoryId: number) => void;
}

const FeedNavigation: React.FC<FeedNavigationProps> = ({ onCategorySelect }) => {
  const { data: categories, isLoading } = useGetAllCategoryQuery([]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-3 sm:px-0">
      {categories?.map((category: any, index: number) => {
        const style = getCategoryStyle(category.slug);
        return (
          <p
            key={index}
            onClick={() => onCategorySelect(category.id)}
            className={`cursor-pointer flex flex-col items-center justify-center w-full shadow ${style.bgColor} ${style.textColor} ${style.hoverBg} transition-all duration-300 py-3 lg:py-7 px-2 rounded-lg`}
          >
            {React.createElement(style.icon, {
              className: `w-5 lg:w-7 h-5 lg:h-7 mb-2 ${style.textColor}`,
            })}
            <span className="text-sm font-semibold">{style.text}</span>
          </p>
        );
      })}
    </nav>
  );
};

export default FeedNavigation;
