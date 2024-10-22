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

export interface UserOrder {
  id: string;
  orderNo: number;
  products: OrderItem[];
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date | null;
  created_at: Date;
}

export interface AdminOrder extends UserOrder {
  user: {
    _id: string;
    username: string;
  };
  updated_at: Date;
  closed_at?: Date | null;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<AdminOrder[], void>({
      query: () => '/orders',
      transformResponse: (response: any) => {
        const orders: AdminOrder[] = response.map((order: any) => {
          const { _id, ...rest } = order;
          return { id: _id, ...rest };
        });
        return orders;
      },
      providesTags: (result) =>
        result
          ? result.map((order) => ({ type: 'Order', id: order.id.toString() }))
          : [{ type: 'Post', id: 'LIST' }],
    }),
    getOrderById: builder.query<AdminOrder | UserOrder, string>({
      query: (orderId) => `/orders/${orderId}`,
      transformResponse: (responseData: any) => {
        const { _id, ...rest } = responseData;
        return { id: _id, ...rest};
      }, 
      providesTags: (_result, _error, id) => [{ type: 'Order', id }],
    }),
    addNewOrder: builder.mutation<UserOrder, CreateOrder>({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    })
  }),
});

export const { useGetAllOrdersQuery, useGetOrderByIdQuery, useAddNewOrderMutation } = extendedApiSlice;