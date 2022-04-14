import React from 'react'
import EmployeeService from '../services/EmployeeService';
import { IEmployee } from '../interfaces/IEmployee';

export const EmployeesList = () => {    
    let employees: IEmployee[] = EmployeeService.getEmployeesList();
    return (
        <ol>
          {employees.map(employee => (
            <li key={employee.Id}>{employee.Name}</li>
          ))}
        </ol>
      );
  
};

export default EmployeesList;