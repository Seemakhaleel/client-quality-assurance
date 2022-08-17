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

    const cols = React.useMemo(
        () => [
            //useMemo is used to optimize the performance of the component
            { name: 'id', label: 'ID' },
            { name: 'name', label: 'Name' },
            { name: 'description', label: 'Description' }
        ],
        []
    ) //The array that's passed as a second argument to useMemo is a dependency list, as you might guess if you put a variable inside the dependency list if it changes it'll trigger useMemo to redefine cols with the new values of the dependencies.
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
        <Container sx={{ marginTop: 8, marginLeft: 2, mx: 30 }}>
            <Box p={2}>
                <Typography variant="h5">List of Roles</Typography>
                <Tables cols={cols} users={role} SelectedRow={SelectedRow} />
            </Box>
        </Container>
    )
}
