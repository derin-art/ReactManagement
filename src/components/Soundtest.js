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





export default function Sound({voiceProp}){

  let voiceNotes

  if(!JSON.parse(localStorage.getItem("voiceNotes"))){
    localStorage.setItem("voiceNotes", JSON.stringify({}))
    voiceNotes =  JSON.parse(localStorage.getItem("voiceNotes"))
  }
  else{
    voiceNotes = JSON.parse(localStorage.getItem("voiceNotes"))
  }

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var analyser = audioCtx.createAnalyser();
  

  const { status, startRecording, stopRecording, mediaBlobUrl } =
  useReactMediaRecorder({   type: "audio/wav" });  

  const [voiceNoteName, setVoiceNoteName] = useState("")
  const [allVoiceNotes, setAllVoiceNotes] = useState(voiceNotes) 

  let audioSRC 

  const handleSave = async () => {
    const audioBlob = await fetch(voiceProp).then((r) => r.blob());
    const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });
    audioSRC = audioFile
    const formData = new FormData(); // preparing to send to the server

    formData.append('file', audioFile);  // preparing to send to the server

    
  }

  handleSave()

  

  console.log(mediaBlobUrl)
  


    return <div>
     <div className="max-w-3xl">
     </div>
      <div className=''>
      <input type="text"placeholder='Input Recording Name' onChange={(e)=>{
        setVoiceNoteName(e.target.value)
      }}></input>
      <button onClick={()=>{
        if(!voiceNoteName) return

        let localVoiceNotes = JSON.parse(localStorage.getItem("voiceNotes"))
        localStorage.setItem("voiceNotes", JSON.stringify({...localVoiceNotes, [voiceNoteName]: mediaBlobUrl}))
      }}>Save</button>
      </div >
       <p>{status}</p>
       <div className='flex flex-col'>
       <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
       </div>
       <audio src={audioSRC} controls></audio>
      <audio src={mediaBlobUrl} controls /> 
    </div>
}

/* navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
  // Collection for recorded data.
  let data = [];

  // Recorder instance using the stream.
  // Also set the stream as the src for the audio element.
  const recorder = new MediaRecorder(stream);
  audio.srcObject = stream;

  recorder.addEventListener('start', e => {
    // Empty the collection when starting recording.
    data.length = 0;
  });

  recorder.addEventListener('dataavailable', event => {
    // Push recorded data to collection.
    data.push(event.data);
  });

  // Create a Blob when recording has stopped.
  recorder.addEventListener('stop', () => {
    const blob = new Blob(data, { 
      'type': 'audio/mp3' 
    });
    sendAudioFile(blob);
  });

  // Start the recording.
  recorder.start();
}); */