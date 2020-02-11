import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import "../../src/Homepage.css";

import Star from "../images/star.png";
import MapIcon from "../images/GoogleMapsLogo.png";

const Homepage = ({ google }) => {
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

  const [showMap, setShowMap] = useState(false);

  const [x, setX] = useState(3.1347584722222224);
  const [y, setY] = useState(101.62975277777777);

  const toggleOpenMap = () => {
    setShowMap(!showMap);
    console.log(showMap);
  };

  return (
    <>
      <div id="foodie_background">FOODIBOO</div>
      {showMap ? (
        <>
          <div className="blackout_background"></div>
          <div className="google_map_container">
            <div className="close_google_map_container">
              <div className="close_google_map_button" onClick={toggleOpenMap}>
                X
              </div>
            </div>
            <div>
              <Map
                google={google}
                zoom={17}
                // style={mapStyles}
                initialCenter={{ lat: x, lng: y }}
                streetViewControl={false}
                mapTypeControl={false}
                zoomControl={false}
                fullscreenControl={false}
              >
                <Marker position={{ lat: x, lng: y }} />
              </Map>
            </div>
          </div>
        </>
      ) : null}

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
                <div className="food_distance">
                  <p>300m</p>
                </div>
                <div className="food_info_map_container">
                  <img
                    src={MapIcon}
                    className="map_icon"
                    onClick={toggleOpenMap}
                  ></img>
                </div>
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
                <div className="food_distance">
                  <p>300m</p>
                </div>
                <div className="food_info_map_container">
                  <img
                    src={MapIcon}
                    className="map_icon"
                    onClick={toggleOpenMap}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="camera_bar">
        <div className="camera_button"></div>
      </div>
    </>
  );
};
// export default Homepage;

export default GoogleApiWrapper({
  apiKey: "AIzaSyDctpk36CsKzJFeEU6Fev5H8tM1Ls2b15Q"
})(Homepage);
