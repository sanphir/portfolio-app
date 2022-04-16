import axios, { AxiosError } from "axios";
import { ICommonResponse } from "../interfaces/ICommonResponse";
import { ITokenInfo } from "../interfaces/ITokenInfo";

const API_URL = "https://localhost:7039/";
const TOKEN_URL = API_URL + "token";

export class AuthService {
    async login(username: string, password: string): Promise<ICommonResponse<ITokenInfo>> {
        try {
            const response = await axios.post(TOKEN_URL, null, {
                params: {
                    username,
                    password,
                },
            });

            console.log(response.data);

            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("userName", response.data.userName);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("validTo", response.data.userName);

            return {
                data: response.data,
                error: null,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    data: null,
                    error: (<AxiosError>error).response?.data?.errorText ?? "Something went wrong!",
                };
            } else {
                return {
                    data: null,
                    error: (<Error>error).message,
                };
            }
        }
    }

    logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
        localStorage.removeItem("validTo");
    }

    isAuth(): boolean {
        return localStorage.getItem("accessToken") != null;
    }

    authHeader(): any {
        const token = localStorage.getItem("accessToken");
        if (token) {
            return { Authorization: "Bearer " + token };
        }
    }
}

export default new AuthService();
