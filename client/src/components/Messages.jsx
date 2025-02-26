import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";

const Messages = () => {
  const { selectedUser, messages, isSendingMessage } = useChatStore();
  const convertDate = (date)=>{
    const d = new Date(date)
    return d.toLocaleTimeString()
  }

  // useEffect(()=>{
  //   subscribeToMessages()

  //   return ()=>{
  //     unsubscribeFromMessages()
  //   }
  // })

  const ref = useRef(null)

  useEffect(()=>{
    ref.current?.scrollIntoView({ behaviour: "smooth" })
  }, [])

  return (
    <div className="flex flex-col py-5 px-3 gap-2 w-full h-[83%] overflow-y-scroll scrollbar-thin overflow-x-hidden">
      {/* <div className="chat chat-start">
        <img
          src={selectedUser.profilePic || "./image_8.avif"}
          className="chat-image avatar object-cover rounded-full w-8 h-8 flex justify-center items-center"
        ></img>
        <div className="chat-header">
          {selectedUser.fullName}
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">Hey! How its going on?</div>
      </div> */}
      {messages.map((element, index) => {
        return <div key={index} className={`chat ${element.senderId === selectedUser._id ? "chat-start": "chat-end"}`}>
          <div className={`flex flex-col ${element.senderId === selectedUser._id ? "items-start" : "items-end"} gap-2`}>
            <div className="chat-header">
              {element.senderId === selectedUser._id && selectedUser.fullName}
              <time className="text-xs opacity-50">{convertDate(element.createdAt)}</time>
            </div>

            {element.image && (
              <div className="md:w-55 md:h-55 w-30 h-30 bg-neutral rounded-lg flex justify-center items-center">
                <img
                  src={element.image}
                  className="w-[90%] h-[90%] object-contain"
                />
              </div>
            )}
            { element.text && <div className={`chat-bubble ${element.senderId !== selectedUser._id && "bg-primary text-primary-content"} font-bold`}>
              {element.text}
            </div>}
            { element.senderId !== selectedUser._id && <div className="chat-footer opacity-50">{isSendingMessage ? "Sending..." : "Sent"}</div>}
          </div>
        </div>;
      })}
      <div ref={ref} ></div>
    </div>
  );
};

export default Messages;
