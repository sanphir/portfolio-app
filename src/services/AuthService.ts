import axios, { AxiosError } from "axios";
import { Nullable } from "../interfaces/Common";
import { ICommonResponse } from "../interfaces/ICommonResponse";
import { ITokenInfo } from "../interfaces/ITokenInfo";

const API_URL = "https://localhost:7039/";
const TOKEN_URL = API_URL + "token";

export class AuthService {
    async signin(username: string, password: string): Promise<ICommonResponse<ITokenInfo>> {
        try {
            const response = await axios.post(TOKEN_URL, null, {
                params: {
                    username,
                    password,
                },
            });

            localStorage.setItem("tokenInfo", JSON.stringify(response.data));

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

    signout() {
        localStorage.removeItem("tokenInfo");
    }

    getTokenInfo(): Nullable<ITokenInfo> {
        let storedTokenInfo = localStorage.getItem("tokenInfo")
        //console.log(`storedTokenInfo=${storedTokenInfo}`);
        if (storedTokenInfo) {
            return <ITokenInfo>JSON.parse(storedTokenInfo);
        }
        return null;
    }

    isAuth(): boolean {
        let tokenInfo = this.getTokenInfo();
        if (tokenInfo) {
            return Date.parse(tokenInfo.validTo ?? "") > Date.now();
        }
        return false;
    }

    authHeader(): any {
        let tokenInfo = this.getTokenInfo();
        return { Authorization: "Bearer " + tokenInfo?.accessToken ?? "" };
    }
}

export default new AuthService();
