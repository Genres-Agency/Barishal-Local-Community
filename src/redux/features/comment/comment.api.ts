import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new comment
    addComment: builder.mutation({
      query: ({ postId, data }) => ({
        url: `/comments/${postId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
    // Get Single post
    getSingleComment: builder.query({
      query: (postId) => ({
        url: `/comments/${postId}`,
        method: "GET",
        params: postId,
      }),
      providesTags: ["Comment"],
    }),

    // Update exesting post
    updateComment: builder.mutation({
      query: ({ postId }) => ({
        url: `/comments/${postId}`,
        method: "PATCH",
        params: postId,
      }),
      invalidatesTags: ["Comment"],
    }),

    // Delete a post
    deleteComment: builder.mutation({
      query: (postId) => ({
        url: `/comments/${postId}`,
        method: "DELETE",
        params: postId,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetSingleCommentQuery,
  useUpdateCommentMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
