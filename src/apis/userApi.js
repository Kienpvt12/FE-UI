import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../utils/axios.util';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
    credentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),

    getCurrentUser: builder.mutation({
      query: () => ({
        url: '/users/current',
        method: 'GET',
      }),
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: '/users/register',
        method: 'POST',
        data,
      }),
    }),

    addUser: builder.mutation({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        data,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        data,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useGetCurrentUserMutation,
  useRefreshTokenMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLogoutMutation,
} = userApi;
