import { ShippingAddress } from "./user";
import { ShippingMethod, OrderStatus } from "../config";

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
  phoneNumber?: string;
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
  phoneNumber?: string;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date | null;
  created_at: Date;
  updated_at: Date;
  closed_at?: Date | null;
}