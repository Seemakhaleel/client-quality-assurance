import "./App.css";
import Login from "./Pages/userAuth/Login";
import SignUp from "./Pages/userAuth/SignUp";
import DashBoard from "./components/DashBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Questions from "./Pages/Questions/Questions";
import Users from "./Pages/User/Users";
import User from "./Pages/User/User";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="dashboard" element={<DashBoard />}>
              <Route path="questions" element={<Questions />} />
              <Route path="users">
                <Route path="" element={<Users />} />
                <Route path=":user" element={<User />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
