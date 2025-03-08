import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ShippingAddress } from '../apiSlices/ordersApiSlice';
import { ShippingMethod } from '../../config/shippingConfig';
import { OrderItem, CreateOrder } from '../apiSlices/ordersApiSlice';

const loadCheckoutState = (): CheckoutState => {
  try {
    const storedState = localStorage.getItem('checkout');
    return storedState
      ? JSON.parse(storedState)
      : {
          products: [],
          shippingAddress: null,
          shippingMethod: ShippingMethod.Standard,
          orderId: null,
          phoneNumber: '',
        };
  } catch (error) {
    return {
      products: [],
      shippingAddress: null,
      shippingMethod: ShippingMethod.Standard,
      orderId: null,
      phoneNumber: '',
    };
  }
};

export interface CheckoutState extends CreateOrder {
  orderId: string | null;
}

// Utility function to update localStorage
const saveCheckoutState = (state: CheckoutState) => {
  localStorage.setItem('checkout', JSON.stringify(state));
};

const initialState: CheckoutState = loadCheckoutState() || {
  products: [],
  shippingAddress: null,
  shippingMethod: ShippingMethod.Standard,
  phoneNumber: '',
  orderId: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<OrderItem>) {
      const newItem = action.payload;
      const existingItem = state.products.find(
        (item) => item.product === newItem.product
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.products.push({ ...newItem, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<{ product: string }>) {
      state.products = state.products.filter(
        (item) => item.product !== action.payload.product
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{ product: string; quantity: number }>
    ) {
      const { product, quantity } = action.payload;
      const item = state.products.find((item) => item.product === product);

      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.products = [];
      state.shippingAddress = null;
      state.shippingMethod = ShippingMethod.Standard;
      state.phoneNumber = '';
    },
    setCheckout: (
      state,
      action: PayloadAction<{
        shippingAddress: ShippingAddress;
        shippingMethod: ShippingMethod;
        phoneNumber?: string;
      }>
    ) => {
      state.shippingAddress = action.payload.shippingAddress;
      state.shippingMethod = action.payload.shippingMethod;
      state.phoneNumber = action.payload.phoneNumber || '';
    },
    setOrderId(state, action: PayloadAction<string>) {
      state.orderId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => {
      saveCheckoutState(state);
    });
  },
});

export const selectCartItems = (state: RootState) => state.checkout.products;
export const selectShippingAddress = (state: RootState) =>
  state.checkout.shippingAddress;
export const selectShippingMethod = (state: RootState) =>
  state.checkout.shippingMethod;
export const selectCheckout = (state: RootState) => state.checkout;
export const selectOrderId = (state: RootState) => state.checkout.orderId;

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCheckout,
  setOrderId,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
