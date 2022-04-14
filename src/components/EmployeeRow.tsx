import React from 'react'
import { useParams } from 'react-router-dom'
//import { employees } from './EmployeesProvider';

export const EmployeeRow = () => {
  const {id} = useParams();
  return (<div>Студент {[id]}</div>)
  //return (<div>Студент {employees[id]}</div>)
}
