import React, { useState } from "react";
import ReactInputPosition, {
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-input-position";
import Starinput from "./Starinput.js";
import { Button } from "react-bootstrap";
import Stardesign from "./stardesign";

const div1style = {
  display: "block",
  width: "99vw",
    height: "85vh",
  marginTop: "90px",
  marginLeft: "auto",
  marginRight: "auto",
  background: "lightgrey",
  border: "solid"
};

const RatingPage = ({}) => {
  const [y1, setY1] = useState(100);
  const [y2, setY2] = useState(100);
  const [y3, setY3] = useState(100);
  const [y4, setY4] = useState(100);
  const [y5, setY5] = useState(100);

  const myProps = {
    y1,
    y2,
    y3,
    y4,
    y5,
    setY1,
    setY2,
    setY3,
    setY4,
    setY5
  };

  const getScore = val => {
    return Math.floor(Math.abs((val / 300) * 5 - 5));
  };

  return (
    <ReactInputPosition
      style={div1style}
      mouseActivationMethod={MOUSE_ACTIVATION.CLICK}
      touchActivationMethod={TOUCH_ACTIVATION.TOUCH}
      trackItemPosition
      trackPassivePosition
    >
      <Starinput {...myProps} />
      
      
    </ReactInputPosition>
    
  );
};
export default RatingPage;
