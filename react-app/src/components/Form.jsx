import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import axiosInstance from '../axios'
import { baseUrl } from '../api'

export default function Form() {
    const [description, setDescription] = useState('')
    const [question, setQuestion] = useState()

    // const postQuestions = async () => {
    //     try {
    //         const response = await axiosInstance({
    //             method: 'post',
    //             url: baseUrl + '/questions',
    //             data: {
    //                 question: question,
    //                 description: description,
    //                 categoryId: '1'
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' }
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Title of question"
                    variant="outlined"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <TextField
                    label="description"
                    variant="outlined"
                    multiline
                    maxRows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Box>
            <Button
                sx={{ m: 2 }}
                onClick={() => {
                    // postQuestions()
                }}
            >
                SUBMIT
            </Button>
        </>
    )
}
