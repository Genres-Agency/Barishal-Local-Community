import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // register a new user
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),

    // Login a new user
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
