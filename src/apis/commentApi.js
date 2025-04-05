import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../utils/axios.util';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
  }),
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: (data) => ({
        url: '/comments',
        method: 'POST',
        data,
        credentials: true,
      }),
    }),

    getComments: builder.mutation({
      query: (params) => ({
        url: `/comments`,
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { usePostCommentMutation, useGetCommentsMutation } = commentApi;
