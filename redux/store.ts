import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import collegeSlice from './collegeSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    college: collegeSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;