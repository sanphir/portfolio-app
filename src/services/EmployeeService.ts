import axios from "axios";
import { IEmployee } from "../interfaces/IEmployee";
import AuthService from "./AuthService";

const API_URL = "https://localhost:7039/";

export class EmployeeService {
    getEmployees(): any[] {
        const fakeEmployees = [
            {
                Id: "829811CF-4E79-4A15-854F-EE344AD21B35",
                Name: "admin",
                Email: "admin@mail.com",
                Role: "admin",
                BirthDate: "2022222",
                Salary: "0",
                CreatedDate: "",
                LastModifiedDate: "",
            }, 
            {
                Id: "56E4750F-0E98-479C-8ED4-30FE585F90A4",
                Name: "user1",
                Email: "user1@mail.com",
                Role: "user",
                BirthDate: "2022222",
                Salary: "0",
                CreatedDate: "",
                LastModifiedDate: "",
            },
            {
                Id: "6F6CBEEC-B9B1-4521-88D1-F4F720ADEE34",
                Name: "user2",
                Email: "user2@mail.com",
                Role: "user",
                BirthDate: "2022222",
                Salary: "0",
                CreatedDate: "",
                LastModifiedDate: "",
            },
            {
                Id: "9AD1BE21-5EDE-410D-AC06-416735843741",
                Name: "user3",
                Email: "user3@mail.com",
                Role: "user",
                BirthDate: "2022222",
                Salary: "0",
                CreatedDate: "",
                LastModifiedDate: "",
            },
        ];


      return fakeEmployees;
      //return axios.get(API_URL + "api/Employee/list", {  headers:  AuthService.authHeader() });
    }
  }

export default new EmployeeService();