import * as React from "react";
import { styled, createTheme, ThemeProvider,useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { Outlet } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(
  //drawer is open when open is true and closed when open is false
  ({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,

      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",

      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);


const mdTheme = createTheme(); //theme provider is used to pass the theme to the components

export default function DashBoard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ height: "100vh"}}>
          <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" open={open}>
              <Toolbar
                sx={{
                  pr: "24px",
                  bgcolor: "#5c6bc0", // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}

                  sx={{
                    marginRight: "36px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  sx={{ flexGrow: 1}}
                >
                  AskAway
                </Typography>

                <IconButton color="inherit">
                  <AccountCircleIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            </Box>

          <Box display="flex" height="100%" >
          
            <Drawer variant="permanent" open={open}>
             
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginBottom: "0px",
                
                 
                }}
              >
                  <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        
              </Toolbar>
              <Divider />
             
              <Box sx={{ width: "80%", maxWidth: 360, height: "100%" }}>
                <nav>
                  <List>
                    <ListItem disablePadding>
                      <Link
                        to="/dashboard/questions"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <QuestionAnswerIcon />
                          </ListItemIcon>
                          <ListItemText primary="Questions" />
                        </ListItemButton>
                      </Link>
                    </ListItem>

                    <ListItem disablePadding>
                      <Link to="/dashboard/users" 
                        style={{ textDecoration: "none", color: "black" }}>
                      <ListItemButton>
                        <ListItemIcon>
                          <RecentActorsIcon />
                        </ListItemIcon>
                        <ListItemText primary="List of users" />
                      </ListItemButton>
                      </Link>
                    </ListItem>
                  </List>
                </nav>

                <nav>
                  <List>
                    <ListItem disablePadding>
                      <Link
                        to="/"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <ListItemButton>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                          <ListItemText primary="Logout" />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  </List>
                </nav>

              </Box>
            </Drawer>

            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
