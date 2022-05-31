export enum WorkTaskStatus {
    Canceled = 0,
    Registered = 1,
    Started = 2,
    Completed = 3
}
export interface INewWorkTask {
    title: string;
    content: string;
    planedCompletedAt: any;
    completedAt: any;
    status: WorkTaskStatus;
    owner: string;
    assignedTo: string;
}

export interface IUpdateWorkTask extends INewWorkTask {
    id: string;
}

export interface IWorkTask extends IUpdateWorkTask {
    createdDate: any;
    ownerName: string;
    assignedToName: string;
    lastModifiedDate: any;
}