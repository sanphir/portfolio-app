import axios, { AxiosError } from "axios";
import { ICommonResponse } from "../interfaces/ICommonResponse";

export const getErrorResposne = (error: any): ICommonResponse<any> => {
    console.log(`Response error: ${JSON.stringify(error)}`);

    let errorMessage = error?.response?.data;
    if (errorMessage) {
        return {
            data: null,
            error: errorMessage
        }
    }
    if (axios.isAxiosError(error)) {
        return {
            data: null,
            error: (error as AxiosError).response?.data?.errorText ?? (error as AxiosError).message,
        };
    } else {
        return {
            data: null,
            error: (error as Error).message,
        };
    }
}