import logo from './logo.svg';
import './App.css';
import Graph from './components/Another';
import Sound from './components/Soundtest';
import 'draft-js/dist/Draft.css';
import * as d3 from "d3"
import { ForceGraph2D} from 'react-force-graph'
import ForceGraph from './MainPage/ForceGraph';
import React from 'react';

function App() {
  const datad = {nodes: [
    { id: "a", val: "2", name: "gut", isProvider: false, isConsumer: false, info: ""}, 
    {id: "b", val: "2", name: "ehy", isProvider: false,  isConsumer: false, info: ""},
     {id: "c", isProvider: false,  isConsumer: false, info: ""}], 

links: [{source:"a", target: "b", isProps: false, relDetails: ""}, {source:"c", target: "a", isProps: true, relDetails: ""}]}
  const [renderData, setRenderData] = React.useState(datad)
  return ( <div className='max-w-screen overflow-x-hidden'>
    <ForceGraph datad={renderData} setRenderData={setRenderData}></ForceGraph>
  </div>
  );
}

export default App;


