import { create } from "zustand";
import { axiosInstance } from "../axios/axios";
import {toast} from "react-hot-toast"
import { io } from "socket.io-client"
import { useChatStore } from "./useChatStore";

const BASE_URL = import.meta.env.MODE==="development" ? "http://localhost:5001" : "/"

export const useAuthStore = create((set, get)=>({
    isCheckingAuth: false,
    authUser: null,
    isUpdatingProfile: false,
    isLogginIn: false,
    socket: null,
    onlineUsers: [],

    check : async()=>{
        try{
            set({ isCheckingAuth: true })
            const response = await axiosInstance.get("/auth/check");
            set({ authUser: response.data.loggedInUser })
            get().connectSocket()
        }catch(e){
            set({ authUser: null })
        }finally{
            set({ isCheckingAuth: false })
        }
        
    },

    signup: async(credentials)=>{
        try{
            set({ isLogginIn: true })
            const response = await axiosInstance.post("/auth/signup", credentials);
            set({ authUser: response.data.savedUser });
            toast.success("Successfully Created New User")
            get().connectSocket();
        }catch(e){
            set({ authUser: null })
            toast.error(e.response.data.msg)
        }finally{
            set({ isLogginIn: false })
        }

    },

    login: async (credentials)=>{
        try{
            set({ isLogginIn: true })
            const response = await axiosInstance.post("/auth/login", credentials);
            set({ authUser: response.data.foundUser });
            toast.success("Successfully Logged In");
            get().connectSocket()
        }catch(e){
            set({ authUser: null })
            toast.error(e.response.data.msg)
        }finally{
            set({ isLogginIn: false })
        }
        
    },

    logout:async ()=>{
        try{
            const response = await axiosInstance.post("/auth/logout");
            set({ authUser: null })
            toast.success("Successfully Logged Out");
            get().disconnectSocket();
            useChatStore.getState().selectUser(null)
        }catch(e){
            toast.error(e.response.data.msg)
        }

    },

    updateProfile: async (profilePic)=>{
        try{
            set({ isUpdatingProfile: true })
            const response = await axiosInstance.patch("/auth/updateProfile", { profilePic })
            set({ authUser: response.data.updatedUser })
            toast.success("Successfully Updated The Profile Picture")
        }catch(e){
            toast.error("Error While Updating The Profile Picture ")
        }finally{
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: ()=>{
        const { authUser } = useAuthStore.getState();
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }
        });
        socket.connect();
        set({ socket })
        socket.on("getOnlineUsers", (onlineUsers)=>{
            set({ onlineUsers: onlineUsers })
        });
    },

    disconnectSocket : ()=>{
        const { socket } = get();
        if(socket?.connected) socket.disconnect();
    }
}))