import React from 'react'
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { WorkTaskStatus } from '../../Common/IWorkTask';
import { getTitleColor } from './TaskCommon';

export interface SelectedStatusesChangedCallBack {
    (selectedStatuses: boolean[]): void
}

interface TaskStatusFilterProps {
    initialSelectedStatuses: boolean[];
    selectedStatusesChanged: SelectedStatusesChangedCallBack;
}

const TaskStatusFilter = (props: TaskStatusFilterProps) => {
    const { initialSelectedStatuses, selectedStatusesChanged } = props;
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const updateCheckedValue = (status: WorkTaskStatus, statusChecked: boolean) => {
        let newChecked = [...checked];
        newChecked[status] = statusChecked;
        setChecked(newChecked);
        selectedStatusesChanged(newChecked);
    };
    const [checked, setChecked] = React.useState(initialSelectedStatuses);

    const handleCheckAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newChecked = checked.map(() => event.target.checked)
        setChecked(newChecked);
        selectedStatusesChanged(newChecked);
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            {checked.map((statusChecked, status) => {
                return (
                    <FormControlLabel
                        label={WorkTaskStatus[status]}
                        control={<Checkbox checked={statusChecked}
                            sx={{
                                color: getTitleColor(status),
                                '&.Mui-checked': {
                                    color: getTitleColor(status),
                                },
                            }}
                            onChange={(event) => { updateCheckedValue(status, event.target.checked); }} />}
                    />
                )
            })}
        </Box>
    );

    return (
        <div>
            <Button aria-describedby={id} type="button" onClick={handleClick} color="inherit">Status filter</Button>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                            <FormControlLabel
                                label="All"
                                control={
                                    <Checkbox
                                        checked={checked.reduce((acc, cur) => acc && cur, true)}
                                        indeterminate={checked.some((cur) => !cur) && !checked.every((cur) => !cur)}
                                        onChange={handleCheckAllChange}
                                    />
                                }
                            />
                            {children}
                        </Box>
                    </Fade>
                )}
            </Popper>
        </div>
    )
}

export default React.memo(TaskStatusFilter);