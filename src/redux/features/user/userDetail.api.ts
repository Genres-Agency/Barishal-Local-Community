import { baseApi } from "../../api/baseApi";

export interface IUserDetail {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  location?: string;
  bio?: string;
  phone?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  image?: string;
}

const userDetailApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get User Detail
    getUserDetail: builder.query({
      query: () => ({
        url: `/user-detail`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Update User Detail
    updateUserDetail: builder.mutation<
      IUserDetail,
      { userId: string; formData: FormData }
    >({
      query: ({ userId, formData }) => ({
        url: `/user-detail/${userId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    // Get user post by id
    getUserPostById: builder.query({
      query: (id) => ({
        url: `/posts/my-posts/${id}`,
        method: "GET",
      }),
      providesTags: ["User", "Post"],
    }),

    // delete user by id
    deleteUserAccount: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserDetailQuery,
  useUpdateUserDetailMutation,
  useGetUserPostByIdQuery,
  useDeleteUserAccountMutation,
  useGetAllUsersQuery
} = userDetailApi;
