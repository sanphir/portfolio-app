import "../../styles/common.css";
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
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
import { getTitleColor as getTaskStatusColor } from "./TaskCommon";

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
    const [taskState, setTaskState] = useState<WorkTaskStatus>(task?.status);

    const dispatch = useAppDispatch();
    const employees = useAppSelector(getEmployeesSelectionSource);

    const autocompletePopper = function (props: any) {
        return (<Popper {...props}
            disablePortal={false}
            modifiers={[
                {
                    name: 'preventOverflow',
                    enabled: false,
                    options: {
                        altAxis: true,
                        altBoundary: true,
                        tether: false,
                        rootBoundary: 'document',
                        padding: 8,
                    },
                }]}
            placement='bottom-start' />)
    }

    const [selectedTaskStateColor, setSelectedTaskStateColor] = useState("black");
    const handleStatusChange = (event: SelectChangeEvent<typeof WorkTaskStatus>) => {
        console.log(`selected status:=${event.target.value}`);
        setSelectedTaskStateColor(getTaskStatusColor(event.target.value as any));
        setTaskState(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

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
        reset({
            isNew: isNew,
            titleField: task?.title ?? "",
        });
        setSelectedTaskStateColor(getTaskStatusColor(task.status));
        //console.log(`task=${JSON.stringify(task)}`);
        //console.log(`isNew=${isNew} and currentTask=${JSON.stringify(currentTask)}`);
    }, [task]);

    useEffect(() => {
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
            <DialogTitle id="task-dialog-title" sx={{ color: selectedTaskStateColor }} >
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
                            PopperComponent={autocompletePopper}
                            options={employees}
                            defaultValue={(!isNew && isEmployeeSourceLoaded && task.owner) ? { label: task.ownerName, id: task.owner } : null}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="Owner" />}
                        />
                        <Autocomplete
                            disablePortal
                            id="assignedTo-combo-box-demo"
                            PopperComponent={autocompletePopper}
                            options={employees}
                            defaultValue={(!isNew && isEmployeeSourceLoaded && task.assignedTo) ? { label: task.assignedToName, id: task.assignedTo } : null}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="Assigned to" />}
                        />
                        <div style={{
                            margin: "8px",
                            width: "50ch"
                        }}>
                            <FormControl fullWidth>
                                <InputLabel id="status-select-label">Status</InputLabel>
                                <Select
                                    sx={{ color: selectedTaskStateColor }}
                                    labelId="status-select-label"
                                    id="status-select"
                                    defaultValue={task.status as any}
                                    onChange={handleStatusChange}
                                    label="Status"
                                >
                                    <MenuItem value={WorkTaskStatus.Canceled} sx={{ color: getTaskStatusColor(WorkTaskStatus.Canceled) }}>{WorkTaskStatus[WorkTaskStatus.Canceled]}</MenuItem>
                                    <MenuItem value={WorkTaskStatus.Registered} sx={{ color: getTaskStatusColor(WorkTaskStatus.Registered) }}>{WorkTaskStatus[WorkTaskStatus.Registered]}</MenuItem>
                                    <MenuItem value={WorkTaskStatus.Started} sx={{ color: getTaskStatusColor(WorkTaskStatus.Started) }}>{WorkTaskStatus[WorkTaskStatus.Started]}</MenuItem>
                                    <MenuItem value={WorkTaskStatus.Completed} sx={{ color: getTaskStatusColor(WorkTaskStatus.Completed) }}>{WorkTaskStatus[WorkTaskStatus.Completed]}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
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