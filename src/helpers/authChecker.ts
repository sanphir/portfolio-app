import { Nullable } from "../interfaces/Common";
import { ITokenInfo } from "../interfaces/ITokenInfo";

export const isAuthenticated = (token: Nullable<ITokenInfo>): boolean => {
    if (!token) {
        return false;
    } else {
        if (token.validTo) {
            return Date.parse(token?.validTo ?? "") > Date.now();
        }
        return false;
    }
};