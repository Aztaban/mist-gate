import { apiSlice } from '../../app/api/apiSlice';
import { ShippingAddress } from '../shop/ordersApiSlice';
import { Order } from '../shop/ordersApiSlice';

export interface User {
  id: string;
  username: string;
  email: string;
  roles: number[];
  address?: ShippingAddress;
  phoneNumber?: string;
  isActive: boolean;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users (Admin only)
    getAllUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: (result) =>
        result
          ? [
              ...result.map((user) => ({ type: 'User', id: user.id } as const)),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    // Get current authenticated user
    getUser: builder.query<User, void>({
      query: () => '/users/user',
      providesTags: (result) =>
        result ? [{ type: 'User', id: result.id }] : [],
    }),

    // Get orders for the current user
    getOrdersForUser: builder.query<Order[], void>({
      query: () => '/users/user/orders',
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                (order) => ({ type: 'Order', id: order.id } as const)
              ),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),

    // Get a user by ID (Admin only)
    getUserById: builder.query<User, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: (_result, _error, userId) => [{ type: 'User', id: userId }],
    }),

    // Update user address and phone
    updateUserAddressAndPhone: builder.mutation<
      User,
      { updates: Partial<User> }
    >({
      query: ({ updates }) => ({
        url: `/users/user/address`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: [{ type: 'User', id: 'CURRENT' }],
    }),

    // Toggle user status (Admin only)
    toggleUserStatus: builder.mutation<User, { userId: string }>({
      query: ({ userId }) => ({
        url: `/users/${userId}/toggle-status`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'User', id: userId },
      ],
    }),

    // Toggle editor role (Admin only)
    toggleEditorRole: builder.mutation<User, { userId: string }>({
      query: ({ userId }) => ({
        url: `/users/${userId}/toggle-editor`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'User', id: userId },
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetOrdersForUserQuery,
  useGetUserByIdQuery,
  useUpdateUserAddressAndPhoneMutation,
  useToggleUserStatusMutation,
  useToggleEditorRoleMutation,
} = userApiSlice;
