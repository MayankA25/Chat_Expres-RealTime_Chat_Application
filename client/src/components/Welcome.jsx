import React from 'react'
import { MessageSquare } from 'lucide-react'

const Welcome = () => {
  return (
    <div className={`md:flex hidden flex-col justify-center items-center md:w-[70%]`}>
        <div className="flex flex-col gap-5 items-center">
            <div className="bg-primary/10 p-1 rounded-md hover:bg-primary/20 cursor-pointer transition-colors flex justify-center items-center size-10">
              <MessageSquare className="text-primary" />
            </div>
            <h2 className="font-bold text-[28px] text-center">
              Welcome To Chat Express!
            </h2>
            <h3 className="text-[21px] text-base-content/50 text-center">
              Select Contact To Chat
            </h3>
          </div>
    </div>
  )
}

export default Welcome
