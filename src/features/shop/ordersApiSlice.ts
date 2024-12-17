import { apiSlice } from '../../app/api/apiSlice';
import { OrderStatus } from '../../config/orderStatus';
import { ShippingMethod } from '../../config/shippingConfig';

export type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type OrderItem = {
  product: string;
  name: string;
  quantity: number;
  price: number;
};

export type CreateOrder = {
  products: OrderItem[];
  shippingAddress: ShippingAddress | null;
  shippingMethod: ShippingMethod;
};

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface Order {
  id: string;
  orderNo: number;
  user: {
    _id: string;
    username: string;
  };
  products: OrderItem[];
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  shippingMethod: ShippingMethod;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date | null;
  created_at: Date;
  updated_at: Date;
  closed_at?: Date | null;
}

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
      query: () => '/orders/user',
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
    updateOrderStatus: builder.mutation<
      void,
      { orderId: string; status: OrderStatus }
    >({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: 'Order', id: orderId },
      ],
    }),
    updateOrderShipping: builder.mutation<
      void,
      { orderId: string; shippingMethod: ShippingMethod }
    >({
      query: ({ orderId, shippingMethod }) => ({
        url: `/orders/${orderId}/shipping`,
        method: 'PUT',
        body: { shippingMethod },
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: 'Order', id: orderId },
      ],
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
  useUpdateOrderStatusMutation,
  useUpdateOrderShippingMutation,
  useCreatePaymentIntentMutation,
  useMarkOrderPaidMutation
} = extendedApiSlice;
