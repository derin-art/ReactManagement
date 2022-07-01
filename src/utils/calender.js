import React, {useState} from "react";
import dayjs from "dayjs";
import Day from "./day";


export default function Calender({month}){

  const [dayObj, setDayObj] = useState(dayjs())
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
      1: "Jan", 2: "Feb", 3: "March", 4:"April", 5: "May", 6:"June", 7: "July", 8: "August", 9: "Sept", 10: "Oct", 11: "Nov", 12: "Dec"
    }
    let Weeksindex = 1 
    const CalenderWeeks = ["Mon", "Tues", "Weds", "Thur", "Fri", "Sat", "Sund"]
    
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
    

    return <div className="max-w-4xl flex-col">
     <div className="max-w-4xl">
      <div className="flex justify-center items-center">
          <button className="" onClick={()=>{
            setDayObj(dayObj.add(1, "year"))
            setCalenderYear(prev => prev + 1)}}>
            +
          </button>

          <div>
            {CalenderYear}
          </div>

          <button onClick={()=>{
            setDayObj(dayObj.subtract(1, "year"))
            setCalenderYear(prev => prev - 1)}}>
            -
          </button>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div>
          {dayObj.month()}
        </div>
        <input type="number" value={dayObj.month()} max={11} min={0} onChange={(e)=>{
          setDayObj(dayObj.month(e.target.value))
        }}></input>
      </div>

      <div>
        <button>add</button>
        <button>sub</button>
      </div>

        <div className="grid grid-cols-7 mt-2 rounded-md border overflow-hidden p-2"> 
 {CalenderWeeks.map((weekDay) => {
   Weeksindex = Weeksindex + 1
   return  <div className="" key={`weekday_${Weeksindex}`}>
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
                  <Day key={`${dateofMonth}-${CalenderMonth}-${CalenderYear}`} day={day} startOfThisMonth={dayjs(`${dayObj.year()}-${dayObj.month() + 1}-1`, "YYYY-MM-DD").startOf("month").day()} dateofMonth={dateofMonth} month={CalenderMonth} year={CalenderYear} today={today}/>
              )
            })}
    </div>
    </div>
     
}


/*      <div key={`${dateofMonth}-${month}-${year}`}>
                <button
              className={`text-center hover:bg-green-200 ${dateofMonth === key && "text-green-500"}`}
              key={`${dateofMonth}-${month}-${year}`}
              onClick = {()=>{

              }}
            >
              {day + 1}
            </button>
            <div className={`bg-gray-200 -mt-2 z-50 hidden`}>
                Hey
            </div>

           </div>*/
/*  */

/*  dateofMonth = dateofMonth + 1 */