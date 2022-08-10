import React from 'react'
import Login from './Pages/userAuth/Login'
import SignUp from './Pages/userAuth/SignUp'
import DashBoard from './components/DashBoard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Questions from './Pages/Questions/Questions'
import Users from './Pages/User/Users'
import User from './Pages/User/User'
import Question from './Pages/Questions/Question'
import Categories from './Pages/Categories/Categories'
import Category from './Pages/Categories/Category'
import RequireAuth from './Pages/userAuth/RequreAuth'
import UserProfile from './components/UserProfile'
import Roles from './Pages/Roles/Roles'
import Role from './Pages/Roles/Role'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import RequireAdmin from './Pages/userAuth/RequireAdmin'
import Unautharized from './components/Unautharized'

function App() {
    const mdTheme = createTheme()

    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Login />} />
                            <Route path="signup" element={<SignUp />} />

                            <Route
                                path="dashboard"
                                element={
                                    <RequireAuth>
                                        <DashBoard />
                                    </RequireAuth>
                                }
                            >
                                <Route path="questions">
                                    <Route index element={<Questions />} />
                                    <Route path=":id" element={<Question />} />
                                </Route>
                                <Route path="users">
                                    <Route
                                        index
                                        element={
                                            <RequireAdmin>
                                                <Users />
                                            </RequireAdmin>
                                        }
                                    />
                                    <Route path=":id" element={<User />} />
                                </Route>
                                <Route path="categories">
                                    <Route index element={<Categories />} />
                                    <Route path=":id" element={<Category />} />
                                </Route>

                                <Route path="profile" element={<UserProfile />} />

                                <Route path="roles">
                                    <Route index element={<Roles />} />
                                    <Route path="role">
                                        <Route path=":id" element={<Role />} />
                                    </Route>
                                </Route>
                                <Route path="notfound" element={<Unautharized />} />
                                <Route path="*" />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    )
}

export default App
