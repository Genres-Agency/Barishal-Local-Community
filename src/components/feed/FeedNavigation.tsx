import { getCategoryStyle } from "@/lib/config/navigation";
import { useGetAllCategoryQuery } from "@/redux/features/category/category.api";
import { Proportions } from "lucide-react";
import React from "react";

interface FeedNavigationProps {
  onCategorySelect: (categoryId: number | null) => void;
  selectedCategory: number | null;
}

const FeedNavigation: React.FC<FeedNavigationProps> = ({
  onCategorySelect,
  selectedCategory,
}) => {
  const { data: categories, isLoading } = useGetAllCategoryQuery([]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const allPostsStyle = getCategoryStyle("all");

  return (
    <nav className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-3 sm:px-0">
      <button
        onClick={() => onCategorySelect(null)}
        className={`cursor-pointer flex flex-col items-center justify-center w-full shadow ${allPostsStyle.bgColor} ${allPostsStyle.textColor} ${allPostsStyle.hoverBg} transition-all duration-300 py-3 lg:py-7 px-2 rounded-lg `}
      >
        <Proportions className={`w-5 lg:w-7 h-5 lg:h-7 mb-2 ${allPostsStyle.textColor}`} />
        <span className="text-sm font-semibold">{allPostsStyle.text}</span>
      </button>
      {categories?.map((category: any, index: number) => {
        const style = getCategoryStyle(category.slug);
        return (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category?.id)}
            className={`cursor-pointer flex flex-col items-center justify-center w-full shadow ${style.bgColor} ${style.textColor} ${style.hoverBg} transition-all duration-300 py-3 lg:py-7 px-2 rounded-lg ${selectedCategory === category.id ? 'ring-2 ring-gray-400' : ''}`}
          >
            {React.createElement(style.icon, {
              className: `w-5 lg:w-7 h-5 lg:h-7 mb-2 ${style.textColor}`,
            })}
            <span className="text-sm font-semibold">{style.text}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default FeedNavigation;
