import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable } from '../Common/Common';
import { ITokenInfo, ITokenResponse } from '../Common/IToken';
import { RootState } from './store';
import jwtDecode from "jwt-decode";

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
export const getAccessTokenInfo = (state: RootState) => jwtDecode(state.auth.tokenResponse?.accessToken ?? "") as ITokenInfo;

export default authSlice.reducer;
