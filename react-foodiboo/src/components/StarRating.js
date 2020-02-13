import React, { useState } from "react";
import ReactInputPosition, {
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-input-position";
import TestInput from "./TestInput.js";
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

const StarRating = ({}) => {
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
      <TestInput {...myProps} />
      <Stardesign score1={getScore(y1)}  score2={getScore(y2)} score3={getScore(y3)} score4={getScore(y4)} score5={getScore(y5)} />
      <Stardesign score1={5} score2={4} score3={3} score4={2} score5={1} />
    </ReactInputPosition>
    
  );
};
export default StarRating;
