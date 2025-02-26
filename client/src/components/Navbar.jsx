import React from "react";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div className="w-full bg-neutral/10 z-50">
      <div className="w-[90%] mx-auto py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1 rounded-md hover:bg-primary/20 cursor-pointer transition-colors">
            <MessageSquare className="text-primary cursor-pointer" onClick={()=>navigate("/")}/>
          </div>
          <h2 className="font-bold text-[20px] cursor-pointer" onClick={()=>navigate("/")} >Chat Express</h2>
        </div>
        <div className="sm:flex items-center gap-4 hidden">
          <div className="flex gap-1 bg-neutral/25 py-2 px-2.5 rounded-lg hover:bg-neutral/35 cursor-pointer items-center" onClick={()=>navigate("/settings")} >
            <Settings/>
            <h2 className="font-semibold" >Settings</h2>
          </div>
          { authUser && <div className="flex gap-1 bg-neutral/25 py-2 px-2.5 rounded-lg hover:bg-neutral/35 cursor-pointer items-center" onClick={logout}>
            <LogOut/>
            <h2 className="font-semibold" >Logout</h2>
          </div>}
          { authUser && <div className="flex gap-1 bg-neutral/25 py-2 px-2.5 rounded-lg hover:bg-neutral/35 cursor-pointer items-center" onClick={()=>navigate("/profile")}>
            <User/>
            <h2 className="font-semibold" >Profile</h2>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
