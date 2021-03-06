export type Nullable<T> = T | null;

export enum DialogResult {
    YES = 'yes',
    NO = 'no',
    OK = 'ok',
    CANCEL = 'cancel'
}
export interface ISelctionSourceItem {
    label: string;
    id: string;
}