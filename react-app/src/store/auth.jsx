import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticationLoading: true, // it's for when we're checking the existence of the token
    isAuthenticated: false, //if the user is authenticated or not (true or false)
    token: null, //token is the token that is returned from the server when a user logs in successfully and is used to authenticate the user
    user: null
}

// Slice
const slice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        //reducers are functions that take in the current state and an action and return a new state
        setToken: (state, action) => {
            // set the user token
            state.token = action.payload
            state.isAuthenticated = true //set the user to authenticated since we have a token now and the user is logged in
            localStorage.setItem('token', state.token) //set the token in local storage so that the user can be logged in next time they visit the site without having to log in again
        },

        setIsAuthenticationLoading: (state, action) => {
            //this is for when we're checking the existence of the token
            state.isAuthenticationLoading = action.payload
        },

        SignIn: (state, action) => {
            //SignIn is the action name
            state.user = action.payload
        },

        Logout: (state) => {
            state.isAuthenticated = false
            state.token = null
            state.user = null
            localStorage.removeItem('token') //remove the token from local storage when the user logs out
        }
    }
})

export default slice.reducer

export const { SignIn, Logout, setToken, setIsAuthenticationLoading } = slice.actions //actions are the functions that dispatch the action to the reducer
