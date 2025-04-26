import { baseApi } from "../../api/baseApi";

export type IEvent = {
  id: string;
  title: string;
  time: string;
  location: string;
  status: string;
  image: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ICreateEvent = {
  title: string;
  date: string;
  location: string;
  image: string;
  description?: string;
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

    updateEvent: builder.mutation<
      IEvent,
      { id: string; data: Partial<ICreateEvent> }
    >({
      query: ({ id, data }) => ({
        url: `/events/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Event"],
    }),

    deleteEvent: builder.mutation<void, string>({
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
} = eventsApi;
