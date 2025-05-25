import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../utils/axios.util';

export const dashboardApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
  }),
  endpoints: (builder) => ({
    getAnalytics: builder.mutation({
      query: (body) => ({
        url: '/analytics',
        method: 'POST',
        data: body,
        credentials: true,
      }),
    }),
  }),
});

export const { useGetAnalyticsMutation } = dashboardApi;