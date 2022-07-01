import React, {useState} from "react";
import dayjs from "dayjs";
import Day from "./day";


export default function Calender(){

  const [dayObj, setDayObj] = useState(dayjs())
  const [monthNumber, setMonthNumber] = useState(dayjs().month())
    const [CalenderYear, setCalenderYear] = useState(dayObj.year())
    const [CalenderMonth, setCalenderMonth] = useState(dayObj.month())
    console.log(`${dayObj.year()}-${dayObj.month()}-1`)
    const [virtualMonth, setVirtualMonth] = React.useState(dayjs(`${dayObj.year()}-${dayObj.month()}-1`, "YYYY-MM-DD"))

    console.log(dayjs(`${dayObj.year()}-${dayObj.month()}-1`, "YYYY-MM-DD").startOf("month").day(), "mee")

    const realStart = dayjs(`${dayObj.year()}-${dayObj.month()}-1`, "YYYY-MM-DD").startOf("month").day()

    const [start, setStart] = useState(realStart)

     
   
    const startOfThisMonth = virtualMonth.startOf(`month`).day()
    console.log(start, "could be")
    console.log(dayjs(`${dayObj.year()}-${dayObj.month()}-1`, "YYYY-MM-DD").startOf("month").day(), "start")
    const CalenderMonthDictionary = {
      0: "Jan", 1: "Feb", 2: "March", 3:"April", 4: "May", 5:"June", 6: "July", 7: "August", 8: "Sept", 9: "Oct", 10: "Nov", 11: "Dec"
    }
    let Weeksindex = 1 
    const CalenderWeeks = ["M", "T", "W", "T", "F", "Sa", "S"]
    
    const today = dayjs().set('year', CalenderYear);
    const [openEvent, setEvent] = React.useState(false)

    const d = new Date()
    const startWeek = today.startOf("Week");
    let week = 0
    const weekDays = Array.from(new Array(7).keys()).map((index) => {
        return startWeek.add(index, "day");
      });
    
    

      
  
        const startOfMonth = today.set("month", CalenderMonth).startOf("month");
        const startOfFirstWeek = startOfMonth.startOf("isoWeek");
        const daysToFirstDay = startOfMonth.diff(startOfFirstWeek, "day");
        const daysToPrepend = Array.from(new Array(daysToFirstDay).keys());
        const daysInMonth = Array.from(new Array(startOfMonth.daysInMonth()).keys())

        let totalDate = 0
        let dateofMonth = 0
    

    return <div className="max-w-4xl flex-col font-Tilt border border-gray-300">
     <div className="max-w-4xl font-bold">
      <div className="flex justify-center items-center mb-4">
          <button className="text-indigo-400 font-bold" onClick={()=>{
            setDayObj(dayObj.add(1, "year"))
            setCalenderYear(prev => prev + 1)}}>
            +
          </button>

          <div className="text-xs ml-2 mr-2">
            {CalenderYear}
          </div>

          <button className="text-indigo-400 font-bold" onClick={()=>{
            setDayObj(dayObj.subtract(1, "year"))
            setCalenderYear(prev => prev - 1)}}>
            -
          </button>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <button className="p-2 px-[16px] hover:bg-indigo-500 text-white bg-indigo-300 rounded-full mr-3 font-bold" onClick={()=>{
         
            setDayObj(dayObj.add(1, "month"))
          }}>
            +
          </button>
        <div className="text-indigo-400 font-bold">
          {CalenderMonthDictionary[dayObj.month()]}
        </div>
        <button className="p-2 px-4 text-white bg-indigo-300 rounded-full ml-3 font-bold hover:bg-indigo-500" onClick={()=>{
          setDayObj(dayObj.subtract(1, "month"))
        }}>
          -
        </button>
        </div>
      </div>

    

        <div className="grid grid-cols-7 mt-2 overflow-hidden border-b border-t"> 
 {CalenderWeeks.map((weekDay) => {
   Weeksindex = Weeksindex + 1
   return  <div className="m-4 text-gray-500 text-xs" key={`weekday_${Weeksindex}`}>
                {weekDay}
            </div>
 })}


</div>
     
    </div>
    <div className="grid grid-cols-7">
        {daysInMonth.map((day) => {
              dateofMonth = dateofMonth + 1
              const today = d.getDate(startOfMonth, day);
        
              return (
                  <Day key={`${dateofMonth}-${dayObj.month()}-${CalenderYear}`} day={day} startOfThisMonth={dayjs(`${dayObj.year()}-${dayObj.month() + 1}-1`, "YYYY-MM-DD").startOf("month").day()} dateofMonth={dateofMonth} month={dayObj.month()} year={CalenderYear} today={today}/>
              )
            })}
    </div>
    </div>
     
}

