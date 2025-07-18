import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: (params: {
        categoryId?: number;
        search?: string;
        hashTagId?: number;
        status?: "ACCEPTED" | "PENDING" | "REJECTED";
      }) => {
        const urlParams = new URLSearchParams();

        if (params?.categoryId) {
          urlParams.append("categoryId", params?.categoryId.toString());
        }
        if (params?.hashTagId) {
          urlParams.append("hashTagId", params?.hashTagId.toString());
        }
        if (params?.search) {
          urlParams.append("search", params?.search);
        }
        if (params?.status) {
          urlParams.append("status", params?.status);
        }

        return {
          url: `/posts`,
          method: "GET",
          params: urlParams,
        };
      },
      providesTags: ["Post", "User"],
    }),
    // Get Single post
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
        params: id,
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
      invalidatesTags: ["Post", "Hashtag"],
    }),

    // Update exesting post
    updatePost: builder.mutation({
      query: ({ postId, formData }) => ({
        url: `/posts/${postId}`,
        method: "PATCH",
        // params: postId,
        body: formData,
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

export const {
  useGetAllPostQuery,
  useGetSinglePostQuery,
  useAddPostMutation,
  useLazyGetAllPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
