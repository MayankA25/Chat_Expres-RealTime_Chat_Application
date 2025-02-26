import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import SingUp from "./pages/SingUp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast"



function App(){
  const { authUser, check, isCheckingAuth, onlineUsers } = useAuthStore()
  const { theme } = useThemeStore();


  useEffect(()=>{
      check();
  }, [])

  if(isCheckingAuth && authUser === null){
    return (
      <div className="w-full h-screen flex justify-center items-center" data-theme={theme} >
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <>
    <div className="transition-colors pb-3 overflow-x-auto" data-theme={theme}>
      <Navbar />
      <Routes>
        <Route exact path="/" element={ authUser?._id ? <Home/> : <Navigate to="/login" />}></Route>
        <Route exact path="/signup" element={ !authUser ? <SingUp/> : <Home/> } ></Route>
        <Route exact path="/login" element={ !authUser ? <Login /> : <Navigate to="/" />}></Route>
        <Route exact path="/profile" element={ !authUser ? <Login/> : <Profile/> } ></Route>
        <Route exact path="/settings" element={ <Settings/> } ></Route>
      </Routes>
      <Toaster/>

    </div>
    </>
  );
}

export default App;
