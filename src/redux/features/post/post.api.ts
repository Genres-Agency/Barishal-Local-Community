import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: (params: {
        categoryId?: number;
        search?: string;
        hashTagId?: number;
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

export const {
  useGetAllPostQuery,
  useGetSinglePostQuery,
  useAddPostMutation,
  useLazyGetAllPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
