import * as React from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../redux/hooks';
import { addEmployee, updateEmployee } from '../../redux/employeesSlice';
import { toast } from 'react-toastify';
import { IEmployee, IUpdateEmployee, INewEmployee } from '../../interfaces/IEmployee';
import EmployeeService from '../../services/EmployeeService';
import { EmployeeFormControl } from './EmployeeFormControl';

export const EmployeeForm = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isNew = (location.pathname?.indexOf("/employees/new") ?? -1) >= 0;
  const employeeId = params?.id;

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
        toast.success('Employee saved!');
      } else {
        toast.error(`Save error: ${resolve.error}`);
      }
    });
  }

  const saveNewEmployee = (newEmployee: INewEmployee) => {
    EmployeeService.addEmployee(newEmployee).then(resolve => {
      if (!resolve.error) {
        let responseEmployee = resolve.data ?? {} as IEmployee;
        dispatch(addEmployee(responseEmployee));
        navigate(`/employees/${responseEmployee.id}`, { replace: true });
        toast.success('Employee saved!');
      } else {
        toast.error(`Save error: ${resolve.error}`);
      }
    });
  }

  const save = React.useCallback((employee: IUpdateEmployee | INewEmployee) => {
    if (isNew) {
      saveNewEmployee(employee as INewEmployee);
    } else {
      saveEmployee(employee as IUpdateEmployee);
    }
  }, [employeeId]);

  React.useEffect(() => {
    if (!isNew && employeeId) {
      EmployeeService.getEmployee(employeeId).then(resolve => {
        if (!resolve.error) {
          setEmployee(resolve?.data as IEmployee);
        } else {
          toast.success(`Error geting employee: ${resolve.error}`);
        }
      });
    }
    return () => { }
  }, [isNew, employeeId]);

  return (
    <EmployeeFormControl
      employee={employee}
      isNew={isNew}
      onSave={save}
    />
  )
}