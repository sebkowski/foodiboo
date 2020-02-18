import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import axios from "axios";
import { getScore } from "../components/Starinput";

import Stardesign from "../components/stardesign";

import test from "../images/test.JPG";

const FoodPage = ({ google, foods, openMap, showMap, closeMap }) => {
  let { foodname, id } = useParams();

  // const [showFoodMap, setShowFoodMap] = useState([]);
  // console.log(showFoodMap);

  const [foodDish, setFoodDishes] = useState([]);

  // const mapLoad = (lat, long) => {
  //   setShowFoodMap([lat, long]);
  // };

  useEffect(() => {
    axios({
      method: "get",
      url: `https://foodiboo.herokuapp.com/api/v1/food_dishes/${foodname}/${id}`
    })
      .then(response => {
        console.log(response.data);

        // console.log(response.data.criterion_z1_list);
        // console.log(response.data.criterion_z2_list);
        // console.log(response.data.criterion_z3_list);
        // console.log(response.data.criterion_z4_list);
        // console.log(response.data.criterion_z5_list);
        // console.log(response.data.food_pic_list);
        // console.log(response.data.reviewers_list);

        let foodDishesArr = [];
        let i;
        for (i = 0; i < response.data.criterion_z1_list.length; i++) {
          let foodDishesContentObj = {
            c1: response.data.criterion_z1_list[i],
            c2: response.data.criterion_z2_list[i],
            c3: response.data.criterion_z3_list[i],
            c4: response.data.criterion_z4_list[i],
            c5: response.data.criterion_z5_list[i],
            food_pic: response.data.food_pic_list[i],
            reviewer: response.data.reviewers_list[i]
          };
          foodDishesArr.push(foodDishesContentObj);
        }
        setFoodDishes(foodDishesArr);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="food_page_map_container">
        <Map
          google={google}
          zoom={17}
          style={{ height: "calc(100%)" }}
          initialCenter={{ lat: showMap[0], lng: showMap[1] }}
          streetViewControl={false}
          mapTypeControl={false}
          zoomControl={false}
          fullscreenControl={false}
        >
          <Marker position={{ lat: showMap[0], lng: showMap[1] }} />
        </Map>
      </div>
      <div className="food_page_food_review_container_box">
        {foodDish.map(food => (
          <div className="food_page_food_review_container">
            <div className="food_page_food_review_image_container">
              <img src={food.food_pic} className="food_review_food_image"></img>
            </div>
            <div className="food_page_star_container">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link
                  to={`/ProfilePage/${food.reviewer}`}
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={closeMap}
                >
                  <div style={{ fontSize: "14px" }}>
                    Reviewed by: {food.reviewer}
                  </div>
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative"
                }}
              >
                <div style={{ position: "absolute" }}>
                  <div
                    className="Star_criteria"
                    style={{
                      position: "absolute",
                      top: "-5px",
                      left: "-15px",
                      fontSize: "12px"
                    }}
                  >
                    Taste:{food.c1}
                  </div>
                  <div
                    className="Star_criteria"
                    style={{
                      position: "absolute",
                      top: "35px",
                      left: "40px",
                      fontSize: "12px"
                    }}
                  >
                    Value:{food.c2}
                  </div>
                  <div
                    className="Star_criteria"
                    style={{
                      position: "absolute",
                      top: "129px",
                      left: "15px",
                      fontSize: "12px"
                    }}
                  >
                    Health:{food.c3}
                  </div>
                  <div
                    className="Star_criteria"
                    style={{
                      position: "absolute",
                      top: "129px",
                      left: "-60px",
                      fontSize: "12px"
                    }}
                  >
                    Location:{food.c4}
                  </div>
                  <div
                    className="Star_criteria"
                    style={{
                      position: "absolute",
                      top: "35px",
                      left: "-70px",
                      fontSize: "12px"
                    }}
                  >
                    Service:{food.c5}
                  </div>
                </div>
                <Stardesign
                  fillOpacity={0.8}
                  viewBox={"0 -20 250 300"}
                  height={150}
                  width={150}
                  score1={food.c1}
                  score2={food.c2}
                  score3={food.c3}
                  score4={food.c4}
                  score5={food.c5}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// export default FoodPage;
export default GoogleApiWrapper({
  apiKey: "AIzaSyDctpk36CsKzJFeEU6Fev5H8tM1Ls2b15Q"
})(FoodPage);
