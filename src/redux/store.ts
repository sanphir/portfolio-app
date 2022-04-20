import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { employeesSlice } from './employeesSlice';

export const store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
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

