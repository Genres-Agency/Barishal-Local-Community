import { baseApi } from "../../api/baseApi";

export type IEvent = {
  id: string;
  title: string;
  startDate: Date;
  location: string;
  endDate: Date;
  image: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query<IEvent[], void>({
      query: () => ({
        url: "/events",
        method: "GET",
      }),
      providesTags: ["Event"],
    }),

    getSingleEvent: builder.query<IEvent, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: "GET",
      }),
      providesTags: ["Event"],
    }),

    addEvent: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/events",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Event"],
    }),

    updateEvent: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/events/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Event"],
    }),
    // Get user post by id
    getUserEventById: builder.query({
      query: (id) => ({
        url: `/events/my-events/${id}`,
        method: "GET",
      }),
      providesTags: ["User", "Event"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetSingleEventQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetUserEventByIdQuery,
} = eventsApi;
