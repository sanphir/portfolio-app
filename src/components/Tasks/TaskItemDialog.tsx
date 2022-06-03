import { useEffect, useState } from 'react'
import { INewWorkTask, IUpdateWorkTask, IWorkTask, WorkTaskStatus } from '../../interfaces/IWorkTask';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogResult, Nullable } from "../../interfaces/Common";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SimpleCallBack } from '../../interfaces/CallBackDefinitions';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
    getEmployeesAsync,
    getEmployeesSelectionSource,
} from '../../redux/employeesSlice';
import { setLoaderDisplayed, setLoaderNone } from '../../redux/loaderSlice';

interface IFormInputs {
    isNew: boolean,
    titleField: string,
    dueDateField: Date;
}

const schema = yup.object({
    isNew: yup.boolean(),
    nameField: yup.string().required("Title is required"),
    dueDate: yup.date().required("Due date is required")
}).required();

export interface TaskSaveCallBack {
    (isNew: boolean, task: IUpdateWorkTask | INewWorkTask): void
}

interface TaskItemDialogProps {
    open: boolean;
    task: IWorkTask;
    onSave: TaskSaveCallBack;
    onCancel: SimpleCallBack;
}

export const TaskItemDialog = (props: TaskItemDialogProps) => {
    const { open, task, onSave, onCancel } = props;
    const isNew = (task?.id ?? "") === "";
    const [isEmployeeSourceLoaded, setIsEmployeeSourceLoaded] = useState(false);


    const dispatch = useAppDispatch();
    const employees = useAppSelector(getEmployeesSelectionSource);

    const { handleSubmit, control, reset,
        formState: { errors, isValid } } = useForm<IFormInputs>({
            resolver: yupResolver(schema),
            mode: 'onBlur'
        });
    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log(`On submit: ${data} isNew=${isNew}`);
        if (isNew) {
            onSave(isNew, {
                title: data.titleField,
                content: '',
                dueDate: data.dueDateField,
                startedAt: null,
                completedAt: null,
                status: WorkTaskStatus.Registered,
                owner: '',
                assignedTo: ''
            } as INewWorkTask);
        } else {
            onSave(isNew, {
                id: task.id,
                title: data.titleField,
                content: '',
                dueDate: data.dueDateField,
                startedAt: null,
                completedAt: null,
                status: WorkTaskStatus.Registered,
                owner: '',
                assignedTo: ''
            } as IUpdateWorkTask);
        }
    }
    useEffect(() => {
        //if (!isNew) {
        reset({
            isNew: isNew,
            titleField: task?.title ?? "",
        });
        //}
        console.log(`task=${JSON.stringify(task)}`);
        //console.log(`isNew=${isNew} and currentTask=${JSON.stringify(currentTask)}`);
    }, [task]);

    useEffect(() => {
        //console.log("EmployeesTable useEffect");
        dispatch(setLoaderDisplayed());
        try {
            dispatch(getEmployeesAsync());
        } finally {
            setIsEmployeeSourceLoaded(true);
            dispatch(setLoaderNone());
        }
        return () => { }
    }, []);

    return (
        <Dialog
            open={open}
            aria-labelledby="task-dialog-title"
            aria-describedby="task-dialog-description" >
            <DialogTitle id="task-dialog-title" sx={{ color: 'darkgreen' }} >
                {isNew ? "New task" : "Edit task"}
            </DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '50ch' },
                            display: "flex",
                            flexDirection: "column",
                        }}
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        autoComplete="off"
                    >
                        <Controller
                            name="titleField"
                            control={control}
                            defaultValue={task.title}
                            render={({ field }) =>
                                <TextField
                                    required
                                    label="Title"
                                    helperText={errors?.titleField?.message}
                                    error={Boolean(errors?.titleField)}
                                    placeholder="Title"
                                    {...field} />}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Content"
                            multiline
                            rows={4}
                            defaultValue={task?.content ?? ""}
                        />
                        <Autocomplete
                            disablePortal
                            id="owner-combo-box-demo"
                            options={employees}
                            /* isOptionEqualToValue={(option, value) => option.id === task.owner} */
                            defaultValue={(!isNew && isEmployeeSourceLoaded && task.owner) ? { label: task.ownerName, id: task.owner } : null}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Owner" />}
                        />
                        <Autocomplete
                            disablePortal
                            id="assignedTo-combo-box-demo"
                            options={employees}
                            defaultValue={(!isNew && isEmployeeSourceLoaded && task.assignedTo) ? { label: task.assignedToName, id: task.assignedTo } : null}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Assigned to" />}
                        />
                        <div>
                            <Button onClick={(e) => onCancel()}><b>Cancel</b></Button>
                            <Button type='submit' autoFocus>Save</Button>
                        </div>
                    </Box>
                </LocalizationProvider>
            </DialogContent>

        </Dialog >
    )
}