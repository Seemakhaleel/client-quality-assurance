import {
    Button,
    Checkbox,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Box,
    TextField,
    Typography,
    ListItemButton
} from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import axios from '../../axios'
import { baseUrl } from '../../api'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    let navigate = useNavigate()
    const [category, setCategories] = React.useState([])

    const categoryQuestion = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: baseUrl + '/categories'
            })
            console.log(response.data.categories)
            setCategories(response.data.categories)
        } catch (error) {
            console.log('error')
        }
    }
    // const postCategories = async () => {
    //     try {
    //         const response = await axios({
    //             method: 'post',
    //             url: baseUrl + '/categories',
    //             data: {
    //                 name: 'name',
    //                 description: 'description'
    //             }
    //         })
    //         console.log(response + 'hiiiiiii')
    //         setAxiosToken(response.data.access)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    React.useEffect(() => {
        categoryQuestion()
    }, [])
    // const deleteCategory = async () => {
    //     //doesnt work yet
    //     try {
    //         const response = await axios({
    //             method: 'delete',
    //             url: baseUrl + '/categories/' + id
    //         })
    //         setAxiosToken(response.data.access)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <Container sx={{ marginTop: 10, marginLeft: 2 }}>
            <Box
                p={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid gray'
                }}
            >
                <Typography variant="h4"> Question Categories</Typography>
                {category.map((category) => (
                    <ListItem>
                        <ListItemButton
                            key={category.id}
                            onClick={() => navigate('/dashboard/categories/' + category.id)}
                        >
                            <ListItemText primary={category.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </Box>
        </Container>
    )
}

export default Categories
