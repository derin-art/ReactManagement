import React, {useState, useEffect, useRef, memo} from "react";
import ReactDOM from "react-dom" 
import Header from "../utils/Header";
import { ForceGraph2D } from "react-force-graph";
import ReactImg from "./reactImg4.png"
import * as d3 from "d3"
import PreviousMap from "postcss/lib/previous-map";
import uuid from "draft-js/lib/uuid";



function ForceGraph({datad, setRenderData,  timesRan}){

  
    const fgRef = useRef();
    
    const [itemsToBeDeleted, setItemsToBeDeleted] = useState(1)
    const [deletePopup, setDeletePopup] = useState(false)
    const [deleteCertainty, setDeleteCertainty] = useState(false)
    const [openNode, setOpenNode] = useState(true)
    const [hoveredNode, setHoveredNode] = useState(null)
    const [coords, setCoords] = useState({x: 0, y: 0});
    const [globalCoords, setGlobalCoords] = useState({x: 0, y: 0});
    const [graphData, setGraphData] = useState()
    const [modalHovered, setModalHovered] = useState(false)
    const [NodePosition, setNodePosition] = React.useState()
    const [NodeHierachy, setNodeHierachy] = React.useState(0)
    const [currentNode, setCurrentNode] = React.useState({id: "mmm"})
    const [createConnection, setCreateConnection] = React.useState(false)
    const [CurrentHovered, setCurrentHovered] = React.useState({id: "mmam"})
    const [newConnection, setNewConnection] = React.useState({id: "", name: "", isProps: false, size: "" , info: "", linkDetails: ""})
  

    const setPosition = (e) => {
      let position = {};
      position.x = e?.pageX;
      position.y = e?.pageY;
      setNodePosition(position);
    };



    useEffect(() => {
      setGraphData(datad)
      const handleWindowMouseMove = event => {
        setGlobalCoords({
          x: event.screenX,
          y: event.screenY,
        });
      };
   
   
      window.addEventListener('mousemove', handleWindowMouseMove);
    
      return () => {
        window.removeEventListener('mousemove', handleWindowMouseMove);
      };

    }, []);
    
  
  

    return <div className="w-full h-full">
        <div className="">
            <div className="col-start-1 col-end-3 p-6 row-span-3 h-full w-full relative" onMouseMove={(e)=>{setPosition(e)}}>
            <ForceGraph2D graphData={graphData}  
           enableNodeDrag={true} 
           ref={fgRef}
           width={600}
           height={600}
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

            onNodeDragEnd = {(node)=>{
              setGraphData(prev => prev)
              setRenderData(prev => prev)
            }}

            d3VelocityDecay={1}
            
            backgroundColor="#F5F5F5"
            linkDirectionalParticleSpeed={() => 1 * 0.01} autoPauseRedraw={false} nodeLabel={(node)=>{
              if(node.info){
                return node.info
              }
              return "No info available :["
            }} nodeVisibility={true}
            
           linkLabel={(link)=>{
             if(link.relDetails){
               return link.relDetails
             }
             return "link active"
           }}

           
            nodeCanvasObject={(node, ctx)=>{
          
             let size = 6
              const newImg = new Image()
              newImg.src = ReactImg
              newImg.width = "20px"
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
              ctx.fillText(node.name, node.x, YTranslate)
       
           
              
            }}
           cooldownTicks={0}
           warmupTicks={0}
            cooldownTime={7000}

            

          
            
            ></ForceGraph2D>
      
          
           <div>
             {!openNode &&    <div className={`absolute bg-gray-200 bg-opacity-75 p-8 font-Tilt w-fit text-white rounded-lg border-l-8 border-green-400 text-xs`} style={{position:"absolute", top: JSON.parse(localStorage.getItem("mode")).y - 50, left: JSON.parse(localStorage.getItem("mode")).x}}>
                  <button onClick={()=>{setOpenNode(true)}} className="bg-red-500 text-white p-1 text-sm rounded-lg mb-2">
                     Close
                   </button>

                   <button className="bg-gray-700 text-white p-2 text-sm rounded-lg mb-2 ml-2" onClick={()=>{
                      setDeletePopup(false)
                      setDeleteCertainty(false)
                     setNewConnection({name: "", id: "", size: "", isProps: false, info: "", linkDetails: ""})
                     setCreateConnection(prev => !prev)}}>
                       {createConnection ? "Create New Connection" : "Close Connection menu"}
                   </button>
                
                   <div  className= {`${createConnection && "hidden"} text-black`}>
                   <input placeholder="new component name" className="rounded-lg mb-2 p-1" value={newConnection.name} onChange={(e)=>{setNewConnection(prev => ({...prev, name:e.target.value}))}}>
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
                  
                       <button className={`bg-red-500 p-2 text-white rounded-lg ${newConnection.isProps && "bg-green-400"}`} onClick={()=>{
                         setNewConnection(prev => {
                           const isPropsBool = newConnection.isProps
                           return {...prev, isProps: !isPropsBool}
                         })
                       }}>{newConnection.isProps ? "Props": "NoProps"}</button>
                    
                   </div>

                   <div>
                   <textarea placeholder="component info" className="rounded-lg p-2" value={newConnection.info} onChange={(e)=>{
                     setNewConnection(prev => ({...prev, info: e.target.value}))
                   }}>
                     
                     </textarea>
                     <textarea placeholder="Link Relationship" value={newConnection.linkDetails} className="rounded-lg p-2 ml-2" onChange={(e)=>{
                       setNewConnection(prev => ({...prev, linkDetails: e.target.value}))
                     }}>
                     
                     </textarea>
                   </div>
                   <button className="mt-2 bg-gray-700 text-white rounded-lg p-2 mr-2" onClick={()=>{
                     const foundIdArray = []
                     const recursiveFinder = (foundId)=>{
                      let presentParent = ""
                      let presentId = foundId
                      const nodes = graphData.nodes
                      nodes.forEach(node => {
                        if(node.id === presentId){
                          if(node.childrenNode){
                            node.childrenNode.forEach(item => {
                              foundIdArray.push(item)
                              recursiveFinder(item)
                            })
                          }
                          else{
                            return
                          }
                        }
                        else{
                          return
                        }
                      })
                     
                   }
                   recursiveFinder(currentNode.id)
                   console.log(foundIdArray)
                   }}>
                     Find
                   </button>

                    <button className= {`mt-2 bg-gray-700 text-white rounded-lg p-2 mr-2 ${currentNode.id === "a" && "hidden"}`} onClick={()=>{
        
                     if(deleteCertainty){
                      setOpenNode(prev => !prev)
                     }
                     
                     

                     const foundIdArray = []
                        const recursiveFinder = (foundId)=>{
                         let presentId = foundId
                         const nodes = graphData.nodes
                         nodes.forEach(node => {
                           if(node.id === presentId){
                             if(node.childrenNode){
                               node.childrenNode.forEach(item => {
                                 foundIdArray.push(item)
                                 recursiveFinder(item)
                               })
                             }
                             else{
                               return
                             }
                           }
                           else{
                             return
                           }
                         })
                        
                      }
                      recursiveFinder(currentNode.id)

                      console.log(foundIdArray)
                      setDeletePopup(true)
                      setItemsToBeDeleted(foundIdArray.length + 1)
                     if(!deleteCertainty) return

                      setRenderData(prev => {
                        const nodes = prev.nodes
                        const links = prev.links
                     

                        const foundIdArray = []
                        const recursiveFinder = (foundId)=>{
                         let presentId = foundId
                         const nodes = graphData.nodes
                         nodes.forEach(node => {
                           if(node.id === presentId){
                             if(node.childrenNode){
                               node.childrenNode.forEach(item => {
                                 foundIdArray.push(item)
                                 recursiveFinder(item)
                               })
                             }
                             else{
                               return
                             }
                           }
                           else{
                             return
                           }
                         })
                        
                      }
                      recursiveFinder(currentNode.id)
                      console.log(foundIdArray)
                      
                      foundIdArray.push(currentNode.id)

                      const newNodes =  nodes.filter(item => {
                        if(item.id !== currentNode.id){
                          return item
                        }
                      })

                     const filteredFoundArray = newNodes.filter(node =>{
                       if(!foundIdArray.includes(node.id)){
                         return node
                       }
                     })

                      const newLinks = links.filter(item => {
                        if(item.target !== currentNode.id){
                          return item
                        }
                      })

                      console.log(newLinks)
                      const rendLinks = newLinks.map(link => {
                       if(typeof(link.target == "object")){
                         if(link.target.id !== currentNode.id && !foundIdArray.includes(link.target.id)){
                           return link
                         }
                         else{
                           return
                         }
                       }
                       else{
                         if(link.target !== currentNode.id && !foundIdArray.includes(link.target)){
                           return link
                         }
                         else{
                           return
                         }
                       }
                      })

                      console.log("filtered", filteredFoundArray)
                      
                      console.log("map",rendLinks)

                      const newRendLinks = rendLinks.map(link => {
                       if(link){
                        if(typeof(link.source == "object")){
                          if(currentNode.id !== link.source.id){
                            return link
                          }
                          else{
                            return
                          }
                        }
                        else{
                          if(link.source !== currentNode.id){
                            return link
                          }
                          else{
                            return
                          }
                        }
                       }
                       })

                    console.log(rendLinks, "red")
                   const filRend =   newRendLinks.filter(link =>{
                        if(link && link.source !== currentNode.id){
                          if(!foundIdArray.includes(link.source)){
                            return link
                          }
                        }
                      })
                
                      console.log("filteredLinks", filRend )
                      setGraphData({nodes: [...filteredFoundArray], links: [...filRend]})
                      return {nodes: [...filteredFoundArray], links: [...filRend]}
                      })
                    }}>
                      delete node
                    </button>




                   <button className="mt-2 p-2 bg-gray-700 rounded-lg text-white" onClick={()=>{
                     const currentId = uuid()
                     if(newConnection.name === "" || newConnection.size === "") return


                     setRenderData(prev => {
                   
                      const nodes = prev.nodes
                      const links = prev.links
                     const renderLinks = links.map(link =>  {
                     return {
                        source: typeof(link.source) == "object" ? link.source.id : link.source,
                        target: typeof(link.target) == 'object' ? link.target.id : link.target,
                        isProps: link.isProps,
                        recieveProps: link.recieveProps,
                        relDetails: link.relDetails,
                         
                      
                      }
                     })
                    
                      const DataTransformation = {nodes: [...nodes, {id: currentId, name: newConnection.name, val: newConnection.size, info: newConnection.info, heirachy: NodeHierachy, parents: currentNode.id}], links: [...links, {source: currentNode.id, target: currentId, isProps: newConnection.isProps, recieveProps: false, relDetails: newConnection.linkDetails}]}
                      const ModifiedDataNode =   DataTransformation.nodes.map(item => {
                         console.log(item.id, currentNode.id)
                         if(item.id === currentNode.id){
                           if(item.childrenNode){
                             return {...item, childrenNode: [...item.childrenNode, currentId], yams: "jdj"}
                           }
                           else{
                             return {...item, childrenNode: [currentId]}
                           }
                         }
                         else{
                           return item
                         }
                     
                      })

                    
                     /*  [...links, {source: currentNode.id, target: currentId, isProps: newConnection.isProps, recieveProps: false, relDetails: newConnection.linkDetails}] */
                      const modifiedLinks = DataTransformation.links
                      console.log(ModifiedDataNode)
                      setGraphData({nodes: ModifiedDataNode,  links: [...renderLinks, {source: currentNode.id, target: currentId, isProps: newConnection.isProps, recieveProps: false, relDetails: newConnection.linkDetails}]})
                      return {nodes: ModifiedDataNode,  links: [...renderLinks, {source: currentNode.id, target: currentId, isProps: newConnection.isProps, recieveProps: false, relDetails: newConnection.linkDetails}]}
                     }
                     
                     )
                   }}>
                     Create New component
                   </button>
                   </div>
                   <div className={`mt-2 font-bold ${deleteCertainty ? "text-green-400": "text-red-500"} ${!createConnection ? deletePopup ? "block": "hidden": "hidden"}`}>
                    {deleteCertainty ? `Yeah, I'm sure`: `Are you sure you want to delete ${itemsToBeDeleted} item(s)?`}
                   </div>
                   <button onClick={()=>{setDeleteCertainty(true)}} className={`text-white p-2 ${!createConnection ? deletePopup ? "block": "hidden": "hidden"}  ${deleteCertainty ? "bg-green-400": "bg-red-500"}`}>GO ahead</button>
                
                   
                   </div>}
             </div> 
            </div>

          
        </div>    
    </div>
}

export default memo(ForceGraph)