import axios, { AxiosError } from "axios";
import { Nullable } from "../interfaces/Common";
import { ICommonResponse } from "../interfaces/ICommonResponse";
import { ITokenResponse, ITokenInfo } from "../interfaces/IToken";
import { API_URL } from "../config";
import jwtDecode from "jwt-decode";
import { Console } from "console";

const TOKEN_URL = `${API_URL}api/Auth/token`;
const REFRESH_TOKEN_URL = `${API_URL}api/Auth/refreshToken`;

export class AuthService {
    async signin(username: string, password: string): Promise<ICommonResponse<ITokenInfo>> {
        try {
            const response = await axios.post(TOKEN_URL, null, {
                params: {
                    username,
                    password,
                },
            });

            let tokenResponse = response.data as ITokenResponse;
            let tokenInfo = jwtDecode(tokenResponse?.accessToken ?? "") as ITokenInfo;

            localStorage.setItem("accessToken", tokenResponse?.accessToken ?? "");
            localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));

            return {
                data: tokenInfo,
                error: null,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    data: null,
                    error: (error as AxiosError).response?.data?.errorText ?? "Something went wrong!",
                };
            } else {
                return {
                    data: null,
                    error: (error as Error).message,
                };
            }
        }
    }

    async refreshToken(): Promise<ICommonResponse<string>> {
        let accessToken = localStorage.getItem("accessToken");
        try {
            console.log(`Refresh token: ${REFRESH_TOKEN_URL}`);
            const response = await axios.post(REFRESH_TOKEN_URL, null, {
                params: {
                    accessToken,
                },
            });

            console.log(`Refresh token response: ${JSON.stringify(response)}`);
            let tokenResponse = response.data as ITokenResponse;
            let tokenInfo = jwtDecode(tokenResponse?.accessToken ?? "") as ITokenInfo;

            localStorage.setItem("accessToken", tokenResponse?.accessToken ?? "");
            localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo));

            return {
                data: tokenResponse?.accessToken,
                error: null,
            };
        } catch (error) {
            console.log(`Refresh token error: ${JSON.stringify(error)}`);
            if (axios.isAxiosError(error)) {
                return {
                    data: null,
                    error: (error as AxiosError).response?.data?.errorText ?? "Something went wrong!",
                };
            } else {
                return {
                    data: null,
                    error: (error as Error).message,
                };
            }
        }
    }

    signout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenInfo");
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
            //TO DO
            //this isAuth is used for showing elements and access to pages, but not to data
            //should we check life time here?
            return true;
            //return tokenInfo.exp * 1000 > Date.now();
        }
        return false;
    }

    async authHeader(): Promise<any> {
        let tokenInfo = this.getTokenInfo();
        if (tokenInfo) {
            console.log(`get authheader ${tokenInfo.exp * 1000} - ${Date.now() - 30} = ${(tokenInfo.exp * 1000) - (Date.now() - 30)}`);
            if (tokenInfo.exp * 1000 <= Date.now() - 30) {
                await this.refreshToken();
            }
        }
        return { Authorization: "Bearer " + localStorage.getItem("accessToken") };
    }
}

export default new AuthService();
