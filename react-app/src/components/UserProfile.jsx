import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserProfile = () => {
    const auth = useSelector((state) => state.authentication)

    // const getUsers = async () => {
    //     try {
    //         const { data } = await axiosInstance({
    //             method: 'get',
    //             url: baseUrl + '/auth/self'
    //         })

    //         dispatch(SignIn(data?.user))
    //         setUsers(data)
    //         console.log(data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const info = auth?.user

    return (
        <Container>
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
