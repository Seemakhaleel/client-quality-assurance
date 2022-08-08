import React, { useEffect } from 'react'
import { useState } from 'react'
import Cards from '../../components/Cards'

import Alert from './Alert'
import { Container } from '@mui/system'
import { Button, Grid } from '@mui/material'
import axiosInstance from '../../axios'
import { baseUrl } from '../../api'
import axios from '../../axios'
// import { getQuestions } from '../../../src/Service'

import Typography from '@mui/material/Typography'

const Questions = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [question, setQuestion] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [isClosed, setIsClosed] = useState(false)
    const [hasBestAnswer, setHasBestAnswer] = useState(false)
    const [questions, setQuestions] = useState([])

    const getQuestions = async () => {
        try {
            const response = await axiosInstance({
                method: 'get',
                url: baseUrl + '/questions'
            })
            console.log(response.data.questions)
            setQuestions(response.data.questions) //response.data.questions is an array of questions objects with the properties of questionId, question, and answers
        } catch (error) {
            console.log('error')
        }
    }
    // const test = async () => {
    //     const response = await getQuestions()
    //     console.log(response.data.questions, 'rrrrrrrrrrrrrrrr')
    //     setQuestions(response.data.questions)
    // }

    React.useEffect(() => {
        getQuestions()
    }, [])

    // const postQuestions = async () => {
    //     try {
    //         const response = await axios({
    //             method: 'post',
    //             url: baseUrl + '/questions',
    //             data: {
    //                 question: question,
    //                 description: description,
    //                 categoryId: categoryId,

    //                 isClosed: isClosed,
    //                 hasBestAnswer: hasBestAnswer
    //             }
    //         })
    //         getQuestions()
    //         setOpenPopup(false)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <>
            <Container sx={{ marginTop: 10, marginLeft: 2 }}>
                <Grid container>
                    <Typography variant="h5" component="h1">
                        Questions
                    </Typography>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <Button
                            sx={{ float: 'right' }}
                            variant="contained"
                            onClick={() => {
                                setOpenPopup(true)
                            }}
                        >
                            Ask a Question
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Cards questions={questions} description={description} />
                    </Grid>
                </Grid>
            </Container>
            <Alert openPopup={openPopup} setOpenPopup={setOpenPopup}></Alert>
        </>
    )
}
export default Questions
