import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '../interfaces/Common';
import { ITokenResponse } from '../interfaces/IToken';
import { RootState } from './store';


export interface AuthState {
    tokenResponse: Nullable<ITokenResponse>;
}

const initialState: AuthState = {
    tokenResponse: null,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,

    reducers: {
        storeToken: (state, action: PayloadAction<ITokenResponse>) => {
            state.tokenResponse = action.payload;
        },

        clearToken: (state) => {
            state.tokenResponse = null;
        }
    },
});

export const { storeToken, clearToken } = authSlice.actions;

export const getAccessToken = (state: RootState) => state.auth.tokenResponse?.accessToken;

export default authSlice.reducer;
