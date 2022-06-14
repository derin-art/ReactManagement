import React, {useState} from "react";

export default function Day({day, dateofMonth, month, year, today}){

   const D = new Date()
   const [openEvent, setOpenEvent] = React.useState(false)
   
    return <div>
    <button
        className={`text-center hover:bg-green-200 z-10 ${dateofMonth === D.getDate() && "text-green-500"}`}
        key={`${dateofMonth}-${month}-${year}`}
        onClick = {()=>{
            setOpenEvent(prev => !prev)
        }}
        >
                  {day + 1}
        </button>
        <div className={`bg-gray-200 z-50 h-32 w-32  ${openEvent ? "absolute": "hidden"}`}>
            Hey
        </div>
</div>
    
     
}