import {
    Button,
    Checkbox,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Box,
    TextField,
    Typography
} from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import axios, { setAxiosToken } from '../../axios'
import { baseUrl } from '../../api'
import { useParams } from 'react-router-dom'

const Categories = () => {
    const [checked, setChecked] = React.useState([0])
    const [onecategories, setCategories] = React.useState([])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }
    const categories = async () => {
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
        categories()
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
                    justifyContent: 'center'
                }}
            >
                <Typography variant="h4">Categories</Typography>
                {onecategories.map((category) => (
                    <ListItem key={category.id}>
                        <ListItemText primary={category.name} />
                        <ListItemText primary={category.description} />
                        <ListItemIcon>
                            <Checkbox
                                edge="end"
                                checked={checked.indexOf(category.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                onClick={handleToggle(category.id)}
                            />
                        </ListItemIcon>
                    </ListItem>
                ))}

                <Button
                    sx={{ m: 2 }}
                    onClick={() => {
                        // deleteCategory(checked)
                    }}
                >
                    Delete
                </Button>
            </Box>
            <Typography variant="h6"> Create a question category</Typography>
            <TextField label="Name" /> <TextField label="Description" />
            <Button>Add</Button>
        </Container>
    )
}

export default Categories
