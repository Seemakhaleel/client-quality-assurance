import * as React from 'react'
import axios, { setAxiosToken } from '../../axios'
import { baseUrl } from '../../api'
import { Box, Container, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Roles() {
    let navigate = useNavigate()
    const [role, setRole] = React.useState([])
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

    return (
        <Container sx={{ marginTop: 10, marginLeft: 2 }}>
            {role.map((role) => {
                return (
                    <Paper key={role.id} onClick={() => navigate('/dashboard/roles/role/' + role.id)}>
                        <Box p={2}>
                            <Typography variant="h5">{role.name}</Typography>
                            <Typography variant="body1">{role.description}</Typography>
                        </Box>
                    </Paper>
                )
            })}
        </Container>
    )
}
