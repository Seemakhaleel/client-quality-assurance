import { Avatar, Card, CardContent, CardHeader, Container, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import image from '../user.png'
import { Box } from '@mui/system'

const UserProfile = () => {
    const auth = useSelector((state) => state.authentication)

    const { t } = useTranslation()
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
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                mx: 2,
                my: 2
            }}
        >
            <Container dir={t('userProfile.direction')} maxWidth="lg">
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {t('userProfile.profilePage')}
                </Typography>

                <Grid container spacing={3} paddingTop={4}>
                    <Grid item lg={4} md={6} xs={12}>
                        <Card>
                            <CardContent>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Avatar
                                        src={image}
                                        sx={{
                                            height: 64,
                                            mb: 2,
                                            width: 64
                                        }}
                                    />
                                    <Typography color="textPrimary" gutterBottom variant="h5">
                                        {info?.firstName} {info?.lastName}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={8} md={6} xs={12}>
                        <form autoComplete="off" noValidate>
                            <Card>
                                <CardHeader
                                    subheader={t('userProfile.info')}
                                    // title="Profile"
                                />
                                <Divider />
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item md={6} xs={12}>
                                            <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                {t('userProfile.firstName')}
                                            </Typography>
                                            <Typography variant="h6"> {info?.firstName}</Typography>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                {t('userProfile.lastName')}
                                            </Typography>
                                            <Typography variant="h6"> {info?.lastName}</Typography>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                {t('userProfile.role')}
                                            </Typography>
                                            <Typography variant="h6"> {info?.role}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default UserProfile
