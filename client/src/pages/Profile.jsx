import { Edit, Image } from "lucide-react";
import React, { useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const ref = useRef(null);
  const handleUpload = (e)=>{
    const file = e.target.files[0];
    if(!file) return;

    if(!file.type.includes("image/")) return

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async()=>{
      const baseURL = reader.result;
      await updateProfile(baseURL);
    }

  };
  const convertDate = (date)=>{
    const d = new Date(date);
    return d.toLocaleDateString();
  }
  return (
    <div className="h-[calc(100vh-65px)] w-[100vw] flex flex-col items-center justify-center">
      <div className="w-[70%] h-[30%] bg-base-200 rounded-t-2xl relative flex justify-center items-center">
        {isUpdatingProfile && <span className="size-10 loading loading-spinner text-primary"></span>}
        { !isUpdatingProfile &&  <img
          src={`${ authUser.profilePic ||  "./image_8.avif"}`}
          className="w-full h-full object-contain"
          alt=""
        />}
        <input type="file" className="hidden" ref={ref} onChange={handleUpload} />
        <div
          className="flex absolute top-0 right-0 gap-3 bg-neutral p-2 rounded-md items-center text-neutral-content hover:cursor-pointer m-2"
          onClick={() => ref.current.click()}
        >
          <h2 className="font-bold">Edit Image</h2>
          <Edit className="size-5" />
        </div>
      </div>
      <div className="bg-neutral/70 rounded-2xl w-[85%] min-h-[30%] py-3 flex flex-col text-neutral-content">
        <h2 className="font-bold text-2xl text-center mb-4">
          Personal Information
        </h2>
        <div className="rounded-2xl py-3 flex">
          <div className="flex flex-col px-4 py-2 w-[50%] h-[77%] border-r-1 border-white justify-center">
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Full Name</h2>
                <input
                  type="text"
                  className="px-2 py-1 rounded-md"
                  value={authUser.fullName}
                  onChange={()=>{}}
                />
              </div>
              <div className="flex flex-col gap-2 my-5">
                <h2 className="font-semibold">Email</h2>
                <input
                  type="text"
                  className="px-2 py-1 rounded-md"
                  value={authUser.email}
                  onChange={()=>{}}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col px-4 py-2 w-[50%] h-[77%] justify-center">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-bold">Status</h2>
              <div className="flex items-center gap-3">
                <div className="bg-green-400 rounded-full w-2 h-2"></div>
                <h2 className="text-green-400 font-bold">Active</h2>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Joined On</h2>
              <div className="flex items-center gap-3">
                <h2 className="font-bold">{convertDate(authUser.createdAt)}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
