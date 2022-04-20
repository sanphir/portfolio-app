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
            localStorage.setItem("validTo", response.data.validTo);

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
        if (localStorage.getItem("accessToken") && localStorage.getItem("validTo")) {
            //console.log(`Valid to: ${localStorage.getItem("validTo")} now ${Date.now()}`)
            //console.log(`Parse valid to: ${Date.parse(localStorage.getItem("validTo") ?? "")} now ${Date.now()}`)
            return Date.parse(localStorage.getItem("validTo") ?? "") > Date.now();
        }
        return false;
    }

    authHeader(): any {
        const token = localStorage.getItem("accessToken");
        if (token) {
            return { Authorization: "Bearer " + token };
        }
    }
}

export default new AuthService();
