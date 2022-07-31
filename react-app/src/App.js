
import Login from "./Pages/userAuth/Login";
import SignUp from "./Pages/userAuth/SignUp";
import DashBoard from "./components/DashBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Questions from "./Pages/Questions/Questions";
import Users from "./Pages/User/Users";
import User from "./Pages/User/User";
import Question from "./Pages/Questions/Question";
import Categories from "./Pages/Categories/Categories";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="dashboard" element={<DashBoard />}>
              <Route path="questions" >
                <Route path="" element={<Questions />} />
                <Route path=":id" element={<Question />} />
              </Route>
              <Route path="users">
                <Route path="" element={<Users />} />
                <Route path=":id" element={<User />} />
              </Route>
              <Route path='categories' element={<Categories/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter> 
     
    </>
  );
}

export default App;
