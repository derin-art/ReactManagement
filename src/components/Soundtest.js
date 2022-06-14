import React, {useState} from "react";
import ReactRecorder, {Recorder} from "react-voice-recorder"
import MicRecorder from 'mic-recorder-to-mp3'
import 'react-voice-recorder/dist/index.css'
import { useReactMediaRecorder } from "react-media-recorder"
import { ReactMediaRecorder } from "react-media-recorder";
import { Dayjs } from "dayjs";
import Calender from "../utils/calender";




export default function Sound(){
   const { status, startRecording, stopRecording, mediaBlobUrl } =
  useReactMediaRecorder({   type: "audio/wav" }); 



 
    return <div>
      <div>
      <Calender month={4} key={4} />
      </div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <audio src={mediaBlobUrl} controls autoPlay loop />
    </div>
}