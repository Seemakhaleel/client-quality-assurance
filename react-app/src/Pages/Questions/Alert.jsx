import {
    Button,
    colors,
    createTheme,
    Dialog,
    DialogTitle,
    MenuItem,
    Select,
    ThemeProvider,
    Typography
} from '@mui/material'
import { Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axios'
import { baseUrl } from '../../api'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { useNavigate, useParams } from 'react-router-dom'
import Categories from '../Categories/Categories'

export const getCategories = async (setData) => {
    try {
        const response = await axiosInstance({
            method: 'get',
            url: baseUrl + '/categories'
        })

        setData(response.data.categories)
    } catch (error) {
        console.log(error)
    }
}

export default function Alert(props) {
    const { getQuestions, openPopup, setOpenPopup } = props
    const [description, setDescription] = useState('')
    const [question, setQuestion] = useState('')
    const [isClosed, setIsClosed] = useState(false)
    const [hasBestAnswer, setHasBestAnswer] = useState(false)
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])
    const [choosedCategory, setChoosedCategory] = useState([])

    function handleChange(event) {
        setCategoryId(event.target.value)
    }
    const theme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 6,

                        '&:hover': {
                            backgroundColor: ' #80d8ff',
                            color: 'white'
                        },
                        backgroundColor: ' #212227'
                    }
                }
            }
        }
    })

    const postQuestions = async () => {
        try {
            const response = await axiosInstance({
                method: 'post',
                url: baseUrl + '/questions',
                data: {
                    question: question,
                    description: description,
                    categoryId: categoryId,
                    isClosed: isClosed,
                    hasBestAnswer: hasBestAnswer
                }
            })
            getQuestions()
            setOpenPopup(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories(setCategories)
    }, [])

    return (
        <>
            <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
                <DialogTitle>Add Question</DialogTitle>
                <Box m={2}>
                    <TextField
                        label="Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                    {categories.length > 0 && (
                        <Select
                            defaultValue=" "
                            value={choosedCategory}
                            label="role"
                            displayEmpty
                            multiple
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            fullWidth
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                </Box>
                <Box m={2}>
                    <ThemeProvider theme={theme}>
                        <Button
                            onClick={() => {
                                postQuestions()
                            }}
                        >
                            Add
                        </Button>
                    </ThemeProvider>
                </Box>
            </Dialog>
        </>
    )
}
