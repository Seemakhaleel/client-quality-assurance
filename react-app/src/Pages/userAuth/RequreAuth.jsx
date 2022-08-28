import { Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { setAxiosToken } from '../../axios'
import { setToken, SignIn, setIsAuthenticationLoading } from '../../store/auth'
import axiosInstance from '../../axios'
import { baseUrl } from '../../api'
import { LinearProgress } from '@mui/material'

const RequireAuth = ({ children }) => {
    const { isAuthenticated, isAuthenticationLoading } = useSelector((state) => state.authentication) //uses the redux store to get the user, isAuthenticated is the slice name in the store,useSelector is a hook that is used to get the state from the store
    let location = useLocation() //uses the location hook to get the current location of the page

    //component that checks if the user is logged in and if they are not, they will be redirected to the login page
    const dispatch = useDispatch() //uses the redux dispatch to dispatch the actions
    const getSelf = async () => {
        try {
            const { data } = await axiosInstance({
                method: 'get',
                url: baseUrl + '/auth/self'
            })

            dispatch(SignIn(data?.user))

            console.log(data?.user)
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        console.log('LOGIN SET TOKEN')
        // if token is in local storage, dispatch the token,when it distapaches, if the authentication in the dependencies in the other use effect is true then it will run the code below
        const token = localStorage.getItem('token')
        if (token) {
            setAxiosToken(token)
            dispatch(setToken(token))
        } else {
            setAxiosToken()
        }

        dispatch(setIsAuthenticationLoading(false))
    }, []) //this is   a hook that is used to check if the user is logged in or not

    React.useEffect(() => {
        if (isAuthenticated) {
            //if the user is authenticated, run the getSelf function
            getSelf()
        }
    }, [isAuthenticated]) // this dependency is used to check if the user is authenticated or not

    // TODO: Create a loding page component to display
    if (isAuthenticationLoading) return <LinearProgress />

    if (isAuthenticated) return children // if the user is logged in, return the children
    else return <Navigate to="/" state={{ from: location }} replace /> // if the user is not logged in, redirect to the login page
}
export default RequireAuth
