import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User, UserFilters, PaginationInfo } from '../../types/user';

interface UsersResponse {
  data: User[];
  pagination?: PaginationInfo;
}

interface GetUsersParams {
  page?: number;
  limit?: number;
  filters?: UserFilters;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-generator.retool.com/8CY1D1',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, GetUsersParams>({
      query: ({ page = 1, limit = 10, filters = {} }) => {
        const params = new URLSearchParams();
        
        // Add pagination params
        params.append('_page', page.toString());
        params.append('_limit', limit.toString());
        
        // Add filter params
        if (filters.name) params.append('name', filters.name);
        if (filters.email) params.append('email', filters.email);
        if (filters.company) params.append('company', filters.company);
        
        return {
          url: `/data?${params.toString()}`,
        };
      },
      transformResponse: (response: User[], meta) => {
        // Extract pagination info from headers if available
        const total = meta?.response?.headers.get('X-Total-Count') || '0';
        const totalPages = Math.ceil(parseInt(total) / 10);
        
        return {
          data: response,
          pagination: {
            page: 1,
            limit: 10,
            total: parseInt(total),
            totalPages,
          },
        };
      },
      providesTags: ['User'],
    }),
    
    createUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: '/data',
        method: 'POST',
        body: newUser,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),
    
    updateUser: builder.mutation<User, { id: string; updates: Partial<User> }>({
      query: ({ id, updates }) => ({
        url: `/data/${id}`,
        method: 'PUT',
        body: updates,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),
    
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/data/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;