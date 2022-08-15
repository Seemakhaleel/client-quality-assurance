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
import AddCircleIcon from '@mui/icons-material/AddCircle'

import { Container } from '@mui/system'
import React from 'react'
import axios from '../../axios'
import { baseUrl } from '../../api'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    let navigate = useNavigate()
    const [category, setCategories] = React.useState([])
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')

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
    const postCategories = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: baseUrl + '/categories',
                data: {
                    name: title,
                    description: description
                }
            })
            categoryQuestion()

            console.log(response + 'this is post categories')
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        categoryQuestion()
    }, [])

    return (
        <Container sx={{ marginTop: 8, marginLeft: 2, mx: 30 }}>
            <Box
                p={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
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
            <Box
                p={2}
                sx={{
                    margin: '10px'
                }}
            >
                <TextField label="Name" value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

                <Button
                    sx={{
                        marginTop: '1rem',
                        color: 'black'
                    }}
                    onClick={() => {
                        postCategories()
                        setTitle('')
                    }}
                >
                    {' '}
                    <AddCircleIcon /> Add Category
                </Button>
            </Box>
        </Container>
    )
}

export default Categories
