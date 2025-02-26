import React from 'react'

const Boxes = () => {
  return (
    <div className='sm:flex sm:items-center sm:justify-center sm:h-full w-full hidden' >
      <div className="grid grid-cols-3 w-[25vw] h-[25vw] place-items-center">
        {[...Array(9)].map((element, index)=>{
            return <div key={index} className={`${index%2 === 0 && "animate-pulse"} bg-primary/15 w-[8vw] h-[8vw] rounded-lg`}></div>
        })}
      </div>
    </div>
  )
}

export default Boxes
