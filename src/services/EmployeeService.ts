import axios, { AxiosError } from "axios";
import { ICommonResponse } from "../interfaces/ICommonResponse";
import { IEmployee, IUpdateEmployee, INewEmployee } from "../interfaces/IEmployee";
import { API_URL } from "../config";
import AuthService from "./AuthService";

export class EmployeeService {
    async getEmployees(): Promise<ICommonResponse<IEmployee[]>> {
        console.log("invoke getEmployees")
        try {
            const response = await axios.get(`${API_URL}api/Employee/list`, { headers: AuthService.authHeader() });

            return {
                data: response.data as IEmployee[],
                error: null,
            };
        } catch (error) {
            return this.getErrorResposne(error);
        }
    }

    async getEmployee(id: string): Promise<ICommonResponse<IEmployee>> {
        console.log("invoke getEmployees")

        try {
            const response = await axios.get(`${API_URL}api/Employee/${id}`, { headers: AuthService.authHeader() });

            return {
                data: response.data as IEmployee,
                error: null,
            };
        } catch (error) {
            return this.getErrorResposne(error);
        }
    }

    async updateEmployee(employee: IUpdateEmployee): Promise<ICommonResponse<IEmployee>> {
        console.log("invoke updateEmployee")

        try {
            const response = await axios.put(`${API_URL}api/Employee/update`, employee, { headers: AuthService.authHeader() });

            return {
                data: response.data as IEmployee,
                error: null,
            };
        } catch (error) {
            return this.getErrorResposne(error);
        }
    }

    async addEmployee(employee: INewEmployee): Promise<ICommonResponse<IEmployee>> {
        console.log("invoke addEmployee")

        try {
            const response = await axios.post(`${API_URL}api/Employee/add`, employee, { headers: AuthService.authHeader() });
            return {
                data: response.data as IEmployee,
                error: null,
            };

        } catch (error) {
            return this.getErrorResposne(error);
        }
    }

    async removeEmployees(idsToRemove: string[]): Promise<ICommonResponse<string>> {
        console.log("invoke removeEmployees")

        try {
            const response = await axios.delete(`${API_URL}api/Employee`, {
                headers: AuthService.authHeader(),
                data: idsToRemove,
            });

            return {
                data: "ok",
                error: null,
            };
        } catch (error) {
            return this.getErrorResposne(error);
        }
    }

    getErrorResposne(error: any): any {
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

export default new EmployeeService();