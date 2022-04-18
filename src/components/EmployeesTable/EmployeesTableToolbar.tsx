import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

interface EmployeesTableToolbarProps {
    numSelected: number;
    onDeleteEmployee?: ((event: unknown) => void) | undefined;
    onEditEmployee?: ((event: unknown) => void) | undefined;
    onNewEmployee?: ((event: unknown) => void) | undefined;
}

export const EmployeesTableToolbar = (props: EmployeesTableToolbarProps) => {
    const { numSelected, onDeleteEmployee: handleDeleteEmployee, onEditEmployee: handleEditEmployee, onNewEmployee: handleNewEmployee } = props;
    const editClick = () => {
        console.log('edit clicked');

    };
    const addNewClick = () => {
        console.log('addNew clicked');
    };


    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Employees
                </Typography>
            )}
            {numSelected > 0 ? (
                numSelected === 1 ?
                    (
                        <Box component="div" sx={{
                            display: 'flex',
                            justifyContent: 'space-between' 
                        }}>
                            <Tooltip title="Edit employee">
                                <IconButton onClick={handleEditEmployee}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete employee">
                                <IconButton onClick={handleDeleteEmployee}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ) :
                    (
                        <Tooltip title="Delete employee">
                            <IconButton onClick={handleDeleteEmployee}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>)
            ) : (
                <div>
                    <Tooltip title="Add new employee">
                        <IconButton onClick={handleNewEmployee}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            )}
        </Toolbar>
    );
};