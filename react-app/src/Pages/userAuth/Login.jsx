import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline' //cssbaseline component for the footer that is used to make the footer look better
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid' //the grid component is used to create a grid layout for the sign up page
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container' // the container component is used to center the content of the page
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { SignIn, setToken } from '../../store/auth'
import { useSelector, useDispatch } from 'react-redux'
import axios, { setAxiosToken } from '../../axios'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../api'
import axiosInstance from '../../axios'
import { loginSchema, validateUser } from '../../Validations/LoginValidation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IconButton, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import { useTranslation } from 'react-i18next'
import '../../i18n'

function Copyright(props) {
    //copyright component for footer that returns a typography component that dynamically changes the copyright year

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}

            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const theme = createTheme() //creates a theme for the app to use

export default function Login() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const options = ['English', 'كوردى']
    const open = Boolean(anchorEl)
    const [inputEmail, setInputEmail] = useState('') //initializes the state for the input text
    const [password, setPassword] = useState('')
    const auth = useSelector((state) => state.authentication) //uses the redux store to get the user, we dont need to specify the slice because we are using the entire store
    const dispatch = useDispatch() //uses the redux dispatch to dispatch the actions
    let navigate = useNavigate() //uses the navigate hook to navigate to the home page
    const location = useLocation() //uses the location hook to get the current location
    const { t, i18n } = useTranslation()

    // let from = location.state?.from?.pathname || "/dashboard/questions"; //gets the location of the page that the user came from
    // //if the user came from the sign up page, the user will be redirected to the home page

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = (e) => {
        setAnchorEl(null)

        switch (e.target.value) {
            case 0:
                i18n.changeLanguage('eng') //change language to english if the user clicks on english language icon
                break
            case 1:
                i18n.changeLanguage('krd')
                break
        }
    }
    const getUsers = async () => {
        try {
            const { data } = await axiosInstance({
                method: 'get',
                url: baseUrl + '/auth/self'
            })

            dispatch(SignIn(data?.user))
            // setUsers(data)
            // console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    const notify = () => toast('Unsuccessful .')
    const handleSubmit = async (event) => {
        event.preventDefault() //so stuff doesnt refresh when clicked on the submit button
        //create object
        try {
            const user = {
                email: inputEmail,
                password: password
            }
            console.log(user)
            const isValid = await validateUser(user, loginSchema)

            console.log('isValid', isValid)

            // TODO: display validation errors
            if (!isValid)
                return toast.error('🦄 Incorrect password or email!', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })

            console.log(notify)
            const response = await axiosInstance({
                method: 'post',
                url: baseUrl + '/auth/login',
                data: {
                    email: inputEmail,
                    password: password
                }
            })

            setAxiosToken(response.data.access)
            dispatch(setToken(response.data.access)) //dispatches the action to set the token in the redux store to the token that was returned from the server
            getUsers()
        } catch (error) {
            console.log('error')
            console.log('error logging in')
        }
        //validate the object
        // const validation = LoginValidation(user)
        // console.log(validation)
    }

    React.useEffect(() => {
        //if authenitication is true, navigate to the location that we came from or go to the dashboard questions
        if (auth.isAuthenticated) {
            navigate(location?.state?.from?.pathname || '/dashboard/questions')
        }
    }, [auth.isAuthenticated])

    return (
        <ThemeProvider theme={theme}>
            <Tooltip title="Language">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{
                        color: 'black',
                        marginRight: '10px',
                        cursor: 'pointer',
                        ml: 2,
                        marginTop: '10px'
                    }}
                    color="inherit"
                >
                    <LanguageIcon />
                </IconButton>
            </Tooltip>
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
                    <Avatar sx={{ m: 1, bgcolor: '' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {t('signIn.signin')}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label={t('signIn.email')}
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={inputEmail}
                                onChange={(e) => setInputEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={t('signIn.password')}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                {t('signIn.signin')}
                            </Button>

                            <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                        </Box>
                    </form>
                    <Box>
                        <Grid container>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {t('signIn.notSingin')}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Copyright sx={{ mt: 8, mb: 4 }} />

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    // onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0
                            }
                        }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {options.map((option, index) => (
                        <MenuItem key={option} value={index} onClick={handleClose}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </Container>
        </ThemeProvider>
    )
}
