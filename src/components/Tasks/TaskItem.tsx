import React from 'react'
import { IWorkTask, WorkTaskStatus } from '../../Common/IWorkTask';
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

  //  console.log(`TaskItem render: ${task.title}`);

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
        <div className='taskItemContentTextContainer'>
          <p>{task.content}</p>
        </div>
      </div>
      <div className='taskItemInfo'>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <p><b>Started:</b> {task.startedAt ? new Date(task.startedAt).toLocaleDateString(language) : "-"}</p>
            <p><b>Completed:</b> {task.completedAt ? new Date(task.completedAt).toLocaleDateString(language) : "-"}</p>
          </div>
          <p><b>Due date:</b> {task.dueDate ? new Date(task.dueDate).toLocaleDateString(language) : "-"}</p>
          <p><b>Created:</b> {task.createdDate ? new Date(task.createdDate).toLocaleString(language) : "-"}</p>
          <p><b>Last modified:</b> {task.lastModifiedDate ? new Date(task.lastModifiedDate).toLocaleString(language) : "-"}</p>
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

export default React.memo(TaskItem);