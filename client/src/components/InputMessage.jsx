import React, { useEffect, useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const InputMessage = () => {
  const { selectedUser, sendMessage, getMessages } = useChatStore();
  const { authUser } = useAuthStore();
  let ref = useRef(null);
  let ref2 = useRef(null)
  const [previewImage, setPreviewImage] = useState(null); 
  const [message, setMessage] = useState({
    senderId: authUser._id,
    receiverId: selectedUser._id,
    text: "",
    image: "",
  });
  useEffect(()=>{
    setMessage({ ...message, senderId: authUser._id, receiverId: selectedUser._id })
  }, [selectedUser])
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      const fileURL = e.target.result;
      setPreviewImage(fileURL);
      setMessage({ ...message, image: fileURL })
    };
  };
  const handleChange = (e)=>{
    setMessage({ ...message, [e.target.name]: e.target.value })
  }
  return (
    <div className="flex flex-col px-4 gap-1 md:gap-2 pb-3">
        <input
          type="file"
          className="hidden"
          onChange={handleUpload}
          ref={ref}
        />
      {previewImage && (
        <div className="bg-neutral w-25 h-25 md:w-50 md:h-50 rounded-2xl flex items-center justify-center relative">
          <img
            src={previewImage}
            className="w-[90%] h-[90%] object-contain rounded-lg"
          />
          <X
            className="-top-1.5 -right-1.5 absolute cursor-pointer"
            onClick={() => setPreviewImage(null)}
          />
        </div>
      )}
      <div className="flex w-full items-center gap-4">
        <input
          type="text"
          className="w-full px-2 py-2 rounded-md"
          placeholder="Type Your Message"
          value={message.text}
          name="text"
          onChange={handleChange}
          onKeyDown={(e)=>{ e.key == "Enter" && ref2.current.click()}}
        />
        <Image
          className="size-9 md:size-8.5 cursor-pointer"
          onClick={() => {
            ref.current.click();
          }}
        />
        <button className="btn bg-primary text-primary-content p-2 md:p-3 rounded-lg" ref={ref2} onClick={()=>{sendMessage(message); setMessage({ ...message, text: "", image: "" }); setPreviewImage(null)}}>
          <Send className="size-5"  />
        </button>
      </div>
    </div>
  );
};

export default InputMessage;
