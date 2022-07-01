import React, {useState} from "react";

export default function Day({day, dateofMonth, month, year, today, startOfThisMonth}){
   const D = new Date()
   const [openEvent, setOpenEvent] = React.useState(false)



   
   
    return <div className={` ${day === 0 ? `col-start-${startOfThisMonth}  col-end-${startOfThisMonth + 1}`:""}`}>
    <div className="hidden">
        <div className="col-start-1"></div>
        <div className="col-start-2"></div>
        <div className="col-start-3"></div>
        <div className="col-start-4"></div>
        <div className="col-start-5"></div>
        <div className="col-start-6"></div>
    </div>
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