import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import userProfile from '../user.png'
import { useSelector } from 'react-redux'
import { margin } from '@mui/system'
import { useTranslation } from 'react-i18next'
import LogoutIcon from '@mui/icons-material/Logout'
import CategoryIcon from '@mui/icons-material/Category'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import RecentActorsIcon from '@mui/icons-material/RecentActors'
import PeopleIcon from '@mui/icons-material/People'
import LanguageIcon from '@mui/icons-material/Language'
import { useDispatch } from 'react-redux'
import { Logout } from '../store/auth'
import { Menu, MenuItem, Tooltip } from '@mui/material'

const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: theme.palette.grey[200],
    textDecoration: 'none',
    padding: theme.spacing(2),
    margin: theme.spacing(1)
}))

const drawerWidth = 240

function Layout(props) {
    const { window } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { t, i18n } = useTranslation()
    const theme = useTheme()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const auth = useSelector((state) => state.authentication)

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const options = [
        { id: 'eng', name: 'English' },

        { id: 'krd', name: 'کوردی' }
    ]

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

    console.log({ location })

    const navItems = [
        {
            label: t('dashboard.Questions'),
            onClick: () => navigate('/dashboard/questions'),
            Icon: QuestionAnswerIcon,
            hasAccess: true,
            selected: location.pathname === '/dashboard/questions'
        },
        {
            label: t('dashboard.ListOfUsers'),
            onClick: () => navigate('/dashboard/users'),
            Icon: RecentActorsIcon,
            hasAccess: auth?.user?.role === 'admin',
            selected: location.pathname === '/dashboard/users'
        },
        {
            label: t('dashboard.QuestionCategories'),
            onClick: () => navigate('/dashboard/categories'),
            Icon: CategoryIcon,
            hasAccess: true,
            selected: location.pathname === '/dashboard/categories'
        },
        {
            label: t('dashboard.Roles'),
            onClick: () => navigate('/dashboard/roles'),
            Icon: PeopleIcon,
            hasAccess: auth?.user?.role === 'admin',
            selected: location.pathname === '/dashboard/roles'
        },
        {
            label: t('dashboard.Logout'),
            onClick: () => {
                dispatch(Logout())
                navigate('/')
            },
            Icon: LogoutIcon,
            hasAccess: true
        }
    ]

    const drawer = (
        <div>
            <Toolbar>
                <Box
                    onClick={() => {
                        navigate('/dashboard/profile')
                    }}
                >
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
                </Box>
            </Toolbar>
            <Divider />
            <List>
                {navItems.map(
                    ({ label, onClick, Icon, hasAccess, selected }, index) =>
                        hasAccess && (
                            <ListItem key={index} disablePadding onClick={onClick}>
                                <ListItemButton selected={selected}>
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText primary={label} />
                                </ListItemButton>
                            </ListItem>
                        )
                )}
            </List>
        </div>
    )

    const container = window !== undefined ? () => window().document.body : undefined

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {t('dashboard.title')}
                    </Typography>
                </Toolbar>

                <Toolbar>
                    <Tooltip title="Language">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{ color: 'white' }}
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
                            <MenuItem
                                key={option}
                                value={index}
                                onClick={handleClose}
                                selected={i18n.language === option.id}
                            >
                                {option.name}
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, m: 2, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    )
}

Layout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func
}

export default Layout
