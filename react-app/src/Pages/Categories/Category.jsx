import React from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../axios'
import { baseUrl } from '../../api'
import { Box, Container } from '@mui/system'
import { IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

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
    const deleteCategory = async () => {
        try {
            const response = await axios({
                method: 'delete',
                url: baseUrl + '/categories/' + id
            })
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        oneCategory()
    }, [])

    return (
        <>
            <Container sx={{ marginTop: 10, mx: 30 }}>
                <Box p={2}>
                    <Typography variant="h5">{onecategory.name}</Typography>
                    <Typography variant="body1">{onecategory.description}</Typography>
                </Box>
                <IconButton aria-label="delete" size="large">
                    <DeleteIcon fontSize="inherit" onClick={deleteCategory} />
                </IconButton>
            </Container>
        </>
    )
}

export default Category
