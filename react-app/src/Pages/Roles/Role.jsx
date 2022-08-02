import React from 'react'
import { useParams } from 'react-router-dom'
import axios, { setAxiosToken } from '../../axios'
import { baseUrl } from '../../api'
import { Box, Container, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Role = () => {
    const { id } = useParams()
    let navigate = useNavigate()
    const [onerole, setOneRole] = React.useState([])
    const oneRole = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: baseUrl + '/roles/' + id
            })
            console.log(response.data.role)
            setOneRole(response.data.role)
            setAxiosToken(response.data.access)
        } catch (error) {
            console.log('error')
        }
    }
    React.useEffect(() => {
        oneRole()
    }, [])

    return (
        <Container sx={{ marginTop: 10, marginLeft: 2 }}>
            <Box p={2}>
                <Typography variant="h5">{onerole.name}</Typography>
                <Typography variant="body1">{onerole.description}</Typography>
            </Box>
        </Container>
    )
}

export default Role
