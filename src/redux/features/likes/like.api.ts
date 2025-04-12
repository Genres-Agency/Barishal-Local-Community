import { baseApi } from "../../api/baseApi";

const likeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Single post
    getSingleLike: builder.query({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: "GET",
        params: postId,
      }),
      providesTags: ["Like"],
    }),

    // Update exesting post
    toggleLike: builder.mutation({
      query: ({ postId }) => ({
        url: `/likes/${postId}`,
        method: "PATCH",
        params: postId,
      }),
      invalidatesTags: ["Like"],
    }),
  }),
});

export const { useGetSingleLikeQuery, useToggleLikeMutation } = likeApi;
