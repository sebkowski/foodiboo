import React, { useState } from "react";
import ReactInputPosition, {
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-input-position";
import Starinput from "./Starinput.js";
import { Button } from "react-bootstrap";
import Stardesign from "./stardesign";

const div1style = {
  display: "fixed",
  width: "100vw",
  height: "100vh",
  margin: "0px 0 0 0",
  background: "white"
};

const RatingPage = ({
  finalRating,
  setFinalRating,
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
}) => {
  // const myProps = {
  //   y1,
  //   y2,
  //   y3,
  //   y4,
  //   y5,
  //   setY1,
  //   setY2,
  //   setY3,
  //   setY4,
  //   setY5
  // };

  return (
    <ReactInputPosition
      style={div1style}
      mouseActivationMethod={MOUSE_ACTIVATION.CLICK}
      touchActivationMethod={TOUCH_ACTIVATION.TOUCH}
      trackItemPosition
      trackPassivePosition
    >
      <Starinput
        // myProps={...myProps}
        y1={y1}
        y2={y2}
        y3={y3}
        y4={y4}
        y5={y5}
        setY1={setY1}
        setY2={setY2}
        setY3={setY3}
        setY4={setY4}
        setY5={setY5}
        finalRating={finalRating}
      />
    </ReactInputPosition>
  );
};
export default RatingPage;
