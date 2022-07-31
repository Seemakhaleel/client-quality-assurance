import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Users from './Users';


function User() {
  const { id } = useParams();
  const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    event.preventDefault();
    setRole(event.target.value);
  };

//  const deleteUser =(id) =>{ //delete user
//     setUsers(Users.filter((user) => user.id !== id));
//   }

  return (
    <div>
      <h1>Manage users</h1>
       <h3> This is user {id} </h3>
      
       <Box
        display="flex"
        flexDirection="column"
        justifyContent="left"
        alignItems="left"
        minHeight="50vh"
       padding="20px"
      bgcolor="#bdbdbd"

        >
      
       <Typography > First Name:</Typography>
        <Typography> Last Name:</Typography>
        <Typography> Email:</Typography>
        <Typography> Display Name:</Typography>
        <Typography> Role:</Typography>
    
      <FormControl sx={{ m: 0, width: 200}}>
        <Select
          value={role}
          onChange={handleChange}
          displayEmpty
        
        >
          
          <MenuItem value={10}>Software Engineer</MenuItem>
          <MenuItem value={20}>Quality assurance</MenuItem>
          
        </Select>
        <FormHelperText>Change Role </FormHelperText>
      </FormControl>

      <Button type='submit' variant="filled" startIcon={<UpdateIcon />} sx={{width: 200}}>
       Update Changes
      </Button>

      <Button variant="filled" 
      type='submit' 
      startIcon={<DeleteIcon />} 
      sx={{width: 200, marginLeft: 50}}
      // onClick={() => deleteUser(id)}
      
      >
        Delete user {id}
      </Button>

      </Box>
     
    </div>
  );
}





export default User;

