import { Chart, LinearScale, PointElement } from 'chart.js';
import { ForceDirectedGraphController, EdgeLine } from 'chartjs-chart-graph';
import Graph from "./Another";
import * as d3 from "d3"
import React, {useState} from "react";
import { ForceGraph2D} from 'react-force-graph'
/* import ReactRecorder, {Recorder} from "react-voice-recorder"
import MicRecorder from 'mic-recorder-to-mp3'
import 'react-voice-recorder/dist/index.css' */
import { useReactMediaRecorder } from "react-media-recorder"
/* import { ReactMediaRecorder } from "react-media-recorder"; */
import { Dayjs } from "dayjs";
import Calender from "../utils/calender";
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import RichEditorExample from "./Note";


// register controller in chart.js and ensure the defaults are set
Chart.register(ForceDirectedGraphController, EdgeLine, LinearScale, PointElement);

const Modi = new Chart({
  type: ForceDirectedGraphController.id,
  data:  [{
    labels: ['A', 'B', 'C'], // node labels
    datasets: [{
      data: [ // nodes as objects
        { x: 1, y: 2 }, // x, y will be set by the force directed graph and can be omitted
        { x: 3, y: 1, parent: 0 },
        { x: 5, y: 3, parent: 0 }
      ]
    }]
  }
] ,
});

/* {
    labels: ['A', 'B', 'C'], // node labels
    datasets: [{
      data: [ // nodes as objects
        { x: 1, y: 2 }, // x, y will be set by the force directed graph and can be omitted
        { x: 3, y: 1 },
        { x: 5, y: 3 }
      ],
      edges: [ // edge list where source/target refers to the node index
        { source: 0, target: 1},
        { source: 0, target: 2}
      ]
    }]
  } */



export default function Sound(){
  const actual = {
    nodes: [
      
    ]
  }
  const data = {
    nodes: [
     {id: "Myriel", group: 1},
  {id: "Napoleon", group: 1},
  {id: "Mlle.Baptistine", group: 1},
  {id: "Mme.Magloire", group: 1},
  {id: "CountessdeLo", group: 1},
  {id: "Geborand", group: 1},
  {id: "Champtercier", group: 1},
  {id: "Cravatte", group: 1},
  {id: "Count", group: 1},
  {id: "OldMan", group: 1},
    {id: "Labarre", group: 2},
    {id: "Valjean", group: 2},
    {id: "Marguerite", group: 3},
    {id: "Mme.deR", group: 2},
    {id: "Isabeau", group: 2},
 {id: "Gervais", group: 2},
   {id: "Tholomyes", group: 3},
    {id: "Listolier", group: 3},
    {id: "Fameuil", group: 3}
    ],
    links: [
      {source: "Napoleon", target: "Myriel", value: 1},
  {source: "Mlle.Baptistine", target: "Myriel", value: 8},
  {source: "Mme.Magloire", target: "Myriel", value: 10}
    ]
  }
  
  
   const { status, startRecording, stopRecording, mediaBlobUrl } =
  useReactMediaRecorder({   type: "audio/wav" });  
  const [editState, setEidtState] = useState(()=> EditorState.createEmpty())

  const saveToLocal = (item)=>{
    localStorage.setItem("text", JSON.stringify(item))
  }
  
  const onChange = (editState)=>{
    setEidtState(editState)
    
  }

  const handleKeyCommand =(command, editState)=>{
    const newState = RichUtils.handleKeyCommand(editState, command)
    if(newState){
      onChange(newState)
      return "handled"
    }

    return "not-handled"
  }

  const onBoldClick = ()=>{
    onChange(RichUtils.toggleInlineStyle(editState, "BOLD"))
  }
   const datad =  {nodes: [{id: "a", val: "1", name: "gut"}, {id: "b", val: "2", name: "ehy"}, {id: "c"}], 
    links: [{source:"a", target: "b"}, {source:"c", target: "a"}]}
    
    const [real, setReal] = React.useState(false)

    React.useEffect(()=>{
      setReal(true)
    }, [])

    return <div>
     <div className="max-w-3xl">
      <ForceGraph2D graphData={datad} backgroundColor="#ffffff" nodeColor={"#000000"}></ForceGraph2D>
     <RichEditorExample saveToLocal={saveToLocal}></RichEditorExample>
     </div>
      <div>
      <Calender />
      </div>
       <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <audio src={mediaBlobUrl} controls loop /> 
    </div>
}

/*  useRef="editor" */

/*   <div className="border w-96 border-black h-96">
      <div className="flex">
        <button onClick={()=>{onBoldClick()}}>Bold</button>
      </div>
      {/* <Editor editorState={editState} handleKeyCommand={handleKeyCommand} onChange={setEidtState}></Editor> */
       