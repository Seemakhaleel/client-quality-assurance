import { Button, Dialog, DialogTitle, Typography } from '@mui/material'
import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import axiosInstance from '../../axios'
import { baseUrl } from '../../api'

export default function Alert(props) {
    const { openPopup, setOpenPopup } = props
    const [description, setDescription] = useState('')
    const [question, setQuestion] = useState('')
    const [isClosed, setIsClosed] = useState(false)
    const [hasBestAnswer, setHasBestAnswer] = useState(false)
    const [categoryId, setCategoryId] = useState('')
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

            setOpenPopup(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
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

                <TextField
                    label="React=1 typescript=2"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
            </Box>
            <Box m={2}>
                <Button onClick={postQuestions}>Add</Button>
            </Box>
        </Dialog>
    )
}
