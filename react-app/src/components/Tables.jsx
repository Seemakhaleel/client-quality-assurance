import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // styles for TableCell
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

export default function Tables({ users, cols, SelectedRow }) {
  return (
    <>

      {/* <TableContainer sx={{ bgcolor: 'black'}}> */}
        <Table
          sx={{
            minWidth: 650,
            width: 70,
            height: 50,
            marginTop: 10,
            marginLeft: 50,
            fontStyle: "italic",
            border: "1px solid black",
            bgcolor: "#757575",
            color: "white",
          }}
          
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {cols.map((col, index) => (
                <StyledTableCell key={index}> {col.name}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}
              onClick={() => SelectedRow(user.id)}
              sx={{
                "&:hover": {
                  backgroundColor: "#9e9e9e",
                  cursor: "pointer",
                  }
              }}>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.displayName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
              </TableRow>
            ))}
           
          </TableBody>
          </Table>
         
{/*         
        <IconButton sx={{ marginBottom: 70, marginRight: 60 }}>
        <EditIcon />
      
   
      </IconButton> */}
     
    
      

      
    </>
  );
}
