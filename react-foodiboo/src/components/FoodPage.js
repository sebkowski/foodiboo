import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import Stardesign from "../components/stardesign";

import test from "../images/test.JPG";

const FoodPage = ({ google }) => {
  return (
    <div>
      <div className="food_page_map_container">
        <Map
          google={google}
          zoom={17}
          style={{ height: "calc(100%)" }}
          initialCenter={{ lat: 3.1347416666666668, lng: 101.62975277777777 }}
          streetViewControl={false}
          mapTypeControl={false}
          zoomControl={false}
          fullscreenControl={false}
        >
          <Marker
            position={{ lat: 3.1347416666666668, lng: 101.62975277777777 }}
          />
        </Map>
      </div>
      <div className="food_page_food_review_container_box">
        <div className="food_page_food_review_container">
          <div className="food_page_food_review_image_container">
            <img src={test} className="food_review_food_image"></img>
          </div>
          <div className="food_page_star_container">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>NAME</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Stardesign
                fillOpacity={0.8}
                viewBox={"0 -20 250 300"}
                //   offset x y
                height={150}
                width={150}
                score1={5}
                score2={5}
                score3={5}
                score4={5}
                score5={5}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// export default FoodPage;
export default GoogleApiWrapper({
  apiKey: "AIzaSyDctpk36CsKzJFeEU6Fev5H8tM1Ls2b15Q"
})(FoodPage);
