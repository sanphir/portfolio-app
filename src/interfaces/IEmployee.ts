export interface IEmployee {
    id: string;
    name: string;
    email: string;
    role: string;
    birthDate: any;
    salary: number;
    createdDate: any;
    lastModifiedDate: any;
}

export interface INewEmployee {    
    name: string;
    email: string;
    role: string;
    birthDate: any;
    salary: number;
    password: string;    
}