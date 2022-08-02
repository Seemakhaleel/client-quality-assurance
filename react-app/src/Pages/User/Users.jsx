import React from 'react'
import { useState } from 'react'
import Tables from '../../components/Tables'
import { useNavigate } from 'react-router-dom'
import axios, { setAxiosToken } from '../../axios'
import { baseUrl } from '../../api'
import { Container } from '@mui/material'

const Users = () => {
    const [cols] = useState([
        {
            name: 'role',
            label: 'Role'
        },
        {
            name: 'displayName',
            label: 'Display Name'
        },
        {
            name: 'email',
            label: 'Email'
        },
        {
            name: 'firstName',
            label: 'First Name'
        },
        {
            name: 'lastName',
            label: 'Last Name'
        },
        {
            name: 'action',
            label: 'action'
        }
    ])
    const SelectedRow = (id) => {
        // selected row function to navigate to user details page with id as parameter and passing id to user details page
        navigate('/dashboard/users/' + id)
    }
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const usersList = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: baseUrl + '/users'
            })
            setUsers(response.data.users)
        } catch (error) {
            console.log('error')
        }
    }
    React.useEffect(() => {
        usersList()
    }, [])
    return (
        <Container sx={{ marginTop: 10, marginLeft: 2 }}>
            <Tables users={users} cols={cols} SelectedRow={SelectedRow} />
        </Container>
    )
}

//   const [users,setUsers] = useState([
//     { id:0,
//       role: "admin",
//       displayName: "Seema Muhammad",
//       email: "seema@.com",
//       firstName: "Seema",
//       lastName: "Muhammad",

//     },

//     { id:1,
//       role: "software ",
//       displayName: "Hama ranj",
//       email: "Hama@.com",
//       firstName: "Hama",
//       lastName: "ranj",

//     },
//     {
//       id:2,
//       role: "quality assurance",
//       displayName: "zhin ahmad",
//       email: "zhin@.com",
//       firstName: "zhin",
//       lastName: "ahmad",

//     },

//   ]); //list of users

//   const SelectedRow = (id) => {
//     // selected row function to navigate to user details page with id as parameter and passing id to user details page
//     navigate("/dashboard/users/" + id);
//   };

//   function deleteUser(id) { //delete user
//     setUsers(users.filter((user) => user.id !== id));
//   }
//   // function updateUser(user) { //update user
//   //   setUsers(users.map((u) => (u.id === user.id ? user : u)));
//   // }

//   return (
//     <>
//       <Tables users={users} cols={cols} SelectedRow={SelectedRow} />
//     </>
//   );
// };

export default Users
