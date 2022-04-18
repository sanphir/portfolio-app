import React, { useEffect, useState } from 'react'
import EmployeeService from '../services/EmployeeService';
import { IEmployee } from '../interfaces/IEmployee';
import EmployeesTable from './EmployeesTable/EmployeesTable';
import { Console } from 'console';


export const Employees = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  console.log(Date.now() + ': Employees');

  useEffect(() => {
    let mounted = true;
    EmployeeService.getEmployees().then(resolve => {
      console.log("Employees useEffect");
      if (!resolve.error) {
        if (mounted) {
          setEmployees(resolve.data ?? []);
        }
      } else {
        //TO DO
        //handle error and show notificator
      }
    });

    return () => {
      mounted = false;
    }
  }, []);
  return (
    <EmployeesTable rows={employees} />
  );

};

export default Employees;