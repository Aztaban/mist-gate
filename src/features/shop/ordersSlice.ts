import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from './ordersApiSlice';
import { extendedApiSlice } from './ordersApiSlice';
import { RootState } from '../../app/store';

interface OrdersState {
  orders: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  status: 'idle',
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.status = 'succeeded';
    },
    resetOrders: (state) => {
      state.orders = [];
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        extendedApiSlice.endpoints.getAllOrders.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        extendedApiSlice.endpoints.getAllOrders.matchFulfilled,
        (state, { payload }) => {
          state.orders = payload;
          state.status = 'succeeded';
        }
      )
      .addMatcher(
        extendedApiSlice.endpoints.getAllOrders.matchRejected,
        (state, { error }) => {
          state.status = 'failed';
          state.error = error.message || 'Failed to fetch orders';
        }
      );
  },
});

export const { setOrders, resetOrders } = ordersSlice.actions;

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrdersStatus = (state: RootState) => state.orders.status;

export default ordersSlice.reducer;
