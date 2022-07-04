import React, {useState, useEffect, useRef, memo} from "react";
import ReactDOM from "react-dom" 
import Header from "../utils/Header";
import { ForceGraph2D } from "react-force-graph";
import ReactImg from "./reactImg4.png"
import * as d3 from "d3"
import PreviousMap from "postcss/lib/previous-map";
import uuid from "draft-js/lib/uuid";



function ForceGraph({datad, setRenderData,  timesRan, Physics, setPhysics}){
  let localModels

  if(JSON.parse(localStorage.getItem("models")) === null){
     localStorage.setItem("models", JSON.stringify({}))
  }

  localModels = JSON.parse(localStorage.getItem("models"))

    const fgRef = useRef();
    const [currentModel, setCurrentModel] = useState("default Model")
    const [isSaved, setIsSaved] = useState(false)
    const [previousMenuHover, setPreviousMenuHover] = useState(false)
    const [modelName, setModelName] = useState("")
    const [localModelsState, setLocalModelsState] = useState(localModels)
    const [itemsToBeDeleted, setItemsToBeDeleted] = useState(1)
    const [deletePopup, setDeletePopup] = useState(false)
    const [deleteCertainty, setDeleteCertainty] = useState(false)
    const [openNode, setOpenNode] = useState(true)
    const [globalCoords, setGlobalCoords] = useState({x: 0, y: 0});
    const [graphData, setGraphData] = useState()
    const [NodePosition, setNodePosition] = React.useState()
    const [NodeHierachy, setNodeHierachy] = React.useState(0)
    const [currentNode, setCurrentNode] = React.useState({id: "mmm"})
    const [createConnection, setCreateConnection] = React.useState(false)
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
    
    const returnDeleteIcon = (id)=>{
      return <svg xmlns="http://www.w3.org/2000/svg" id={id} viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/></svg>
    }
    const saveIcon = <svg xmlns="http://www.w3.org/2000/svg" className='' viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.414 5H20a1 1 0 0 1 1 1v1H3V4a1 1 0 0 1 1-1h7.414l2 2zM3.087 9h17.826a1 1 0 0 1 .997 1.083l-.834 10a1 1 0 0 1-.996.917H3.92a1 1 0 0 1-.996-.917l-.834-10A1 1 0 0 1 3.087 9z"/></svg>
  

    return <div className="w-full h-full">
        <div className="">
            <div className="col-start-1 col-end-3 p-6 row-span-3 h-full w-full relative" onMouseMove={(e)=>{setPosition(e)}}>
            <div className='flex items-center justify-center p-1'>
      <div className='bg-black text-white font-Tilt font-bold text-2xl p-3 w-full'>ReactModels</div>
        </div>
        <div className="flex justify-between p-1 pb-0">
          
          <div className="flex items-start">
          <input className="border font-Tilt border-indigo-200 placeholder:font-Tilt mr-4 p-2" value={modelName} onChange={(e)=>{
            setIsSaved(false)
            setModelName(e.target.value)
        
          }} type="text" placeholder="input Model name"></input>
          <div className="flex flex-col">      <button className="font-Tilt border border-black p-2" onClick={()=>{
            if(!modelName) return
            let localModels = JSON.parse(localStorage.getItem("models"))
            localModels = {...localModels, [modelName]: graphData}
            localStorage.setItem("models", JSON.stringify(localModels))
            setLocalModelsState(JSON.parse(localStorage.getItem("models")))
            if(JSON.parse(localStorage.getItem("models"))[modelName]){
              setIsSaved(true)
            }
            
          }}>Save</button>
          <button className="font-Tilt text-xs p-2 border border-black mt-2" onClick={()=>{
            setPhysics(prev => {
              if(prev === 1){
                return 0.9
              }
              else{
                return 1
              }
            })
          }}>Set {Physics === 1 ? "Physics": "Static"} Mode</button>
          </div>
          <p className="font-Tilt p-2 font-bold text-indigo-300"><span className="text-black flex flex-col">Current Model :</span> {currentModel}</p>
          
          </div>
          <div className="relative">
          
           <div className="absolute -left-32">
           <div className="font-Tilt fixed z-50 px-8 pb-8 rounded-lg hover:shadow-lg" onMouseOver={()=>{setPreviousMenuHover(true)}} onMouseLeave={()=>{setPreviousMenuHover(false)}}>{saveIcon}
            {Object.keys(localModelsState).length > 0 && Object.keys(localModelsState).map(item =>{
              return <div className={`flex justify-between block animate-fadeIn mt-2 ${!previousMenuHover && "hidden"}`} key={item}>
                <button key={item} id={item} onClick={()=>{
                  const newLocalModels = JSON.parse(localStorage.getItem("models"))
                  setRenderData(prev => {
                    const links = newLocalModels[item].links
                    const modefiedLinks = links.map(link => {
                      return {source: link.source, target: link.target, isProps: link.isProps, recieveProps: link.recieveProps, relDetails: link.relDetails}
                    })
                    const renderLinks = links.map(link =>  {
                      return {
                         source: typeof(link.source) == "object" ? link.source.id : link.source,
                         target: typeof(link.target) == 'object' ? link.target.id : link.target,
                         isProps: link.isProps,
                         recieveProps: link.recieveProps,
                         relDetails: link.relDetails,
                          
                       
                       }
                      })
                    const nodes  = newLocalModels[item].nodes
                    const modefiedNodes = nodes.map(node => {
                      return {id: node.id, name: node.name, val: node.size, info: node.info, heirachy: node.heirachy, parents: node.parents}
                    })
                    setCurrentModel(item)
                    setGraphData({nodes: nodes, links: [...renderLinks]})
                    return {nodes: nodes, links: [...renderLinks]}
                  })
               
                }} >{item}</button>
                
                
                
                <button id={item} className="ml-8" onClick={(e)=>{
                 const newLocalModels = Object.entries(localModelsState).filter(([key, val]) => {
                   return key !== e.target.id
                  })
                  localStorage.setItem("models", JSON.stringify(Object.fromEntries(newLocalModels)))
                  setLocalModelsState(JSON.parse(localStorage.getItem("models")))
                }}>{returnDeleteIcon(item)}</button>
              </div>
            })}
            </div>
           </div>
          </div>
        </div>
            <ForceGraph2D graphData={graphData}  
           enableNodeDrag={true} 
           ref={fgRef}
           width={600}
           height={570}
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
            localStorage.setItem("mode", JSON.stringify(NodePosition))
           }}

            onNodeDragEnd = {(node)=>{
              setGraphData(prev => prev)
              setRenderData(prev => prev)
            }}

            d3VelocityDecay={Physics}
            
            
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
          
             let size = 7
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
           cooldownTicks={100}
           warmupTicks={100}
            cooldownTime={5000}

            

          
            
            ></ForceGraph2D>
            
           <div>
             {!openNode &&    <div className={`absolute bg-gray-200 bg-opacity-75 p-8 font-Tilt w-fit text-white rounded-lg border-l-8 border-indigo-400 text-xs`} style={{position:"absolute", top: JSON.parse(localStorage.getItem("mode")).y - 50, left: JSON.parse(localStorage.getItem("mode")).x}}>
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
                   <div className="text-xs font-Tilt text-green-400 font-bold">Size and Name input required for render</div>
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

                  
                   const filRend =   newRendLinks.filter(link =>{
                        if(link && link.source !== currentNode.id){
                          if(!foundIdArray.includes(link.source)){
                            return link
                          }
                        }
                      })
                
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
      
                     
                      setGraphData({nodes: ModifiedDataNode,  links: [...renderLinks, {source: currentNode.id, target: currentId, isProps: newConnection.isProps, recieveProps: false, relDetails: newConnection.linkDetails}]})
                      return {nodes: ModifiedDataNode,  links: [...renderLinks, {source: currentNode.id, target: currentId, isProps: newConnection.isProps, recieveProps: false, relDetails: newConnection.linkDetails}]}
                     }
                     
                     )
                   }}>
                     Create New component
                   </button>
                   </div>
                   <div className={`mt-2 font-bold ${deleteCertainty ? "text-green-400": "text-red-500"} ${!createConnection ? deletePopup ? "block": "hidden": "hidden"}`}>
                    {deleteCertainty ? `If you're sure click the delete button`: `Are you sure you want to delete ${itemsToBeDeleted} item(s)?`}
                   </div>
                   <button onClick={()=>{setDeleteCertainty(true)}} className={`text-white p-2 ${!createConnection ? deletePopup ? "block": "hidden": "hidden"}  ${deleteCertainty ? "bg-green-400": "bg-red-500"}`}>GO ahead</button>
                
                   
                   </div>}
             </div> 
            </div>

          
        </div>    
    </div>
}

export default memo(ForceGraph)

