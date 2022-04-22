import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '../interfaces/Common';
import { ITokenInfo } from '../interfaces/ITokenInfo';
import { RootState } from './store';


export interface AuthState {
    tokenInfo: Nullable<ITokenInfo>;
}

const initialState: AuthState = {
    tokenInfo: null,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,

    reducers: {
        storeToken: (state, action: PayloadAction<ITokenInfo>) => {
            state.tokenInfo = action.payload;
        },

        clearToken: (state) => {
            state.tokenInfo = null;
        }
    },
});

export const { storeToken, clearToken } = authSlice.actions;

export const getTokenInfo = (state: RootState) => state.auth.tokenInfo;

export default authSlice.reducer;
