import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../utils/axios.util';

export const genreApi = createApi({
  reducerPath: 'genreApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
  }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => ({
        url: '/genres',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetGenresQuery } = genreApi;
