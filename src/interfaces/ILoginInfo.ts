import { ITokenInfo } from "./ITokenInfo";

type Nullable<T> = T | null;

export interface ILoginInfo {
    tokenResponse: Nullable<ITokenInfo>;
    error: Nullable<string>;
}

