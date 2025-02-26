import React from "react";
import { useChatStore } from "../store/useChatStore";
import { Cross, Image, Send, X } from "lucide-react";
import InputMessage from "./InputMessage";
import Messages from "./Messages";
import { useAuthStore } from "../store/useAuthStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const Chat = () => {
  const { selectedUser, selectUser, isLoadingMessages } = useChatStore();
  const { onlineUsers } = useAuthStore()
  return (
    <div
      className={` ${
        !selectedUser ? "hidden" : "w-full md:flex"
      } h-[90vh] rounded-lg md:w-[70%] bg-base-200 flex flex-col justify-between`}
    >
      <div className="flex justify-between items-center relative w-full pr-3">
        <div className="flex gap-3.5 p-3 items-center w-full h-full">
          <img
            src={selectedUser.profilePic || "./image_8.avif"}
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="flex flex-col gap-0.5">
            <h2 className="font-bold text-sm">{selectedUser.fullName}</h2>
            <h2 className="text-base-content/50 text-sm font-bold">{onlineUsers.includes(selectedUser._id) ? "Online": "Offline"}</h2>
          </div>
        </div>
        <X className="cursor-pointer" onClick={()=>selectUser(null)}/>
      </div>
      { isLoadingMessages ?  <MessageSkeleton /> : <Messages/>}
      <InputMessage />
    </div>
  );
};

export default Chat;
