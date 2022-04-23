import React, { useEffect, useRef } from 'react'
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
import { IEmployee, INewEmployee, IUpdateEmployee } from '../../interfaces/IEmployee';
import { CropLandscapeOutlined } from '@mui/icons-material';

interface EmployeeFormControlProps {
    employee: IEmployee;
    isNew: boolean;
    onSave: (employee: IUpdateEmployee | INewEmployee) => void;
    onCancel: (e: any) => void;
}

export const EmployeeFormControl = (props: EmployeeFormControlProps) => {
    const { isNew, employee, onSave, onCancel } = props;

    //state values
    const [nameValue, setNameValue] = React.useState<string>(employee.name);
    const [emailValue, setEmailValue] = React.useState<string>(employee.email);
    const [salaryValue, setSalaryValue] = React.useState<number>(employee.salary);
    const [roleValue, setRoleValue] = React.useState<string>(employee.role);
    let birthDate = employee?.birthDate ? Date.parse(employee?.birthDate) : Date.now();
    const [birthDateValue, setBirthDateValue] = React.useState<Date | null>(new Date(birthDate));
    let createdDate = employee?.createdDate ? Date.parse(employee?.createdDate) : Date.now();
    let lastModifiedDate = employee?.lastModifiedDate ? Date.parse(employee?.lastModifiedDate) : Date.now();
    const [createdDateValue, setCreatedDateValue] = React.useState<Date>(new Date(createdDate));
    const [lastModifiedDateValue, setLastModifiedDate] = React.useState<Date>(new Date(lastModifiedDate));

    //ref
    const pwdFieldRef = React.useRef<HTMLInputElement>();
    const confirmPwdFieldRef = React.useRef<HTMLInputElement>();

    // Specify date and time format using "style" options (i.e. full, long, medium, short)
    const dateFormater = new Intl.DateTimeFormat(window.navigator.language, { dateStyle: 'short', timeStyle: 'medium' });

    const handleBirthDateChange = (newValue: Date | null) => {
        setBirthDateValue(newValue);
    };

    const handleRoleChange = (event: SelectChangeEvent) => {
        setRoleValue(event.target.value as string);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        if (isNew) {
            onSave({
                name: nameValue,
                email: emailValue,
                role: roleValue,
                birthDate: birthDateValue,
                salary: salaryValue,
                password: pwdFieldRef.current?.value
            } as INewEmployee);
        } else {
            onSave({
                id: employee.id,
                name: nameValue,
                email: emailValue,
                role: roleValue,
                birthDate: birthDateValue,
                salary: salaryValue
            } as IUpdateEmployee);
        }
    };

    const validate = (): boolean => {
        return false;
    }

    useEffect(() => {
        setNameValue(employee?.name ?? "");
        setEmailValue(employee?.email ?? "");
        setSalaryValue(employee?.salary ?? 0);
        setRoleValue(employee?.role ?? "");
        setBirthDateValue(new Date(employee?.birthDate ? Date.parse(employee?.birthDate) : Date.now()));
        setCreatedDateValue(new Date(employee?.createdDate ? Date.parse(employee?.createdDate) : Date.now()));
        setLastModifiedDate(new Date(employee?.lastModifiedDate ? Date.parse(employee?.lastModifiedDate) : Date.now()));
        return () => { }
    }, [employee]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    display: "block"
                }}
                noValidate
                onSubmit={onSubmit}
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
                                    value={emailValue}
                                    onChange={(event) => setEmailValue(event.target.value)}
                                    label="Email"
                                />
                            </div>
                            <div className='formBlockChild'>
                                <DesktopDatePicker
                                    label="Birth date *"
                                    inputFormat="MM/dd/yyyy"
                                    clearable
                                    value={birthDateValue}
                                    onChange={handleBirthDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                <TextField
                                    id="outlined-salary-input"
                                    required
                                    label="Salary"
                                    type="number"
                                    value={salaryValue}
                                    onChange={(event) => setSalaryValue(Number(event.target.value))}
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
                                        />
                                        <TextField
                                            id="outlined-confirme-password-input"
                                            label="Confirme password"
                                            type="password"
                                            inputRef={confirmPwdFieldRef}
                                        //error={Boolean(errors?.confirmpassword)}
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
                            <Button variant="outlined"
                                type='submit'
                                size="large"
                                style={{
                                    margin: "10px"
                                }}>
                                Save
                            </Button>
                            <Button variant="outlined"
                                onClick={onCancel}
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
