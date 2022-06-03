import "../../styles/common.css";
import { useState, useEffect, useCallback, useTransition } from 'react'
import { useAppDispatch } from '../../redux/hooks';
import WorkTaskService from '../../services/WorkTaskService';
import { INewWorkTask, IUpdateWorkTask, IWorkTask } from '../../interfaces/IWorkTask';
import { toast } from 'react-toastify';
import { setLoaderDisplayed, setLoaderNone } from '../../redux/loaderSlice';
import TaskItem from "./TaskItem";

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import { DialogResult, Nullable } from "../../interfaces/Common";
import { TaskItemDialog } from "./TaskItemDialog";
import { DeleteConfirmeDialog } from "../CommonDialogs/DeleteConfirmeDialog";

const TasksControl = () => {
    const dispatch = useAppDispatch();
    const [isPanding, startTransition] = useTransition();
    const [workTasks, setWorkTasks] = useState<IWorkTask[]>([]);

    const [openDeleteTaskDialog, setOpenDeleteTaskDialog] = useState(false);
    const [openTaskDialog, setOpenTaskDialog] = useState(false);
    const [targetTask, setTargetTask] = useState<Nullable<IWorkTask>>(null);

    useEffect(() => {
        let empployeeId = localStorage.getItem("empployeeId");
        if (empployeeId) {
            try {
                dispatch(setLoaderDisplayed());
                WorkTaskService.getAllFor(empployeeId).then(resolve => {
                    if (!resolve.error) {
                        setWorkTasks(resolve?.data as IWorkTask[]);
                    } else {
                        toast.error(`Error geting employee: ${resolve.error}`);
                    }
                })
            } finally {
                dispatch(setLoaderNone());
            }
        }
    }, [])

    const handleNewTask = useCallback((e: any) => {
        console.log(`New task click ${JSON.stringify(targetTask)}`);
        if (targetTask) {
            console.log("Clear task before new");
            setTargetTask(null);
        }
        setOpenTaskDialog(true);
    }, []);

    const handleTaskDialogCancel = useCallback(() => {
        console.log("Edit cancel");
        setOpenTaskDialog(false);
        setTargetTask(null);
        //TO DO
        //process and refresh
    }, []);

    const handleTaskDialogSave = useCallback((isNew: boolean, task: INewWorkTask | IUpdateWorkTask) => {
        console.log("Edit save");
        setOpenTaskDialog(false);
        //startTransition(() => { setTargetTask(null) });
        setTargetTask(null);
        //TO DO
        //process and refresh
    }, []);

    const handleDeleteTaskDialogClose = useCallback((event: unknown, dialogResult: DialogResult) => {
        console.log("Delete close");
        setOpenDeleteTaskDialog(false);
        //startTransition(() => { setTargetTask(null) });
        setTargetTask(null);
        //TO DO
        //check result and delete task
    }, []);

    const handleTaskEdit = useCallback((task: IWorkTask) => {
        setTargetTask(task);
        setOpenTaskDialog(true);
    }, []);

    const handleTaskDelet = useCallback((task: IWorkTask) => {
        setTargetTask(task);
        setOpenDeleteTaskDialog(true);
    }, []);

    return (
        <div className='contentForm tasksContainer'>
            <TaskItemDialog open={openTaskDialog} task={targetTask} onSave={handleTaskDialogSave} onCancel={handleTaskDialogCancel} />
            <DeleteConfirmeDialog open={openDeleteTaskDialog} onClose={handleDeleteTaskDialogClose} message={`Are you sure you want to delete "${targetTask?.title ?? ""}" task?`} />
            <div className="taskControlToolbar">
                <Tooltip title="Add new task">
                    <IconButton onClick={handleNewTask}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <div style={{ display: 'block' }}>
                {
                    workTasks.map((task, index) => {
                        return (
                            <TaskItem task={task} key={index} onEdit={handleTaskEdit} onDelete={handleTaskDelet} />
                        );
                    })
                }
            </div>
        </div >
    )
}

export default TasksControl