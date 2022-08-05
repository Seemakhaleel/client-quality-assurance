import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import { IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // styles for TableCell
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16
    },

    width: '100%'
}))

export default function Tables({ users, cols, SelectedRow }) {
    return (
        <>
            <Box>
                <Typography sx={{ fontSize: 20 }}>
                    <h3> Users </h3>
                </Typography>

                <Typography>You can delete users here.</Typography>
            </Box>
            <Table
                sx={{
                    minWidth: 90,
                    minHeight: 80,
                    width: 90,
                    height: 20,
                    marginTop: 20,
                    marginLeft: 5,
                    fontStyle: 'italic',
                    border: '1px solid black',
                    color: 'white'
                }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        {cols.map((col, index) => (
                            <StyledTableCell key={index}> {col.label} </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            onClick={() => SelectedRow(user.id)}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#9e9e9e',
                                    cursor: 'pointer',
                                    border: '1px solid black'
                                }
                            }}
                        >
                            {cols.map((col, index) => (
                                <>
                                    {index === cols.length - 1 ? ( // -1 because the last col is the edit button
                                        <TableCell
                                            sx={{
                                                border: '1px solid black'
                                            }}
                                        >
                                            <IconButton onClick={() => SelectedRow(user.id)} sx={{ padding: '0' }}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    ) : (
                                        <TableCell
                                            key={index}
                                            sx={{
                                                border: '1px solid black'
                                            }}
                                        >
                                            {user[col.name]}{' '}
                                        </TableCell>
                                    )}
                                </>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
