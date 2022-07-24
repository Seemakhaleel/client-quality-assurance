import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {
  BrowserRouter ,
  Routes,
  Route,
 
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
       
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
