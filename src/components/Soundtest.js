import { Chart, LinearScale, PointElement } from 'chart.js';
import { ForceDirectedGraphController, EdgeLine } from 'chartjs-chart-graph';
import Graph from "./Another";
import * as d3 from "d3"
import React, {useState} from "react";
import { ForceGraph2D} from 'react-force-graph'
import { useReactMediaRecorder } from "react-media-recorder"
import { Dayjs } from "dayjs";
import Calender from "../utils/calender";
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import RichEditorExample from "./Note";





export default function Sound(){
    
  const { status, startRecording, stopRecording, mediaBlobUrl } =
  useReactMediaRecorder({   type: "audio/wav" });  
 


 

    return <div>
     <div className="max-w-3xl">
     </div>
      <div>
  
      </div >
       <p>{status}</p>
       <div className='flex flex-col'>
       <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
       </div>
      <audio src={mediaBlobUrl} controls loop /> 
      <button>Save</button>
    </div>
}

/*  useRef="editor" */

/*   <div className="border w-96 border-black h-96">
      <div className="flex">
        <button onClick={()=>{onBoldClick()}}>Bold</button>
      </div>
      {/* <Editor editorState={editState} handleKeyCommand={handleKeyCommand} onChange={setEidtState}></Editor> */
       