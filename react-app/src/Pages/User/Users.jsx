import React from 'react'
import { useState } from 'react'
import Tables from '../../components/Tables'
import { useNavigate } from 'react-router-dom'
import axios, { setAxiosToken } from '../../axios'
import { baseUrl } from '../../api'
import { Container } from '@mui/material'
import { Box, Typography } from '@mui/material'

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
        <Container>
            <Box>
                <Typography sx={{ fontSize: 20 }}>
                    <h3> Users </h3>
                </Typography>

                <Typography>You can delete users here.</Typography>
            </Box>
            <Tables users={users} cols={cols} SelectedRow={SelectedRow} />
        </Container>
    )
}

export default Users
