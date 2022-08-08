import * as React from 'react'
import axios, { setAxiosToken } from '../../axios'
import { baseUrl } from '../../api'
import { Box, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Tables from '../../components/Tables'

export default function Roles() {
    let navigate = useNavigate()
    const [role, setRole] = React.useState([])

    const [cols] = useState([
        { name: 'id', label: 'ID' },
        { name: 'name', label: 'Name' },
        { name: 'description', label: 'Description' }
    ])
    const roles = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: baseUrl + '/roles'
            })
            console.log(response.data.roles) //ddata access is the roles array in the response
            setRole(response.data.roles)
        } catch (error) {
            console.log('error logging in')
        }
    }
    React.useEffect(() => {
        roles()
    }, [])
    const SelectedRow = (id) => {
        navigate('/dashboard/roles/role/' + id)
    }

    return (
        <Container sx={{ marginTop: 10, marginLeft: 2 }}>
            <Box p={2}>
                <Typography variant="h5">List of Roles</Typography>
                <Tables cols={cols} users={role} SelectedRow={SelectedRow} />
            </Box>
        </Container>
    )
}
