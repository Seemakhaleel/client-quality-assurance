import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axios'
import { baseUrl } from '../../api'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { useNavigate, useParams } from 'react-router-dom'

import { TextField, Button, Dialog, DialogTitle, Typography } from '@mui/material'

const EditAlert = ({ oneQuestion, getOneQuestion, setOpen, open }) => {
    const [editQs, setEditQs] = React.useState(oneQuestion?.question)
    const [editDesc, setEditDesc] = React.useState(oneQuestion?.description)
    const [categoryId, setCategoryId] = useState(oneQuestion.categoryId)

    const { id } = useParams()
    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false)
    }

    const UpdateQuestions = async () => {
        try {
            const response = await axiosInstance({
                method: 'put',
                url: baseUrl + '/questions/' + id,
                data: {
                    question: editQs,
                    description: editDesc,
                    categoryId: categoryId
                }
            })

            setOpen(false)
            getOneQuestion()
        } catch (error) {
            console.log(error)
        }
    }
    console.log(oneQuestion?.question, 'oneQuestion')

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <DialogContentText>you can edit the description and title of the question</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        variant="standard"
                        label="Title"
                        defaultValue={oneQuestion?.question}
                        onChange={(e) => {
                            setEditQs(e.target.value)
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="description"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={oneQuestion?.description}
                        onChange={(e) => setEditDesc(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={() => {
                            UpdateQuestions()
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditAlert
