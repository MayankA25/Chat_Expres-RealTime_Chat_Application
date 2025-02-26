import Sidebar from "../components/Sidebar"
import React, { useEffect } from 'react'
import { useChatStore } from "../store/useChatStore"
import Chat from "../components/Chat"
import Welcome from "../components/Welcome"
import SidebarSkeleton from "../components/skeletons/SidebarSkeleton"

const Home = () => {
  const { getUsers, selectedUser, isLoadingUsers } = useChatStore()
  useEffect(()=>{
    getUsers()
  }, [])
  return (
    <div className="md:w-[80vw] sm:w-[75vw] w-[95vw] my-[1vh] h-[calc(90vh)] bg-base-200 mx-auto rounded-lg flex" >
      {/* <Sidebar/> */}
      {isLoadingUsers ? <SidebarSkeleton/> : <Sidebar/>}
      {selectedUser && <Chat/>}
      {!selectedUser && <Welcome/>}
    </div>  
  )
}

export default Home
