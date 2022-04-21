import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export enum LoaderStatus {    
    Displayed = 'displayed',
    None = 'none'
}

export interface LoaderState {
    value: boolean;
    status: LoaderStatus;
}

const initialState: LoaderState = {
    value: false,
    status: LoaderStatus.None,
};


export const loaderSlice = createSlice({
    name: 'loaderSlice',
    initialState,
    
    reducers: {        
        setLoaderDisplayed: (state) => {
            state.value = true;            
            state.status = LoaderStatus.Displayed;
        },

        setLoaderNone: (state) => {
            state.value = false;            
            state.status = LoaderStatus.None;
        }
    },
});

export const { setLoaderDisplayed, setLoaderNone } = loaderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.employees.value)`
export const getLoaderDisplayed = (state: RootState) => state.loader.value;

export default loaderSlice.reducer;
