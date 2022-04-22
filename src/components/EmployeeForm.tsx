import * as React from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addEmployee, updateEmployee } from '../redux/employeesSlice';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { IEmployee, IUpdateEmployee, INewEmployee } from '../interfaces/IEmployee';
import EmployeeService from '../services/EmployeeService';
import { getTokenInfo } from '../redux/authSlice';


export const EmployeeForm = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //const tokenInfo = useAppSelector(getTokenInfo);
  const pwdFieldRef = React.useRef<HTMLInputElement>();
  const confirmPwdFieldRef = React.useRef<HTMLInputElement>();
  const employee: IEmployee = (location.state as IEmployee) ?? {};

  const isNew = (location.pathname?.indexOf("/employees/new") ?? -1) >= 0;

  const [idValue, setIdValue] = React.useState<string | null>(employee?.id ?? "");
  const [nameValue, setNameValue] = React.useState<string | null>(employee?.name ?? "");
  const [emailValue, setEmailValue] = React.useState<string | null>(employee?.email ?? "");
  const [roleValue, setRoleValue] = React.useState<string>(employee?.role ?? "user");
  const [salaryValue, setSalaryValue] = React.useState<number | null>(employee?.salary ?? "");

  let birthDate = employee?.createdDate ? Date.parse(employee?.birthDate) : Date.now();
  const [birthDateValue, setbirthDateValue] = React.useState<Date | null>(new Date(birthDate));

  let createdDate = employee?.createdDate ? Date.parse(employee?.createdDate) : Date.now();
  let lastModifiedDate = employee?.lastModifiedDate ? Date.parse(employee?.lastModifiedDate) : Date.now();
  const [createdDateValue, setCreatedDateValue] = React.useState<Date>(new Date(createdDate));
  const [lastModifiedDateValue, setLastModifiedDate] = React.useState<Date>(new Date(lastModifiedDate));

  // Specify date and time format using "style" options (i.e. full, long, medium, short)
  const dateFormater = new Intl.DateTimeFormat(window.navigator.language, { dateStyle: 'short', timeStyle: 'medium' });

  const handleBirthDateChange = (newValue: Date | null) => {
    setbirthDateValue(newValue);
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRoleValue(event.target.value as string);
  };

  const saveEmployee = () => {
    let updatedEmployee: IUpdateEmployee = {
      id: idValue ?? employee.id,
      name: nameValue ?? employee.name,
      role: roleValue ?? employee.role,
      email: emailValue ?? employee.email,
      birthDate: birthDateValue,
      salary: salaryValue ?? employee.salary
    };

    EmployeeService.updateEmployee(updatedEmployee).then(resolve => {
      if (!resolve.error) {
        dispatch(updateEmployee(resolve.data ?? {} as IEmployee));
        console.log('updatedEmployees ok!');
      } else {
        console.log('updatedEmployees error: ' + resolve.error);
        //TO DO
        //add notificator with error
      }
    });
  }

  const saveNewEmployee = () => {
    let newEmployee: INewEmployee = {
      name: nameValue ?? employee.name,
      role: roleValue ?? employee.role,
      email: emailValue ?? employee.email,
      birthDate: birthDateValue,
      salary: salaryValue ?? employee.salary,
      password: pwdFieldRef.current?.value ?? ""
    };

    EmployeeService.addEmployee(newEmployee).then(resolve => {
      if (!resolve.error) {
        let responseEmployee = resolve.data ?? {} as IEmployee;
        dispatch(addEmployee(responseEmployee));
        navigate(`/employees/${responseEmployee.id}`, { replace: true, state: responseEmployee });
        console.log('newEmployees ok!');
      } else {
        console.log('newEmployees error: ' + resolve.error);
        //TO DO
        //add notificator with error
      }
    });
  }

  const save = async () => {
    if (isNew) {
      saveNewEmployee();
    } else {
      saveEmployee();
    }
  }

  const cancel = () => {
    navigate(-1);
  }

  React.useEffect(() => {
    console.log(`isNew=${isNew} employee=${employee} params.id=${params.id}`)
    if (!isNew && !(location.state as IEmployee) && params.id) {
      EmployeeService.getEmployee(params.id ?? "").then(resolve => {
        if (!resolve.error) {
          console.log('getEmployee ok!');
          let getedEmployee = (resolve?.data as IEmployee);
          if (getedEmployee) {
            setIdValue(getedEmployee.id ?? "");
            setNameValue(getedEmployee.name ?? "");
            setEmailValue(getedEmployee.email ?? "");
            setSalaryValue(getedEmployee.salary ?? 0);
            setbirthDateValue(new Date(getedEmployee.birthDate ?? Date.now()));
            setRoleValue(getedEmployee.role ?? "user");
            setCreatedDateValue(new Date(getedEmployee.createdDate ?? Date.now()));
            setLastModifiedDate(new Date(getedEmployee.lastModifiedDate ?? Date.now()));
          }
        } else {
          console.log('getEmployee error: ' + resolve.error);
          //TO DO
          //add notificator with error
        }
      });
      return () => { }
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          display: "block"
        }}
        noValidate
        autoComplete="off"
      >
        <div className='formBlock'>
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className='formBlockChild'>
                <TextField
                  id="outlined-password-input"
                  required
                  label="Name"
                  value={nameValue}
                  onChange={(event) => setNameValue(event.target.value)}
                  placeholder="Name"
                />
                <TextField
                  id="outlined-email-input"
                  required
                  label="Email"
                  value={emailValue}
                  onChange={(event) => setEmailValue(event.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className='formBlockChild'>
                <DesktopDatePicker
                  label="Birth date *"
                  inputFormat="MM/dd/yyyy"
                  value={birthDateValue}
                  clearable
                  onChange={handleBirthDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TextField
                  id="outlined-salary-input"
                  required
                  label="Salary"
                  value={salaryValue}
                  type="number"
                  onChange={(event) => setSalaryValue(parseInt(event.target.value))}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                  placeholder="Salary"
                />
              </div>
              <div className='formBlockChild' style={{ paddingTop: "8px" }}>
                <FormControl fullWidth>
                  <InputLabel id="role-select-label">Role *</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={roleValue}
                    label="Role"
                    onChange={handleRoleChange}
                  >
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"user"}>User</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {isNew ?
                (
                  <div className='formBlockChild'>
                    <TextField
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      inputRef={pwdFieldRef}
                    /* autoComplete="current-password" */
                    />
                    <TextField
                      id="outlined-confirme-password-input"
                      label="Confirme password"
                      type="password"
                      inputRef={confirmPwdFieldRef}
                    /* autoComplete="current-password" */
                    />
                  </div>
                )
                :
                (
                  <div className='formBlockChild'>
                    <TextField
                      id="outlined-createdDate-input"
                      label="Created date"
                      disabled
                      value={dateFormater.format(createdDateValue)}
                    />
                    <TextField
                      id="outlined-modifiedDate-input"
                      label="Last modified date"
                      disabled
                      value={dateFormater.format(lastModifiedDateValue)}
                    />

                  </div>
                )}
            </div>
            <div style={{ display: "inline-flex", width: "100%", justifyContent: "end" }}>
              <Button onClick={save} variant="outlined"
                size="large"
                style={{
                  margin: "10px"
                }}>
                Save
              </Button>
              <Button onClick={cancel} variant="outlined"
                size="large"
                style={{
                  margin: "10px"
                }}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </LocalizationProvider>
  )
}