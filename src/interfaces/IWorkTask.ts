export interface INewWorkTask {
    title: string;
    content: string;
    planedCompletedAt: any;
    completedAt: any;
    status: any;
    owner: string;
    assignedTo: string;
}

export interface IUpdateWorkTask extends INewWorkTask {
    id: string;
}

export interface IWorkTask extends IUpdateWorkTask {
    createdDate: any;
    lastModifiedDate: any;
}