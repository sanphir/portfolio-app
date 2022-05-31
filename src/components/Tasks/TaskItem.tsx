import React from 'react'
import { IWorkTask, WorkTaskStatus } from '../../interfaces/IWorkTask';
import '../../styles/common.css'
import '../../styles/taskitems.css'

interface TaskItemProps {
  task: IWorkTask;
}



const TaskItem = (props: TaskItemProps) => {
  const { task } = props;

  const language = window.navigator.language;

  const getTitleColor = (status: WorkTaskStatus) => {
    switch (status) {
      case WorkTaskStatus.Registered: return "darkcyan";
      case WorkTaskStatus.Started: return "coral";
      case WorkTaskStatus.Completed: return "forestgreen";
      case WorkTaskStatus.Canceled: return "gray";
      default: return "red";
    }
  }

  const titleColor: any = getTitleColor(task.status);

  return (
    <div className='taskItemControl' style={{
      opacity: (task.status === WorkTaskStatus.Canceled ? "0.7" : "1")
    }}>
      <div className='taskItemTitle'>
        <p>{task.title}</p>
      </div>
      <div className='taskItemContent'>
        <div>
          <p>{task.content}</p>
        </div>
      </div>
      <div className='taskItemInfo'>
        <div>
          <p><b>Due date:</b> {new Date(task.completedAt).toLocaleDateString(language)}</p>
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

    </div>

  )
}

export default TaskItem