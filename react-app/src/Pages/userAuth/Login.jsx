import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline"; //cssbaseline component for the footer that is used to make the footer look better
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid"; //the grid component is used to create a grid layout for the sign up page
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container"; // the container component is used to center the content of the page
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { SignIn, Logout, setToken } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { baseUrl } from "../../api";

function Copyright(props) {
  //copyright component for footer that returns a typography component that dynamically changes the copyright year

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme(); //creates a theme for the app to use

export default function Login() {
  const [inputEmail, setInputEmail] = useState(""); //initializes the state for the input text
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.authentication); //uses the redux store to get the user, we dont need to specify the slice because we are using the entire store
  const dispatch = useDispatch(); //uses the redux dispatch to dispatch the actions
  let navigate = useNavigate(); //uses the navigate hook to navigate to the home page
  const location = useLocation(); //uses the location hook to get the current location

  // let from = location.state?.from?.pathname || "/dashboard/questions"; //gets the location of the page that the user came from
  // //if the user came from the sign up page, the user will be redirected to the home page

  const login = async () => {
    try {
      const response = await axios({
        method: "post",
        url: baseUrl + "/auth/login",
        data: {
          email: inputEmail,
          password: password,
        },
      });

      // call /auth/self to ger the currentUser

      dispatch(setToken(response.data.access)); //dispatches the action to set the token in the redux store to the token that was returned from the server
    } catch (error) {
      console.log("error logging in");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  React.useEffect(() => {
    // if token is in local storage, dispatch the token,when it distapaches, if the authentication in the dependencies in the other use effect is true then it will run the code below
    const token = localStorage.getItem("token");
    if (token) dispatch(setToken(token));
  }, []); //this is a hook that is used to check if the user is logged in or not

  React.useEffect(() => {
    //if authenitication is true, navigate to the location that we came from or go to the dashboard questions
    if (auth.isAuthenticated) {
      navigate(location?.state?.from?.pathname || "/dashboard/questions");
    }
  }, [auth.isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
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
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </form>
          <Box>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  Already have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
