import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import ExplorePage from "./components/ExplorePage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React, { useEffect } from "react";
import { saveUser } from "./redux/user/userAction";
import { useDispatch } from "react-redux";
import PasswordResetUI from "./components/PasswordResetUI";

function Routing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      dispatch(saveUser(user));
    } else {
      if (!window.location.pathname.startsWith("/resetPassword"))
        navigate("/signin", { replace: true });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/user/:userId" element={<UserProfile />} />
      <Route
        path="resetPassword/:resetPasswordToken"
        element={<PasswordResetUI />}
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer autoClose={2000} position="top-center" theme="colored" />
      <Routing />
    </Router>
  );
}

export default App;
