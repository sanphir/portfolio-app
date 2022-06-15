import { DialogResult } from "./Common";

export interface SimpleCallBack {
    (): void;
}

export interface DialogCallBack {
    (e: any, dialogResult: DialogResult): void
}