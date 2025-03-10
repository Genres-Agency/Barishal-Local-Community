import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get User Profile
    getUser: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;
