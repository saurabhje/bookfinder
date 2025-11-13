import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignupForm from "./pages/Singup";
import Profile from "./pages/profile";
import { useAuth } from "./context/AuthContext";

export default function App(){
  const {user} = useAuth
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<SignupForm />} />
      {user && (
        <Route path={`/user/${user.username}`} element={<Profile />} />
      )}
    </Routes>
  )
}
