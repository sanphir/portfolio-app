import { Nullable } from "./Common";

export interface ICommonResponse<T> {
    data: Nullable<T>;
    error: Nullable<string>;
}
