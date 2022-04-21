import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { employeesSlice } from './employeesSlice';
import { loaderSlice } from './loaderSlice';

export const store = configureStore({
  reducer: {
    employees: employeesSlice.reducer,
    loader: loaderSlice.reducer
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

