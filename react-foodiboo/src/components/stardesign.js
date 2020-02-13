import React, { useState, useEffect } from "react";


const stardesign =  ({
    score1,
    score2,
    score3,
    score4,
    score5,
    height = 244,
    width = 254
}) => {

    
    const getY = score => {
        return (Math.abs(score-5))*20;
      };
    
    return (
        <svg height={height} width={width} viewBox="50 0 250 500"  >
        <polyline 
        className="polyline-1"
        points={`100,100 150,100 125,0 100,100 `}
        // style={{  stroke: "black", strokeWidth: 3 }}
      />
       <polyline 
        points={`100,100 150,100 125,${getY(score1)} 100,100 `}
        className="polyline-2"
        // style={{  stroke: "blue", strokeWidth: 3 }}
      />
       <polyline transform="rotate(72 125 134)"
        points={`100,100 150,100 125,0 100,100 `}
        className="polyline-1"
        
      />
      <polyline transform="rotate(72 125 134)"
        points={`100,100 150,100 125,${getY(score2)} 100,100 `}
        className="polyline-2"
        
      />
       <polyline transform="rotate(144 125 134)"
        points={`100,100 150,100 125,0 100,100 `}
        className="polyline-1"
        
      />
      <polyline transform="rotate(144 125 134)"
        points={`100,100 150,100 125,${getY(score3)} 100,100 `}
        className="polyline-2"
        />
       <polyline transform="rotate(216 125 134)"
        points={`100,100 150,100 125,0 100,100 `}
        className="polyline-1"
        
      />
      <polyline transform="rotate(216 125 134)"
        points={`100,100 150,100 125,${getY(score4)} 100,100 `}
        className="polyline-2"
      />
       <polyline transform="rotate(288 125 134)"
        points={`100,100 150,100 125,0 100,100 `}
        className="polyline-1"
        
      />
      <polyline transform="rotate(288 125 134)"
        points={`100,100 150,100 125,${getY(score5)} 100,100 `}
        className="polyline-2"
           />
      <polyline
        points={`100,100 150,100 165,147 125,176 85,147 100,100 `}
        style={{ fill: "yellow", stroke: "yellow", strokeWidth: 3 }}
      />
     
      </svg>






    )}
    export default stardesign;
        