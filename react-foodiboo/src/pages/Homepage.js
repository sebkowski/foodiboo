import React, { useState } from "react";

import "../../src/Homepage.css";

import Star from "../images/star.png";

const Homepage = () => {
  const [foods, setfoods] = useState([
    {
      id: 1,
      food_name: "Nasi Lemak",
      food_image:
        "http://www.friedchillies.com/images/uploads/reviews/NasiLemakAngah_Kerang.jpg"
    },
    {
      id: 2,
      food_name: "Pan Mee",
      food_image:
        "https://i0.wp.com/penangfoodie.com/wp-content/uploads/2018/07/wassupjanice.png?resize=995%2C986"
    },
    {
      id: 3,
      food_name: "Chicken Rice",
      food_image:
        "https://ucarecdn.com/f6a84197-bea2-4aa4-bedb-9635f8d4482c/-/scale_crop/1600x900/center/-/quality/normal/-/format/webp/roasted-chicken-rice.webp"
    }
  ]);

  return (
    <>
      <div id="foodie_background">FOODIBOO</div>
      <div className="filter_container">
        <div className="filter">Filter</div>
        <div className="sort">Sort</div>
      </div>
      <div className="recommended_food_container">
        {foods.map(food => (
          <div className="food_container">
            <div>
              <img
                src={food.food_image}
                alt={food.food_name}
                className="food_image"
              />
            </div>
            {/* <div>STAR</div> */}
            <div className="food_info_flex_box">
              <div className="food_info_container">
                <div className="food_name">{food.food_name}</div>
                <div>
                  <img src={Star} className="star_icon"></img>
                </div>
              </div>
              <div className="food_info_distance_container">
                <div className="food_distance"> 300m</div>
              </div>
            </div>
          </div>
        ))}
        {foods.map(food => (
          <div className="food_container">
            <div>
              <img
                src={food.food_image}
                alt={food.food_name}
                className="food_image"
              />
            </div>
            {/* <div>STAR</div> */}
            <div className="food_info_flex_box">
              <div className="food_info_container">
                <div className="food_name">{food.food_name}</div>
                <div>
                  <img src={Star} className="star_icon"></img>
                </div>
              </div>
              <div className="food_info_distance_container">
                <div className="food_distance"> 300m</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Homepage;
