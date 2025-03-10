import { apiSlice } from '../apiSlice';
import { Order, CreateOrder, PaymentIntentResponse } from '../../types';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<Order[], void>({
      query: () => '/orders',
      providesTags: (result) =>
        result
          ? result.map((order) => ({ type: 'Order', id: order.id.toString() }))
          : [{ type: 'Order', id: 'LIST' }],
    }),
    getOrdersForUser: builder.query<Order[], void>({
      query: () => '/users/user/orders',
      providesTags: (result) =>
        result
          ? result.map((order) => ({ type: 'Order', id: order.id.toString() }))
          : [{ type: 'Order', id: 'LIST' }],
    }),
    getOrderById: builder.query<Order, string>({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: (_result, _error, id) => [{ type: 'Order', id }],
    }),
    addNewOrder: builder.mutation<string, CreateOrder>({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    updateOrder: builder.mutation<void, { orderId: string; updates: Partial<Order> }>({
      query: ({ orderId, updates }) => ({
        url: `/orders/${orderId}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (_result, _error, { orderId }) => [{ type: 'Order', id: orderId }],  
    }),
    createPaymentIntent: builder.mutation<PaymentIntentResponse, string>({
      query: ( orderId ) => ({
        url: `/orders/${orderId}/payment-intent`,
        method: 'POST',
      }),
    }),
    markOrderPaid: builder.mutation<void, string>({
      query: ( orderId ) => ({
        url: `/orders/${orderId}/mark-paid`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrdersForUserQuery,
  useGetOrderByIdQuery,
  useAddNewOrderMutation,
  useUpdateOrderMutation,
  useCreatePaymentIntentMutation,
  useMarkOrderPaidMutation
} = extendedApiSlice;
