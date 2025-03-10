import { apiSlice } from '../apiSlice';
import { User, Order, ShippingAddress } from '../../types';

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

    // Update user 
    updateUserAddress: builder.mutation<
      ShippingAddress,
      { address: ShippingAddress }
    >({
      query: ({ address }) => ({
        url: `/users/user/address`,
        method: 'PATCH',
        body: { address },
      }),
      invalidatesTags: [{ type: 'User', id: 'CURRENT' }],
    }),
    updateUserPhone: builder.mutation<User, { phoneNumber: string }>({
      query: ({ phoneNumber }) => ({
        url: `/users/user/phone`,
        method: 'PATCH',
        body: { phoneNumber },
      }),
      invalidatesTags: [{ type: 'User', id: 'CURRENT' }],
    }),
    updateUserEmail: builder.mutation<User, { email: string }>({
      query: ({ email }) => ({
        url: `/users/user/email`,
        method: 'PATCH',
        body: { email },
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
  useUpdateUserAddressMutation,
  useUpdateUserEmailMutation,
  useUpdateUserPhoneMutation,
  useToggleUserStatusMutation,
  useToggleEditorRoleMutation,
} = userApiSlice;
