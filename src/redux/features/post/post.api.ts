import { TQueryParam } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: (categoryId?: number) => {
        const params = new URLSearchParams();
        
        if (categoryId) {
          params.append('categoryId', categoryId.toString());
        }

        return {
          url: "/posts",
          method: "GET",
          params: params,
        };
      },
      //  transformResponse: (response: TResponseRedux<TPost[]>) => {
      // transformResponse: (response: any) => {
      //   return {
      //     data: response.data,
      //     meta: response.meta,
      //   };
      // },
      providesTags: ["Post"],
    }),
    // Get Single post
    getSinglePost: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "GET",
        params: postId,
      }),
      providesTags: ["Post"],
    }),
    // Create a new post
    addPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
        
      }),
      invalidatesTags: ["Post"],
    }),

    // Update exesting post
    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        params: id,
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    // Delete a post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        params: id,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useGetAllPostQuery, useGetSinglePostQuery, useAddPostMutation } =
  postApi;
