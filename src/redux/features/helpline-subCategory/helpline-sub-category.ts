import { TQueryParam } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const helplineSubCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHelplineSubCategory: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/sub-community-categories",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["HelplineSubCategory"],
    }),
    // Get Single post
    getSingleHelplineSubCategory: builder.query({
      query: (id) => ({
        url: `/sub-community-categories/${id}`,
        method: "GET",
        params: id,
      }),
      providesTags: ["HelplineSubCategory"],
    }),
    // Create a new post
    addHelplineSubCategory: builder.mutation({
      query: (data) => ({
        url: "/sub-community-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["HelplineSubCategory"],
    }),

    // Update exesting post
    updateHelplineSubCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/sub-community-categories/${id}`,
        method: "PATCH",
        // params: postId,
        body: formData,
      }),
      invalidatesTags: ["HelplineSubCategory"],
    }),

    // Delete a post
    deleteHelplineSubCategory: builder.mutation({
      query: (id) => ({
        url: `/sub-community-categories/${id}`,
        method: "DELETE",
        params: id,
      }),
      invalidatesTags: ["HelplineSubCategory"],
    }),
  }),
});

export const {
  useGetAllHelplineSubCategoryQuery,
  useGetSingleHelplineSubCategoryQuery,
  useAddHelplineSubCategoryMutation,
  useUpdateHelplineSubCategoryMutation,
  useDeleteHelplineSubCategoryMutation,
} = helplineSubCategoryApi;
