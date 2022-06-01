import { useEffect, useState } from 'react'
import { IWorkTask, WorkTaskStatus } from '../../interfaces/IWorkTask';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogResult, Nullable } from "../../interfaces/Common";
import Button from '@mui/material/Button';

export interface TaskDialogCallBack {
    (task: IWorkTask, dialogResult: DialogResult): void
}

interface TaskItemDialogProps {
    open: boolean;
    task: Nullable<IWorkTask>;
    onClose: TaskDialogCallBack;
}

export const TaskItemDialog = (props: TaskItemDialogProps) => {
    const { open, task, onClose } = props;
    const isNew = task == null;

    const [currentTask, setCurrentTask] = useState<IWorkTask>(task ?? {
        id: "",
        title: "",
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
        lastModifiedDate: null,
    } as IWorkTask);

    useEffect(() => {
        console.log(`isNew=${isNew} and currentTask=${JSON.stringify(currentTask)}`);
    }, []);
    return (
        <Dialog
            open={open}
            onClose={(e) => onClose(currentTask, DialogResult.CANCEL)}
            aria-labelledby="task-dialog-title"
            aria-describedby="task-dialog-description" >
            <DialogTitle id="task-dialog-title" sx={{ color: 'darkgreen' }} >
                {isNew ? "New task" : (currentTask?.title ?? "Untitle")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => onClose(currentTask, DialogResult.CANCEL)}><b>Cancel</b></Button>
                <Button onClick={(e) => onClose(currentTask, DialogResult.OK)} autoFocus>Save</Button>
            </DialogActions>
        </Dialog >
    )
}