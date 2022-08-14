import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { baseUrl } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { SignIn } from '../store/auth'
import axiosInstance from '../axios'
import Pagination from '@mui/material/Pagination'

const UserProfile = () => {
    const [users, setUsers] = React.useState([])
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.authentication)

    const getUsers = async () => {
        try {
            const { data } = await axiosInstance({
                method: 'get',
                url: baseUrl + '/auth/self'
            })

            dispatch(SignIn(data?.user))
            setUsers(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getUsers()
    }, [])

    const info = auth?.user

    return (
        <Container sx={{ marginTop: 10, marginLeft: 2, mx: 30 }}>
            <Grid container sx={{ p: 4 }}>
                {console.log(info)}
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex' }}>
                <Typography variant="h4">{info?.firstName}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ p: 4 }}>
                <Typography>ID : {info?.id}</Typography>
                <Typography>First Name : {info?.firstName}</Typography>
                <Typography>Last Name : {info?.lastName}</Typography>
                <Typography>Role: {info?.role}</Typography>
            </Grid>
        </Container>
    )
}

export default UserProfile
