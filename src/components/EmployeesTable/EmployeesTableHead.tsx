import * as React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { IEmployee } from '../../interfaces/IEmployee';
import { Order } from './EmployeesTableCommon';

interface HeadCell {
    disablePadding: boolean;
    id: keyof IEmployee;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'Name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'Email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'Role',
        numeric: false,
        disablePadding: false,
        label: 'Role',
    },
    {
        id: 'BirthDate',
        numeric: false,
        disablePadding: false,
        label: 'BirthDate',
    },
    {
        id: 'Salary',
        numeric: true,
        disablePadding: false,
        label: 'Salary',
    },
    {
        id: 'CreatedDate',
        numeric: false,
        disablePadding: false,
        label: 'CreatedDate',
    },
    {
        id: 'LastModifiedDate',
        numeric: false,
        disablePadding: false,
        label: 'LastModifiedDate',
    },
];

interface EmployeesTableHeadProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IEmployee) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export const EmployeesTableHead = (props: EmployeesTableHeadProps) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof IEmployee) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}