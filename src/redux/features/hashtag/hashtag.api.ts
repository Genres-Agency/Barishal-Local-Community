import { TQueryParam } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const hashtagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHashtag: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/hashtags",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Hashtag"],
    }),
  }),
});

export const { useGetAllHashtagQuery } = hashtagApi;
