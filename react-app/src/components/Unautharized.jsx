import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

const Unautherized = () => {
    return (
        <>
            <Container sx={{ marginTop: 10, marginLeft: 35 }}>
                <Typography> You cant access this page! </Typography>
            </Container>
        </>
    )
}

export default Unautherized
