import React from 'react'

const MessageSkeleton = () => {
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
      {[...Array(12)].map((element, index) => {
        return <div key={index} className={`chat`}>
          <div className={`flex flex-col ${index%2==0 ? "items-start" : "items-end"} gap-2`}>
            <div className="chat-header skeleton w-22 h-2">
              <time className="text-xs opacity-50"></time>
            </div>

            {/* {element.image && (
              <div className="md:w-55 md:h-55 w-30 h-30 bg-neutral rounded-lg flex justify-center items-center">
                <img
                  src={element.image}
                  className="w-[90%] h-[90%] object-contain"
                />
              </div>
            )} */}
            { <div className={`chat-bubble font-bold skeleton w-55 h-20 rounded-lg`}>
              
            </div>}
            {/* { element.senderId !== selectedUser._id && <div className="chat-footer opacity-50">Sent</div>} */}
          </div>
        </div>;
      })}
    </div>
  )
}

export default MessageSkeleton
