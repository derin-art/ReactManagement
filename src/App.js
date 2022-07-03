import logo from './logo.svg';
import './App.css';
import Graph from './components/Another';
import Sound from './components/Soundtest';
import 'draft-js/dist/Draft.css';
import * as d3 from "d3"
import RichEditorExample from './components/Note';
import { ForceGraph2D} from 'react-force-graph'
import ForceGraph from './MainPage/ForceGraph';
import React, { useState } from 'react';
import Calender from './utils/calender';
import Header from './utils/Header';
import uuid from 'draft-js/lib/uuid';


function App() {
  const datad = {nodes: [
    { id: "a", val: "2", name: "App", isProvider: false, isConsumer: false, info: "The start"}
   ], 

links: []}
/* bg-gradient-to-r from-green-100 via-purple-100 to-blue-100  */
  let allOldNotes
  if(!JSON.parse(localStorage.getItem("notes"))){
    localStorage.setItem("notes", JSON.stringify({}))
    allOldNotes = JSON.parse(localStorage.getItem("notes"))
  }
  else{
    allOldNotes =  JSON.parse(localStorage.getItem("notes"))
  }
  
  let localVoice

  if( !JSON.parse(localStorage.getItem("voiceNotes"))){
    localStorage.setItem('voiceNotes', JSON.stringify({}))
    localVoice = JSON.parse(localStorage.getItem("voiceNotes"))
  }
  else{
    localVoice =  JSON.parse(localStorage.getItem("voiceNotes"))
  }
  
  const [voiceProp, setVoiceProp] = useState()
  const [isRecorderView, setIsRecorderView] = useState(false)
  const [localVoiceNotes, setLocalVoiceNotes] = useState(localVoice)
   const [timesRan, setTimeRan] = React.useState(1)
   const [graphRan, setGraphRan] = React.useState(false)
  const [renderData, setRenderData] = React.useState(datad)
  const [oldNotes, setOldNotes] = React.useState(allOldNotes)
  const [noteName, setNoteName] = React.useState("")
  const [notes, setNotes] = React.useState(false)
  const [Physics, setPhysics] = React.useState(1)

  const saveToLocal = (item, name)=>{
    const newLocal = JSON.parse(localStorage.getItem("notes"))
    if(!newLocal){
      localStorage.setItem("notes", JSON.stringify({}))
    }
    localStorage.setItem("notes", JSON.stringify({...newLocal, [name]: item }))
  }
  const saveIcon = <svg xmlns="http://www.w3.org/2000/svg" className='fill-white' viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.414 5H20a1 1 0 0 1 1 1v1H3V4a1 1 0 0 1 1-1h7.414l2 2zM3.087 9h17.826a1 1 0 0 1 .997 1.083l-.834 10a1 1 0 0 1-.996.917H3.92a1 1 0 0 1-.996-.917l-.834-10A1 1 0 0 1 3.087 9z"/></svg>
  const backIcon = <svg xmlns="http://www.w3.org/2000/svg" className='fill-white' viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z"/></svg>
  const DeleteIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/></svg>

  const returnDeleteIcon = (id)=>{
    return <svg xmlns="http://www.w3.org/2000/svg" id={id} viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/></svg>
  }

  return ( <div className='overflow-x-hidden flex flex-col h-screen w-screen p-4'>

    <div className='flex h-full w-full'>
      
      <div className='bg-white h-full w-full mr-2 rounded-xl shadow-lg shadow-indigo-200 transition-shadow ease-in-out delay-150 duration-300 hover:shadow-indigo-300'>
      <ForceGraph datad={renderData} Physics={Physics} setPhysics={setPhysics} setRenderData={setRenderData} timesRan={timesRan} setTimeRan={setTimeRan} setGraphRan={setGraphRan}></ForceGraph>
      </div>

      <div className='flex flex-col h-full w-2/3 mr-2'>
        <div className='bg-white h-full w-full mb-2 rounded-xl p-4 shadow-lg shadow-indigo-200 transition-shadow ease-in-out delay-150 duration-300 hover:shadow-indigo-300'>
        <div className='p-3 bg-black text-white font-Tilt mb-3 text-2xl font-bold'>Calendar</div>
        <Calender></Calender>
        </div>
    
      </div>

      <div className='h-full w-3/5 flex flex-col justify-center items-center'>
        <div className='w-full shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-shadow ease-in-out delay-150 duration-300 h-full w-[400px] max-h-full justify-center items-center mb-2 rounded-lg bg-white '>
          <div className='p-3'>
            <div className='text-lg text-white font-Tilt flex items-center justify-center'>
              <div className='w-[370px] flex justify-between bg-black p-3'>
              <div className='font-bold'>  NoteBook </div>
             <button onClick={()=>{
              setNotes(prev => !prev)
              setNoteName("")
              setOldNotes(JSON.parse(localStorage.getItem('notes')))
            }} className={`${!notes && "hidden"}`}>
          {saveIcon}
          </button>
              </div>
            </div>
            {notes ? <RichEditorExample saveToLocal={saveToLocal} noteName={noteName}></RichEditorExample>: 
            <div className='mt-4'>
                <div className="bg-blue-100 border-blue-500 hidden"></div>
          <div className="bg-red-100 border-red-500 hidden"></div>
          <div className="bg-green-100 border-green-500 hidden"></div>
          <div className="bg-indigo-100 border-indigo-500 hidden"></div>
          <div className="bg-yellow-100 border-yellow-500 hidden"></div>
              <input placeholder='Input Name of New Note' className='font-Tilt text-sm p-2 border border-indigo-200 mr-2 placeholder:text-xs' onChange={(e)=>{setNoteName(e.target.value)}}></input>
              <button className='font-Tilt text-sm border border-black p-2' onClick={()=>{
                if(!noteName) return
                setNotes(true)}
              }>Create New Note</button>
              <div className='h-48 overflow-auto mt-2'>
              {Object.keys(oldNotes).map(item => {
                let localColor
                if(JSON.parse(localStorage.getItem("noteColors"))){
                  localColor = JSON.parse(localStorage.getItem("noteColors"))[item]
                }
                else{
                  localColor = "blue"
                }
                
               return <div key={uuid()} className={`flex justify-between font-Tilt border-l-4 p-1 mb-1 border-${localColor}-500`}>
                 
                 <button id={item} onClick={(e)=>{
                   setNoteName(e.target.id)
                   setNotes(prev => !prev)
                 }}>{item}</button>
                 <button id={item} onClick={(e)=>{
                   console.log(e.target)
                   const filteredOldNotes = Object.entries(oldNotes).filter(([key, val])=>{
                    
                     
                       return key !== e.target.id
                     
                   })

                 
                   localStorage.setItem("notes", JSON.stringify(Object.fromEntries(filteredOldNotes)))
                   setOldNotes(JSON.parse(localStorage.getItem("notes")))
              
                 }}>{returnDeleteIcon(item)}</button>
               </div>
              })}
              </div>
            </div>
            }
          </div>
        </div>

        
      </div>
     

    </div>

    
  </div>
  );
}

export default App;


