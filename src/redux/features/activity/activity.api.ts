import { baseApi } from "../../api/baseApi";

export interface IUserActivity {
  stats: {
    totalPosts: number;
    totalComments: number;
    totalEvents: number;
    totalLikes: number;
    lastActivity: string | null;
  };
  posts: Array<{
    id: number;
    content: string;
    photo: string | null;
    createdAt: string;
    _count: {
      likes: number;
      comments: number;
    }
  }>;
  events: Array<any>;
}

const activityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserActivity: builder.query<IUserActivity, void>({
      query: () => ({
        url: '/user/activity',
        method: 'GET',
      }),
      providesTags: ['Activity', 'Post', 'Event','Comment',"Like"],
    }),
  }),
});

export const { useGetUserActivityQuery } = activityApi;