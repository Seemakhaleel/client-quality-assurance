import * as React from 'react'
import { styled, createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link, useNavigate } from 'react-router-dom'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import RecentActorsIcon from '@mui/icons-material/RecentActors'
import { Outlet } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import CategoryIcon from '@mui/icons-material/Category'
import { useDispatch } from 'react-redux'
import { Logout } from '../store/auth'
import PeopleIcon from '@mui/icons-material/People'
import { useSelector } from 'react-redux'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import userProfile from '../userProfile.png'
import { Avatar } from '@mui/material'

const drawerWidth = 240

//this was the old theme where it wasnt permanent
// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open'
// })(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//     }),
//     ...(open && {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen
//         })
//     })
// }))
// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-end'
// }))

// const Drawer = styled(MuiDrawer, {
//     shouldForwardProp: (prop) => prop !== 'open'
// })(
//     //drawer is open when open is true and closed when open is false
//     ({ theme, open }) => ({
//         '& .MuiDrawer-paper': {
//             position: 'relative',
//             whiteSpace: 'nowrap',
//             width: drawerWidth,

//             transition: theme.transitions.create('width', {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.enteringScreen
//             }),
//             boxSizing: 'border-box',

//             ...(!open && {
//                 overflowX: 'hidden',
//                 transition: theme.transitions.create('width', {
//                     easing: theme.transitions.easing.sharp,
//                     duration: theme.transitions.duration.leavingScreen
//                 }),
//                 width: theme.spacing(7),
//                 [theme.breakpoints.up('sm')]: {
//                     width: theme.spacing(9)
//                 }
//             })
//         }
//     })
// )

// const mdTheme = createTheme() //theme provider is used to pass the theme to the components
const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: '#F9F9F9',
    textDecoration: 'none'
}))

export default function DashBoard() {
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)
    const auth = useSelector((state) => state.authentication)

    const handleDrawerOpen = () => {
        setOpen(!open)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>
            <Box sx={{ dispaly: 'flex', bgcolor: '#eeeeee', my: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar
                        position="fixed"
                        sx={{
                            width: `calc(100% - ${drawerWidth}px)`,
                            ml: `${drawerWidth}px`,
                            bgcolor: 'black'
                        }}
                    >
                        <Toolbar
                            sx={{
                                pr: '24px',
                                bgcolor: '#37474f' // keep right padding when drawer closed
                            }}
                        >
                            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                                AskAway
                            </Typography>

                            <IconButton
                                color="inherit"
                                onClick={() => {
                                    navigate('/dashboard/profile')
                                }}
                            >
                                <AccountCircleIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>

                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box'
                        }
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Box
                        sx={{ mb: 5, mx: 2.5 }}
                        onClick={() => {
                            navigate('/dashboard/profile')
                        }}
                    >
                        {/* <Link underline="none" to="#" sx={{ textDecoration: "none" }}> */}
                        <AccountStyle>
                            <Avatar src={userProfile} alt="photoURL" />
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                                    {auth?.user?.firstName}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {auth?.user?.role}
                                </Typography>
                            </Box>
                        </AccountStyle>
                        {/* </Link> */}
                    </Box>

                    <List>
                        <ListItem
                            disablePadding
                            onClick={() => {
                                navigate('/dashboard/questions')
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <QuestionAnswerIcon />
                                </ListItemIcon>
                                <ListItemText primary="Questions" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />

                        {auth?.user?.role === 'admin' && (
                            <ListItem
                                disablePadding
                                onClick={() => {
                                    navigate('/dashboard/users')
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <RecentActorsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="List of users" />
                                </ListItemButton>
                            </ListItem>
                        )}
                        <Divider />
                        <ListItem
                            disablePadding
                            onClick={() => {
                                navigate('/dashboard/categories')
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Question Categories" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />

                        {auth?.user?.role === 'admin' && (
                            <ListItem
                                disablePadding
                                onClick={() => {
                                    navigate('/dashboard/roles')
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="roles" />
                                </ListItemButton>
                            </ListItem>
                        )}
                        <Divider />

                        <ListItem
                            disablePadding
                            onClick={() => {
                                dispatch(Logout())
                                navigate('/')
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </List>
                    {/* </nav> */}
                    {/* </Box> */}
                </Drawer>

                <Outlet />

                <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }} />
            </Box>

            {/* </ThemeProvider> */}
        </>
    )
}
