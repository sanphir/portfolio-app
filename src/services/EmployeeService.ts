import axios, { AxiosError } from "axios";
import { Nullable } from "../interfaces/Common";
import { ICommonResponse } from "../interfaces/ICommonResponse";
import { IEmployee, IUpdateEmployee, INewEmployee } from "../interfaces/IEmployee";
import AuthService from "./AuthService";

const API_URL = "https://localhost:7039/";

export class EmployeeService {
    async getEmployees(tkone: string): Promise<ICommonResponse<IEmployee[]>> {
        console.log("invoke getEmployees")
        try {
            const response = await axios.get(`${API_URL}api/Employee/list`, { headers: AuthService.authHeader(tkone) });

            return {
                data: response.data as IEmployee[],
                error: null,
            };
        } catch (error) {
            console.log(`getEmployees error: ${JSON.stringify(error)}`);
            if (axios.isAxiosError(error)) {
                return {
                    data: null,
                    error: (<AxiosError>error).response?.data?.errorText ?? (<AxiosError>error).message,
                };
            } else {
                return {
                    data: null,
                    error: (<Error>error).message,
                };
            }
        }
    }

    async getEmployee(id: string, tkone: string): Promise<ICommonResponse<IEmployee>> {
        console.log("invoke getEmployees")

        try {
            const response = await axios.get(`${API_URL}api/Employee/${id}`, { headers: AuthService.authHeader(tkone) });

            return {
                data: response.data as IEmployee,
                error: null,
            };
        } catch (error) {
            console.log(`getEmployee error: ${JSON.stringify(error)}`);
            if (axios.isAxiosError(error)) {
                return {
                    data: null,
                    error: (<AxiosError>error).response?.data?.errorText ?? (<AxiosError>error).message,
                };
            } else {
                return {
                    data: null,
                    error: (<Error>error).message,
                };
            }
        }
    }

    async updateEmployee(employee: IUpdateEmployee, token: string): Promise<ICommonResponse<IEmployee>> {
        console.log("invoke updateEmployee")

        try {
            const response = await axios.put(`${API_URL}api/Employee/update`, employee, { headers: AuthService.authHeader(token) });

            return {
                data: response.data as IEmployee,
                error: null,
            };
        } catch (error) {
            console.log(`updateEmployee error: ${JSON.stringify(error)}`);
            if (axios.isAxiosError(error)) {
                return {
                    data: null,
                    error: (<AxiosError>error).response?.data?.errorText ?? (<AxiosError>error).message,
                };
            } else {
                return {
                    data: null,
                    error: (<Error>error).message,
                };
            }
        }
    }

    async addEmployee(employee: INewEmployee, token: string): Promise<ICommonResponse<IEmployee>> {
        console.log("invoke addEmployee")

        try {
            const response = await axios.post(`${API_URL}api/Employee/add`, employee, { headers: AuthService.authHeader(token) });

            return {
                data: response.data as IEmployee,
                error: null,
            };
        } catch (error) {
            console.log(`addEmployee error: ${JSON.stringify(error)}`);
            if (axios.isAxiosError(error)) {
                return {
                    data: null,
                    error: (<AxiosError>error).response?.data?.errorText ?? (<AxiosError>error).message,
                };
            } else {
                return {
                    data: null,
                    error: (<Error>error).message,
                };
            }
        }
    }

    async removeEmployees(idsToRemove: string[], token: string): Promise<ICommonResponse<string>> {
        console.log("invoke removeEmployees")

        try {
            const response = await axios.delete(`${API_URL}api/Employee`, {
                headers: AuthService.authHeader(token),
                data: idsToRemove,
            });

            return {
                data: "ok",
                error: null,
            };
        } catch (error) {
            console.log(`removeEmployees error: ${JSON.stringify(error)}`);
            if (axios.isAxiosError(error)) {
                return {
                    data: null,
                    error: (<AxiosError>error).response?.data?.errorText ?? (<AxiosError>error).message,
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