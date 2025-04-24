import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../utils/axios.util';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),

    getCurrentUser: builder.mutation({
      query: () => ({
        url: '/users/current',
        method: 'GET',
        credentials: true,
      }),
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
        credentials: true,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        data,
        credentials: true,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
        credentials: true,
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
        credentials: true,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}/admin`,
        method: 'PATCH',
        data,
        credentials: true,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/admin`,
        method: 'DELETE',
        credentials: true,
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
