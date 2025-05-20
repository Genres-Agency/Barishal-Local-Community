import { baseApi } from "../../api/baseApi";

export interface IUserActivity {
  stats: {
    posts: number;
    comments: number;
    events: number;
  };
  recentActivities: Array<{
    id: string;
    type: 'post' | 'comment' | 'event';
    description: string;
    createdAt: string;
  }>;
}

const activityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserActivity: builder.query<IUserActivity, void>({
      query: () => ({
        url: '/user/activity',
        method: 'GET',
      }),
      providesTags: ['Activity', 'Post', 'Event','Comment'],
    }),
  }),
});

export const { useGetUserActivityQuery } = activityApi;