import "../../styles/common.css";
import * as React from 'react';
import { useEffect, useTransition } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { EmployeesTableToolbar } from './EmployeesTableToolbar';
import { EmployeesTableHead } from './EmployeesTableHead';
import { Order, getComparator, stableSort } from './EmployeesTableCommon';
import { IEmployee, Role } from '../../Common/IEmployee';
import EmployeeService from '../../services/EmployeeService';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
    getEmployeesAsync,
    getEmployees,
    removeEmployee,
} from '../../redux/employeesSlice';
import { setLoaderDisplayed, setLoaderNone } from '../../redux/loaderSlice';
import { DialogResult } from "../../Common/Common";
import { DeleteConfirmeDialog } from "../CommonDialogs/DeleteConfirmeDialog";


export default function EmployeesTable() {
    const rows = useAppSelector(getEmployees);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isPanding, startTransition] = useTransition();

    const [order, setOrder] = React.useState<Order>(Order.ASC);
    const [orderBy, setOrderBy] = React.useState<keyof IEmployee>('name');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searcheValue, setSearcheValue] = React.useState('');

    const [openDeleteEmployeeAlert, setOpenDeleteEmployeeAlert] = React.useState(false);

    const filteredRows = React.useMemo(() => {
        if (searcheValue && searcheValue.length > 0) {
            return [...rows.filter(e => e.email.indexOf(searcheValue) >= 0 || e.name.indexOf(searcheValue) >= 0)];
        } else {
            return [...rows];
        }
    }, [rows, searcheValue]);

    const handleDeleteEmployee = (event: unknown) => {
        let currentId = localStorage.getItem("empployeeId");
        if (currentId && selected.includes(currentId)) {
            toast.warning("You can't delete self!");
            return;
        }
        setOpenDeleteEmployeeAlert(true);
    }

    const handleDeleteEmployeeAlert = (event: unknown, dialogResult: DialogResult) => {
        setOpenDeleteEmployeeAlert(false);
        if (dialogResult == DialogResult.YES) {
            try {
                dispatch(setLoaderDisplayed());
                EmployeeService.remove([...selected]).then(resolve => {
                    if (!resolve.error) {
                        dispatch(removeEmployee([...selected]));
                        setSelected([]);
                        toast.success('Employee deleted');
                    } else {
                        toast.error(`Delete employee error: ${resolve.error}`);
                    }
                });
            }
            finally {
                dispatch(setLoaderNone());
            }
        }
    };

    const handleEditEmployee = (event: unknown) => {
        navigate(`/employees/${selected[0]}`, { replace: false });
    }

    const handleNewEmployee = (event: unknown) => {
        navigate('/employees/new', { replace: false });
    }

    const handleSearcheChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        // dispatch(filterEmployeesByNameOrEmail(event?.target?.value ?? null));        
        startTransition(() => {
            setSearcheValue(event?.target?.value ?? '');
        });
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
            setSelected([...filteredRows.map((n) => n.id)]);
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

    // Specify date and time format using "style" options (i.e. full, long, medium, short)
    const language = window.navigator.language;
    //const dateFormater = new Intl.DateTimeFormat(window.navigator.language, { dateStyle: 'short', timeStyle: 'medium' });    

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

    useEffect(() => {
        //console.log("EmployeesTable useEffect");
        dispatch(setLoaderDisplayed());
        try {
            dispatch(getEmployeesAsync());
        } finally {
            dispatch(setLoaderNone());
        }
        return () => { }
    }, []);

    return (
        <Box sx={{ margin: "5em", backgroundColor: "lavender" }} >
            <Paper sx={{ width: '100%', mb: 2 }}>
                <DeleteConfirmeDialog open={openDeleteEmployeeAlert} onClose={handleDeleteEmployeeAlert} message={"Are you sure you want to delete " + selected.length + " selected employees records?"} />
                <EmployeesTableToolbar numSelected={selected.length}
                    onDeleteEmployee={handleDeleteEmployee}
                    onEditEmployee={handleEditEmployee}
                    onNewEmployee={handleNewEmployee}
                    onSearcheChanged={handleSearcheChanged} />
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
                            rowCount={filteredRows.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(filteredRows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
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
                                            <TableCell align="left">{Role[row.role as Role]}</TableCell>
                                            <TableCell align="left">{new Date(row?.birthDate).toLocaleString(language)}</TableCell>
                                            <TableCell align="right">{row.salary}</TableCell>
                                            <TableCell align="left">{new Date(row?.createdDate).toLocaleString(language)}</TableCell>
                                            <TableCell align="left">{new Date(row?.lastModifiedDate).toLocaleString(language)}</TableCell>
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
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                style={{ margin: "0 20px" }}
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}
