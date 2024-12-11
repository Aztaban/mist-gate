import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ShippingAddress } from '../shop/ordersApiSlice';
import { ShippingMethod } from '../../config/shippingConfig';
import { OrderItem, CreateOrder } from '../shop/ordersApiSlice';

const loadCheckoutState = (): CreateOrder => {
  return JSON.parse(localStorage.getItem('checkout') || '{}');
};

// Utility function to update localStorage
const saveCheckoutState = (state: CreateOrder) => {
  localStorage.setItem('checkout', JSON.stringify(state));
};

const initialState: CreateOrder = loadCheckoutState() || {
  products: [],
  shippingAddress: null,
  shippingMethod: ShippingMethod.Standard,
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
    },
    setShippingAddress(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
    },
    setShippingMethod(state, action: PayloadAction<ShippingMethod>) {
      state.shippingMethod = action.payload;
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

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setShippingAddress,
  setShippingMethod,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
