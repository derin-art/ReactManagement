import React, {useState, useEffect, useRef, memo} from "react";
import ReactDOM from "react-dom" 
import Header from "../utils/Header";
import { ForceGraph2D } from "react-force-graph";
import ReactImg from "./reactImg4.png"
import * as d3 from "d3"
import PreviousMap from "postcss/lib/previous-map";



function ForceGraph({datad, setRenderData}){
    let isHovered = false
    const fgRef = useRef();
    const [openNode, setOpenNode] = useState(true)
    const [hoveredNode, setHoveredNode] = useState(null)
    const [stopEngine, setStopEngine] = useState(false)
    const [coords, setCoords] = useState({x: 0, y: 0});
    const [globalCoords, setGlobalCoords] = useState({x: 0, y: 0});
    const [graphData, setGraphData] = useState()
    const [modalHovered, setModalHovered] = useState(false)
    const [presentPosition, setPresentPosition] = useState({})
    const [NodePosition, setNodePosition] = React.useState()
    const [currentNode, setCurrentNode] = React.useState({id: "mmm"})
    const [createConnection, setCreateConnection] = React.useState(false)
    const [CurrentHovered, setCurrentHovered] = React.useState({id: "mmam"})
    const [newConnection, setNewConnection] = React.useState({id: "", name: "", isProps: false, size: "" })
    


    const OpenModal = ()=>{
      const finalCoor = JSON.parse(localStorage.getItem("mode"))
      return ReactDOM.createPortal(<div className="ml-4 p-4 bg-blue-300" onMouseLeave={()=>{setModalHovered(false)}} onMouseOver={()=>{setModalHovered(true)}} style={{position:"absolute", top: NodePosition.y, left: NodePosition.x}}>
        Portal
      </div>, document.body)
    }

    const setPosition = (e) => {
      let position = {};
      position.x = e?.pageX;
      position.y = e?.pageY;
      setNodePosition(position);
    };

    const handleWindowMouseMove = event => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };

    const ModalPopup = ()=>{
        return  ReactDOM.createPortal(<div className="bg-red-500 text-lg h-fit w-32" onMouseOver={()=>{
          setModalHovered(true)
        }}
        onMouseLeave={
          ()=>{
            setModalHovered(false)
          }
        }
        style={{
          position: "absolute", left: coords.x + "px", top: coords.y + "px"
        }}>Hey</div>, document.body)
    }

  const onNodeHover = (node)=>{
    if(node){
      console.log("hry")
      setHoveredNode(node)
      console.log(hoveredNode)

    }
    else{
      setHoveredNode(null)
    }
  
    
  }
    useEffect(() => {
   
      const handleWindowMouseMove = event => {
        setGlobalCoords({
          x: event.screenX,
          y: event.screenY,
        });
      };
   
   
      window.addEventListener('mousemove', handleWindowMouseMove);
      setGraphData(datad)
      return () => {
        window.removeEventListener('mousemove', handleWindowMouseMove);
      };

    }, []);
    
  
    const handleMouseMove = event => {
      setCoords({
        x: event.clientX - event.target.offsetLeft,
        y: event.clientY - event.target.offsetTop,
      });
      
    };
  
   
    const Ricon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm.5 5H8v10h2v-3h2.217l2.18 3h2.472l-2.55-3.51a3.5 3.5 0 0 0-1.627-6.486l-.192-.004zm0 2a1.5 1.5 0 0 1 1.493 1.356L14 10.5l-.007.144a1.5 1.5 0 0 1-1.349 1.35L12.5 12H10V9h2.5z"/></svg>

    return <div className="w-screen h-screen">
        <Header></Header>
        <div className="grid grid-cols-4 grid-rows-4 grid-flow-col h-5/6 gap-4 w-full">
            <div className="col-start-1 col-end-3 p-6 row-span-3 h-full w-full relative" onMouseMove={(e)=>{setPosition(e)}}>
            <ForceGraph2D graphData={graphData}  
           enableNodeDrag={true} 
           ref={fgRef}
           
           linkColor= "green"

           linkWidth={"4"}
           linkAutoColorBy= {
             (link)=>{
               if( link.target === "a"){
                 return "green"
               }
               return "green"
             }
          
           }

           linkDirectionalParticles={(link)=>{
             if(link.isProps){
               return 3
             }
             return 0
           }}
           
           onNodeClick={(node)=>{
             setCreateConnection(true)
             setCurrentNode(node)
             setOpenNode(false)
             console.log(node, "current")
            localStorage.setItem("mode", JSON.stringify(NodePosition))
           }}

            onNodeDrag={(node) => {
                node.fx = node.x;
                node.fy = node.y;
         
              }}
              onNodeDragEnd={(node) => {
                node.fx = node.x;
                node.fy = node.y;
            
           
              }} 

              d3VelocityDecay={1}

              d3AlphaDecay={1}
              
              
              onEngineStop={() => {
                if (!stopEngine) {
                  setStopEngine(true);
                }
              }}
            
              backgroundColor="#F5F5F5"
            linkDirectionalParticleSpeed={() => 1 * 0.01} autoPauseRedraw={false} nodeLabel={(node)=>{
              return node.id
            }} nodeVisibility={true}

           linkLabel={(link)=>{
             if(link.info){
               return link.info
             }
             return "link active"
           }}

            nodeCanvasObject={(node, ctx)=>{
          
             let size = 13
              const newImg = new Image()
              newImg.src = ReactImg
              newImg.width = "60px"
              if(node.val){
               if(node.val === "1"){
                size = size * parseInt(node.val) * 1.5
                
               }
               else{
                size = size * parseInt(node.val)
               }
              }

           
              newImg.height = 2
              newImg.style ={
                backgroundColor: "black"
              }
              ctx.font = `6px Tilt`
              ctx.textAlign = "left"
              ctx.textBaseline = "middle"
              ctx.fillStyle = "black"
       
              ctx.drawImage(
                newImg,
                node.x - size / 2,
                node.y - size / 2,
                size ,
                size
              )
            const  YTranslate = node.val === "3" ?node.y + 10 + size/3 :node.y + 10 + size/5
              ctx.fillText(node.id, node.x, YTranslate)
       
           
              
            }}
           
            cooldownTime={7000}

          
            
            ></ForceGraph2D>
      
          
           <div>
             {!openNode &&    <div className={`absolute bg-gray-200 bg-opacity-75 p-8 font-Tilt w-fit text-white rounded-lg border-l-8 border-green-400 text-xs`} style={{position:"absolute", top: JSON.parse(localStorage.getItem("mode")).y - 50, left: JSON.parse(localStorage.getItem("mode")).x}}>
                  <button onClick={()=>{setOpenNode(true)}} className="bg-red-500 text-white p-1 text-sm rounded-lg mb-2">
                     Close
                   </button>

                   <button className="bg-gray-700 text-white p-2 text-sm rounded-lg mb-2 ml-2" onClick={()=>{
                     setNewConnection({name: "", id: "", size: "", isProps: false})
                     setCreateConnection(prev => !prev)}}>
                       {createConnection ? "Create New Connection" : "Close Connection menu"}
                   </button>
                
                   <div  className= {`${createConnection && "hidden"} text-black`}>
                   <input placeholder="new component name" className="rounded-lg mb-2 p-1" value={newConnection.name} onChange={(e)=>{setNewConnection(prev => ({...prev, name:e.target.value}))}}>
                   </input>
                   <input placeholder="new component id" className="rounded-lg mb-2 p-1 ml-2" value={newConnection.id} onChange={(e)=>{setNewConnection(prev => {return {...prev, id:e.target.value}})}}>

                   </input>
                   <div className="flex">
                     <button className={`p-1 bg-white mr-2 text-xs rounded-lg hover:bg-green-300 hover:text-white ${newConnection.size === "1" ? "bg-green-400 text-white" : ""}`} onClick={()=>{
                       setNewConnection(prev => {
                   
                         return  {...prev, size: "1" }
                       })
                     }}>  
                       small                     
                     </button>
                     <button className={`p-1 bg-white mr-2 text-xs rounded-lg hover:bg-green-300 hover:text-white ${newConnection.size === "2" ? "bg-green-400 text-white" : ""}`} onClick={()=>{
                       setNewConnection(prev => {
                   
                         return  {...prev, size: "2" }
                       })
                     }} >  
                       Meduim                
                     </button>
                     <button className={`p-1 bg-white text-xs rounded-lg hover:bg-green-300 hover:text-white ${newConnection.size === "3" ? "bg-green-400 text-white" : ""}`} onClick={()=>{
                       setNewConnection(prev => {
                   
                         return  {...prev, size: "3" }
                       })
                     }}>  
                       Large                  
                     </button>
                   </div>

                   <div className="mt-2 mb-2">
                     <button>
                       <button className={`bg-red-500 p-2 text-white rounded-lg ${newConnection.isProps && "bg-green-400"}`} onClick={()=>{
                         setNewConnection(prev => {
                           const isPropsBool = newConnection.isProps
                           return {...prev, isProps: !isPropsBool}
                         })
                       }}>{newConnection.isProps ? "Props": "NoProps"}</button>
                     </button>
                   </div>

                   <div>
                   <textarea placeholder="component info" className="rounded-lg p-2">
                     
                     </textarea>
                     <textarea placeholder="Link Relationship" className="rounded-lg p-2 ml-2">
                     
                     </textarea>
                   </div>
                    
                   <button className="mt-2 p-2 bg-gray-700 rounded-lg text-white" onClick={()=>{
                     if(newConnection.name === "" || newConnection.id === "") return
                     if(newConnection.size === "") return
                     setRenderData(prev => {
                    
                       const nodes = prev.nodes
                       const links = prev.links
                       setGraphData({nodes: [...nodes, {id: newConnection.id, name: newConnection.name, val: newConnection.size, info: ""}], links: [...links, {source: currentNode.id, target: newConnection.id, isProps: newConnection.isProps, recieveProps: false, relDetails: ""}]})
                       
                       return {nodes: [...nodes, {id: newConnection.id, name: newConnection.name, val: newConnection.size, info: ""}], links: [...links, {source: currentNode.id, target: newConnection.id,  isProps: false, recieveProps: false, relDetails: ""}]}
                     })
                   }}>
                     Create New component
                   </button>
                   </div>
               
                
                   
                   </div>}
             </div>
            </div>

          
        </div>    
    </div>
}

export default memo(ForceGraph)