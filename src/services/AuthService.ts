import axios, { AxiosError } from "axios";
import { Nullable } from "../interfaces/Common";
import { ICommonResponse } from "../interfaces/ICommonResponse";
import { ITokenResponse, ITokenInfo } from "../interfaces/IToken";
import { API_URL } from "../config";
import jwtDecode from "jwt-decode";

const TOKEN_URL = `${API_URL}api/Auth/token`;

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
            localStorage.setItem("refreshToken", tokenResponse?.refreshToken ?? "");
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

    signout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
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
            return tokenInfo.exp * 1000 > Date.now();
        }
        return false;
    }

    authHeader(): any {
        return { Authorization: "Bearer " + localStorage.getItem("accessToken") };
    }
}

export default new AuthService();
