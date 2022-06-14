import React from 'react'
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { WorkTaskStatus } from '../../interfaces/IWorkTask';

interface TaskStatusFilterProps {
    initialSelectedStatus: boolean[];
}

const TaskStatusFilter = (props: TaskStatusFilterProps) => {
    const { initialSelectedStatus } = props;
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    console.log(`TaskStatusFilter: initialSelectedStatus: ${initialSelectedStatus}`);

    const updateCheckedValue = (status: WorkTaskStatus, statusChecked: boolean) => {
        let newChecked = [...checked];
        newChecked[status] = statusChecked;
        setChecked(newChecked);
    };
    const [checked, setChecked] = React.useState(initialSelectedStatus);

    const handleCheckAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(checked.map(() => event.target.checked));
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
                label={WorkTaskStatus[WorkTaskStatus.Canceled]}
                control={<Checkbox checked={checked[WorkTaskStatus.Canceled]}
                    onChange={(event) => { updateCheckedValue(WorkTaskStatus.Canceled, event.target.checked); }} />}
            />
            <FormControlLabel
                label={WorkTaskStatus[WorkTaskStatus.Registered]}
                control={<Checkbox checked={checked[WorkTaskStatus.Registered]}
                    onChange={(event) => { updateCheckedValue(WorkTaskStatus.Registered, event.target.checked); }} />}
            />
            <FormControlLabel
                label={WorkTaskStatus[WorkTaskStatus.Started]}
                control={<Checkbox checked={checked[WorkTaskStatus.Started]}
                    onChange={(event) => { updateCheckedValue(WorkTaskStatus.Started, event.target.checked); }} />}
            />
            <FormControlLabel
                label={WorkTaskStatus[WorkTaskStatus.Completed]}
                control={<Checkbox checked={checked[WorkTaskStatus.Completed]}
                    onChange={(event) => { updateCheckedValue(WorkTaskStatus.Completed, event.target.checked); }} />}
            />
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
                                        indeterminate={checked.some((cur) => !cur)}
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