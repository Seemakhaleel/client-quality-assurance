import { Box, Chip, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../Pages/Questions/Alert'
import { hover } from '@testing-library/user-event/dist/hover'

export default function Cards({ questions }) {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories(setCategories)
    }, [])

    // console.log(categories[0].name)
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {questions.map((ques) => (
                        <Card
                            key={ques.id}
                            onClick={() => {
                                return navigate('/dashboard/questions/' + ques.id)
                            }}
                            sx={{
                                cursor: 'pointer',
                                my: 2,
                                boxShadow: '0px 15px 25px rgba(50, 50, 50, 0.4)'
                            }}
                        >
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {new Date(ques.dateCreated).toDateString()}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {ques.question}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {ques.description}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary" component="span">
                                    <Chip
                                        color="primary"
                                        label={categories.map((cat) => (cat.id === ques.categoryId ? cat.name : null))} //  this map is to get the category name from the categories array
                                    />
                                </Typography>

                                <CardActions>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            marginLeft: 120,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Answers
                                    </Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Grid>

            {/* <Container sx={{ marginTop: 10 }}>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        {questions.map((ques) => (
                            <Box
                                component="span"
                                sx={{
                                    minWidth: 275,
                                    marginTop: 5,
                                    marginLeft: 50,
                                    padding: 1,
                                    width: 200
                                }}
                                key={ques.id}
                                onClick={() => {
                                    return navigate('/dashboard/questions/' + ques.id)
                                }}
                            >
                                <Card variant="bold" sx={{ width: 600, height: 200 }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {ques.question}
                                        </Typography>

                                        <Typography variant="body2">
                                            {ques.description}
                                            <br />
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="huge">answers</Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Container> */}
        </>
    )
}
