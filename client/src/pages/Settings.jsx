import React from "react";
import { themes } from "../utils/themes";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Image } from "lucide-react"

const Settings = () => {
  const { setTheme } = useThemeStore();

  const changeTheme = (theme) => {
    localStorage.setItem("chat-theme", theme);
    setTheme(theme);
  };
  return (
    <div className="flex flex-col w-[100%] min-h-[100vh]">
      <div className="w-[80%] mx-auto h-full py-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-[25px]">Theme</h2>
          <h2 className="text-base-content/60 text-[22px] font-semibold">
            Choose A Theme For Your StudoSphere Interface{" "}
          </h2>

          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2">
            {themes.map((element, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col gap-2 items-center m-5"
                >
                  <div
                    data-theme={element}
                    className="bg-base flex px-1.5 py-2.5 justify-center rounded-lg cursor-pointer gap-1 hover:bg-neutral/60"
                    onClick={() => changeTheme(element)}
                  >
                    <div className="w-8 h-8 bg-primary rounded-sm"></div>
                    <div className="w-8 h-8 bg-secondary rounded-sm"></div>
                    <div className="w-8 h-8 bg-accent rounded-sm"></div>
                    <div className="w-8 h-8 bg-neutral rounded-sm"></div>
                  </div>
                  <h2 className="font-bold">
                    {element[0].toUpperCase() + element.slice(1)}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[80%] mx-auto h-full gap-3 mb-10">
        <h2 className="font-bold text-[25px]">Preview</h2>
        <div className="bg-base-200 p-2 rounded-lg w-[80%] mx-auto">
          <div className="px-3 py-1 flex items-center gap-3">
            <div className="bg-primary rounded-full w-9 h-9 flex justify-center items-center">
              <h2 className="font-bold text-primary-content">M</h2>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-base-content">Mayank Arora</h2>
              <h2 className="text-base-content/50 font-bold">Online</h2>
            </div>
          </div>
          <div className="flex flex-col my-5 px-3 gap-2">
            <div className="chat chat-start">
              <div className="chat-image avatar bg-primary rounded-full w-8 h-8 flex justify-center items-center">
                  <h2 className="font-bold text-primary-content">M</h2>
              </div>
              <div className="chat-header">
                Mayank Arora
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">Hey! How its going on?</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-header">
                Angel
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble bg-primary text-primary-content font-bold ">
                I am doing great just working on a new feature
              </div>
              <div className="chat-footer opacity-50">Sent</div>
            </div>
          </div>
          <div className="flex my-10 items-center gap-3 px-4">
            <input type="text" value="Hey! What are you doing?" className="w-full p-2 rounded-md focus:border-none caret-transparent font-semibold" onChange={()=>{}} />
            <Image className="size-8" />
            <button className="btn cursor-auto btn-primary rounded-md"><Send/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
