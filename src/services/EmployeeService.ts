import axios from "axios";
import { ICommonResponse } from "../interfaces/ICommonResponse";
import { IEmployee, IUpdateEmployee, INewEmployee } from "../interfaces/IEmployee";
import { API_URL } from "../config";
import AuthService from "./AuthService";
import { getErrorResposne } from "../helpers/axiosHelper";

export class EmployeeService {
    async getEmployees(): Promise<ICommonResponse<IEmployee[]>> {
        //console.log("invoke getEmployees")
        try {
            let authHeader = await AuthService.authHeader();
            const response = await axios.get(`${API_URL}api/Employee/list`, { headers: authHeader });

            return {
                data: response.data as IEmployee[],
                error: null,
            };
        } catch (error) {
            return getErrorResposne(error);
        }
    }

    async getEmployee(id: string): Promise<ICommonResponse<IEmployee>> {
        //console.log("invoke getEmployee")

        try {
            let authHeader = await AuthService.authHeader();
            const response = await axios.get(`${API_URL}api/Employee/${id}`, { headers: authHeader });

            return {
                data: response.data as IEmployee,
                error: null,
            };
        } catch (error) {
            return getErrorResposne(error);
        }
    }

    async updateEmployee(employee: IUpdateEmployee): Promise<ICommonResponse<IEmployee>> {
        //console.log("invoke updateEmployee")

        try {
            let authHeader = await AuthService.authHeader();
            const response = await axios.put(`${API_URL}api/Employee/update`, employee, { headers: authHeader });

            return {
                data: response.data as IEmployee,
                error: null,
            };
        } catch (error) {
            return getErrorResposne(error);
        }
    }

    async addEmployee(employee: INewEmployee): Promise<ICommonResponse<IEmployee>> {
        console.log("invoke addEmployee")

        try {
            let authHeader = await AuthService.authHeader();
            const response = await axios.post(`${API_URL}api/Employee/add`, employee, { headers: authHeader });
            return {
                data: response.data as IEmployee,
                error: null,
            };

        } catch (error) {
            return getErrorResposne(error);
        }
    }

    async removeEmployees(idsToRemove: string[]): Promise<ICommonResponse<string>> {
        //console.log("invoke removeEmployees")

        try {
            let authHeader = await AuthService.authHeader();
            await axios.delete(`${API_URL}api/Employee`, {
                headers: authHeader,
                data: idsToRemove,
            });

            return {
                data: "ok",
                error: null,
            };
        } catch (error) {
            return getErrorResposne(error);
        }
    }
}

export default new EmployeeService();