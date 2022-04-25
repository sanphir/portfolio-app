import * as React from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../redux/hooks';
import { addEmployee, updateEmployee } from '../../redux/employeesSlice';

import { IEmployee, IUpdateEmployee, INewEmployee } from '../../interfaces/IEmployee';
import EmployeeService from '../../services/EmployeeService';
import { EmployeeFormControl } from './EmployeeFormControl';

export const EmployeeForm = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let isNew = (location.pathname?.indexOf("/employees/new") ?? -1) >= 0;

  const [employee, setEmployee] = React.useState<IEmployee>({
    name: "",
    email: "",
    salary: 0,
    role: "user",
    birthDate: null,
    createdDate: null,
    lastModifiedDate: null,
  } as IEmployee);

  const saveEmployee = (updatedEmployee: IUpdateEmployee) => {
    EmployeeService.updateEmployee(updatedEmployee).then(resolve => {
      if (!resolve.error) {
        let savedEmployee = resolve?.data as IEmployee;
        dispatch(updateEmployee(savedEmployee));
        setEmployee(savedEmployee);
        console.log('updatedEmployees ok!');
      } else {
        console.log('updatedEmployees error: ' + resolve.error);
        //TO DO
        //add notificator with error
      }
    });
  }

  const saveNewEmployee = (newEmployee: INewEmployee) => {
    EmployeeService.addEmployee(newEmployee).then(resolve => {
      if (!resolve.error) {
        let responseEmployee = resolve.data ?? {} as IEmployee;
        dispatch(addEmployee(responseEmployee));
        navigate(`/employees/${responseEmployee.id}`, { replace: true });
        console.log('newEmployees ok!');
      } else {
        console.log('newEmployees error: ' + resolve.error);
        //TO DO
        //add notificator with error
      }
    });
  }

  const save = async (employee: IUpdateEmployee | INewEmployee) => {
    if (isNew) {
      saveNewEmployee(employee as INewEmployee);
    } else {
      saveEmployee(employee as IUpdateEmployee);
    }
  }

  React.useEffect(() => {
    console.log(`Employee form euseEffect: isNew=${isNew} params.id=${params.id}`)
    if (!isNew && params.id) {
      EmployeeService.getEmployee(params.id ?? "").then(resolve => {
        if (!resolve.error) {
          console.log('getEmployee ok!');
          setEmployee(resolve?.data as IEmployee);
        } else {
          console.log('getEmployee error: ' + resolve.error);
          //TO DO
          //add notificator with error
        }
      });
    }
    return () => { }
  }, [isNew]);

  return (
    <EmployeeFormControl
      employee={employee}
      isNew={isNew}
      onSave={save}
    />
  )
}