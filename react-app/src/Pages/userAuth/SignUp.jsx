import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useState } from 'react'
import axios, { setAxiosToken } from '../../axios'
import { baseUrl } from '../../api'
import { setToken } from '../../store/auth'
import { useDispatch } from 'react-redux'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}

            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const theme = createTheme()

export default function SignUp() {
    const [inputEmail, setInputEmail] = useState('') //initializes the state for the input text
    const [password, setPassword] = useState('')
    const [role, setRole] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setRole(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            email: data.get('email'),
            password: data.get('password')
        })
    }

    // const roles = async () => {
    //     try {
    //         const response = await axios({
    //             method: 'get',
    //             url: baseUrl + 'users/register'
    //         })

    //         // call /auth/self to ger the currentUser

    //         setAxiosToken(response.data.access)
    //         dispatch(setToken(response.data.access)) //dispatches the action to set the token in the redux store to the token that was returned from the server
    //     } catch (error) {
    //         console.log('error logging in')
    //     }
    // }

    const signup = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: baseUrl + '/users/register',
                data: {
                    role: role,
                    firstName: firstName,
                    lastName: lastName,
                    displayName: firstName + ' ' + lastName,
                    password: password,
                    email: email
                }
            })

            // call /auth/self to ger the currentUser

            setAxiosToken(response.data.access)
            dispatch(setToken(response.data.access)) //dispatches the action to set the token in the redux store to the token that was returned from the server
        } catch (error) {
            console.log('error logging in')
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={role}
                                            label="role"
                                            onChange={handleChange}
                                        >
                                            // get role name from list of roles and put it inside value
                                            <MenuItem value={10}>qa-engineer</MenuItem>
                                            <MenuItem value={20}>Software engineer</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => signup()}
                            >
                                Sign Up
                            </Button>
                        </form>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    )
}
