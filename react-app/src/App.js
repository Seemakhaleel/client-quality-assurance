import React, { useEffect } from 'react'
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
import { CacheProvider, ThemeProvider } from '@emotion/react'
import RequireAdmin from './Pages/userAuth/RequireAdmin'
import Unautharized from './components/Unautharized'
import { theme } from './Theme'
import Layout from './components/Layout'
import { getDirection } from './helpers/getDirection'
import createCache from '@emotion/cache' //create cache for RTL
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'
import { useTranslation } from 'react-i18next'

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin]
})

function RTL({ children, dir }) {
    // this function is for RTL
    if (dir === 'rtl') return <CacheProvider value={cacheRtl}>{children}</CacheProvider>
    //when dir is rtl, use cacheProvider to create cache for RTL, a cache is created for each language and it is stored in localStorage
    else return children
}

function App() {
    const { i18n } = useTranslation()

    useEffect(() => {
        if (i18n.language === 'eng') {
            //if language is eng, use cacheProvider to create cache for LTR, a cache is created for each language and it is stored in localStorage
            document.body.dir = 'ltr'
        } else {
            document.body.dir = 'rtl' // if language is kurdish, use cacheProvider to create cache for RTL, a cache is created for each language and it is stored in localStorage
        }
    }, [i18n.language])
    return (
        <>
            <RTL dir={getDirection(i18n.language)}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/">
                                <Route index element={<Login />} />
                                <Route path="signup" element={<SignUp />} />

                                <Route
                                    path="dashboard"
                                    element={
                                        <RequireAuth>
                                            <Layout />
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
                                        <Route
                                            index
                                            element={
                                                <RequireAdmin>
                                                    <Roles />
                                                </RequireAdmin>
                                            }
                                        />
                                        <Route path="role">
                                            <Route path=":id" element={<Role />} />
                                        </Route>
                                    </Route>
                                    <Route path="403" element={<Unautharized />} />
                                    <Route path="*" />
                                </Route>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </RTL>
        </>
    )
}

export default App
