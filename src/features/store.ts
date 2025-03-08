import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import checkoutReducer from './slices/checkoutSlice';
import ordersReducer from './slices/ordersSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    checkout: checkoutReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;