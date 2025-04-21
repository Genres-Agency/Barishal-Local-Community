import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  // baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = (await baseQuery(args, api, extraOptions)) as any;

  if (result?.error?.status === 400) {
    toast.error(result?.error?.data?.message);
  }
  if (result?.error?.status === 404) {
    toast.error(result?.error?.data?.message);
  }
  if (result?.error?.status === 403) {
    toast.error(result?.error?.data?.message);
  }
  if (result?.error?.status === 401) {
    //* Send Refresh
    console.log("Sending refresh token");

    try {
      const res = await fetch("http://localhost:3333/api/auth/refresh", {
        method: "POST",
        credentials: "include",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });

      const data = await res.json();
      console.log("data: ", data);
      console.log("accessToken: ", data?.accessToken);

      if (data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;

        api.dispatch(
          setUser({
            user,
            token: data.accessToken,
          })
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } catch (error) {
      console.log("refresh Token failed error: ", error);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "Admin",
    "User",
    "Post",
    "Category",
    "Hashtag",
    "Like",
    "Comment",
    "Event",
  ],
  endpoints: () => ({}),
});
