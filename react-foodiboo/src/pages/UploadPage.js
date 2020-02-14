import React, { useState, useEffect } from "react";
import axios from "axios";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import EXIF from "exif-js";
import dms2dec from "dms2dec";
import ExifOrientationImg from "react-exif-orientation-img";
import { Link, useHistory } from "react-router-dom";

import arrow from "../../src/images/arrow.png";
import close from "../../src/images/close.png";

const UploadPage = ({
  google,
  imageFile,
  setImageFile,
  previewImage,
  setPreviewImage
}) => {
  let fileInput = React.createRef();
  let history = useHistory();

  const [showNamePopup, setShowNamePopup] = useState(false);
  const [lat, setLat] = useState(null);
  const [lngt, setLngt] = useState(null);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");

  // const [showMap, setShowMap] = useState(false);

  let FormDate = new FormData();
  FormDate.append("food_picture", imageFile);

  const imageGeolocation = e => {
    const img = e;
    EXIF.getData(img, function() {
      let lattitude = EXIF.getTag(img, "GPSLatitude");
      let lattitudeRef = EXIF.getTag(img, "GPSLatitudeRef");
      let longtitude = EXIF.getTag(img, "GPSLongitude");
      let longtitudeRef = EXIF.getTag(img, "GPSLongitudeRef");
      let test = EXIF.getTag(img, "Orientation");

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
    });
  };

  const openNamePopup = () => {
    setShowNamePopup(true);
  };
  const closeNamePopup = () => {
    setShowNamePopup(false);
  };

  const changeFoodName = e => {
    // e.preventDefault();
    console.log(e);
    setFoodName(e);
  };
  const changeFoodPrice = e => {
    // e.preventDefault();
    console.log(e);
    setFoodPrice(e);
  };
  const sumbitFood = () => {
    axios({
      method: "POST",
      url: "https://foodiboo.herokuapp.com/api/v1/food_dishes/create",
      data: {
        food_picture: FormData,
        user_id: `${localStorage.getItem("id")}`,
        food_name: `${foodName}`,
        latitude: `${lat}`,
        longitude: `${lngt}`,
        price: `${foodPrice}`
      }
    })
      .then(response => {
        console.log(response.data);
        setFoodName("");
        setFoodPrice("");
        setLat(null);
        setLngt(null);
        setPreviewImage(null);
        setImageFile(null);
        history.push("/");
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  // console.log(showNamePopup, "POPUP");
  // console.log(foodName);
  // console.log(foodPrice);
  // console.log(lat);
  // console.log(lngt);
  // console.log(previewImage);
  // console.log(imageFile);

  useEffect(() => {
    if (previewImage !== null) {
      imageGeolocation(imageFile);
    }
  }, [previewImage]);

  return (
    <>
      <div className="close_button_container">
        <Link to="/">
          <div className="x_button">X</div>
        </Link>
        {/* <img src={close} className="close_button"></img> */}
      </div>
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
              <button className="submit_food_button" onClick={sumbitFood}>
                Create menu
              </button>
            </div>
          </div>
        </>
      ) : null}
      {previewImage ? (
        <div className="upload_image_container">
          <form>
            <ExifOrientationImg
              className="upload_image"
              src={previewImage}
              alt="previewimg"
              onClick={imageGeolocation}
            />
          </form>
          <div className="arrow_container">
            <img
              src={arrow}
              className="arrow_icon"
              onClick={openNamePopup}
            ></img>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default UploadPage;
