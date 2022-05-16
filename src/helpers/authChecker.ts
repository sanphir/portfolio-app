import { Nullable } from "../interfaces/Common";
import { ITokenInfo } from "../interfaces/IToken";

export const isAuthenticated = (tokenInfo: Nullable<ITokenInfo>): boolean => {
    if (!tokenInfo) {
        return false;
    } else {
        let storedTokenInf = localStorage.getItem("tokenInfo");
        if (storedTokenInf) {
            let token = JSON.parse(storedTokenInf) as ITokenInfo
            if (token.exp) {
                return token.exp * 1000 > Date.now();
            }
        }
        return false;
    }
};