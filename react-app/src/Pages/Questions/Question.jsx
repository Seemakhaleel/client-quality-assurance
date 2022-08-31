import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import axiosInstance from '../../axios'
import { baseUrl } from '../../api'
import CssBaseline from '@mui/material/CssBaseline'
import { Grid, Card, CardContent, Container, List, ListItem, IconButton, ListItemText, CardHeader } from '@mui/material'
import EditAlert from './EditAlert'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useTheme } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const Question = () => {
    const [oneQuestion, setOneQuestion] = useState({})
    const [oneanswer, setOneAnswer] = useState([])
    const [postAnswer, setPostAnswer] = useState('')
    const [openEditDialog, setOpenEditDialog] = React.useState(false)
    const [bestAnswe, setBestAnswer] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     setAnswers([...answers, inputText])
    //     console.log(inputText)
    //     setInputText('')
    // }

    // function handleChange(event) {
    //     // handle change for select input (role)
    //     console.log(event.target.value)
    //     setChoosedCategory(event.target.value)
    // }
    // const getCategories = async () => {
    //     try {
    //         const { data } = await axiosInstance({
    //             method: 'get',
    //             url: baseUrl + '/categories'
    //         })
    //         setCategoryList(data?.data)
    //     } catch (errro) {
    //         console.log('not successful')
    //     }
    // }
    const getOneQuestion = async () => {
        // get one question from the database when we click on the question
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

    const getQuestions = async () => {
        // get all questions from the database and I have used here for refreshing the page
        try {
            const response = await axiosInstance({
                method: 'get',
                url: baseUrl + '/questions'
            })
            console.log(response.data.questions)
        } catch (error) {
            console.log('error')
        }
    }

    const getAnswers = async () => {
        try {
            const response = await axiosInstance({
                method: 'get',
                url: baseUrl + '/answers'
            })
            console.log(response.data?.answers, 'HIiiiiii')
            setOneAnswer(response.data?.answers)
        } catch (error) {
            console.log('error')
        }
    }

    const postAnAnswer = async () => {
        try {
            const response = await axiosInstance({
                method: 'post',
                url: baseUrl + '/answers',
                data: {
                    answer: postAnswer,
                    questionId: id
                }
            })
            getAnswers()
            console.log(response)
        } catch (error) {
            console.log('error')
        }
    }
    // const UpdateQuestion= async () => {
    //     try {
    //         const {data}= await axiosInstance({
    //             method: 'put',
    //             url: baseUrl + '/questions' + id,
    //             data: {
    //                question: question,
    // description: description
    //                categoryId:

    //             }
    //         })
    //         console.log(response + 'HIiiiiii')
    //     } catch (error) {
    //         console.log('error')
    //     }
    // }

    const deleteAnswer = async (id) => {
        try {
            const { data } = await axiosInstance({
                method: 'delete',
                url: baseUrl + '/answers/' + id
            })
            console.log(data, 'Hello delete')
            getAnswers()
        } catch (error) {
            console.log('not successful')
        }
    }
    const deleteQuestion = async (id) => {
        try {
            const { data } = await axiosInstance({
                method: 'delete',
                url: baseUrl + '/questions/' + id
            })

            getQuestions()
        } catch (error) {
            console.log('not successful')
        }
    }
    const bestAnswer = async () => {
        try {
            const { data } = await axiosInstance({
                method: 'put',
                url: baseUrl + '/answers/' + '/set-as-best-answer'
            })
            console.log(data?.answer, 'Hell000000000000')
            setBestAnswer(data?.answer)
            getAnswers()
        } catch {
            console.log('error choosing best answer')
        }
    }

    React.useEffect(() => {
        getOneQuestion()
        getAnswers()
        bestAnswer()
    }, [])

    const handleClickOpen = () => {
        setOpenEditDialog(true)
        console.log('Hello')
    }
    const theme = useTheme()

    return (
        <>
            <Container>
                <CssBaseline />
                <Grid container>
                    <form>
                        <Grid item xs={12}>
                            <Card variant="outlined">
                                <CardHeader
                                    action={
                                        <>
                                            <IconButton
                                                sx={{ color: theme.palette.primary.main }}
                                                onClick={handleClickOpen}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                sx={{ color: theme.palette.secondary.main }}
                                                color="secondary"
                                                onClick={() => {
                                                    deleteQuestion(oneQuestion?.id)
                                                    navigate('/dashboard/questions')
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    }
                                    subheader={new Date(oneQuestion.created_at).toDateString()}
                                    title={oneQuestion?.title}
                                    // disableTypography={false}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: '40',
                                            fontSize: '0.9rem',
                                            lineHeight: '1.167',
                                            letterSpacing: '-0.01562em'
                                        }}
                                    >
                                        Question :
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {oneQuestion?.question}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: '0.9rem',
                                            lineHeight: '1.167',
                                            letterSpacing: '-0.01562em'
                                        }}
                                    >
                                        description :{' '}
                                    </Typography>
                                    <Typography variant="h6">{oneQuestion?.description}</Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: '100',
                                            fontSize: '1rem',
                                            lineHeight: '1.167',
                                            letterSpacing: '-0.01562em'
                                        }}
                                    >
                                        category:{' '}
                                    </Typography>
                                    <Typography variant="h6">{oneQuestion?.categoryId}</Typography>
                                </CardContent>

                                {openEditDialog && (
                                    <EditAlert
                                        openEditDialog={openEditDialog}
                                        setOpenEditDialog={setOpenEditDialog}
                                        getOneQuestion={getOneQuestion}
                                        oneQuestion={oneQuestion}
                                    />
                                )}

                                <Grid item xs={12}>
                                    <Card sx={{ m: 1 }}>
                                        <CardContent>
                                            <Typography variant="h6">Answers :</Typography>
                                            {oneanswer
                                                .filter((answer) => answer?.questionId == id)
                                                .map((answer) => (
                                                    <List key={answer?.id}>
                                                        <ListItem>
                                                            <ListItemText>{answer?.answer}</ListItemText>
                                                            <Grid item xs={2}>
                                                                <ListItem>
                                                                    <IconButton edge="end">
                                                                        <ThumbUpIcon />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        edge="end"
                                                                        onClick={() => {
                                                                            deleteAnswer(answer?.id)
                                                                        }}
                                                                    >
                                                                        <DeleteOutlineIcon />
                                                                    </IconButton>
                                                                </ListItem>
                                                            </Grid>
                                                        </ListItem>
                                                    </List>
                                                ))}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Card>
                        </Grid>

                        <Grid item xs={8}>
                            <TextField
                                placeholder="Answer "
                                multiline
                                maxRows={4}
                                variant="outlined"
                                fullWidth
                                value={postAnswer}
                                onChange={(e) => setPostAnswer(e.target.value)}
                            />

                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        postAnAnswer()
                                        setPostAnswer('')
                                    }}
                                    sx={{ m: 1 }}
                                >
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
