import { Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { setAxiosToken } from '../../axios'
import { setToken } from '../../store/auth'

const RequireAuth = ({ children }) => {
    const dispatch = useDispatch() //uses the redux dispatch to dispatch the actions

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
    }, []) //this is   a hook that is used to check if the user is logged in or not

    const auth = useSelector((state) => state.authentication.isAuthenticated) //uses the redux store to get the user, isAuthenticated is the slice name in the store
    let location = useLocation()
    console.log({ auth })
    if (auth) return children // if the user is logged in, return the children
    else return <Navigate to="/" state={{ from: location }} replace /> // if the user is not logged in, redirect to the login page
}
export default RequireAuth
