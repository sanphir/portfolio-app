import "../../styles/common.css";
import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../redux/hooks';
import WorkTaskService from '../../services/WorkTaskService';
import { IWorkTask } from '../../interfaces/IWorkTask';
import { toast } from 'react-toastify';
import { setLoaderDisplayed, setLoaderNone } from '../../redux/loaderSlice';
import TaskItem from "./TaskItem";

const TasksControl = () => {
    const dispatch = useAppDispatch();
    const [workTasks, setWorkTasks] = useState<IWorkTask[]>([]);

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

    return (
        <div className='contentForm tasksContainer'>
            {
                workTasks.map((task, index) => {
                    return (
                        <TaskItem task={task} key={index} />
                    );
                })
            }
        </div >
    )
}

export default TasksControl