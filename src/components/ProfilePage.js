import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Stardesign from "../components/stardesign";
import MapIcon from "../images/GoogleMapsLogo.png";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const ProfilePage = ({
  google,
  currentUser,
  foods,
  setFoods,
  showMap,
  setShowMap,
  openMap,
  closeMap
}) => {
  let { loggedInUser } = useParams();
  const [title, setTitle] = useState("");
  const [smallTitle, setSmallTitle] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: `https://foodiboo.herokuapp.com/api/v1/users/${loggedInUser}`
    })
      .then(response => {
        console.log(response.data);
        let foodsContentArr = [];
        let i;
        for (i = 0; i < response.data.food_id_list.length; i++) {
          let foodsContentObj = {
            id: response.data.food_id_list[i],
            food_name: response.data.food_name_list[i],
            food_image: response.data.review_food_pic_list[i],
            average_c1: response.data.review_criterion_z1_list[i],
            average_c2: response.data.review_criterion_z2_list[i],
            average_c3: response.data.review_criterion_z3_list[i],
            average_c4: response.data.review_criterion_z4_list[i],
            average_c5: response.data.review_criterion_z5_list[i],
            latitude: response.data.food_latitude_list[i],
            longtitude: response.data.food_longitude_list[i],
            price: response.data.food_price_list[i]
          };
          foodsContentArr.push(foodsContentObj);
        }
        setFoods(foodsContentArr);
        setTitle(
          `User Profile: ${response.data.name.charAt(0).toUpperCase() +
            response.data.name.slice(1)}`
        );
        setSmallTitle(
          `${response.data.name.charAt(0).toUpperCase() +
            response.data.name.slice(1)}\'s Reviews:`
        );
      })
      .catch(error => {
        console.log(error.response);
      });
  }, []);

  return (
    <div className="BigDivProfilePage">
      <h3 className="name_title">{title}</h3>
      <h4 className="name_title">{smallTitle}</h4>
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
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDctpk36CsKzJFeEU6Fev5H8tM1Ls2b15Q"
})(ProfilePage);

// export default ProfilePage;
