import React from 'react'
import EmployeeService from '../services/EmployeeService';
import { IEmployee } from '../interfaces/IEmployee';
import EmployeesTable from './EmployeesTable/EmployeesTable';


export const Employees = () => {


  let employees: IEmployee[] = EmployeeService.getEmployees();

  return (
    <EmployeesTable rows={employees} /> 
  );

};

export default Employees;