import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Stardesign from "./stardesign";

export const getScore = val => {
  // console.log(val);
  return Math.floor(Math.abs((val / 300) * 5 - 5));
};
const Starinput = ({
  activePosition,
  y1,
  y2,
  y3,
  y4,
  y5,
  setY1,
  setY2,
  setY3,
  setY4,
  setY5,
  finalRating,
  setFinalRating
}) => {
  const history = useHistory();

  function lockposition1() {
    setY1(Math.round(((activePosition.y - 10) * 1.8) / 60) * 60);
  }

  function lockposition2() {
    // return console.log("active");
    setY2(Math.round(((activePosition.x - 10) * 1.8 - 10) / 60) * 60);
  }

  function lockposition3() {
    setY3(Math.round((activePosition.y * 1.9) / 60) * 60 - 60);
  }

  function lockposition4() {
    setY4(Math.round((activePosition.y * 1.9) / 60) * 60 - 60);
  }

  function lockposition5() {
    setY5(Math.round(((activePosition.x - 15) * 2.22) / 60) * 60);
  }

  const x = () => {
    console.log("AFHIFUAHIUFAHUI");
  };

  // const submitRating = () => {
  //   let foodPicture = new FormData();
  //   foodPicture.append("user_id", localStorage.getItem("id"));
  //   foodPicture.append("food_name", foodName);
  //   foodPicture.append("criterion_z1", getScore(y1));
  //   foodPicture.append("criterion_z2", getScore(y2));
  //   foodPicture.append("criterion_z3", getScore(y3));
  //   foodPicture.append("criterion_z4", getScore(y4));
  //   foodPicture.append("criterion_z5", getScore(y5));
  //   foodPicture.append("food_picture", imageFile);
  //   foodPicture.append("latitude", lat);
  //   foodPicture.append("longitude", lngt);
  //   foodPicture.append("price", foodPrice);

  //   axios({
  //     method: "POST",
  //     url: "https://foodiboo.herokuapp.com/api/v1/food_dishes/create",
  //     data: foodPicture
  //   })
  //     .then(response => {
  //       console.log(response.data);
  //       setFoodName("");
  //       setFoodPrice("");
  //       setLat(null);
  //       setLngt(null);
  //       setPreviewImage(null);
  //       setImageFile(null);
  //       history.push("/");
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // };

  useEffect(() => {
    if (
      parseInt(activePosition.x) > 150 &&
      parseInt(activePosition.x) < 205 &&
      parseInt(activePosition.y) < 140 &&
      parseInt(activePosition.y) > 15
    ) {
      lockposition1();
    }
    if (
      parseInt(activePosition.x) > 220 &&
      parseInt(activePosition.x) < 350 &&
      parseInt(activePosition.y) < 200 &&
      parseInt(activePosition.y) > 115
    ) {
      lockposition2();
    }
    if (
      parseInt(activePosition.x) > 200 &&
      parseInt(activePosition.x) < 360 &&
      parseInt(activePosition.y) < 350 &&
      parseInt(activePosition.y) > 215
    ) {
      lockposition3();
    }
    if (
      parseInt(activePosition.x) > 45 &&
      parseInt(activePosition.x) < 153 &&
      parseInt(activePosition.y) < 350 &&
      parseInt(activePosition.y) > 215
    ) {
      lockposition4();
    }
    if (
      parseInt(activePosition.x) > 5 &&
      parseInt(activePosition.x) < 135 &&
      parseInt(activePosition.y) < 200 &&
      parseInt(activePosition.y) > 115
    ) {
      lockposition5();
    }
  });

  return (
    <>
      {/* Y1 SCORE */}
      {getScore(y1) === 1 || getScore(y1) === 2 ? (
        <div style={{ color: "red" }} className="rating_display_1">
          Taste: {getScore(y1)}
        </div>
      ) : (
        <>
          {" "}
          {getScore(y1) === 3 || getScore(y1) === 4 ? (
            <div className="rating_display_1" style={{ color: "orange" }}>
              Taste: {getScore(y1)}
            </div>
          ) : (
            <div className="rating_display_1" style={{ color: "#56d58b" }}>
              {" "}
              Taste: {getScore(y1)}
            </div>
          )}
        </>
      )}
      {/* Y2 SCORE */}
      {getScore(y2) === 1 || getScore(y2) === 2 ? (
        <div style={{ color: "red" }} className="rating_display_2">
          Health: {getScore(y2)}
        </div>
      ) : (
        <>
          {" "}
          {getScore(y2) === 3 || getScore(y2) === 4 ? (
            <div className="rating_display_2" style={{ color: "orange" }}>
              Health: {getScore(y2)}
            </div>
          ) : (
            <div className="rating_display_2" style={{ color: "#56d58b" }}>
              {" "}
              Health: {getScore(y2)}
            </div>
          )}
        </>
      )}
      {/* Y3 SCORE */}
      {getScore(y3) === 1 || getScore(y3) === 2 ? (
        <div style={{ color: "red" }} className="rating_display_3">
          Value: {getScore(y3)}
        </div>
      ) : (
        <>
          {" "}
          {getScore(y3) === 3 || getScore(y3) === 4 ? (
            <div className="rating_display_3" style={{ color: "orange" }}>
              Value: {getScore(y3)}
            </div>
          ) : (
            <div className="rating_display_3" style={{ color: "#56d58b" }}>
              {" "}
              Value: {getScore(y3)}
            </div>
          )}
        </>
      )}
      {/* Y4 SCORE */}
      {getScore(y4) === 1 || getScore(y4) === 2 ? (
        <div style={{ color: "red" }} className="rating_display_4">
          Location: {getScore(y4)}
        </div>
      ) : (
        <>
          {" "}
          {getScore(y4) === 3 || getScore(y4) === 4 ? (
            <div className="rating_display_4" style={{ color: "orange" }}>
              Location: {getScore(y4)}
            </div>
          ) : (
            <div className="rating_display_4" style={{ color: "#56d58b" }}>
              {" "}
              Location: {getScore(y4)}
            </div>
          )}
        </>
      )}
      {/* Y5 SCORE */}
      {getScore(y5) === 1 || getScore(y5) === 2 ? (
        <div style={{ color: "red" }} className="rating_display_5">
          Service: {getScore(y5)}
        </div>
      ) : (
        <>
          {" "}
          {getScore(y5) === 3 || getScore(y5) === 4 ? (
            <div className="rating_display_5" style={{ color: "orange" }}>
              Service: {getScore(y5)}
            </div>
          ) : (
            <div className="rating_display_5" style={{ color: "#56d58b" }}>
              {" "}
              Service: {getScore(y5)}
            </div>
          )}
        </>
      )}

      {/* </div> */}
      <svg height="500" width="100%">
        <Stardesign
          fillOpacity="0.8"
          height="400"
          width="400"
          viewBox="-20 -10 320 320 "
          score1={getScore(y1)}
          score2={getScore(y2)}
          score3={getScore(y3)}
          score4={getScore(y4)}
          score5={getScore(y5)}
        />
      </svg>
      {/* <div onClick={submitRating} className="rate-btn">
        Submit rating
      </div> */}
    </>
  );
};

export default Starinput;
