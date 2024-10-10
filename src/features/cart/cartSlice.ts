import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = {
  cart: CartItemType[];
};

// Utility function to update localStorage
const saveCartToLocalStorage = (cart: CartItemType[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Initial state for the cart, loaded from localStorage if present
const initialState: CartStateType = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItemType>) {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.qty += 1; // Increase the quantity of the existing item
      } else {
        state.cart.push({ ...newItem, qty: 1 }); // Add new item to cart
      }
      saveCartToLocalStorage(state.cart);
    },
    removeFromCart(state, action: PayloadAction<{ id: string }>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      saveCartToLocalStorage(state.cart);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; qty: number }>) {
      const { id, qty } = action.payload;
      const item = state.cart.find((item) => item.id === id);

      if (item && qty > 0) {
        item.qty = qty; // Update the quantity of the item
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
