import React from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import axiosInstance from '../../axios'
import { baseUrl } from '../../api'
import CssBaseline from '@mui/material/CssBaseline'

import { Grid, Card, CardContent, CardActions, Checkbox, Container } from '@mui/material'

const Question = () => {
    const [inputText, setInputText] = useState('')
    const [answers, setAnswers] = useState([])
    const [oneQuestion, setOneQuestion] = useState([])
    const [answer, setAnswer] = useState([])

    const { id } = useParams()
    console.log(id)
    const handleSubmit = (e) => {
        e.preventDefault()
        setAnswers([...answers, inputText])
        console.log(inputText)
        setInputText('')
    }
    const getQuestions = async () => {
        try {
            const response = await axiosInstance({
                method: 'get',
                url: `${baseUrl}/questions/${id}`
            })

            setOneQuestion(response.data.question)
        } catch (error) {
            console.log('error')
        }
    }

    const getAnswers = async () => {
        try {
            const response = await axiosInstance({
                method: 'get',
                url: `${baseUrl}/questions/${id}/answers`
            })

            setAnswer(response.data.answers)
        } catch (error) {
            console.log('error')
        }
    }

    const postAnswer = async () => {
        try {
            const response = await axiosInstance({
                method: 'post',
                url: baseUrl + '/answers',
                data: {
                    answer: answer,
                    questionId: id
                }
            })

            console.log(response)
        } catch (error) {
            console.log('error')
        }
    }

    React.useEffect(() => {
        getQuestions()
    }, [])

    return (
        <>
            <Container sx={{ marginTop: 10, marginLeft: 2 }}>
                <CssBaseline />
                <Grid container>
                    <form onSubmit={handleSubmit}>
                        <Grid item xs={12}>
                            <Card sx={{ m: 1 }} variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="h1">
                                        Question :
                                    </Typography>
                                    <Typography>{oneQuestion?.question}</Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="h5" component="h1">
                                        description :{' '}
                                    </Typography>
                                    <Typography>{oneQuestion?.description}</Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="h5" component="h1">
                                        category:{' '}
                                    </Typography>
                                    <Typography>{oneQuestion?.categoryId}</Typography>
                                </CardContent>

                                <CardActions>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => {
                                            axiosInstance({
                                                method: 'delete',
                                                url: `${baseUrl}/questions/${id}`
                                            })
                                        }}
                                    >
                                        Delete this question
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item xs={12}></Grid>

                        <Grid item xs={8}>
                            <TextField
                                placeholder="Answer "
                                multiline
                                maxRows={4}
                                variant="outlined"
                                fullWidth
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />

                            <Grid item xs={12}>
                                <Button variant="contained" onClick={() => postAnswer()} sx={{ m: 2 }}>
                                    POST
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Container>
        </>
    )
}

export default Question
