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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { current } from '@reduxjs/toolkit';
import { SimpleCallBack } from '../../interfaces/CallBackDefinitions';

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
    task: Nullable<IWorkTask>;
    onSave: TaskSaveCallBack;
    onCancel: SimpleCallBack;
}

export const TaskItemDialog = (props: TaskItemDialogProps) => {
    const { open, task, onSave, onCancel } = props;
    const isNew = task == null;

    const [currentTask, setCurrentTask] = useState<IWorkTask>({
        id: "",
        title: "just test",
        content: "",
        dueDate: null,
        startedAt: null,
        completedAt: null,
        status: WorkTaskStatus.Registered,
        owner: "",
        assignedTo: "",
        createdDate: new Date(),
        ownerName: "",
        assignedToName: "",
        lastModifiedDate: new Date(),
    } as IWorkTask);

    const { handleSubmit, control, reset, formState: { errors, isValid } } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });
    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        //console.log(data);
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
        if (!isNew) {
            setCurrentTask(task);
            reset({
                isNew: isNew,
                titleField: task?.title ?? "",
            });
        }
        console.log(`task=${JSON.stringify(task)}`);
        console.log(`isNew=${isNew} and currentTask=${JSON.stringify(currentTask)}`);
    }, [task]);

    return (
        <Dialog
            open={open}
            aria-labelledby="task-dialog-title"
            aria-describedby="task-dialog-description" >
            <DialogTitle id="task-dialog-title" sx={{ color: 'darkgreen' }} >
                {isNew ? "New task" : (currentTask?.title ?? "Untitle")}
            </DialogTitle>
            <DialogContent>
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
                        <Controller
                            name="titleField"
                            control={control}
                            defaultValue={currentTask.title}
                            render={({ field }) =>
                                <TextField
                                    required
                                    disabled={!isNew}
                                    label="Title"
                                    helperText={errors?.titleField?.message}
                                    error={Boolean(errors?.titleField)}
                                    placeholder="Title"
                                    {...field} />}
                        />
                    </Box>
                </LocalizationProvider>
                {/*                 <DialogContentText id="alert-dialog-description">

                </DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => onCancel()}><b>Cancel</b></Button>
                <Button type='submit' autoFocus>Save</Button>
            </DialogActions>
        </Dialog >
    )
}