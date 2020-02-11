import React, { useState } from "react";
import ReactInputPosition, {
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-input-position";
import TestInput from "./TestInput.js";
import { Button } from "react-bootstrap";

const div1style = {
  display: "block",
  width: "99vw",
//   height: "400px",
  marginTop: "90px",
  marginLeft: 'auto',
  marginRight: 'auto',  
  background: "lightgrey",
  border: "solid",
};

const StarRating = ({}) => {
  return (
      
    <ReactInputPosition
      style={div1style}
      mouseActivationMethod={MOUSE_ACTIVATION.CLICK}
      touchActivationMethod={TOUCH_ACTIVATION.TOUCH}
      trackItemPosition
      trackPassivePosition
    >
      <TestInput />
    </ReactInputPosition>
    
   
    
  );
};
export default StarRating;
