import { create } from "zustand";
import { axiosInstance } from "../axios/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  isLoadingUsers: false,
  isLoadingChat: false,
  selectedUser: null,
  isLoadingUsers: true,
  isLoadingMessages: false,
  isSendingMessage: false,
  load: true,


  getUsers: async () => {
    try {
      set({ isLoadingUsers: true })
      const response = await axiosInstance.get("/messages/getusers");
      set({ users: response.data.foundUsers });
    } catch (e) {
      toast.error(e.response.data.msg);
      set({ users: [] });
    }finally{
      set({ isLoadingUsers: false })
    }
  },

  getMessages: async (senderId, receiverId) => {
    try {
      get().load && set({ isLoadingMessages: true })
      const response = await axiosInstance.post("/messages/getmessages", {
        senderId,
        receiverId,
      });;
      set({ messages: response.data.foundMessages });
    } catch (e) {
      toast.error(e.response.data.msg);
      set({ messages: [] });
    }finally{
      get().isLoadingMessages && set({ isLoadingMessages: false })
    }
  },

  sendMessage: async (data) => {
    try {
      set({ isSendingMessage: true })
      const response = await axiosInstance.post("/messages/sendmessage", data);
      const senderId = useAuthStore.getState().authUser._id;
      const receiverId = get().selectedUser._id;

      get().getMessages(senderId, receiverId);
    } catch (e) {
      toast.error(e.response.data.msg);
    }finally{
      set({ isSendingMessage: false })
    }
  },

  selectUser: (selectedUser) => {
    // const { connectSocket, disconnectSocket } = useAuthStore.getState();
    // disconnectSocket();
    set({ load: true })
    get().unsubscribeFromMessages()
    set({ selectedUser });

    if(get().selectedUser){

        const senderId = useAuthStore.getState().authUser._id;
        const receiverId = get().selectedUser._id;
        get().getMessages(senderId, receiverId);
        get().subscribeToMessages();
        set({ load: false })
    }
  },

  subscribeToMessages: ()=>{
    const { selectedUser } = get();
    if(!selectedUser) return;
    
    const { socket, authUser }  = useAuthStore.getState();
    socket.on("newMessage", (message)=>{
      get().getMessages(authUser._id, selectedUser._id);
    })
  },

  unsubscribeFromMessages: ()=>{
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage")
  }
}));
