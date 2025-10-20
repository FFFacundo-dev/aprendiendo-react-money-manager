import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import gastosReducer from './slices/gastosSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gastos: gastosReducer,
  },
});
