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
import { Link, useNavigate } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useState } from 'react'
import axios from '../../axios'
import { baseUrl } from '../../api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IconButton, Menu, Tooltip } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import { useTranslation } from 'react-i18next'
import '../../i18n'
import { signupSchema, validateUser } from '../../Validations/LoginValidation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
    // const [password, setPassword] = useState('') // we dont need because we will use hook form
    // const [role, setRole] = React.useState('')
    // const [firstName, setFirstName] = React.useState('')
    // const [lastName, setLastName] = React.useState('')
    // const [email, setEmail] = React.useState('')
    // const [roles, setRoles] = React.useState([])
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(signupSchema)
    })

    const navigate = useNavigate()
    const { t, i18n } = useTranslation()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const options = ['English', 'كوردى']
    const [roles, setRoles] = React.useState([])
    const [role, setRole] = React.useState([])
    const open = Boolean(anchorEl)
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

    function handleChange(event) {
        // handle change for select input (role)
        console.log(event.target)
        setRole(event.target.value)
    }
    const onSubmit = async (data) => {
        console.log(data)
        submitForm(data)
    }
    const submitForm = async (data) => {
        // const data = new FormData(event.currentTarget)
        // data.forEach(function (value, key) {
        //     user[key] = value
        // })

        const isValid = await validateUser(data, signupSchema)

        console.log('isValid', isValid)

        // TODO: display validation errors
        if (!isValid)
            return toast.error('🦄 wrong entry!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })

        try {
            const response = await axios({
                method: 'post',
                url: baseUrl + '/users/register',
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                    role: data.role,
                    displayName: data.displayName
                }
            })

            navigate('/')
        } catch (error) {
            console.log('error logging in')
        }
    }

    const getRoles = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: baseUrl + '/roles'
            })
            // console.log({ response })
            setRoles(response.data.roles)
        } catch (error) {
            console.log('error logging in')
        }
    }

    React.useEffect(() => {
        getRoles()
    }, [])

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
                    <Avatar sx={{ m: 1 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {t('signUp.signup')}
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        {/* <form onSubmit={handleSubmit(submitForm)}> */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label={t('signUp.firstName')}
                                    autoFocus
                                    {...register('firstName')}
                                    error={errors.firstName?.message ? true : false}
                                    helperText={errors.firstName?.message}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label={t('signUp.lastName')}
                                    name="lastName"
                                    autoComplete="family-name"
                                    {...register('lastName')}
                                    error={errors.lastName?.message ? true : false}
                                    helperText={errors.lastName?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label={t('signUp.email')}
                                    name="email"
                                    autoComplete="email"
                                    {...register('email')}
                                    error={errors.email?.message ? true : false}
                                    helperText={errors.email?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label={t('signUp.password')}
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...register('password')}
                                    error={errors.password?.message ? true : false}
                                    helperText={errors.password?.message}
                                />
                            </Grid>
                            {/* <Typography> {errors?.password?.message}</Typography> */}
                            {/* <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="Confirm password"
                                        label={t('signUp.ConfirmPassword')}
                                        type="password"
                                        id=" confirm password"
                                        autoComplete="new-password"
                                        {...register}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Typography> {errors?.confirmPassword && 'Passwords should match!'}</Typography> */}
                            <Grid item xs={12}>
                                <InputLabel id="demo-simple-select-label">{t('signUp.Roles')} </InputLabel>
                                <Select
                                    value={role}
                                    label={t('signUp.Roles')}
                                    onChange={handleChange}
                                    fullWidth
                                    name="role"
                                    {...register('role')}
                                    error={errors.role?.message ? true : false}
                                    helperText={errors.role?.message}
                                >
                                    {roles?.map((role, index) => (
                                        <MenuItem key={index} value={role.name}>
                                            {role.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>

                        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit(onSubmit)}>
                            {t('signUp.signup')}
                        </Button>
                        {/* </form> */}

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/" variant="body2">
                                    {t('signUp.notSignup')}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Copyright sx={{ mt: 5 }} />
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
        </ThemeProvider>
    )
}
