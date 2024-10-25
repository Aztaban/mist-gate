import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type CartItem = {
  product: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
};

// Utility function to update localStorage
const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Initial state for the cart, loaded from localStorage if present
const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.product === newItem.product);

      if (existingItem) {
        existingItem.quantity += 1; // Increase the quantity of the existing item
      } else {
        state.cart.push({ ...newItem, quantity: 1 }); // Add new item to cart
      }
      saveCartToLocalStorage(state.cart);
    },
    removeFromCart(state, action: PayloadAction<{ product: string }>) {
      state.cart = state.cart.filter((item) => item.product !== action.payload.product);
      saveCartToLocalStorage(state.cart);
    },
    updateQuantity(state, action: PayloadAction<{ product: string; quantity: number }>) {
      const { product, quantity } = action.payload;
      const item = state.cart.find((item) => item.product === product);

      if (item && quantity > 0) {
        item.quantity = quantity; // Update the quantity of the item
      }

      saveCartToLocalStorage(state.cart);
    },
    clearCart(state) {
      state.cart = [];

      // Clear the cart in localStorage
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
