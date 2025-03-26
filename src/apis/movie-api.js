import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../utils/axios.util';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
    credentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.mutation({
      query: (data) => ({
        url: '/movies',
        method: 'POST',
        data,
      }),
    }),

    // addMovie: builder.mutation({
    //   query: (data) => ({
    //     url: '/movies',
    //     method: 'POST',
    //     data,
    //   }),
    // }),

    // updateMovie: builder.mutation({
    //   query: ({ id, ...data }) => ({
    //     url: `/movies/${id}`,
    //     method: 'PATCH',
    //     data,
    //   }),
    // }),

    // deleteMovie: builder.mutation({
    //   query: (id) => ({
    //     url: `/movies/${id}`,
    //     method: 'DELETE',
    //   }),
    // }),
  }),
});

export const {
  useGetMoviesMutation,
  //   useGetMoviesQuery,
  //   useAddMovieMutation,
  //   useUpdateMovieMutation,
  //   useDeleteMovieMutation,
  //   useLogoutMutation,
} = movieApi;
