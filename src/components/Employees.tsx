import React, { useEffect, useState } from 'react'
import { IEmployee } from '../interfaces/IEmployee';
import EmployeesTable from './EmployeesTable/EmployeesTable';
import { useAppSelector, useAppDispatch } from '../common/hooks';
import {
  getEmployeesAsync,
  setEmployees,
  selectEmployees
} from '../reducers/employeesSlice';


export const Employees = () => {
  const employees = useAppSelector(selectEmployees);
  const dispatch = useAppDispatch();
  const [employeesRows, setEmployeesRows] = useState<IEmployee[]>([]);
  console.log(Date.now() + ': Employees');


  useEffect(() => {
    console.log("Employees useEffect");
    dispatch(getEmployeesAsync());
    return () => { }
  }, []);

  return (
    <EmployeesTable rows={employees} />
  );

};

export default Employees;