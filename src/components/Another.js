import React from "react";
import { ForceGraph2D} from 'react-force-graph'

export default function Graph(){
    const [grapDat, setGraph] = React.useState({nodes: [
        { id: "a", val: "2", name: "gut", isProvider: false, isConsumer: false, info: ""}, 
        {id: "b", val: "2", name: "ehy", isProvider: false,  isConsumer: false, info: ""},
         {id: "c", isProvider: false,  isConsumer: false, info: ""}], 

    links: [{source:"a", target: "b", isProps: false, recieveProps: false}, {source:"c", target: "a", isProps: true, recieveProps: false}]})

    const data =  {nodes: [{id: "a", val: "1", name: "gut"}, {id: "b", val: "2", name: "ehy"}, {id: "c"}], 
    links: [{source:"a", target: "b"}, {source:"c", target: "a"}]}

    return   <div className="">
         <ForceGraph2D  graphData={grapDat} showNavInfo={true} height={650} linkSource="a" linkTarget="b" nodeRelSize={1}
></ForceGraph2D>
    </div>
}