import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogResult } from "../../Common/Common";
import { DialogCallBack } from '../../Common/CallBackDefinitions';
import Button from '@mui/material/Button';

interface DeleteConfirmeDialogProps {
    open: boolean;
    message: string;
    onClose: DialogCallBack;
}
export const DeleteConfirmeDialog = (props: DeleteConfirmeDialogProps) => {
    const { open, message, onClose } = props;
    return (
        <Dialog
            open={open}
            onClose={(e) => onClose(e, DialogResult.CANCEL)}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
        >
            <DialogTitle id="delete-dialog-title" color={"darkred"}>
                {"Confirm deletion"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => onClose(e, DialogResult.CANCEL)}><b>Cancel</b></Button>
                <Button onClick={(e) => onClose(e, DialogResult.YES)} autoFocus>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}
