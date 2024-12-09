import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CreateOrder, ShippingAddress } from '../shop/ordersApiSlice';
import { ShippingMethod } from '../../config/shippingConfig';
import { OrderItem } from '../shop/ordersApiSlice';
import { calculateShippingPrice } from '../../utils/utils';

type CartState = {
  cart: OrderItem[];
  shippingAddress: ShippingAddress | null;
  shippingMethod: ShippingMethod;
};

const createOrder = (state: RootState): CreateOrder | null => {
  const cart = state.cart.cart;
  const shippingAddress = state.cart.shippingAddress;
  const shippingMethod = state.cart.shippingMethod;
  const shippingPrice = calculateShippingPrice(shippingMethod);

  const itemsPrice = parseFloat(
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
  );

  if (!shippingAddress ||!shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.country || !shippingAddress?.postalCode) {
    return null;
  }

  return {
    products: cart,
    shippingAddress,
    shippingMethod,
    itemsPrice,
    shippingPrice,
  };
};

// Utility function to update localStorage
const saveCartToLocalStorage = (cartState: CartState) => {
  localStorage.setItem('cart', JSON.stringify(cartState));
};

const savedCartState = JSON.parse(localStorage.getItem('cart') || '{}');
const initialState: CartState = {
  cart: savedCartState.cart || [],
  shippingAddress: savedCartState.shippingAddress || null,
  shippingMethod: savedCartState.shippingMethod || ShippingMethod.Standard,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<OrderItem>) {
      const newItem = action.payload;
      const existingItem = state.cart.find(
        (item) => item.product === newItem.product
      );

      if (existingItem) {
        existingItem.quantity += 1; // Increase the quantity of the existing item
      } else {
        state.cart.push({ ...newItem, quantity: 1 }); // Add new item to cart
      }
      saveCartToLocalStorage(state);
    },
    removeFromCart(state, action: PayloadAction<{ product: string }>) {
      state.cart = state.cart.filter(
        (item) => item.product !== action.payload.product
      );
      saveCartToLocalStorage(state);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ product: string; quantity: number }>
    ) {
      const { product, quantity } = action.payload;
      const item = state.cart.find((item) => item.product === product);

      if (item && quantity > 0) {
        item.quantity = quantity; // Update the quantity of the item
      }

      saveCartToLocalStorage(state);
    },
    clearCart(state) {
      state.cart = [];
      state.shippingAddress = null;
      state.shippingMethod = ShippingMethod.Standard;
      // Clear the cart in localStorage
      localStorage.removeItem('cart');
    },
    setShippingAddress(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
      saveCartToLocalStorage(state);
    },
    setShippingMethod(state, action: PayloadAction<ShippingMethod>) {
      state.shippingMethod = action.payload;
      saveCartToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setShippingAddress,
  setShippingMethod,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cart;
export const selectShippingAddress = (state: RootState) =>
  state.cart.shippingAddress;
export const selectShippingMethod = (state: RootState) =>
  state.cart.shippingMethod;
export const selectCartState = (state: RootState) => state.cart;
export const selectCreateOrder = (state: RootState): CreateOrder | null =>
  createOrder(state);

export default cartSlice.reducer;
