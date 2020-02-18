import React, { useState, useEffect } from "react";
import axios from "axios";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import EXIF from "exif-js";
import dms2dec from "dms2dec";
import ExifOrientationImg from "react-exif-orientation-img";
import { useHistory } from "react-router-dom";
import { getScore } from "../components/Starinput";
import RatingPage from "../components/RatingPage";
import Loading from "../components/Loading";

import arrow from "../../src/images/arrow.png";
import close from "../../src/images/close.png";

const UploadPage = ({
  google,
  imageFile,
  setImageFile,
  previewImage,
  setPreviewImage,
  loading,
  setLoading,
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
  let fileInput = React.createRef();
  let history = useHistory();

  const [showNamePopup, setShowNamePopup] = useState(false);
  const [gpsLocation, setGpsLocation] = useState(true);
  const [showRatingStar, setShowRatingStar] = useState(false);
  const [lat, setLat] = useState(null);
  const [lngt, setLngt] = useState(null);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState();

  const rateFood = () => {
    setShowNamePopup(false);
    setShowRatingStar(true);
  };
  const imageGeolocation = e => {
    const img = e;
    EXIF.getData(img, function() {
      let lattitude = EXIF.getTag(img, "GPSLatitude");
      let lattitudeRef = EXIF.getTag(img, "GPSLatitudeRef");
      let longtitude = EXIF.getTag(img, "GPSLongitude");
      let longtitudeRef = EXIF.getTag(img, "GPSLongitudeRef");

      if (!lattitude || !lattitudeRef || !longtitude || !longtitudeRef) {
        setGpsLocation(false);
      } else {
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
        setLat(lattitudeDD);
        setLngt(longtitudeDD);
        // console.log(test);
      }
    });
  };

  const openNamePopup = () => {
    setShowNamePopup(true);
  };
  const closeNamePopup = () => {
    setShowNamePopup(false);
    // setShowRatingStar(false);
  };

  const changeFoodName = e => {
    // e.preventDefault();
    // console.log(e);
    setFoodName(e);
  };
  const changeFoodPrice = e => {
    // e.preventDefault();
    // console.log(e);
    setFoodPrice(e);
  };
  const xButton = () => {
    setFoodName("");
    setFoodPrice("");
    setLat(null);
    setLngt(null);
    setPreviewImage(null);
    setImageFile(null);
    setGpsLocation(true);
    if (imageFile === null) {
      history.push("/");
    }
  };

  const sumbitFood = () => {
    let foodPicture = new FormData();
    setLoading(true);

    foodPicture.append("user_id", localStorage.getItem("id"));
    foodPicture.append("food_name", foodName);
    foodPicture.append("criterion_z1", getScore(y1));
    foodPicture.append("criterion_z2", getScore(y2));
    foodPicture.append("criterion_z3", getScore(y3));
    foodPicture.append("criterion_z4", getScore(y4));
    foodPicture.append("criterion_z5", getScore(y5));
    foodPicture.append("food_picture", imageFile);
    foodPicture.append("latitude", lat);
    foodPicture.append("longitude", lngt);
    foodPicture.append("price", foodPrice);

    console.log(foodPicture, "FOOD PICTRUE");

    axios({
      method: "POST",
      url: "https://foodiboo.herokuapp.com/api/v1/food_dishes/create",
      data: foodPicture
    })
      .then(response => {
        console.log(response.data);
        setFoodName("");
        setFoodPrice("");
        setLat(null);
        setLngt(null);
        setPreviewImage(null);
        setImageFile(null);
        setY1(100);
        setY2(100);
        setY3(100);
        setY4(100);
        setY5(100);
        setLoading(false);
        history.push("/");
      })
      .catch(error => {
        console.log(error.response.data);
        setLoading(false);
      });
  };

  // console.log(showNamePopup, "POPUP");
  // console.log(foodName, "foodname");
  // console.log(foodPrice, "foodprice");
  // console.log(lat, "LAT");
  // console.log(typeof lat, "LAT");
  // console.log(typeof lngt, "LNG");
  // console.log(lngt, "lng");
  // console.log(previewImage, "previewimage");
  // console.log(imageFile, "imagefile");

  useEffect(() => {
    if (previewImage !== null) {
      imageGeolocation(imageFile);
    }
  }, [previewImage]);

  return (
    <>
      <div className="close_button_container">
        <div className="x_button" onClick={xButton}>
          X
        </div>
      </div>

      {loading ? (
        <>
          <div
            className="loading"
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          ></div>
          <Loading />
        </>
      ) : null}

      {showNamePopup ? (
        <>
          <div className="blackout_background" onClick={closeNamePopup}></div>
          <div className="image_popup">
            <div className="what_food">Name of dish?</div>
            <form>
              <div className="food_name_input_box_container">
                <input
                  className=""
                  onChange={e => {
                    changeFoodName(e.target.value);
                  }}
                  value={foodName}
                ></input>
              </div>
              <div className="what_food">Price of dish?</div>
              <div className="food_name_input_box_container">
                <input
                  type="number"
                  onChange={e => {
                    changeFoodPrice(e.target.value);
                  }}
                  value={foodPrice}
                ></input>
              </div>
            </form>
            <div className="submit_food_button_container">
              <button className="submit_food_button" onClick={rateFood}>
                Rate Food
              </button>
            </div>
          </div>
        </>
      ) : null}

      {showRatingStar ? (
        <>
          {/* <div className="blackout_background" onClick={closeNamePopup}> */}
          <div className="star_rating_container">
            <RatingPage
              loading={loading}
              setLoading={setLoading}
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
            />
          </div>
          <button className="rate-btn" onClick={sumbitFood}>
            Submit Rating
          </button>
        </>
      ) : null}
      {previewImage && !showRatingStar ? (
        <>
          <div className="upload_image_container">
            <form>
              <ExifOrientationImg
                className="upload_image"
                src={previewImage}
                alt="previewimg"
                onClick={imageGeolocation}
              />
            </form>
          </div>
          <div className="arrow_container">
            <img
              src={arrow}
              className="arrow_icon"
              onClick={openNamePopup}
            ></img>
          </div>
        </>
      ) : null}
      {gpsLocation ? null : (
        <div className="no_gps_message_box">
          Cant recieve GPS location. Please enable camera location services
        </div>
      )}
    </>
  );
};
export default UploadPage;
