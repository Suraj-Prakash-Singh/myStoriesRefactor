import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import authSlice from '../features/auth/authSlice';
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});
