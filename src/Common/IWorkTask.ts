export enum WorkTaskStatus {
    Canceled,
    Registered,
    Started,
    Completed
}
export interface INewWorkTask {
    title: string;
    content: string;
    dueDate: any;
    status: WorkTaskStatus;
    owner: string;
    assignedTo: string;
}

export interface IUpdateWorkTask extends INewWorkTask {
    id: string;
}

export interface IWorkTask extends IUpdateWorkTask {
    createdDate: any;
    startedAt: any;
    completedAt: any;
    ownerName: string;
    assignedToName: string;
    lastModifiedDate: any;
}