import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { employeesSlice } from './employeesSlice';
import { loaderSlice } from './loaderSlice';

export const store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
    loader: loaderSlice.reducer,
    auth: authSlice.reducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

