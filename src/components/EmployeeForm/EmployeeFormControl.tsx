import React, { useEffect } from 'react'
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

import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface EmployeeFormControlProps {
    employee: IEmployee;
    isNew: boolean;
    onSave: (employee: IUpdateEmployee | INewEmployee) => void;
    onCancel: (e: any) => void;
}

interface IFormInputs {
    nameField: string,
    emailField: string,
    salaryField: number
}

export const EmployeeFormControl = (props: EmployeeFormControlProps) => {
    const { isNew, employee, onSave, onCancel } = props;

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

    const { handleSubmit, control, reset, formState: { errors } } = useForm<IFormInputs>();
    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log(data);
        if (isNew) {
            onSave({
                name: data.nameField,
                email: data.emailField,
                role: roleValue,
                birthDate: birthDateValue,
                salary: data.salaryField,
                password: pwdFieldRef.current?.value
            } as INewEmployee);
        } else {
            onSave({
                id: employee.id,
                name: data.nameField,
                email: data.emailField,
                role: roleValue,
                birthDate: birthDateValue,
                salary: data.salaryField,
            } as IUpdateEmployee);
        }
    }

    useEffect(() => {
        reset({
            nameField: employee?.name ?? "",
            emailField: employee?.email ?? "",
            salaryField: employee?.salary ?? 0
        });
        setRoleValue(employee?.role ?? "");
        setBirthDateValue(new Date(employee?.birthDate ? Date.parse(employee?.birthDate) : Date.now()));
        setCreatedDateValue(new Date(employee?.createdDate ? Date.parse(employee?.createdDate) : Date.now()));
        setLastModifiedDate(new Date(employee?.lastModifiedDate ? Date.parse(employee?.lastModifiedDate) : Date.now()));
        return () => { }
    }, [employee, reset]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    display: "block"
                }}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
            >
                <div className='formBlock'>
                    <div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className='formBlockChild'>
                                <Controller
                                    name="nameField"
                                    control={control}
                                    defaultValue={employee.name}
                                    rules={{ required: "Name is required" }}
                                    render={({ field }) =>
                                        <TextField
                                            required
                                            label="Name"
                                            helperText={errors?.nameField?.message}
                                            error={Boolean(errors?.nameField)}
                                            placeholder="Name"
                                            {...field} />}
                                />
                                <Controller
                                    name="emailField"
                                    control={control}
                                    defaultValue={employee.email}
                                    rules={{
                                        required: "Email is required",
                                        pattern: { value: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i), message: "Invalid email" }
                                    }}
                                    render={({ field }) =>
                                        <TextField
                                            required
                                            label="Email"
                                            helperText={errors.emailField?.message}
                                            error={Boolean(errors?.emailField)}
                                            placeholder="Name"
                                            {...field} />}
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
                                <Controller
                                    name="salaryField"
                                    control={control}
                                    defaultValue={employee.salary}
                                    rules={{ required: "Salary is required", min: { value: 1, message: "Salary must be greater than zero" } }}
                                    render={({ field }) =>
                                        <TextField
                                            required
                                            label="Salary"
                                            type="number"
                                            helperText={errors?.salaryField?.message}
                                            error={Boolean(errors?.salaryField)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>
                                            }}
                                            placeholder="Salary"
                                            {...field} />}
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
                                        //helperText={errors?.confirmpassword?.message}
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
