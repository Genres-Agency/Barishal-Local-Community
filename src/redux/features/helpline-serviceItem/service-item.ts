import { TQueryParam } from "@/types/global";
import { baseApi } from "../../api/baseApi";

const ServiceItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServiceItem: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/service-items",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["ServiceItem"],
    }),
    // Get Single post
    getSingleServiceItem: builder.query({
      query: (id) => ({
        url: `/service-items/${id}`,
        method: "GET",
        params: id,
      }),
      providesTags: ["ServiceItem"],
    }),
    // Create a new post
    addServiceItem: builder.mutation({
      query: (data) => ({
        url: "/service-items",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ServiceItem"],
    }),

    // Update exesting post
    updateServiceItem: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/service-items/${id}`,
        method: "PATCH",
        // params: postId,
        body: formData,
      }),
      invalidatesTags: ["ServiceItem"],
    }),

    // Delete a post
    deleteServiceItem: builder.mutation({
      query: (id) => ({
        url: `/service-items/${id}`,
        method: "DELETE",
        params: id,
      }),
      invalidatesTags: ["ServiceItem"],
    }),
  }),
});

export const {
  useGetAllServiceItemQuery,
  useGetSingleServiceItemQuery,
  useAddServiceItemMutation,
  useUpdateServiceItemMutation,
  useDeleteServiceItemMutation,
} = ServiceItemApi;
