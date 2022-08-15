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
import userProfile from '../user.png'
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import { useTranslation } from 'react-i18next'
import '../i18n'

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
    textDecoration: 'none',
    marginTop: 20
}))

export default function DashBoard(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const options = ['English', 'كوردى']

    const auth = useSelector((state) => state.authentication)
    const { window } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const open = Boolean(anchorEl)
    const { t, i18n } = useTranslation() //useTranslation is a hook that returns the current language and the function to change the language

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

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
    console.log(i18n.language)
    // console.log(t('navbar.privacypolicy'))

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const drawer = (
        <>
            <Box
                sx={{ mb: 5, mx: 2.5, mt: 2, cursor: 'pointer' }}
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
            <Divider />

            <List>
                <ListItem
                    disablePadding
                    onClick={() => {
                        navigate('/dashboard/questions')
                    }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <QuestionAnswerIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={t('dashboard.Questions')} />
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
                                <RecentActorsIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary={t('dashboard.ListOfUsers')} />
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
                            <CategoryIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={t('dashboard.QuestionCategories')} />
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
                                <PeopleIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary={t('dashboard.Roles')} />
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
                            <LogoutIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={t('dashboard.Logout')} />
                    </ListItemButton>
                </ListItem>
                <Divider />
            </List>
        </>
    )
    const container = window !== undefined ? () => window().document.body : undefined

    return (
        <>
            <Box sx={{ dispaly: 'flex', backgroundColor: '#eeeeee', height: '200vh' }} dir={t('dashboard.direction')}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar
                        position="fixed"
                        sx={{
                            width: { sm: `calc(100% - ${drawerWidth}px)` },
                            ml: { sm: `${drawerWidth}px` },
                            backgroundColor: '#eeeeee'
                        }}
                    >
                        <Toolbar
                            sx={{
                                pr: '24px',
                                color: 'black' // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { sm: 'none' } }}
                            >
                                <MenuIcon sx={{ color: 'black' }} />
                            </IconButton>

                            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                                {t('dashboard.title')}
                            </Typography>
                            {/* //////////////////////////////////////////////// */}

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
                                        ml: 2
                                    }}
                                    color="inherit"
                                >
                                    <LanguageIcon />
                                </IconButton>
                            </Tooltip>

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
                            {/* ////////////////////////////////////////////////// */}
                        </Toolbar>
                    </AppBar>
                </Box>
                <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth
                            }
                        }}
                    >
                        {drawer}
                    </Drawer>

                    <Drawer
                        PaperProps={{
                            sx: {
                                backgroundColor: '#1D2D44',
                                color: 'white'
                            }
                        }}
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box'
                            }
                        }}
                        variant="permanent"
                        anchor="left"
                    >
                        <Box
                            sx={{ mb: 5, mx: 2.5, mt: 2, cursor: 'pointer' }}
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
                        <Divider />

                        <List>
                            <ListItem
                                disablePadding
                                onClick={() => {
                                    navigate('/dashboard/questions')
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <QuestionAnswerIcon sx={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={t('dashboard.Questions')} />
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
                                            <RecentActorsIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={t('dashboard.ListOfUsers')} />
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
                                        <CategoryIcon sx={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={t('dashboard.QuestionCategories')} />
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
                                            <PeopleIcon sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={t('dashboard.Roles')} />
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
                                        <LogoutIcon sx={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={t('dashboard.Logout')} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </List>
                    </Drawer>
                </Box>

                <Outlet />
            </Box>

            {/* </ThemeProvider> */}
        </>
    )
}
