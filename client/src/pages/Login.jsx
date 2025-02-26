import React, { useState } from "react";
import { Mail, MessageSquare, KeyRound, Eye, EyeOff, Loader } from "lucide-react";
import Boxes from "../components/Boxes";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isLogginIn } = useAuthStore();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className="sm:flex h-[calc(100vh-65px)] w-[100vw]">
      <div className="sm:w-[50%] w-full h-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full h-full px-8"
        >
          <div className="flex flex-col gap-3 items-center">
            <div className="bg-primary/10 p-1 rounded-md hover:bg-primary/20 cursor-pointer transition-colors flex justify-center items-center size-10">
              <MessageSquare className="text-primary" />
            </div>
            <h2 className="font-bold text-[28px] text-center">
              Welcome Back!
            </h2>
            <h3 className="text-[21px] text-base-content/50 text-center">
              Login To Your Account
            </h3>
          </div>
          <div className="w-[80%]">
            <div className="w-full my-10">
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <Mail />
                  <h2 className="font-bold">Email</h2>
                </div>
                <input
                  type="email"
                  className="rounded-md py-1.5 px-2"
                  placeholder="Enter Email Address"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-3 my-6 relative">
                <div className="flex gap-3">
                  <KeyRound />
                  <h2 className="font-bold">Password</h2>
                </div>
                <input
                  type={type}
                  className="rounded-md py-1.5 px-2"
                  placeholder="Enter Password Here"
                  value={credentials.password}
                  minLength="6"
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
                {type === "password" ? (
                  <Eye
                    className="absolute bottom-1.5 right-4 cursor-pointer"
                    onClick={() => setType("text")}
                  />
                ) : (
                  <EyeOff
                    className="absolute bottom-1.5 right-4 cursor-pointer"
                    onClick={() => setType("password")}
                  />
                )}
              </div>
            </div>
          </div>
          <button className="btn w-[80%] bg-primary text-primary-content font-bold text-[18px] rounded-lg" disabled={ isLogginIn ? true : false }>
            {isLogginIn ? <span className="size-5 loading loading-spinner text-primary"></span> : "Login"}
          </button>
          <h2 className="my-5 text-base-content/50 text-center" onClick={()=>navigate("/signup")}>
            Don't have an account? <span className="link text-blue-400">SignUp</span>
          </h2>
        </form>
      </div>
      <div className="w-[50%] bg-base-200 rounded-lg">
        <Boxes />
      </div>
    </div>
  );
};

export default Login;
