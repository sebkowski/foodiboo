import React, { useState, useEffect } from "react";
import { Modal, Button, Form, ButtonToolbar } from "react-bootstrap";
import axios from "axios";
const div1style = {
  // display: "inline-block",
  // width: "90vw",
  // height: "60vh",
  // marginTop: "80px",
  // background: "lightgrey",
  // border:"solid",
};

const TestInput = props => {
  const [y1, setY1] = useState(100);
  const [y2, setY2] = useState(100);
  const [y3, setY3] = useState(100);
  const [y4, setY4] = useState(100);
  const [y5, setY5] = useState(100);

  const {
    itemRef,
    itemPosition,
    active,
    passivePosition,
    activePosition
  } = props;

  const getScore = val => {
    return Math.floor(Math.abs((val / 300) * 5 - 5));
  };

  function lockposition1() {
    setY1((Math.round((activePosition.y)/60))*60);
  }

  function lockposition2() {
    setY2((Math.round((activePosition.y)/60))*60);
  }

  function lockposition3() {
    setY3((Math.round((activePosition.y)/60))*60);
  }

  function lockposition4() {
    setY4((Math.round((activePosition.y)/60))*60);
  }

  function lockposition5() {
    setY5((Math.round((activePosition.y)/60))*60);
  }


  function submitRating(){
      axios({
      method:"POST",
        url:"https:",
        data: {
            user_id: `${localStorage.getItem("user_id")}`,
            criterion_z1: `${getScore(y1)}`,
             criterion_z2: `${getScore(y2)}`,
              criterion_z3: `${getScore(y3)}`,
              criterion_z4: `${getScore(y4)}`,
              criterion_z5: `${getScore(y5)}`
        }})


}

  useEffect(() => {
    if (parseInt(activePosition.x) > 25 && parseInt(activePosition.x) < 50) {
      lockposition1();
    }
    if (parseInt(activePosition.x) > 75 && parseInt(activePosition.x) < 100) {
      lockposition2();
    }
    if (parseInt(activePosition.x) > 125 && parseInt(activePosition.x) < 150) {
      lockposition3();
    }
    if (parseInt(activePosition.x) > 175 && parseInt(activePosition.x) < 200) {
      lockposition4();
    }
    if (parseInt(activePosition.x) > 225 && parseInt(activePosition.x) < 250) {
      lockposition5();
    }
  });

  return (
    <>
      <svg height="300" width="390">
        <polyline
          points={`25,${parseInt(y1)} 50,${parseInt(
            y1
          )} 50,300 25,300 25,${parseInt(y1)} `}
          style={{ fill: "none", stroke: "black", strokeWidth: 3 }}
        />
        <polyline
          points={`75,${parseInt(y2)} 100,${parseInt(
            y2
          )} 100,300 75,300 75,${parseInt(y2)} `}
          style={{ fill: "none", stroke: "black", strokeWidth: 3 }}
        />
        <polyline
          points={`125,${parseInt(y3)} 150,${parseInt(
            y3
          )} 150,300 125,300 125,${parseInt(y3)} `}
          style={{ fill: "none", stroke: "black", strokeWidth: 3 }}
        />
        <polyline
          points={`175,${parseInt(y4)} 200,${parseInt(
            y4
          )} 200,300 175,300 175,${parseInt(y4)} `}
          style={{ fill: "none", stroke: "black", strokeWidth: 3 }}
        />
        <polyline
          points={`225,${parseInt(y5)} 250,${parseInt(
            y5
          )} 250,300 225,300 225,${parseInt(y5)} `}
          style={{ fill: "none", stroke: "black", strokeWidth: 3 }}
        />
        {/* <polyline
          points={`300,400 350,250 275,250 300,400 `}
          style={{ fill: "none", stroke: "black", strokeWidth: 3 }}
        /> */}
      </svg>
      <div>
        <a>Location = {getScore(y1)} </a>
        <a>Taste = {getScore(y2)} </a>
        <a>Value = {getScore(y3)} </a>
        <a>Fun = {getScore(y4)} </a>
        <a>Higiene = {getScore(y5)} </a>
        <a>x={parseInt(activePosition.x)} </a>
        <a>y={parseInt(activePosition.y)} </a>
        <a>y1={parseInt(y1)} </a>
        
       
        <Button Href="" variant="primary" size="lg" 
        onClick={submitRating}
        >
        Submit rating
        </Button>
        
        
      </div>
      
    </>
  );
};

export default TestInput;
