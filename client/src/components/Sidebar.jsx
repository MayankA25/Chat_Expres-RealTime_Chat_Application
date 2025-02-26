import { Users } from "lucide-react";
import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { users, selectUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [onlineOnly, setOnlineOnly] = useState(false)
  const hanldeCheck = (e)=>{
    if(e.target.checked) setOnlineOnly(true);
    if(!e.target.checked) setOnlineOnly(false)
  }
  return (
    <div
      className={`md:w-[30%] w-[100%] h-full bg-base-200 md:rounded-l-3xl rounded-3xl overflow-y-scroll scroll-smooth scrollbar-thin ${
        selectedUser && "hidden"
      } md:block`}
    >
      <div className="flex flex-col gap-3 p-3">
        <div className="flex flex-col md:flex-row w-full gap-2 font-bold  md:justify-start sm:justify-center items-center">
          <Users />
          <h2 className="md:text-lg text-sm">Contacts</h2>
        </div>

        <div className="flex items-center gap-2 md:justify-start justify-center">
          <input type="checkbox" onChange={hanldeCheck} className="checkbox size-5 rounded-md" />
          <h2>Online Only ({onlineUsers.length-1})</h2>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="px-3.5 py-2 font-bold text-lg">Available Users</h2>
        {users.map((element, index) => {
          return (
            <div
              key={index}
              className={`w-full px-3.5 py-3 flex gap-5 my-3 hover:bg-base-100 cursor-pointer ${ (onlineOnly && !onlineUsers.includes(element._id)) && "hidden" }`}
              onClick={() => {
                selectUser(element);
                
              }}
            >
              <img
                src={element.profilePic || "./image_8.avif"}
                className="object-cover w-15 h-15 rounded-full"
              />
              <div className="flex flex-col justify-center">
                <h2 className="font-bold text-base-content">
                  {element.fullName}
                </h2>
                <h2
                  className={`font-semibold ${
                    !onlineUsers.includes(element._id) && "text-base-content/50"
                  }  ${onlineUsers.includes(element._id) && "text-green-300"}`}
                >
                  {onlineUsers.includes(element._id) ? "Online" : "Offline"}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
