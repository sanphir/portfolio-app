import React from 'react'
import { IWorkTask, WorkTaskStatus } from '../../interfaces/IWorkTask';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../../styles/common.css'
import '../../styles/taskitems.css'
import { getTitleColor } from './TaskCommon';

export interface TaskDialogCallBack {
  (task: IWorkTask): void
}
interface TaskItemProps {
  task: IWorkTask;
  onDelete: TaskDialogCallBack;
  onEdit: TaskDialogCallBack;
}

const TaskItem = (props: TaskItemProps) => {
  const { task, onDelete, onEdit } = props;

  const language = window.navigator.language;

  const titleColor: any = getTitleColor(task.status);

  return (
    <div className='taskItemControl' style={{
      opacity: (task.status === WorkTaskStatus.Canceled ? "0.7" : "1")
    }}>
      <div className='taskItemHeader'>
        <div className='taskItemTitle'>
          <p>{task.title}</p>
        </div>
        <div className='taskItemToolBar'>
          <Tooltip title="Edit">
            <IconButton onClick={(e) => { onEdit(task) }}>
              <EditIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={(e) => { onDelete(task) }}>
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className='taskItemContent'>
        <div>
          <br />
          <p>{task.content}</p>
          <br />
        </div>
      </div>
      <div className='taskItemInfo'>
        <div>
          <p><b>Due date:</b> {new Date(task.dueDate).toLocaleDateString(language)}</p>
          <p><b>Started:</b> {new Date(task.startedAt).toLocaleDateString(language)}</p>
          <p><b>Completed:</b> {new Date(task.completedAt).toLocaleDateString(language)}</p>
          <p><b>Created:</b> {new Date(task.createdDate).toLocaleString(language)}</p>
          <p><b>Last modified:</b> {new Date(task.lastModifiedDate).toLocaleString(language)}</p>
          <p><b>Assigned to:</b> {task.assignedToName}</p>
          <p><b>Owner:</b> {task.ownerName}</p>
        </div>
      </div>
      <div className='taskItemFooter' style={{
        backgroundColor: titleColor
      }}>
        <p>{WorkTaskStatus[task.status]}</p>
      </div>

    </div >

  )
}

export default TaskItem