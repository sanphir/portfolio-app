import "../../styles/common.css";
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../redux/hooks';
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
import { IEmployee, INewEmployee, IUpdateEmployee, Role } from '../../interfaces/IEmployee';

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface EmployeeFormControlProps {
    employee: IEmployee;
    isNew: boolean;
    onSave: (employee: IUpdateEmployee | INewEmployee) => void;
}

interface IFormInputs {
    isNew: boolean,
    nameField: string,
    emailField: string,
    salaryField: number,
    birthDateField: Date;
    passwordField: string,
    confirmPasswordField: string
}

const schema = yup.object({
    isNew: yup.boolean(),
    nameField: yup.string().required("Name is required"),
    emailField: yup.string().required("Email is rreqired").email("Invalid email"),
    salaryField: yup.number().positive("Salary must be greater than zero").integer().required("Salary is required"),
    birthDateField: yup.date().required("Date of Birth is required").test("birthDateField", "must be over 18 years of age",
        (date) => new Date().getFullYear() - (date as Date)?.getFullYear() >= 18),
    passwordField: yup.string().when('isNew', {
        is: true,
        then: yup.string().required("Password is required"),
        otherwise: yup.string().notRequired()
    }),
    confirmPasswordField: yup.string().when('isNew', {
        is: true,
        then: yup.string().required().oneOf([yup.ref('passwordField')], 'Passwords does not match'),
        otherwise: yup.string().notRequired()
    }),

}).required();

export const EmployeeFormControl = (props: EmployeeFormControlProps) => {
    const { isNew, employee, onSave } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [roleValue, setRoleValue] = React.useState<Role>(employee.role);

    const language = window.navigator.language;
    const [createdDateValue, setCreatedDateValue] = React.useState<string>(employee?.createdDate ? new Date(employee?.createdDate).toLocaleString(language) : "");
    const [lastModifiedDateValue, setLastModifiedDate] = React.useState<string>(employee?.lastModifiedDate ? new Date(employee?.lastModifiedDate).toLocaleString(language) : "")

    const now = new Date();
    const maxBirthDate = new Date(now.getFullYear() - 18, now.getMonth(), now.getDay());

    const handleRoleChange = (event: SelectChangeEvent) => {
        setRoleValue(event.target.value as any);
    };

    const { handleSubmit, control, reset, formState: { errors, isValid } } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });
    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        //console.log(data);        
        if (isNew) {
            onSave({
                name: data.nameField,
                email: data.emailField,
                role: roleValue,
                birthDate: data.birthDateField,
                salary: data.salaryField,
                password: data.passwordField
            } as INewEmployee);
        } else {
            onSave({
                id: employee.id,
                name: data.nameField,
                email: data.emailField,
                role: roleValue,
                birthDate: data.birthDateField,
                salary: data.salaryField,
            } as IUpdateEmployee);
        }
    }

    const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        reset({
            isNew: isNew,
            nameField: employee?.name ?? "",
            emailField: employee?.email ?? "",
            salaryField: employee?.salary ?? 0,
            birthDateField: new Date(employee?.birthDate)
        });
    }

    useEffect(() => {
        reset({
            isNew: isNew,
            nameField: employee?.name ?? "",
            emailField: employee?.email ?? "",
            salaryField: employee?.salary ?? 0,
            birthDateField: new Date(employee?.birthDate)
        });
        setRoleValue(employee?.role ?? Role.User);
        setCreatedDateValue(employee?.createdDate ? new Date(employee?.createdDate).toLocaleString(language) : "");
        setLastModifiedDate(employee?.lastModifiedDate ? new Date(employee?.lastModifiedDate).toLocaleString(language) : "");
        return () => { }
    }, [employee, reset]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    display: "block",
                    marginTop: "30px",
                    position: "relative",
                    top: "20%"
                }}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
            >
                <div className='formBlock contentForm'>
                    <div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className='formBlockChild'>
                                <Controller
                                    name="nameField"
                                    control={control}
                                    defaultValue={employee.name}
                                    render={({ field }) =>
                                        <TextField
                                            required
                                            disabled={!isNew}
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
                                <Controller
                                    control={control}
                                    name="birthDateField"
                                    defaultValue={new Date(employee.birthDate)}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <DesktopDatePicker
                                            label="Birth date *"
                                            inputFormat="dd/MM/yyyy"
                                            maxDate={maxBirthDate}
                                            onChange={onChange}
                                            value={value}
                                            renderInput={(params) => <TextField
                                                onBlur={onBlur}
                                                error={Boolean(errors?.birthDateField)}
                                                helperText={errors?.birthDateField?.message}
                                                {...params} />}
                                        />
                                    )}
                                />

                                <Controller
                                    name="salaryField"
                                    control={control}
                                    defaultValue={employee.salary}
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
                                        value={roleValue as any}
                                        label="Role"
                                        onChange={handleRoleChange}
                                    >
                                        <MenuItem value={Role.Admin}>{Role[Role.Admin]}</MenuItem>
                                        <MenuItem value={Role.User}>{Role[Role.User]}</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            {isNew ?
                                (
                                    <div className='formBlockChild'>
                                        <Controller
                                            name="passwordField"
                                            control={control}
                                            render={({ field }) =>
                                                <TextField
                                                    required
                                                    type="password"
                                                    label="Password"
                                                    helperText={errors?.passwordField?.message}
                                                    error={Boolean(errors?.passwordField)}
                                                    placeholder="Password"
                                                    {...field} />}
                                        />
                                        <Controller
                                            name="confirmPasswordField"
                                            control={control}
                                            render={({ field }) =>
                                                <TextField
                                                    required
                                                    type="password"
                                                    label="Confirm password"
                                                    helperText={errors?.confirmPasswordField?.message}
                                                    error={Boolean(errors?.confirmPasswordField)}
                                                    placeholder="Confirm password"
                                                    {...field} />}
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
                                            value={createdDateValue}
                                        />
                                        <TextField
                                            id="outlined-modifiedDate-input"
                                            label="Last modified date"
                                            disabled
                                            value={lastModifiedDateValue}
                                        />

                                    </div>
                                )}
                        </div>
                        <div style={{ display: "inline-flex", width: "100%", justifyContent: "end" }}>
                            <Button variant="outlined"
                                type='submit'
                                size="large"
                                disabled={!isValid}
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
                            <Button variant="outlined"
                                onClick={(e) => navigate(-1)}
                                size="large"
                                style={{
                                    margin: "10px"
                                }}>
                                Back
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
        </LocalizationProvider>
    )
}
