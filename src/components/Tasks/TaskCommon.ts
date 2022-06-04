import { WorkTaskStatus } from "../../interfaces/IWorkTask";

export const getTitleColor = (status: WorkTaskStatus) => {
    switch (status) {
        case WorkTaskStatus.Registered: return "darkcyan";
        case WorkTaskStatus.Started: return "coral";
        case WorkTaskStatus.Completed: return "forestgreen";
        case WorkTaskStatus.Canceled: return "gray";
        default: return "red";
    }
}