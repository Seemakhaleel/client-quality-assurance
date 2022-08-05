import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import axiosInstance from '../../axios'
import { baseUrl } from '../../api'
import CssBaseline from '@mui/material/CssBaseline'
import { Grid, Card, CardContent, CardActions, Select, Container, InputLabel, MenuItem, Divider } from '@mui/material'

const Question = () => {
    // const [inputText, setInputText] = useState('')
    // const [answers, setAnswers] = useState([])
    const [oneQuestion, setOneQuestion] = useState([])
    const [oneanswer, setOneAnswer] = useState([])
    const [question, setQuestionTitle] = useState('')
    const [description, setDescription] = useState('')
    const [postAnswer, setPostAnswer] = useState('')

    const [categoryList, setCategoryList] = useState([]) //list of categories
    const [choosedCategory, setChoosedCategory] = useState(2) // the categories that the question belongs to
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
    const updateQuestion = async () => {
        try {
            const { data } = await axiosInstance({
                method: 'PUT',
                url: baseUrl + '/questions/' + id,
                data: {
                    question: {
                        question: question,
                        description: description,
                        categoryId: choosedCategory
                    }
                }
            })
            console.log(data, 'HIiiiiiiiiiiiiii')
            getOneQuestion()
        } catch (error) {
            console.log('not successful')
        }
    }

    // const deleteAnswer = async (id) => {
    //     try {
    //         const { data } = await axiosInstance({
    //             method: 'delete',
    //             url: baseUrl + '/answers/' + id
    //         })
    //         console.log(data, 'Hello delete')
    //         getAnswers()
    //     } catch (error) {
    //         console.log('not successful')
    //     }
    // }

    React.useEffect(() => {
        getOneQuestion()
        getAnswers()
    }, [])

    return (
        <>
            <Container sx={{ marginTop: 10, marginLeft: 2 }}>
                <CssBaseline />
                <Grid container>
                    <form>
                        <Grid item xs={12}>
                            <Card sx={{ m: 1, width: 800 }} variant="outlined">
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
                                        sx={{ marginLeft: 'auto', marginTop: 10 }}
                                        onClick={() => {
                                            axiosInstance({
                                                method: 'delete',
                                                url: `${baseUrl}/questions/${id}`
                                            })
                                            getQuestions()
                                            navigate('/dashboard/questions')
                                        }}
                                    >
                                        Delete this question
                                    </Button>
                                </CardActions>
                                {/* <Card>
                                    <Divider />
                                    <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                                        Edit the Question
                                    </Typography>
                                    <TextField
                                        label="Title"
                                        variant="outlined"
                                        value={question}
                                        onChange={(e) => setQuestionTitle(e.target.value)}
                                    />
                                    <TextField
                                        label="Content"
                                        variant="outlined"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            updateQuestion()
                                            navigate('/dashboard/questions')
                                        }}
                                        sx={{ m: 2 }}
                                    >
                                        UPDATE
                                    </Button>
                                    {/* <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    {categoryList.length > 0 && (
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={choosedCategory}
                                            label="role"
                                            onChange={(e) => {
                                                handleChange(e)
                                            }}
                                            fullWidth
                                        >
                                            {categoryList?.map((role, index) => (
                                                <MenuItem key={index} value={role?.attributes?.id}>
                                                    {role?.attributes?.id} : {role?.attributes?.name}
                                                </MenuItem>
                                            ))}
                                        </Select> */}
                                {/* )} */}
                                {/* </Card> */}
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
                                <Button variant="contained" onClick={() => postAnAnswer()} sx={{ m: 1 }}>
                                    POST
                                </Button>

                                <Grid item xs={12}>
                                    <Card sx={{ m: 1 }} variant="outlined">
                                        <CardContent>
                                            <Typography variant="h6">Answers :</Typography>
                                            {oneanswer
                                                .filter((answer) => answer?.questionId == id)
                                                .map((answer) => (
                                                    <li key={answer?.id}>{answer?.answer}</li>
                                                ))}
                                            {/* // {oneanswer?.map((answer, index) => (
                                            //     <Typography key={index}>{answer?.answer}</Typography>
                                            // ))} */}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Container>
        </>
    )
}

export default Question
