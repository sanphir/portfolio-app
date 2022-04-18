import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { EmployeesTableToolbar } from './EmployeesTableToolbar';
import { IEmployee } from '../../interfaces/IEmployee';
import { EmployeesTableHead } from './EmployeesTableHead';
import { DialogResult, Order } from './EmployeesTableCommon';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EmployeeService from '../../services/EmployeeService';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
    return order === Order.DESC
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface EmployeesTableProps {
    rows: IEmployee[];
}

export default function EmployeesTable(props: EmployeesTableProps) {
    const { rows } = props;

    const [order, setOrder] = React.useState<Order>(Order.ASC);
    const [orderBy, setOrderBy] = React.useState<keyof IEmployee>('name');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [openDeleteEmployeeAlert, setOpenDeleteEmployeeAlert] = React.useState(false);

    const handleDeleteEmployee = (event: unknown) => {
        setOpenDeleteEmployeeAlert(true);
        //console.log('Delete employee click');
    }

    const handleDeleteEmployeeAlert = (event: unknown, dialogResult: DialogResult) => {
        setOpenDeleteEmployeeAlert(false);
        if (dialogResult == DialogResult.YES) {
            //TO DO 
            //add loader 

            EmployeeService.removeEmployees([...selected]).then(resolve => {
                console.log("Employees useEffect");
                if (!resolve.error) {
                    //TO DO
                    //refresh table
                    console.log('removeEmployees ok!');
                } else {
                    console.log('removeEmployees error: ' + resolve.error);
                    //TO DO
                    //add notificator with error
                }
            });
        }
        console.log("Selected records " + JSON.stringify(selected));
    };

    const handleEditEmployee = (event: unknown) => {
        console.log('Edit employee click');
    }

    const handleNewEmployee = (event: unknown) => {
        console.log('New employee click');
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof IEmployee,
    ) => {
        const isAsc = orderBy === property && order === Order.ASC;
        setOrder(isAsc ? Order.DESC : Order.ASC);
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleSelectCheckBoxClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Dialog
                    open={openDeleteEmployeeAlert}
                    onClose={(e) => handleDeleteEmployeeAlert(e, DialogResult.CANCEL)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" >
                        {"Deleting"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete {selected.length} selected employees records?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => handleDeleteEmployeeAlert(e, DialogResult.CANCEL)}><b>Cancel</b></Button>
                        <Button onClick={(e) => handleDeleteEmployeeAlert(e, DialogResult.YES)} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <EmployeesTableToolbar numSelected={selected.length} onDeleteEmployee={handleDeleteEmployee} onEditEmployee={handleEditEmployee} onNewEmployee={handleNewEmployee} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EmployeesTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    //console.log('row'+index+': '+JSON.stringify(row));
                                    const isItemSelected = isSelected(row.id.toString());
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleSelectCheckBoxClick(event, row.id.toString())}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>

                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.role}</TableCell>
                                            <TableCell align="left">{row.birthDate}</TableCell>
                                            <TableCell align="right">{row.salary}</TableCell>
                                            <TableCell align="left">{row.createdDate}</TableCell>
                                            <TableCell align="left">{row.lastModifiedDate}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 15, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}