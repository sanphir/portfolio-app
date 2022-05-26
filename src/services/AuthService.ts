import axios from "axios";
import { Nullable } from "../interfaces/Common";
import { ICommonResponse } from "../interfaces/ICommonResponse";
import { ITokenResponse, ITokenInfo } from "../interfaces/IToken";
import { getErrorResposne } from "../helpers/axiosHelper";
import { API_URL } from "../config";
import jwtDecode from "jwt-decode";
import { toast } from 'react-toastify';

const TOKEN_URL = `${API_URL}api/Auth/token`;
const REFRESH_TOKEN_URL = `${API_URL}api/Auth/refreshToken`;

export class AuthService {
    async signin(username: string, password: string): Promise<ICommonResponse<ITokenInfo>> {
        try {
            const response = await axios.post(TOKEN_URL, null, {
                withCredentials: true,
                params: {
                    username,
                    password,
                },
            });

            let tokenResponse = response.data as ITokenResponse;
            let tokenInfo = this.processTokenResponse(tokenResponse);

            return {
                data: tokenInfo,
                error: null,
            };
        } catch (error) {
            return getErrorResposne(error);
        }
    }
    refreshinTokenStarted = false;

    async refreshToken(): Promise<ICommonResponse<string>> {
        let accessToken = localStorage.getItem("accessToken");
        try {
            this.refreshinTokenStarted = true;
            const response = await axios.post(REFRESH_TOKEN_URL, null, {
                withCredentials: true,
                params: {
                    accessToken,
                }
            });

            let tokenResponse = response.data as ITokenResponse;
            this.processTokenResponse(tokenResponse);

            return {
                data: tokenResponse?.accessToken,
                error: null,
            };
        } catch (error) {
            return getErrorResposne(error);
        } finally {
            this.refreshinTokenStarted = false;
        }
    }

    signout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("empployeeId");
        localStorage.removeItem("tokenInfo");

        document.location.href = "/signin";
    }

    processTokenResponse(tokenResponse: ITokenResponse): ITokenInfo {
        let tokenInfo = jwtDecode(tokenResponse?.accessToken ?? "") as ITokenInfo;

        localStorage.setItem("accessToken", tokenResponse?.accessToken ?? "");
        localStorage.setItem("empployeeId", tokenResponse?.employeeId ?? "");
        localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));

        return tokenInfo;
    }

    getTokenInfo(): Nullable<ITokenInfo> {
        let storedTokenInfo = localStorage.getItem("tokenInfo")
        if (storedTokenInfo) {
            return JSON.parse(storedTokenInfo) as ITokenInfo;
        }
        return null;
    }

    isAuth(): boolean {
        let tokenInfo = this.getTokenInfo();
        if (tokenInfo) {
            return true;
        }
        return false;
    }

    needRefreshToken(): boolean {
        let tokenInfo = this.getTokenInfo();
        if (tokenInfo) {
            return tokenInfo.exp * 1000 <= Date.now() - 30000;
        }
        return false;
    }

    async authHeader(): Promise<any> {
        if (this.needRefreshToken()) {
            let refreshResponse = await this.refreshToken();
            if (refreshResponse?.error) {
                this.signout();
                toast.error(`Sign out: ${refreshResponse.error}`);
            }
        }

        return { Authorization: "Bearer " + localStorage.getItem("accessToken") };
    }
}

export default new AuthService();
