type Nullable<T> = T | null;

export interface ICommonResponse<T> {
    data: Nullable<T>;
    error: Nullable<string>;
}
