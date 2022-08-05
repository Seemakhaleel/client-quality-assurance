import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Navigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/system/Container'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { baseUrl } from '../../api'
import axiosInstance from '../../axios'

function User() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [role, setRole] = React.useState('')

    const [user, setUser] = React.useState([])
    const oneUser = async () => {
        try {
            const response = await axiosInstance({
                method: 'get',
                url: baseUrl + '/users/' + id
            })
            setUser(response.data.user)
        } catch (error) {
            console.log('error')
        }
    }

    React.useEffect(() => {
        oneUser()
    }, [])

    const handleChange = (event) => {
        event.preventDefault()
        setRole(event.target.value)
    }

    const deleteUser = async () => {
        try {
            const response = await axiosInstance({
                method: 'delete',
                url: baseUrl + '/users/' + id
            })
            console.log(response)
        } catch (error) {
            console.log('error')
        }
    }

    return (
        <div>
            <h1>Manage users</h1>
            <h3> This is user {id} </h3>

            <Container sx={{ marginTop: 10, marginLeft: 2 }}>
                <Box p={2}>
                    <Typography> Role: {user.role}</Typography>
                    <Typography> display Name: {user.displayName}</Typography>
                    <Typography> Email: {user.email}</Typography>
                    <Typography> First Name: {user.firstName}</Typography>
                    <Typography> Last Name: {user.lastName}</Typography>
                </Box>

                <Button
                    variant="filled"
                    type="submit"
                    startIcon={<DeleteIcon />}
                    sx={{ width: 200, marginLeft: 50 }}
                    onClick={() => {
                        deleteUser()

                        navigate('/dashboard/users')
                    }}
                >
                    Delete user {id}
                </Button>
            </Container>
        </div>
    )
}

export default User
