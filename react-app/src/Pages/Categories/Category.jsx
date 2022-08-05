import React from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../axios'
import { baseUrl } from '../../api'
import { Box, Container } from '@mui/system'
import { Typography } from '@mui/material'

const Category = () => {
    const { id } = useParams()
    const [onecategory, setOneCategory] = React.useState([])
    const oneCategory = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: baseUrl + '/categories/' + id
            })
            console.log(response.data.category)
            setOneCategory(response.data.category)
        } catch (error) {
            console.log('error')
        }
    }
    React.useEffect(() => {
        oneCategory()
    }, [])

    return (
        <>
            <Container sx={{ marginTop: 10, marginLeft: 2 }}>
                <Box p={2}>
                    <Typography variant="h5">{onecategory.name}</Typography>
                    <Typography variant="body1">{onecategory.description}</Typography>
                </Box>
            </Container>
        </>
    )
}

export default Category
