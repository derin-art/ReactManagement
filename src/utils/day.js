import React, {useState} from "react";
import uuid from "draft-js/lib/uuid";

export default function Day({day, dateofMonth, month, year, today, startOfThisMonth}){
   const D = new Date()
   const actualDate = `${dateofMonth}-${month}-${year}`
   const [activities, setActivities] = useState({
      text: "", completed: false
   })

   let specificActivities = []

   if( JSON.parse(localStorage.getItem("activities"))){
       if(JSON.parse(localStorage.getItem("activities"))[`${dateofMonth}-${month}-${year}`]){
           specificActivities = JSON.parse(localStorage.getItem("activities"))[`${dateofMonth}-${month}-${year}`]
       }
   }


   const [allActivities, setAllActivities] = useState(specificActivities) 

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
        className={`text-center hover:bg-indigo-100  ${allActivities.length > 0 && "bg-gray-300"} ${openEvent && "font-bold bg-indigo-100"} font-bold m-4 text-sm rounded-full w-8 h-8 z-10 ${dateofMonth === D.getDate() ? "text-indigo-500 font-bold": "text-gray-800"}`}
        key={`${dateofMonth}-${month}-${year}`}
        onClick = {()=>{
            setOpenEvent(prev => !prev)
            console.log(actualDate)
        }}
        >
                  {day + 1}
        </button>
        <div className={`bg-gray-100 rouded-lg border-l-4 border-indigo-100 z-50 text-xs p-2  ${openEvent ? "absolute": "hidden"}`}>
            <div className="flex flex-col">
                <div className="flex items-center justify-center">
                <p className="text-sm text-gray-700">Plan for the date</p>
                <p className="self-end ml-3 font-bold">{actualDate}</p>
                </div>
                <textarea className="outline-gray-700 mt-2 text-gray-600" value={activities.text} type="text" placeholder="Event" onChange={(e)=>{
                    setActivities(prev => { 
                    const formerText = prev[`${dateofMonth}-${month}-${year}`]
                    return {
                        text: e.target.value, completed: false
                    }})
                }}>
                </textarea>
                <div className="text-xs">
                    No activities planned for this date.
                </div>

                <button className="bg-white border text-indigo-400 shadow-lg font-bold p-1 text-xs" onClick={()=>{
                    if(!activities.text) return

                    if(JSON.parse(localStorage.getItem("activities"))){
                        let localActivities = JSON.parse(localStorage.getItem("activities"))
                        console.log(localActivities[`${dateofMonth}-${month}-${year}`])
                        if(localActivities[`${dateofMonth}-${month}-${year}`]){
                            const newLocalActivities = [...localActivities[`${dateofMonth}-${month}-${year}`], activities]
                            localActivities = {...localActivities, [actualDate]: newLocalActivities}
                            localStorage.setItem("activities", JSON.stringify(localActivities))
                            setAllActivities(JSON.parse(localStorage.getItem("activities"))[`${dateofMonth}-${month}-${year}`])
                        return
                        }
                        localStorage.setItem("activities", JSON.stringify({...localActivities, [actualDate]: [activities]}))
                        setAllActivities(JSON.parse(localStorage.getItem("activities"))[`${dateofMonth}-${month}-${year}`])
                    }
                    else{
                        localStorage.setItem("activities", JSON.stringify({[actualDate]: [{text: activities.text, completed: activities.completed}]}))
                        setAllActivities(JSON.parse(localStorage.getItem("activities"))[`${dateofMonth}-${month}-${year}`])
                    }
                 
                }}>
                    Set
                </button>
            
            </div>
            <div className="mt-4 text-xs">
              {allActivities && allActivities.map(item => (
                  <p key={uuid()} className={`flex justify-between ${item.completed && "line-through"}`}>{item.text}
                  <button id={item.text} onClick={(e)=>{
                    const newNew =  allActivities.map(todo => {
                          if(todo.text === e.target.id){
                              return {...todo, completed: true}
                          }
                          else{
                              return todo
                          }
                      })
                    const localActivities =  JSON.parse(localStorage.getItem("activities"))
                    localStorage.setItem("activities", JSON.stringify({...localActivities, [actualDate]: newNew}))
                    setAllActivities(JSON.parse(localStorage.getItem("activities"))[actualDate])
                  }}>
                      Done
                  </button>
                  </p>
              ))}
            </div>
        </div>
</div>
    
     
}