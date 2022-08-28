import { LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const RequireAdmin = ({ children }) => {
    const auth = useSelector((state) => state.authentication) //uses the redux store to get the user,

    // TODO: Create a loding page component to display
    if (!auth?.user?.role) return <LinearProgress /> //if the user does not have a role, display a loading page  until the user is authenticated

    const user = auth?.user?.role === 'admin' //if the user is an admin in my case role is string
    if (user) return children //if user is admin, return children
    else return <Navigate to="/dashboard/403" replace={true} /> //if user is not admin, redirect to notfound page
}
export default RequireAdmin
