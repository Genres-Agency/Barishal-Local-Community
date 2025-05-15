import { TQueryParam } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const helplineCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHelplineCategory: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/community-categories",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["HelplineCategory"],
    }),
    // Get Single post
    getSingleHelplineCategory: builder.query({
      query: (id) => ({
        url: `/community-categories/${id}`,
        method: "GET",
        params: id,
      }),
      providesTags: ["HelplineCategory"],
    }),
    // Create a new post
    addHelplineCategory: builder.mutation({
      query: (data) => ({
        url: "/community-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["HelplineCategory"],
    }),

    // Update exesting post
    updateHelplineCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/community-categories/${id}`,
        method: "PATCH",
        // params: postId,
        body: formData,
      }),
      invalidatesTags: ["HelplineCategory"],
    }),

    // Delete a post
    deleteHelplineCategory: builder.mutation({
      query: (id) => ({
        url: `/community-categories/${id}`,
        method: "DELETE",
        params: id,
      }),
      invalidatesTags: ["HelplineCategory"],
    }),
  }),
});

export const {
  useGetAllHelplineCategoryQuery,
  useGetSingleHelplineCategoryQuery,
  useAddHelplineCategoryMutation,
  useUpdateHelplineCategoryMutation,
  useDeleteHelplineCategoryMutation,
} = helplineCategoryApi;
