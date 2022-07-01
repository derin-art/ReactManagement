import React, {useState} from "react";

export default function Header(){
    return <div className="p-1 font-Tilt bg-white mb-1 font-bold">
        <button className="font-bold">
            Menu
        </button>
        <button>
        ForceGraph
        </button>
        <button>
            Task
        </button>
    </div>
}