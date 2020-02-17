import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import GoogleMapReact from "google-map-react";
import { Link } from "react-router-dom";
import dms2dec from "dms2dec";
import EXIF from "exif-js";
import ExifOrientationImg from "react-exif-orientation-img";

import Star from "../images/star.png";
import MapIcon from "../images/GoogleMapsLogo.png";
import test from "../images/test.JPG";
import test2 from "../images/test2.jpg";
import test3 from "../images/Test3.jpg";
import Stardesign from "../components/stardesign";

const Homepage = ({ google, foods, setFoods }) => {
  const [showMap, setShowMap] = useState([]);

  const openMap = (latit, longt) => {
    setShowMap([latit, longt]);
  };

  const closeMap = () => {
    setShowMap([]);
  };

  const imageGeolocation = e => {
    const img = e.target;
    EXIF.getData(img, function() {
      let lattitude = EXIF.getTag(img, "GPSLatitude");
      let lattitudeRef = EXIF.getTag(img, "GPSLatitudeRef");
      let longtitude = EXIF.getTag(img, "GPSLongitude");
      let longtitudeRef = EXIF.getTag(img, "GPSLongitudeRef");

      // GEO LOCATION DMS FORMAT
      // let lattitudePos = `${parseFloat(lattitude[0])}°${parseFloat(
      //   lattitude[1]
      // )}'${parseFloat(lattitude[2])}″${lattitudeRef}`;

      // let longtitudePos = `${parseFloat(longtitude[0])}°${parseFloat(
      //   longtitude[1]
      // )}'${parseFloat(longtitude[2])}″${longtitudeRef}`;

      // console.log(lattitudePos);
      // console.log(longtitudePos);
      // console.log(`${lattitudePos} ${longtitudePos}`);

      // GEO LOCATION DD FORMAT
      let geoPositionDD = dms2dec(
        [
          parseFloat(lattitude[0]),
          parseFloat(lattitude[1]),
          parseFloat(lattitude[2])
        ],
        lattitudeRef,
        [
          parseFloat(longtitude[0]),
          parseFloat(longtitude[1]),
          parseFloat(longtitude[2])
        ],
        longtitudeRef
      );
      // console.log(geoPositionDD);
      let lattitudeDD = geoPositionDD[0];
      let longtitudeDD = geoPositionDD[1];
      // console.log(lattitudeDD);
      // console.log(longtitudeDD);
    });
  };

  // console.log(showMap);

  return (
    <>
      {showMap.length !== 0 ? (
        <>
          <div className="blackout_background" onClick={closeMap}></div>
          <div className="google_map_container">
            <div className="close_google_map_container">
              <div className="close_google_map_button" onClick={closeMap}>
                X
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "calc(100% - 8vh)"
              }}
            >
              <Map
                google={google}
                zoom={18}
                style={{ height: "calc(100% - 8vh)" }}
                initialCenter={{ lat: showMap[0], lng: showMap[1] }}
                streetViewControl={false}
                mapTypeControl={false}
                zoomControl={false}
                fullscreenControl={false}
              >
                <Marker position={{ lat: showMap[0], lng: showMap[1] }} />
              </Map>
              {/* <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyDctpk36CsKzJFeEU6Fev5H8tM1Ls2b15Q"
                }}
                defaultCenter={{
                  lat: showMap[0],
                  lng: showMap[1]
                }}
                defaultZoom={17}
                options={{
                  fullscreenControl: false,
                  zoomControl: false
                }}
              >
                // custom markers DONT REMOVE
                <div
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    zIndex: "20000",
                    backgroundColor: "red",
                    textAlign: "center",
                    height: "50px",
                    width: "50px",
                    borderRadius: "50%",
                    lineHeight: "50px"
                  }}
                  lat={showMap[0]}
                  lng={showMap[1]}
                >
                  HELLO
                </div>
              </GoogleMapReact> */}
            </div>
          </div>
        </>
      ) : null}
      {/* <div id="foodie_background">FOODIBOO</div> */}
      <div className="filter_container">
        <div className="filter">Filter</div>
        <div className="sort">Sort</div>
      </div>
      <div className="recommended_food_container">
        {foods.map(food => (
          <div className="food_container">
            <div>
              <Link to={`/FoodPage/${food.food_name}/${food.id}`}>
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="food_image"
                />
              </Link>
            </div>
            {/* <div>STAR</div> */}
            <div className="food_info_flex_box">
              <div className="food_info_container">
                <div className="food_name">{food.food_name}</div>
                <div>
                  <Stardesign
                    fillOpacity={0.8}
                    viewBox={"0 -20 250 300"}
                    height={80}
                    width={80}
                    score1={food.average_c1}
                    score2={food.average_c2}
                    score3={food.average_c3}
                    score4={food.average_c4}
                    score5={food.average_c5}
                  />
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
                    onClick={() => openMap(food.latitude, food.longtitude)}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
// export default Homepage;

export default GoogleApiWrapper({
  apiKey: "AIzaSyDctpk36CsKzJFeEU6Fev5H8tM1Ls2b15Q"
})(Homepage);
