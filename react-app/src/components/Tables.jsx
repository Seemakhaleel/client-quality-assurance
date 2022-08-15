import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import { IconButton, Paper, TableContainer, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1D2D44',
        color: 'white'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: 1
    }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 1
    }
}))

export default function Tables({ users, cols, SelectedRow }) {
    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table
                    sx={{
                        minWidth: 650
                    }}
                    size="huge"
                >
                    <TableHead>
                        <StyledTableRow>
                            {cols.map((col, index) => (
                                <StyledTableCell key={index} align="center">
                                    {' '}
                                    {col.label}{' '}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>

                    <TableBody>
                        {users.map((user) => (
                            <StyledTableRow
                                key={user.id}
                                onClick={() => SelectedRow(user.id)}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#9e9e9e',
                                        cursor: 'pointer'
                                    }
                                }}
                            >
                                {cols.map((col, index) => (
                                    <>
                                        {index === cols.length - 1 ? ( // -1 because the last col is the edit button
                                            <TableCell align="center">
                                                <IconButton onClick={() => SelectedRow(user.id)} sx={{ padding: '0' }}>
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        ) : (
                                            <TableCell key={index} align="center">
                                                {user[col.name]}{' '}
                                            </TableCell>
                                        )}
                                    </>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
