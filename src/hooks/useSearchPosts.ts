// hooks/useSearchPosts.ts
import { useLazyGetAllPostQuery } from "@/redux/features/post/post.api";
import { useEffect, useState } from "react";

export const useSearchPosts = () => {
  const [triggerGetPosts, { isLoading }] = useLazyGetAllPostQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        const categoryIdNumber = categoryId ? parseInt(categoryId) : undefined;
        const { data } = await triggerGetPosts({
          search: searchQuery,
          categoryId: categoryIdNumber,
        });
        setSearchResults(data || []);
        setShowSearchDropdown(true);
      } catch (err) {
        console.error("Search failed:", err);
      }
    }, 400); // debounce delay

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, categoryId, triggerGetPosts]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    showSearchDropdown,
    setShowSearchDropdown,
    setCategoryId,
  };
};
