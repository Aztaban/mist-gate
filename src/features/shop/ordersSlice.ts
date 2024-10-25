import { apiSlice } from '../../app/api/apiSlice';
import { OrderStatus } from '../../config/orderStatus';

export type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type OrderItem = {
  id: string;
  quantity: number;
  price: number;
};

export type CreateOrder = {
  user: string;
  products: OrderItem[];
  shippingAddress: ShippingAddress;
  itemsPrice: number;
  shippingPrice: number;
};

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
      transformResponse: (response: any) => {
        const orders: Order[] = response.map((order: any) => {
          const { _id, paidAt, created_at, updated_at, closed_at, ...rest } =
            order;
          return {
            id: _id,
            paidAt: paidAt ? new Date(paidAt) : null,
            created_at: new Date(created_at),
            updated_at: new Date(updated_at),
            closed_at: closed_at ? new Date(closed_at) : null,
            ...rest,
          };
        });
        return orders;
      },
      providesTags: (result) =>
        result
          ? result.map((order) => ({ type: 'Order', id: order.id.toString() }))
          : [{ type: 'Post', id: 'LIST' }],
    }),
    getOrderById: builder.query<Order, string>({
      query: (orderId) => `/orders/${orderId}`,
      transformResponse: (responseData: any) => {
        const { _id, paidAt, created_at, updated_at, closed_at, ...rest } =
          responseData;
        return {
          id: _id,
          paidAt: paidAt ? new Date(paidAt) : null,
          created_at: new Date(created_at),
          updated_at: new Date(updated_at),
          closed_at: closed_at ? new Date(closed_at) : null,
          ...rest,
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'Order', id }],
    }),
    addNewOrder: builder.mutation<Order, CreateOrder>({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useAddNewOrderMutation,
} = extendedApiSlice;
