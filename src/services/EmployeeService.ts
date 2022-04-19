import axios, { AxiosError } from "axios";
import { ICommonResponse } from "../interfaces/ICommonResponse";
import { IEmployee } from "../interfaces/IEmployee";
import AuthService from "./AuthService";

const API_URL = "https://localhost:7039/";

export class EmployeeService {
    async getEmployees(): Promise<ICommonResponse<IEmployee[]>> {
        console.log("invoke getEmployees")

        try {
            const response = await axios.get(`${API_URL}api/Employee/list`, { headers: AuthService.authHeader() });
            //console.log(Date.now()+': We get Employees: '+response.data);

            return {
                data: response.data as IEmployee[],
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

    async removeEmployees(idsToRemove: string[]): Promise<ICommonResponse<string>> {
        console.log("invoke removeEmployees")

        try {
            const response = await axios.delete(`${API_URL}api/Employee`, {
                headers: AuthService.authHeader(), data: 
                    idsToRemove
                ,
            });

            return {
                data: "ok",
                error: null,
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("removeEmployees error: "+JSON.stringify(error));
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
}

export default new EmployeeService();