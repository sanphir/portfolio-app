import "../../styles/common.css";
import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../redux/hooks';
import WorkTaskService from '../../services/WorkTaskService';
import { IWorkTask } from '../../interfaces/IWorkTask';
import { toast } from 'react-toastify';
import { setLoaderDisplayed, setLoaderNone } from '../../redux/loaderSlice';

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
        <div className='contentForm tasksContainer gridTask'>
            {workTasks.map((task, index) => {
                return (
                    <div>
                        <p>title: {task.title}</p>
                        <p>content: {task.content}</p>
                        <p>status: {task.status}</p>
                        <p>createdDate: {task.createdDate}</p>
                        <p>lastModifiedDate: {task.lastModifiedDate}</p>
                        <p>completedAt: {task.completedAt}</p>
                        <p>assignedTo: {task.assignedTo}</p>
                        <p>owner: {task.owner}</p>
                    </div>
                );
            })}
        </div>
    )
}

export default TasksControl