import { TQueryParam } from "@/types/global";
import { baseApi } from "../../api/baseApi";

type TCategorory = {
  title: string;
};

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/category",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Category"],
    }),

    // Create a new Category
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    // Update exesting post
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        params: id,
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    // Delete a post
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
        params: id,
      }),
      invalidatesTags: ["Category"],
    }),
    // Get single category
    getSingleCategory: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
  useGetSingleCategoryQuery,
} = categoriesApi;
