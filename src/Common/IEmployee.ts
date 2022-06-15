export enum Role {
    Admin = 0,
    User = 1,
}
interface BaseEmployee {
    name: string;
    email: string;
    role: Role;
    birthDate: any;
    salary: number;
}
export interface IEmployee extends IUpdateEmployee {
    createdDate: any;
    lastModifiedDate: any;
}

export interface IUpdateEmployee extends BaseEmployee {
    id: string;
}

export interface INewEmployee extends BaseEmployee {
    password: string;
}