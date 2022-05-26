import axios from "axios";
import { ICommonResponse } from "../interfaces/ICommonResponse";
import { INewWorkTask, IUpdateWorkTask, IWorkTask } from "../interfaces/IWorkTask";
import { API_URL } from "../config";
import AuthService from "./AuthService";
import { getErrorResposne } from "../helpers/axiosHelper";

export class WorkTaskervice {
    async getAll(): Promise<ICommonResponse<IWorkTask[]>> {
        try {
            let authHeader = await AuthService.authHeader();
            const response = await axios.get(`${API_URL}api/WorkTask/list`, { headers: authHeader });

            return {
                data: response.data as IWorkTask[],
                error: null,
            };
        } catch (error) {
            return getErrorResposne(error);
        }
    }

    async getAssignedTo(employeeId: string): Promise<ICommonResponse<IWorkTask[]>> {
        try {
            let authHeader = await AuthService.authHeader();
            const response = await axios.get(`${API_URL}api/WorkTask/assigndeTo/${employeeId}`, { headers: authHeader });

            return {
                data: response.data as IWorkTask[],
                error: null,
            };
        } catch (error) {
            return getErrorResposne(error);
        }
    }

    async getCreatedBy(employeeId: string): Promise<ICommonResponse<IWorkTask[]>> {
        try {
            let authHeader = await AuthService.authHeader();
            const response = await axios.get(`${API_URL}api/WorkTask/createdBy/${employeeId}`, { headers: authHeader });

            return {
                data: response.data as IWorkTask[],
                error: null,
            };
        } catch (error) {
            return getErrorResposne(error);
        }
    }

    async get(workTaskId: string): Promise<ICommonResponse<IWorkTask>> {
        try {
            let authHeader = await AuthService.authHeader();
            const response = await axios.get(`${API_URL}api/WorkTask/${workTaskId}`, { headers: authHeader });

            return {
                data: response.data as IWorkTask,
                error: null,
            };
        } catch (error) {
            return getErrorResposne(error);
        }
    }

    async update(workTask: IUpdateWorkTask): Promise<ICommonResponse<IWorkTask>> {

        try {
            let authHeader = await AuthService.authHeader();
            const response = await axios.put(`${API_URL}api/WorkTask/update`, workTask, { headers: authHeader });

            return {
                data: response.data as IWorkTask,
                error: null,
            };
        } catch (error) {
            return getErrorResposne(error);
        }
    }

    async add(workTask: INewWorkTask): Promise<ICommonResponse<IWorkTask>> {

        try {
            let authHeader = await AuthService.authHeader();
            const response = await axios.post(`${API_URL}api/WorkTask/update`, workTask, { headers: authHeader });
            return {
                data: response.data as IWorkTask,
                error: null,
            };

        } catch (error) {
            return getErrorResposne(error);
        }
    }

    async remove(idsToRemove: string[]): Promise<ICommonResponse<string>> {

        try {
            let authHeader = await AuthService.authHeader();
            await axios.delete(`${API_URL}api/WorkTask`, {
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

export default new WorkTaskervice();