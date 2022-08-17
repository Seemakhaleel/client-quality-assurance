import React, { useEffect } from 'react'
import { useState } from 'react'
import Cards from '../../components/Cards'
import Alert from './Alert'
import { Container } from '@mui/system'
import { Button, createTheme, Grid, Pagination, ThemeProvider } from '@mui/material'
import axiosInstance from '../../axios'
import { baseUrl } from '../../api'
import axios from '../../axios'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
const limit = 4 //number of questions to show per page, we have 8 questions so 8/2 = 4 questions per page and we have 4 pages
const getTotalNumberOfPages = (dataLength) => Math.ceil(dataLength / limit) //dataLength is the length of the array of questions objects which rn is 8

const paginateList = (unPaginatedList, page, limit) => {
    const paginatedList = [] //array of questions objects that are paginated
    const startingItemIndex = (page - 1) * limit //startingItemIndex is the index of the first item in the paginated list
    const endingItemIndex = startingItemIndex + (limit - 1)

    for (let i = startingItemIndex; i < unPaginatedList.length; i++) {
        paginatedList.push(unPaginatedList[i])
        if (i === endingItemIndex) break
    }

    return paginatedList ///returns an array of questions objects that are paginated
}

const Questions = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [description, setDescription] = useState('')
    const [questions, setQuestions] = useState([])
    const [visibleQuestions, setVisibleQuestions] = useState([])
    const [page, setPage] = useState(1)
    const { t } = useTranslation()

    const getQuestions = async () => {
        try {
            const response = await axiosInstance({
                method: 'get',
                url: baseUrl + '/questions'
            })
            // console.log(response.data.questions)
            setQuestions(response.data.questions) //response.data.questions is an array of questions objects with the properties of questionId, question, and answers
            setVisibleQuestions(paginateList(response.data.questions, page, limit)) // paginateList is a function that takes an array of questions objects and returns an array of questions objects that are paginated
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
            <Container sx={{ mx: 30, marginTop: 8 }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h1">
                            {t('dashboard.Questions')}
                        </Typography>

                        <Button
                            sx={{ float: 'right' }}
                            variant="contained"
                            onClick={() => {
                                setOpenPopup(true)
                            }}
                        >
                            {t('dashboard.AskQuestion')}
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Cards questions={visibleQuestions} description={description} />
                    </Grid>
                    <Grid item xs={12}>
                        <Pagination
                            page={page}
                            onChange={(event, page) => {
                                console.log('page', page)
                                setPage(page)
                                setVisibleQuestions(paginateList(questions, page, limit))
                            }}
                            color="primary"
                            count={getTotalNumberOfPages(questions.length)}
                        />
                    </Grid>
                </Grid>
            </Container>
            <Alert openPopup={openPopup} setOpenPopup={setOpenPopup}></Alert>
        </>
    )
}
export default Questions
