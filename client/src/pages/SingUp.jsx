import React, { useState } from 'react'
import { MessageSquare, Mail, KeyRound, Eye, EyeOff, User } from 'lucide-react';
import Boxes from '../components/Boxes';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const SingUp = () => {
    const { signup, isLogginIn } = useAuthStore()
    const [credentials, setCredentials] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    const [type, setType] = useState("password");
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        signup(credentials)
    }
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
              Welcome To Chat Express
            </h2>
            <h3 className="text-[21px] text-base-content/50">
              Create Your Account
            </h3>
          </div>
          <div className="w-[80%]">
            <div className="w-full my-10">
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <User />
                  <h2 className="font-bold">Full Name</h2>
                </div>
                <input
                  type="text"
                  className="rounded-md py-1.5 px-2"
                  placeholder="Enter Full Name"
                  value={credentials.fullName}
                  onChange={(e) =>
                    setCredentials({ ...credentials, fullName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-3 my-6">
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
                {type==="password" ? <Eye className="absolute bottom-1.5 right-4 cursor-pointer" onClick={()=>setType("text")} /> :
                <EyeOff className="absolute bottom-1.5 right-4 cursor-pointer" onClick={()=>setType("password")}/>}

              </div>
            </div>
          </div>
          <button className="btn w-[80%] bg-primary text-primary-content font-bold text-[18px] rounded-lg">
          {isLogginIn ? <span className="size-5 loading loading-spinner text-primary"></span> : "SignUp"}
          </button>
          <h2 className='my-3 text-base-content/50'>
            Already Have An Account? <span className="link text-blue-400" onClick={()=>navigate("/login")}>Login</span>
          </h2>
        </form>
      </div>
      <div className="w-[50%] bg-base-200 rounded-lg">
        <Boxes />
      </div>
    </div>
  )
}

export default SingUp
