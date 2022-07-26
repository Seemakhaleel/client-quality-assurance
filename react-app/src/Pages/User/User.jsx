import * as React from 'react'

import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/system/Container'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { baseUrl } from '../../api'
import axiosInstance from '../../axios'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import DialogContentText from '@mui/material/DialogContentText'
import { useTheme } from '@mui/material'
import { theme } from '../../Theme'

function User() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [role, setRole] = React.useState('')
    const [open, setOpen] = React.useState(false)

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

    const handleClickOpen = () => {
        deleteUser()
        navigate('/dashboard/users')
        setOpen(true)
    }

    const handleCloseBtn = () => {
        setOpen(false)
        console.log(open)
    }

    const deleteUser = async () => {
        try {
            const response = await axiosInstance({
                method: 'delete',
                url: baseUrl + '/users/' + id
            })
            oneUser()

            console.log(response)
        } catch (error) {
            console.log('error')
        }
    }
    // const theme = useTheme()

    return (
        <div>
            <h1>Manage users</h1>
            <h3> This is user {id} </h3>

            <Container sx={{ marginTop: 8, marginLeft: 2, mx: 50 }}>
                <Box p={2}>
                    <Typography> Role: {user.role}</Typography>
                    <Typography> display Name: {user.displayName}</Typography>
                    <Typography> Email: {user.email}</Typography>
                    <Typography> First Name: {user.firstName}</Typography>
                    <Typography> Last Name: {user.lastName}</Typography>
                </Box>

                {
                    <Button
                        variant="filled"
                        type="submit"
                        startIcon={<DeleteIcon />}
                        sx={{ width: 200, marginLeft: 50, backgroundColor: theme.palette.secondary.main }}
                        onClick={() => {
                            // deleteUser()
                            // navigate('/dashboard/users')
                            setOpen(true)
                        }}
                    >
                        Delete user {id}
                    </Button>
                }
                <Dialog open={open}>
                    <DialogContent>
                        <DialogContentText>are you sure you want to delete?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickOpen} autoFocus>
                            Yes
                        </Button>
                        <Button autoFocus onClick={handleCloseBtn}>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    )
}

export default User
