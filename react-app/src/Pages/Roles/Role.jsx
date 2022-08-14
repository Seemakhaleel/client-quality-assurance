import React from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../axios'
import { baseUrl } from '../../api'
import { Box, Container, Typography } from '@mui/material'

const Role = () => {
    const { id } = useParams()

    const [onerole, setOneRole] = React.useState([])
    const oneRole = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: baseUrl + '/roles/' + id
            })
            console.log(response.data.role)
            setOneRole(response.data.role)
        } catch (error) {
            console.log('error')
        }
    }
    React.useEffect(() => {
        oneRole()
    }, [])

    return (
        <Container sx={{ marginTop: 10, marginLeft: 2, mx: 30 }}>
            <Box p={2}>
                <Typography variant="h5">{onerole.name}</Typography>
                <Typography variant="body1">{onerole.description}</Typography>
            </Box>
        </Container>
    )
}

export default Role
