export interface IEmployee {
    Id: string;
    Name: string;
    Email: string;
    Role: string;
    BirthDate: any;
    Salary: number;
    CreatedDate: any;
    LastModifiedDate: any;
}

export interface INewEmployee {    
    Name: string;
    Email: string;
    Role: string;
    BirthDate: any;
    Salary: number;
    Password: string;    
}