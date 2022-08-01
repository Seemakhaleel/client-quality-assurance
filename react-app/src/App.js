import React from "react";
import Login from "./Pages/userAuth/Login";
import SignUp from "./Pages/userAuth/SignUp";
import DashBoard from "./components/DashBoard";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Questions from "./Pages/Questions/Questions";
import Users from "./Pages/User/Users";
import User from "./Pages/User/User";
import Question from "./Pages/Questions/Question";
import Categories from "./Pages/Categories/Categories";
import RequireAuth from "./Pages/userAuth/RequreAuth";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./store/auth";

/**
 * 1. '/users/0'
 * 2. check if user is logged in
 * 3. if logged in, render '/users/0'
 * 4. if not logged in, render '/login'
 */

function App() {
  return (
    <>
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
                <Route index element={<Users />} />
                <Route path=":id" element={<User />} />
              </Route>
              <Route path="categories" element={<Categories />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
