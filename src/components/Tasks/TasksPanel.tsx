import "../../styles/common.css";
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useAppDispatch } from '../../redux/hooks';
import WorkTaskService from '../../services/WorkTaskService';
import { INewWorkTask, IUpdateWorkTask, IWorkTask, WorkTaskStatus } from '../../Common/IWorkTask';
import { toast } from 'react-toastify';
import { setLoaderDisplayed, setLoaderNone } from '../../redux/loaderSlice';
import AuthService from "../../services/AuthService";
import TaskItem from "./TaskItem";

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import { DialogResult } from "../../Common/Common";
import { TaskItemDialog } from "./TaskItemDialog";
import { DeleteConfirmeDialog } from "../CommonDialogs/DeleteConfirmeDialog";
import TaskStatusFilter from "./TaskStatusFilter";

const getInitialSelectedStatusFilter = () => {
    let result: boolean[] = [];
    result[WorkTaskStatus.Canceled] = false;
    result[WorkTaskStatus.Registered] = true;
    result[WorkTaskStatus.Started] = true;
    result[WorkTaskStatus.Completed] = true;
    return result;
}

const TasksPanel = () => {
    const dispatch = useAppDispatch();
    const [workTasks, setWorkTasks] = useState<IWorkTask[]>([]);

    const [openDeleteTaskDialog, setOpenDeleteTaskDialog] = useState(false);

    const tokenInfo = AuthService.getTokenInfo();
    const [openTaskDialog, setOpenTaskDialog] = useState(false);
    const newTask = {
        id: "",
        title: "",
        content: "",
        dueDate: null,
        startedAt: null,
        completedAt: null,
        status: WorkTaskStatus.Registered,
        owner: localStorage.getItem("empployeeId"),
        assignedTo: "",
        createdDate: new Date(),
        ownerName: tokenInfo?.name,
        assignedToName: "",
        lastModifiedDate: new Date(),
    } as IWorkTask;
    const [targetTask, setTargetTask] = useState<IWorkTask>(newTask);

    const [selectedStatusesFilter, setSelectedStatusesFilter] = useState(getInitialSelectedStatusFilter());

    const filteredWorkTasks = useMemo(() => {
        return workTasks.filter((task) => {
            return selectedStatusesFilter[task.status];
        })
    }, [workTasks, selectedStatusesFilter]);

    const selectedStatusesChaged = (selectedStatuses: boolean[]) => {
        setSelectedStatusesFilter(selectedStatuses);
    };

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
        setTargetTask(newTask);
        setOpenTaskDialog(true);
    }, []);

    const handleTaskDialogCancel = useCallback(() => {
        setOpenTaskDialog(false);
    }, []);

    const handleTaskDialogSave = (isNew: boolean, task: INewWorkTask | IUpdateWorkTask) => {
        setOpenTaskDialog(false);
        dispatch(setLoaderDisplayed());
        if (isNew) {
            WorkTaskService.add(task as INewWorkTask).then(resolve => {
                if (!resolve.error) {
                    let responseTask = resolve.data ?? {} as IWorkTask;
                    setWorkTasks([...workTasks, responseTask]);
                    toast.success('Task saved!');
                } else {
                    toast.error(`Error adding task: ${resolve.error}`);
                }
            }).catch(err => {
                toast.error(`Error adding task: ${err}`);
            }).finally(() => {
                dispatch(setLoaderNone());
            });
        } else {
            WorkTaskService.update(task as IUpdateWorkTask).then(resolve => {
                if (!resolve.error) {
                    let responseTask = resolve.data ?? {} as IWorkTask;
                    let index = workTasks.findIndex(x => x.id === responseTask.id);
                    if (index >= 0) {
                        workTasks[index] = responseTask;
                    }
                    setWorkTasks([...workTasks]);
                } else {
                    toast.error(`Error updating task after: ${resolve.error}`);
                }
            }).catch(err => {
                toast.error(`Error updating task: ${err}`);
            }).finally(() => {
                dispatch(setLoaderNone());
            });
        }
    };

    const handleDeleteTaskDialogClose = (event: unknown, dialogResult: DialogResult) => {
        setOpenDeleteTaskDialog(false);
        if (dialogResult === DialogResult.YES) {
            dispatch(setLoaderDisplayed());
            WorkTaskService.remove([targetTask.id]).then(resolve => {
                if (!resolve.error) {
                    let newTasks = workTasks.filter(task => task.id !== targetTask.id);
                    setWorkTasks(newTasks);
                    toast.success('Task deleted!');
                } else {
                    toast.error(`Error deleting task: ${resolve.error}`);
                }
            }).catch(err => {
                toast.error(`Error deleting task: ${err}`);
            }).finally(() => {
                dispatch(setLoaderNone());
            });
        }
    };

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
                <div>

                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <TaskStatusFilter initialSelectedStatuses={selectedStatusesFilter} selectedStatusesChanged={selectedStatusesChaged} />
                    <Tooltip title="Add new task">
                        <IconButton onClick={handleNewTask}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div style={{ display: 'block' }}>
                {
                    filteredWorkTasks.map((task, index) => {
                        return (
                            <TaskItem task={task} key={index} onEdit={handleTaskEdit} onDelete={handleTaskDelet} />
                        );
                    })
                }
            </div>
        </div >
    )
}

export default TasksPanel