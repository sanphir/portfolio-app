import * as React from 'react';
import { useParams, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { IEmployee } from '../interfaces/IEmployee';

export const EmployeeForm = () => {
  const params = useParams();
  const location = useLocation();
  let empployee: IEmployee = (location.state as IEmployee) ?? {};

  let isNew = (location.pathname?.indexOf("/employees/new") ?? -1) >= 0;

  const [nameValue, setNameValue] = React.useState<string | null>(empployee.name);
  const [emailValue, setEmailValue] = React.useState<string | null>(empployee.email);
  const [salaryValue, setSalaryValue] = React.useState<number | null>(empployee.salary);
  const [birthDateValue, setbirthDateValue] = React.useState<Date | null>(
    new Date(empployee.birthDate),
  );


  const handleBirthDateChange = (newValue: Date | null) => {
    setbirthDateValue(newValue);
  };

  const dateHandleEmptyChange = (newValue: Date | null) => {
  };

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
            <DesktopDatePicker
              label="Birth date"
              inputFormat="MM/dd/yyyy"
              value={birthDateValue}
              clearable
              onChange={handleBirthDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          {isNew ?
            (
              <div className='formBlockChild'>
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
                <TextField
                  id="outlined-confirme-password-input"
                  label="Confirme password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
            )
            :
            (
              <div className='formBlockChild'>
                <DesktopDatePicker
                  label="Created date"
                  inputFormat="MM/dd/yyyy"
                  value={empployee.createdDate}
                  disabled
                  onChange={dateHandleEmptyChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="Last modified date"
                  inputFormat="MM/dd/yyyy"
                  value={empployee.lastModifiedDate}
                  disabled
                  onChange={dateHandleEmptyChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            )}
        </div>
      </Box>
    </LocalizationProvider>
  )
}